export declare enum Permission {
    NetworkOutbound = "network:outbound",
    NetworkListen = "network:listen",
    StorageRead = "storage:read",
    StorageWrite = "storage:write",
    StorageDownloads = "storage:downloads",
    DatabaseRead = "database:read",
    DatabaseReadWrite = "database:read-write",
    SettingsRead = "settings:read",
    SettingsReadWrite = "settings:read-write",
    UiSettingsTab = "ui:settings-tab",
    UiPage = "ui:page",
    UiDashboardWidget = "ui:dashboard-widget",
    RoutesRegister = "routes:register",
    SchedulerRegister = "scheduler:register",
    NotificationsSend = "notifications:send",
    RequestsReadWrite = "requests:read-write",
    LibraryRead = "library:read",
    PlaybackRead = "playback:read",
    LiveTvReadWrite = "live-tv:read-write"
}
export type TrustLevel = 'official' | 'verified' | 'community';
export declare const PERMISSION_RISK: Record<Permission, 'low' | 'medium' | 'high'>;
export declare const COMMUNITY_PLUGIN_DISCLAIMER: string;
export interface PluginAuthor {
    name: string;
    email?: string;
    url?: string;
}
export type AdapterKind = 'DownloadClientAdapter' | 'IndexerAdapter' | 'VpnAdapter' | 'ScannerAdapter' | 'SearchAdapter' | 'IptvSourceAdapter' | 'GameSourceAdapter' | 'NotificationAgentAdapter' | 'MetadataProviderAdapter' | 'ArrServiceAdapter' | string;
export type PluginCategory = 'download-client' | 'indexer' | 'vpn' | 'scanner' | 'search' | 'iptv-source' | 'game-source' | 'notification-agent' | 'metadata-provider' | 'arr-service' | 'integration' | 'ui' | 'utility' | string;
export interface PluginCompatibility {
    omnilux: string;
    api?: string;
    metadata?: Record<string, unknown>;
}
export type PluginRuntimeMode = 'host' | 'worker' | 'auto';
export interface PluginDependency {
    name: string;
    version: string;
    optional?: boolean;
}
export interface PluginAdapterManifest {
    type: AdapterKind;
    id: string;
    displayName?: string;
    description?: string;
}
export interface PluginRouteManifest {
    path: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD' | string;
    description?: string;
}
export interface PluginSettingsUiManifest {
    entry: string;
    tabId?: string;
    displayName?: string;
}
export interface PluginWebManifest {
    assetRoot: string;
    settingsUI?: PluginSettingsUiManifest;
    pages?: PluginPageManifest[];
    settingsTabs?: PluginSettingsTabManifest[];
}
export interface PluginServerManifest {
    entry: string;
}
export interface PluginRuntimeManifest {
    mode?: PluginRuntimeMode;
}
export interface PluginMigrationManifest {
    id: string;
    path: string;
    description?: string;
}
export interface PluginBackgroundJobManifest {
    id: string;
    schedule: string;
    description?: string;
}
export interface PluginPageManifest {
    id: string;
    path: string;
    entry: string;
    navItem?: {
        label: string;
        icon: string;
        position?: 'primary' | 'secondary';
    };
}
export interface PluginSettingsTabManifest {
    id: string;
    label: string;
    icon: string;
    description: string;
    entry: string;
    section?: 'core' | 'plugins';
}
export interface PluginManifest {
    schemaVersion: 2;
    name: string;
    version: string;
    displayName: string;
    description: string;
    category: PluginCategory;
    icon?: string;
    author?: string | PluginAuthor;
    license?: string;
    trust?: TrustLevel;
    disclaimer?: string;
    signature?: {
        hash: string;
        algorithm?: string;
    };
    defaultEnabled?: boolean;
    compatibility: PluginCompatibility;
    dependencies?: PluginDependency[];
    permissions: Permission[];
    server: PluginServerManifest;
    web?: PluginWebManifest;
    runtime?: PluginRuntimeManifest;
    adapters?: PluginAdapterManifest[];
    routes?: PluginRouteManifest[];
    migrations?: PluginMigrationManifest[];
    backgroundJobs?: PluginBackgroundJobManifest[];
}
export type PluginSource = 'local' | 'npm' | 'github' | 'builtin' | 'unknown' | (string & {});
export interface PluginMeta {
    id: string;
    name: string;
    version: string;
    enabled: boolean;
    source: PluginSource;
    trust: TrustLevel;
    manifest: PluginManifest;
    permissions: Permission[];
    installedAt: string;
    updatedAt: string;
}
//# sourceMappingURL=types.d.ts.map