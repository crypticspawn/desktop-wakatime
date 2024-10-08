/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    DIST: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer?: import("electron").IpcRenderer & {
    getSetting: (
      section: string,
      key: string,
      internal?: boolean,
    ) => string | null;
    setSetting: (
      section: string,
      key: string,
      value: string,
      internal?: boolean,
    ) => string;
    shell: {
      openExternal: (url: string) => void;
    };
    isMonitored: (path: string) => boolean;
    setMonitored: (path: string, monitor: boolean) => void;
    getAppVersion: () => string;
    getInstalledApps: () => import("./utils/validators").AppData[];
    shouldLaunchOnLogIn: () => boolean;
    setShouldLaunchOnLogIn: (shouldLaunchOnLogIn: boolean) => void;
    shouldLogToFile: () => boolean;
    setShouldLogToFile: (shouldLogToFile: boolean) => void;
    autoUpdateEnabled: () => boolean;
    setAutoUpdateEnabled: (autoUpdateEnabled: boolean) => void;
    codeTimeInStatusBar: () => boolean;
    setCodeTimeInStatusBar: (codeTimeInStatusBar: boolean) => void;
    getOpenWindows: () => Promise<import("./utils/validators").AppData[]>;
  };
}

declare module "iconutil" {
  export function toIconset(
    path: string,
    callback: (error: unknown, icons: Record<string, Buffer>) => void,
  ): void;
}

declare module "exe-icon-extractor" {
  export function extractIcon(
    filePath: string,
    size: "large" | "small",
  ): Buffer;
}
