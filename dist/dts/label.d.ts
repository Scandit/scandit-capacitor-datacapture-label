import * as scandit_datacapture_frameworks_core from 'scandit-capacitor-datacapture-core/dist/dts/core';
import { CameraSettings, Feedback as Feedback$1, DefaultSerializeable, Quadrilateral, Rect as Rect$1, FrameData, LocationSelection as LocationSelection$1, BaseProxy, BaseController, ModeBase, DataCaptureMode, DataCaptureContext, DataCaptureOverlay, Viewfinder as Viewfinder$1, PrivateDataCaptureMode, NativeCallerProvider } from 'scandit-capacitor-datacapture-core/dist/dts/core';
import type { Brush as Brush$1, Anchor, PointWithUnit } from 'scandit-capacitor-datacapture-core/dist/dts/core';
import { SymbologySettings as SymbologySettings$1, Barcode, Symbology } from 'scandit-capacitor-datacapture-barcode/dist/dts/barcode';

interface LabelCaptureDefaults {
    LabelCapture: {
        RecommendedCameraSettings: CameraSettings;
        LabelCaptureBasicOverlay: {
            DefaultPredictedFieldBrush: Brush$1;
            DefaultCapturedFieldBrush: Brush$1;
            DefaultLabelBrush: Brush$1;
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
            success: Feedback$1;
        };
    };
}
declare function setLabelCaptureDefaultsLoader(loader: () => void): void;
declare function ensureLabelCaptureDefaults(): LabelCaptureDefaults;
declare function loadLabelCaptureDefaults(jsonDefaults: any): void;
declare function getLabelCaptureDefaults(): LabelCaptureDefaults;

/**
 * Assembles the nested JSON shape that LabelCaptureDefaults' parser expects, out of the flat
 * generated defaults, restricted to the keys that are knowable statically at build time.
 *
 * Excluded (genuinely dynamic, native-only) keys, mirroring LabelCaptureDefaults.getDynamic()
 * on Android:
 * - RecommendedCameraSettings
 * - LabelCaptureValidationFlowOverlay
 */
declare function buildStaticLabelDefaultsJson(platform: 'android' | 'ios'): unknown;

/**
 * Enum specifying the adaptive recognition mode for label definitions. Adaptive recognition uses cloud-based processing as a backup for on-device processing.
 *
 * @since 8.3.0
 */
declare enum AdaptiveRecognitionMode {
    /**
     * Disables adaptive recognition. Only on-device processing is used. This is the default mode.
     *
     * @since 8.3.0
     */
    Off = "off",
    /**
     * Automatic strategy selection. The system will determine the best mix of on-device and cloud processing based on the current conditions.
     *
     * @since 8.3.0
     */
    Auto = "auto",
    /**
     * The system prioritizes on-device processing, but cloud-based processing will be used when possible — even in some circumstances where `Auto` mode would skip it.
     *
     * @since 8.4.0
     */
    On = "on"
}

/**
 * Defines the type of document that can be recognized by the adaptive recognition system.
 *
 * @since 8.2.0
 */
declare enum AdaptiveRecognitionResultType {
    /**
     * Receipt document type.
     *
     * @since 8.2.0
     */
    Receipt = "receipt"
}

/**
 * Base class for all adaptive recognition results. Provides common functionality for all result types.
 *
 * @since 8.2.0
 */
declare abstract class AdaptiveRecognitionResult {
    /**
     * The type of the result object.
     *
     * @since 8.2.0
     */
    get resultType(): AdaptiveRecognitionResultType;
}

/**
 * Base class for defining fields within a label. Label field definitions specify the expected content, validation regexes, and constraints for individual data elements that make up a label structure.
 *
 * Field definitions are used within {@link LabelDefinition} objects to describe the composition of labels, including what types of data to expect (barcodes, text, dates) and how to validate that data.
 *
 * @since 8.0.0
 */
declare class LabelFieldDefinition$1 extends DefaultSerializeable {
    private _name;
    private _valueRegexes;
    private _optional;
    private _numberOfMandatoryInstances;
    private _hiddenProperties;
    /**
     * The unique identifier for this field within the label definition. This name is used to reference the field when processing captured results and must be unique within the label definition.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * Regular expressions used to validate captured content. These regexes allow you to ensure that the captured data matches the expected format for your specific field type.
     *
     * For example, you can use regexes like [“\d{2}/\d{2}/\d{4}”] for date formats, or [“[A-Z]{2}\d{6}”] for codes that must start with two letters followed by six digits.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * Sets a regular expression to validate the content of this field. This regex will be used to ensure that captured data matches the expected format for your specific use case.
     *
     * @since 8.3.0
     */
    setValueRegex(valueRegex: string): void;
    /**
     * Determines whether this field is required for the label to be considered complete. When set to true, the label can be marked as complete even if this field is not found. When false (mandatory), the label will only be complete when this field is successfully captured.
     *
     * Optional fields are useful for scenarios where certain information might not always be present on labels, such as promotional codes or secondary identifiers.
     *
     * @since 8.0.0
     */
    get optional(): boolean;
    set optional(value: boolean);
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
    /**
     * Internal configuration properties used for advanced field customization. These properties are not part of the public API and are used internally by the SDK for field configuration.
     *
     * @since 8.0.0
     */
    get hiddenProperties(): {
        [key: string]: object;
    };
    set hiddenProperties(newValue: {
        [key: string]: object;
    });
    protected constructor(name: string);
}

/**
 * Base class for barcode field definitions used in label capture. This class provides the common functionality for all barcode field types, including symbology settings configuration.
 *
 * A barcode field must be configured with at least one symbology. Creating one with an empty symbology set raises an error.
 *
 * @since 8.0.0
 */
declare class BarcodeField extends LabelFieldDefinition$1 {
    private _symbologies;
    private _symbologySettings;
    /**
     * The symbology settings used for this barcode field, defining which barcode types are enabled and their specific configurations.
     *
     * @since 8.0.0
     */
    get symbologySettings(): SymbologySettings$1[];
    protected constructor(name: string, symbologies: SymbologySettings$1[]);
}

/**
 * Represents the result of parsing a date from captured text using a {@link LabelDateFormat}. Contains the individual date components (day, month, year) in both numeric and string formats.
 *
 * This class is returned when date text fields are successfully parsed according to the configured date format patterns.
 *
 * @since 8.0.0
 */
declare class LabelDateResult extends DefaultSerializeable {
    private _day;
    private _month;
    private _year;
    private _dayString;
    private _monthString;
    private _yearString;
    private static fromJSON;
    private constructor();
    /** @since 8.0.0 */
    get day(): number | null;
    /** @since 8.0.0 */
    get month(): number | null;
    /** @since 8.0.0 */
    get year(): number | null;
    /**
     * The day in String form.
     *
     * @since 8.0.0
     */
    get dayString(): string;
    /**
     * The month in String form.
     *
     * @since 8.0.0
     */
    get monthString(): string;
    /**
     * The year in String form.
     *
     * @since 8.0.0
     */
    get yearString(): string;
}

/**
 * An enumeration of possible states a {@link CapturedLabel|label field} can be in.
 *
 * @since 8.0.0
 */
declare enum LabelFieldState {
    /**
     * The field has been captured, e.g. the barcode or text has been read and its location is known.
     *
     * @since 8.0.0
     */
    Captured = "captured",
    /**
     * The field has not been captured yet, but its location has been predicted.
     *
     * @since 8.0.0
     */
    Predicted = "predicted",
    /**
     * The field data as well as its location are unknown.
     *
     * @since 8.0.0
     */
    Unknown = "unknown"
}

/**
 * An enumeration of possible field types of a {@link LabelField|captured field}. The type of the field is given by the currently active {@link LabelCaptureSettings|label capture settings}.
 *
 * @since 8.0.0
 */
declare enum LabelFieldType {
    /**
     * The type of the captured field is barcode. For fields that have been {@link LabelFieldState.Captured}, the data encoded in the field is available through the {@link LabelField.barcode} property.
     *
     * @since 8.0.0
     */
    Barcode = "barcode",
    /**
     * The type of the captured field is text. For fields that have been {@link LabelFieldState.Captured}, the data encoded in the field is available through the {@link LabelField.text} property.
     *
     * @since 8.0.0
     */
    Text = "text",
    /**
     * The type of the captured field is unknown.
     *
     * @since 8.0.0
     */
    Unknown = "unknown"
}

/**
 * Specifies the value type of a captured field.
 *
 * @since 8.3.0
 */
declare enum LabelFieldValueType {
    /**
     * The field value represents a date.
     *
     * @since 8.3.0
     */
    Date = "date",
    /**
     * The field value represents a price.
     *
     * @since 8.3.0
     */
    Price = "price",
    /**
     * The field value represents a weight.
     *
     * @since 8.3.0
     */
    Weight = "weight",
    /**
     * The field value represents text.
     *
     * @since 8.3.0
     */
    Text = "text",
    /**
     * The field value represents a numeric value.
     *
     * @since 8.3.0
     */
    Numeric = "numeric"
}





/**
 * Represents a captured field within a label. Each field corresponds to a specific data element defined in the {@link LabelDefinition} and contains the actual captured data along with metadata about its state, location, and type.
 *
 * Fields can be either barcode fields (containing {@link Barcode} data) or text fields (containing string data), and may include additional semantic information such as parsed dates.
 *
 * **Processing captured fields:**
 *
 * ```javascript
 * capturedFields.forEach(field => {
 *     const value = field.barcode?.data ?? field.text ?? formatDate(field.date);
 *     console.log(`${field.name}: ${value}`);
 * });
 * ```
 *
 * @since 8.0.0
 */
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
    /**
     * The unique identifier for this captured field within the label. This name corresponds to the field name specified in the {@link LabelDefinition} when configuring the label structure. For example, field names might be “barcode”, “price”, “expiry_date”, etc.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * Identifies the type of the captured field type. This either returns {@link LabelFieldType.Barcode}, or {@link LabelFieldType.Text}. Depending on the type, further information such as captured data is available through the following properties:
     *
     * - When the type is {@link LabelFieldType.Barcode}, the captured data can be extracted through the {@link LabelField.barcode} property.
     * - When the type is {@link LabelFieldType.Text}, the captured data can be extracted through the {@link LabelField.text} property.
     *
     * @since 8.0.0
     */
    get type(): LabelFieldType;
    /**
     * The predicted location of this field within the image, represented as a quadrilateral with four corner points. These coordinates are in image space and need to be converted to view coordinates before they can be used for UI overlays. When the field’s {@link LabelField.state} is {@link LabelFieldState.Unknown}, a quadrilateral with all points set to (0,0) is returned.
     *
     * @since 8.0.0
     */
    get predictedLocation(): Quadrilateral;
    /**
     * The current state of this field in the capture process. This indicates whether the field has been successfully captured, its location has been predicted, or it remains unknown:
     *
     * - {@link LabelFieldState.Captured} - The field has been successfully recognized and its data extracted
     * - {@link LabelFieldState.Predicted} - The field’s location has been estimated but data hasn’t been captured yet
     * - {@link LabelFieldState.Unknown} - The field’s location could not be determined
     *
     * @since 8.0.0
     */
    get state(): LabelFieldState;
    /**
     * Indicates whether this field is required for the label to be considered complete. Returns true for mandatory fields and false for optional fields. This value is determined by the isOptional property set in the corresponding field definition.
     *
     * @since 8.0.0
     */
    get isRequired(): boolean;
    /**
     * The decoded barcode data for this field. This property contains the full barcode information including the decoded data, symbology, and location. Returns *null* when the field type is not {@link LabelFieldType.Barcode} or when the barcode hasn’t been successfully captured yet.
     *
     * @since 8.0.0
     */
    get barcode(): Barcode | null;
    /**
     * The recognized text content for this field. This property contains the raw text string extracted through OCR processing. Returns *null* when the field type is not {@link LabelFieldType.Text} or when the text hasn’t been successfully captured yet.
     *
     * @since 8.0.0
     */
    get text(): string | null;
    /**
     * Identifies the semantic value type of the captured field, providing additional context about the data’s meaning beyond just barcode or text. This helps determine how to interpret and process the captured information.
     *
     * @since 8.3.0
     */
    get valueType(): LabelFieldValueType;
    /**
     * Attempts to parse the field content as a date using the {@link LabelDateFormat} specified in the field definition. Returns a {@link LabelDateResult} containing structured date components (day, month, year) if parsing succeeds, or *null* if the field is not a date field or if parsing fails.
     *
     * @since 8.0.0
     */
    asDate(): LabelDateResult | null;
}

/**
 * A captured label tracked over multiple frames. This class holds the list of label fields as well as the predicted boundary of the label. Each instance of a found label has a unique tracking Id which remains constant over multiple frames.
 *
 * Captured labels represent the result of successfully identifying and tracking a label based on a {@link LabelDefinition}. The label becomes “complete” when all required fields have been captured, though optional fields may still be added in subsequent frames.
 *
 * The tracking system allows labels to be followed across multiple camera frames, enabling progressive capture where individual fields are recognized over time until the complete label structure is assembled.
 *
 * @since 8.0.0
 */
declare class CapturedLabel {
    private _fields;
    private _name;
    private _predictedBounds;
    private _deltaTimeToPrediction;
    private _trackingID;
    private _isComplete;
    /**
     * List of fields in the label. For each field defined in the corresponding {@link LabelDefinition}, exactly one captured field is returned. The fields contain the actual captured data (barcode values, text content, etc.).
     *
     * @since 8.0.0
     */
    get fields(): LabelField[];
    /**
     * The name of this label, e.g. *label-a*. This property can be used in case multiple different label definitions are used at the same time.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * Whether the label has been completely scanned. Returns true as soon as all the required fields defined in the {@link LabelDefinition} are present and successfully captured. Optional fields do not need to be present for this property to be true.
     *
     * This property is useful for determining when to stop scanning and process the captured label data.
     *
     * @since 8.0.0
     */
    get isComplete(): boolean;
    /**
     * The predicted label bounds in image coordinates. These coordinates represent the estimated outline of the entire label area and will need to be converted to view coordinates before they can be visualized in UI overlays.
     *
     * The prediction takes into account the label’s movement across frames and provides a more stable bounding box for display purposes.
     *
     * @since 8.0.0
     */
    get predictedBounds(): Quadrilateral;
    /**
     * The delta time used for predicting the label bounds ({@link CapturedLabel.predictedBounds}) as well as the field locations (available as {@link LabelField.predictedLocation}).
     *
     * @since 8.0.0
     */
    get deltaTimeToPrediction(): number;
    /**
     * The tracking identifier for this label.
     *
     * @since 8.0.0
     */
    get trackingID(): number;
    private frameSequenceID;
    private static fromJSON;
}

