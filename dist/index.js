import { nameForSerialization, ignoreFromSerializationIfNull, serializationDefault, NoViewfinder, DefaultSerializeable, ignoreFromSerialization, Quadrilateral, CameraSettings, Rect, Point, Size, FactoryMaker, BaseController, Anchor, PointWithUnit, Brush, Feedback, registerProxies } from 'scandit-capacitor-datacapture-core/dist/core';
import { Barcode, getBarcodeDefaults } from 'scandit-capacitor-datacapture-barcode/dist/barcode';
import { registerPlugin } from '@capacitor/core';
import { CapacitorCore, capacitorExec, CapacitorNativeCaller } from 'scandit-capacitor-datacapture-core';

function loadLabelCaptureDefaults(jsonDefaults) {
    const defaults = parseLabelCaptureDefaults(jsonDefaults);
    FactoryMaker.bindInstanceIfNotExists('LabelCaptureDefaults', defaults);
}
function getLabelCaptureDefaults() {
    return FactoryMaker.getInstance('LabelCaptureDefaults');
}
function parseLabelCaptureDefaults(jsonDefaults) {
    return {
        LabelCapture: {
            RecommendedCameraSettings: CameraSettings
                .fromJSON(jsonDefaults.LabelCapture.RecommendedCameraSettings),
            LabelCaptureBasicOverlay: {
                DefaultPredictedFieldBrush: Brush.fromJSON(jsonDefaults.LabelCapture.LabelCaptureBasicOverlay.DefaultPredictedFieldBrush),
                DefaultCapturedFieldBrush: Brush.fromJSON(jsonDefaults.LabelCapture.LabelCaptureBasicOverlay.DefaultCapturedFieldBrush),
                DefaultLabelBrush: Brush.fromJSON(jsonDefaults.LabelCapture.LabelCaptureBasicOverlay.DefaultLabelBrush)
            },
            LabelCaptureValidationFlowOverlay: {
                Settings: {
                    missingFieldsHintText: jsonDefaults.LabelCapture.LabelCaptureValidationFlowOverlay.Settings.missingFieldsHintText,
                    standbyHintText: jsonDefaults.LabelCapture.LabelCaptureValidationFlowOverlay.Settings.standbyHintText,
                    validationHintText: jsonDefaults.LabelCapture.LabelCaptureValidationFlowOverlay.Settings.validationHintText,
                    validationErrorText: jsonDefaults.LabelCapture.LabelCaptureValidationFlowOverlay.Settings.validationErrorText,
                    requiredFieldErrorText: jsonDefaults.LabelCapture.LabelCaptureValidationFlowOverlay.Settings.requiredFieldErrorText,
                    manualInputButtonText: jsonDefaults.LabelCapture.LabelCaptureValidationFlowOverlay.Settings.manualInputButtonText,
                }
            },
            Feedback: {
                success: Feedback.fromJSON(JSON.parse(jsonDefaults.LabelCapture.feedback).success),
            },
        },
    };
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class LabelFieldDefinition extends DefaultSerializeable {
    get name() {
        return this._name;
    }
    get valueRegexes() {
        return this._valueRegexes;
    }
    set valueRegexes(value) {
        this._valueRegexes = value;
    }
    get optional() {
        return this._optional;
    }
    set optional(value) {
        this._optional = value;
    }
    get hiddenProperties() {
        return this._hiddenProperties;
    }
    set hiddenProperties(newValue) {
        for (const key in this._hiddenProperties) {
            if (Object.prototype.hasOwnProperty.call(this._hiddenProperties, key)) {
                delete this[key];
            }
        }
        for (const key in newValue) {
            if (Object.prototype.hasOwnProperty.call(newValue, key)) {
                const item = newValue[key];
                this[key] = item;
            }
        }
        this._hiddenProperties = newValue;
    }
    constructor(name) {
        super();
        this._valueRegexes = [];
        this._optional = false;
        this._hiddenProperties = {};
        this._name = name;
    }
}
__decorate([
    nameForSerialization('name')
], LabelFieldDefinition.prototype, "_name", void 0);
__decorate([
    nameForSerialization('patterns')
], LabelFieldDefinition.prototype, "_valueRegexes", void 0);
__decorate([
    nameForSerialization('optional')
], LabelFieldDefinition.prototype, "_optional", void 0);
__decorate([
    ignoreFromSerialization
], LabelFieldDefinition.prototype, "_hiddenProperties", void 0);

class BarcodeField extends LabelFieldDefinition {
    get symbologySettings() {
        return this._symbologySettings;
    }
    constructor(name, symbologies) {
        super(name);
        this._symbologySettings = symbologies;
        this._symbologies = symbologies.reduce((acc, item) => {
            acc[item.symbology.toString()] = item;
            return acc;
        }, {});
    }
}
__decorate([
    nameForSerialization('symbologies'),
    ignoreFromSerializationIfNull
], BarcodeField.prototype, "_symbologies", void 0);
__decorate([
    ignoreFromSerialization
], BarcodeField.prototype, "_symbologySettings", void 0);

class LabelDateResult extends DefaultSerializeable {
    static fromJSON(json) {
        return new LabelDateResult(json.day, json.month, json.year, json.dayStr, json.monthStr, json.yearStr);
    }
    constructor(day, month, year, dayString, monthString, yearString) {
        super();
        this._day = day;
        this._month = month;
        this._year = year;
        this._dayString = dayString;
        this._monthString = monthString;
        this._yearString = yearString;
    }
    get day() {
        return this._day;
    }
    get month() {
        return this._month;
    }
    get year() {
        return this._year;
    }
    get dayString() {
        var _a;
        return (_a = this._dayString) !== null && _a !== void 0 ? _a : '';
    }
    get monthString() {
        var _a;
        return (_a = this._monthString) !== null && _a !== void 0 ? _a : '';
    }
    get yearString() {
        var _a;
        return (_a = this._yearString) !== null && _a !== void 0 ? _a : '';
    }
}
__decorate([
    nameForSerialization('day')
], LabelDateResult.prototype, "_day", void 0);
__decorate([
    nameForSerialization('month')
], LabelDateResult.prototype, "_month", void 0);
__decorate([
    nameForSerialization('year')
], LabelDateResult.prototype, "_year", void 0);
__decorate([
    nameForSerialization('dayStr')
], LabelDateResult.prototype, "_dayString", void 0);
__decorate([
    nameForSerialization('monthStr')
], LabelDateResult.prototype, "_monthString", void 0);
__decorate([
    nameForSerialization('yearStr')
], LabelDateResult.prototype, "_yearString", void 0);

class LabelField {
    static fromJSON(json) {
        const field = new LabelField();
        field._name = json.name;
        field._type = json.type;
        field._predictedLocation = Quadrilateral.fromJSON(json.location);
        field._state = json.state;
        field._isRequired = json.isRequired;
        field._barcode = json.barcode ? Barcode['fromJSON'](json.barcode) : null;
        field._text = json.text;
        field._dateResult = json.date ? LabelDateResult.fromJSON(json.date) : null;
        return field;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get predictedLocation() {
        return this._predictedLocation;
    }
    get state() {
        return this._state;
    }
    get isRequired() {
        return this._isRequired;
    }
    get barcode() {
        return this._barcode;
    }
    get text() {
        return this._text;
    }
    asDate() {
        return this._dateResult;
    }
}

class CapturedLabel {
    get fields() {
        return this._fields;
    }
    get name() {
        return this._name;
    }
    get isComplete() {
        return this._isComplete;
    }
    get predictedBounds() {
        return this._predictedBounds;
    }
    get deltaTimeToPrediction() {
        return this._deltaTimeToPrediction;
    }
    get trackingID() {
        return this._trackingID;
    }
    static fromJSON(json) {
        const label = new CapturedLabel();
        label._fields = json.fields.map(LabelField.fromJSON);
        label._name = json.name;
        label._predictedBounds = Quadrilateral.fromJSON(json.predictedBounds);
        label._deltaTimeToPrediction = json.deltaTimeToPrediction;
        label._trackingID = json.trackingId;
        label._isComplete = json.isComplete;
        return label;
    }
}

class CustomBarcode extends BarcodeField {
    static initWithNameAndSymbologySettings(name, symbologySettings) {
        return new CustomBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbologies(name, symbologies) {
        const symbologySettings = Object.values(symbologies).map(symbology => {
            const symbologyObj = CustomBarcode.barcodeDefaults.SymbologySettings[symbology];
            symbologyObj.isEnabled = true;
            return symbologyObj;
        });
        return new CustomBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbology(name, symbology) {
        return CustomBarcode.initWithNameAndSymbologies(name, [symbology]);
    }
    constructor(name, symbologies) {
        super(name, symbologies);
        this.location = null;
        this._anchorRegexes = null;
        this._fieldType = 'customBarcode';
    }
    get anchorRegexes() {
        var _a;
        return (_a = this._anchorRegexes) !== null && _a !== void 0 ? _a : [];
    }
    set anchorRegexes(value) {
        this._anchorRegexes = value;
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
}
__decorate([
    nameForSerialization('location')
], CustomBarcode.prototype, "location", void 0);
__decorate([
    nameForSerialization('dataTypePatterns')
], CustomBarcode.prototype, "_anchorRegexes", void 0);
__decorate([
    nameForSerialization('fieldType')
], CustomBarcode.prototype, "_fieldType", void 0);

class TextField extends LabelFieldDefinition {
}

class CustomText extends TextField {
    constructor(name) {
        super(name);
        this.location = null;
        this._anchorRegexes = null;
        this._fieldType = 'customText';
    }
    get anchorRegexes() {
        var _a;
        return (_a = this._anchorRegexes) !== null && _a !== void 0 ? _a : [];
    }
    set anchorRegexes(value) {
        this._anchorRegexes = value;
    }
}
__decorate([
    nameForSerialization('location')
], CustomText.prototype, "location", void 0);
__decorate([
    nameForSerialization('dataTypePatterns')
], CustomText.prototype, "_anchorRegexes", void 0);
__decorate([
    nameForSerialization('fieldType')
], CustomText.prototype, "_fieldType", void 0);

class ExpiryDateText extends TextField {
    constructor(name) {
        super(name);
        this._fieldType = 'expiryDateText';
        this._anchorRegexes = null;
        this._labelDateFormat = null;
    }
    get labelDateFormat() {
        return this._labelDateFormat;
    }
    set labelDateFormat(value) {
        this._labelDateFormat = value;
    }
    get anchorRegexes() {
        var _a;
        return (_a = this._anchorRegexes) !== null && _a !== void 0 ? _a : [];
    }
    set anchorRegexes(value) {
        this._anchorRegexes = value;
    }
}
__decorate([
    nameForSerialization('fieldType')
], ExpiryDateText.prototype, "_fieldType", void 0);
__decorate([
    nameForSerialization('dataTypePatterns')
], ExpiryDateText.prototype, "_anchorRegexes", void 0);
__decorate([
    nameForSerialization('labelDateFormat')
], ExpiryDateText.prototype, "_labelDateFormat", void 0);

class ImeiOneBarcode extends BarcodeField {
    static initWithNameAndSymbologySettings(name, symbologySettings) {
        return new ImeiOneBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbologies(name, symbologies) {
        const symbologySettings = Object.values(symbologies).map(symbology => {
            const symbologyObj = ImeiOneBarcode.barcodeDefaults.SymbologySettings[symbology];
            symbologyObj.isEnabled = true;
            return symbologyObj;
        });
        return new ImeiOneBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbology(name, symbology) {
        return ImeiOneBarcode.initWithNameAndSymbologies(name, [symbology]);
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    constructor(name, symbologies) {
        super(name, symbologies);
        this._fieldType = 'imeiOneBarcode';
    }
}
__decorate([
    nameForSerialization('fieldType')
], ImeiOneBarcode.prototype, "_fieldType", void 0);

class ImeiTwoBarcode extends BarcodeField {
    static initWithNameAndSymbologySettings(name, symbologySettings) {
        return new ImeiTwoBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbologies(name, symbologies) {
        const symbologySettings = Object.values(symbologies).map(symbology => {
            const symbologyObj = ImeiTwoBarcode.barcodeDefaults.SymbologySettings[symbology];
            symbologyObj.isEnabled = true;
            return symbologyObj;
        });
        return new ImeiTwoBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbology(name, symbology) {
        return ImeiTwoBarcode.initWithNameAndSymbologies(name, [symbology]);
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    constructor(name, symbologies) {
        super(name, symbologies);
        this._fieldType = 'imeiTwoBarcode';
    }
}
__decorate([
    nameForSerialization('fieldType')
], ImeiTwoBarcode.prototype, "_fieldType", void 0);

class LabelCaptureSession {
    get capturedLabels() {
        return this._capturedLabels;
    }
    get frameSequenceID() {
        return this._frameSequenceID;
    }
    static fromJSON(json) {
        const session = new LabelCaptureSession();
        session._frameSequenceID = json.frameSequenceId;
        session._capturedLabels = json.labels
            .map(CapturedLabel.fromJSON);
        session._capturedLabels
            .forEach(label => label.frameSequenceID = session._frameSequenceID);
        return session;
    }
}

var LabelCaptureListenerEvents;
(function (LabelCaptureListenerEvents) {
    LabelCaptureListenerEvents["didUpdateSession"] = "LabelCaptureListener.didUpdateSession";
})(LabelCaptureListenerEvents || (LabelCaptureListenerEvents = {}));
class LabelCaptureController extends BaseController {
    constructor(mode) {
        super('LabelCaptureProxy');
        this.mode = mode;
        this.initialize().catch(error => console.error('Failed to initialize LabelCaptureController:', error));
    }
    setModeEnabledState(isEnabled) {
        return this._proxy.$setModeEnabledState({ modeId: this.modeId, isEnabled });
    }
    updateLabelCaptureSettings(settingsJson) {
        return this._proxy.$updateLabelCaptureSettings({ modeId: this.modeId, settingsJson });
    }
    subscribeLabelCaptureListener() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._boundHandleDidUpdateSession) {
                return;
            }
            yield this._proxy.$registerListenerForEvents({ modeId: this.modeId });
            this._boundHandleDidUpdateSession = this.handleDidUpdateSessionEvent.bind(this);
            this._proxy.subscribeForEvents(Object.values(LabelCaptureListenerEvents));
            this._proxy.eventEmitter.on(LabelCaptureListenerEvents.didUpdateSession, this._boundHandleDidUpdateSession);
        });
    }
    unsubscribeLabelCaptureListener() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._proxy.$unregisterListenerForEvents({ modeId: this.modeId });
            this._proxy.unsubscribeFromEvents(Object.values(LabelCaptureListenerEvents));
            if (this._boundHandleDidUpdateSession) {
                this._proxy.eventEmitter.off(LabelCaptureListenerEvents.didUpdateSession, this._boundHandleDidUpdateSession);
                this._boundHandleDidUpdateSession = undefined;
            }
        });
    }
    updateFeedback(feedback) {
        return this._proxy.$updateLabelCaptureFeedback({ modeId: this.modeId, feedbackJson: JSON.stringify(feedback.toJSON()) });
    }
    dispose() {
        void this.unsubscribeLabelCaptureListener();
        this._proxy.dispose();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mode.listeners.length > 0) {
                yield this.subscribeLabelCaptureListener();
            }
        });
    }
    handleDidUpdateSessionEvent(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(ev.data);
            const session = LabelCaptureSession.fromJSON(JSON.parse(payload.session));
            this.notifyListenersOfDidUpdateSession(session);
            yield this._proxy.$finishDidUpdateSessionCallback({ modeId: this.modeId, isEnabled: this.mode.isEnabled });
        });
    }
    get modeId() {
        return this.mode.modeId;
    }
    notifyListenersOfDidUpdateSession(session) {
        const mode = this.mode;
        mode.listeners.forEach(listener => {
            if (listener.didUpdateSession) {
                listener.didUpdateSession(this.mode, session);
            }
        });
    }
}

