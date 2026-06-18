export function getAdapter(registry, id) {
    if (registry instanceof Map) {
        return registry.get(id);
    }
    if (typeof registry.get === 'function') {
        return registry.get(id);
    }
    return registry[id];
}
