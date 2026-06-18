import { Permission } from '../types.js';
export declare class PermissionDeniedError extends Error {
    readonly pluginId: string;
    readonly permission: Permission;
    constructor(pluginId: string, permission: Permission, operation?: string);
}
export declare class PermissionChecker {
    readonly pluginId: string;
    private readonly declaredPermissions;
    constructor(pluginId: string, permissions: Iterable<Permission>);
    has(permission: Permission): boolean;
    assert(permission: Permission, operation?: string): void;
    assertAny(permissions: Permission[], operation?: string): void;
    assertNetworkOutbound(operation?: string): void;
    assertNetworkListen(operation?: string): void;
    assertStorageRead(operation?: string): void;
    assertStorageWrite(operation?: string): void;
    assertDownloadsStorage(operation?: string): void;
    assertDatabaseRead(operation?: string): void;
    assertDatabaseWrite(operation?: string): void;
    assertSettingsRead(operation?: string): void;
    assertSettingsWrite(operation?: string): void;
    assertSchedulerRegister(operation?: string): void;
    assertRoutesRegister(operation?: string): void;
    assertNotificationsSend(operation?: string): void;
    assertRequestsAccess(operation?: string): void;
    assertLibraryRead(operation?: string): void;
    assertPlaybackRead(operation?: string): void;
    assertLiveTvReadWrite(operation?: string): void;
    guard<T>(permission: Permission, operation: string, fn: () => T): T;
}
export declare function createPermissionChecker(pluginId: string, permissions: Iterable<Permission>): PermissionChecker;
//# sourceMappingURL=permission-checker.d.ts.map