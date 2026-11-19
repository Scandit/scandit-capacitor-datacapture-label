/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2025- Scandit AG. All rights reserved.
 */
package com.scandit.capacitor.datacapture.label;

import android.Manifest;
import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginHandle;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.scandit.capacitor.datacapture.core.ScanditCaptureCoreNative;
import com.scandit.capacitor.datacapture.core.utils.CapacitorMethodCall;
import com.scandit.capacitor.datacapture.core.utils.CapacitorResult;
import com.scandit.datacapture.frameworks.core.CoreModule;
import com.scandit.datacapture.frameworks.core.events.Emitter;
import com.scandit.datacapture.frameworks.core.locator.DefaultServiceLocator;
import com.scandit.datacapture.frameworks.core.utils.DefaultFrameworksLog;
import com.scandit.datacapture.frameworks.core.utils.FrameworksLog;
import com.scandit.datacapture.frameworks.label.LabelCaptureModule;
import java.util.HashMap;
import java.util.Map;
import org.json.JSONException;
import org.json.JSONObject;

@CapacitorPlugin(
    name = "ScanditLabelNative",
    permissions = {
      @Permission(
          strings = {Manifest.permission.CAMERA},
          alias = "camera")
    })
public class ScanditLabelNative extends Plugin implements Emitter {

  private static final String CORE_PLUGIN_NAME = "ScanditCaptureCoreNative";

  private final LabelCaptureModule labelModule;
  private final FrameworksLog logger;
  private final DefaultServiceLocator serviceLocator;

  public ScanditLabelNative() {
    this.labelModule = LabelCaptureModule.create(this);
    this.logger = DefaultFrameworksLog.getInstance();
    this.serviceLocator = DefaultServiceLocator.getInstance();
  }

  @Override
  public void load() {
    super.load();

    // We need to register the plugin with its Core dependency for serializers to load.
    PluginHandle corePlugin = getBridge().getPlugin(CORE_PLUGIN_NAME);
    if (corePlugin != null) {
      ((ScanditCaptureCoreNative) corePlugin.getInstance())
          .registerPluginInstance(getPluginHandle().getInstance());
    } else {
      logger.error("Core not found");
    }

    labelModule.onCreate(getContext());
  }

  @Override
  protected void handleOnDestroy() {
    labelModule.onDestroy();
  }

  private boolean checkCameraPermission() {
    return getPermissionState("camera") == PermissionState.GRANTED;
  }

  @SuppressWarnings("unused")
  @PermissionCallback
  private void onCameraPermissionResult(PluginCall call) {
    if (checkCameraPermission()) {
      call.resolve();
      return;
    }

    call.reject("Camera permissions not granted.");
  }

  @PluginMethod
  public void getDefaults(PluginCall call) {
    Map<String, Object> defaultsMap = new HashMap<>();
    defaultsMap.put("LabelCapture", labelModule.getDefaults());

    JSObject defaults = null;
    try {
      defaults = JSObject.fromJSONObject(new JSONObject(defaultsMap));
    } catch (JSONException e) {
      call.reject("Unable to get the label capture defaults.", e);
    }
    call.resolve(defaults);
  }

  @PluginMethod
  public void executeLabel(PluginCall call) {
    CoreModule coreModule = (CoreModule) serviceLocator.resolve(CoreModule.class.getSimpleName());

    if (coreModule == null) {
      call.reject("Unable to retrieve the CoreModule from the locator.");
      return;
    }

    boolean result =
        coreModule.execute(new CapacitorMethodCall(call), new CapacitorResult(call), labelModule);

    if (!result) {
      String methodName = call.getData().getString("methodName");
      if (methodName == null) {
        methodName = "unknown";
      }
      call.reject("Unknown method: " + methodName);
    }
  }

  @Override
  public void emit(@NonNull String eventName, @NonNull Map<String, Object> payload) {
    JSObject capacitorPayload = new JSObject();
    capacitorPayload.put("name", eventName);
    capacitorPayload.put("data", new JSONObject(payload).toString());

    notifyListeners(eventName, capacitorPayload);
  }

  @Override
  public boolean hasListenersForEvent(@NonNull String eventName) {
    return this.hasListeners(eventName);
  }

  @Override
  public boolean hasViewSpecificListenersForEvent(int viewId, @NonNull String eventName) {
    return this.hasListenersForEvent(eventName);
  }

  @Override
  public boolean hasModeSpecificListenersForEvent(int modeId, @NonNull String eventName) {
    return this.hasListenersForEvent(eventName);
  }
}
