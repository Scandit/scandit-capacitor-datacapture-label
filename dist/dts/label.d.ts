import { CameraSettings, Brush, Feedback, DefaultSerializeable, Quadrilateral, Rect, FrameData, LocationSelection, BaseProxy, BaseController, DataCaptureMode, DataCaptureContext, Anchor, PointWithUnit, DataCaptureOverlay, Viewfinder, PrivateDataCaptureMode, NativeCallerProvider } from 'scandit-capacitor-datacapture-core/dist/dts/core';
import { SymbologySettings, Barcode, Symbology } from 'scandit-capacitor-datacapture-barcode/dist/dts/barcode';

interface LabelCaptureDefaults {
    LabelCapture: {
        RecommendedCameraSettings: CameraSettings;
        LabelCaptureBasicOverlay: {
            DefaultPredictedFieldBrush: Brush;
            DefaultCapturedFieldBrush: Brush;
            DefaultLabelBrush: Brush;
        };
        LabelCaptureValidationFlowOverlay: {
            Settings: {
                missingFieldsHintText: string;
                standbyHintText: string;
                validationHintText: string;
                validationErrorText: string;
                requiredFieldErrorText: string;
                manualInputButtonText: string;
                validationFinishButtonText: string;
                validationRestartButtonText: string;
                validationPauseButtonText: string;
                validationAdaptiveScanningText: string;
                validationScanningText: string;
            };
        };
        Feedback: {
            success: Feedback;
        };
    };
}
declare function setLabelCaptureDefaultsLoader(loader: () => void): void;
declare function ensureLabelCaptureDefaults(): LabelCaptureDefaults;
declare function loadLabelCaptureDefaults(jsonDefaults: any): void;
declare function getLabelCaptureDefaults(): LabelCaptureDefaults;

declare enum AdaptiveRecognitionMode {
    Off = "off",
    Auto = "auto",
    On = "on"
}

declare enum AdaptiveRecognitionResultType {
    Receipt = "receipt"
}

declare abstract class AdaptiveRecognitionResult {
    get resultType(): AdaptiveRecognitionResultType;
}

declare class LabelFieldDefinition extends DefaultSerializeable {
    private _name;
    private _valueRegexes;
    private _optional;
    private _numberOfMandatoryInstances;
    private _hiddenProperties;
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    setValueRegex(valueRegex: string): void;
    get optional(): boolean;
    set optional(value: boolean);
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
    get hiddenProperties(): {
        [key: string]: object;
    };
    set hiddenProperties(newValue: {
        [key: string]: object;
    });
    protected constructor(name: string);
}

declare class BarcodeField extends LabelFieldDefinition {
    private _symbologies;
    private _symbologySettings;
    get symbologySettings(): SymbologySettings[];
    protected constructor(name: string, symbologies: SymbologySettings[]);
}

declare class LabelDateResult extends DefaultSerializeable {
    private _day;
    private _month;
    private _year;
    private _dayString;
    private _monthString;
    private _yearString;
    private static fromJSON;
    private constructor();
    get day(): number | null;
    get month(): number | null;
    get year(): number | null;
    get dayString(): string;
    get monthString(): string;
    get yearString(): string;
}

declare enum LabelFieldState {
    Captured = "captured",
    Predicted = "predicted",
    Unknown = "unknown"
}

declare enum LabelFieldType {
    Barcode = "barcode",
    Text = "text",
    Unknown = "unknown"
}

declare enum LabelFieldValueType {
    Date = "date",
    Price = "price",
    Weight = "weight",
    Text = "text",
    Numeric = "numeric"
}

declare class LabelField {
    private _name;
    private _type;
    private _predictedLocation;
    private _state;
    private _isRequired;
    private _barcode;
    private _text;
    private _dateResult;
    private _valueType;
    private static fromJSON;
    get name(): string;
    get type(): LabelFieldType;
    get predictedLocation(): Quadrilateral;
    get state(): LabelFieldState;
    get isRequired(): boolean;
    get barcode(): Barcode | null;
    get text(): string | null;
    get valueType(): LabelFieldValueType;
    asDate(): LabelDateResult | null;
}

declare class CapturedLabel {
    private _fields;
    private _name;
    private _predictedBounds;
    private _deltaTimeToPrediction;
    private _trackingID;
    private _isComplete;
    get fields(): LabelField[];
    get name(): string;
    get isComplete(): boolean;
    get predictedBounds(): Quadrilateral;
    get deltaTimeToPrediction(): number;
    get trackingID(): number;
    private frameSequenceID;
    private static fromJSON;
}