class LabelCaptureFeedback extends DefaultSerializeable {
    static get defaultFeedback() {
        return new LabelCaptureFeedback();
    }
    static get labelCaptureDefaults() {
        return getLabelCaptureDefaults();
    }
    get success() {
        return this._success;
    }
    set success(success) {
        this._success = success;
        void this.updateFeedback();
    }
    constructor() {
        super();
        this.controller = null;
        this._success = LabelCaptureFeedback.labelCaptureDefaults.LabelCapture.Feedback.success;
    }
    updateFeedback() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(this);
        });
    }
}
__decorate([
    nameForSerialization('success')
], LabelCaptureFeedback.prototype, "_success", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureFeedback.prototype, "controller", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureFeedback, "labelCaptureDefaults", null);

class LabelCapture extends DefaultSerializeable {
    static createRecommendedCameraSettings() {
        return new CameraSettings(getLabelCaptureDefaults().LabelCapture.RecommendedCameraSettings);
    }
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(isEnabled) {
        var _a;
        this._isEnabled = isEnabled;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.setModeEnabledState(isEnabled));
    }
    get context() {
        return this._context;
    }
    get _context() {
        return this.privateContext;
    }
    set _context(newContext) {
        var _a, _b;
        if (newContext == null) {
            (_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose();
            this.controller = null;
            this._feedback.controller = null;
            return;
        }
        this.privateContext = newContext;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new LabelCaptureController(this));
        this._feedback.controller = this.controller;
    }
    constructor(settings) {
        super();
        this.listeners = [];
        this.type = 'labelCapture';
        this.modeId = Math.floor(Math.random() * 100000000);
        this.parentId = null;
        this._isEnabled = true;
        this._feedback = LabelCaptureFeedback.defaultFeedback;
        this.hasListeners = false;
        this.privateContext = null;
        this.controller = null;
        this.settings = settings;
    }
    applySettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.settings = settings;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateLabelCaptureSettings(JSON.stringify(settings.toJSON()));
        });
    }
    addListener(listener) {
        var _a;
        if (this.listeners.includes(listener)) {
            return;
        }
        if (this.listeners.length === 0) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribeLabelCaptureListener());
            this.hasListeners = true;
        }
        this.listeners.push(listener);
    }
    removeListener(listener) {
        var _a;
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener), 1);
        if (this.listeners.length === 0) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.unsubscribeLabelCaptureListener());
            this.hasListeners = false;
        }
    }
    get feedback() {
        return this._feedback;
    }
    set feedback(feedback) {
        var _a;
        this._feedback.controller = null;
        this._feedback = feedback;
        this._feedback.controller = this.controller;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(feedback));
    }
}
__decorate([
    ignoreFromSerialization
], LabelCapture.prototype, "listeners", void 0);
__decorate([
    nameForSerialization('parentId'),
    ignoreFromSerializationIfNull
], LabelCapture.prototype, "parentId", void 0);
__decorate([
    nameForSerialization('enabled')
], LabelCapture.prototype, "_isEnabled", void 0);
__decorate([
    nameForSerialization('feedback')
], LabelCapture.prototype, "_feedback", void 0);
__decorate([
    ignoreFromSerialization
], LabelCapture.prototype, "privateContext", void 0);
__decorate([
    ignoreFromSerialization
], LabelCapture.prototype, "controller", void 0);

