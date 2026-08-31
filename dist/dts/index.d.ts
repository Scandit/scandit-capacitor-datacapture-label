export { AdaptiveRecognitionMode, AdaptiveRecognitionResult, AdaptiveRecognitionResultType, BarcodeField, CapturedLabel, CustomBarcode, CustomText, DateText, ExpiryDateText, ImeiOneBarcode, ImeiTwoBarcode, LabelCapture, LabelCaptureAdaptiveRecognitionListener, LabelCaptureAdaptiveRecognitionOverlay, LabelCaptureAdaptiveRecognitionSettings, LabelCaptureAdvancedOverlay, LabelCaptureAdvancedOverlayListener, LabelCaptureBasicOverlay, LabelCaptureBasicOverlayListener, LabelCaptureFeedback, LabelCaptureListener, LabelCaptureSession, LabelCaptureSettings, LabelCaptureValidationFlowListener, LabelCaptureValidationFlowOverlay, LabelCaptureValidationFlowSettings, LabelDateComponentFormat, LabelDateFormat, LabelDateResult, LabelDefinition, LabelField, LabelFieldDefinition, LabelFieldLocation, LabelFieldLocationType, LabelFieldState, LabelFieldType, LabelFieldValueType, LabelResultUpdateType, PackingDateText, PartNumberBarcode, ReceiptScanningLineItem, ReceiptScanningResult, SerialNumberBarcode, TextField, TotalPriceText, UnitPriceText, WeightText } from './label';
import { DefaultSerializeable, Size } from 'scandit-capacitor-datacapture-core/dist/dts/core';

interface LabelCaptureAdvancedOverlayViewOptions {
    size?: Size;
    scale?: number;
}
declare class LabelCaptureAdvancedOverlayView extends DefaultSerializeable {
    private data;
    private options;
    static withHTMLElement(element: HTMLElement, options: LabelCaptureAdvancedOverlayViewOptions | null): Promise<LabelCaptureAdvancedOverlayView>;
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
