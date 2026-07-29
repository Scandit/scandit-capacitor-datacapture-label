/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2025- Scandit AG. All rights reserved.
 */

import Capacitor
import Foundation
import ScanditCapacitorDatacaptureBarcode
import ScanditCapacitorDatacaptureCore
import ScanditFrameworksCore
import ScanditFrameworksLabel

@objc(ScanditCapacitorLabel)
public class ScanditCapacitorLabel: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ScanditCapacitorLabel"
    public let jsName = "ScanditLabelNative"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getDefaults", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishDidUpdateSessionCallback", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setModeEnabledState", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateLabelCaptureFeedback", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateLabelCaptureSettings", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setViewForCapturedLabel", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAnchorForCapturedLabel", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setOffsetForCapturedLabel", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setViewForCapturedLabelField", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAnchorForCapturedLabelField", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setOffsetForCapturedLabelField", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clearCapturedLabelViews", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerListenerForAdvancedOverlayEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterListenerForAdvancedOverlayEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateLabelCaptureAdvancedOverlay", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBrushForFieldOfLabel", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBrushForLabel", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerListenerForBasicOverlayEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterListenerForBasicOverlayEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateLabelCaptureBasicOverlay", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerListenerForValidationFlowEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterListenerForValidationFlowEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateLabelCaptureValidationFlowOverlay", returnType: CAPPluginReturnPromise),
    ]

    private var labelModule: LabelModule!

    override public func load() {
        let emitter = CapacitorEventEmitter(with: self)
        labelModule = LabelModule(emitter: emitter)
        labelModule.didStart()
    }

    @objc func getDefaults(_ call: CAPPluginCall) {
        let defaults = labelModule.defaults.toEncodable()
        let defaultsResult = ["LabelCapture": defaults]
        call.resolve(defaultsResult)
    }

    @objc func registerListenerForEvents(_ call: CAPPluginCall) {
        labelModule.addListener(getModeId(call))
        call.resolve()
    }

    @objc func unregisterListenerForEvents(_ call: CAPPluginCall) {
        labelModule.removeListener(getModeId(call))
        call.resolve()
    }

    @objc func finishDidUpdateSessionCallback(_ call: CAPPluginCall) {
        let enabled = call.getBool("isEnabled", true)
        labelModule.finishDidUpdateCallback(modeId: getModeId(call), enabled: enabled)
        call.resolve()
    }

    @objc func setModeEnabledState(_ call: CAPPluginCall) {
        guard let enabled = call.getBool("isEnabled") else {
            call.reject("isEnabled parameter is required")
            return
        }
        labelModule.setModeEnabled(modeId: getModeId(call), enabled: enabled)
        call.resolve()
    }

    @objc func updateLabelCaptureFeedback(_ call: CAPPluginCall) {
        guard let feedbackJson = call.getString("feedbackJson") else {
            call.reject("feedbackJson parameter is required")
            return
        }
        labelModule.updateFeedback(modeId: getModeId(call), feedbackJson: feedbackJson, result: CapacitorResult(call))
    }

    @objc func updateLabelCaptureSettings(_ call: CAPPluginCall) {
        guard let settingsJson = call.getString("settingsJson") else {
            call.reject("settingsJson parameter is required")
            return
        }
        labelModule.applyModeSettings(
            modeId: getModeId(call),
            modeSettingsJson: settingsJson,
            result: CapacitorResult(call)
        )
    }

    // Advanced Overlay Methods
    @objc func setViewForCapturedLabel(_ call: CAPPluginCall) {
        let trackingId = call.getInt("trackingId", -1)

        if trackingId < 0 {
            call.reject("trackingId parameter is required")
            return
        }

        let dataCaptureViewId = getDataCaptureViewId(call)
        guard let viewJson = call.getString("jsonView") else {
            call.reject("view parameter is required")
            return
        }

        // Parse the JSON string to extract view data and options
        guard let jsonData = viewJson.data(using: .utf8),
            let parsedJson = try? JSONSerialization.jsonObject(with: jsonData, options: []) as? [String: Any],
            let viewJsonData = try? JSONSerialization.data(withJSONObject: parsedJson, options: []),
            let decodedViewJson = try? JSONDecoder().decode(TappableBase64ImageView.JSON.self, from: viewJsonData)
        else {
            call.reject("Invalid view JSON format")
            return
        }

        dispatchMain { [weak self] in
            let view: TappableBase64ImageView? = TappableBase64ImageView(json: decodedViewJson)

            let viewForLabel = ViewForLabel(dataCaptureViewId: dataCaptureViewId, view: view, trackingId: trackingId)

            self?.labelModule.setViewForCapturedLabel(viewForLabel: viewForLabel, result: CapacitorResult(call))
        }
    }

    @objc func setAnchorForCapturedLabel(_ call: CAPPluginCall) {
        guard let anchor = call.getString("anchor") else {
            call.reject("anchor parameter is required")
            return
        }
        let dataCaptureViewId = getDataCaptureViewId(call)
        let trackingId = call.getInt("trackingId", 0)
        let anchroForLabel = AnchorForLabel(
            dataCaptureViewId: dataCaptureViewId,
            anchorString: anchor,
            trackingId: trackingId
        )
        labelModule.setAnchorForCapturedLabel(anchorForLabel: anchroForLabel, result: CapacitorResult(call))
    }

    @objc func setOffsetForCapturedLabel(_ call: CAPPluginCall) {
        guard let offsetJson = call.getString("offsetJson") else {
            call.reject("offsetJson parameter is required")
            return
        }
        let dataCaptureViewId = getDataCaptureViewId(call)
        let trackingId = call.getInt("trackingId", 0)
        let offsetForLabel = OffsetForLabel(
            dataCaptureViewId: dataCaptureViewId,
            offsetJson: offsetJson,
            trackingId: trackingId
        )
        labelModule.setOffsetForCapturedLabel(offsetForLabel: offsetForLabel, result: CapacitorResult(call))
    }

    @objc func setViewForCapturedLabelField(_ call: CAPPluginCall) {
        guard let identifier = call.getString("identifier") else {
            call.reject("identifier parameter is required")
            return
        }
        let dataCaptureViewId = getDataCaptureViewId(call)
        guard let viewJson = call.getString("view") else {
            call.reject("view parameter is required")
            return
        }

        // Parse the JSON string to extract view data and options
        guard let jsonData = viewJson.data(using: .utf8),
            let parsedJson = try? JSONSerialization.jsonObject(with: jsonData, options: []) as? [String: Any],
            let viewJsonData = try? JSONSerialization.data(withJSONObject: parsedJson, options: []),
            let decodedViewJson = try? JSONDecoder().decode(TappableBase64ImageView.JSON.self, from: viewJsonData)
        else {
            call.reject("Invalid view JSON format")
            return
        }

        dispatchMain { [weak self] in
            let view: TappableBase64ImageView? = TappableBase64ImageView(json: decodedViewJson)

            let components = identifier.components(separatedBy: String(FrameworksLabelCaptureSession.separator))
            guard let trackingId = Int(components[0]) else {
                call.reject("Invalid tracking ID in identifier")
                return
            }
            let fieldName = components[1]

            let viewForLabel = ViewForLabel(
                dataCaptureViewId: dataCaptureViewId,
                view: view,
                trackingId: trackingId,
                fieldName: fieldName
            )

            self?.labelModule.setViewForFieldOfLabel(viewForFieldOfLabel: viewForLabel, result: CapacitorResult(call))
        }
    }

    @objc func setAnchorForCapturedLabelField(_ call: CAPPluginCall) {
        guard let anchor = call.getString("anchor"),
            let identifier = call.getString("identifier")
        else {
            call.reject("anchor and identifier parameters are required")
            return
        }
        let dataCaptureViewId = getDataCaptureViewId(call)

        let components = identifier.components(separatedBy: String(FrameworksLabelCaptureSession.separator))
        guard let trackingId = Int(components[0]) else {
            call.reject("Invalid tracking ID in identifier")
            return
        }
        let fieldName = components[1]

        let anchorForLabelField = AnchorForLabel(
            dataCaptureViewId: dataCaptureViewId,
            anchorString: anchor,
            trackingId: trackingId,
            fieldName: fieldName
        )
        labelModule.setAnchorForFieldOfLabel(anchorForFieldOfLabel: anchorForLabelField, result: CapacitorResult(call))
    }

    @objc func setOffsetForCapturedLabelField(_ call: CAPPluginCall) {
        guard let offsetJson = call.getString("offset"),
            let identifier = call.getString("identifier")
        else {
            call.reject("offset and identifier parameters are required")
            return
        }

        let dataCaptureViewId = getDataCaptureViewId(call)
        let components = identifier.components(separatedBy: String(FrameworksLabelCaptureSession.separator))
        guard let trackingId = Int(components[0]) else {
            call.reject("Invalid tracking ID in identifier")
            return
        }
        let fieldName = components[1]
        let offsetForLabelField = OffsetForLabel(
            dataCaptureViewId: dataCaptureViewId,
            offsetJson: offsetJson,
            trackingId: trackingId,
            fieldName: fieldName
        )
        labelModule.setOffsetForCapturedLabel(offsetForLabel: offsetForLabelField, result: CapacitorResult(call))
    }

    @objc func clearCapturedLabelViews(_ call: CAPPluginCall) {
        let dataCaptureViewId = getDataCaptureViewId(call)
        labelModule.clearTrackedCapturedLabelViews(dataCaptureViewId)
        call.resolve()
    }

    @objc func registerListenerForAdvancedOverlayEvents(_ call: CAPPluginCall) {
        labelModule.addAdvancedOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @objc func unregisterListenerForAdvancedOverlayEvents(_ call: CAPPluginCall) {
        labelModule.removeAdvancedOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @objc func updateLabelCaptureAdvancedOverlay(_ call: CAPPluginCall) {
        guard let advancedOverlayJson = call.getString("advancedOverlayJson") else {
            call.reject("advancedOverlayJson parameter is required")
            return
        }
        let dataCaptureViewId = getDataCaptureViewId(call)
        labelModule.updateAdvancedOverlay(
            dataCaptureViewId,
            overlayJson: advancedOverlayJson,
            result: CapacitorResult(call)
        )
    }

    // Basic Overlay Methods
    @objc func setBrushForFieldOfLabel(_ call: CAPPluginCall) {
        guard let fieldName = call.getString("fieldName") else {
            call.reject("fieldName parameter is required")
            return
        }
        let dataCaptureViewId = getDataCaptureViewId(call)
        let brushJson = call.getString("brushJson")
        let trackingId = call.getInt("trackingId", 0)
        let brushForFieldOfLabel = BrushForLabelField(
            dataCaptureViewId: dataCaptureViewId,
            brushJson: brushJson,
            labelTrackingId: trackingId,
            fieldName: fieldName
        )
        labelModule.setBrushForFieldOfLabel(brushForFieldOfLabel: brushForFieldOfLabel, result: CapacitorResult(call))
    }

    @objc func setBrushForLabel(_ call: CAPPluginCall) {
        let dataCaptureViewId = getDataCaptureViewId(call)
        let brushJson = call.getString("brushJson")
        let trackingId = call.getInt("trackingId", 0)

        let brushForLabel = BrushForLabelField(
            dataCaptureViewId: dataCaptureViewId,
            brushJson: brushJson,
            labelTrackingId: trackingId
        )

        labelModule.setBrushForLabel(brushForLabel: brushForLabel, result: CapacitorResult(call))
    }

    @objc func registerListenerForBasicOverlayEvents(_ call: CAPPluginCall) {
        labelModule.addBasicOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @objc func unregisterListenerForBasicOverlayEvents(_ call: CAPPluginCall) {
        labelModule.removeBasicOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @objc func registerListenerForValidationFlowEvents(_ call: CAPPluginCall) {
        labelModule.addValidationFlowOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @objc func unregisterListenerForValidationFlowEvents(_ call: CAPPluginCall) {
        labelModule.removeValidationFlowOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @objc func updateLabelCaptureBasicOverlay(_ call: CAPPluginCall) {
        guard let basicOverlayJson = call.getString("basicOverlayJson") else {
            call.reject("basicOverlayJson parameter is required")
            return
        }
        let dataCaptureViewId = getDataCaptureViewId(call)
        labelModule.updateBasicOverlay(dataCaptureViewId, overlayJson: basicOverlayJson, result: CapacitorResult(call))
    }

    @objc func updateLabelCaptureValidationFlowOverlay(_ call: CAPPluginCall) {
        guard let overlayJson = call.getString("overlayJson") else {
            call.reject("overlayJson parameter is required")
            return
        }
        let dataCaptureViewId = getDataCaptureViewId(call)
        labelModule.updateValidationFlowOverlay(
            dataCaptureViewId,
            overlayJson: overlayJson,
            result: CapacitorResult(call)
        )
    }

    private func getModeId(_ call: CAPPluginCall) -> Int {
        call.getInt("modeId", 0)
    }

    private func getViewId(_ call: CAPPluginCall) -> Int {
        call.getInt("viewId", 0)
    }

    private func getDataCaptureViewId(_ call: CAPPluginCall) -> Int {
        call.getInt("dataCaptureViewId", 0)
    }
}
