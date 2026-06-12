/**
 * Pluggable storage layer.
 *
 * Today every Booklish feature persists to localStorage through `localAdapter`.
 * When auth + cloud sync ship, swap `activeAdapter` for a remote adapter
 * (e.g. Supabase-backed) that implements the same async-ish interface.
 *
 * All call-sites go through `store.ts` (the `useLocalStore` hook), so
 * components don't need to change when the backend changes.
 */

export interface StorageAdapter {
  get<T>(key: string, fallback: T): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  /** Subscribe to changes for a single key. Returns unsubscribe. */
  subscribe(key: string, handler: () => void): () => void;
}

const PREFIX = "booklish.";
const EVENT = "booklish:store";

export const localAdapter: StorageAdapter = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window.localStorage.getItem(PREFIX + key);
      if (raw == null) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent(EVENT, { detail: { key } }));
    } catch {
      /* quota or serialization issue — ignore for prototype */
    }
  },
  remove(key: string) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(PREFIX + key);
      window.dispatchEvent(new CustomEvent(EVENT, { detail: { key } }));
    } catch {
      /* ignore */
    }
  },
  subscribe(key: string, handler: () => void) {
    if (typeof window === "undefined") return () => {};
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { key?: string } | undefined;
      if (!detail || detail.key === key) handler();
    };
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === PREFIX + key) handler();
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  },
};

/**
 * The single source of truth for storage backend. Swap this when wiring
 * authenticated cloud sync — keep the same interface.
 */
export const activeAdapter: StorageAdapter = localAdapter;
