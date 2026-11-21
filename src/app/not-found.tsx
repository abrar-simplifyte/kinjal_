import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
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
      <span className="section-tag">404</span>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}>
        This page doesn&apos;t exist.
      </h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: "480px", lineHeight: 1.6 }}>
        The page you are looking for may have moved or no longer exists.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link href="/#work" className="btn btn-secondary">
          View All Projects
        </Link>
      </div>
    </main>
  );
}
