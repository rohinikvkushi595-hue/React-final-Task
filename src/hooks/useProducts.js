import { useEffect, useState } from "react";
import {
  getProductsFromStorage,
  saveProductsToStorage,
} from "../utils/storage";

const API_URL = "https://dummyjson.com/products";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const savedProducts = getProductsFromStorage();

      if (savedProducts && savedProducts.length > 0) {
        setProducts(savedProducts);
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}?limit=30`);

      if (!response.ok) {
        throw new Error("Unable to load products");
      }

      const data = await response.json();

      setProducts(data.products);
      saveProductsToStorage(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();

    const newProduct = {
      ...product,
      ...data,
      id: Date.now(),
      rating: 4.5,
      stock: product.stock || 20,
      thumbnail:
        product.thumbnail ||
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    };

    const updated = [newProduct, ...products];

    setProducts(updated);
    saveProductsToStorage(updated);

    return newProduct;
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
    } catch {
      // Local update will still work.
    }

    const updated = products.map((product) =>
      product.id === id
        ? { ...product, ...updatedProduct }
        : product
    );

    setProducts(updated);
    saveProductsToStorage(updated);
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
    } catch {
      // Local delete will still work.
    }

    const updated = products.filter(
      (product) => product.id !== id
    );

    setProducts(updated);
    saveProductsToStorage(updated);
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    reload: loadProducts,
  };
}