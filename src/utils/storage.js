const STORAGE_KEY = "nexora_products";

export function getProductsFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveProductsToStorage(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}