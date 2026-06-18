import { Permission } from '../types.js';
export class PermissionDeniedError extends Error {
    pluginId;
    permission;
    constructor(pluginId, permission, operation) {
        super(operation
            ? `Plugin "${pluginId}" is not allowed to perform "${operation}" without "${permission}".`
            : `Plugin "${pluginId}" is missing required permission "${permission}".`);
        this.name = 'PermissionDeniedError';
        this.pluginId = pluginId;
        this.permission = permission;
    }
}
export class PermissionChecker {
    pluginId;
    declaredPermissions;
    constructor(pluginId, permissions) {
        this.pluginId = pluginId;
        this.declaredPermissions = new Set(permissions);
    }
    has(permission) {
        return this.declaredPermissions.has(permission);
    }
    assert(permission, operation) {
        if (!this.has(permission)) {
            throw new PermissionDeniedError(this.pluginId, permission, operation);
        }
    }
    assertAny(permissions, operation) {
        if (permissions.length === 0) {
            throw new Error('assertAny requires at least one permission');
        }
        if (permissions.some((permission) => this.has(permission))) {
            return;
        }
        throw new PermissionDeniedError(this.pluginId, permissions[0], operation);
    }
    assertNetworkOutbound(operation = 'outbound network access') {
        this.assert(Permission.NetworkOutbound, operation);
    }
    assertNetworkListen(operation = 'listen on a network port') {
        this.assert(Permission.NetworkListen, operation);
    }
    assertStorageRead(operation = 'read from storage') {
        this.assert(Permission.StorageRead, operation);
    }
    assertStorageWrite(operation = 'write to storage') {
        this.assert(Permission.StorageWrite, operation);
    }
    assertDownloadsStorage(operation = 'access the downloads directory') {
        this.assert(Permission.StorageDownloads, operation);
    }
    assertDatabaseRead(operation = 'read from the database') {
        this.assertAny([Permission.DatabaseRead, Permission.DatabaseReadWrite], operation);
    }
    assertDatabaseWrite(operation = 'write to the database') {
        this.assert(Permission.DatabaseReadWrite, operation);
    }
    assertSettingsRead(operation = 'read settings') {
        this.assertAny([Permission.SettingsRead, Permission.SettingsReadWrite], operation);
    }
    assertSettingsWrite(operation = 'write settings') {
        this.assert(Permission.SettingsReadWrite, operation);
    }
    assertSchedulerRegister(operation = 'register background jobs') {
        this.assert(Permission.SchedulerRegister, operation);
    }
    assertRoutesRegister(operation = 'register routes') {
        this.assert(Permission.RoutesRegister, operation);
    }
    assertNotificationsSend(operation = 'send notifications') {
        this.assert(Permission.NotificationsSend, operation);
    }
    assertRequestsAccess(operation = 'access media requests') {
        this.assert(Permission.RequestsReadWrite, operation);
    }
    assertLibraryRead(operation = 'read from the media library') {
        this.assert(Permission.LibraryRead, operation);
    }
    assertPlaybackRead(operation = 'read playback activity') {
        this.assert(Permission.PlaybackRead, operation);
    }
    assertLiveTvReadWrite(operation = 'read or write Live TV state') {
        this.assert(Permission.LiveTvReadWrite, operation);
    }
    guard(permission, operation, fn) {
        this.assert(permission, operation);
        return fn();
    }
}
export function createPermissionChecker(pluginId, permissions) {
    return new PermissionChecker(pluginId, permissions);
}
