export function setStorageItem<T>(key: string, value: T, temporary?: boolean) {
  const jsonValue = JSON.stringify(value);
  if (temporary) {
    sessionStorage.setItem(key, jsonValue);
  } else {
    localStorage.setItem(key, jsonValue);
  }
}

export function getStorageItem<T>(key: string) {
  try {
    const item = sessionStorage.getItem(key) || localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function removeStorageItem(key: string) {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
}

export function clearStorage() {
  sessionStorage.clear();
  localStorage.clear();
}
