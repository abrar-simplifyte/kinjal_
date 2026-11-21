"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import Image from "next/image";
import A4ResumeModal from "@/components/A4ResumeModal";
import { PROFILE_DATA } from "@/data/profile";
import {
  SHOWCASE_CATEGORIES,
  SHOWCASE_WORKS,
  TICKER_ITEMS,
  type ShowcaseWork,
} from "@/data/showcaseWorks";

type PageSection = "home" | "projects" | "about";

const HERO_WORDS = ["Kinjal", "Shah"];

function AnimatedHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  let charCounter = 0;
  const words = text.split(" ");
  return (
    <h2 className={`t rv ${className}`} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="wd" aria-hidden="true">
          {word.split("").map((char, ci) => {
            const k = charCounter++;
            return (
              <span key={ci} className="cw">
                <span className="ch" style={{ "--k": k } as CSSProperties}>
                  {char}
                </span>
              </span>
            );
          })}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}

export default function PortfolioHome() {
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const [selectedWork, setSelectedWork] = useState<ShowcaseWork | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<PageSection>("home");
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({
    left: 5,
    width: 0,
  });

  // Loader state
  const [loaderMounted, setLoaderMounted] = useState<boolean>(true);
  const [loaderDone, setLoaderDone] = useState<boolean>(false);

  const lcRef = useRef<HTMLSpanElement | null>(null);
  const lbRef = useRef<HTMLDivElement | null>(null);
  const navLinksRef = useRef<Record<PageSection, HTMLAnchorElement | null>>({
    home: null,
    projects: null,
    about: null,
  });
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dbodyRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const curRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const blobRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const tickRef = useRef<HTMLDivElement | null>(null);

  const openResumeModal = useCallback(() => setResumeModalOpen(true), []);
  const closeResumeModal = useCallback(() => setResumeModalOpen(false), []);

  const updatePill = useCallback((section: PageSection) => {
    const activeLink = navLinksRef.current[section];
    if (!activeLink) return;
    setPillStyle({
      left: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
    });
  }, []);

  useEffect(() => {
    updatePill(activeNav);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        updatePill(activeNav);
      });
    }
    const handleResize = () => updatePill(activeNav);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeNav, updatePill]);

  // 1. High-Performance Intro Loader animation matching v2.html
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setLoaderDone(true);
      setLoaderMounted(false);
      document.documentElement.classList.add("ready");
      return;
    }

    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    let started = false;
    let rafId: number;

    const finishLoader = () => {
      if (started) return;
      started = true;
      document.documentElement.classList.add("ready");
      setLoaderDone(true);
      document.body.style.overflow = "";
      setTimeout(() => {
        setLoaderMounted(false);
      }, 1500);
    };

    const step = (t: number) => {
      const p = Math.min((t - t0) / 1500, 1);
      const e = 1 - Math.pow(1 - p, 3);
      if (lcRef.current) {
        lcRef.current.textContent = String(Math.round(e * 100));
      }
      if (lbRef.current) {
        lbRef.current.style.transform = `scaleX(${e})`;
      }

      if (p < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setTimeout(finishLoader, 250);
      }
    };

    rafId = requestAnimationFrame(step);
    const fallbackTimeout = setTimeout(finishLoader, 4500);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  // 2. Smooth scroll to section
  const scrollToSection = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, targetId: PageSection) => {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `#${targetId}`);
        setActiveNav(targetId);
        updatePill(targetId);
      }
    },
    [updatePill]
  );

  // 3. Parallax, Scroll-linked Bar & Ticker Skew matching v2.html
  useEffect(() => {
    let lastY = window.scrollY;
    let skew = 0;
    let mousePx = 0;
    let mousePy = 0;

    const isTouch =
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const applyParallax = () => {
      const scrollY = window.scrollY;
      const xBlob = isTouch ? 0 : Math.max(-15, Math.min(15, mousePx * 30));
      const yBlob = (isTouch ? 0 : mousePy * 30) + scrollY * 0.18;
      const xRing = isTouch ? 0 : Math.max(-12, Math.min(12, mousePx * -20));
      const yRing = (isTouch ? 0 : mousePy * -20) + scrollY * 0.1;

      if (blobRef.current) {
        blobRef.current.style.translate = `${xBlob}px ${yBlob}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.translate = `${xRing}px ${yRing}px`;
      }
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Top reading progress bar
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${scrollHeight > 0 ? scrollY / scrollHeight : 0})`;
      }

      // Active section detection
      const y = scrollY + window.innerHeight * 0.35;
      let currentSection: PageSection = "home";
      const sections: PageSection[] = ["home", "projects", "about"];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) {
          currentSection = id;
        }
      });
      setActiveNav(currentSection);
      updatePill(currentSection);

      // Parallax on big background words (PROJECTS / ABOUT)
      const isMobile = window.innerWidth <= 820;
      const bgWords = document.querySelectorAll<HTMLElement>(".bgword");
      bgWords.forEach((word) => {
        const parent = word.parentElement;
        if (parent) {
          const r = parent.getBoundingClientRect();
          const baseK = parseFloat(word.dataset.k || "0.3");
          const k = isMobile ? baseK * 0.12 : baseK;
          word.style.transform = `translateX(${r.top * k}px)`;
        }
      });

      applyParallax();

      // Ticker skew based on scroll velocity
      const v = scrollY - lastY;
      lastY = scrollY;
      skew += (Math.max(-8, Math.min(8, v * 0.35)) - skew) * 0.2;
      if (tickRef.current) {
        tickRef.current.style.transform = `skewX(${(-skew).toFixed(2)}deg)`;
      }
    };

    const relaxLoop = () => {
      if (Math.abs(skew) > 0.02) {
        skew *= 0.9;
        if (tickRef.current) {
          tickRef.current.style.transform = `skewX(${(-skew).toFixed(2)}deg)`;
        }
      }
      rafId = requestAnimationFrame(relaxLoop);
    };

    let rafId = requestAnimationFrame(relaxLoop);

    const onMouseMove = (e: globalThis.MouseEvent) => {
      mousePx = e.clientX / window.innerWidth - 0.5;
      mousePy = e.clientY / window.innerHeight - 0.5;
      applyParallax();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [updatePill]);

  // 4. IntersectionObserver for smooth scroll reveals (.rv.in)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const elements = document.querySelectorAll(".rv");
    elements.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      if (!htmlEl.style.getPropertyValue("--d")) {
        htmlEl.style.setProperty("--d", `${Math.min(i % 4, 3) * 90}ms`);
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, [currentCategory]);

  // 5. Custom Spring Cursor with Lerp physics matching v2.html
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let rafId: number;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
      }
    };

    const handleMouseOver = (e: globalThis.MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button, .card, .chip");
      if (curRef.current) {
        curRef.current.classList.toggle("big", !!target);
        curRef.current.textContent = target && target.classList.contains("card") ? "VIEW" : "";
      }
    };

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (curRef.current) {
        curRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 6. Click Burst Particles matching v2.html
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleClick = (e: globalThis.MouseEvent) => {
      for (let i = 0; i < 12; i++) {
        const dot = document.createElement("span");
        dot.className = "burst";
        dot.style.left = `${e.clientX - 4}px`;
        dot.style.top = `${e.clientY - 4}px`;
        dot.style.background = i % 2 === 0 ? "#942e3a" : "#d9a9ae";
        document.body.appendChild(dot);

        const angle = (Math.PI * 2 * i) / 12;
        const dist = 38 + Math.random() * 44;

        dot
          .animate(
            [
              { transform: "translate(0, 0) scale(1)", opacity: 1 },
              {
                transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`,
                opacity: 0,
              },
            ],
            {
              duration: 650 + Math.random() * 250,
              easing: "cubic-bezier(.2, .8, .2, 1)",
            }
          )
          .onfinish = () => dot.remove();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // 7. Magnetic Buttons effect matching v2.html
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const buttons = document.querySelectorAll<HTMLElement>(".btn");

    const onBtnMove = (e: globalThis.MouseEvent) => {
      const b = e.currentTarget as HTMLElement;
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      b.style.translate = `${x}px ${y}px`;
    };

    const onBtnLeave = (e: globalThis.MouseEvent) => {
      const b = e.currentTarget as HTMLElement;
      b.style.translate = "";
    };

    buttons.forEach((b) => {
      b.addEventListener("mousemove", onBtnMove);
      b.addEventListener("mouseleave", onBtnLeave);
    });

    return () => {
      buttons.forEach((b) => {
        b.removeEventListener("mousemove", onBtnMove);
        b.removeEventListener("mouseleave", onBtnLeave);
      });
    };
  }, []);

  // Filtered works
  const filteredWorks = useMemo(
    () =>
      SHOWCASE_WORKS.filter(
        (work) => currentCategory === "All" || work.c === currentCategory
      ),
    [currentCategory]
  );

  // Card mouse movement for spotlight & 3D tilt
  const handleCardMouseMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
      card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
    },
    []
  );

  const handleCardMouseLeave = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = "";
    },
    []
  );

  // Open & Close Dialog Modal
  const openWorkDialog = useCallback((work: ShowcaseWork) => {
    setSelectedWork(work);
    setActiveSlide(0);
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) {
      dlg.showModal();
    }
    if (dbodyRef.current) {
      dbodyRef.current.scrollTop = 0;
    }
  }, []);

  const closeWorkDialog = useCallback(() => {
    const dlg = dialogRef.current;
    if (dlg && dlg.open) {
      dlg.close();
    }
    setSelectedWork(null);
  }, []);

  const scrollGallery = useCallback((direction: "left" | "right") => {
    const el = galleryRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  const handleGalleryScroll = useCallback(() => {
    const el = galleryRef.current;
    if (!el || !selectedWork?.imgs?.length) return;
    const scrollPos = el.scrollLeft;
    const slideWidth = el.clientWidth;
    const index = Math.round(scrollPos / slideWidth);
    setActiveSlide(index);
  }, [selectedWork]);

  const scrollToSlide = useCallback((index: number) => {
    const el = galleryRef.current;
    if (!el) return;
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: "smooth",
    });
    setActiveSlide(index);
  }, []);

  // Keyboard navigation for dialog gallery
  useEffect(() => {
    if (!selectedWork || !selectedWork.imgs || selectedWork.imgs.length <= 1) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollGallery("left");
      } else if (e.key === "ArrowRight") {
        scrollGallery("right");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedWork, scrollGallery]);

  // Sequenced letters for hero name
  const heroWordsWithIndices = useMemo(() => {
    let charIndex = 0;
    return HERO_WORDS.map((word) => ({
      word,
      letters: word.split("").map((letter) => ({
        letter,
        index: charIndex++,
      })),
    }));
  }, []);

  // 6 repetitions of items for smooth continuous infinite marquee on any screen
  const tickerContent = useMemo(
    () => [
      ...TICKER_ITEMS,
      ...TICKER_ITEMS,
      ...TICKER_ITEMS,
      ...TICKER_ITEMS,
      ...TICKER_ITEMS,
      ...TICKER_ITEMS,
    ],
    []
  );

  return (
    <>
      {/* Intro Cinematic Loader matching v2.html */}
      {loaderMounted && (
        <div id="loader" className={loaderDone ? "done" : ""} aria-hidden="true">
          <div className="lw">
            <div className="lg">KS</div>
            <div className="ln">
              <span id="lc" ref={lcRef}>
                0
              </span>
              %
            </div>
            <div className="lbar">
              <div id="lb" ref={lbRef} />
            </div>
          </div>
        </div>
      )}

      {/* Top Scroll Progress Bar */}
      <div id="bar" ref={barRef} />

      {/* Custom Spring Cursor */}
      <div id="cur" ref={curRef} />
      <div id="dot" ref={dotRef} />

      <div className="ps-shell">
        <header className="site-header">
          <a
            className="logo"
            href="#home"
            aria-label="Home"
            onClick={(e) => scrollToSection(e, "home")}
          >
            KS
          </a>
          <nav aria-label="Main">
            <i
              id="pill"
              style={{
                left: `${pillStyle.left}px`,
                width: pillStyle.width > 0 ? `${pillStyle.width}px` : undefined,
              }}
            />
            <a
              ref={(el) => {
                navLinksRef.current.home = el;
              }}
              href="#home"
              aria-current={activeNav === "home" ? "page" : undefined}
              onClick={(e) => scrollToSection(e, "home")}
            >
              Home
            </a>
            <a
              ref={(el) => {
                navLinksRef.current.projects = el;
              }}
              href="#projects"
              aria-current={activeNav === "projects" ? "page" : undefined}
              onClick={(e) => scrollToSection(e, "projects")}
            >
              Projects
            </a>
            <a
              ref={(el) => {
                navLinksRef.current.about = el;
              }}
              href="#about"
              aria-current={activeNav === "about" ? "page" : undefined}
              onClick={(e) => scrollToSection(e, "about")}
            >
              About me
            </a>
          </nav>
        </header>

        {/* Side Floating Rail */}
        <aside className="rail" aria-label="Social links">
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GH<span>GitHub</span>
          </a>
          <a
            href={PROFILE_DATA.behance ?? "https://www.behance.net/2k_shah34"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
          >
            Bē<span>Behance</span>
          </a>
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            in<span>LinkedIn</span>
          </a>
          <a
            href="/Kinjal_Shah_Resume.pdf"
            download="Kinjal_Shah_Resume.pdf"
            className="cv"
            id="cvlink"
            aria-label="Resume"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Kinjal Shah Resume (PDF)"
          >
            CV<span>Resume</span>
          </a>
        </aside>

        <main id="main">
          {/* 1. Home Section */}
          <section className="page" id="home">
            <div className="hero">
              <div className="blob" ref={blobRef} aria-hidden="true" />
              <div className="ring" ref={ringRef} aria-hidden="true" />
              <i className="orb a" aria-hidden="true" />
              <i className="orb b" aria-hidden="true" />
              <i className="orb c" aria-hidden="true" />

              <h1 id="name" aria-label="Kinjal Shah">
                {heroWordsWithIndices.map(({ word, letters }) => (
                  <span key={word} className="w" aria-hidden="true">
                    {letters.map(({ letter, index }) => (
                      <span
                        key={`${word}-${index}`}
                        className="c"
                        style={{ "--i": index } as CSSProperties}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              <p className="lead">
                UI/UX designer from Bhavnagar. I design websites, landing pages
                and mobile screens, plus the brand work that goes around them:
                logos, brochures and social media.
              </p>

              <div className="cta">
                <a
                  className="btn p"
                  href="#projects"
                  onClick={(e) => scrollToSection(e, "projects")}
                >
                  See my projects
                </a>
                <a
                  className="btn"
                  href="#about"
                  onClick={(e) => scrollToSection(e, "about")}
                >
                  About me
                </a>
              </div>
            </div>

            {/* Dual Skewed Ticker */}
            <div className="tick" ref={tickRef} aria-hidden="true">
              <div id="tick">
                {tickerContent.map((label, idx) => (
                  <span key={`${label}-${idx}`}>
                    {label}
                    <i>✦</i>
                  </span>
                ))}
              </div>
              <div id="tick2" className="r">
                {tickerContent.map((label, idx) => (
                  <span key={`r-${label}-${idx}`}>
                    {label}
                    <i>✦</i>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Projects Section */}
          <section className="page" id="projects">
            <div className="bgword" aria-hidden="true" data-k=".3">
              PROJECTS
            </div>
            <AnimatedHeading text="Projects" />
            <p className="sub rv">
              Interface work and brand work. Pick a category, then open a card for
              details.
            </p>

            <div
              className="chips rv"
              id="chips"
              role="group"
              aria-label="Filter projects"
            >
              {SHOWCASE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="chip"
                  aria-pressed={currentCategory === category}
                  onClick={() => setCurrentCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid" id="grid">
              {filteredWorks.map((work, index) => (
                <button
                  key={`${currentCategory}-${work.t}`}
                  type="button"
                  className="card rv"
                  style={{ "--n": index } as CSSProperties}
                  onClick={() => openWorkDialog(work)}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div
                    className={`thumb ${work.fit === "contain" ? "thumb-contain" : ""}`}
                    style={{
                      background: `linear-gradient(135deg, ${work.g[0]}, ${work.g[1]})`,
                    }}
                  >
                    {work.imgs && work.imgs.length > 0 ? (
                      <Image
                        src={work.imgs[0].src}
                        alt={work.t}
                        fill
                        sizes="(max-width: 820px) 100vw, 340px"
                        style={{
                          objectFit: work.fit || "cover",
                          objectPosition: work.pos || "50% 15%",
                        }}
                        className="thumb-img"
                        priority={index < 4}
                      />
                    ) : (
                      <span>{work.t}</span>
                    )}
                  </div>
                  <div className="cb">
                    <small>{work.c}</small>
                    <h3>{work.t}</h3>
                    <p>{work.d}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 3. About Me Section */}
          <section className="page" id="about">
            <div className="bgword" aria-hidden="true" data-k=".3">
              ABOUT
            </div>
            <AnimatedHeading text="About me" />

            <div className="ab">
              <div>
                <p className="rv">
                  I’m a UI/UX designer with hands-on agency experience at
                  Simplifyte, where I designed website interfaces, landing pages
                  and mobile screens, and the digital and print materials that go
                  with them.
                </p>
                <p className="rv">
                  I work in Figma with Auto Layout, and I check visual hierarchy
                  before anything else. My B.Sc. in Information Technology means I
                  know what developers need from a handoff.
                </p>

                <h3 className="rv">Experience</h3>
                <div className="tl rv">
                  <b>UI/UX Designer</b>
                  <small>
                    Simplifyte Labs Private Limited · Jan 2026 – Nov 2026
                  </small>
                  <ul>
                    <li>
                      Designed website interfaces and landing pages with clients,
                      developers and internal teams.
                    </li>
                    <li>
                      Made brochures, visiting cards, logos, posters, standees,
                      social posts, mobile screens, ID cards, thumbnails and book
                      covers.
                    </li>
                    <li>
                      Used client and team feedback to improve layouts, hierarchy
                      and brand consistency.
                    </li>
                  </ul>
                </div>

                <h3 className="rv">Education</h3>
                <div className="tl rv">
                  <b>B.Sc. Information Technology</b>
                  <small>
                    Maharaja Krushnakumarsinhji Bhavnagar University · 2023 – 2026
                  </small>
                  <ul>
                    <li>
                      Web Technologies, Software Engineering, DBMS,
                      Human-Computer Interaction.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="rv ab-heading-uiux">
                  UI/UX
                </h3>
                <div className="sk">
                  {[
                    "Website UI",
                    "Landing pages",
                    "Mobile screens",
                    "Wireframing",
                    "Prototyping",
                    "Figma Auto Layout",
                    "Visual hierarchy",
                  ].map((skill, idx) => (
                    <span
                      key={skill}
                      className="rv"
                      style={{ "--d": `${idx * 55}ms` } as CSSProperties}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="rv">Graphic and brand</h3>
                <div className="sk">
                  {[
                    "Social media",
                    "Posters",
                    "Brochures",
                    "Visiting cards",
                    "ID cards",
                    "Book covers",
                    "Standees",
                    "Logos",
                  ].map((skill, idx) => (
                    <span
                      key={skill}
                      className="rv"
                      style={{ "--d": `${idx * 55}ms` } as CSSProperties}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="rv">Tools</h3>
                <div className="sk">
                  {[
                    "Figma",
                    "Canva",
                    "Photoshop",
                    "Lovable",
                    "Google Stitch",
                    "Framer",
                    "Ideogram",
                    "Brandmark",
                  ].map((skill, idx) => (
                    <span
                      key={skill}
                      className="rv"
                      style={{ "--d": `${idx * 55}ms` } as CSSProperties}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact rv" id="resume">
              <h3>Let’s work together</h3>
              <div className="contact-details">
                <a href={`mailto:${PROFILE_DATA.email}`}>{PROFILE_DATA.email}</a>
                <span className="contact-sep">·</span>
                <a href={`tel:${PROFILE_DATA.phoneRaw}`}>{PROFILE_DATA.phone}</a>
                <span className="contact-sep">·</span>
                <span>Bhavnagar, Gujarat</span>
              </div>
              <div className="contact-actions">
                <a
                  href="/Kinjal_Shah_Resume.pdf"
                  download="Kinjal_Shah_Resume.pdf"
                  className="btn"
                  id="cv2"
                  style={{ borderColor: "var(--bg)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download resume
                </a>
                <button
                  type="button"
                  className="btn"
                  style={{ borderColor: "var(--bg)" }}
                  onClick={openResumeModal}
                >
                  Preview resume
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Modal Dialog for Project Showcase */}
        <dialog
          id="dlg"
          ref={dialogRef}
          onCancel={(e) => {
            e.preventDefault();
            closeWorkDialog();
          }}
          onClick={(e) => {
            if (e.target === dialogRef.current) {
              closeWorkDialog();
            }
          }}
        >
          <button
            type="button"
            className="x"
            aria-label="Close"
            id="close"
            onClick={closeWorkDialog}
          >
            ×
          </button>
          <div id="dbody" ref={dbodyRef}>
            {selectedWork && (
              <>
                {selectedWork.imgs && selectedWork.imgs.length > 0 ? (
                  <div className="gal">
                    <div
                      className="gal-scroll"
                      ref={galleryRef}
                      onScroll={handleGalleryScroll}
                    >
                      {selectedWork.imgs.map((img, idx) => (
                        <div className="gal-item" key={img.src}>
                          <Image
                            src={img.src}
                            alt={`${selectedWork.t} - Design ${idx + 1}`}
                            width={img.w}
                            height={img.h}
                            sizes="(max-width: 860px) 100vw, 860px"
                            priority={idx === 0}
                          />
                        </div>
                      ))}
                    </div>

                    {selectedWork.imgs.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="gal-nav gal-prev"
                          aria-label="Previous photo"
                          onClick={() => scrollGallery("left")}
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className="gal-nav gal-next"
                          aria-label="Next photo"
                          onClick={() => scrollGallery("right")}
                        >
                          ›
                        </button>

                        <div className="gal-pagination">
                          <span>
                            {activeSlide + 1} / {selectedWork.imgs.length}
                          </span>
                          <div className="gal-dots">
                            {selectedWork.imgs.map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                className={`gal-dot${i === activeSlide ? " active" : ""}`}
                                aria-label={`View photo ${i + 1}`}
                                onClick={() => scrollToSlide(i)}
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div
                    className="thumb"
                    style={{
                      background: `linear-gradient(135deg, ${selectedWork.g[0]}, ${selectedWork.g[1]})`,
                    }}
                  >
                    <span>{selectedWork.t}</span>
                  </div>
                )}

                <div className="mb">
                  <small style={{ color: "var(--acc)", fontWeight: 700 }}>
                    {selectedWork.c}
                  </small>
                  <h3>{selectedWork.t}</h3>
                  <p>{selectedWork.d}</p>
                  <div className="tags">
                    {selectedWork.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </dialog>
      </div>

      <A4ResumeModal isOpen={resumeModalOpen} onClose={closeResumeModal} />
    </>
  );
}
