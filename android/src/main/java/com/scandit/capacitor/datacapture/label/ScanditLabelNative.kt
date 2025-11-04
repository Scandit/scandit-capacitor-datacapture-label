/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2025- Scandit AG. All rights reserved.
 */
package com.scandit.capacitor.datacapture.label

import android.Manifest
import android.view.View
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams.WRAP_CONTENT
import android.widget.ImageView
import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginHandle
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import com.getcapacitor.annotation.PermissionCallback
import com.scandit.capacitor.datacapture.barcode.utils.SerializableAdvancedOverlayView
import com.scandit.capacitor.datacapture.barcode.utils.SerializableAdvancedOverlayViewData
import com.scandit.capacitor.datacapture.core.ScanditCaptureCoreNative
import com.scandit.capacitor.datacapture.core.errors.JsonParseError
import com.scandit.capacitor.datacapture.core.utils.CapacitorResult
import com.scandit.datacapture.frameworks.core.context.data.toMap
import com.scandit.datacapture.frameworks.core.events.Emitter
import com.scandit.datacapture.frameworks.core.extensions.DATA_CAPTURE_VIEW_ID_KEY
import com.scandit.datacapture.frameworks.core.ui.ViewFromJsonResolver
import com.scandit.datacapture.frameworks.core.utils.DefaultFrameworksLog
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread
import com.scandit.datacapture.frameworks.core.utils.DefaultWorkerThread
import com.scandit.datacapture.frameworks.core.utils.FrameworksLog
import com.scandit.datacapture.frameworks.core.utils.MainThread
import com.scandit.datacapture.frameworks.core.utils.WorkerThread
import com.scandit.datacapture.frameworks.core.utils.getBitmapFromBase64EncodedViewData
import com.scandit.datacapture.frameworks.label.LabelCaptureModule
import org.json.JSONException
import org.json.JSONObject

@CapacitorPlugin(
    name = "ScanditLabelNative",
    permissions = [
        Permission(strings = [Manifest.permission.CAMERA], alias = "camera")
    ]
)
class ScanditLabelNative : Plugin(), Emitter {

    companion object {
        private const val FIELD_RESULT = "result"
        private const val CORE_PLUGIN_NAME = "ScanditCaptureCoreNative"
        private const val WRONG_INPUT = "Wrong input parameter"
    }

    private var corePlugin: PluginHandle? = null
    private val labelModule = LabelCaptureModule.create(this)
    private val logger: FrameworksLog = DefaultFrameworksLog.getInstance()
    private val workerThread: WorkerThread = DefaultWorkerThread.getInstance()
    private val mainThread: MainThread = DefaultMainThread.getInstance()

    override fun load() {
        super.load()

        // We need to register the plugin with its Core dependency for serializers to load.
        corePlugin = bridge.getPlugin(CORE_PLUGIN_NAME)
        if (corePlugin != null) {
            (corePlugin!!.instance as ScanditCaptureCoreNative).registerPluginInstance(
                pluginHandle.instance
            )
        } else {
            logger.error("Core not found")
        }

        labelModule.onCreate(context)
    }

    override fun handleOnDestroy() {
        labelModule.onDestroy()
    }

    private fun checkCameraPermission(): Boolean =
        getPermissionState("camera") == PermissionState.GRANTED

    private fun checkOrRequestCameraPermissions(call: PluginCall) {
        if (!checkCameraPermission()) {
            requestPermissionForAlias("camera", call, "onCameraPermissionResult")
        } else {
            onCameraPermissionResult(call)
        }
    }

    @Suppress("unused")
    @PermissionCallback
    private fun onCameraPermissionResult(call: PluginCall) {
        if (checkCameraPermission()) {
            call.resolve()
            return
        }

        call.reject("Camera permissions not granted.")
    }

    @PluginMethod
    fun getDefaults(call: PluginCall) {
        val defaults = JSObject.fromJSONObject(
            JSONObject(
                mapOf<String, Any?>(
                    "LabelCapture" to labelModule.getDefaults()
                )
            )
        )
        call.resolve(defaults)
    }