var LabelCaptureAdvancedOverlayListenerEvents;
(function (LabelCaptureAdvancedOverlayListenerEvents) {
    LabelCaptureAdvancedOverlayListenerEvents["viewForLabel"] = "LabelCaptureAdvancedOverlayListener.viewForLabel";
    LabelCaptureAdvancedOverlayListenerEvents["anchorForLabel"] = "LabelCaptureAdvancedOverlayListener.anchorForLabel";
    LabelCaptureAdvancedOverlayListenerEvents["offsetForLabel"] = "LabelCaptureAdvancedOverlayListener.offsetForLabel";
    LabelCaptureAdvancedOverlayListenerEvents["viewForCapturedLabelField"] = "LabelCaptureAdvancedOverlayListener.viewForFieldOfLabel";
    LabelCaptureAdvancedOverlayListenerEvents["anchorForCapturedLabelField"] = "LabelCaptureAdvancedOverlayListener.anchorForFieldOfLabel";
    LabelCaptureAdvancedOverlayListenerEvents["offsetForCapturedLabelField"] = "LabelCaptureAdvancedOverlayListener.offsetForFieldOfLabel";
})(LabelCaptureAdvancedOverlayListenerEvents || (LabelCaptureAdvancedOverlayListenerEvents = {}));
class LabelCaptureAdvancedOverlayController extends BaseController {
    constructor(overlay) {
        super('LabelCaptureAdvancedOverlayProxy');
        // Arrow function wrappers to avoid .bind(this) and always use current class state
        this.handleViewForLabelWrapper = (ev) => __awaiter(this, void 0, void 0, function* () {
            return this.handleViewForLabel(ev);
        });
        this.handleAnchorForLabelWrapper = (ev) => __awaiter(this, void 0, void 0, function* () {
            return this.handleAnchorForLabel(ev);
        });
        this.handleOffsetForLabelWrapper = (ev) => __awaiter(this, void 0, void 0, function* () {
            return this.handleOffsetForLabel(ev);
        });
        this.handleViewForCapturedLabelFieldWrapper = (ev) => __awaiter(this, void 0, void 0, function* () {
            return this.handleViewForCapturedLabelField(ev);
        });
        this.handleAnchorForCapturedLabelFieldWrapper = (ev) => __awaiter(this, void 0, void 0, function* () {
            return this.handleAnchorForCapturedLabelField(ev);
        });
        this.handleOffsetForCapturedLabelFieldWrapper = (ev) => __awaiter(this, void 0, void 0, function* () {
            return this.handleOffsetForCapturedLabelField(ev);
        });
        this.overlay = overlay;
        void this.initialize();
    }
    setViewForCapturedLabel(label, view) {
        return __awaiter(this, void 0, void 0, function* () {
            const awitedView = yield view;
            return this._proxy.$setViewForCapturedLabel({
                jsonView: awitedView ? JSON.stringify(awitedView.toJSON()) : null,
                trackingId: label.trackingID,
                dataCaptureViewId: this.dataCaptureViewId
            });
        });
    }
    setAnchorForCapturedLabel(label, anchor) {
        return this._proxy.$setAnchorForCapturedLabel({
            anchor: anchor,
            trackingId: label.trackingID,
            dataCaptureViewId: this.dataCaptureViewId
        });
    }
    setOffsetForCapturedLabel(label, offset) {
        return this._proxy.$setOffsetForCapturedLabel({
            offsetJson: JSON.stringify(offset.toJSON()),
            trackingId: label.trackingID,
            dataCaptureViewId: this.dataCaptureViewId
        });
    }
    setViewForCapturedLabelField(label, field, view) {
        const identifier = `${label.trackingID}§${field.name}`;
        return this.setViewForCapturedLabelFieldPrivate(identifier, view);
    }
    setAnchorForCapturedLabelField(label, field, anchor) {
        const identifier = `${label.trackingID}§${field.name}`;
        return this.setAnchorForCapturedLabelFieldPrivate(identifier, anchor);
    }
    setOffsetForCapturedLabelField(label, field, offset) {
        const identifier = `${label.trackingID}§${field.name}`;
        return this.setOffsetForCapturedLabelFieldPrivate(identifier, offset);
    }
    clearCapturedLabelViews() {
        return this._proxy.$clearCapturedLabelViews({ dataCaptureViewId: this.dataCaptureViewId });
    }
    subscribeListener() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dataCaptureViewId !== -1) {
                yield this._proxy.$registerListenerForAdvancedOverlayEvents({ dataCaptureViewId: this.dataCaptureViewId });
            }
            this._proxy.subscribeForEvents(Object.values(LabelCaptureAdvancedOverlayListenerEvents));
            this._proxy.eventEmitter.on(LabelCaptureAdvancedOverlayListenerEvents.viewForLabel, this.handleViewForLabelWrapper);
            this._proxy.eventEmitter.on(LabelCaptureAdvancedOverlayListenerEvents.anchorForLabel, this.handleAnchorForLabelWrapper);
            this._proxy.eventEmitter.on(LabelCaptureAdvancedOverlayListenerEvents.offsetForLabel, this.handleOffsetForLabelWrapper);
            this._proxy.eventEmitter.on(LabelCaptureAdvancedOverlayListenerEvents.viewForCapturedLabelField, this.handleViewForCapturedLabelFieldWrapper);
            this._proxy.eventEmitter.on(LabelCaptureAdvancedOverlayListenerEvents.anchorForCapturedLabelField, this.handleAnchorForCapturedLabelFieldWrapper);
            this._proxy.eventEmitter.on(LabelCaptureAdvancedOverlayListenerEvents.offsetForCapturedLabelField, this.handleOffsetForCapturedLabelFieldWrapper);
        });
    }
    unsubscribeListener() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._proxy.$unregisterListenerForAdvancedOverlayEvents({ dataCaptureViewId: this.dataCaptureViewId });
            this._proxy.unsubscribeFromEvents(Object.values(LabelCaptureAdvancedOverlayListenerEvents));
            this._proxy.eventEmitter.off(LabelCaptureAdvancedOverlayListenerEvents.viewForLabel, this.handleViewForLabelWrapper);
            this._proxy.eventEmitter.off(LabelCaptureAdvancedOverlayListenerEvents.anchorForLabel, this.handleAnchorForLabelWrapper);
            this._proxy.eventEmitter.off(LabelCaptureAdvancedOverlayListenerEvents.offsetForLabel, this.handleOffsetForLabelWrapper);
            this._proxy.eventEmitter.off(LabelCaptureAdvancedOverlayListenerEvents.viewForCapturedLabelField, this.handleViewForCapturedLabelFieldWrapper);
            this._proxy.eventEmitter.off(LabelCaptureAdvancedOverlayListenerEvents.anchorForCapturedLabelField, this.handleAnchorForCapturedLabelFieldWrapper);
            this._proxy.eventEmitter.off(LabelCaptureAdvancedOverlayListenerEvents.offsetForCapturedLabelField, this.handleOffsetForCapturedLabelFieldWrapper);
        });
    }
    dispose() {
        void this.unsubscribeListener();
        this._proxy.dispose();
    }
    updateAdvancedOverlay(advancedOverlayJson) {
        return this._proxy.$updateLabelCaptureAdvancedOverlay({ dataCaptureViewId: this.dataCaptureViewId, advancedOverlayJson });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.overlay.listener) {
                return this.subscribeListener();
            }
        });
    }
    setViewForCapturedLabelFieldPrivate(identifier, view) {
        return __awaiter(this, void 0, void 0, function* () {
            const awitedView = yield view;
            return this._proxy.$setViewForCapturedLabelField({
                view: awitedView ? JSON.stringify(awitedView.toJSON()) : null,
                identifier: identifier,
                dataCaptureViewId: this.dataCaptureViewId
            });
        });
    }
    setAnchorForCapturedLabelFieldPrivate(identifier, anchor) {
        return this._proxy.$setAnchorForCapturedLabelField({
            anchor: anchor,
            identifier: identifier,
            dataCaptureViewId: this.dataCaptureViewId
        });
    }
    setOffsetForCapturedLabelFieldPrivate(identifier, offset) {
        return this._proxy.$setOffsetForCapturedLabelField({
            offset: JSON.stringify(offset.toJSON()),
            identifier: identifier,
            dataCaptureViewId: this.dataCaptureViewId
        });
    }
    handleViewForLabel(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(ev.data);
            let view = null;
            const label = CapturedLabel.fromJSON(JSON.parse(payload.label));
            if (this.overlay.listener && this.overlay.listener.viewForCapturedLabel) {
                view = this.overlay.listener.viewForCapturedLabel(this.overlay, label);
            }
            yield this.setViewForCapturedLabel(label, view);
        });
    }
    handleAnchorForLabel(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(ev.data);
            let anchor = Anchor.Center;
            const label = CapturedLabel.fromJSON(JSON.parse(payload.label));
            if (this.overlay.listener && this.overlay.listener.anchorForCapturedLabel) {
                anchor = this.overlay.listener.anchorForCapturedLabel(this.overlay, label);
            }
            yield this.setAnchorForCapturedLabel(label, anchor);
        });
    }
    handleViewForCapturedLabelField(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(ev.data);
            let view = null;
            const field = LabelField.fromJSON(JSON.parse(payload.field));
            if (this.overlay.listener && this.overlay.listener.viewForCapturedLabelField) {
                view = this.overlay.listener.viewForCapturedLabelField(this.overlay, field);
            }
            yield this.setViewForCapturedLabelFieldPrivate(payload.identifier, view);
        });
    }
    handleOffsetForLabel(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(ev.data);
            let offset = PointWithUnit.zero;
            const label = CapturedLabel.fromJSON(JSON.parse(payload.label));
            if (this.overlay.listener && this.overlay.listener.offsetForCapturedLabel) {
                offset = this.overlay.listener.offsetForCapturedLabel(this.overlay, label);
            }
            yield this.setOffsetForCapturedLabel(label, offset);
        });
    }
    handleAnchorForCapturedLabelField(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(ev.data);
            let anchor = Anchor.Center;
            const field = LabelField.fromJSON(JSON.parse(payload.field));
            if (this.overlay.listener && this.overlay.listener.anchorForCapturedLabelField) {
                anchor = this.overlay.listener.anchorForCapturedLabelField(this.overlay, field);
            }
            yield this.setAnchorForCapturedLabelFieldPrivate(payload.identifier, anchor);
        });
    }
    handleOffsetForCapturedLabelField(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(ev.data);
            let offset = PointWithUnit.zero;
            const field = LabelField.fromJSON(JSON.parse(payload.field));
            if (this.overlay.listener && this.overlay.listener.offsetForCapturedLabelField) {
                offset = this.overlay.listener.offsetForCapturedLabelField(this.overlay, field);
            }
            yield this.setOffsetForCapturedLabelFieldPrivate(payload.identifier, offset);
        });
    }
    get dataCaptureViewId() {
        var _a, _b;
        return (_b = (_a = this.overlay.view) === null || _a === void 0 ? void 0 : _a.viewId) !== null && _b !== void 0 ? _b : -1;
    }
}

