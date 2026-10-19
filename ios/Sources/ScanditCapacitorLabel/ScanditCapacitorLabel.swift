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
        CAPPluginMethod(name: "executeLabel", returnType: CAPPluginReturnPromise),
    ]

    private var labelModule: LabelCaptureModule!

    override public func load() {
        let emitter = CapacitorEventEmitter(with: self)
        labelModule = LabelCaptureModule(emitter: emitter)
        labelModule.didStart()
    }

    @objc func getDefaults(_ call: CAPPluginCall) {
        let defaults = labelModule.getDefaults()
        let defaultsResult = ["LabelCapture": defaults]
        call.resolve(defaultsResult)
    }

    /// Single entry point for all Label operations.
    /// Routes method calls to the appropriate command via the shared command factory.
    @objc(executeLabel:)
    func executeLabel(_ call: CAPPluginCall) {

        let coreModuleName = String(describing: CoreModule.self)
        guard let coreModule = DefaultServiceLocator.shared.resolve(clazzName: coreModuleName) as? CoreModule else {
            call.reject("Unable to retrieve the CoreModule from the locator.")
            return
        }

        let result = CapacitorResult(call)
        let handled = coreModule.execute(
            CapacitorMethodCall(call),
            result: result,
            module: labelModule
        )

        if !handled {
            let methodName = call.getString("methodName") ?? "unknown"
            call.reject("Unknown Core method: \(methodName)")
        }
    }
}