declare class LabelFieldLocation extends DefaultSerializeable {
    private _rect;
    private _type;
    static forRect(rect: Rect): LabelFieldLocation;
    static for(left: number, top: number, right: number, bottom: number): LabelFieldLocation;
    static topLeft(): LabelFieldLocation;
    static topRight(): LabelFieldLocation;
    static bottomLeft(): LabelFieldLocation;
    static bottomRight(): LabelFieldLocation;
    static top(): LabelFieldLocation;
    static bottom(): LabelFieldLocation;
    static left(): LabelFieldLocation;
    static right(): LabelFieldLocation;
    static center(): LabelFieldLocation;
    static wholeLabel(): LabelFieldLocation;
}

declare class CustomBarcode extends BarcodeField {
    location: LabelFieldLocation | null;
    private _anchorRegexes;
    private _fieldType;
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings[]): CustomBarcode;
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): CustomBarcode;
    static initWithNameAndSymbology(name: string, symbology: Symbology): CustomBarcode;
    private constructor();
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    private static get barcodeDefaults();
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get isOptional(): boolean;
    get symbologies(): SymbologySettings[];
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

declare class TextField extends LabelFieldDefinition {
}

declare class CustomText extends TextField {
    location: LabelFieldLocation | null;
    private _anchorRegexes;
    private _fieldType;
    constructor(name: string);
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get isOptional(): boolean;
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

declare enum LabelDateComponentFormat {
    DMY = "dmy",
    MDY = "mdy",
    YMD = "ymd"
}

declare class LabelDateFormat extends DefaultSerializeable {
    private _componentFormat;
    private _acceptPartialDates;
    constructor(componentFormat: LabelDateComponentFormat, acceptPartialDates: boolean);
    get componentFormat(): LabelDateComponentFormat;
    get acceptPartialDates(): boolean;
}

declare class DateText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    private _labelDateFormat;
    constructor(name: string, labelDateFormat: LabelDateFormat);
    get labelDateFormat(): LabelDateFormat;
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get isOptional(): boolean;
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

declare class ExpiryDateText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    private _labelDateFormat;
    constructor(name: string);
    get labelDateFormat(): LabelDateFormat | null;
    set labelDateFormat(value: LabelDateFormat | null);
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get isOptional(): boolean;
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

declare class ImeiOneBarcode extends BarcodeField {
    private _fieldType;
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings[]): ImeiOneBarcode;
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): ImeiOneBarcode;
    static initWithNameAndSymbology(name: string, symbology: Symbology): ImeiOneBarcode;
    private static get barcodeDefaults();
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get isOptional(): boolean;
    get symbologies(): SymbologySettings[];
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
    private constructor();
}

declare class ImeiTwoBarcode extends BarcodeField {
    private _fieldType;
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings[]): ImeiTwoBarcode;
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): ImeiTwoBarcode;
    static initWithNameAndSymbology(name: string, symbology: Symbology): ImeiTwoBarcode;
    private static get barcodeDefaults();
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get isOptional(): boolean;
    get symbologies(): SymbologySettings[];
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
    private constructor();
}

declare class LabelCaptureSession {
    private _capturedLabels;
    private _frameSequenceID;
    private _lastProcessedFrameId;
    private frameId;
    get capturedLabels(): CapturedLabel[];
    get frameSequenceID(): number;
    get lastProcessedFrameId(): number;
    private static fromJSON;
}

interface LabelCaptureListener {
    didUpdateSession?(labelCapture: LabelCapture, session: LabelCaptureSession, getFrameData: () => Promise<FrameData | null>): Promise<void>;
}

declare class LabelDefinition extends DefaultSerializeable {
    private _name;
    private _fields;
    private _type;
    private _adaptiveRecognitionMode;
    private _hiddenProperties;
    get name(): string;
    get fields(): LabelFieldDefinition[];
    set fields(values: LabelFieldDefinition[]);
    addField(field: LabelFieldDefinition): void;
    addFields(fields: LabelFieldDefinition[]): void;
    get adaptiveRecognitionMode(): AdaptiveRecognitionMode;
    set adaptiveRecognitionMode(value: AdaptiveRecognitionMode);
    get hiddenProperties(): {
        [key: string]: object;
    };
    set hiddenProperties(newValue: {
        [key: string]: object;
    });
    static createVinLabelDefinition(name: string): LabelDefinition;
    static createPriceCaptureDefinition(name: string): LabelDefinition;
    static createSevenSegmentDisplayLabelDefinition(name: string): LabelDefinition;
    private static fromJSON;
    constructor(name: string);
}