class LabelCaptureAdvancedOverlay extends DefaultSerializeable {
    get view() {
        return this._view;
    }
    set view(newView) {
        var _a, _b;
        if (newView === null) {
            (_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose();
            this.controller = null;
            this._view = null;
            return;
        }
        this._view = newView;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new LabelCaptureAdvancedOverlayController(this));
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        var _a;
        this._shouldShowScanAreaGuides = shouldShow;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateAdvancedOverlay(JSON.stringify(this.toJSON())));
    }
    get listener() {
        return this._listener;
    }
    set listener(listener) {
        var _a, _b;
        this._listener = listener;
        this.hasListener = listener != null;
        if (this.hasListener) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribeListener());
        }
        else {
            void ((_b = this.controller) === null || _b === void 0 ? void 0 : _b.unsubscribeListener());
        }
    }
    constructor(mode) {
        super();
        this.type = 'labelCaptureAdvanced';
        this.controller = null;
        this._view = null;
        this._listener = null;
        this.hasListener = false;
        this._shouldShowScanAreaGuides = false;
        this.modeId = mode.modeId;
    }
    setViewForCapturedLabel(capturedLabel, view) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setViewForCapturedLabel(capturedLabel, view);
        });
    }
    setViewForCapturedLabelField(field, capturedLabel, view) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setViewForCapturedLabelField(capturedLabel, field, view);
        });
    }
    setAnchorForCapturedLabel(capturedLabel, anchor) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setAnchorForCapturedLabel(capturedLabel, anchor);
        });
    }
    setAnchorForCapturedLabelField(field, capturedLabel, anchor) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setAnchorForCapturedLabelField(capturedLabel, field, anchor);
        });
    }
    setOffsetForCapturedLabel(capturedLabel, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setOffsetForCapturedLabel(capturedLabel, offset);
        });
    }
    setOffsetForCapturedLabelField(field, capturedLabel, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setOffsetForCapturedLabelField(capturedLabel, field, offset);
        });
    }
    clearCapturedLabelViews() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.clearCapturedLabelViews();
        });
    }
}
__decorate([
    ignoreFromSerialization
], LabelCaptureAdvancedOverlay.prototype, "controller", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureAdvancedOverlay.prototype, "_view", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureAdvancedOverlay.prototype, "_listener", void 0);
__decorate([
    nameForSerialization('shouldShowScanAreaGuides')
], LabelCaptureAdvancedOverlay.prototype, "_shouldShowScanAreaGuides", void 0);

