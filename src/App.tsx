import { useState, useEffect, useRef } from "react";
import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";

// ─── Constants ───────────────────────────────────────────

const PHOTO1 = photo1;
const PHOTO2 = photo2;
const PHOTOS = [PHOTO1, PHOTO2]; // moved outside component — never changes

const COLORS = {
  bg: "#000814",
  bg2: "#001233",
  accent: "#0353A4",
  accent2: "#023E7D",
  hi: "#CAF0F8",
  muted: "#8ecae6",
  text: "#e0f0ff",
  dim: "#6b8cae",
  border: "rgba(3,83,164,0.28)",
  borderHi: "rgba(3,83,164,0.7)",
};

const NAV_LINKS = ["about", "skills", "projects", "certifications", "contact"];

const SKILLS = [
  { title: "Security", tags: ["Nmap"] },
  { title: "Networking", tags: ["TCP/IP"] },
  { title: "Operating Systems", tags: ["Kali Linux", "Ubuntu"] },
  { title: "Programming", tags: ["Python", "C", "SQL", "JAVA"] },
  { title: "Tools & Platforms", tags: ["VirtualBox", "VMware", "TryHackMe", "HackTheBox"] },
  { title: "Concepts", tags: ["Threat Analysis", "OSINT", "Cryptography", "SOC Basics"] },
];

const PROJECTS = [
  {
    title: "Voltrix - Turf Booking",
    badge: "e-commerce",
    desc: "Built a website to help with the simple booking/cancelling of turf in your set location.",
    tags: ["HTML", "CSS", "JS"],
    github: "https://github.com/RubyTheRascal/Voltrix---Turf-Booking",
  },
  {
    title: "AI Assisted OCR Bill Summarizer",
    badge: "SaaS",
    desc: "A website to digitize your bills and then store them on your PC and then make a summary of your expenses.",
    tags: ["HTML", "CSS", "API", "Python", "SQLite", "EasyOCR", "JS"],
    github: "https://github.com/RubyTheRascal/Smart-AI-Bill-Summarizer",
  },
  {
    title: "Phishing Detectio",
    badge: "Lab",
    desc: "Set up a website that used Axios, Cheerio and Node to check whether a link is a link to a phishing website or not.",
    tags: ["Axios", "Cheerio", "Node.js", "HTML", "CSS", "JS"],
    github: "https://github.com/RubyTheRascal/Phishing-Detector",
  },
];

const CERTS = [
  { name: "Programming in C", meta: "NPTEL", status: "earned" },
  { name: "Programming in JAVA", meta: "NPTEL", status: "earned" },
  { name: "TryHackMe — Jr Penetration Tester", meta: "TryHackMe · 2024", status: "in progress" },
  { name: "eJPT — eLearnSecurity Junior PT", meta: "INE / eLearnSecurity · In Progress", status: "progress" },
];

const CONTACT_LINKS = [
  {
    label: "email",
    value: "rubenabrahamabraham@gmail.com",
    href: "mailto:rubenabrahamabraham@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/ruben-abraham-abraham",
    href: "https://linkedin.com/in/ruben-abraham-abraham",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "github",
    value: "github.com/RubyTheRascal",
    href: "https://github.com/RubyTheRascal",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "tryhackme",
    value: "tryhackme.com/p/rubbsss",
    href: "https://tryhackme.com/p/rubbsss",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 2a5 5 0 0 1 5 5c0 1.8-.95 3.37-2.37 4.24A7 7 0 0 1 19 18H5a7 7 0 0 1 4.37-6.76A5 5 0 0 1 12 2z" />
        <line x1="8" y1="22" x2="16" y2="22" />
        <line x1="12" y1="18" x2="12" y2="22" />
      </svg>
    ),
  },
];

// ─── Hooks ───────────────────────────────────────────────

function useCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => !v), 550);
    return () => clearInterval(t);
  }, []);
  return visible;
}

