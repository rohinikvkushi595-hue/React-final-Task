import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Products() {
  const { products, loading, error } = useProducts();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const searchInputRef = useRef(null);

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    const params = {};

    if (search.trim()) {
      params.search = search;
    }

    if (category !== "all") {
      params.category = category;
    }

    setSearchParams(params, { replace: true });
  }, [search, category, setSearchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  return (
    <main className="page">
      <section className="page-header">
        <span className="eyebrow">NEXORA CATALOG</span>
        <h1>Explore our collection</h1>
        <p>
          Discover products selected to make your
          everyday experience better.
        </p>
      </section>

      <section className="products-toolbar">
        <div className="search-wrapper">
          <span>⌕</span>

          <input
            ref={searchInputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />

          <button onClick={focusSearch}>
            Search
          </button>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>

          {categories.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </section>

      {loading && <Loader />}

      {error && (
        <div className="error-box">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="results-info">
            <span>
              Showing{" "}
              <strong>
                {filteredProducts.length}
              </strong>{" "}
              products
            </span>

            {(search || category !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔎"
              title="No products found"
              message="Try changing your search or category."
            />
          )}
        </>
      )}
    </main>
  );
}