class LabelCaptureSettings extends DefaultSerializeable {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static fromJSON(json) {
        // tslint:disable-next-line:no-console
        throw new Error('This property is deprecated in favour of LabelCaptureSettings.settingsFromLabelDefinitions. Please update your code to use the new property.');
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    static settingsFromLabelDefinitions(definitions, properties) {
        const settings = new LabelCaptureSettings();
        settings._definitions = definitions;
        if (properties) {
            settings.properties = properties;
        }
        return settings;
    }
    constructor() {
        super();
        this._definitions = [];
        this.properties = {};
    }
    settingsForSymbology(symbology) {
        return LabelCaptureSettings.barcodeDefaults.SymbologySettings[symbology];
    }
    setProperty(name, value) {
        this[name] = value;
    }
    getProperty(name) {
        return this[name];
    }
}
__decorate([
    nameForSerialization('labelDefinitions')
], LabelCaptureSettings.prototype, "_definitions", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureSettings, "barcodeDefaults", null);

var LabelDateComponentFormat;
(function (LabelDateComponentFormat) {
    LabelDateComponentFormat["DMY"] = "dmy";
    LabelDateComponentFormat["MDY"] = "mdy";
    LabelDateComponentFormat["YMD"] = "ymd";
})(LabelDateComponentFormat || (LabelDateComponentFormat = {}));

class LabelDateFormat extends DefaultSerializeable {
    constructor(componentFormat, acceptPartialDates) {
        super();
        this._componentFormat = componentFormat;
        this._acceptPartialDates = acceptPartialDates;
    }
    get componentFormat() {
        return this._componentFormat;
    }
    get acceptPartialDates() {
        return this._acceptPartialDates;
    }
}
__decorate([
    nameForSerialization('componentFormat')
], LabelDateFormat.prototype, "_componentFormat", void 0);
__decorate([
    nameForSerialization('acceptPartialDates')
], LabelDateFormat.prototype, "_acceptPartialDates", void 0);

class LabelDefinition extends DefaultSerializeable {
    get name() {
        return this._name;
    }
    get fields() {
        return this._fields;
    }
    set fields(values) {
        this._fields = values;
    }
    get hiddenProperties() {
        return this._hiddenProperties;
    }
    set hiddenProperties(newValue) {
        for (const key in this._hiddenProperties) {
            if (Object.prototype.hasOwnProperty.call(this._hiddenProperties, key)) {
                delete this[key];
            }
        }
        for (const key in newValue) {
            if (Object.prototype.hasOwnProperty.call(newValue, key)) {
                const item = newValue[key];
                this[key] = item;
            }
        }
        this._hiddenProperties = newValue;
    }
    static createVinLabelDefinition(name) {
        const definition = new LabelDefinition(name);
        definition._type = 'vin';
        return definition;
    }
    static createPriceCaptureDefinition(name) {
        const definition = new LabelDefinition(name);
        definition._type = 'priceCapture';
        return definition;
    }
    static createSevenSegmentDisplayLabelDefinition(name) {
        const definition = new LabelDefinition(name);
        definition._type = 'sevenSegment';
        return definition;
    }
    static fromJSON(json) {
        const definition = new LabelDefinition(json.name);
        definition._fields = json.fields;
        definition.hiddenProperties = json.hidden_properties;
        return definition;
    }
    constructor(name) {
        super();
        this._name = '';
        this._fields = [];
        this._type = null;
        this._hiddenProperties = {};
        this._name = name;
    }
}
__decorate([
    nameForSerialization('name')
], LabelDefinition.prototype, "_name", void 0);
__decorate([
    nameForSerialization('fields')
], LabelDefinition.prototype, "_fields", void 0);
__decorate([
    nameForSerialization('type'),
    ignoreFromSerializationIfNull
], LabelDefinition.prototype, "_type", void 0);
__decorate([
    ignoreFromSerialization
], LabelDefinition.prototype, "_hiddenProperties", void 0);

var LabelFieldLocationType;
(function (LabelFieldLocationType) {
    LabelFieldLocationType["TopLeft"] = "topLeft";
    LabelFieldLocationType["TopRight"] = "topRight";
    LabelFieldLocationType["BottomRight"] = "bottomRight";
    LabelFieldLocationType["BottomLeft"] = "bottomLeft";
    LabelFieldLocationType["Top"] = "top";
    LabelFieldLocationType["Right"] = "right";
    LabelFieldLocationType["Bottom"] = "bottom";
    LabelFieldLocationType["Left"] = "left";
    LabelFieldLocationType["Center"] = "center";
    LabelFieldLocationType["WholeLabel"] = "wholeLabel";
})(LabelFieldLocationType || (LabelFieldLocationType = {}));

class LabelFieldLocation extends DefaultSerializeable {
    constructor() {
        super(...arguments);
        this._rect = null;
        this._type = null;
    }
    static forRect(rect) {
        const location = new LabelFieldLocation();
        location._rect = rect;
        return location;
    }
    static for(left, top, right, bottom) {
        const location = new LabelFieldLocation();
        location._rect = new Rect(new Point(left, top), new Size(right - left, bottom - top));
        return location;
    }
    static topLeft() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.TopLeft;
        return location;
    }
    static topRight() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.TopRight;
        return location;
    }
    static bottomLeft() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.BottomLeft;
        return location;
    }
    static bottomRight() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.BottomRight;
        return location;
    }
    static top() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.Top;
        return location;
    }
    static bottom() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.Bottom;
        return location;
    }
    static left() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.Left;
        return location;
    }
    static right() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.Right;
        return location;
    }
    static center() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.Center;
        return location;
    }
    static wholeLabel() {
        const location = new LabelFieldLocation();
        location._type = LabelFieldLocationType.WholeLabel;
        return location;
    }
}
__decorate([
    nameForSerialization('rect')
], LabelFieldLocation.prototype, "_rect", void 0);
__decorate([
    nameForSerialization('type'),
    ignoreFromSerializationIfNull
], LabelFieldLocation.prototype, "_type", void 0);

var LabelFieldState;
(function (LabelFieldState) {
    LabelFieldState["Captured"] = "captured";
    LabelFieldState["Predicted"] = "predicted";
    LabelFieldState["Unknown"] = "unknown";
})(LabelFieldState || (LabelFieldState = {}));

var LabelFieldType;
(function (LabelFieldType) {
    LabelFieldType["Barcode"] = "barcode";
    LabelFieldType["Text"] = "text";
    LabelFieldType["Unknown"] = "unknown";
})(LabelFieldType || (LabelFieldType = {}));

class PackingDateText extends TextField {
    constructor(name) {
        super(name);
        this._fieldType = 'packingDateText';
        this._anchorRegexes = null;
        this._labelDateFormat = null;
    }
    get anchorRegexes() {
        var _a;
        return (_a = this._anchorRegexes) !== null && _a !== void 0 ? _a : [];
    }
    get labelDateFormat() {
        return this._labelDateFormat;
    }
    set labelDateFormat(value) {
        this._labelDateFormat = value;
    }
}
__decorate([
    nameForSerialization('fieldType')
], PackingDateText.prototype, "_fieldType", void 0);
__decorate([
    nameForSerialization('dataTypePatterns')
], PackingDateText.prototype, "_anchorRegexes", void 0);
__decorate([
    nameForSerialization('labelDateFormat')
], PackingDateText.prototype, "_labelDateFormat", void 0);