declare class LabelCaptureSettings extends DefaultSerializeable {
    private _definitions;
    private _locationSelection;
    get locationSelection(): LocationSelection | null;
    set locationSelection(newValue: LocationSelection | null);
    private properties;
    static fromJSON(json: {
        [key: string]: any;
    }): LabelCaptureSettings | null;
    private static get barcodeDefaults();
    static settingsFromLabelDefinitions(definitions: LabelDefinition[], properties: {
        [key: string]: string;
    } | null): LabelCaptureSettings;
    private constructor();
    settingsForSymbology(symbology: Symbology): SymbologySettings;
    setProperty(name: string, value: any): void;
    getProperty(name: string): any;
}

/**
 * Label module - retail and transportation label scanning
 * Generated from schema definition.
 *
 * Single entry point interface - all operations go through $executeLabel.
 * The LabelController handles method-specific logic and calls this proxy.
 * The NativeProxy automatically handles the `$` prefix for native method calls.
 */
interface LabelProxy extends BaseProxy {
    /**
     * Single entry point for all Label operations.
     * Routes to appropriate native command based on moduleName and methodName.
     *
     * @param params Object containing:
     *   - moduleName: The name of the module to execute against
     *   - methodName: The name of the method to execute
     *   - ...other parameters specific to the method
     *
     * @returns Promise resolving to the result (type depends on methodName)
     *
     * Note: This method is called with the `$` prefix ($executeLabel) which is
     * automatically handled by NativeProxy to route to native implementation.
     */
    $executeLabel(params: {
        moduleName: string;
        methodName: string;
        [key: string]: any;
    }): Promise<any>;
}

declare enum LabelCaptureListenerEvents {
    didUpdateSession = "LabelCaptureListener.didUpdateSession"
}
declare class LabelCaptureController extends BaseController<LabelProxy> {
    private mode;
    private _boundHandleDidUpdateSession?;
    private frameDataController;
    private adapter;
    constructor(mode: LabelCapture);
    setModeEnabledState(isEnabled: boolean): Promise<void>;
    updateLabelCaptureSettings(settingsJson: string): Promise<void>;
    subscribeLabelCaptureListener(): Promise<void>;
    unsubscribeLabelCaptureListener(): Promise<void>;
    updateFeedback(feedback: LabelCaptureFeedback): Promise<void>;
    dispose(): void;
    private initialize;
    private handleDidUpdateSessionEvent;
    private get modeId();
    private notifyListenersOfDidUpdateSession;
}

declare class LabelCaptureFeedback extends DefaultSerializeable {
    static get defaultFeedback(): LabelCaptureFeedback;
    private static get labelCaptureDefaults();
    private _success;
    get success(): Feedback;
    set success(success: Feedback);
    private controller;
    constructor();
    private updateFeedback;
}
interface PrivateLabelCaptureFeedback {
    controller: LabelCaptureController | null;
    fromJSON(json: LabelCaptureFeedbackJSON): LabelCaptureFeedback;
}
interface LabelCaptureFeedbackJSON {
    success: Feedback;
}

declare class LabelCapture extends DefaultSerializeable implements DataCaptureMode {
    protected listeners: LabelCaptureListener[];
    private type;
    private modeId;
    private parentId;
    private _isEnabled;
    private settings;
    private _feedback;
    private hasListeners;
    private privateContext;
    private controller;
    static createRecommendedCameraSettings(): CameraSettings;
    get isEnabled(): boolean;
    set isEnabled(isEnabled: boolean);
    get context(): DataCaptureContext | null;
    private get _context();
    private set _context(value);
    constructor(settings: LabelCaptureSettings);
    applySettings(settings: LabelCaptureSettings): Promise<void>;
    addListener(listener: LabelCaptureListener): void;
    removeListener(listener: LabelCaptureListener): void;
    get feedback(): LabelCaptureFeedback;
    set feedback(feedback: LabelCaptureFeedback);
}

interface LabelCaptureAdvancedOverlayView extends DefaultSerializeable {
}

