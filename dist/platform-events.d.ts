export declare const PLATFORM_EVENTS: {
    readonly MUSIC_PLAYBACK: "music:playback";
    readonly MUSIC_FAVORITE: "music:favorite";
    readonly LIBRARY_SCAN_COMPLETE: "library:scan-complete";
    readonly PLAYBACK_START: "playback:start";
    readonly PLAYBACK_STOP: "playback:stop";
};
export type PlatformEventName = (typeof PLATFORM_EVENTS)[keyof typeof PLATFORM_EVENTS];
//# sourceMappingURL=platform-events.d.ts.map