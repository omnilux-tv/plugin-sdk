import { Permission, type PluginManifest } from '../types.js';
export declare const PLUGIN_MANIFEST_FILENAME = "omnilux-plugin.json";
export type ManifestValidationErrorCode = 'invalid-type' | 'missing-field' | 'invalid-value' | 'unknown-permission';
export interface ManifestValidationError {
    code: ManifestValidationErrorCode;
    path: string;
    message: string;
    value?: unknown;
}
export type ManifestValidationResult = {
    success: true;
    manifest: PluginManifest;
} | {
    success: false;
    errors: ManifestValidationError[];
};
export declare function validatePluginManifest(input: unknown): ManifestValidationResult;
export declare function assertValidPluginManifest(input: unknown): PluginManifest;
export declare function isPermission(value: unknown): value is Permission;
//# sourceMappingURL=manifest-validator.d.ts.map