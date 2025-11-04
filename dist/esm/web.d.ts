import type { ScanditLabelPluginInterface } from './definitions';
export * from './definitions';
export declare class ScanditLabelPluginImplementation implements ScanditLabelPluginInterface {
    initialize(coreDefaults: any): Promise<any>;
}
export declare const ScanditLabelPlugin: ScanditLabelPluginImplementation;
