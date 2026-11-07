/**
 * Storage service supporting Chrome Extension Manifest V3 (chrome.storage.local)
 * with automatic fallback to standard localStorage for Web preview.
 */

declare const chrome: any;

export const StorageService = {
  /**
   * Returns true ONLY when actually running inside an installed Chrome Extension
   * (e.g. chrome-extension://<id>/index.html). Returns false on websites and preview servers.
   */
  isRunningInChromeExtension(): boolean {
    if (typeof window === 'undefined') return false;
    if (window.location.protocol === 'chrome-extension:') return true;
    // Check if chrome.runtime is valid and not running on standard web hosts
    const isWebHost = window.location.host.includes('run.app') || 
                      window.location.host.includes('localhost') || 
                      window.location.host.includes('127.0.0.1') ||
                      window.location.protocol.startsWith('http');
    if (isWebHost) return false;
    return typeof chrome !== 'undefined' && !!chrome?.runtime?.id;
  },

  isChromeExtension(): boolean {
    return typeof chrome !== 'undefined' && !!chrome?.storage?.local;
  },

  async getItem<T>(key: string, defaultValue: T): Promise<T> {
    try {
      if (this.isChromeExtension()) {
        return new Promise<T>((resolve) => {
          chrome.storage.local.get([key], (result: any) => {
            if (chrome.runtime?.lastError || result[key] === undefined) {
              resolve(defaultValue);
            } else {
              resolve(result[key]);
            }
          });
        });
      } else {
        const item = localStorage.getItem(`personatab_${key}`);
        if (item === null) return defaultValue;
        return JSON.parse(item) as T;
      }
    } catch (e) {
      console.warn(`Error reading key "${key}" from storage:`, e);
      return defaultValue;
    }
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      if (this.isChromeExtension()) {
        return new Promise<void>((resolve, reject) => {
          chrome.storage.local.set({ [key]: value }, () => {
            if (chrome.runtime?.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve();
            }
          });
        });
      } else {
        localStorage.setItem(`personatab_${key}`, JSON.stringify(value));
      }
    } catch (e) {
      console.error(`Error saving key "${key}" to storage:`, e);
    }
  },

  async exportAllData(): Promise<string> {
    if (this.isChromeExtension()) {
      return new Promise<string>((resolve) => {
        chrome.storage.local.get(null, (items: Record<string, any>) => {
          resolve(JSON.stringify(items, null, 2));
        });
      });
    } else {
      const data: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('personatab_')) {
          try {
            data[k.replace('personatab_', '')] = JSON.parse(localStorage.getItem(k) || '');
          } catch {
            data[k.replace('personatab_', '')] = localStorage.getItem(k);
          }
        }
      }
      return JSON.stringify(data, null, 2);
    }
  },

  async importAllData(jsonStr: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed !== 'object' || parsed === null) return false;

      if (this.isChromeExtension()) {
        return new Promise<boolean>((resolve) => {
          chrome.storage.local.set(parsed, () => {
            resolve(!chrome.runtime?.lastError);
          });
        });
      } else {
        for (const [key, value] of Object.entries(parsed)) {
          localStorage.setItem(`personatab_${key}`, JSON.stringify(value));
        }
        return true;
      }
    } catch (e) {
      console.error('Failed to import data:', e);
      return false;
    }
  },

  async clearAll(): Promise<void> {
    if (this.isChromeExtension()) {
      return new Promise<void>((resolve) => {
        chrome.storage.local.clear(() => resolve());
      });
    } else {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('personatab_')) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    }
  }
};