class PartNumberBarcode extends BarcodeField {
    static initWithNameAndSymbologySettings(name, symbologySettings) {
        return new PartNumberBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbologies(name, symbologies) {
        const symbologySettings = Object.values(symbologies).map(symbology => {
            const symbologyObj = PartNumberBarcode.barcodeDefaults.SymbologySettings[symbology];
            symbologyObj.isEnabled = true;
            return symbologyObj;
        });
        return new PartNumberBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbology(name, symbology) {
        return PartNumberBarcode.initWithNameAndSymbologies(name, [symbology]);
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    constructor(name, symbologies) {
        super(name, symbologies);
        this._fieldType = 'partNumberBarcode';
    }
}
__decorate([
    nameForSerialization('fieldType')
], PartNumberBarcode.prototype, "_fieldType", void 0);

class SerialNumberBarcode extends BarcodeField {
    static initWithNameAndSymbologySettings(name, symbologySettings) {
        return new SerialNumberBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbologies(name, symbologies) {
        const symbologySettings = Object.values(symbologies).map(symbology => {
            const symbologyObj = SerialNumberBarcode.barcodeDefaults.SymbologySettings[symbology];
            symbologyObj.isEnabled = true;
            return symbologyObj;
        });
        return new SerialNumberBarcode(name, symbologySettings);
    }
    static initWithNameAndSymbology(name, symbology) {
        return SerialNumberBarcode.initWithNameAndSymbologies(name, [symbology]);
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    constructor(name, symbologies) {
        super(name, symbologies);
        this._fieldType = 'serialNumberBarcode';
    }
}
__decorate([
    nameForSerialization('fieldType')
], SerialNumberBarcode.prototype, "_fieldType", void 0);

class TotalPriceText extends TextField {
    constructor(name) {
        super(name);
        this._fieldType = 'totalPriceText';
        this._anchorRegexes = null;
    }
    get anchorRegexes() {
        var _a;
        return (_a = this._anchorRegexes) !== null && _a !== void 0 ? _a : [];
    }
    set anchorRegexes(value) {
        this._anchorRegexes = value;
    }
}
__decorate([
    nameForSerialization('fieldType')
], TotalPriceText.prototype, "_fieldType", void 0);
__decorate([
    nameForSerialization('dataTypePatterns')
], TotalPriceText.prototype, "_anchorRegexes", void 0);

class UnitPriceText extends TextField {
    constructor(name) {
        super(name);
        this._fieldType = 'unitPriceText';
        this._anchorRegexes = null;
    }
    get anchorRegexes() {
        var _a;
        return (_a = this._anchorRegexes) !== null && _a !== void 0 ? _a : [];
    }
    set anchorRegexes(value) {
        this._anchorRegexes = value;
    }
}
__decorate([
    nameForSerialization('fieldType')
], UnitPriceText.prototype, "_fieldType", void 0);
__decorate([
    nameForSerialization('dataTypePatterns')
], UnitPriceText.prototype, "_anchorRegexes", void 0);

class WeightText extends TextField {
    constructor(name) {
        super(name);
        this._fieldType = 'weightText';
        this._anchorRegexes = null;
    }
    get anchorRegexes() {
        var _a;
        return (_a = this._anchorRegexes) !== null && _a !== void 0 ? _a : [];
    }
    set anchorRegexes(value) {
        this._anchorRegexes = value;
    }
}
__decorate([
    nameForSerialization('fieldType')
], WeightText.prototype, "_fieldType", void 0);
__decorate([
    nameForSerialization('dataTypePatterns')
], WeightText.prototype, "_anchorRegexes", void 0);

var LabelCaptureBasicOverlayListenerEvents;
(function (LabelCaptureBasicOverlayListenerEvents) {
    LabelCaptureBasicOverlayListenerEvents["brushForFieldOfLabel"] = "LabelCaptureBasicOverlayListener.brushForFieldOfLabel";
    LabelCaptureBasicOverlayListenerEvents["brushForLabel"] = "LabelCaptureBasicOverlayListener.brushForLabel";
    LabelCaptureBasicOverlayListenerEvents["didTapLabel"] = "LabelCaptureBasicOverlayListener.didTapLabel";
})(LabelCaptureBasicOverlayListenerEvents || (LabelCaptureBasicOverlayListenerEvents = {}));
class LabelCaptureBasicOverlayController extends BaseController {
    constructor(overlay) {
        super('LabelCaptureBasicOverlayProxy');
        // Arrow function wrappers to avoid .bind(this) and always use current class state
        this.handleBrushForFieldOfLabelWrapper = (ev) => __awaiter(this, void 0, void 0, function* () {
            return this.handleBrushForFieldOfLabel(ev);
        });
        this.handleBrushForLabelWrapper = (ev) => __awaiter(this, void 0, void 0, function* () {
            return this.handleBrushForLabel(ev);
        });
        this.handleDidTapLabelWrapper = (ev) => {
            this.handleDidTapLabel(ev);
        };
        this.overlay = overlay;
        void this.initialize();
    }
    setBrushForFieldOfLabel(brush, field, label) {
        return this._proxy.$setBrushForFieldOfLabel({
            brushJson: brush ? JSON.stringify(brush.toJSON()) : null,
            fieldName: field.name,
            trackingId: label.trackingID,
            dataCaptureViewId: this.dataCaptureViewId
        });
    }
    setBrushForLabel(brush, label) {
        return this._proxy.$setBrushForLabel({
            brushJson: brush ? JSON.stringify(brush.toJSON()) : null,
            trackingId: label.trackingID,
            dataCaptureViewId: this.dataCaptureViewId
        });
    }
    subscribeListener() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dataCaptureViewId !== -1) {
                yield this._proxy.$registerListenerForBasicOverlayEvents({ dataCaptureViewId: this.dataCaptureViewId });
            }
            this._proxy.subscribeForEvents(Object.values(LabelCaptureBasicOverlayListenerEvents));
            this._proxy.eventEmitter.on(LabelCaptureBasicOverlayListenerEvents.brushForFieldOfLabel, this.handleBrushForFieldOfLabelWrapper);
            this._proxy.eventEmitter.on(LabelCaptureBasicOverlayListenerEvents.brushForLabel, this.handleBrushForLabelWrapper);
            this._proxy.eventEmitter.on(LabelCaptureBasicOverlayListenerEvents.didTapLabel, this.handleDidTapLabelWrapper);
        });
    }
    unsubscribeListener() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._proxy.$unregisterListenerForBasicOverlayEvents({ dataCaptureViewId: this.dataCaptureViewId });
            this._proxy.unsubscribeFromEvents(Object.values(LabelCaptureBasicOverlayListenerEvents));
            this._proxy.eventEmitter.off(LabelCaptureBasicOverlayListenerEvents.brushForFieldOfLabel, this.handleBrushForFieldOfLabelWrapper);
            this._proxy.eventEmitter.off(LabelCaptureBasicOverlayListenerEvents.brushForLabel, this.handleBrushForLabelWrapper);
            this._proxy.eventEmitter.off(LabelCaptureBasicOverlayListenerEvents.didTapLabel, this.handleDidTapLabelWrapper);
        });
    }
    updateBasicOverlay(basicOverlayJson) {
        return this._proxy.$updateLabelCaptureBasicOverlay({ dataCaptureViewId: this.dataCaptureViewId, basicOverlayJson });
    }
    dispose() {
        void this.unsubscribeListener();
        this._proxy.dispose();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.overlay.listener) {
                return this.subscribeListener();
            }
        });
    }
    handleBrushForFieldOfLabel(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(ev.data);
            let brush = this.overlay.capturedFieldBrush;
            const field = LabelField.fromJSON(JSON.parse(payload.field));
            const label = CapturedLabel.fromJSON(JSON.parse(payload.label));
            if (this.overlay.listener && this.overlay.listener.brushForFieldOfLabel) {
                brush = this.overlay.listener.brushForFieldOfLabel(this.overlay, field, label);
            }
            yield this.setBrushForFieldOfLabel(brush, field, label);
        });
    }
    handleBrushForLabel(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(ev.data);
            let brush = this.overlay.labelBrush;
            const label = CapturedLabel.fromJSON(JSON.parse(payload.label));
            if (this.overlay.listener && this.overlay.listener.brushForLabel) {
                brush = this.overlay.listener.brushForLabel(this.overlay, label);
            }
            yield this.setBrushForLabel(brush, label);
        });
    }
    handleDidTapLabel(ev) {
        const payload = JSON.parse(ev.data);
        if (this.overlay.listener && this.overlay.listener.didTapLabel) {
            const label = CapturedLabel.fromJSON(JSON.parse(payload.label));
            this.overlay.listener.didTapLabel(this.overlay, label);
        }
    }
    get dataCaptureViewId() {
        var _a, _b;
        return (_b = (_a = this.overlay.view) === null || _a === void 0 ? void 0 : _a.viewId) !== null && _b !== void 0 ? _b : -1;
    }
}