/**
 * Defines the expected location of a field within a label. This class allows you to specify either exact coordinates or predefined relative positions where a field should be searched for during label capture.
 *
 * Field locations help constrain the search area and improve recognition accuracy by focusing the capture engine on specific regions of the label.
 *
 * @since 8.0.0
 */
declare class LabelFieldLocation$1 extends DefaultSerializeable {
    private _rect;
    private _type;
    /**
     * Constructs a new Label Field Location with the provided location.
     *
     * @since 8.0.0
     */
    static forRect(rect: Rect$1): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the provided coordinates.
     *
     * @since 8.0.0
     */
    static for(left: number, top: number, right: number, bottom: number): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the top-left corner.
     *
     * @since 8.0.0
     */
    static topLeft(): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the top-right corner.
     *
     * @since 8.0.0
     */
    static topRight(): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the bottom-left corner.
     *
     * @since 8.0.0
     */
    static bottomLeft(): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the bottom-right corner.
     *
     * @since 8.0.0
     */
    static bottomRight(): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the top half.
     *
     * @since 8.0.0
     */
    static top(): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the bottom half.
     *
     * @since 8.0.0
     */
    static bottom(): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the left half.
     *
     * @since 8.0.0
     */
    static left(): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the right half.
     *
     * @since 8.0.0
     */
    static right(): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the center.
     *
     * @since 8.0.0
     */
    static center(): LabelFieldLocation$1;
    /**
     * Constructs a new Label Field Location with the predefined location type corresponding to the whole label.
     *
     * @since 8.0.0
     */
    static wholeLabel(): LabelFieldLocation$1;
}

/**
 * Defines a barcode field with customizable symbology support and validation regexes. This field type allows you to specify which barcode symbologies should be recognized and optionally apply data validation regexes to the decoded content.
 *
 * A custom barcode field must be configured with at least one symbology. Creating one with an empty symbology set raises an error.
 *
 * @since 8.0.0
 */
declare class CustomBarcode extends BarcodeField {
    /**
     * The spatial location constraint for this barcode field within the label. This can be used to specify where on the label this field is expected to appear, helping to improve recognition accuracy and speed by focusing the search area.
     *
     * @since 8.0.0
     */
    location: LabelFieldLocation$1 | null;
    private _anchorRegexes;
    private _fieldType;
    /**
     * Creates a new custom barcode field definition with the given name and symbology settings.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings$1[]): CustomBarcode;
    /**
     * Creates a new custom barcode field definition with the given name and supported symbologies.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): CustomBarcode;
    /**
     * Creates a new custom barcode field definition with the given name and symbology settings.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbology(name: string, symbology: Symbology): CustomBarcode;
    private constructor();
    /**
     * Context-identifying keywords or phrases used to distinguish between fields that may have similar patterns. These patterns help Smart Label Capture identify which field the captured data belongs to when multiple fields could match the same regex.
     *
     * For example, when a label contains both expiry date and packing date fields, you can use anchorRegexes like [“exp”, “expiry”] for the expiry date field and [“pack”, “packing”] for the packing date field to help the system correctly identify which date is which.
     *
     * @since 8.0.0
     */
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    private static get barcodeDefaults();
    /**
     * The name of the barcode field.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * Regular expressions used to validate the decoded barcode content. These patterns allow you to ensure that the captured barcode data matches the expected format for your specific use case.
     *
     * For example, you can use regexes like [“^[0-9]{12,13}$”] to ensure the barcode contains only 12-13 digits, or [“^[A-Z0-9]{17}$”] for VIN codes that must be exactly 17 alphanumeric characters.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * Determines whether this field is required for the label to be considered complete. When set to true, the label can be marked as complete even if this field is not found. When false (mandatory), the label will only be complete when this field is successfully captured.
     *
     * Optional fields are useful for scenarios where certain information might not always be present on labels, such as promotional codes or secondary identifiers.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * The barcode symbologies (formats) that this field should recognize. This allows you to specify which types of barcodes are expected for this field, such as Code 128, EAN-13, or Data Matrix.
     *
     * Restricting symbologies improves recognition accuracy and performance by focusing the scanner on the expected barcode formats for each field.
     *
     * @since 8.0.0
     */
    get symbologies(): SymbologySettings$1[];
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

/**
 * Base class for text field definitions used in label capture. This class provides the common functionality for all text field types, including regex validation and text recognition settings.
 *
 * @since 8.0.0
 */
declare class TextField extends LabelFieldDefinition$1 {
}

/**
 * Defines a text field with customizable OCR recognition and validation regexes. This field type uses optical character recognition (OCR) to extract text content from labels and can apply regexes for content validation.
 *
 * @since 8.0.0
 */
declare class CustomText extends TextField {
    /**
     * The spatial location constraint for this text field within the label. This can be used to specify where on the label this field is expected to appear, helping to improve recognition accuracy and speed by focusing the OCR processing area.
     *
     * @since 8.0.0
     */
    location: LabelFieldLocation$1 | null;
    private _anchorRegexes;
    private _fieldType;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    constructor(name: string);
    /**
     * Context-identifying keywords or phrases used to distinguish between fields that may have similar patterns. These patterns help Smart Label Capture identify which field the captured data belongs to when multiple fields could match the same regex.
     *
     * For example, when a label contains both expiry date and packing date fields, you can use anchorRegexes like [“exp”, “expiry”] for the expiry date field and [“pack”, “packing”] for the packing date field to help the system correctly identify which date is which.
     *
     * @since 8.0.0
     */
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    /**
     * The unique identifier for this text field within the label definition. This name is used to reference the field when processing captured results and must be unique within the label definition.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * Regular expressions used to validate the recognized text content. These regexes allow you to ensure that the captured text matches the expected format for your specific use case.
     *
     * For example, you can use regexes like [“\d{2}/\d{2}/\d{4}”] for date formats, or [“[A-Z]{2}\d{6}”] for codes that must start with two letters followed by six digits.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * Determines whether this field is required for the label to be considered complete. When set to true, the label can be marked as complete even if this field is not found. When false (mandatory), the label will only be complete when this field is successfully captured.
     *
     * Optional fields are useful for scenarios where certain information might not always be present on labels, such as promotional text or secondary identifiers.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

/**
 * An enumeration of possible date formats to expect when parsing a date in a suitable {@link LabelField}.
 *
 * @since 8.0.0
 */
declare enum LabelDateComponentFormat {
    /**
     * Marks the date to follow a date format with day, month and year, in that order.
     *
     * @since 8.0.0
     */
    DMY = "dmy",
    /**
     * Marks the date to follow a date format with month, day and year, in that order.
     *
     * @since 8.0.0
     */
    MDY = "mdy",
    /**
     * Marks the date to follow a date format with year, month and day, in that order.
     *
     * @since 8.0.0
     */
    YMD = "ymd"
}

/**
 * Defines the expected format for parsing dates from captured text fields. This class specifies how date components (day, month, year) are ordered and whether partial dates should be accepted during the parsing process.
 *
 * Used in conjunction with date text fields like {@link ExpiryDateText} and {@link PackingDateText} to ensure accurate date recognition and parsing.
 *
 * @since 8.0.0
 */
declare class LabelDateFormat$1 extends DefaultSerializeable {
    private _componentFormat;
    private _acceptPartialDates;
    /**
     * Constructs an instance of this class with the provided parameters.
     *
     * @since 8.0.0
     */
    constructor(componentFormat: LabelDateComponentFormat, acceptPartialDates: boolean);
    /**
     * Holds the expected order for the date components. Defaults to {@link LabelDateComponentFormat.YMD}.
     *
     * @since 8.0.0
     */
    get componentFormat(): LabelDateComponentFormat;
    /**
     * Whether or not to accept partial dates corresponding to the specified component format. Defaults to *true*.
     *
     * @since 8.0.0
     */
    get acceptPartialDates(): boolean;
}

/**
 * This class is used to define a date field in a {@link LabelDefinition}.
 *
 * @since 8.3.0
 */
declare class DateText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    private _labelDateFormat;
    /**
     * Builds a new instance of this class with the provided name and date format.
     *
     * @since 8.3.0
     */
    constructor(name: string, labelDateFormat: LabelDateFormat$1);
    /**
     * Returns the {@link LabelDateFormat} used to parse dates.
     *
     * @since 8.3.0
     */
    get labelDateFormat(): LabelDateFormat$1;
    /**
     * Used to specify keywords or phrases that help identify the context of the field. This is particularly useful when the label contains multiple fields that could match the same regex (e.g., when both packaging and expiry dates are present).
     *
     * @since 8.3.0
     */
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    /**
     * Returns the name associated with this instance.
     *
     * @since 8.3.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.3.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.3.0
     */
    get isOptional(): boolean;
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

/**
 * A specialized text field for capturing expiry dates. This predefined field type is optimized for recognizing date formats commonly found on product labels, packaging, and documents.
 *
 * The field can be configured with specific date formats using {@link LabelDateFormat} to ensure proper parsing of various date representations (MM/dd/yyyy, dd.MM.yyyy, etc.).
 *
 * @since 8.0.0
 */
declare class ExpiryDateText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    private _labelDateFormat;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    constructor(name: string);
    /**
     * Used to get and set the {@link LabelDateFormat} used to parse dates.
     *
     * @since 8.0.0
     */
    get labelDateFormat(): LabelDateFormat$1 | null;
    set labelDateFormat(value: LabelDateFormat$1 | null);
    /**
     * Used to specify keywords or phrases that help identify the context of the field. This is particularly useful when the label contains multiple fields that could match the same regex (e.g., when both packaging and expiry dates are present).
     *
     * @since 8.0.0
     */
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    /**
     * Returns the name associated with this instance.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

/**
 * A specialized barcode field for capturing the first IMEI (International Mobile Equipment Identity) number from smart device labels. This predefined field type is optimized for recognizing IMEI barcodes typically found on mobile device packaging and labels.
 *
 * @since 8.0.0
 */
declare class ImeiOneBarcode extends BarcodeField {
    private _fieldType;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings$1[]): ImeiOneBarcode;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): ImeiOneBarcode;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbology(name: string, symbology: Symbology): ImeiOneBarcode;
    private static get barcodeDefaults();
    /**
     * The name of the field.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * The symbologies for the field.
     *
     * @since 8.0.0
     */
    get symbologies(): SymbologySettings$1[];
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
    private constructor();
}

/**
 * A specialized barcode field for capturing the second IMEI (International Mobile Equipment Identity) number from smart device labels. This predefined field type is optimized for dual-SIM devices that have two IMEI numbers on their labels.
 *
 * @since 8.0.0
 */
declare class ImeiTwoBarcode extends BarcodeField {
    private _fieldType;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings$1[]): ImeiTwoBarcode;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): ImeiTwoBarcode;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbology(name: string, symbology: Symbology): ImeiTwoBarcode;
    private static get barcodeDefaults();
    /**
     * The name of the field.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * The symbologies for the field.
     *
     * @since 8.0.0
     */
    get symbologies(): SymbologySettings$1[];
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
    private constructor();
}

/**
 * Holds the ongoing state of capturing data contained in one or more labels. An instance of this class is passed to LabelCaptureListener.didUpdateSession() when new labels are captured, or existing labels are updated or lost.
 *
 * The session provides access to all currently tracked labels, including those that are still being progressively captured (incomplete) and those that have all required fields captured (complete). Labels maintain their tracking IDs across multiple frames until they are no longer visible.
 *
 * The capture session should only be accessed from within didUpdateSession() to which it is provided as an argument. It is not safe to be accessed from anywhere else since it may be concurrently modified.Specifically no reference to {@link LabelCaptureSession.capturedLabels} should be kept and traversed outside of didUpdateSession(). Instead a copy of the list should be made to avoid concurrent modification. The individual labels can be referenced without copying as they are not further modified.
 *
 * @since 8.0.0
 */
declare class LabelCaptureSession {
    private _capturedLabels;
    private _frameSequenceID;
    private _lastProcessedFrameId;
    private frameId;
    /**
     * List of currently captured labels.
     *
     * @since 8.0.0
     */
    get capturedLabels(): CapturedLabel[];
    /**
     * The identifier of the current frame sequence.
     *
     * @since 8.0.0
     */
    get frameSequenceID(): number;
    /**
     * The identifier of the last processed frame.
     *
     * @since 8.3.0
     */
    get lastProcessedFrameId(): number;
    private static fromJSON;
}




/**
 * Interface to be implemented by listeners that want to observe a {@link LabelCapture|label capture mode} and get informed whenever new labels have been captured, existing labels have been updated or lost.
 *
 * This listener is essential to the Smart Label Capture workflow, providing callbacks for handling label recognition events and processing captured field data. Best practices include disabling the capture mode after successful recognition and using background processing for result handling.
 *
 * Key responsibilities include:
 *
 * - **Handling captured labels** - Process complete labels and their field data
 * - **Managing capture lifecycle** - Disable mode after successful capture to prevent duplicate results
 * - **Providing user feedback** - Give immediate feedback on successful captures
 * - **Optional field handling** - Process both mandatory and optional fields gracefully
 *
 * @since 8.0.0
 */
interface LabelCaptureListener {
    /**
     * Invoked after label capture has processed a frame. The *session* contains a list of the currently captured labels, including both complete and incomplete labels being tracked. The list may be empty when no labels are currently detected.
     *
     * Use this callback to:
     *
     * - Check for newly completed labels using {@link CapturedLabel.isComplete}
     * - Extract data from captured label fields
     * - Implement application-specific logic for handling captured labels
     *
     * @since 8.0.0
     */
    didUpdateSession?(labelCapture: LabelCapture, session: LabelCaptureSession, getFrameData: () => Promise<FrameData | null>): Promise<void>;
}

