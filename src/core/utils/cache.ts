import localforage from "localforage";

export class CacheStore {
  private store: LocalForage;

  public constructor(name: string) {
    this.store = localforage.createInstance({ name });
  }

  public async get<T>(key: string) {
    return this.store.getItem<T>(key);
  }

  public async set<T>(key: string, value: T) {
    return this.store.setItem<T>(key, value);
  }

  public async remove(key: string) {
    return this.store.removeItem(key);
  }

  public async clear() {
    return this.store.clear();
  }
}

export const defaultCacheStore = new CacheStore("defaultCacheStore");
