export { AdaptiveRecognitionMode, AdaptiveRecognitionResult, AdaptiveRecognitionResultType, BarcodeField, CapturedLabel, CustomBarcode, CustomText, DateText, ExpiryDateText, ImeiOneBarcode, ImeiTwoBarcode, LabelCapture, LabelCaptureAdaptiveRecognitionListener, LabelCaptureAdaptiveRecognitionOverlay, LabelCaptureAdaptiveRecognitionSettings, LabelCaptureAdvancedOverlay, LabelCaptureAdvancedOverlayListener, LabelCaptureBasicOverlay, LabelCaptureBasicOverlayListener, LabelCaptureFeedback, LabelCaptureListener, LabelCaptureSession, LabelCaptureSettings, LabelCaptureValidationFlowListener, LabelCaptureValidationFlowOverlay, LabelCaptureValidationFlowSettings, LabelDateComponentFormat, LabelDateFormat, LabelDateResult, LabelDefinition, LabelField, LabelFieldDefinition, LabelFieldLocation, LabelFieldLocationType, LabelFieldState, LabelFieldType, LabelFieldValueType, LabelResultUpdateType, PackingDateText, PartNumberBarcode, ReceiptScanningLineItem, ReceiptScanningResult, SerialNumberBarcode, TextField, TotalPriceText, UnitPriceText, WeightText } from './label';
import { DefaultSerializeable, Size } from 'scandit-capacitor-datacapture-core/dist/dts/core';

/**
 * Options for creating a {@link LabelCaptureAdvancedOverlayView}.
 *
 * @since 8.0.0
 */
interface LabelCaptureAdvancedOverlayViewOptions {
    /**
     * The size of the overlay view.
     *
     * @since 8.0.0
     */
    size?: Size;
    /**
     * The scale factor for the overlay view.
     *
     * @since 8.0.0
     */
    scale?: number;
}
/**
 * A view that can be shown for a {@link CapturedLabel} through a {@link LabelCaptureAdvancedOverlay}.
 *
 * @since 8.0.0
 */
declare class LabelCaptureAdvancedOverlayView extends DefaultSerializeable {
    private data;
    private options;
    /**
     * Creates a view based on an HTML element.
     *
     * @since 8.0.0
     */
    static withHTMLElement(element: HTMLElement, options: LabelCaptureAdvancedOverlayViewOptions | null): Promise<LabelCaptureAdvancedOverlayView>;
    /**
     * Creates a view based on base64 encoded data. The image data should be image/png.
     *
     * @since 8.0.0
     */
    static withBase64EncodedData(data: string, options: LabelCaptureAdvancedOverlayViewOptions | null): Promise<LabelCaptureAdvancedOverlayView>;
    private static getEncodedImageData;
    private static getSize;
    private static getSVGDataForElement;
    private static getCanvasWithSize;
    private static getBase64DataForSVG;
    private constructor();
}

interface ScanditLabelPluginInterface {
    initialize(coreDefaults: any): Promise<any>;
}



declare class ScanditLabelPluginImplementation implements ScanditLabelPluginInterface {
    initialize(coreDefaults: any): Promise<any>;
}
declare const ScanditLabelPlugin: ScanditLabelPluginImplementation;

export { LabelCaptureAdvancedOverlayView, ScanditLabelPlugin, ScanditLabelPluginImplementation };
export type { ScanditLabelPluginInterface };