/**
 * A configuration that defines labels and their relevant fields for Smart Label Capture to recognize and extract during scans. Label definitions provide flexible data extraction from specific label layouts without custom coding, enabling structured data extraction from diverse label types.
 *
 * Label definitions support two primary approaches:
 *
 * - **Pre-built Labels** - Includes predefined configurations for common label types (price labels, VIN labels, 7-segment displays)
 * - **Custom Labels** - Allows creating unique label definitions using custom barcode and text fields
 *
 * Key configuration options for custom fields:
 *
 * - **valueRegexes** - Regular expressions to identify target strings
 * - **anchorRegexes** - Context-identifying keywords for field recognition
 * - **symbologies** - Specific barcode types to match
 * - **isOptional** - Determines field requirement status
 *
 * Pre-built field categories include:
 *
 * - **Barcode Fields** - Serial number, part number, IMEI
 * - **Price/Weight Fields** - Unit price, total price, weight
 * - **Date/Text Fields** - Packing date, expiry date
 *
 * You can create label definitions in three ways:
 *
 * @since 8.0.0
 */
declare class LabelDefinition$1 extends DefaultSerializeable {
    private _name;
    private _fields;
    private _type;
    private _adaptiveRecognitionMode;
    private _hiddenProperties;
    /**
     * The name of the label definition.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The fields of the label definition.
     *
     * @since 8.0.0
     */
    get fields(): LabelFieldDefinition$1[];
    set fields(values: LabelFieldDefinition$1[]);
    /**
     * Adds a field to the label definition.
     *
     * @since 8.3.0
     */
    addField(field: LabelFieldDefinition$1): void;
    /**
     * Adds multiple fields to the label definition.
     *
     * @since 8.3.0
     */
    addFields(fields: LabelFieldDefinition$1[]): void;
    /**
     * Controls whether the **Adaptive Recognition Engine** is enabled for this label definition. The **Adaptive Recognition Engine** helps making Smart Label Capture more robust and scalable thanks to its larger, more capable model hosted in the cloud. Whenever Smart Label Capture’s on-device model fails to capture data, the SDK will automatically trigger the **Adaptive Recognition Engine** to capture complex, unforeseen data capture and process it with high accuracy and reliability. See {@link AdaptiveRecognitionMode} for available options. Defaults to {@link AdaptiveRecognitionMode.Off}.
     *
     * @since 8.3.0
     */
    get adaptiveRecognitionMode(): AdaptiveRecognitionMode;
    set adaptiveRecognitionMode(value: AdaptiveRecognitionMode);
    /**
     * Sets properties to the label definition.
     *
     * @since 8.0.0
     */
    get hiddenProperties(): {
        [key: string]: object;
    };
    set hiddenProperties(newValue: {
        [key: string]: object;
    });
    /**
     * Creates a predefined label definition for scanning Vehicle Identification Numbers (VIN). VIN codes are 17-character alphanumeric serial numbers that can appear as either text or barcodes on vehicles.
     *
     * ```javascript
     * const vinLabel = await LabelDefinition.createVinLabelDefinition("vehicle_vin");
     * ```
     *
     * This factory method returns a label definition with two optional fields:
     *
     * - **text** - An optional text field for scanning VIN codes in text format with pattern `[A-Z0-9]{17}`
     * - **barcode** - An optional barcode field for scanning VIN codes in barcode format (QR, Code 39, Code 128, or Data Matrix symbologies) with pattern `[A-Z0-9]{17}`
     *
     * This label definition is not intended for use in the Validation Flow. Using it there may result in incorrect data being captured for the label fields.
     *
     * @since 8.0.0
     */
    static createVinLabelDefinition(name: string): LabelDefinition$1;
    /**
     * Creates a predefined label definition for scanning price labels on retail products. This factory method is designed for price checking scenarios where both barcode and price text need to be captured from product labels.
     *
     * This factory method returns a label definition with two fields:
     *
     * - **SKU** - A mandatory barcode field for scanning {@link Symbology.EAN13UPCA}, {@link Symbology.EAN8}, and {@link Symbology.Code128}.
     * - **priceText** - A mandatory text field for scanning price text using specialized price label recognition. It matches a whole number, optionally grouped in thousands with a space or comma, followed by an optional two-digit decimal part separated by `.` or `,`.
     *
     * You can easily disable one of the symbologies of the barcode field by changing global mode settings. For example, to disable {@link Symbology.Code128} one can do this:
     *
     * To use this label definition, make sure to import the PriceCapture library.
     *
     * This label definition is not intended for use in the Validation Flow. Using it there may result in incorrect data being captured for the label fields.
     *
     * @since 8.0.0
     */
    static createPriceCaptureDefinition(name: string): LabelDefinition$1;
    /**
     * Creates a predefined label definition for reading numeric values from 7-segment displays, such as digital scales, meters, or other electronic displays.
     *
     * This factory method returns a label definition with one field:
     *
     * - **weight** - A text field for 7-segment displays with pattern `[0-9OQB]{1,4}[\.\,\s]?[0-9OQB]{1,4}`
     *
     * The pattern accounts for common variations in 7-segment displays where certain characters may appear similar (e.g., ‘O’ for ‘0’, ‘Q’ for ‘0’, ‘B’ for ‘8’).
     *
     * @since 8.0.0
     */
    static createSevenSegmentDisplayLabelDefinition(name: string): LabelDefinition$1;
    private static fromJSON;
    /**
     * Creates a new label definition with the given name.
     *
     * @since 8.0.0
     */
    constructor(name: string);
}

/**
 * Smart Label Capture enables simultaneous scanning of multiple barcodes and printed text on labels, streamlining data entry and reducing errors. This data capture mode combines barcode recognition with OCR to extract contextually relevant data fields from labels with structured layouts.
 *
 * Smart Label Capture intelligently identifies label information using multiple recognition approaches:
 *
 * - **Content analysis** of texts and barcodes for validation
 * - **Barcode symbology** detection for field identification
 * - **Relative field positioning** within the label layout
 * - **Textual context** to understand field relationships
 *
 * Primary use cases include:
 *
 * - **Retail product scanning** with price verification
 * - **Smart device label scanning** for IMEI and serial numbers
 * - **Shelf price label verification** for retail operations
 * - **Vehicle identification number (VIN) capture** from automotive labels
 *
 * Unlike {@link BarcodeCapture} which focuses on individual barcodes, Smart Label Capture provides contextual intelligence to extract multiple data types simultaneously and supports flexible field definitions for diverse label layouts.
 *
 * The key components of Label Capture are:
 *
 * - **Label Definitions**: Define the structure and expected fields of labels
 * - **Field Definitions**: - Define individual data fields (barcodes, text, dates, etc.)
 * - **Captured Labels**: - Represent successfully scanned labels with all their field data
 *
 * Label Capture can track labels across multiple frames, allowing for progressive scanning where fields are captured over time until the complete label is assembled.
 *
 * It cannot be used together with other capture modes that require the same capabilities, e.g. {@link BarcodeCapture} or {@link BarcodeBatch}.
 *
 * @since 8.0.0
 */
interface LabelCapture$1 {
    type: 'labelCapture';
    settings?: LabelCaptureSettings$1;
    enabled?: boolean;
    /**
     * Instance of {@link LabelCaptureFeedback} that is used to configure the vibration and sound to be used when a label is captured.
     *
     * The default feedback will have both sound and vibration enabled. The default beep sound will be used for the sound feedback.
     *
     * @since 8.0.0
     */
    feedback?: LabelCaptureFeedback$1;
    modeId?: number;
    parentId?: number | null;
    hasListeners?: boolean;
}
/**
 * Configures label capture parameters and defines the structure of labels to be captured. This settings object is central to the Smart Label Capture workflow, specifying which label definitions to use, recognition parameters, and capture behavior.
 *
 * Key configuration aspects:
 *
 * - **Label definitions** - Defines field types (barcodes, dates, text) and their validation rules
 * - **Recognition parameters** - Controls scanning behavior and accuracy
 * - **Location selection** - Specifies scanning areas and constraints
 * - **Symbology settings** - Configures which barcode types are enabled
 *
 * The settings follow a fluent builder pattern for convenient configuration and support multiple label definitions to handle different types of labels in the same scanning session. For the settings to take effect, they must be applied to a {@link LabelCapture|label capture} instance using the appropriate apply settings method. The same holds for settings already applied: changes made to them afterwards take effect only once the settings are applied again.
 *
 * @since 8.0.0
 */
interface LabelCaptureSettings$1 {
    /**
     * Defines the strategy with which to select one out of many visible labels. By default, this property is *null* and label selection is disabled.
     *
     * Currently only {@link RectangularLocationSelection} is supported.
     *
     * @since 8.6.0
     */
    locationSelection?: LocationSelection | null;
    labelDefinitions?: LabelDefinition[];
    languages?: ('en' | 'es')[];
    properties?: unknown;
}
/**
 * Interface for location selection. Location selections implement a specific strategy how a data object (like a barcode or text) is selected out of multiple visible ones by for example only selecting objects inside a certain area or objects that intersect a certain area. Implementations are provided by {@link RadiusLocationSelection} and {@link RectangularLocationSelection}.
 *
 * Location selection implementations are restricted to the set of location selections provided by the Scandit Data Capture SDK, it is not possible to implement this interface with a custom implementations of location selection. This interface does not expose any methods or properties, it just serves as a unifying type for different selection strategies.
 *
 * @since 6.8.0
 */
type LocationSelection = NoLocationSelection | RadiusLocationSelection | RectangularLocationSelection;
interface NoLocationSelection {
    type: 'none';
}
/**
 * Location selection for selecting codes inside a circle with the given radius, centered on the {@link DataCaptureView.pointOfInterest|point of interest}. Any object that touches the circle is returned, objects that do not intersect the circle are filtered out.
 *
 * @since 6.8.0
 */
interface RadiusLocationSelection {
    type: 'radius';
    /**
     * The radius of the circle. When using fractional coordinates, the radius is measured relative to the view’s width.
     *
     * @since 6.8.0
     */
    radius: UIValue;
}
interface UIValue {
    value?: number;
    unit?: 'fraction' | 'pixel' | 'dip';
}
/**
 * Location selection for selecting codes inside a rectangle centered on the {@link DataCaptureView.pointOfInterest|point of interest}. Any object that is fully inside the rectangle is returned, objects that are partially or entirely outside of the rectangle are filtered out.
 *
 * @since 6.8.0
 */
interface RectangularLocationSelection {
    type: 'rectangular';
    size: UIAspectSize;
}
interface UIAspectSize {
    width?: UIValue;
    height?: UIValue;
    shorterDimension?: UIValue;
    aspect?: number;
}
/**
 * A configuration that defines labels and their relevant fields for Smart Label Capture to recognize and extract during scans. Label definitions provide flexible data extraction from specific label layouts without custom coding, enabling structured data extraction from diverse label types.
 *
 * Label definitions support two primary approaches:
 *
 * - **Pre-built Labels** - Includes predefined configurations for common label types (price labels, VIN labels, 7-segment displays)
 * - **Custom Labels** - Allows creating unique label definitions using custom barcode and text fields
 *
 * Key configuration options for custom fields:
 *
 * - **valueRegexes** - Regular expressions to identify target strings
 * - **anchorRegexes** - Context-identifying keywords for field recognition
 * - **symbologies** - Specific barcode types to match
 * - **isOptional** - Determines field requirement status
 *
 * Pre-built field categories include:
 *
 * - **Barcode Fields** - Serial number, part number, IMEI
 * - **Price/Weight Fields** - Unit price, total price, weight
 * - **Date/Text Fields** - Packing date, expiry date
 *
 * You can create label definitions in three ways:
 *
 * @since 8.0.0
 */
interface LabelDefinition {
    /**
     * The name of the label definition.
     *
     * @since 8.0.0
     */
    name: string;
    type?: 'vin' | 'priceCapture' | 'sevenSegment';
    /**
     * The fields of the label definition.
     *
     * @since 8.0.0
     */
    fields?: LabelFieldDefinition[];
    /**
     * Controls whether the **Adaptive Recognition Engine** is enabled for this label definition. The **Adaptive Recognition Engine** helps making Smart Label Capture more robust and scalable thanks to its larger, more capable model hosted in the cloud. Whenever Smart Label Capture’s on-device model fails to capture data, the SDK will automatically trigger the **Adaptive Recognition Engine** to capture complex, unforeseen data capture and process it with high accuracy and reliability. See {@link AdaptiveRecognitionMode} for available options. Defaults to {@link AdaptiveRecognitionMode.Off}.
     *
     * @since 8.3.0
     */
    adaptiveRecognitionMode?: 'off' | 'auto' | 'on';
}
/**
 * Base class for defining fields within a label. Label field definitions specify the expected content, validation regexes, and constraints for individual data elements that make up a label structure.
 *
 * Field definitions are used within {@link LabelDefinition} objects to describe the composition of labels, including what types of data to expect (barcodes, text, dates) and how to validate that data.
 *
 * @since 8.0.0
 */
type LabelFieldDefinition = ImeiOneBarcodeFieldDefinition | ImeiTwoBarcodeFieldDefinition | PartNumberBarcodeFieldDefinition | SerialNumberBarcodeFieldDefinition | ExpiryDateTextFieldDefinition | PackingDateTextFieldDefinition | TotalPriceTextFieldDefinition | UnitPriceTextFieldDefinition | WeightTextFieldDefinition | CustomBarcodeLabelFieldDefinition | CustomTextLabelFieldDefinition | DateTextFieldDefinition;
interface ImeiOneBarcodeFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    fieldType: 'imeiOneBarcode';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
    symbologies?: SymbologySettings;
}
/**
 * Settings specific to a particular {@link Symbology|barcode symbology}.
 *
 * Learn more on how to use symbology settings in our [Configure Barcode Symbologies](https://docs.scandit.com/sdks/capacitor/barcode-capture/configure-barcode-symbologies) guide.
 *
 * @since 6.8.0
 */
type SymbologySettings = unknown;
interface ImeiTwoBarcodeFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    fieldType: 'imeiTwoBarcode';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
    symbologies?: SymbologySettings;
}
interface PartNumberBarcodeFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    fieldType: 'partNumberBarcode';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
    symbologies?: SymbologySettings;
}
interface SerialNumberBarcodeFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    fieldType: 'serialNumberBarcode';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
    symbologies?: SymbologySettings;
}
interface ExpiryDateTextFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    labelDateFormat?: LabelDateFormat;
    fieldType: 'expiryDateText';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
}
/**
 * Defines the expected format for parsing dates from captured text fields. This class specifies how date components (day, month, year) are ordered and whether partial dates should be accepted during the parsing process.
 *
 * Used in conjunction with date text fields like {@link ExpiryDateText} and {@link PackingDateText} to ensure accurate date recognition and parsing.
 *
 * @since 8.0.0
 */