function useInView(threshold = 0.15) {
  // properly typed — no more "as any"
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ─── Typography ───────────────────────────────────────────

const mono = { fontFamily: "'JetBrains Mono', 'Fira Mono', monospace" };
const head = { fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif" };
const body = { fontFamily: "'Inter', system-ui, sans-serif" };

// ─── Nav ─────────────────────────────────────────────────

interface NavProps {
  active: string;
}

function Nav({ active }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useWindowWidth() < 768;

  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(0,8,20,0.94)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem", height: 56,
      } as React.CSSProperties}>
        <span style={{ ...mono, fontSize: 14, color: COLORS.hi, letterSpacing: "0.04em" } as React.CSSProperties}>
          <span style={{ color: COLORS.accent }}>//</span> Ruben.sec
        </span>

        {isMobile ? (
          // Hamburger button for mobile
          <button
            id="nav-menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            style={{
              background: "none", border: `1px solid ${COLORS.border}`,
              color: COLORS.muted, cursor: "pointer",
              padding: "6px 10px", borderRadius: 6,
              ...mono, fontSize: 18, lineHeight: 1,
            } as React.CSSProperties}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        ) : (
          <div style={{ display: "flex", gap: "1.6rem" }}>
            {NAV_LINKS.map((l) => (
              <button key={l} id={`nav-${l}`} onClick={() => scroll(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                ...mono, fontSize: 12, letterSpacing: "0.05em",
                color: active === l ? COLORS.hi : COLORS.dim,
                transition: "color 0.2s", padding: 0,
              } as React.CSSProperties}>{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 56, left: 0, right: 0, zIndex: 99,
          background: "rgba(0,8,20,0.97)", backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex", flexDirection: "column",
        }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              id={`nav-mobile-${l}`}
              onClick={() => scroll(l)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                ...mono, fontSize: 13, letterSpacing: "0.05em",
                color: active === l ? COLORS.hi : COLORS.dim,
                padding: "0.9rem 2.5rem", textAlign: "left",
                borderBottom: `1px solid ${COLORS.border}`,
              } as React.CSSProperties}
            >{l}</button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Slideshow ───────────────────────────────────────────

function Slideshow() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % PHOTOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []); // PHOTOS is a module-level constant — no dep needed

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: 420,
      aspectRatio: "1 / 1",
      borderRadius: 16,
      overflow: "hidden",
      background: COLORS.bg2,
      boxShadow: "0 10px 30px rgba(1,10,30,0.6)",
    }}>
      {PHOTOS.map((photo, idx) => (
        <img
          key={idx}
          src={photo}
          alt={`Ruben Abraham — photo ${idx + 1}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: idx === 0 ? "28% 28%" : "center",
            filter: idx === 0 ? "contrast(1.04) saturate(1.06)" : undefined,
            opacity: idx === currentPhoto ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(to right, rgba(202, 240, 248, 0.1), rgba(202, 240, 248, 0))",
        pointerEvents: "none",
      }} />

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: 12, left: "50%",
        transform: "translateX(-50%)", display: "flex", gap: 6,
      }}>
        {PHOTOS.map((_, idx) => (
          <div
            key={idx}
            role="button"
            aria-label={`Show photo ${idx + 1}`}
            style={{
              width: 8, height: 8, borderRadius: "50%",
              background: idx === currentPhoto ? COLORS.accent : "rgba(3,83,164,0.4)",
              transition: "background 0.3s", cursor: "pointer",
            }}
            onClick={() => setCurrentPhoto(idx)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────

function Hero() {
  const cursor = useCursor();
  const isMobile = useWindowWidth() < 768;
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center",
      padding: isMobile ? "6rem 1.5rem 3rem" : "7rem 3rem 4rem",
      position: "relative", overflow: "hidden",
      background: `radial-gradient(ellipse 55% 45% at 65% 42%, rgba(3,83,164,0.13) 0%, transparent 68%), ${COLORS.bg}`,
    } as React.CSSProperties}>
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column-reverse" : "row",
        alignItems: "center",
        gap: isMobile ? "2rem" : "3rem",
        justifyContent: "space-between",
      }}>
        <div style={{ flex: 1, width: "100%" }}>
          <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.1rem" } as React.CSSProperties}>
            // cybersecurity &amp; IT student
          </div>
          <h1 style={{
            ...head,
            fontSize: isMobile ? "clamp(2rem,10vw,3rem)" : "clamp(2.8rem,6vw,5rem)",
            fontWeight: 700, lineHeight: 1.05,
            background: `linear-gradient(135deg, ${COLORS.hi} 0%, ${COLORS.muted} 100%)`,
            backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "0.4rem",
          } as React.CSSProperties}>
            Ruben Abraham Abraham
            <span style={{
              display: "inline-block", width: 3, height: "0.85em",
              background: COLORS.accent, verticalAlign: "text-bottom",
              marginLeft: 4, opacity: cursor ? 1 : 0, transition: "opacity 0.1s",
            } as React.CSSProperties} />
          </h1>
          <div style={{
            ...head,
            fontSize: isMobile ? "1rem" : "clamp(1rem,2.5vw,1.5rem)",
            fontWeight: 400, color: COLORS.muted, marginBottom: "1.3rem",
          } as React.CSSProperties}>
            Securing systems. Thinking like an attacker.
          </div>
          <p style={{ maxWidth: 520, color: COLORS.dim, fontSize: 15, lineHeight: 1.78, marginBottom: "2.4rem" }}>
            Passionate cybersecurity and IT student building expertise in network defense, ethical hacking, and security analysis. Always learning, always probing.
          </p>
          <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
            <button id="hero-view-projects" onClick={() => scroll("projects")} style={{
              background: COLORS.accent, color: "#fff", border: "none",
              padding: "0.65rem 1.5rem", borderRadius: 6,
              ...head, fontSize: 14, fontWeight: 500, cursor: "pointer",
            } as React.CSSProperties}>View Projects</button>
            <button id="hero-contact" onClick={() => scroll("contact")} style={{
              background: "transparent", color: COLORS.muted,
              border: `1px solid ${COLORS.borderHi}`, padding: "0.65rem 1.5rem",
              borderRadius: 6, ...head, fontSize: 14, fontWeight: 500, cursor: "pointer",
            } as React.CSSProperties}>Get in Touch</button>
          </div>
        </div>

        <div style={{
          flex: isMobile ? "unset" : 0.6,
          width: isMobile ? "min(260px, 70vw)" : undefined,
          display: "flex", justifyContent: "center", alignItems: "center",
        }}>
          <Slideshow />
        </div>
      </div>

      <div style={{ display: "flex", gap: isMobile ? "1.5rem" : "2.5rem", marginTop: "3rem", flexWrap: "wrap" }}>
        {[["2", "Projects"], ["4", "Certifications"], ["3", "Years Learning"]].map(([n, l]) => (
          <div key={l} style={{ borderLeft: `2px solid ${COLORS.borderHi}`, paddingLeft: "1rem" }}>
            <div style={{ ...head, fontSize: "1.5rem", fontWeight: 700, color: COLORS.hi } as React.CSSProperties}>{n}</div>
            <div style={{ ...mono, fontSize: 11, color: COLORS.dim, letterSpacing: "0.06em" } as React.CSSProperties}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section Head ─────────────────────────────────────────

interface SectionHeadProps {
  eyebrow: string;
  title: string;
}

function SectionHead({ eyebrow, title }: SectionHeadProps) {
  return (
    <div style={{ marginBottom: "2.2rem" }}>
      <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" } as React.CSSProperties}>{eyebrow}</div>
      <h2 style={{ ...head, fontSize: "clamp(1.6rem,3vw,2.1rem)", fontWeight: 700, color: COLORS.hi } as React.CSSProperties}>{title}</h2>
    </div>
  );
}

// ─── FadeIn ───────────────────────────────────────────────

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

function FadeIn({ children, delay = 0 }: FadeInProps) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(22px)",
      transition: `opacity 0.55s ${delay}s ease, transform 0.55s ${delay}s ease`,
    } as React.CSSProperties}>
      {children}
    </div>
  );
}

// ─── About ───────────────────────────────────────────────

function About() {
  const isMobile = useWindowWidth() < 768;
  return (
    <section id="about" style={{ padding: isMobile ? "4rem 1.5rem" : "5rem 3rem", background: COLORS.bg }}>
      <FadeIn>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "3rem", alignItems: "flex-start", marginBottom: "3rem",
          }}>
            <div style={{ flex: 1 }}>
              <h2 style={{
                ...head,
                fontSize: isMobile ? "2rem" : "clamp(2rem,4vw,3.2rem)",
                fontWeight: 700, color: COLORS.hi, margin: "0 0 1.2rem 0",
              }}>
                Why hello there!
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ color: COLORS.dim, fontSize: 15, lineHeight: 1.75, margin: 0 }}>
                  I enjoy the pursuit of craft, solving complex problems, and mentoring others. Security isn't just a field, it's a puzzle I'm obsessed with solving.
                </p>
                <p style={{ color: COLORS.dim, fontSize: 15, lineHeight: 1.75, margin: 0 }}>
                  I'm inquisitive by nature and love exploring this beautiful world of defensive techniques and attack patterns. I also enjoy hands-on projects that challenge my current understanding.
                </p>
                <p style={{ color: COLORS.dim, fontSize: 15, lineHeight: 1.75, margin: 0 }}>
                  Outside of work I enjoy travel, hiking, photography, and expanding my toolkit of technical skills.
                </p>
              </div>
            </div>

            {!isMobile && (
              <div style={{ flex: 0.5, display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: 260, height: 300, borderRadius: 16, overflow: "hidden", border: `4px solid ${COLORS.bg2}`, boxShadow: "0 8px 20px rgba(1,10,30,0.5)", flexShrink: 0 }}>
                  <img src={PHOTO1} alt="Ruben Abraham" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                </div>
              </div>
            )}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: "1.5rem",
            paddingTop: "2rem",
            borderTop: `1px solid ${COLORS.border}`,
          }}>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>College</div>
              <div style={{ color: COLORS.hi, fontSize: 14, fontWeight: 500 }}>Amal Jyothi College of Engineering, Kanjirappally, Kerala</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Branch &amp; Year</div>
              <div style={{ color: COLORS.hi, fontSize: 15, fontWeight: 500 }}>B.Tech IT — S7</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Superpower</div>
              <div style={{ color: COLORS.hi, fontSize: 15, fontWeight: 500 }}>Lab environment design</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Schooling</div>
              <div style={{ color: COLORS.hi, fontSize: 14 }}>Matha Senior Secondary School, Thumpoly, Alappuzha (2023)</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Passion</div>
              <div style={{ color: COLORS.hi, fontSize: 14 }}>Ethical hacking &amp; defense</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>CGPA</div>
              <div style={{ color: COLORS.hi, fontSize: 14 }}>9.16</div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────

function Skills() {
  const isMobile = useWindowWidth() < 768;
  return (
    <section id="skills" style={{
      padding: isMobile ? "4rem 1.5rem" : "5rem 3rem",
      background: COLORS.bg2,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <FadeIn>
        <SectionHead eyebrow="// 02 — skills" title="Technical Skills" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.1rem" }}>
          {SKILLS.map(({ title, tags }) => (
            <div key={title} style={{
              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "1.2rem",
            }}>
              <div style={{ ...head, fontSize: 13, fontWeight: 500, color: COLORS.muted, marginBottom: "0.75rem", letterSpacing: "0.04em" } as React.CSSProperties}>{title}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {tags.map((t) => (
                  <span key={t} style={{
                    ...mono, fontSize: 11,
                    background: "rgba(3,83,164,0.13)", color: COLORS.muted,
                    border: `1px solid ${COLORS.border}`, borderRadius: 4,
                    padding: "3px 8px",
                  } as React.CSSProperties}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────

function Projects() {
  const isMobile = useWindowWidth() < 768;
  return (
    <section id="projects" style={{ padding: isMobile ? "4rem 1.5rem" : "5rem 3rem", background: COLORS.bg }}>
      <FadeIn>
        <SectionHead eyebrow="// 03 — projects" title="Featured Work" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.4rem" }}>
          {PROJECTS.map(({ title, badge, desc, tags, github }) => (
            <ProjectCard key={title} title={title} badge={badge} desc={desc} tags={tags} github={github} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── ProjectCard ─────────────────────────────────────────

interface ProjectCardProps {
  title: string;
  badge: string;
  desc: string;
  tags: string[];
  github?: string;
}

function ProjectCard({ title, badge, desc, tags, github }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [ghHovered, setGhHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.bg2,
        border: `1px solid ${hovered ? COLORS.accent : COLORS.border}`,
        borderRadius: 10, padding: "1.4rem",
        transition: "border-color 0.2s",
        cursor: "default",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.7rem" }}>
        <div style={{ ...head, fontSize: 16, fontWeight: 500, color: COLORS.hi } as React.CSSProperties}>{title}</div>
        <span style={{
          ...mono, fontSize: 10, color: COLORS.accent,
          background: "rgba(3,83,164,0.12)", border: `1px solid ${COLORS.border}`,
          borderRadius: 4, padding: "2px 8px",
          whiteSpace: "nowrap", marginLeft: 8,
        } as React.CSSProperties}>{badge}</span>
      </div>
      <p style={{ fontSize: 13, color: COLORS.dim, lineHeight: 1.65, marginBottom: "1rem" }}>{desc}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {tags.map((t) => (
            <span key={t} style={{
              fontSize: 11, ...mono, color: COLORS.dim,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid rgba(3,83,164,0.2)`,
              borderRadius: 4, padding: "2px 7px",
            } as React.CSSProperties}>{t}</span>
          ))}
        </div>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} on GitHub`}
            onMouseEnter={() => setGhHovered(true)}
            onMouseLeave={() => setGhHovered(false)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: ghHovered ? "rgba(3,83,164,0.28)" : "rgba(3,83,164,0.10)",
              border: `1px solid ${ghHovered ? COLORS.borderHi : COLORS.border}`,
              color: ghHovered ? COLORS.hi : COLORS.muted,
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s",
              boxShadow: ghHovered ? "0 0 10px rgba(3,83,164,0.4)" : "none",
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Certifications ───────────────────────────────────────

function Certifications() {
  const isMobile = useWindowWidth() < 768;
  return (
    <section id="certifications" style={{
      padding: isMobile ? "4rem 1.5rem" : "5rem 3rem",
      background: COLORS.bg2,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <FadeIn>
        <SectionHead eyebrow="// 04 — certifications" title="Credentials" />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {CERTS.map(({ name, meta, status }) => (
            <div key={name} style={{
              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "1rem 1.4rem",
              display: "flex", alignItems: "center", gap: "1.1rem",
              flexWrap: "wrap",
            }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.accent, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...head, fontSize: 14, fontWeight: 500, color: COLORS.hi } as React.CSSProperties}>{name}</div>
                <div style={{ fontSize: 12, color: COLORS.dim }}>{meta}</div>
              </div>
              <span style={{
                ...mono, fontSize: 11, padding: "2px 9px", borderRadius: 4,
                border: `1px solid ${status === "earned" ? "rgba(74,222,128,0.35)" : COLORS.border}`,
                color: status === "earned" ? "#4ade80" : COLORS.muted,
                background: status === "earned" ? "rgba(74,222,128,0.07)" : "rgba(3,83,164,0.1)",
                whiteSpace: "nowrap",
              } as React.CSSProperties}>{status === "earned" ? "earned" : "in progress"}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

function Contact() {
  const isMobile = useWindowWidth() < 768;
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const update = (k: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/rubenabrahamabraham@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _replyto: form.email,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: COLORS.bg2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 6,
    padding: "0.65rem 0.9rem",
    color: COLORS.text,
    ...body,
    fontSize: 14,
    outline: "none",
    resize: "none",
    boxSizing: "border-box",
  };

  return (
    <section id="contact" style={{ padding: isMobile ? "4rem 1.5rem" : "5rem 3rem", background: COLORS.bg }}>
      <FadeIn>
        <SectionHead eyebrow="// 05 — contact" title="Get In Touch" />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}>
          {/* Left: contact info */}
          <div>
            <p style={{ color: COLORS.dim, fontSize: 15, lineHeight: 1.75, marginBottom: "1.5rem" }}>
              I'm actively looking for internships, collaborations, and security projects. Whether you want to work together or just talk cybersecurity — reach out.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {CONTACT_LINKS.map(({ label, value, href, icon }) => (
                <div key={label} style={{ display: "flex", gap: "0.85rem", alignItems: "center", fontSize: 14 }}>
                  {/* Icon button */}
                  <a
                    href={href}
                    target={label === "email" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={`Open ${label}`}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                      background: "rgba(3,83,164,0.12)",
                      border: `1px solid ${COLORS.border}`,
                      color: COLORS.muted,
                      textDecoration: "none",
                      transition: "background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(3,83,164,0.28)";
                      e.currentTarget.style.borderColor = COLORS.borderHi;
                      e.currentTarget.style.color = COLORS.hi;
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(3,83,164,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(3,83,164,0.12)";
                      e.currentTarget.style.borderColor = COLORS.border;
                      e.currentTarget.style.color = COLORS.muted;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {icon}
                  </a>
                  {/* Text link */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ ...mono, fontSize: 10, color: COLORS.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 } as React.CSSProperties}>
                      {label}
                    </div>
                    <a
                      href={href}
                      target={label === "email" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      style={{ color: COLORS.dim, textDecoration: "none", fontSize: 13, wordBreak: "break-all" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.muted)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.dim)}
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <form id="contact-form" onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <input
              id="contact-name"
              value={form.name}
              onChange={update("name")}
              placeholder="Your name"
              required
              style={inputStyle}
            />
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="Your email"
              required
              style={inputStyle}
            />
            <textarea
              id="contact-message"
              value={form.message}
              onChange={update("message")}
              rows={4}
              placeholder="Message..."
              required
              style={inputStyle}
            />
            <button
              id="contact-submit"
              type="submit"
              disabled={status === "sending"}
              style={{
                alignSelf: "flex-start",
                background: status === "sending" ? COLORS.accent2 : COLORS.accent,
                color: "#fff", border: "none",
                padding: "0.65rem 1.5rem", borderRadius: 6,
                ...head, fontSize: 14, fontWeight: 500,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                opacity: status === "sending" ? 0.75 : 1,
                transition: "opacity 0.2s",
              } as React.CSSProperties}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <div style={{
                ...mono, fontSize: 12, color: "#4ade80",
                background: "rgba(74,222,128,0.07)",
                border: "1px solid rgba(74,222,128,0.3)",
                borderRadius: 6, padding: "0.65rem 0.9rem",
              } as React.CSSProperties}>
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div style={{
                ...mono, fontSize: 12, color: "#f87171",
                background: "rgba(248,113,113,0.07)",
                border: "1px solid rgba(248,113,113,0.3)",
                borderRadius: 6, padding: "0.65rem 0.9rem",
              } as React.CSSProperties}>
                ✗ Something went wrong. Try emailing me directly.
              </div>
            )}
          </form>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────

function Footer() {
  const isMobile = useWindowWidth() < 768;
  return (
    <footer style={{
      borderTop: `1px solid ${COLORS.border}`,
      padding: isMobile ? "1.2rem 1.5rem" : "1.4rem 3rem",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.5rem",
      background: COLORS.bg,
    }}>
      <span style={{ ...mono, fontSize: 12, color: COLORS.dim } as React.CSSProperties}>
        © 2025 <span style={{ color: COLORS.accent }}>Ruben Abraham</span>
      </span>
      <span style={{ ...mono, fontSize: 12, color: COLORS.dim } as React.CSSProperties}>
        built with intention.
      </span>
    </footer>
  );
}

// ─── Reactive Background ─────────────────────────────────

function ReactiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onResize = () => resize();
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    // ── Particles ──
    const COUNT = 60;
    const CONNECT = 145;   // max px to draw a line
    const MOUSE_R = 110;   // repulsion radius

    interface P { x: number; y: number; vx: number; vy: number; r: number; }

    const pts: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 1.3 + 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of pts) {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_R * MOUSE_R && d2 > 0) {
          const d = Math.sqrt(d2);
          const force = ((MOUSE_R - d) / MOUSE_R) * 0.9;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        // Damping so they don't fly off forever
        p.vx *= 0.965;
        p.vy *= 0.965;

        // Keep a minimum drift
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd < 0.12) {
          p.vx += (Math.random() - 0.5) * 0.08;
          p.vy += (Math.random() - 0.5) * 0.08;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges seamlessly
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw dot — lighter color works better with screen blend mode
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(80,160,255,0.75)";
        ctx.fill();
      }

      // Draw connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT * CONNECT) {
            const alpha = (1 - Math.sqrt(d2) / CONNECT) * 0.22;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(80,160,255,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Soft cursor glow
      if (mouse.x > -999) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        g.addColorStop(0, "rgba(80,160,255,0.18)");
        g.addColorStop(1, "rgba(80,160,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 50,
        pointerEvents: "none",
        mixBlendMode: "screen",  // disappears over light text, glows on dark bg
      } as React.CSSProperties}
    />
  );
}

// ─── Root ────────────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      // If within 50px of the bottom, always highlight the last section (contact)
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (nearBottom) {
        setActiveSection(NAV_LINKS[NAV_LINKS.length - 1]);
        return;
      }

      for (const id of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          return;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Canvas floats above content, below nav — pointer-events:none so clicks pass through */}
      <ReactiveBackground />

      <div style={{ color: COLORS.text, minHeight: "100vh", ...body } as React.CSSProperties}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          ::selection { background: rgba(3,83,164,0.4); }
          input::placeholder, textarea::placeholder { color: #6b8cae; }
          button:hover { opacity: 0.88; }
          a { transition: color 0.2s; }
          body { font-family: 'Inter', system-ui, sans-serif; background: #000814; }
        `}</style>
        <Nav active={activeSection} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