interface LabelCaptureAdvancedOverlayListener {
    viewForCapturedLabel?(overlay: LabelCaptureAdvancedOverlay, label: CapturedLabel): LabelCaptureAdvancedOverlayView | null;
    anchorForCapturedLabel?(overlay: LabelCaptureAdvancedOverlay, label: CapturedLabel): Anchor;
    offsetForCapturedLabel?(overlay: LabelCaptureAdvancedOverlay, label: CapturedLabel): PointWithUnit;
    viewForCapturedLabelField?(overlay: LabelCaptureAdvancedOverlay, field: LabelField): LabelCaptureAdvancedOverlayView | null;
    anchorForCapturedLabelField?(overlay: LabelCaptureAdvancedOverlay, field: LabelField): Anchor;
    offsetForCapturedLabelField?(overlay: LabelCaptureAdvancedOverlay, field: LabelField): PointWithUnit;
}

declare class LabelCaptureAdvancedOverlay extends DefaultSerializeable implements DataCaptureOverlay {
    private type;
    private controller;
    private _view;
    private modeId;
    private get view();
    private set view(value);
    private onViewIdChanged;
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    private _listener;
    private hasListener;
    get listener(): LabelCaptureAdvancedOverlayListener | null;
    set listener(listener: LabelCaptureAdvancedOverlayListener | null);
    private _shouldShowScanAreaGuides;
    constructor(mode: LabelCapture);
    setViewForCapturedLabel(capturedLabel: CapturedLabel, view: LabelCaptureAdvancedOverlayView | null): Promise<void>;
    setViewForCapturedLabelField(field: LabelField, capturedLabel: CapturedLabel, view: LabelCaptureAdvancedOverlayView | null): Promise<void>;
    setAnchorForCapturedLabel(capturedLabel: CapturedLabel, anchor: Anchor): Promise<void>;
    setAnchorForCapturedLabelField(field: LabelField, capturedLabel: CapturedLabel, anchor: Anchor): Promise<void>;
    setOffsetForCapturedLabel(capturedLabel: CapturedLabel, offset: PointWithUnit): Promise<void>;
    setOffsetForCapturedLabelField(field: LabelField, capturedLabel: CapturedLabel, offset: PointWithUnit): Promise<void>;
    clearCapturedLabelViews(): Promise<void>;
}

declare enum LabelFieldLocationType {
    TopLeft = "topLeft",
    TopRight = "topRight",
    BottomRight = "bottomRight",
    BottomLeft = "bottomLeft",
    Top = "top",
    Right = "right",
    Bottom = "bottom",
    Left = "left",
    Center = "center",
    WholeLabel = "wholeLabel"
}

declare class PackingDateText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    private _labelDateFormat;
    constructor(name: string);
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    get labelDateFormat(): LabelDateFormat | null;
    set labelDateFormat(value: LabelDateFormat | null);
    get isOptional(): boolean;
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

declare class PartNumberBarcode extends BarcodeField {
    private _fieldType;
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings[]): PartNumberBarcode;
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): PartNumberBarcode;
    static initWithNameAndSymbology(name: string, symbology: Symbology): PartNumberBarcode;
    private static get barcodeDefaults();
    private constructor();
    get isOptional(): boolean;
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get symbologies(): SymbologySettings[];
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

declare class ReceiptScanningLineItem {
    private _name;
    private _unitPrice;
    private _discount;
    private _quantity;
    private _totalPrice;
    constructor(name: string, unitPrice: number | null, discount: number | null, quantity: number, totalPrice: number | null);
    get name(): string;
    get unitPrice(): number | null;
    get discount(): number | null;
    get quantity(): number;
    get totalPrice(): number | null;
}

declare class ReceiptScanningResult implements AdaptiveRecognitionResult {
    private _date;
    private _lineItems;
    private _loyaltyNumber;
    private _paymentPreTaxTotal;
    private _paymentTax;
    private _paymentTotal;
    private _storeAddress;
    private _storeCity;
    private _storeName;
    private _time;
    constructor(date: string | null, lineItems: ReceiptScanningLineItem[], loyaltyNumber: number | null, paymentPreTaxTotal: number | null, paymentTax: number | null, paymentTotal: number | null, storeAddress: string | null, storeCity: string | null, storeName: string | null, time: string | null);
    get resultType(): AdaptiveRecognitionResultType;
    get date(): string | null;
    get lineItems(): ReceiptScanningLineItem[];
    get loyaltyNumber(): number | null;
    get paymentPreTaxTotal(): number | null;
    get paymentTax(): number | null;
    get paymentTotal(): number | null;
    get storeAddress(): string | null;
    get storeCity(): string | null;
    get storeName(): string | null;
    get time(): string | null;
}