interface LabelDateFormat {
    /**
     * Holds the expected order for the date components. Defaults to {@link LabelDateComponentFormat.YMD}.
     *
     * @since 8.0.0
     */
    componentFormat: 'dmy' | 'mdy' | 'ymd';
    /**
     * Whether or not to accept partial dates corresponding to the specified component format. Defaults to *true*.
     *
     * @since 8.0.0
     */
    acceptPartialDates?: boolean;
}
interface PackingDateTextFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    labelDateFormat?: LabelDateFormat;
    fieldType: 'packingDateText';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
}
interface TotalPriceTextFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    fieldType: 'totalPriceText';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
}
interface UnitPriceTextFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    fieldType: 'unitPriceText';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
}
interface WeightTextFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    fieldType: 'weightText';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
}
interface CustomBarcodeLabelFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    fieldType: 'customBarcode';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
    location?: LabelFieldLocation;
    symbologies?: SymbologySettings;
}
/**
 * Defines the expected location of a field within a label. This class allows you to specify either exact coordinates or predefined relative positions where a field should be searched for during label capture.
 *
 * Field locations help constrain the search area and improve recognition accuracy by focusing the capture engine on specific regions of the label.
 *
 * @since 8.0.0
 */
interface LabelFieldLocation {
    type?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'top' | 'right' | 'bottom' | 'left' | 'center' | 'wholeLabel';
    rect?: Rect;
}
/** @since 6.8.0 */
interface Rect {
    /**
     * The origin (top-left corner) of the rectangle.
     *
     * @since 6.8.0
     */
    origin: RectOrigin;
    /**
     * The size of the rectangle.
     *
     * @since 6.8.0
     */
    size: RectSize;
}
interface RectOrigin {
    x: number;
    y: number;
}
interface RectSize {
    width: number;
    height: number;
}
interface CustomTextLabelFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    fieldType: 'customText';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
    location?: LabelFieldLocation;
}
interface DateTextFieldDefinition {
    name: string;
    number_of_mandatory_instances?: number | null;
    labelDateFormat?: LabelDateFormat;
    fieldType: 'dateText';
    optional?: boolean;
    dataTypePatterns?: string[] | null;
    patterns?: string[] | null;
}
/**
 * Determines what feedback (vibration, sound) should be emitted when capturing labels. The feedback is specified for each {@link LabelCapture} instance separately and can be changed through the {@link LabelCapture.feedback} property by either modifying an existing instance of this class, or by assigning a new one.
 *
 * As of now, this class only allows to configure the feedback that gets emitted when a label is captured successfully, through the {@link LabelCaptureFeedback.success} property.
 *
 * See documentation on the {@link LabelCapture.feedback} property for usage samples.
 *
 * @since 8.0.0
 */
interface LabelCaptureFeedback$1 {
    /**
     * A {@link Feedback} for a success event.
     *
     * @since 8.0.0
     */
    success?: Feedback;
}
/**
 * A feedback consisting of a sound and vibration, for example to be provided by a device when a code has been successfully scanned.
 *
 * @since 6.8.0
 */
interface Feedback {
    /**
     * The sound to be played when a feedback is required. If *null*, no sound is played. Depending on the device’s ring mode and/or volume settings, no sound may be played even if this property is properly set to a non-*null* instance.
     *
     * @since 6.8.0
     */
    sound?: Sound | null;
    /**
     * The vibration to be emitted when a feedback is required. If *null*, no vibration is emitted. This property is further influenced by the device’s ring mode: the device may not vibrate even if this property is properly set to a non-*null* instance.
     *
     * @since 6.8.0
     */
    vibration?: Vibration | null;
}
/**
 * A sound, to be played for example when a code has been successfully scanned.
 *
 * @since 6.8.0
 */
interface Sound {
    /**
     * The name of the resource file, including the extension.
     *
     * On iOS, the file must be added as a resource file, on Android it must be added specifically under app/src/main/assets.
     *
     * @since 6.8.0
     */
    resource?: string;
}
/**
 * A vibration, to be emitted for example when a code has been successfully scanned.
 *
 * @since 6.8.0
 */
interface Vibration {
    type?: 'default' | 'selectionHaptic' | 'successHaptic' | 'impactHaptic' | 'impactHapticLight' | 'failureHaptic' | 'waveForm';
    timings?: number[];
    amplitudes?: number[];
}
interface UIPoint {
    x: UIValue;
    y: UIValue;
}
/**
 * Overlay for label capture that provides visual feedback and customization capabilities for the scanning process. This overlay displays captured labels and their fields on top of the camera preview, offering extensive customization options through listener interfaces.
 *
 * Key visualization features:
 *
 * - **Label highlighting** - Configurable visual feedback for detected labels
 * - **Field state indication** - Different visual styles for predicted vs. captured fields
 * - **Custom brush configuration** - Fully customizable appearance for labels and fields
 * - **Listener-based customization** - Programmatic control over field appearances
 *
 * The overlay distinguishes between different field states:
 *
 * - **Predicted fields** - Fields that have been detected but not yet captured
 * - **Captured fields** - Fields that have been successfully scanned and validated
 *
 * Advanced customization is available through {@link LabelCaptureBasicOverlayListener}, allowing dynamic styling based on field content, validation status, or other contextual information.,
 *
 * Fields are highlighted using a default brush ({@link LabelCaptureBasicOverlay.capturedFieldBrush}, {@link LabelCaptureBasicOverlay.predictedFieldBrush}), a brush set through a user-defined {@link LabelCaptureBasicOverlayListener} or calls to setBrushForFieldOfLabel().
 *
 * @since 8.0.0
 */
interface LabelCaptureBasicOverlay$1 {
    type: 'labelCaptureBasic';
    fieldBrushes?: FieldBrushes;
    /** @since 8.0.0 */
    labelBrush?: Brush;
    /**
     * The viewfinder used to guide users during the scanning process. The viewfinder provides visual cues about the optimal scanning area and helps users position labels correctly.
     *
     * By default, no viewfinder is displayed. Set this to an instance of {@link Viewfinder} (such as {@link RectangularViewfinder}) to provide scanning guidance to users.
     *
     * @since 8.0.0
     */
    viewfinder?: Viewfinder;
    /**
     * Controls whether scan area guides are displayed over the camera preview. These guides help visualize the active scanning regions during development and debugging.
     *
     * This feature is intended for development purposes only and should not be enabled in production applications. By default this property is *false*.
     *
     * @since 8.0.0
     */
    shouldShowScanAreaGuides?: boolean;
    modeId?: number;
    hasListener?: boolean;
}
interface FieldBrushes {
    captured?: Brush;
    predicted?: Brush;
}
/**
 * Brushes define how objects are drawn on screen and allow to change their fill and stroke color as well as the stroke width. They are, for example, used to change the styling of barcode locations, or other objects drawn on top of the video preview. Brushes are immutable. Once created none of the members can be modified.
 *
 * @since 6.8.0
 */
interface Brush {
    fill?: Fill;
    stroke?: Stroke;
}
interface Fill {
    color?: Color;
}
/** @since 6.8.0 */
type Color = string;
interface Stroke {
    color?: Color;
    width?: number;
}
/**
 * Interface for viewfinders. Viewfinders are restricted to the set of viewfinders provided by the Scandit Data Capture SDK, it is not possible for customers to implement this interface and provide custom viewfinder implementations. This interface does not expose any methods or properties, it just serves as a tag for different viewfinder styles.
 *
 * Possible viewfinders are:
 *
 * - {@link AimerViewfinder}
 * - {@link RectangularViewfinder}
 * - {@link LaserlineViewfinder}
 *
 * @since 6.8.0
 */
type Viewfinder = NoneViewfinder | RectangularViewfinder | LaserlineViewfinder | SpotlightViewfinder | AimerViewfinder | TargetAimerViewfinder;
interface NoneViewfinder {
    type: 'none';
    pointOfInterest?: UIPoint | null;
}
/**
 * Rectangular viewfinder with an embedded Scandit logo. The rectangle is always centered on the {@link DataCaptureView.pointOfInterest|point of interest} of the view.
 *
 * The rectangular viewfinder is displayed when the recognition is active and hidden when it is not.
 *
 * To use this viewfinder, create a new instance and assign it to the overlay, e.g. the barcode capture overlay via the {@link BarcodeCaptureOverlay.viewfinder} property.
 *
 * @since 6.8.0
 */
interface RectangularViewfinder {
    type: 'rectangular';
    /**
     * The style of the viewfinder.
     *
     * @since 6.8.0
     */
    style?: 'rounded' | 'square';
    size?: UIAspectSize;
    /**
     * The color used to draw the logo and viewfinder when the mode is enabled. The color is always used at full opacity, changing the alpha value has no effect.
     *
     * @since 6.8.0
     */
    color?: Color;
    /**
     * The color used to draw the logo and viewfinder when the mode is disabled. By default transparent.
     *
     * @since 6.21.0
     */
    disabledColor?: Color;
    /**
     * The style of the viewfinder’s lines.
     *
     * @since 6.8.0
     */
    lineStyle?: 'light' | 'bold';
    /**
     * The amount the area outside the viewfinder’s rectangle is dimmed by. Accepts values between 0 (no dimming) and 1 (fully blacked out).
     *
     * @since 6.8.0
     */
    dimming?: number;
    /**
     * The amount the area outside the viewfinder’s rectangle is dimmed by when the mode is disabled. Accepts values between 0 (no dimming) and 1 (fully blacked out).
     *
     * @since 6.11.0
     */
    disabledDimming?: number;
    /**
     * The animation used for the viewfinder, if any.
     *
     * @since 6.8.0
     */
    animation?: RectangularViewfinderAnimation;
    pointOfInterest?: UIPoint | null;
}
/**
 * Standard rectangular viewfinder animation made up of an appear animation as well as a looping animation following the appearance.
 *
 * @since 6.8.0
 */
interface RectangularViewfinderAnimation {
    looping?: boolean;
}
/**
 * A horizontal laser line with a Scandit logo underneath. Toggles color depending on the {@link DataCaptureMode.isEnabled|capture mode enabled} property. The laserline is centered on the data capture view’s {@link DataCaptureView.pointOfInterest|point of interest}.
 *
 * To use this viewfinder, create a new instance and assign it to the overlay, e.g. the barcode capture overlay via the {@link BarcodeCaptureOverlay.viewfinder} property.
 *
 * @since 7.4.0
 */
interface LaserlineViewfinder {
    type: 'laserline';
    style?: 'legacy' | 'animated';
    /**
     * The width of the laser line. The laser line is centered on the {@link DataCaptureView.pointOfInterest|point of interest} of the view. When specifying the width with relative units, the width is measured relative to the view’s width minus the horizontal scan area margins.
     *
     * @since 7.4.0
     */
    width?: UIValue;
    /**
     * The color to be used when recognition is enabled/active.
     *
     * @since 7.4.0
     */
    enabledColor?: Color;
    /**
     * The color to be used when recognition is disabled/inactive.
     *
     * @since 7.4.0
     */
    disabledColor?: Color;
    pointOfInterest?: UIPoint | null;
}
interface SpotlightViewfinder {
    type: 'spotlight';
    size?: UIAspectSize;
    enabledBorderColor?: Color;
    disabledBorderColor?: Color;
    pointOfInterest?: UIPoint | null;
}
/**
 * To use this viewfinder, create a new instance and assign it to the overlay, e.g. the barcode capture overlay via the {@link BarcodeCaptureOverlay.viewfinder} property.
 *
 * @since 6.8.0
 */
interface AimerViewfinder {
    type: 'aimer';
    /**
     * The color of the outer frame.
     *
     * @since 6.8.0
     */
    frameColor?: Color;
    /**
     * The color of the central dot. The alpha value is ignored and remains at 70%.
     *
     * @since 6.8.0
     */
    dotColor?: Color;
    pointOfInterest?: UIPoint | null;
}
interface TargetAimerViewfinder {
    type: 'targetAimer';
    lineColor?: Color;
    lineStrokeWidth?: number;
    aimerColor?: Color;
    radius?: UIValue;
}
/**
 * An advanced overlay for {@link DataCaptureView} that enables rich AR-style experiences by allowing custom views to be anchored to captured labels and their individual fields (label location is only supported in some use cases at the moment).This overlay provides sophisticated augmented reality capabilities, allowing you to create dynamic AR elements that react to captured label content. The provided views maintain their relative position to labels and fields as they move in the camera preview, enabling real-time contextual information display.Advanced AR use cases include:**Dynamic warnings** - Display alerts for items near expiration based on captured dates**Contextual information** - Show additional product details or pricing information**Field-specific feedback** - Provide targeted visual feedback for individual label fields**Custom validation indicators** - Create sophisticated validation interfacesThe overlay supports both label-level and field-level view anchoring, providing fine-grained control over AR element positioning and behavior.To display the views, this overlay must be attached to a {@link DataCaptureView}. This can be done by passing this overlay to {@link DataCaptureView.addOverlay}.A user of this class may configure what view is displayed for the given label and the relative position between the two by implementing {@link LabelCaptureAdvancedOverlayListener}.
 *
 * @since 8.0.0
 */
interface LabelCaptureAdvancedOverlay$1 {
    type: 'labelCaptureAdvanced';
    /**
     * Whether to show scan area guides on top of the preview. This property is useful during development to visualize the current scan areas on screen. It is not meant to be used for production. By default this property is *false*.
     *
     * @since 8.0.0
     */
    shouldShowScanAreaGuides?: boolean;
    modeId?: number;
    hasListener?: boolean;
}
/**
 * Specialized overlay that provides a guided scanning experience with validation flow capabilities. This overlay enables multi-step scanning for complete label capture, allowing users to scan label fields progressively across multiple scans and providing a user-friendly data review and correction interface.
 *
 * Key features of the validation flow:
 *
 * - **Multi-step scanning** - Capture several label fields across multiple scans
 * - **Field-by-field validation** - Validate individual fields as they are captured
 * - **User review interface** - Allow users to review and correct captured data
 * - **Configurable hint messages** - Guide users through different scanning stages
 * - **Manual input support** - Enable manual entry for fields that cannot be scanned
 *
 * The validation flow ensures complete and accurate results by aggregating captured fields into a complete label which is reported through the {@link LabelCaptureValidationFlowListener}.
 *
 * This overlay focuses on validation flow and does not provide barcode or field highlighting. For visual feedback during scanning, use {@link LabelCaptureBasicOverlay} alongside this overlay.
 *
 * The validation flow overlay only works with a single label definition. This label definition can contain multiple barcodes, text fields, expiry dates, and other field types.
 *
 * @since 8.0.0
 */
