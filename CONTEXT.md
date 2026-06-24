# OmniLux Plugin SDK

This context defines the language for the TypeScript SDK used to build OmniLux plugins.

## Language

**Plugin SDK**:
The TypeScript package that defines plugin interfaces, context, adapter types, routes, jobs, and settings panel registration.
_Avoid_: Plugin runtime, marketplace workflow

**Plugin**:
An extension package that adds behavior to an OmniLux runtime through the SDK contract.
_Avoid_: Core feature, app module

**Activation Entrypoint**:
The exported plugin function that receives a plugin context and registers extension behavior.
_Avoid_: App bootstrap, server start

**Plugin Context**:
The SDK-provided object a plugin uses to register adapters, routes, jobs, and settings panels.
_Avoid_: React context, request context

**Adapter**:
A typed extension point for an external service or domain integration.
_Avoid_: Product service, internal provider

**Plugin Route**:
A plugin-owned HTTP endpoint registered through the SDK.
_Avoid_: Core runtime API

**Plugin Job**:
A recurring or background task registered by a plugin.
_Avoid_: Runtime scheduler internals

**Settings Panel**:
A plugin-owned admin UI surface registered through the SDK.
_Avoid_: Core settings page

## Relationships

- A **Plugin** uses an **Activation Entrypoint**.
- An **Activation Entrypoint** receives a **Plugin Context**.
- A **Plugin Context** can register **Adapters**, **Plugin Routes**, **Plugin Jobs**, and **Settings Panels**.
- The **Plugin SDK** defines the contract but does not own marketplace submission workflows.

## Example dialogue

> **Dev:** "Should the SDK publish a marketplace review helper?"
> **Domain expert:** "No. The **Plugin SDK** defines extension contracts; marketplace workflow lives outside this package."

## Flagged ambiguities

- "Context" can mean SDK context, React context, or request context. Resolved: this repo uses **Plugin Context** for SDK activation.
