import { useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import Loader from "../../components/Loader";

export default function ManageProducts() {
  const {
    products,
    loading,
    deleteProduct,
  } = useProducts();

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      deleteProduct(id);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="admin-heading">
        <div>
          <span className="eyebrow">CATALOG MANAGEMENT</span>
          <h1>Manage Products</h1>
          <p>
            Create, edit and remove products from your
            catalog.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="primary-button"
        >
          + Add Product
        </Link>
      </div>

      <div className="admin-toolbar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />

        <span>
          {filteredProducts.length} products
        </span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="table-product">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                    />

                    <span>{product.title}</span>
                  </div>
                </td>

                <td>{product.category}</td>

                <td>${product.price}</td>

                <td>
                  <span
                    className={
                      product.stock < 10
                        ? "stock low"
                        : "stock"
                    }
                  >
                    {product.stock}
                  </span>
                </td>

                <td>
                  <div className="table-actions">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="edit-button"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}