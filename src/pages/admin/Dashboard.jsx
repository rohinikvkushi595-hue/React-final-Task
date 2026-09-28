import useProducts from "../../hooks/useProducts";
import Loader from "../../components/Loader";

export default function Dashboard() {
  const { products, loading } = useProducts();

  if (loading) {
    return <Loader />;
  }

  const totalStock = products.reduce(
    (sum, product) => sum + (product.stock || 0),
    0
  );

  const averagePrice =
    products.length > 0
      ? products.reduce(
          (sum, product) => sum + product.price,
          0
        ) / products.length
      : 0;

  const categories = new Set(
    products.map((product) => product.category)
  ).size;

  return (
    <div>
      <div className="admin-heading">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1>Dashboard</h1>
          <p>Welcome back to your Nexora workspace.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>📦</span>
          <small>Total Products</small>
          <strong>{products.length}</strong>
        </div>

        <div className="stat-card">
          <span>🏷️</span>
          <small>Categories</small>
          <strong>{categories}</strong>
        </div>

        <div className="stat-card">
          <span>📊</span>
          <small>Total Stock</small>
          <strong>{totalStock}</strong>
        </div>

        <div className="stat-card">
          <span>💰</span>
          <small>Average Price</small>
          <strong>${averagePrice.toFixed(2)}</strong>
        </div>
      </div>

      <div className="admin-welcome">
        <div>
          <span className="eyebrow">NEXORA INSIGHT</span>
          <h2>Your store at a glance.</h2>
          <p>
            Manage your products, maintain inventory
            and keep your catalog fresh from one
            central workspace.
          </p>
        </div>

        <div className="dashboard-symbol">✦</div>
      </div>
    </div>
  );
}