interface LabelCaptureValidationFlowOverlay$1 {
    type: 'validationFlow';
    /**
     * In the past, the window insets for ime were automatically handled by the system, but from android 15 and the edge-to-edge enforcement they need to be handled.
     *
     * Applications should apply insets in a parent of the {@link DataCaptureView} this overlay is attached to, either through android:fitsSystemWindows=”true” in xml, some kind of WindowInsetsListener + padding or a Modifier.imePadding() in compose.
     *
     * The following [guide by the Android team](https://developer.android.com/develop/ui/views/layout/edge-to-edge) explains how to implement edge-to-edge and handle insets in modern android versions.
     *
     * If an application needs to handle insets differently from that and runs into a visual issue where the input fields are behind the keyboard, setting this flag to true will instruct the overlay to manually handle insets internally.
     *
     * Defaults to false on Android. Defaults to true on cross-platform frameworks (React Native, Flutter, Capacitor, Cordova), since their view containers do not handle keyboard insets by default.
     *
     * @since 8.3.0
     */
    shouldHandleKeyboardInsetsInternally?: boolean;
    settings?: LabelCaptureValidationFlowSettings$1 | null;
    modeId?: number;
    hasListener?: boolean;
}
/** @since 8.0.0 */
interface LabelCaptureValidationFlowSettings$1 {
    missingFieldsHint?: string;
    standbyHint?: string;
    validationHint?: string;
    validationError?: string;
    requiredFieldError?: string;
    /**
     * The text shown in the button that allows the user to start the flow by inputting values manually for the label fields.
     *
     * Defaults to “Input Manually”.
     *
     * @since 8.0.0
     */
    manualInputButtonText?: string;
    validationFinishButtonText?: string;
    validationRestartButtonText?: string;
    validationPauseButtonText?: string;
    validationAdaptiveScanningText?: string;
    validationScanningText?: string;
    labelDefinitionsPlaceholders?: unknown;
}
/**
 * Specialized overlay that provides a guided adaptive recognition experience for Label Capture. The overlay coordinates the UI during the adaptive recognition flow and reports results through the {@link LabelCaptureAdaptiveRecognitionListener}.
 *
 * @since 8.2.0
 */
interface LabelCaptureAdaptiveRecognitionOverlay$1 {
    type: 'receiptScanning';
    settings?: LabelCaptureAdaptiveRecognitionSettings$1 | null;
    modeId?: number;
    hasListener?: boolean;
}
/**
 * Settings to customize the adaptive recognition receipt scanning UI. These settings are applied to {@link LabelCaptureAdaptiveRecognitionOverlay} using {@link LabelCaptureAdaptiveRecognitionOverlay.applySettings}.
 *
 * @since 8.2.0
 */
interface LabelCaptureAdaptiveRecognitionSettings$1 {
    processingHint?: string;
    /**
     * Hint text displayed while the overlay is processing captured data.
     *
     * @since 8.2.0
     */
    processingHintText?: string;
    /**
     * Type of the document to search for.
     *
     * @since 8.2.0
     */
    resultType?: 'receipt';
}
interface LabelCaptureListenerDidUpdateSession {
    session: string;
    frameId: string | null;
    modeId: number;
    event: 'LabelCaptureListener.didUpdateSession';
}

/**
 * Configures label capture parameters and defines the structure of labels to be captured. This settings object is central to the Smart Label Capture workflow, specifying which label definitions to use, recognition parameters, and capture behavior.
 *
 * Key configuration aspects:
 *
 * - **Label definitions** - Defines field types (barcodes, dates, text) and their validation rules
 * - **Recognition parameters** - Controls scanning behavior and accuracy
 * - **Location selection** - Specifies scanning areas and constraints
 * - **Symbology settings** - Configures which barcode types are enabled
 *
 * The settings follow a fluent builder pattern for convenient configuration and support multiple label definitions to handle different types of labels in the same scanning session. For the settings to take effect, they must be applied to a {@link LabelCapture|label capture} instance using the appropriate apply settings method. The same holds for settings already applied: changes made to them afterwards take effect only once the settings are applied again.
 *
 * @since 8.0.0
 */
declare class LabelCaptureSettings extends DefaultSerializeable {
    private _definitions;
    private _locationSelection;
    /**
     * Defines the strategy with which to select one out of many visible labels. By default, this property is *null* and label selection is disabled.
     *
     * Currently only {@link RectangularLocationSelection} is supported.
     *
     * @since 8.6.0
     */
    get locationSelection(): LocationSelection$1 | null;
    set locationSelection(newValue: LocationSelection$1 | null);
    private properties;
    static fromJSON(json: {
        [key: string]: any;
    }): LabelCaptureSettings | null;
    private static get barcodeDefaults();
    /**
     * Load the settings from an array of {@link LabelDefinition} with optional hidden properties
     *
     * @since 8.0.0
     */
    static settingsFromLabelDefinitions(definitions: LabelDefinition$1[], properties: {
        [key: string]: string;
    } | null): LabelCaptureSettings;
    private constructor();
    /**
     * Gets {@link SymbologySettings} specific for the given {@link Symbology}.
     *
     * @since 8.0.0
     */
    settingsForSymbology(symbology: Symbology): SymbologySettings$1;
    /**
     * Sets a property to the provided value. Use this method to set properties that are not yet part of a stable API. Properties set through this method may change in a future release.
     *
     * @since 8.0.0
     */
    setProperty(name: string, value: any): void;
    /**
     * Retrieves the value of a previously set property. In case the property does not exist, *null* is returned. Use this method to get properties that are not yet part of a stable API. These properties may change in a future release.
     *
     * @since 8.0.0
     */
    getProperty(name: string): any;
    toJSON(): LabelCaptureSettings$1;
}

/** @internal */
interface LabelCaptureFeedbackControllerHost {
    updateFeedback(feedback: LabelCaptureFeedback): Promise<void>;
}
/**
 * Determines what feedback (vibration, sound) should be emitted when capturing labels. The feedback is specified for each {@link LabelCapture} instance separately and can be changed through the {@link LabelCapture.feedback} property by either modifying an existing instance of this class, or by assigning a new one.
 *
 * As of now, this class only allows to configure the feedback that gets emitted when a label is captured successfully, through the {@link LabelCaptureFeedback.success} property.
 *
 * See documentation on the {@link LabelCapture.feedback} property for usage samples.
 *
 * @since 8.0.0
 */
