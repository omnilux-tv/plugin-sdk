export function getPluginRouteBasePath(pluginId) {
    if (typeof pluginId !== 'string' || pluginId.trim().length === 0) {
        throw new Error('pluginId cannot be empty');
    }
    return `/api/plugins/${encodeURIComponent(pluginId)}`;
}
export function isolatePluginRoutes(pluginId, routes, options = {}) {
    const basePath = normalizeRoutePath(options.basePath ?? getPluginRouteBasePath(pluginId));
    const authMiddlewares = normalizeMiddleware(options.authMiddleware);
    const adminMiddlewares = normalizeMiddleware(options.adminMiddleware);
    return routes.map((route) => {
        const routePath = normalizeRoutePath(route.path);
        const routeMiddlewares = composeRouteMiddlewares(route.auth, route.middlewares, authMiddlewares, adminMiddlewares);
        const resolvedMountPath = route.mountPath
            ? normalizeRoutePath(route.mountPath)
            : routePath === '/'
                ? basePath
                : `${basePath}${routePath}`;
        const mountPath = route.mountPath && !route.allowCustomMountPath
            ? ensureRouteWithinNamespace(pluginId, basePath, resolvedMountPath, route.mountPath)
            : resolvedMountPath;
        return {
            ...route,
            path: routePath,
            method: route.method ?? 'GET',
            middlewares: routeMiddlewares,
            pluginId,
            mountPath,
        };
    });
}
function composeRouteMiddlewares(authMode, routeMiddlewares, authMiddlewares, adminMiddlewares) {
    if (authMode === 'none' || authMode === 'optional') {
        return [...(routeMiddlewares ?? [])];
    }
    if (authMode === 'admin') {
        return [...authMiddlewares, ...adminMiddlewares, ...(routeMiddlewares ?? [])];
    }
    return [...authMiddlewares, ...(routeMiddlewares ?? [])];
}
function ensureRouteWithinNamespace(pluginId, basePath, resolvedMountPath, rawMountPath) {
    if (resolvedMountPath === basePath || resolvedMountPath.startsWith(`${basePath}/`)) {
        return resolvedMountPath;
    }
    throw new Error(`Invalid mountPath "${rawMountPath}" for plugin "${pluginId}": custom mount paths must stay within "${basePath}" unless allowCustomMountPath is true.`);
}
function normalizeRoutePath(path) {
    const trimmed = path.trim();
    if (trimmed.length === 0 || trimmed === '/') {
        return '/';
    }
    const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    const decodedPath = decodeRoutePath(normalized);
    const decodedSegments = decodedPath.split('/').filter((segment) => segment.length > 0);
    if (decodedSegments.some((segment) => segment === '.' || segment === '..')) {
        throw new Error(`Invalid route path "${path}": path traversal is not allowed.`);
    }
    const normalizedSegments = normalized.split('/').filter((segment) => segment.length > 0);
    return normalizedSegments.length === 0 ? '/' : `/${normalizedSegments.join('/')}`;
}
function decodeRoutePath(path) {
    try {
        return decodeURIComponent(path);
    }
    catch {
        throw new Error(`Invalid route path "${path}": malformed percent-encoding.`);
    }
}
function normalizeMiddleware(middleware) {
    if (middleware === undefined) {
        return [];
    }
    return Array.isArray(middleware) ? [...middleware] : [middleware];
}
