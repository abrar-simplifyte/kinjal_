"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <span className="section-tag">Something went wrong</span>
      <h1 style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", letterSpacing: "-0.03em" }}>
        An unexpected error occurred.
      </h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: "480px", lineHeight: 1.6 }}>
        Please try again. If the problem continues, contact Kinjal directly by email.
      </p>
      <button type="button" onClick={reset} className="btn btn-primary">
        Try Again
      </button>
    </main>
  );
}