declare class LabelCaptureFeedback extends DefaultSerializeable {
    /**
     * Returns a label capture feedback with default configuration:
     *
     * - default beep sound is loaded,
     * - beeping for the success event is enabled,
     * - vibration for the success event is enabled.
     *
     * @since 8.0.0
     */
    static get defaultFeedback(): LabelCaptureFeedback;
    private static get labelCaptureDefaults();
    private _success;
    /**
     * A {@link Feedback} for a success event.
     *
     * @since 8.0.0
     */
    get success(): Feedback$1;
    set success(success: Feedback$1);
    private withController;
    /**
     * Constructs a new label capture feedback with default configuration.
     *
     * @since 8.0.0
     */
    constructor();
    private updateFeedback;
}
interface PrivateLabelCaptureFeedback {
    fromJSON(json: LabelCaptureFeedbackJSON): LabelCaptureFeedback;
}
interface LabelCaptureFeedbackJSON {
    success: Feedback$1;
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

interface LabelCaptureControllerHost {
    readonly modeId: number;
    readonly isEnabled: boolean;
}





declare enum LabelCaptureListenerEvents {
    didUpdateSession = "LabelCaptureListener.didUpdateSession"
}
declare class LabelCaptureController extends BaseController<LabelProxy> {
    private host;
    private frameDataController;
    private adapter;
    constructor(host: LabelCaptureControllerHost);
    private get modeId();
    setModeEnabledState(isEnabled: boolean): Promise<void>;
    updateLabelCaptureSettings(settingsJson: string): Promise<void>;
    updateFeedback(feedback: LabelCaptureFeedback): Promise<void>;
    dispose(): void;
    getFrame(frameId: string): Promise<scandit_datacapture_frameworks_core.FrameData>;
    handleDidUpdateSession(data: LabelCaptureListenerDidUpdateSession, notifyListeners: (session: LabelCaptureSession) => Promise<void>): Promise<void>;
}



/**
 * Smart Label Capture enables simultaneous scanning of multiple barcodes and printed text on labels, streamlining data entry and reducing errors. This data capture mode combines barcode recognition with OCR to extract contextually relevant data fields from labels with structured layouts.
 *
 * Smart Label Capture intelligently identifies label information using multiple recognition approaches:
 *
 * - **Content analysis** of texts and barcodes for validation
 * - **Barcode symbology** detection for field identification
 * - **Relative field positioning** within the label layout
 * - **Textual context** to understand field relationships
 *
 * Primary use cases include:
 *
 * - **Retail product scanning** with price verification
 * - **Smart device label scanning** for IMEI and serial numbers
 * - **Shelf price label verification** for retail operations
 * - **Vehicle identification number (VIN) capture** from automotive labels
 *
 * Unlike {@link BarcodeCapture} which focuses on individual barcodes, Smart Label Capture provides contextual intelligence to extract multiple data types simultaneously and supports flexible field definitions for diverse label layouts.
 *
 * The key components of Label Capture are:
 *
 * - **Label Definitions**: Define the structure and expected fields of labels
 * - **Field Definitions**: - Define individual data fields (barcodes, text, dates, etc.)
 * - **Captured Labels**: - Represent successfully scanned labels with all their field data
 *
 * Label Capture can track labels across multiple frames, allowing for progressive scanning where fields are captured over time until the complete label is assembled.
 *
 * It cannot be used together with other capture modes that require the same capabilities, e.g. {@link BarcodeCapture} or {@link BarcodeBatch}.
 *
 * @since 8.0.0
 */
declare class LabelCapture extends ModeBase<LabelCaptureController> implements DataCaptureMode {
    protected type: string;
    private parentId;
    private _isEnabled;
    private settings;
    private _feedback;
    protected get listeners(): LabelCaptureListener[];
    /**
     * Returns the recommended camera settings for use with label capture.
     *
     * @since 8.0.0
     */
    static createRecommendedCameraSettings(): CameraSettings;
    /**
     * Implemented from {@link DataCaptureMode}. See {@link DataCaptureMode.context}.
     *
     * @since 8.0.0
     */
    get context(): DataCaptureContext | null;
    /**
     * Implemented from {@link DataCaptureMode}. See {@link DataCaptureMode.isEnabled}.
     *
     * @since 8.0.0
     */
    get isEnabled(): boolean;
    set isEnabled(isEnabled: boolean);
    protected createController(): LabelCaptureController;
    private get asControllerHost();
    protected onCreated(): void;
    /**
     * Constructs a new LabelCapture instance with the provided settings.
     *
     * @since 7.6.0
     */
    constructor(settings: LabelCaptureSettings);
    /**
     * Asynchronously apply the new settings to label capture. This allows you to modify label definitions, change field configurations, or update recognition parameters at runtime.
     *
     * When not in validation flow, if label capture is currently running, the task will complete when the next frame is processed, and will use the new settings for that frame. If label capture is currently *not* running, the task will complete as soon as the settings have been stored and won’t wait until the next frame is going to be processed.
     *
     * When in validation flow, calls to this method will be ignored.
     *
     * @since 8.0.0
     */
    applySettings(settings: LabelCaptureSettings): Promise<void>;
    /**
     * Adds the listener to this label capture instance to observe the label capture mode and get notified when a label or some of its fields got scanned.
     *
     * In case the same listener is already observing this instance, calling this method will not add the listener again.
     *
     * @since 8.0.0
     */
    addListener(listener: LabelCaptureListener): Promise<void>;
    private notifyListenersOfDidUpdateSession;
    /**
     * Removes a previously added listener from this label capture instance.
     *
     * In case the listener is not currently observing this instance, calling this method has no effect.
     *
     * @since 8.0.0
     */
    removeListener(listener: LabelCaptureListener): Promise<void>;
    /**
     * Instance of {@link LabelCaptureFeedback} that is used to configure the vibration and sound to be used when a label is captured.
     *
     * The default feedback will have both sound and vibration enabled. The default beep sound will be used for the sound feedback.
     *
     * @since 8.0.0
     */
    get feedback(): LabelCaptureFeedback;
    set feedback(feedback: LabelCaptureFeedback);
    toJSON(): LabelCapture$1;
}

/**
 * A view that can be shown for a {@link CapturedLabel} through a {@link LabelCaptureAdvancedOverlay}.
 *
 * @since 8.0.0
 */
interface LabelCaptureAdvancedOverlayView extends DefaultSerializeable {
}









/**
 * The listener interface for configuring advanced overlays in label capture. This interface allows you to provide custom views, anchors, and offsets for captured labels and their individual fields, enabling rich AR-style overlays.
 *
 * @since 8.0.0
 */
interface LabelCaptureAdvancedOverlayListener {
    /**
     * View to be drawn corresponding to the given {@link CapturedLabel}. This method will be called before {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabel} and {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabel}. Called from the main thread. Beware that this view can be overridden with {@link LabelCaptureAdvancedOverlay.setViewForCapturedLabel} method. This method will only be called for new tracked labels that do not have a view yet, e.g. a view set by a call to {@link LabelCaptureAdvancedOverlay.setViewForCapturedLabel}.
     *
     * @since 8.0.0
     */
    viewForCapturedLabel?(overlay: LabelCaptureAdvancedOverlay, label: CapturedLabel): LabelCaptureAdvancedOverlayView | null;
    /**
     * Anchor point that should be used for the view corresponding to the given {@link CapturedLabel}. This method will be called after {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabel} and before {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabel}. Called from the main thread. Beware that this anchor can be overridden with {@link LabelCaptureAdvancedOverlay.setAnchorForCapturedLabel} method. This method will only be called for new tracked labels that do not have an anchor yet, e.g. an anchor set by a call to {@link LabelCaptureAdvancedOverlay.setAnchorForCapturedLabel}.
     *
     * @since 8.0.0
     */
    anchorForCapturedLabel?(overlay: LabelCaptureAdvancedOverlay, label: CapturedLabel): Anchor;
    /**
     * Offset to be set to the view corresponding to the given {@link CapturedLabel}. The offset is relative to the anchor point of the tracked label. This method will be called after {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabel} and {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabel}. Called from the main thread. Beware that this offset can be overridden with {@link LabelCaptureAdvancedOverlay.setOffsetForCapturedLabel} method. This method will only be called for new tracked labels that do not have an offset yet, e.g. an offset set by a call to {@link LabelCaptureAdvancedOverlay.setOffsetForCapturedLabel}.
     *
     * @since 8.0.0
     */
    offsetForCapturedLabel?(overlay: LabelCaptureAdvancedOverlay, label: CapturedLabel): PointWithUnit;
    /**
     * View to be drawn corresponding to the given {@link LabelField}. This method will be called before {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabelField} and {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabelField}. Called from the main thread. Beware that this view can be overridden with `SetViewForCapturedLabelField` method. This method will only be called for new tracked fields that do not have a view yet, e.g. a view set by a call to `SetViewForCapturedLabelField`.
     *
     * @since 8.0.0
     */
    viewForCapturedLabelField?(overlay: LabelCaptureAdvancedOverlay, field: LabelField): LabelCaptureAdvancedOverlayView | null;
    /**
     * Anchor point that should be used for the view corresponding to the given {@link LabelField}. This method will be called after {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabelField} and before {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabelField}. Called from the main thread. Beware that this anchor can be overridden with `SetAnchorForCapturedLabelField` method. This method will only be called for new tracked fields that do not have an anchor yet, e.g. an anchor set by a call to `SetAnchorForCapturedLabelField`.
     *
     * @since 8.0.0
     */
    anchorForCapturedLabelField?(overlay: LabelCaptureAdvancedOverlay, field: LabelField): Anchor;
    /**
     * Offset to be set to the view corresponding to the given {@link LabelField}. The offset is relative to the anchor point of the tracked field. This method will be called after {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabelField} and {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabelField}. Called from the main thread. Beware that this offset can be overridden with `SetOffsetForCapturedLabelField` method. This method will only be called for new tracked fields that do not have an offset yet, e.g. an offset set by a call to `SetOffsetForCapturedLabelField`.
     *
     * @since 8.0.0
     */
    offsetForCapturedLabelField?(overlay: LabelCaptureAdvancedOverlay, field: LabelField): PointWithUnit;
}






/**
 * An advanced overlay for {@link DataCaptureView} that enables rich AR-style experiences by allowing custom views to be anchored to captured labels and their individual fields (label location is only supported in some use cases at the moment).This overlay provides sophisticated augmented reality capabilities, allowing you to create dynamic AR elements that react to captured label content. The provided views maintain their relative position to labels and fields as they move in the camera preview, enabling real-time contextual information display.Advanced AR use cases include:**Dynamic warnings** - Display alerts for items near expiration based on captured dates**Contextual information** - Show additional product details or pricing information**Field-specific feedback** - Provide targeted visual feedback for individual label fields**Custom validation indicators** - Create sophisticated validation interfacesThe overlay supports both label-level and field-level view anchoring, providing fine-grained control over AR element positioning and behavior.To display the views, this overlay must be attached to a {@link DataCaptureView}. This can be done by passing this overlay to {@link DataCaptureView.addOverlay}.A user of this class may configure what view is displayed for the given label and the relative position between the two by implementing {@link LabelCaptureAdvancedOverlayListener}.
 *
 * @since 8.0.0
 */
declare class LabelCaptureAdvancedOverlay extends DefaultSerializeable implements DataCaptureOverlay {
    private type;
    private controller;
    private _view;
    private modeId;
    private get view();
    private set view(value);
    private get asControllerHost();
    private notifyViewForCapturedLabel;
    private notifyAnchorForCapturedLabel;
    private notifyOffsetForCapturedLabel;
    private notifyViewForCapturedLabelField;
    private notifyAnchorForCapturedLabelField;
    private notifyOffsetForCapturedLabelField;
    private onViewIdChanged;
    /**
     * Whether to show scan area guides on top of the preview. This property is useful during development to visualize the current scan areas on screen. It is not meant to be used for production. By default this property is *false*.
     *
     * @since 8.0.0
     */
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    private _listener;
    private hasListener;
    /**
     * The listener which is called whenever a view, an anchor point and an offset must be defined for a tracked {@link CapturedLabel}.
     *
     * @since 8.0.0
     */
    get listener(): LabelCaptureAdvancedOverlayListener | null;
    set listener(listener: LabelCaptureAdvancedOverlayListener | null);
    private _shouldShowScanAreaGuides;
    /**
     * Constructs a new overlay to visualize the process of label capture. For the overlay to be displayed on screen, it must be added to a {@link DataCaptureView}.
     *
     * @since 7.6.0
     */
    constructor(mode: LabelCapture);
    /**
     * The method can be called to change the view drawn for the given tracked label. Setting the view to *null* will unset the view from the tracked label and will effectively remove it from the overlay. This method is thread-safe, it can be called from any thread. The view set via this method will take precedence over the one set via {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabel}: in case a view is set before {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabel} got called, no call to {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabel} will happen.
     *
     * @since 8.0.0
     */
    setViewForCapturedLabel(capturedLabel: CapturedLabel, view: LabelCaptureAdvancedOverlayView | null): Promise<void>;
    /**
     * The method can be called to change the view drawn for the given tracked field of the captured label. Setting the view to *null* will unset the view from the tracked field of the captured label and will effectively remove it from the overlay. This method is thread-safe, it can be called from any thread. The view set via this method will take precedence over the one set via {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabelField}: in case a view is set before {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabelField} got called, no call to {@link LabelCaptureAdvancedOverlayListener.viewForCapturedLabelField} will happen.
     *
     * @since 8.0.0
     */
    setViewForCapturedLabelField(field: LabelField, capturedLabel: CapturedLabel, view: LabelCaptureAdvancedOverlayView | null): Promise<void>;
    /**
     * The method can be called to change the anchor point for the view associated with the given tracked label. This method is thread-safe, it can be called from any thread. The anchor set via this method will take precedence over the one set via {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabel}: in case a view is set before {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabel} got called, no call to {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabel} will happen.
     *
     * @since 8.0.0
     */
    setAnchorForCapturedLabel(capturedLabel: CapturedLabel, anchor: Anchor): Promise<void>;
    /**
     * The method can be called to change the anchor point for the view associated with the given tracked field of the captured label. This method is thread-safe, it can be called from any thread. The anchor set via this method will take precedence over the one set via {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabelField}: in case a view is set before {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabelField} got called, no call to {@link LabelCaptureAdvancedOverlayListener.anchorForCapturedLabelField} will happen.
     *
     * @since 8.0.0
     */
    setAnchorForCapturedLabelField(field: LabelField, capturedLabel: CapturedLabel, anchor: Anchor): Promise<void>;
    /**
     * The method can be called to change the offset for the view associated with the given tracked label. This method is thread-safe, it can be called from any thread. The offset set via this method will take precedence over the one set via {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabel}: in case a view is set before {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabel} got called, no call to {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabel} will happen. If the {@link MeasureUnit} of the offset is {@link MeasureUnit.Fraction}, the offset is calculated relative to view’s dimensions.
     *
     * @since 8.0.0
     */
    setOffsetForCapturedLabel(capturedLabel: CapturedLabel, offset: PointWithUnit): Promise<void>;
    /**
     * The method can be called to change the offset for the view associated with the given tracked field of the captured label. This method is thread-safe, it can be called from any thread. The offset set via this method will take precedence over the one set via {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabelField}: in case a view is set before {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabelField} got called, no call to {@link LabelCaptureAdvancedOverlayListener.offsetForCapturedLabelField} will happen. If the {@link MeasureUnit} of the offset is {@link MeasureUnit.Fraction}, the offset is calculated relative to view’s dimensions.
     *
     * @since 8.0.0
     */
    setOffsetForCapturedLabelField(field: LabelField, capturedLabel: CapturedLabel, offset: PointWithUnit): Promise<void>;
    /**
     * Clears all the views for the currently tracked labels from this overlay. This method is thread-safe, it can be called from any thread.
     *
     * @since 8.0.0
     */
    clearCapturedLabelViews(): Promise<void>;
    toJSON(): LabelCaptureAdvancedOverlay$1;
}

/**
 * An enumeration of possible locations for a text field within a label.
 *
 * @since 8.0.0
 */
declare enum LabelFieldLocationType {
    /** @since 8.0.0 */
    TopLeft = "topLeft",
    /** @since 8.0.0 */
    TopRight = "topRight",
    /** @since 8.0.0 */
    BottomRight = "bottomRight",
    /** @since 8.0.0 */
    BottomLeft = "bottomLeft",
    /** @since 8.0.0 */
    Top = "top",
    /** @since 8.0.0 */
    Right = "right",
    /** @since 8.0.0 */
    Bottom = "bottom",
    /** @since 8.0.0 */
    Left = "left",
    /** @since 8.0.0 */
    Center = "center",
    /** @since 8.0.0 */
    WholeLabel = "wholeLabel"
}

/**
 * A specialized text field for capturing packing dates from labels. This predefined field type is optimized for recognizing date formats commonly found on food packaging, pharmaceutical labels, and manufacturing date stamps.
 *
 * The field can be configured with specific date formats using {@link LabelDateFormat} to ensure proper parsing of various date representations.
 *
 * @since 8.0.0
 */
declare class PackingDateText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    private _labelDateFormat;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    constructor(name: string);
    /**
     * Used to specify keywords or phrases that help identify the context of the field. This is particularly useful when the label contains multiple fields that could match the same regex (e.g., when both packaging and expiry dates are present).
     *
     * @since 8.0.0
     */
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    /**
     * Used to get and set the {@link LabelDateFormat} used to parse dates.
     *
     * @since 8.0.0
     */
    get labelDateFormat(): LabelDateFormat$1 | null;
    set labelDateFormat(value: LabelDateFormat$1 | null);
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * Returns the name associated with this instance.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

/**
 * A specialized barcode field for capturing part numbers. This predefined field type is configured with default settings optimized for common part number barcode formats used in manufacturing, inventory, and logistics.
 *
 * @since 8.0.0
 */
declare class PartNumberBarcode extends BarcodeField {
    private _fieldType;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings$1[]): PartNumberBarcode;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): PartNumberBarcode;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbology(name: string, symbology: Symbology): PartNumberBarcode;
    private static get barcodeDefaults();
    private constructor();
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * The name of this field definition, used to identify it within the label definition.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * The list of barcode symbologies that this field can accept, along with their specific settings.
     *
     * @since 8.0.0
     */
    get symbologies(): SymbologySettings$1[];
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

/**
 * Represents a single line item in a scanned receipt.
 *
 * @since 8.2.0
 */
declare class ReceiptScanningLineItem {
    private _name;
    private _unitPrice;
    private _discount;
    private _quantity;
    private _totalPrice;
    /**
     * Constructs a new ReceiptScanningLineItem with the specified parameters.
     *
     * @since 8.2.0
     */
    constructor(name: string, unitPrice: number | null, discount: number | null, quantity: number, totalPrice: number | null);
    /**
     * The name or description of the item as it appears on the receipt.
     *
     * @since 8.2.0
     */
    get name(): string;
    /**
     * Price for a single unit of the item. Is the same as the totalPrice if only one item is purchased.
     *
     * @since 8.2.0
     */
    get unitPrice(): number | null;
    /**
     * The discount amount applied to this item, if any.
     *
     * @since 8.2.0
     */
    get discount(): number | null;
    /**
     * Quantity for the specific item.
     *
     * @since 8.2.0
     */
    get quantity(): number;
    /**
     * Total Price for a specific product, quantity * unitPrice. Normally on the right of the item.
     *
     * @since 8.2.0
     */
    get totalPrice(): number | null;
}

/**
 * Represents the result of a receipt scanning operation. It provides store information, payment details and a list of purchased items.
 *
 * @since 8.2.0
 */
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
    /**
     * Constructs a new ReceiptScanningResult with the specified parameters.
     *
     * @since 8.2.0
     */
    constructor(date: string | null, lineItems: ReceiptScanningLineItem[], loyaltyNumber: number | null, paymentPreTaxTotal: number | null, paymentTax: number | null, paymentTotal: number | null, storeAddress: string | null, storeCity: string | null, storeName: string | null, time: string | null);
    /**
     * The type of the adaptive recognition result (Receipt).
     *
     * @since 8.2.0
     */
    get resultType(): AdaptiveRecognitionResultType;
    /**
     * The date of the transaction as it appears on the receipt.
     *
     * @since 8.2.0
     */
    get date(): string | null;
    /**
     * A list of all line items (purchased products) identified in the receipt.
     *
     * @since 8.2.0
     */
    get lineItems(): ReceiptScanningLineItem[];
    /**
     * The loyalty program number or identifier associated with the transaction, if present.
     *
     * @since 8.2.0
     */
    get loyaltyNumber(): number | null;
    /**
     * Total balance before taxes are applied.
     *
     * @since 8.2.0
     */
    get paymentPreTaxTotal(): number | null;
    /**
     * The total tax amount charged on the transaction.
     *
     * @since 8.2.0
     */
    get paymentTax(): number | null;
    /**
     * The total amount paid, including all items, taxes, and fees.
     *
     * @since 8.2.0
     */
    get paymentTotal(): number | null;
    /**
     * Full address of the store (Street Number, Street, City, State, NPA).
     *
     * @since 8.2.0
     */
    get storeAddress(): string | null;
    /**
     * The city where the store is located.
     *
     * @since 8.2.0
     */
    get storeCity(): string | null;
    /**
     * The name of the store or merchant as it appears on the receipt.
     *
     * @since 8.2.0
     */
    get storeName(): string | null;
    /**
     * The time of the transaction as it appears on the receipt.
     *
     * @since 8.2.0
     */
    get time(): string | null;
}

/**
 * A specialized barcode field for capturing serial numbers. This predefined field type is configured with default settings optimized for common serial number barcode formats.
 *
 * @since 8.0.0
 */
