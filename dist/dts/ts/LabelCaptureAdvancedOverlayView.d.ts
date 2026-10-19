import { Size, DefaultSerializeable } from 'scandit-datacapture-frameworks-core';
export interface PrivateLabelCaptureAdvancedOverlayView {
    data: string;
    toJSON(): string;
    getEncodedImageData(element: HTMLElement): string;
}
export interface LabelCaptureAdvancedOverlayViewOptions {
    size?: Size;
    scale?: number;
}
export declare class LabelCaptureAdvancedOverlayView extends DefaultSerializeable {
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
