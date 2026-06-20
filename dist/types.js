export var Permission;
(function (Permission) {
    Permission["NetworkOutbound"] = "network:outbound";
    Permission["NetworkListen"] = "network:listen";
    Permission["StorageRead"] = "storage:read";
    Permission["StorageWrite"] = "storage:write";
    Permission["StorageDownloads"] = "storage:downloads";
    Permission["DatabaseRead"] = "database:read";
    Permission["DatabaseReadWrite"] = "database:read-write";
    Permission["SettingsRead"] = "settings:read";
    Permission["SettingsReadWrite"] = "settings:read-write";
    Permission["UiSettingsTab"] = "ui:settings-tab";
    Permission["UiPage"] = "ui:page";
    Permission["UiDashboardWidget"] = "ui:dashboard-widget";
    Permission["RoutesRegister"] = "routes:register";
    Permission["SchedulerRegister"] = "scheduler:register";
    Permission["NotificationsSend"] = "notifications:send";
    Permission["RequestsReadWrite"] = "requests:read-write";
    Permission["LibraryRead"] = "library:read";
    Permission["PlaybackRead"] = "playback:read";
    Permission["LiveTvReadWrite"] = "live-tv:read-write";
})(Permission || (Permission = {}));
export const PERMISSION_RISK = {
    [Permission.NetworkOutbound]: 'high',
    [Permission.NetworkListen]: 'high',
    [Permission.StorageRead]: 'medium',
    [Permission.StorageWrite]: 'high',
    [Permission.StorageDownloads]: 'high',
    [Permission.DatabaseRead]: 'medium',
    [Permission.DatabaseReadWrite]: 'medium',
    [Permission.SettingsRead]: 'low',
    [Permission.SettingsReadWrite]: 'medium',
    [Permission.UiSettingsTab]: 'low',
    [Permission.UiPage]: 'low',
    [Permission.UiDashboardWidget]: 'low',
    [Permission.RoutesRegister]: 'medium',
    [Permission.SchedulerRegister]: 'low',
    [Permission.NotificationsSend]: 'medium',
    [Permission.RequestsReadWrite]: 'medium',
    [Permission.LibraryRead]: 'low',
    [Permission.PlaybackRead]: 'low',
    [Permission.LiveTvReadWrite]: 'medium',
};
export const COMMUNITY_PLUGIN_DISCLAIMER = 'This plugin is provided by a third-party publisher and is not affiliated with, endorsed by, or supported by OmniLux. ' +
    'By installing this plugin, you acknowledge that OmniLux bears no responsibility for its functionality, security, ' +
    'or any consequences of its use. The plugin author is solely responsible for the plugin and its compliance with applicable laws.';