declare class SerialNumberBarcode extends BarcodeField {
    private _fieldType;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologySettings(name: string, symbologySettings: SymbologySettings$1[]): SerialNumberBarcode;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbologies(name: string, symbologies: Symbology[]): SerialNumberBarcode;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    static initWithNameAndSymbology(name: string, symbology: Symbology): SerialNumberBarcode;
    private static get barcodeDefaults();
    private constructor();
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * The name of this field definition, used to identify it within the label definition.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * The list of barcode symbologies that this field can accept, along with their specific settings.
     *
     * @since 8.0.0
     */
    get symbologies(): SymbologySettings$1[];
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

/**
 * A specialized text field for capturing total price information from labels. This predefined field type is optimized for recognizing price values typically found on retail product labels, receipts, and price tags.
 *
 * @since 8.0.0
 */
declare class TotalPriceText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    /**
     * Builds a new instance of this class with the provided name.
     *
     * @since 8.0.0
     */
    constructor(name: string);
    /**
     * Used to specify keywords or phrases that help identify the context of the field. This is particularly useful when the label contains multiple fields that could match the same regex (e.g., when both packaging and expiry dates are present).
     *
     * @since 8.0.0
     */
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * Returns the name associated with this instance.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

/**
 * A specialized text field for capturing unit price information from labels. This predefined field type is optimized for recognizing individual item prices on retail labels.
 *
 * @since 8.0.0
 */
declare class UnitPriceText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    /** @since 8.0.0 */
    constructor(name: string);
    /**
     * Used to specify keywords or phrases that help identify the context of the field. This is particularly useful when the label contains multiple fields that could match the same regex (e.g., when both packaging and expiry dates are present).
     *
     * @since 8.0.0
     */
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * The name of this field definition.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}

/**
 * A specialized text field for capturing weight information from labels. This predefined field type is optimized for recognizing weight values typically found on product packaging, shipping labels, and inventory tags.
 *
 * @since 8.0.0
 */
declare class WeightText extends TextField {
    private _fieldType;
    private _anchorRegexes;
    /** @since 8.0.0 */
    constructor(name: string);
    /**
     * Used to specify keywords or phrases that help identify the context of the field. This is particularly useful when the label contains multiple fields that could match the same regex (e.g., when both packaging and expiry dates are present).
     *
     * @since 8.0.0
     */
    get anchorRegexes(): string[];
    set anchorRegexes(value: string[]);
    /**
     * Whether the field is optional or mandatory. This is helpful when certain fields may not be present on every scan.
     *
     * @since 8.0.0
     */
    get isOptional(): boolean;
    /**
     * The name of this field definition, used to identify it within the label definition.
     *
     * @since 8.0.0
     */
    get name(): string;
    /**
     * The regexes that identify the target string in the scanned content.
     *
     * @since 8.0.0
     */
    get valueRegexes(): string[];
    set valueRegexes(value: string[]);
    /**
     * The minimum number of instances of this field that must be captured for the label to be considered complete. This is useful for fields that may appear multiple times on a label, such as multiple serial numbers or repeated information.
     *
     * @since 8.3.0
     */
    get numberOfMandatoryInstances(): number | null;
    set numberOfMandatoryInstances(value: number | null);
}



/**
 * {@link LabelCaptureBasicOverlayListener} can be implemented to customize the visual appearance of highlighted labels and their fields in the basic overlay. When label capture identifies a new field, or when the {@link LabelField.state} property changes, brushForFieldOfLabel() is called to determine the {@link Brush} of the field.
 *
 * @since 8.0.0
 */
interface LabelCaptureBasicOverlayListener {
    /**
     * Called to determine the visual style for a specific field when its state changes. This method allows you to provide custom styling based on field content, validation status, or other contextual information.
     *
     * The method is called when a field is first detected, when its state changes (e.g., from predicted to captured), or when field data is updated. Return *null* to use the default brush for the field’s current state. The returned brush can be overridden by explicit calls to LabelCaptureBasicOverlay.setBrushForFieldOfLabel().
     *
     * @since 8.0.0
     */
    brushForFieldOfLabel?(overlay: LabelCaptureBasicOverlay, field: LabelField, label: CapturedLabel): Brush$1 | null;
    /**
     * Called to determine the visual style for a label when any of its fields change state or data. This method allows you to provide custom styling for entire labels based on their completion status, validation results, or other contextual information.
     *
     * The method is called when any field within the label changes state or when field data is updated. Return *null* to use the default label brush. The returned brush can be overridden by explicit calls to {@link LabelCaptureBasicOverlay.setBrushForLabel}.
     *
     * @since 8.0.0
     */
    brushForLabel?(overlay: LabelCaptureBasicOverlay, label: CapturedLabel): Brush$1 | null;
    /**
     * Called when a user taps on a captured label in the overlay. This method allows you to handle user interactions with labels, such as showing detailed information, triggering validation flows, or providing additional options.
     *
     * This method is called from the main thread, making it safe to perform UI operations directly.
     *
     * @since 8.0.0
     */
    didTapLabel?(overlay: LabelCaptureBasicOverlay, label: CapturedLabel): void;
}
/**
 * Overlay for label capture that provides visual feedback and customization capabilities for the scanning process. This overlay displays captured labels and their fields on top of the camera preview, offering extensive customization options through listener interfaces.
 *
 * Key visualization features:
 *
 * - **Label highlighting** - Configurable visual feedback for detected labels
 * - **Field state indication** - Different visual styles for predicted vs. captured fields
 * - **Custom brush configuration** - Fully customizable appearance for labels and fields
 * - **Listener-based customization** - Programmatic control over field appearances
 *
 * The overlay distinguishes between different field states:
 *
 * - **Predicted fields** - Fields that have been detected but not yet captured
 * - **Captured fields** - Fields that have been successfully scanned and validated
 *
 * Advanced customization is available through {@link LabelCaptureBasicOverlayListener}, allowing dynamic styling based on field content, validation status, or other contextual information.,
 *
 * Fields are highlighted using a default brush ({@link LabelCaptureBasicOverlay.capturedFieldBrush}, {@link LabelCaptureBasicOverlay.predictedFieldBrush}), a brush set through a user-defined {@link LabelCaptureBasicOverlayListener} or calls to setBrushForFieldOfLabel().
 *
 * @since 8.0.0
 */
declare class LabelCaptureBasicOverlay extends DefaultSerializeable implements DataCaptureOverlay {
    /**
     * The default brush applied to predicted fields. This is the brush used if {@link LabelCaptureBasicOverlayListener} is not set.
     *
     * @since 8.0.0
     */
    static get defaultPredictedFieldBrush(): Brush$1;
    /**
     * The default brush applied to captured fields. This is the brush used if {@link LabelCaptureBasicOverlayListener} is not set.
     *
     * @since 8.0.0
     */
    static get defaultCapturedFieldBrush(): Brush$1;
    /**
     * The default brush used for drawing labels. This brush is used when no {@link LabelCaptureBasicOverlay.listener} is set, or the {@link LabelCaptureBasicOverlayListener.brushForLabel} returns a *null* brush.
     *
     * @since 8.0.0
     */
    static get defaultLabelBrush(): Brush$1;
    private static get labelCaptureDefaults();
    private type;
    private controller;
    private _view;
    private modeId;
    private get view();
    private set view(value);
    private get asControllerHost();
    private notifyBrushForFieldOfLabel;
    private notifyBrushForLabel;
    private notifyDidTapLabel;
    private onViewIdChanged;
    private _predictedFieldBrush;
    /**
     * The brush applied to predicted fields if no {@link LabelCaptureBasicOverlayListener} is set.
     *
     * @since 8.0.0
     */
    get predictedFieldBrush(): Brush$1 | null;
    set predictedFieldBrush(newBrush: Brush$1 | null);
    private _capturedFieldBrush;
    /** @since 8.0.0 */
    get capturedFieldBrush(): Brush$1 | null;
    set capturedFieldBrush(newBrush: Brush$1 | null);
    private _labelBrush;
    /** @since 8.0.0 */
    get labelBrush(): Brush$1 | null;
    set labelBrush(newBrush: Brush$1 | null);
    private _shouldShowScanAreaGuides;
    private hasListener;
    private _listener;
    /** @since 8.0.0 */
    get listener(): LabelCaptureBasicOverlayListener | null;
    set listener(listener: LabelCaptureBasicOverlayListener | null);
    /**
     * Controls whether scan area guides are displayed over the camera preview. These guides help visualize the active scanning regions during development and debugging.
     *
     * This feature is intended for development purposes only and should not be enabled in production applications. By default this property is *false*.
     *
     * @since 8.0.0
     */
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    private _viewfinder;
    /**
     * The viewfinder used to guide users during the scanning process. The viewfinder provides visual cues about the optimal scanning area and helps users position labels correctly.
     *
     * By default, no viewfinder is displayed. Set this to an instance of {@link Viewfinder} (such as {@link RectangularViewfinder}) to provide scanning guidance to users.
     *
     * @since 8.0.0
     */
    get viewfinder(): Viewfinder$1 | null;
    set viewfinder(newViewfinder: Viewfinder$1 | null);
    /**
     * Constructs a new overlay to visualize the process of label capture. The overlay needs to be added through a call to {@link DataCaptureView.addOverlay}.
     *
     * @since 7.6.0
     */
    constructor(labelCapture: LabelCapture);
    /**
     * Sets a custom brush to visually highlight a specific field within a captured label. This allows for dynamic styling based on field content, validation status, or other contextual information.
     *
     * Use this method to provide visual feedback for specific fields, such as highlighting errors, successful captures, or fields requiring attention.
     *
     * This method is thread-safe; it can be called from any thread. When {@link LabelCaptureBasicOverlay.listener} is set to a non-*null* instance, the listener continues to be asked for the brush to use for this field whenever the state changes, thereby replacing any brushes set by calling setBrushForFieldOfLabel().
     *
     * @since 8.0.0
     */
    setBrushForFieldOfLabel(brush: Brush$1, field: LabelField, label: CapturedLabel): Promise<void>;
    /**
     * Sets a custom brush to visually highlight a specific captured label. This allows for dynamic styling of entire labels based on their completion status, validation results, or other contextual information.
     *
     * Use this method to provide visual feedback for labels, such as highlighting complete vs. incomplete labels, or marking labels that require validation. This method is thread-safe; it can be called from any thread.
     *
     * When {@link LabelCaptureBasicOverlay.listener} is set to a non-*null* instance, the listener continues to be asked for the brush to use for this label whenever the state of one its fields changes, thereby replacing any brushes set by calling {@link LabelCaptureBasicOverlay.setBrushForLabel}.
     *
     * @since 8.0.0
     */
    setBrushForLabel(brush: Brush$1, label: CapturedLabel): Promise<void>;
    toJSON(): LabelCaptureBasicOverlay$1;
}








