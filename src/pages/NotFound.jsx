import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page not-found">
      <div className="not-found-number">404</div>

      <h1>Page not found</h1>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="primary-button">
        Back Home →
      </Link>
    </main>
  );
}