import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>✦</span>
          <div>
            <strong>NEXORA</strong>
            <small>ADMIN PANEL</small>
          </div>
        </div>

        <nav>
          <NavLink to="/admin" end>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/products">
            📦 Products
          </NavLink>

          <NavLink to="/admin/products/new">
            ＋ Add Product
          </NavLink>
        </nav>
      </aside>

      <section className="admin-content">
        <Outlet />
      </section>
    </main>
  );
}