class LabelCaptureBasicOverlay extends DefaultSerializeable {
    static get defaultPredictedFieldBrush() {
        return LabelCaptureBasicOverlay.labelCaptureDefaults.LabelCapture.LabelCaptureBasicOverlay.DefaultPredictedFieldBrush;
    }
    static get defaultCapturedFieldBrush() {
        return LabelCaptureBasicOverlay.labelCaptureDefaults.LabelCapture.LabelCaptureBasicOverlay.DefaultCapturedFieldBrush;
    }
    static get defaultLabelBrush() {
        return LabelCaptureBasicOverlay.labelCaptureDefaults.LabelCapture.LabelCaptureBasicOverlay.DefaultLabelBrush;
    }
    static get labelCaptureDefaults() {
        return getLabelCaptureDefaults();
    }
    get view() {
        return this._view;
    }
    set view(newView) {
        var _a, _b;
        if (newView === null) {
            (_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose();
            this.controller = null;
            this._view = null;
            return;
        }
        this._view = newView;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new LabelCaptureBasicOverlayController(this));
    }
    get predictedFieldBrush() {
        return this._predictedFieldBrush;
    }
    set predictedFieldBrush(newBrush) {
        var _a;
        this._predictedFieldBrush = newBrush;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBasicOverlay(JSON.stringify(this.toJSON())));
    }
    get capturedFieldBrush() {
        return this._capturedFieldBrush;
    }
    set capturedFieldBrush(newBrush) {
        var _a;
        this._capturedFieldBrush = newBrush;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBasicOverlay(JSON.stringify(this.toJSON())));
    }
    get labelBrush() {
        return this._labelBrush;
    }
    set labelBrush(newBrush) {
        var _a;
        this._labelBrush = newBrush;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBasicOverlay(JSON.stringify(this.toJSON())));
    }
    get listener() {
        return this._listener;
    }
    set listener(listener) {
        var _a, _b;
        this._listener = listener;
        this.hasListener = listener != null;
        if (this.hasListener) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribeListener());
        }
        else {
            void ((_b = this.controller) === null || _b === void 0 ? void 0 : _b.unsubscribeListener());
        }
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        var _a;
        this._shouldShowScanAreaGuides = shouldShow;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBasicOverlay(JSON.stringify(this.toJSON())));
    }
    get viewfinder() {
        return this._viewfinder;
    }
    set viewfinder(newViewfinder) {
        var _a;
        this._viewfinder = newViewfinder;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBasicOverlay(JSON.stringify(this.toJSON())));
    }
    constructor(mode) {
        super();
        this.type = 'labelCaptureBasic';
        this.controller = null;
        this._view = null;
        this._predictedFieldBrush = LabelCaptureBasicOverlay.defaultPredictedFieldBrush.copy;
        this._capturedFieldBrush = LabelCaptureBasicOverlay.defaultCapturedFieldBrush.copy;
        this._labelBrush = LabelCaptureBasicOverlay.defaultLabelBrush.copy;
        this._shouldShowScanAreaGuides = false;
        this.hasListener = false;
        this._listener = null;
        this._viewfinder = null;
        this.modeId = mode.modeId;
    }
    setBrushForFieldOfLabel(brush, field, label) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setBrushForFieldOfLabel(brush, field, label);
        });
    }
    setBrushForLabel(brush, label) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setBrushForLabel(brush, label);
        });
    }
}
__decorate([
    ignoreFromSerialization
], LabelCaptureBasicOverlay.prototype, "controller", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureBasicOverlay.prototype, "_view", void 0);
__decorate([
    nameForSerialization('defaultPredictedFieldBrush')
], LabelCaptureBasicOverlay.prototype, "_predictedFieldBrush", void 0);
__decorate([
    nameForSerialization('defaultCapturedFieldBrush')
], LabelCaptureBasicOverlay.prototype, "_capturedFieldBrush", void 0);
__decorate([
    nameForSerialization('defaultLabelBrush')
], LabelCaptureBasicOverlay.prototype, "_labelBrush", void 0);
__decorate([
    nameForSerialization('shouldShowScanAreaGuides')
], LabelCaptureBasicOverlay.prototype, "_shouldShowScanAreaGuides", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureBasicOverlay.prototype, "_listener", void 0);
__decorate([
    serializationDefault(NoViewfinder),
    nameForSerialization('viewfinder')
], LabelCaptureBasicOverlay.prototype, "_viewfinder", void 0);

var LabelCaptureValidationFlowListenerEvents;
(function (LabelCaptureValidationFlowListenerEvents) {
    LabelCaptureValidationFlowListenerEvents["didCaptureLabelWithFields"] = "LabelCaptureValidationFlowListener.didCaptureLabelWithFields";
})(LabelCaptureValidationFlowListenerEvents || (LabelCaptureValidationFlowListenerEvents = {}));
class LabelCaptureValidationFlowOverlayController extends BaseController {
    constructor(overlay) {
        super('LabelCaptureValidationFlowOverlayProxy');
        this.isSubscribed = false;
        // Arrow function wrapper to avoid .bind(this) and always use current class state
        this.handleDidCaptureLabelWithFieldsEventWrapper = (ev) => {
            this.handleDidCaptureLabelWithFieldsEvent(ev);
        };
        this.overlay = overlay;
        void this.initialize();
    }
    updateValidationFlowOverlay() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._proxy.$updateLabelCaptureValidationFlowOverlay({ dataCaptureViewId: this.dataCaptureViewId, overlayJson: JSON.stringify(this.overlay.toJSON()) });
        });
    }
    subscribeLabelCaptureValidationFlowListener() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isSubscribed) {
                return;
            }
            yield this._proxy.$registerListenerForValidationFlowEvents({ dataCaptureViewId: this.dataCaptureViewId });
            this._proxy.subscribeForEvents(Object.values(LabelCaptureValidationFlowListenerEvents));
            this._proxy.eventEmitter.on(LabelCaptureValidationFlowListenerEvents.didCaptureLabelWithFields, this.handleDidCaptureLabelWithFieldsEventWrapper);
            this.isSubscribed = true;
        });
    }
    unsubscribeLabelCaptureValidationFlowListener() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSubscribed) {
                return;
            }
            yield this._proxy.$unregisterListenerForValidationFlowEvents({ dataCaptureViewId: this.dataCaptureViewId });
            this._proxy.eventEmitter.off(LabelCaptureValidationFlowListenerEvents.didCaptureLabelWithFields, this.handleDidCaptureLabelWithFieldsEventWrapper);
            this._proxy.unsubscribeFromEvents(Object.values(LabelCaptureValidationFlowListenerEvents));
            this.isSubscribed = false;
        });
    }
    dispose() {
        void this.unsubscribeLabelCaptureValidationFlowListener();
        this._proxy.dispose();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.overlay.listener) {
                return this.subscribeLabelCaptureValidationFlowListener();
            }
        });
    }
    handleDidCaptureLabelWithFieldsEvent(ev) {
        const payload = JSON.parse(ev.data);
        const fields = payload.fields.map((field) => LabelField.fromJSON(JSON.parse(field)));
        this.notifyListenersOfDidCaptureLabelWithFields(fields);
    }
    notifyListenersOfDidCaptureLabelWithFields(fields) {
        var _a;
        (_a = this.overlay.listener) === null || _a === void 0 ? void 0 : _a.didCaptureLabelWithFields(fields);
    }
    get dataCaptureViewId() {
        var _a, _b;
        return (_b = (_a = this.overlay.view) === null || _a === void 0 ? void 0 : _a.viewId) !== null && _b !== void 0 ? _b : -1;
    }
}

class LabelCaptureValidationFlowOverlay extends DefaultSerializeable {
    get view() {
        return this._view;
    }
    set view(newView) {
        var _a, _b;
        if (newView === null) {
            this._view = null;
            (_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose();
            this.controller = null;
            return;
        }
        this._view = newView;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new LabelCaptureValidationFlowOverlayController(this));
    }
    constructor(mode) {
        super();
        this.type = 'validationFlow';
        this.settings = null;
        this.hasListener = false;
        this._listener = null;
        this.controller = null;
        this._view = null;
        this.modeId = mode.modeId;
    }
    get listener() {
        return this._listener;
    }
    set listener(listener) {
        var _a, _b;
        this.hasListener = listener != null;
        this._listener = listener;
        if (listener == null) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.unsubscribeLabelCaptureValidationFlowListener());
        }
        else if (this.listener == null) {
            void ((_b = this.controller) === null || _b === void 0 ? void 0 : _b.subscribeLabelCaptureValidationFlowListener());
        }
    }
    applySettings(settings) {
        var _a, _b;
        this.settings = settings;
        return (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateValidationFlowOverlay()) !== null && _b !== void 0 ? _b : Promise.resolve();
    }
}
__decorate([
    nameForSerialization('hasListener')
], LabelCaptureValidationFlowOverlay.prototype, "hasListener", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureValidationFlowOverlay.prototype, "_listener", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureValidationFlowOverlay.prototype, "controller", void 0);
__decorate([
    ignoreFromSerialization
], LabelCaptureValidationFlowOverlay.prototype, "_view", void 0);

