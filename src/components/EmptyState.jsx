export default function EmptyState({
  icon = "📦",
  title = "Nothing here",
  message = "There is nothing to display.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}