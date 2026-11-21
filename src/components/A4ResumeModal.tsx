"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import { LinkedinIcon, GithubIcon, BehanceIcon } from "@/components/SocialIcons";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface A4ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function A4ResumeModal({ isOpen, onClose }: A4ResumeModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);
  useFocusTrap(isOpen, overlayRef);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => {
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          key="resume-modal"
          className="resume-modal-overlay"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            backgroundColor: "rgba(9, 10, 15, 0.8)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={onClose}
        >
          {/* Floating Controls: Print & Close */}
          <div
            className="no-print resume-floating-actions"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => window.print()}
              className="resume-btn-action resume-btn-primary"
              title="Print or Save Resume as A4 PDF"
            >
              <Printer size={15} />
              <span className="btn-text-full">Print / Save PDF</span>
              <span className="btn-text-short">Print</span>
            </button>

            <a
              href="/Kinjal_Shah_Resume.pdf"
              download="Kinjal_Shah_Resume.pdf"
              className="resume-btn-action resume-btn-secondary"
              title="Download Kinjal Shah Resume PDF"
            >
              <Download size={15} />
              <span className="btn-text-full">Download PDF</span>
              <span className="btn-text-short">PDF</span>
            </a>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close resume"
              className="resume-btn-close"
              title="Close Resume View"
            >
              <X size={18} />
            </button>
          </div>

          {/* Clean A4 Paper Resume Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="resume-dialog-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-name"
            style={{
              width: "100%",
              maxWidth: "840px",
              height: "92vh",
              maxHeight: "92vh",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              id="printable-resume"
              className="resume-paper-body"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "2.25rem 2.5rem",
                fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                background: "#ffffff",
                color: "#1e293b",
                lineHeight: 1.45,
              }}
            >
              {/* Header: Name, Portfolio, Socials & Contact (Exact to Resume PDF) */}
              <header style={{ textAlign: "center", borderBottom: "1.5px solid #0f172a", paddingBottom: "1rem", marginBottom: "1.1rem" }}>
                <h1
                  id="resume-name"
                  style={{
                    fontSize: "2.1rem",
                    fontWeight: 800,
                    letterSpacing: "-0.025em",
                    margin: 0,
                    color: "#0f172a",
                    lineHeight: 1.15,
                  }}
                >
                  {PROFILE_DATA.name}
                </h1>

                {/* Subtitle: portfolio link */}
                <div style={{ marginTop: "0.25rem" }}>
                  <a
                    href={PROFILE_DATA.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#4f46e5",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Portfolio
                  </a>
                </div>

                {/* Social Links Row: LinkedIn | Behance | GitHub */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    fontSize: "0.85rem",
                    marginTop: "0.35rem",
                    color: "#4f46e5",
                    fontWeight: 600,
                  }}
                >
                  <a
                    href={PROFILE_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#4f46e5", textDecoration: "none" }}
                  >
                    LinkedIn
                  </a>
                  <span style={{ color: "#94a3b8" }}>|</span>
                  <a
                    href={PROFILE_DATA.behance ?? "https://www.behance.net/2k_shah34"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#4f46e5", textDecoration: "none" }}
                  >
                    Behance
                  </a>
                  <span style={{ color: "#94a3b8" }}>|</span>
                  <a
                    href={PROFILE_DATA.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#4f46e5", textDecoration: "none" }}
                  >
                    GitHub
                  </a>
                </div>

                {/* Contact Row: Phone | Email */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    fontSize: "0.825rem",
                    marginTop: "0.3rem",
                    color: "#475569",
                  }}
                >
                  <a href={`tel:${PROFILE_DATA.phoneRaw}`} style={{ color: "#1e293b", textDecoration: "none", fontWeight: 500 }}>
                    {PROFILE_DATA.phone}
                  </a>
                  <span style={{ color: "#94a3b8" }}>|</span>
                  <a href={`mailto:${PROFILE_DATA.email}`} style={{ color: "#4f46e5", textDecoration: "none", fontWeight: 500 }}>
                    {PROFILE_DATA.email}
                  </a>
                </div>

                {/* Location */}
                <div style={{ fontSize: "0.825rem", color: "#475569", marginTop: "0.2rem", fontWeight: 500 }}>
                  {PROFILE_DATA.city}
                </div>
              </header>

              {/* 1. SUMMARY */}
              <section style={{ marginBottom: "1.15rem" }}>
                <h2
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#0f172a",
                    borderBottom: "1px solid #cbd5e1",
                    paddingBottom: "0.2rem",
                    marginBottom: "0.45rem",
                  }}
                >
                  SUMMARY
                </h2>
                <p style={{ fontSize: "0.84rem", color: "#334155", lineHeight: 1.45, margin: 0, textAlign: "justify" }}>
                  UI/UX Designer with hands-on experience at Simplifyte, designing website interfaces, landing pages, and mobile screens alongside digital and print marketing materials. Skilled in wireframing, prototyping, Figma Auto Layout, visual hierarchy, and branding. Experienced in creating social media creatives, brochures, logos, posters, and other brand assets using Figma, Canva, and Adobe Photoshop. Familiar with Lovable and Google Stitch for design exploration. Collaborates with clients, developers, and internal teams to understand requirements, incorporate feedback, and maintain visual consistency. Holds a B.Sc. in Information Technology.
                </p>
              </section>

              {/* 2. EDUCATION */}
              <section style={{ marginBottom: "1.15rem" }}>
                <h2
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#0f172a",
                    borderBottom: "1px solid #cbd5e1",
                    paddingBottom: "0.2rem",
                    marginBottom: "0.45rem",
                  }}
                >
                  EDUCATION
                </h2>

                <div style={{ fontSize: "0.84rem", color: "#334155" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                    <strong style={{ color: "#0f172a", fontSize: "0.88rem" }}>
                      Maharaja Krushnakumarsinhji Bhavnagar University (MKBU)
                    </strong>
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>2023 – 2026</span>
                  </div>
                  <div style={{ fontStyle: "italic", color: "#475569", marginBottom: "0.3rem" }}>
                    Bachelor of Science in Information Technology (B.Sc. IT)
                  </div>

                  <ul style={{ paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.2rem", lineHeight: 1.4 }}>
                    <li>
                      Studied Web Technologies, Software Engineering, Database Management Systems (DBMS), Computer Logic, and Human-Computer Interaction (HCI).
                    </li>
                    <li>
                      Languages and Technologies: HTML, CSS, Java, PHP, C++, Oracle, PL/SQL, and C#.NET.
                    </li>
                    <li>
                      Other Coursework and Tools: DFS and OpenOffice.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 3. TECHNICAL SKILLS */}
              <section style={{ marginBottom: "1.15rem" }}>
                <h2
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#0f172a",
                    borderBottom: "1px solid #cbd5e1",
                    paddingBottom: "0.2rem",
                    marginBottom: "0.45rem",
                  }}
                >
                  TECHNICAL SKILLS
                </h2>

                <ul style={{ paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.84rem", color: "#334155", lineHeight: 1.4 }}>
                  <li>
                    <strong style={{ color: "#0f172a" }}>UI/UX Design:</strong> Website UI, Landing Page Design, Mobile Screen Design, Wireframing, Prototyping, Figma Auto Layout, Visual Hierarchy.
                  </li>
                  <li>
                    <strong style={{ color: "#0f172a" }}>Graphic Design:</strong> Social Media Creatives, Posters, Brochures, Visiting Cards, ID Cards, Thumbnails, Book Covers, and Standees.
                  </li>
                  <li>
                    <strong style={{ color: "#0f172a" }}>Branding:</strong> Logo Design, Brand Visuals, Cover Images.
                  </li>
                  <li>
                    <strong style={{ color: "#0f172a" }}>Design Tools:</strong> Figma, Canva, Adobe Photoshop.
                  </li>
                  <li>
                    <strong style={{ color: "#0f172a" }}>AI Design Tools:</strong> Lovable, Google Stitch, Ideogram, Khroma, Brandmark, and Framer.
                  </li>
                  <li>
                    <strong style={{ color: "#0f172a" }}>Collaboration:</strong> Client Communication, Developer Collaboration, and Incorporating Feedback.
                  </li>
                </ul>
              </section>

              {/* 4. WORK EXPERIENCE */}
              <section style={{ marginBottom: "0.5rem" }}>
                <h2
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#0f172a",
                    borderBottom: "1px solid #cbd5e1",
                    paddingBottom: "0.2rem",
                    marginBottom: "0.45rem",
                  }}
                >
                  WORK EXPERIENCE
                </h2>

                <div style={{ fontSize: "0.84rem", color: "#334155" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                    <strong style={{ color: "#0f172a", fontSize: "0.88rem" }}>
                      UI/UX Designer
                    </strong>
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>Jan 2026 – Nov 2026</span>
                  </div>
                  <div style={{ color: "#4f46e5", fontWeight: 600, marginBottom: "0.3rem" }}>
                    Simplifyte Labs Private Limited
                  </div>

                  <ul style={{ paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem", lineHeight: 1.4 }}>
                    <li>
                      Designed website interfaces and landing pages for Simplifyte, collaborating with clients, developers, and internal teams.
                    </li>
                    <li>
                      Created brochures, visiting cards, logos, posters, standees, social media posts, mobile screens, ID cards, thumbnails, book covers, branding designs, and cover images.
                    </li>
                    <li>
                      Used Figma, Canva, Lovable, Google Stitch, and Adobe Photoshop to create digital and print designs.
                    </li>
                    <li>
                      Incorporated client and team feedback to refine layouts, visual hierarchy, and brand consistency across deliverables.
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
