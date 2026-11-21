export default function Loading() {
  return (
    <main
      id="main"
      role="status"
      aria-live="polite"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <span className="loading-spinner" aria-hidden="true" />
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Loading…</p>
    </main>
  );
}
