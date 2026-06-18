export type PluginRouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD' | string;
export type PluginRouteAuthMode = 'required' | 'optional' | 'none' | 'admin';
export interface PluginRouteDefinition<THandler = unknown, TMiddleware = unknown> {
    path: string;
    mountPath?: string;
    allowCustomMountPath?: boolean;
    method?: PluginRouteMethod;
    handler: THandler;
    middlewares?: TMiddleware[];
    auth?: PluginRouteAuthMode;
    metadata?: Record<string, unknown>;
}
export interface IsolatedPluginRoute<THandler = unknown, TMiddleware = unknown> extends PluginRouteDefinition<THandler, TMiddleware> {
    pluginId: string;
    mountPath: string;
}
export interface RouteIsolationOptions<TMiddleware = unknown> {
    authMiddleware?: TMiddleware | TMiddleware[];
    adminMiddleware?: TMiddleware | TMiddleware[];
    basePath?: string;
}
export declare function getPluginRouteBasePath(pluginId: string): string;
export declare function isolatePluginRoutes<THandler = unknown, TMiddleware = unknown>(pluginId: string, routes: PluginRouteDefinition<THandler, TMiddleware>[], options?: RouteIsolationOptions<TMiddleware>): IsolatedPluginRoute<THandler, TMiddleware>[];
//# sourceMappingURL=route-isolator.d.ts.map