class LabelCaptureValidationFlowSettings extends DefaultSerializeable {
    static create() {
        return new LabelCaptureValidationFlowSettings();
    }
    constructor() {
        super();
        const defaults = getLabelCaptureDefaults().LabelCapture.LabelCaptureValidationFlowOverlay.Settings;
        this._missingFieldsHintText = defaults.missingFieldsHintText;
        this._standbyHintText = defaults.standbyHintText;
        this._validationHintText = defaults.validationHintText;
        this._validationErrorText = defaults.validationErrorText;
        this._requiredFieldErrorText = defaults.requiredFieldErrorText;
        this._manualInputButtonText = defaults.manualInputButtonText;
    }
    get missingFieldsHintText() {
        return this._missingFieldsHintText;
    }
    set missingFieldsHintText(text) {
        this._missingFieldsHintText = text;
    }
    get standbyHintText() {
        return this._standbyHintText;
    }
    set standbyHintText(text) {
        this._standbyHintText = text;
    }
    get validationHintText() {
        return this._validationHintText;
    }
    set validationHintText(text) {
        this._validationHintText = text;
    }
    get validationErrorText() {
        return this._validationErrorText;
    }
    set validationErrorText(text) {
        this._validationErrorText = text;
    }
    get requiredFieldErrorText() {
        return this._requiredFieldErrorText;
    }
    set requiredFieldErrorText(text) {
        this._requiredFieldErrorText = text;
    }
    get manualInputButtonText() {
        return this._manualInputButtonText;
    }
    set manualInputButtonText(text) {
        this._manualInputButtonText = text;
    }
}
__decorate([
    nameForSerialization('missingFieldsHintText')
], LabelCaptureValidationFlowSettings.prototype, "_missingFieldsHintText", void 0);
__decorate([
    nameForSerialization('standbyHintText')
], LabelCaptureValidationFlowSettings.prototype, "_standbyHintText", void 0);
__decorate([
    nameForSerialization('validationHintText')
], LabelCaptureValidationFlowSettings.prototype, "_validationHintText", void 0);
__decorate([
    nameForSerialization('validationErrorText')
], LabelCaptureValidationFlowSettings.prototype, "_validationErrorText", void 0);
__decorate([
    nameForSerialization('requiredFieldErrorText')
], LabelCaptureValidationFlowSettings.prototype, "_requiredFieldErrorText", void 0);
__decorate([
    nameForSerialization('manualInputButtonText')
], LabelCaptureValidationFlowSettings.prototype, "_manualInputButtonText", void 0);

const LABEL_PROXY_TYPE_NAMES = [
    'LabelCaptureProxy',
    'LabelCaptureBasicOverlayProxy',
    'LabelCaptureAdvancedOverlayProxy',
    'LabelCaptureValidationFlowOverlayProxy',
];

function registerLabelProxies(provider) {
    registerProxies(LABEL_PROXY_TYPE_NAMES, provider);
}

class LabelCaptureAdvancedOverlayView extends DefaultSerializeable {
    static withHTMLElement(element, options) {
        return this.getEncodedImageData(element).then(data => new LabelCaptureAdvancedOverlayView(data, options));
    }
    static withBase64EncodedData(data, options) {
        return Promise.resolve(new LabelCaptureAdvancedOverlayView(data, options));
    }
    static getEncodedImageData(element) {
        return this.getBase64DataForSVG(this.getSVGDataForElement(element));
    }
    static getSize(element) {
        const isInDOM = document.body.contains(element);
        if (!isInDOM) {
            document.body.appendChild(element);
        }
        const size = element.getBoundingClientRect();
        if (!isInDOM) {
            document.body.removeChild(element);
        }
        return new Size(size.width, size.height);
    }
    static getSVGDataForElement(element) {
        const size = this.getSize(element);
        const data = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}px" height="${size.height}px">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${element.outerHTML}
          </div>
        </foreignObject>
      </svg>`);
        return { data, size };
    }
    static getCanvasWithSize(size) {
        const canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        return canvas;
    }
    static getBase64DataForSVG(svgData) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const canvas = this.getCanvasWithSize(svgData.size);
                canvas.getContext('2d').drawImage(image, 0, 0);
                resolve(canvas.toDataURL('image/png', 1));
            };
            image.onerror = reject;
            image.src = 'data:image/svg+xml,' + svgData.data;
        });
    }
    constructor(encodedData, options) {
        super();
        if (options == null) {
            options = { scale: 1 };
        }
        this.data = encodedData;
        this.options = options;
    }
}

var LabelExports = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BarcodeField: BarcodeField,
    CapturedLabel: CapturedLabel,
    CustomBarcode: CustomBarcode,
    CustomText: CustomText,
    ExpiryDateText: ExpiryDateText,
    ImeiOneBarcode: ImeiOneBarcode,
    ImeiTwoBarcode: ImeiTwoBarcode,
    LabelCapture: LabelCapture,
    LabelCaptureAdvancedOverlay: LabelCaptureAdvancedOverlay,
    LabelCaptureAdvancedOverlayView: LabelCaptureAdvancedOverlayView,
    LabelCaptureBasicOverlay: LabelCaptureBasicOverlay,
    LabelCaptureFeedback: LabelCaptureFeedback,
    LabelCaptureSession: LabelCaptureSession,
    LabelCaptureSettings: LabelCaptureSettings,
    LabelCaptureValidationFlowOverlay: LabelCaptureValidationFlowOverlay,
    LabelCaptureValidationFlowSettings: LabelCaptureValidationFlowSettings,
    get LabelDateComponentFormat () { return LabelDateComponentFormat; },
    LabelDateFormat: LabelDateFormat,
    LabelDateResult: LabelDateResult,
    LabelDefinition: LabelDefinition,
    LabelField: LabelField,
    LabelFieldDefinition: LabelFieldDefinition,
    LabelFieldLocation: LabelFieldLocation,
    get LabelFieldLocationType () { return LabelFieldLocationType; },
    get LabelFieldState () { return LabelFieldState; },
    get LabelFieldType () { return LabelFieldType; },
    PackingDateText: PackingDateText,
    PartNumberBarcode: PartNumberBarcode,
    SerialNumberBarcode: SerialNumberBarcode,
    TextField: TextField,
    TotalPriceText: TotalPriceText,
    UnitPriceText: UnitPriceText,
    WeightText: WeightText
});

const pluginName = 'ScanditLabelNative';
// tslint:disable-next-line:variable-name
const Capacitor = {
    pluginName,
    defaults: {},
    exec: (success, error, functionName, args) => capacitorExec(success, error, pluginName, functionName, args),
};
const getDefaults = async () => {
    try {
        const defaultsJSON = await window.Capacitor.Plugins[pluginName]['getDefaults']();
        loadLabelCaptureDefaults(defaultsJSON);
        Capacitor.defaults = getLabelCaptureDefaults();
    }
    catch (error) {
        // tslint:disable-next-line:no-console
        console.warn(error);
    }
    return Capacitor.defaults;
};

class CapacitorLabelNativeCallerProvider {
    getNativeCaller(_proxyType) {
        return new CapacitorNativeCaller(Capacitor.pluginName);
    }
}

function initLabelProxy() {
    registerLabelProxies(new CapacitorLabelNativeCallerProvider());
}

class ScanditLabelPluginImplementation {
    async initialize(coreDefaults) {
        CapacitorCore.defaults = coreDefaults;
        await getDefaults();
        initLabelProxy();
        const api = Object.assign({}, LabelExports);
        return api;
    }
}
registerPlugin('ScanditLabelPlugin', {
    android: () => new ScanditLabelPluginImplementation(),
    ios: () => new ScanditLabelPluginImplementation(),
    web: () => new ScanditLabelPluginImplementation(),
});
// tslint:disable-next-line:variable-name
const ScanditLabelPlugin = new ScanditLabelPluginImplementation();

export { BarcodeField, CapturedLabel, CustomBarcode, CustomText, ExpiryDateText, ImeiOneBarcode, ImeiTwoBarcode, LabelCapture, LabelCaptureAdvancedOverlay, LabelCaptureAdvancedOverlayView, LabelCaptureBasicOverlay, LabelCaptureFeedback, LabelCaptureSession, LabelCaptureSettings, LabelCaptureValidationFlowOverlay, LabelCaptureValidationFlowSettings, LabelDateComponentFormat, LabelDateFormat, LabelDateResult, LabelDefinition, LabelField, LabelFieldDefinition, LabelFieldLocation, LabelFieldLocationType, LabelFieldState, LabelFieldType, PackingDateText, PartNumberBarcode, ScanditLabelPlugin, ScanditLabelPluginImplementation, SerialNumberBarcode, TextField, TotalPriceText, UnitPriceText, WeightText };
