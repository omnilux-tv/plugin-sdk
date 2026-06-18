export type AdapterLookup<TAdapter> = Map<string, TAdapter> | Record<string, TAdapter> | {
    get(id: string): TAdapter | undefined;
};
export declare function getAdapter<TAdapter>(registry: AdapterLookup<TAdapter>, id: string): TAdapter | undefined;
//# sourceMappingURL=get-adapter.d.ts.map