interface LabelCaptureAdvancedOverlayControllerHost {
    readonly view: {
        viewId: number;
    } | null;
    readonly hasListener: boolean;
    notifyViewForCapturedLabel(label: CapturedLabel, defaultView: LabelCaptureAdvancedOverlayView | null): LabelCaptureAdvancedOverlayView | null;
    notifyAnchorForCapturedLabel(label: CapturedLabel, defaultAnchor: Anchor): Anchor;
    notifyOffsetForCapturedLabel(label: CapturedLabel, defaultOffset: PointWithUnit): PointWithUnit;
    notifyViewForCapturedLabelField(field: LabelField, defaultView: LabelCaptureAdvancedOverlayView | null): LabelCaptureAdvancedOverlayView | null;
    notifyAnchorForCapturedLabelField(field: LabelField, defaultAnchor: Anchor): Anchor;
    notifyOffsetForCapturedLabelField(field: LabelField, defaultOffset: PointWithUnit): PointWithUnit;
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
    constructor(overlay: LabelCaptureAdvancedOverlayControllerHost);
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





interface LabelCaptureBasicOverlayControllerHost {
    readonly view: {
        viewId: number;
    } | null;
    readonly hasListener: boolean;
    notifyBrushForFieldOfLabel(field: LabelField, label: CapturedLabel): Brush$1 | null;
    notifyBrushForLabel(label: CapturedLabel): Brush$1 | null;
    notifyDidTapLabel(label: CapturedLabel): void;
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
    constructor(overlay: LabelCaptureBasicOverlayControllerHost);
    setBrushForFieldOfLabel(brush: Brush$1 | null, field: LabelField, label: CapturedLabel): Promise<void>;
    setBrushForLabel(brush: Brush$1 | null, label: CapturedLabel): Promise<void>;
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

/** @since 8.0.0 */
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
    /**
     * Creates a Label Capture Validation Flow Settings object with default values.
     *
     * @since 8.0.0
     */
    static create(): LabelCaptureValidationFlowSettings;
    /**
     * Creates a Label Capture Validation Flow Settings object with default values.
     *
     * @since 8.3.0
     */
    constructor();
    /**
     * The text in the hint that is shown to the user when an attempt is made to validate a label while there are still empty fields where {@link LabelField.isRequired} is *true*.
     *
     * Defaults to “Please fill in missing fields”.
     *
     * @since 8.0.0
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    get missingFieldsHintText(): string;
    /**
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    set missingFieldsHintText(text: string);
    /**
     * The text in the hint that is shown to the user when more than 10 seconds have passed during a scanning phase with no scan made, and the flow is paused until further user interaction.
     *
     * Defaults to “Scanning paused to conserve battery”.
     *
     * @since 8.0.0
     */
    get standbyHintText(): string;
    set standbyHintText(text: string);
    /**
     * The text in the hint that is shown to the user when a scanning phase has finished. It informs them of how many fields have been successfully scanned so far
     *
     * Defaults to “X/Y label fields captured”, where X and Y are the number of captured and expected fields respectively.
     *
     * @since 8.0.0
     */
    get validationHintText(): string;
    set validationHintText(text: string);
    /**
     * The text shown below a field that holds an invalid value. This may happen due to either a bad scan or an incorrect manual input.
     *
     * Defaults to “Invalid input”.
     *
     * @since 8.0.0
     */
    get validationErrorText(): string;
    set validationErrorText(text: string);
    /**
     * The text shown below an empty, required field when an attempt to finalize the validation flow has been made.
     *
     * Defaults to “This field is required”.
     *
     * @since 8.0.0
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    get requiredFieldErrorText(): string;
    /**
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    set requiredFieldErrorText(text: string);
    /**
     * The text shown in the button that allows the user to start the flow by inputting values manually for the label fields.
     *
     * Defaults to “Input Manually”.
     *
     * @since 8.0.0
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    get manualInputButtonText(): string;
    /**
     * @deprecated This property is deprecated and will be removed in a future release.
     */
    set manualInputButtonText(text: string);
    /**
     * The text shown in the finish button that allows the user to complete the validation flow when all required fields are filled.
     *
     * Defaults to “Finish”.
     *
     * @since 8.3.0
     */
    get finishButtonText(): string;
    set finishButtonText(text: string);
    /**
     * The text shown in the restart button that allows the user to clear all fields and restart the validation flow.
     *
     * Defaults to “Clear All”.
     *
     * @since 8.3.0
     */
    get restartButtonText(): string;
    set restartButtonText(text: string);
    /**
     * The text shown in the pause button that allows the user to pause the scanning process during the validation flow.
     *
     * Defaults to “Pause”.
     *
     * @since 8.3.0
     */
    get pauseButtonText(): string;
    set pauseButtonText(text: string);
    /**
     * The text shown as a placeholder in text fields when adaptive scanning is active.
     *
     * Defaults to “Processing, tap to type manually”.
     *
     * @since 8.3.0
     */
    get adaptiveScanningText(): string;
    set adaptiveScanningText(text: string);
    /**
     * The text shown as a placeholder in text fields during the active scanning phase.
     *
     * Defaults to “Scanning”.
     *
     * @since 8.3.0
     */
    get scanningText(): string;
    set scanningText(text: string);
    /**
     * Sets the placeholder text for a specific label definition field.
     *
     * @since 8.2.0
     */
    setPlaceholderTextForLabelDefinition(fieldName: string, placeholder: string | null): void;
    /**
     * Gets the placeholder text for a specific label definition field.
     *
     * @since 8.2.0
     */
    getPlaceholderTextForLabelDefinition(fieldName: string): string | null;
    toJSON(): object;
}

/**
 * An enumeration representing the type of label result update in the validation flow.
 *
 * This type distinguishes between different stages of label field updates:
 *
 * - Synchronous updates from immediate processing
 * - Asynchronous updates when processing starts
 * - Asynchronous updates when processing completes
 *
 * @since 8.3.0
 */
declare enum LabelResultUpdateType {
    /**
     * Indicates that asynchronous processing has completed and results are available. The corresponding LabelCaptureValidationFlowListener.didUpdateValidationFlowResult() callback will include the same asyncId as the {@link LabelResultUpdateType.AsyncStarted} event but with frameData as *null*.
     *
     * @since 8.3.0
     */
    AsyncFinished = "AsyncFinished",
    /**
     * Indicates that asynchronous processing has started for a frame. The corresponding LabelCaptureValidationFlowListener.didUpdateValidationFlowResult() callback will include frame data and a unique asyncId to correlate with the {@link LabelResultUpdateType.AsyncFinished} event.
     *
     * @since 8.3.0
     */
    AsyncStarted = "AsyncStarted",
    /**
     * Indicates a synchronous update from immediate processing.
     *
     * @since 8.3.0
     */
    Sync = "Sync"
}

/**
 * Interface to be implemented by listeners that want to observe a {@link LabelCaptureValidationFlowOverlay} and get informed when a new label have been completely captured and validated by the end user.
 *
 * @since 8.0.0
 */
interface LabelCaptureValidationFlowListener {
    /**
     * Invoked when the validation flow has finished and the end user has validated a label capture. The method receives a list of all the captured fields and their values. Before this method is called, the LabelCapture mode will be automatically disabled and the camera will be paused. To continue scanning, the mode should be enabled again and the camera should be turned on.
     *
     * @since 8.0.0
     */
    didCaptureLabelWithFields(fields: LabelField[]): void;
    /**
     * Invoked when the user manually submits a value for a field through the validation flow UI. This callback is triggered after the user submits a field value using the keyboard, regardless of whether the input passes validation. This allows you to track which fields require manual intervention and log user corrections for analytics.
     *
     * @since 8.2.0
     */
    didSubmitManualInputForField(field: LabelField, oldValue: string | null, newValue: string): void;
    /**
     * Invoked when the validation flow results are updated. This callback provides information about label field updates.
     *
     * For synchronous scanning, this method is invoked once with type = {@link LabelResultUpdateType.Sync} and asyncId = -1.
     *
     * For asynchronous scanning, this method is invoked twice:
     *
     * - First invocation: type = {@link LabelResultUpdateType.AsyncStarted} with frameData available and asyncId set to the unique identifier of the asynchronous operation
     * - Second invocation: type = {@link LabelResultUpdateType.AsyncFinished} with frameData as *null* and asyncId matching the identifier from the first invocation
     *
     * The asyncId parameter allows you to correlate the start and finish events of the same asynchronous operation.
     *
     * @since 8.3.0
     */
    didUpdateValidationFlowResult(type: LabelResultUpdateType, asyncId: number, fields: LabelField[], getFrameData: () => Promise<FrameData | null>): Promise<void>;
}




/**
 * Specialized overlay that provides a guided scanning experience with validation flow capabilities. This overlay enables multi-step scanning for complete label capture, allowing users to scan label fields progressively across multiple scans and providing a user-friendly data review and correction interface.
 *
 * Key features of the validation flow:
 *
 * - **Multi-step scanning** - Capture several label fields across multiple scans
 * - **Field-by-field validation** - Validate individual fields as they are captured
 * - **User review interface** - Allow users to review and correct captured data
 * - **Configurable hint messages** - Guide users through different scanning stages
 * - **Manual input support** - Enable manual entry for fields that cannot be scanned
 *
 * The validation flow ensures complete and accurate results by aggregating captured fields into a complete label which is reported through the {@link LabelCaptureValidationFlowListener}.
 *
 * This overlay focuses on validation flow and does not provide barcode or field highlighting. For visual feedback during scanning, use {@link LabelCaptureBasicOverlay} alongside this overlay.
 *
 * The validation flow overlay only works with a single label definition. This label definition can contain multiple barcodes, text fields, expiry dates, and other field types.
 *
 * @since 8.0.0
 */
declare class LabelCaptureValidationFlowOverlay extends DefaultSerializeable implements DataCaptureOverlay {
    private type;
    private settings;
    private hasListener;
    private _listener;
    private controller;
    private _view;
    private modeId;
    private _shouldHandleKeyboardInsetsInternally;
    /**
     * In the past, the window insets for ime were automatically handled by the system, but from android 15 and the edge-to-edge enforcement they need to be handled.
     *
     * Applications should apply insets in a parent of the {@link DataCaptureView} this overlay is attached to, either through android:fitsSystemWindows=”true” in xml, some kind of WindowInsetsListener + padding or a Modifier.imePadding() in compose.
     *
     * The following [guide by the Android team](https://developer.android.com/develop/ui/views/layout/edge-to-edge) explains how to implement edge-to-edge and handle insets in modern android versions.
     *
     * If an application needs to handle insets differently from that and runs into a visual issue where the input fields are behind the keyboard, setting this flag to true will instruct the overlay to manually handle insets internally.
     *
     * Defaults to false on Android. Defaults to true on cross-platform frameworks (React Native, Flutter, Capacitor, Cordova), since their view containers do not handle keyboard insets by default.
     *
     * @since 8.3.0
     */
    get shouldHandleKeyboardInsetsInternally(): boolean;
    set shouldHandleKeyboardInsetsInternally(value: boolean);
    private get view();
    private set view(value);
    private get asControllerHost();
    private onViewIdChanged;
    /**
     * Constructs a new LabelCaptureValidationFlowOverlay. For the overlay to be displayed on screen, it must be added to a {@link DataCaptureView}.
     *
     * @since 8.0.0
     */
    constructor(mode: LabelCapture);
    /**
     * Sets the listener to this overlay instance to observe the label capture mode and get notified when a label has been validated and accepted by the end user.
     *
     * @since 8.0.0
     */
    get listener(): LabelCaptureValidationFlowListener | null;
    set listener(listener: LabelCaptureValidationFlowListener | null);
    /**
     * Applies the new settings to the validation flow overlay.
     *
     * @since 8.0.0
     */
    applySettings(settings: LabelCaptureValidationFlowSettings): Promise<void>;
    toJSON(): LabelCaptureValidationFlowOverlay$1;
}




interface LabelCaptureValidationFlowOverlayControllerHost {
    readonly view: {
        viewId: number;
    } | null;
    readonly listener: LabelCaptureValidationFlowListener | null;
    toJSON(): LabelCaptureValidationFlowOverlay$1;
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
    constructor(overlay: LabelCaptureValidationFlowOverlayControllerHost);
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

/**
 * Interface to receive callbacks from {@link LabelCaptureAdaptiveRecognitionOverlay} during adaptive recognition.
 *
 * @since 8.2.0
 */
interface LabelCaptureAdaptiveRecognitionListener {
    /**
     * Invoked when a document has been successfully recognized. The result contains the recognized data based on the result type.
     *
     * @since 8.2.0
     */
    didRecognize(result: AdaptiveRecognitionResult): void;
    /**
     * Invoked when a connection error occurs while trying to recognize a document.
     *
     * @since 8.2.0
     */
    didFail(): void;
}

/**
 * Settings to customize the adaptive recognition receipt scanning UI. These settings are applied to {@link LabelCaptureAdaptiveRecognitionOverlay} using {@link LabelCaptureAdaptiveRecognitionOverlay.applySettings}.
 *
 * @since 8.2.0
 */
declare class LabelCaptureAdaptiveRecognitionSettings extends DefaultSerializeable {
    private _processingHintText?;
    private _resultType;
    /**
     * Creates a new instance with the specified result type.
     *
     * Param resultTypeThe type of document to search for.
     *
     * @since 8.2.0
     */
    constructor(resultType: AdaptiveRecognitionResultType);
    /**
     * Hint text displayed while the overlay is processing captured data.
     *
     * @since 8.2.0
     */
    get processingHintText(): string;
    set processingHintText(text: string);
    /**
     * Type of the document to search for.
     *
     * @since 8.2.0
     */
    get resultType(): AdaptiveRecognitionResultType;
    set resultType(resultType: AdaptiveRecognitionResultType);
}



/**
 * Specialized overlay that provides a guided adaptive recognition experience for Label Capture. The overlay coordinates the UI during the adaptive recognition flow and reports results through the {@link LabelCaptureAdaptiveRecognitionListener}.
 *
 * @since 8.2.0
 */
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
    private get asControllerHost();
    private onViewIdChanged;
    /**
     * Sets the listener to observe adaptive recognition events from this overlay.
     *
     * @since 8.2.0
     */
    get listener(): LabelCaptureAdaptiveRecognitionListener | null;
    set listener(listener: LabelCaptureAdaptiveRecognitionListener | null);
    /**
     * Constructs a new overlay for the specified LabelCapture mode.
     *
     * @since 8.2.0
     */
    constructor(mode: LabelCapture);
    /**
     * Applies settings that customize the adaptive recognition UI and behavior. Use this to configure properties such as the processing hint text displayed while the overlay processes captured data.
     *
     * @since 8.2.0
     */
    applySettings(settings: LabelCaptureAdaptiveRecognitionSettings): Promise<void>;
}




interface LabelCaptureAdaptiveRecognitionOverlayControllerHost {
    readonly listener: LabelCaptureAdaptiveRecognitionListener | null;
    readonly view: {
        viewId: number;
    } | null;
    toJSON(): LabelCaptureAdaptiveRecognitionOverlay$1;
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
    private readonly warnedDropReasons;
    private registeredViewId;
    private get dataCaptureViewId();
    constructor(overlay: LabelCaptureAdaptiveRecognitionOverlayControllerHost);
    subscribeListener(): Promise<void>;
    private registerListenerForCurrentView;
    onViewChanged(): Promise<void>;
    unsubscribeListener(): Promise<void>;
    applySettings(): Promise<void>;
    dispose(): void;
    private initialize;
    private handleRecognized;
    private logDroppedOnce;
    private handleFailure;
    private handleRecognizedWrapper;
    private handleFailureWrapper;
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

export { AdaptiveRecognitionMode, AdaptiveRecognitionResult, AdaptiveRecognitionResultType, BarcodeField, CustomBarcode, CustomText, DateText, ExpiryDateText, ImeiOneBarcode, ImeiTwoBarcode, LABEL_PROXY_TYPE_NAMES, LabelCaptureAdaptiveRecognitionListenerEvents, LabelCaptureAdaptiveRecognitionOverlay, LabelCaptureAdaptiveRecognitionOverlayController, LabelCaptureAdaptiveRecognitionSettings, LabelCaptureAdvancedOverlayController, LabelCaptureAdvancedOverlayListenerEvents, LabelCaptureBasicOverlay, LabelCaptureBasicOverlayController, LabelCaptureBasicOverlayListenerEvents, LabelCaptureController, LabelCaptureListenerEvents, LabelCaptureSettings, LabelCaptureValidationFlowListenerEvents, LabelCaptureValidationFlowOverlay, LabelCaptureValidationFlowOverlayController, LabelCaptureValidationFlowSettings, LabelDateComponentFormat, LabelDateFormat$1 as LabelDateFormat, LabelDateResult, LabelDefinition$1 as LabelDefinition, LabelFieldDefinition$1 as LabelFieldDefinition, LabelFieldLocation$1 as LabelFieldLocation, LabelFieldLocationType, LabelResultUpdateType, PackingDateText, PartNumberBarcode, ReceiptScanningLineItem, ReceiptScanningResult, SerialNumberBarcode, TextField, TotalPriceText, UnitPriceText, WeightText, buildStaticLabelDefaultsJson, ensureLabelCaptureDefaults, getLabelCaptureDefaults, loadLabelCaptureDefaults, registerLabelProxies, setLabelCaptureDefaultsLoader };
export type { LabelCaptureAdaptiveRecognitionListener, LabelCaptureAdvancedOverlayListener, LabelCaptureBasicOverlayListener, LabelCaptureDefaults, LabelCaptureFeedbackControllerHost, LabelCaptureFeedbackJSON, LabelCaptureListener, LabelCaptureValidationFlowListener, LabelNativeCallerProvider, LabelProxyType, PrivateLabelCapture, PrivateLabelCaptureFeedback, PrivateLabelCaptureValidationFlowOverlay };
export { CapturedLabel, LabelCapture, LabelCaptureAdvancedOverlay, LabelCaptureFeedback, LabelCaptureSession, LabelField, LabelFieldState, LabelFieldType, LabelFieldValueType };