declare class SerialNumberBarcode extends BarcodeField {
    private _fieldType;
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings[]): SerialNumberBarcode;
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): SerialNumberBarcode;
    static initWithNameAndSymbology(name: string, symbology: Symbology): SerialNumberBarcode;
    private static get barcodeDefaults();
    private constructor();
    get isOptional(): boolean;
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get symbologies(): SymbologySettings[];
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

declare class TotalPriceText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    constructor(name: string);
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    get isOptional(): boolean;
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

declare class UnitPriceText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    constructor(name: string);
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    get isOptional(): boolean;
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

declare class WeightText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    constructor(name: string);
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    get isOptional(): boolean;
    get name(): string;
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

interface LabelCaptureBasicOverlayListener {
    brushForFieldOfLabel?(overlay: LabelCaptureBasicOverlay, field: LabelField, label: CapturedLabel): Brush | null;
    brushForLabel?(overlay: LabelCaptureBasicOverlay, label: CapturedLabel): Brush | null;
    didTapLabel?(overlay: LabelCaptureBasicOverlay, label: CapturedLabel): void;
}
declare class LabelCaptureBasicOverlay extends DefaultSerializeable implements DataCaptureOverlay {
    static get defaultPredictedFieldBrush(): Brush;
    static get defaultCapturedFieldBrush(): Brush;
    static get defaultLabelBrush(): Brush;
    private static get labelCaptureDefaults();
    private type;
    private controller;
    private _view;
    private modeId;
    private get view();
    private set view(value);
    private onViewIdChanged;
    private _predictedFieldBrush;
    get predictedFieldBrush(): Brush | null;
    set predictedFieldBrush(newBrush: Brush | null);
    private _capturedFieldBrush;
    get capturedFieldBrush(): Brush | null;
    set capturedFieldBrush(newBrush: Brush | null);
    private _labelBrush;
    get labelBrush(): Brush | null;
    set labelBrush(newBrush: Brush | null);
    private _shouldShowScanAreaGuides;
    private hasListener;
    private _listener;
    get listener(): LabelCaptureBasicOverlayListener | null;
    set listener(listener: LabelCaptureBasicOverlayListener | null);
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    private _viewfinder;
    get viewfinder(): Viewfinder | null;
    set viewfinder(newViewfinder: Viewfinder | null);
    constructor(labelCapture: LabelCapture);
    setBrushForFieldOfLabel(brush: Brush, field: LabelField, label: CapturedLabel): Promise<void>;
    setBrushForLabel(brush: Brush, label: CapturedLabel): Promise<void>;
}

declare enum LabelCaptureAdvancedOverlayListenerEvents {
    viewForLabel = "LabelCaptureAdvancedOverlayListener.viewForLabel",
    anchorForLabel = "LabelCaptureAdvancedOverlayListener.anchorForLabel",
    offsetForLabel = "LabelCaptureAdvancedOverlayListener.offsetForLabel",
    viewForCapturedLabelField = "LabelCaptureAdvancedOverlayListener.viewForFieldOfLabel",
    anchorForCapturedLabelField = "LabelCaptureAdvancedOverlayListener.anchorForFieldOfLabel",
    offsetForCapturedLabelField = "LabelCaptureAdvancedOverlayListener.offsetForFieldOfLabel"
}
declare class LabelCaptureAdvancedOverlayController extends BaseController<LabelProxy> {
    private overlay;
    private adapter;
    private hasListeners;
    private hasPendingListenerRegistration;
    private registeredViewId;
    constructor(overlay: LabelCaptureAdvancedOverlay);
    setViewForCapturedLabel(label: CapturedLabel, view: LabelCaptureAdvancedOverlayView | null | Promise<LabelCaptureAdvancedOverlayView>): Promise<void>;
    setAnchorForCapturedLabel(label: CapturedLabel, anchor: Anchor): Promise<void>;
    setOffsetForCapturedLabel(label: CapturedLabel, offset: PointWithUnit): Promise<void>;
    setViewForCapturedLabelField(label: CapturedLabel, field: LabelField, view: LabelCaptureAdvancedOverlayView | null): Promise<void>;
    setAnchorForCapturedLabelField(label: CapturedLabel, field: LabelField, anchor: Anchor): Promise<void>;
    setOffsetForCapturedLabelField(label: CapturedLabel, field: LabelField, offset: PointWithUnit): Promise<void>;
    clearCapturedLabelViews(): Promise<void>;
    subscribeListener(): Promise<void>;
    private registerListenerForCurrentView;
    onViewChanged(): Promise<void>;
    unsubscribeListener(): Promise<void>;
    dispose(): void;
    updateAdvancedOverlay(advancedOverlayJson: string): Promise<void>;
    private initialize;
    private setViewForCapturedLabelFieldPrivate;
    private setAnchorForCapturedLabelFieldPrivate;
    private setOffsetForCapturedLabelFieldPrivate;
    private handleViewForLabel;
    private handleAnchorForLabel;
    private handleViewForCapturedLabelField;
    private handleOffsetForLabel;
    private handleAnchorForCapturedLabelField;
    private handleOffsetForCapturedLabelField;
    private get dataCaptureViewId();
    private handleViewForLabelWrapper;
    private handleAnchorForLabelWrapper;
    private handleOffsetForLabelWrapper;
    private handleViewForCapturedLabelFieldWrapper;
    private handleAnchorForCapturedLabelFieldWrapper;
    private handleOffsetForCapturedLabelFieldWrapper;
}
interface LabelCaptureAdvancedOverlayEventPayload {
    label: string;
}
interface LabelCaptureAdvancedOverlayFieldEventPayload {
    field: string;
    identifier: string;
}