    @PluginMethod
    fun registerListenerForEvents(call: PluginCall) {
        labelModule.addListener(getModeId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterListenerForEvents(call: PluginCall) {
        labelModule.removeListener(getModeId(call))
        call.resolve()
    }

    @PluginMethod
    fun finishDidUpdateSessionCallback(call: PluginCall) {
        labelModule.finishDidUpdateSession(getModeId(call), call.data.getBoolean("isEnabled"))
        call.resolve()
    }

    @PluginMethod
    fun updateLabelCaptureFeedback(call: PluginCall) {
        val modeId = getModeId(call)
        val feedbackJson = call.data.getString("feedbackJson")
            ?: return call.reject(WRONG_INPUT)
        labelModule.updateLabelCaptureFeedback(modeId, feedbackJson, CapacitorResult(call))
    }

    @PluginMethod
    fun setModeEnabledState(call: PluginCall) {
        labelModule.setModeEnabled(getModeId(call), call.data.getBoolean("isEnabled"))
        call.resolve()
    }

    @PluginMethod
    fun updateLabelCaptureSettings(call: PluginCall) {
        val modeId = getModeId(call)
        val settingsJson = call.data.getString("settingsJson")
            ?: return call.reject(WRONG_INPUT)
        labelModule.applyModeSettings(modeId, settingsJson, CapacitorResult(call))
    }

    // Advanced Overlay Methods
    @PluginMethod
    fun setViewForCapturedLabel(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val trackingId = call.data.getInt("trackingId")
        val viewJson = call.data.getString("jsonView")   ?: return call.reject(WRONG_INPUT)
        try {
            mainThread.runOnMainThread {
                labelModule.setViewForCapturedLabel(
                    dataCaptureViewId,
                    viewJson,
                    trackingId,
                    viewFromJsonResolver = object : ViewFromJsonResolver {
                        override fun getView(viewJson: String): View? {
                            val imageData =
                                SerializableAdvancedOverlayView.fromJson(JSONObject(viewJson))

                            if (imageData == null) {
                                call.reject(WRONG_INPUT)
                                return null
                            }

                            return ImageView(context).also {
                                it.setImageBitmap(getBitmapFromBase64EncodedViewData(imageData.data))
                                it.layoutParams = ViewGroup.MarginLayoutParams(
                                    imageData.options.width,
                                    imageData.options.height
                                )
                            }
                        }

                    },
                    result = CapacitorResult(call)
                )
            }
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            call.reject(JsonParseError(e.message).toString())
        }

        call.resolve()
    }

    @PluginMethod
    fun setAnchorForCapturedLabel(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val anchor = call.data.getString("anchor")
            ?: return call.reject(WRONG_INPUT)
        val trackingId = call.data.getInt("trackingId")
        labelModule.setAnchorForCapturedLabel(
            dataCaptureViewId,
            anchor,
            trackingId,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun setOffsetForCapturedLabel(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val offsetJson = call.data.getString("offsetJson")
            ?: return call.reject(WRONG_INPUT)
        val trackingId = call.data.getInt("trackingId")
        labelModule.setOffsetForCapturedLabel(
            dataCaptureViewId,
            offsetJson,
            trackingId,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun setViewForCapturedLabelField(call: PluginCall) {
        try {
            mainThread.runOnMainThread {
                labelModule.setViewForLabelField(
                    viewParams = call.data.toMap(),
                    viewFromJsonResolver = object : ViewFromJsonResolver {
                        override fun getView(viewJson: String): View? {
                            val imageData =
                                SerializableAdvancedOverlayView.fromJson(JSONObject(viewJson))

                            if (imageData == null) {
                                call.reject(WRONG_INPUT)
                                return null
                            }

                            return ImageView(context).also {
                                it.setImageBitmap(getBitmapFromBase64EncodedViewData(imageData.data))
                                it.layoutParams = ViewGroup.MarginLayoutParams(
                                    imageData.options.width,
                                    imageData.options.height
                                )
                            }
                        }

                    },
                    result = CapacitorResult(call)
                )
            }
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            call.reject(JsonParseError(e.message).toString())
        }

        call.resolve()
    }

    @PluginMethod
    fun setAnchorForCapturedLabelField(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val anchor = call.data.getString("anchor")
            ?: return call.reject(WRONG_INPUT)
        val identifier = call.data.getString("identifier")
            ?: return call.reject(WRONG_INPUT)
        labelModule.setAnchorForLabelField(
            dataCaptureViewId,
            anchor,
            identifier,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun setOffsetForCapturedLabelField(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val offset = call.data.getString("offset")
            ?: return call.reject(WRONG_INPUT)
        val identifier = call.data.getString("identifier")
            ?: return call.reject(WRONG_INPUT)
        labelModule.setOffsetForLabelField(
            dataCaptureViewId,
            offset,
            identifier,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun clearCapturedLabelViews(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        labelModule.clearCapturedLabelViews(dataCaptureViewId, CapacitorResult(call))
    }

    @PluginMethod
    fun registerListenerForAdvancedOverlayEvents(call: PluginCall) {
        labelModule.addAdvancedOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterListenerForAdvancedOverlayEvents(call: PluginCall) {
        labelModule.removeAdvancedOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun updateLabelCaptureAdvancedOverlay(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val advancedOverlayJson = call.data.getString("advancedOverlayJson")
            ?: return call.reject(WRONG_INPUT)
        labelModule.updateAdvancedOverlay(
            dataCaptureViewId,
            advancedOverlayJson,
            CapacitorResult(call)
        )
    }

    // Basic Overlay Methods
    @PluginMethod
    fun setBrushForFieldOfLabel(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val brushJson = call.data.getString("brushJson")
        val fieldName = call.data.getString("fieldName")
            ?: return call.reject(WRONG_INPUT)
        val trackingId = call.data.getInt("trackingId")
        labelModule.setBrushForFieldOfLabel(
            dataCaptureViewId,
            brushJson,
            fieldName,
            trackingId,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun setBrushForLabel(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val brushJson = call.data.getString("brushJson")
        val trackingId = call.data.getInt("trackingId")
        labelModule.setBrushForLabel(
            dataCaptureViewId,
            brushJson,
            trackingId,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun registerListenerForBasicOverlayEvents(call: PluginCall) {
        labelModule.addBasicOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterListenerForBasicOverlayEvents(call: PluginCall) {
        labelModule.removeBasicOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun updateLabelCaptureBasicOverlay(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val basicOverlayJson = call.data.getString("basicOverlayJson")
            ?: return call.reject(WRONG_INPUT)
        labelModule.updateBasicOverlay(dataCaptureViewId, basicOverlayJson, CapacitorResult(call))
    }

    @PluginMethod
    fun registerListenerForValidationFlowEvents(call: PluginCall) {
        labelModule.addValidationFlowOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterListenerForValidationFlowEvents(call: PluginCall) {
        labelModule.removeValidationFlowOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun updateLabelCaptureValidationFlowOverlay(call: PluginCall) {
        val dataCaptureViewId = getDataCaptureViewId(call)
        val overlayJson = call.data.getString("overlayJson")
            ?: return call.reject(WRONG_INPUT)
        labelModule.updateValidationFlowOverlay(
            dataCaptureViewId,
            overlayJson,
            CapacitorResult(call)
        )
    }

    private fun getViewId(call: PluginCall): Int {
        return call.data.getInt("viewId")
    }

    private fun getDataCaptureViewId(call: PluginCall): Int {
        return call.data.getInt("dataCaptureViewId")
    }

    private fun getModeId(call: PluginCall): Int {
        return call.data.getInt("modeId")
    }

    override fun emit(eventName: String, payload: MutableMap<String, Any?>) {
        val capacitorPayload = JSObject()
        capacitorPayload.put("name", eventName)
        capacitorPayload.put("data", JSONObject(payload).toString())

        notifyListeners(eventName, capacitorPayload)
    }

    override fun hasListenersForEvent(eventName: String): Boolean = this.hasListeners(eventName)

    override fun hasViewSpecificListenersForEvent(viewId: Int, eventName: String): Boolean {
        return this.hasListenersForEvent(eventName)
    }

    override fun hasModeSpecificListenersForEvent(modeId: Int, eventName: String): Boolean {
        return this.hasListenersForEvent(eventName)
    }
}
