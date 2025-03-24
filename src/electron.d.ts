// src/electron.d.ts
export default {};

declare global {
  interface Window {
    electron: {
      invoke: (channel: string, ...args: any[]) => Promise<any>;
    };
  }
}