declare enum LabelCaptureBasicOverlayListenerEvents {
    brushForFieldOfLabel = "LabelCaptureBasicOverlayListener.brushForFieldOfLabel",
    brushForLabel = "LabelCaptureBasicOverlayListener.brushForLabel",
    didTapLabel = "LabelCaptureBasicOverlayListener.didTapLabel"
}
declare class LabelCaptureBasicOverlayController extends BaseController<LabelProxy> {
    private overlay;
    private adapter;
    private hasListeners;
    private hasPendingListenerRegistration;
    private registeredViewId;
    constructor(overlay: LabelCaptureBasicOverlay);
    setBrushForFieldOfLabel(brush: Brush | null, field: LabelField, label: CapturedLabel): Promise<void>;
    setBrushForLabel(brush: Brush | null, label: CapturedLabel): Promise<void>;
    subscribeListener(): Promise<void>;
    private registerListenerForCurrentView;
    onViewChanged(): Promise<void>;
    unsubscribeListener(): Promise<void>;
    updateBasicOverlay(basicOverlayJson: string): Promise<void>;
    dispose(): void;
    private initialize;
    private handleBrushForFieldOfLabel;
    private handleBrushForLabel;
    private handleDidTapLabel;
    private get dataCaptureViewId();
    private handleBrushForFieldOfLabelWrapper;
    private handleBrushForLabelWrapper;
    private handleDidTapLabelWrapper;
}
interface LabelCaptureBasicOverlayEventPayload {
    field: string;
    label: string;
}

