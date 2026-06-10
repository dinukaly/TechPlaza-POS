const hasLocalStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const cloneValue = (value) => JSON.parse(JSON.stringify(value));

const loadCollection = (key, fallback = []) => {
  if (!hasLocalStorage()) {
    return cloneValue(fallback);
  }

  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return cloneValue(fallback);
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : cloneValue(fallback);
  } catch {
    return cloneValue(fallback);
  }
};

const saveCollection = (key, value) => {
  if (!hasLocalStorage()) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
};

const generateNextId = (collection, fieldName, prefix) => {
  const maxNumber = collection.reduce((maxValue, record) => {
    const rawId = String(record?.[fieldName] ?? "");
    const numeric = parseInt(rawId.replace(prefix, ""), 10);

    if (!Number.isFinite(numeric)) {
      return maxValue;
    }

    return numeric > maxValue ? numeric : maxValue;
  }, 0);

  return `${prefix}${String(maxNumber + 1).padStart(3, "0")}`;
};

export { loadCollection, saveCollection, generateNextId };
