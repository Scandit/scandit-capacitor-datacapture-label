import { LabelCaptureDefaults } from 'scandit-datacapture-frameworks-label';
export declare const Capacitor: {
    pluginName: string;
    defaults: LabelCaptureDefaults;
    exec: (success: Function | null, error: Function | null, functionName: string, args: [
        any
    ] | null) => void;
};
export interface CapacitorWindow extends Window {
    Scandit: any;
    Capacitor: any;
}
export declare const getDefaults: () => Promise<LabelCaptureDefaults>;