declare class LabelCaptureValidationFlowSettings extends DefaultSerializeable {
    private _missingFieldsHintText;
    private _standbyHintText;
    private _validationHintText;
    private _validationErrorText;
    private _requiredFieldErrorText;
    private _manualInputButtonText;
    private _finishButtonText;
    private _restartButtonText;
    private _pauseButtonText;
    private _adaptiveScanningText;
    private _scanningText;
    private _labelDefinitionsPlaceholders;
    static create(): LabelCaptureValidationFlowSettings;
    constructor();
    /**
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    get missingFieldsHintText(): string;
    /**
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    set missingFieldsHintText(text: string);
    get standbyHintText(): string;
    set standbyHintText(text: string);
    get validationHintText(): string;
    set validationHintText(text: string);
    get validationErrorText(): string;
    set validationErrorText(text: string);
    /**
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    get requiredFieldErrorText(): string;
    /**
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    set requiredFieldErrorText(text: string);
    /**
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    get manualInputButtonText(): string;
    /**
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    set manualInputButtonText(text: string);
    get finishButtonText(): string;
    set finishButtonText(text: string);
    get restartButtonText(): string;
    set restartButtonText(text: string);
    get pauseButtonText(): string;
    set pauseButtonText(text: string);
    get adaptiveScanningText(): string;
    set adaptiveScanningText(text: string);
    get scanningText(): string;
    set scanningText(text: string);
    setPlaceholderTextForLabelDefinition(fieldName: string, placeholder: string | null): void;
    getPlaceholderTextForLabelDefinition(fieldName: string): string | null;
    toJSON(): object;
}

declare enum LabelResultUpdateType {
    AsyncFinished = "AsyncFinished",
    AsyncStarted = "AsyncStarted",
    Sync = "Sync"
}

interface LabelCaptureValidationFlowListener {
    didCaptureLabelWithFields(fields: LabelField[]): void;
    didSubmitManualInputForField(field: LabelField, oldValue: string | null, newValue: string): void;
    didUpdateValidationFlowResult(type: LabelResultUpdateType, asyncId: number, fields: LabelField[], getFrameData: () => Promise<FrameData | null>): Promise<void>;
}

declare class LabelCaptureValidationFlowOverlay extends DefaultSerializeable implements DataCaptureOverlay {
    private type;
    private settings;
    private hasListener;
    private _listener;
    private controller;
    private _view;
    private modeId;
    private _shouldHandleKeyboardInsetsInternally;
    get shouldHandleKeyboardInsetsInternally(): boolean;
    set shouldHandleKeyboardInsetsInternally(value: boolean);
    private get view();
    private set view(value);
    private onViewIdChanged;
    constructor(mode: LabelCapture);
    get listener(): LabelCaptureValidationFlowListener | null;
    set listener(listener: LabelCaptureValidationFlowListener | null);
    applySettings(settings: LabelCaptureValidationFlowSettings): Promise<void>;
}

interface LabelCaptureValidationFlowListenerEventPayload {
    fields: string[];
    oldValue: string | null;
    newValue: string;
    type: LabelResultUpdateType;
    frameId: string | null;
    asyncId: number;
}
declare enum LabelCaptureValidationFlowListenerEvents {
    didCaptureLabelWithFields = "LabelCaptureValidationFlowListener.didCaptureLabelWithFields",
    didSubmitManualInputForField = "LabelCaptureValidationFlowListener.didSubmitManualInputForField",
    didUpdateValidationFlowResult = "LabelCaptureValidationFlowListener.didUpdateValidationFlowResult"
}
declare class LabelCaptureValidationFlowOverlayController extends BaseController<LabelProxy> {
    private overlay;
    private isSubscribed;
    private hasPendingListenerRegistration;
    private registeredViewId;
    private adapter;
    private frameDataController;
    constructor(overlay: LabelCaptureValidationFlowOverlay);
    updateValidationFlowOverlay(): Promise<void>;
    subscribeLabelCaptureValidationFlowListener(): Promise<void>;
    private registerListenerForCurrentView;
    onViewChanged(): Promise<void>;
    unsubscribeLabelCaptureValidationFlowListener(): Promise<void>;
    dispose(): void;
    private initialize;
    private handleDidCaptureLabelWithFieldsEvent;
    private handleDidSubmitManualInputForFieldEvent;
    private handleDidUpdateValidationFlowResult;
    private notifyListenersOfDidCaptureLabelWithFields;
    private notifyListenersOfDidSubmitManualInputForField;
    private get dataCaptureViewId();
    private handleDidCaptureLabelWithFieldsEventWrapper;
    private handleDidSubmitManualInputForFieldEventWrapper;
    private handleDidUpdateValidationFlowResultEventWrapper;
}
interface PrivateLabelCaptureValidationFlowOverlay {
    mode: LabelCapture;
}

interface LabelCaptureAdaptiveRecognitionListener {
    didRecognize(result: AdaptiveRecognitionResult): void;
    didFail(): void;
}

declare class LabelCaptureAdaptiveRecognitionSettings extends DefaultSerializeable {
    private _processingHintText;
    private _resultType;
    constructor(resultType: AdaptiveRecognitionResultType);
    get processingHintText(): string;
    set processingHintText(text: string);
    get resultType(): AdaptiveRecognitionResultType;
    set resultType(resultType: AdaptiveRecognitionResultType);
}

declare class LabelCaptureAdaptiveRecognitionOverlay extends DefaultSerializeable implements DataCaptureOverlay {
    private type;
    private settings;
    private controller;
    private _view;
    private modeId;
    private _listener;
    private hasListener;
    private get view();
    private set view(value);
    private onViewIdChanged;
    get listener(): LabelCaptureAdaptiveRecognitionListener | null;
    set listener(listener: LabelCaptureAdaptiveRecognitionListener | null);
    constructor(mode: LabelCapture);
    applySettings(settings: LabelCaptureAdaptiveRecognitionSettings): Promise<void>;
}

declare enum LabelCaptureAdaptiveRecognitionListenerEvents {
    recognized = "LabelCaptureAdaptiveRecognitionListener.recognized",
    failure = "LabelCaptureAdaptiveRecognitionListener.failure"
}
declare class LabelCaptureAdaptiveRecognitionOverlayController extends BaseController<LabelProxy> {
    private overlay;
    private adapter;
    private hasListeners;
    private hasPendingListenerRegistration;
    private registeredViewId;
    private get dataCaptureViewId();
    constructor(overlay: LabelCaptureAdaptiveRecognitionOverlay);
    subscribeListener(): Promise<void>;
    private registerListenerForCurrentView;
    onViewChanged(): Promise<void>;
    unsubscribeListener(): Promise<void>;
    applySettings(): Promise<void>;
    dispose(): void;
    private initialize;
    private handleRecognized;
    private handleFailure;
    private handleRecognizedWrapper;
    private handleFailureWrapper;
}
interface LabelCaptureAdaptiveRecognitionOverlayEventPayload {
    result: AdaptiveRecognitionResult;
}

interface PrivateLabelCapture extends PrivateDataCaptureMode {
    _context: DataCaptureContext | null;
    listeners: LabelCaptureListener[];
    parentId: number | null;
}

declare const LABEL_PROXY_TYPE_NAMES: readonly ["LabelCaptureProxy", "LabelCaptureBasicOverlayProxy", "LabelCaptureAdvancedOverlayProxy", "LabelCaptureValidationFlowOverlayProxy", "LabelCaptureAdaptiveRecognitionOverlayProxy"];
type LabelProxyType = (typeof LABEL_PROXY_TYPE_NAMES)[number];
interface LabelNativeCallerProvider extends NativeCallerProvider<LabelProxyType> {
}

declare function registerLabelProxies(provider: LabelNativeCallerProvider): void;

export { AdaptiveRecognitionMode, AdaptiveRecognitionResult, AdaptiveRecognitionResultType, BarcodeField, CapturedLabel, CustomBarcode, CustomText, DateText, ExpiryDateText, ImeiOneBarcode, ImeiTwoBarcode, LABEL_PROXY_TYPE_NAMES, LabelCapture, LabelCaptureAdaptiveRecognitionListenerEvents, LabelCaptureAdaptiveRecognitionOverlay, LabelCaptureAdaptiveRecognitionOverlayController, LabelCaptureAdaptiveRecognitionSettings, LabelCaptureAdvancedOverlay, LabelCaptureAdvancedOverlayController, LabelCaptureAdvancedOverlayListenerEvents, LabelCaptureBasicOverlay, LabelCaptureBasicOverlayController, LabelCaptureBasicOverlayListenerEvents, LabelCaptureController, LabelCaptureFeedback, LabelCaptureListenerEvents, LabelCaptureSession, LabelCaptureSettings, LabelCaptureValidationFlowListenerEvents, LabelCaptureValidationFlowOverlay, LabelCaptureValidationFlowOverlayController, LabelCaptureValidationFlowSettings, LabelDateComponentFormat, LabelDateFormat, LabelDateResult, LabelDefinition, LabelField, LabelFieldDefinition, LabelFieldLocation, LabelFieldLocationType, LabelFieldState, LabelFieldType, LabelFieldValueType, LabelResultUpdateType, PackingDateText, PartNumberBarcode, ReceiptScanningLineItem, ReceiptScanningResult, SerialNumberBarcode, TextField, TotalPriceText, UnitPriceText, WeightText, ensureLabelCaptureDefaults, getLabelCaptureDefaults, loadLabelCaptureDefaults, registerLabelProxies, setLabelCaptureDefaultsLoader };
export type { LabelCaptureAdaptiveRecognitionListener, LabelCaptureAdaptiveRecognitionOverlayEventPayload, LabelCaptureAdvancedOverlayEventPayload, LabelCaptureAdvancedOverlayFieldEventPayload, LabelCaptureAdvancedOverlayListener, LabelCaptureBasicOverlayEventPayload, LabelCaptureBasicOverlayListener, LabelCaptureDefaults, LabelCaptureFeedbackJSON, LabelCaptureListener, LabelCaptureValidationFlowListener, LabelCaptureValidationFlowListenerEventPayload, LabelNativeCallerProvider, LabelProxyType, PrivateLabelCapture, PrivateLabelCaptureFeedback, PrivateLabelCaptureValidationFlowOverlay };
