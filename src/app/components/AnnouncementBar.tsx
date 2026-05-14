export function AnnouncementBar() {
  return (
    <div
      className="w-full text-center py-2 text-sm font-space tracking-wide sticky top-0 z-40"
      style={{
        backgroundColor: "var(--text-primary)",
        color: "var(--bg-primary)",
      }}
    >
      Free delivery over €40 · New drops every Friday
    </div>
  );
}
