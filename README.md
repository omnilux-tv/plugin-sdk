# @omnilux/plugin-sdk

TypeScript SDK for building OmniLux plugins. Provides the interfaces, types, and runtime context needed to extend the platform with custom adapters, routes, jobs, and settings panels.

## Installation

```bash
pnpm add @omnilux/plugin-sdk
```

## Plugin Lifecycle

Every plugin exports an `activate` entrypoint that receives a `PluginContext`. Use the context to:

- **Register adapters** -- download clients, indexers, scanners, VPN providers, metadata sources, and more
- **Register routes** -- add custom HTTP endpoints to the server
- **Register jobs** -- schedule recurring background tasks
- **Register settings panels** -- add configuration UI to the admin dashboard

## Minimal Example

```typescript
import type {
  PluginModule,
  PluginRouteDefinition,
} from '@omnilux/plugin-sdk';

const statusRoute: PluginRouteDefinition = {
  path: '/status',
  method: 'GET',
  handler: async (_req, res) => {
    res.json({ status: 'ok' });
  },
};

export const activate: PluginModule['activate'] = (context) => {
  context.registerRoutes([statusRoute]);

  context.registerJob({
    id: 'my-plugin-sync',
    schedule: '1h',
    handler: async () => {
      context.log.info('running sync job');
    },
  });

  context.registerSettingsPanel({
    id: 'my-plugin.settings',
    title: 'My Plugin',
    component: { entry: './ui/settings.js' },
  });
};
```

Notes:

- `activate` is the canonical SDK entrypoint
- `registerRoutes()` accepts an array of `PluginRouteDefinition`
- `registerSettingsPanel()` accepts `PluginSettingsPanelRegistration` with `id`, `title`, and `component`
- the SDK does not publish a higher-level review/submission helper; marketplace workflows live outside this package

## Adapter Types

The SDK ships type definitions for all adapter interfaces: `DownloadClientAdapter`, `IndexerAdapter`, `VpnAdapter`, `ScannerAdapter`, `IptvSourceAdapter`, `GameSourceAdapter`, `MetadataProviderAdapter`, `ArrServiceAdapter`, `NotificationAgentAdapter`, and more.

## Local Verification

```bash
pnpm install
pnpm lint
pnpm build
pnpm verify:package
```

## Documentation

See the OmniLux plugin docs at `https://docs.omnilux.tv/plugins/overview` for the broader development guide.

## License

MIT
