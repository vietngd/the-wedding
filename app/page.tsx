"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type KeyboardEvent,
  type CSSProperties,
  type ChangeEvent,
} from "react";

// ── Image paths ──
const IMAGES = {
  hero: "/images/wedding/wedding-2.jpg",
  couple: "/images/wedding/wedding-22.jpg",
  story1: "/images/wedding/wedding-3.jpg",
  story2: "/images/wedding/wedding-5.jpg",
  story3: "/images/wedding/wedding-14.jpg",
  story4: "/images/wedding/wedding-6.jpg",
  story5: "/images/wedding/wedding-1.jpg",
  story6: "/images/wedding/wedding-15.jpg",
  // story7: "/images/wedding/wedding-15.jpg",
  qrChure: "/images/wedding/qr_chure.jpg",
  qrCodau: "/images/wedding/qr_codau.jpg",
  gallery: [
    "/images/wedding/wedding-9.jpg",
    "/images/wedding/wedding-4.jpg",
    "/images/wedding/wedding-11.jpg",
    "/images/wedding/wedding-17.jpg",
    "/images/wedding/wedding-19.jpg",
    "/images/wedding/wedding-8.jpg",
    "/images/wedding/wedding-16.jpg",
    "/images/wedding/wedding-7.jpg",
    "/images/wedding/wedding-18.jpg",
    "/images/wedding/wedding-21.jpg",
    "/images/wedding/wedding-23.jpg",
    "/images/wedding/wedding-20.jpg",
    "/images/wedding/wedding-12.jpg",
  ],
};

// ── Wedding info ──
const WEDDING = {
  groomName: "Đức Việt",
  brideName: "Thoa Nguyễn",
  date: "2026-05-10T11:00:00",
  dateDisplay: "09 . 05 . 2026",
  lunarDate: "Tức 23 tháng 3 Âm lịch",
  events: [
    {
      id: "dan-trau",
      title: "Lễ Dẫn Trầu",
      date: "09 . 05 . 2026",
      lunarDate: "Tức 23 tháng 3 Âm lịch",
      relativeDay: "Thứ Bảy",
      time: "09:00",
      venue: "Tư gia",
      address: "Thôn Phù Lưu, Xã Yên Phong, Tỉnh Bắc Ninh",
    },
    {
      id: "dai-le",
      title: "Lễ Thành Hôn",
      date: "10 . 05 . 2026",
      lunarDate: "Tức 24 tháng 3 Âm lịch",
      relativeDay: "Chủ Nhật",
      time: "14:00",
      venue: "Tư gia",
      address: "Thôn Phù Lưu, Xã Yên Phong, Tỉnh Bắc Ninh",
    },
  ],
  venueLocation: {
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Th%C3%B4n+Ph%C3%B9+L%C6%B0u%2C+X%C3%A3+Y%C3%AAn+Phong%2C+T%E1%BB%89nh+B%E1%BA%AFc+Ninh&z=15&output=embed",
    mapsOpenUrl:
      "https://www.google.com/maps/search/?api=1&query=Th%C3%B4n+Ph%C3%B9+L%C6%B0u%2C+X%C3%A3+Y%C3%AAn+Phong%2C+T%E1%BB%89nh+B%E1%BA%AFc+Ninh",
  },
};

// ── SVG Icons as components ──
function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 110 8h-1" />
      <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function RingIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="14" r="8" />
      <path d="M9 3l3 4 3-4" />
      <path d="M12 7v3" />
    </svg>
  );
}

function WalkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="4" r="2" />
      <path d="M15 22l-3-8-3 8" />
      <path d="M9 14l-2-4 5-2 5 2-2 4" />
    </svg>
  );
}

// ── Floating petals ──
function FloatingPetals() {
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      left: string;
      size: number;
      duration: number;
      delay: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 8 + Math.random() * 10,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 10,
        opacity: 0.2 + Math.random() * 0.3,
      })),
    );
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="petals-container">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ── Countdown Hook ──
function useCountdown(targetDate: string) {
  const calculate = useCallback(() => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  // Start with zeros to avoid SSR mismatch (Date.now() differs server vs client)
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    setTime(calculate());
    const timer = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(timer);
  }, [calculate]);
  return time;
}

// ── Typewriter Hook ──
function useTypewriter(text: string, speed = 50, startDelay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay, started]);

  return { displayed, done, start };
}

// ── Intersection Observer for scroll animations ──
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const el = ref.current;
    if (el) {
      // Observe existing children
      const observeChildren = (parent: Element) => {
        const children = parent.querySelectorAll(".animate-on-scroll");
        children.forEach((c) => observer.observe(c));
      };

      observeChildren(el);

      // Mutation observer to handle dynamically added elements (like new wishes)
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              if (node.classList.contains("animate-on-scroll")) {
                observer.observe(node);
              }
              // Also check children of added nodes
              observeChildren(node);
            }
          });
        });
      });

      mutationObserver.observe(el, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
      };
    }
  }, []);

  return ref;
}

// ═══════════════════════════════════════════
//  SECTION COMPONENTS
// ═══════════════════════════════════════════

// ── 1. Hero Section ──
function HeroSection({
  guestName,
  partnerName,
}: {
  guestName: string;
  partnerName: string;
}) {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg">
        <img src={IMAGES.hero} alt="Wedding hero" />
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-label">Wedding Invitation</p>
        <h1 className="hero-title">{WEDDING.groomName}</h1>
        <span className="hero-ampersand">&amp;</span>
        <h1 className="hero-title">{WEDDING.brideName}</h1>
        <p className="hero-tagline">
          &ldquo;Nơi tình yêu bắt đầu chương mới&rdquo;
        </p>
        <p className="hero-date !font-elegant">
          {WEDDING.dateDisplay}
          <br />({WEDDING.lunarDate})
        </p>
      </div>

      <div className="scroll-indicator" onClick={scrollDown}>
        <ChevronDown />
      </div>
    </section>
  );
}



type LandingScreenProps = {
  onStart: (guest: string, partner: string) => void;
  initialGuest?: string;
  initialPartner?: string;
};


function LandingScreen({
  onStart,
  initialGuest = DEFAULT_GUEST_NAME,
  initialPartner = DEFAULT_PARTNER_NAME,
}: LandingScreenProps) {
  const [guest, setGuest] = useState(initialGuest);
  const [partner, setPartner] = useState(initialPartner);
  const [isClosing, setIsClosing] = useState(false);
  const [isEnvelopeAnimated, setIsEnvelopeAnimated] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

    const handleStart = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsEnvelopeAnimated(true);

    const finalGuest = guest.trim() || DEFAULT_GUEST_NAME;
    const finalPartner = partner.trim() || DEFAULT_PARTNER_NAME;

    closeTimerRef.current = window.setTimeout(() => {
      onStart(finalGuest, finalPartner);
    }, 300);
  };


  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center overflow-hidden px-4 transition-all duration-500 ease-out ${
        isClosing
          ? "opacity-0 scale-95 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#f7f3ee]" />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[25%] w-[280px] h-[280px] bg-[#f5d97a]/30 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[240px] h-[240px] bg-[#ffd1dc]/30 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Title */}
        <p className="text-[12px] font-elegant tracking-[0.35em] text-[#9c8f87] uppercase">
          Trân trọng kính mời
        </p>
        <div className="mt-8 !text-[60px] space-y-3 opacity-70 landing-tagline">
          Bạn và Người thương
        </div>

        {/* Envelope */}
       <div
          className="mt-10 relative w-[240px] h-[160px] group cursor-pointer transition-all duration-[1100ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
        style={
            isEnvelopeAnimated
              ? {
                  transform: "translate(-180%, -20%) rotate(-360deg) scale(0.92)",
                  opacity: 0,
                }
              : undefined
          }
          onClick={handleStart}
        >
          {/* Shadow */}
          <div className="absolute inset-0 translate-y-4 blur-xl opacity-30 bg-black rounded-xl" />

          {/* Body */}
          <div className="absolute inset-0 rounded-xl bg-[#f4efe8] border border-[#e5d8c8] shadow-md" />

          {/* Flap */}
          <div
            className="
              absolute top-0 left-0 w-full h-[50%]
              origin-top
              bg-[#efe6db]
              z-20
              transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:-rotate-x-[160deg]
            "
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />

          {/* Seal */}
          <div
            className="
              absolute top-[45%] left-1/2 -translate-x-1/2 z-30
              w-[36px] h-[36px] rounded-full
              bg-gradient-to-br from-[#e6c27a] via-[#d4a373] to-[#b8895c]
              shadow-md flex items-center justify-center
              text-white text-[14px]
              transition duration-500
              group-hover:scale-110
              overflow-hidden
            "
          >
            囍
            <div className="absolute inset-0 bg-white/40 blur-md opacity-0 group-hover:opacity-100 group-hover:animate-[foil_1.5s_ease]" />
          </div>
        </div>

        {/* Date */}
        <p className="!mt-5 text-[14px] text-[#8c7b70] tracking-widest font-elegant">
          10.05.2026
        </p>
      </div>
    </div>
  );
}

// ...existing code...

// ...existing code...

// ...existing code...
const DEFAULT_GUEST_NAME = "Bạn";
const DEFAULT_PARTNER_NAME = "Người thương";

// ── 2. Couple Names Section ──
function CoupleSection() {
  return (
    <section className="wedding-section couple-section" id="couple">
      <div className="animate-on-scroll scale-in flex justify-center">
        <div className="couple-portrait-bling">
          <span className="couple-sparkle" aria-hidden="true">
            ✦
          </span>
          <span className="couple-sparkle" aria-hidden="true">
            ✧
          </span>
          <span className="couple-sparkle" aria-hidden="true">
            ✦
          </span>
          <span className="couple-sparkle" aria-hidden="true">
            ✧
          </span>
          <span className="couple-sparkle" aria-hidden="true">
            ✦
          </span>
          <span className="couple-sparkle" aria-hidden="true">
            ✧
          </span>
          {/* Border ngoài → khoảng trắng 4px → ring gradient + ảnh */}
          <div className="relative z-[1] rounded-full border-2 border-[#d4af6a] bg-white p-[4px] shadow-[0_10px_36px_rgba(58,42,34,0.12),0_0_1px_rgba(201,169,110,0.5)]">
            <div className="couple-gradient-ring-bling rounded-full p-2 shadow-[0_4px_20px_rgba(196,139,139,0.3)]">
              <img
                src={IMAGES.couple}
                alt="Couple portrait"
                width={200}
                height={200}
                className="relative z-[1] h-[200px] w-[200px] rounded-full object-cover ring-2 ring-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="animate-on-scroll delay-200 !mt-2">
        <p className="announcement !font-elegant">Hân hoan thông báo</p>
      </div>

      <div className="animate-on-scroll delay-300">
        <div className="couple-names-container">
          <span className="couple-name">{WEDDING.groomName}</span>
          <span className="couple-amp">&amp;</span>
          <span className="couple-name">{WEDDING.brideName}</span>
        </div>
      </div>

      <div className="ornament-divider animate-on-scroll delay-400">
        <span className="line" />
        <span className="icon">✿</span>
        <span className="line" />
      </div>

      <div className="animate-on-scroll delay-500 px-4">
        <div className="couple-description text-center leading-loose">
          Trân trọng kính mời bạn cùng người thương
          <br />
          đến chung vui trong ngày lễ trọng đại của chúng tôi
          <br />
        </div>
        <div className="couple-description inline-block px-8 pt-3 pb-1 mt-5 rounded-3xl min-w-[220px] bg-gradient-to-r from-[#f8e8e0] via-[#fdfbfb] to-[#f8e8e0] border border-[#d4a5a5]/40 text-[#c48b8b] font-semibold tracking-wide shadow-sm">
          Lúc 17h00 <br />
          09-05-2026 <br />
          <span className="text-[14px] font-medium italic opacity-85">
            (Tức 23 tháng 3 Âm lịch)
          </span>
        </div>
      </div>
    </section>
  );
}

// ── 3. Introduction Section ──
function IntroductionSection() {
  return (
    <section
      className="wedding-section pb-24 pt-12 relative overflow-hidden"
      id="introduction"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8e8e0] rounded-full filter blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f0d5d5] rounded-full filter blur-3xl opacity-40 -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="animate-on-scroll mb-16">
        <p className="section-title-script">Chú Rể & Cô Dâu</p>
        <p className="section-subtitle">Hai mảnh ghép hoàn hảo</p>
        <div className="ornament-divider mt-4">
          <span className="line" />
          <span className="icon">🌿</span>
          <span className="line" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 lg:gap-16 px-4">
        {/* Chú rể */}
        <div className="flex flex-col items-center animate-on-scroll slide-left delay-200 group w-full md:w-[45%]">
          <div className="relative w-64 h-[22rem] md:w-72 md:h-[26rem] rounded-t-full rounded-b-3xl overflow-hidden border-[6px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:-translate-y-2">
            <img
              src="/images/wedding/wedding-10.jpg"
              alt="Chú rể"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="text-center bg-white/80 backdrop-blur-md pt-8 pb-6 px-8 rounded-3xl shadow-[0_8px_30px_rgba(212,165,165,0.25)] -mt-16 relative z-10 w-[85%] md:w-[90%] border border-white/60 group-hover:bg-white transition-colors duration-500">
            <p className="text-[#c48b8b] text-[13px] font-bold uppercase tracking-[0.2em] mb-2 !font-elegant">
              Chú rể
            </p>
            <h3 className="font-elegant text-[28px] md:text-[32px] font-semibold text-[#3a2a22] mb-1 !font-elegant">
              Nguyễn Đức Việt
            </h3>
            <div className="flex items-center justify-center gap-2 mb-3">
              <CalendarIcon className="w-4 h-4 text-[#c9956b]" />
              <p className="font-elegant text-[#c9956b] text-[16px] tracking-wide">
                08 / 10 / 2002
              </p>
            </div>
            <p className="text-[#8a7a72] text-[14px] italic leading-relaxed !font-elegant">
              "Chàng trai trưởng thành, ấm áp, luôn mang lại niềm vui và là chỗ
              dựa vững chắc cho gia đình nhỏ."
            </p>
          </div>
        </div>

        {/* Heart separator */}
        <div className="animate-on-scroll delay-300 flex flex-col items-center justify-center my-4 md:my-0 shrink-0">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#d4a5a5]/80 to-[#d4a5a5]/80 hidden md:block"></div>
          <div className="w-14 h-14 rounded-full bg-[#f8e8e0] border border-[#d4a5a5]/40 flex items-center justify-center my-4 shadow-[0_0_20px_rgba(212,165,165,0.3)] animate-[pulse_3s_ease-in-out_infinite]">
            <HeartIcon className="w-6 h-6 text-[#c48b8b]" />
          </div>
          <div className="w-[1px] h-20 bg-gradient-to-t from-transparent via-[#d4a5a5]/80 to-[#d4a5a5]/80 hidden md:block"></div>
        </div>

        {/* Cô dâu */}
        <div className="flex flex-col items-center animate-on-scroll slide-right delay-400 group w-full md:w-[45%]">
          <div className="relative w-64 h-[22rem] md:w-72 md:h-[26rem] rounded-t-full rounded-b-3xl overflow-hidden border-[6px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:-translate-y-2">
            <img
              src="/images/wedding/wedding-3.jpg"
              alt="Cô dâu"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="text-center bg-white/80 backdrop-blur-md pt-8 pb-6 px-8 rounded-3xl shadow-[0_8px_30px_rgba(212,165,165,0.25)] -mt-16 relative z-10 w-[85%] md:w-[90%] border border-white/60 group-hover:bg-white transition-colors duration-500">
            <p className="text-[#c48b8b] text-[13px] font-bold uppercase tracking-[0.2em] mb-2 !font-elegant">
              Cô dâu
            </p>
            <h3 className="font-elegant text-[28px] md:text-[32px] font-semibold text-[#3a2a22] mb-1 !font-elegant">
              Nguyễn Thị Thoa
            </h3>
            <div className="flex items-center justify-center gap-2 mb-3">
              <CalendarIcon className="w-4 h-4 text-[#c9956b]" />
              <p className="font-elegant text-[#c9956b] text-[16px] tracking-wide">
                28 / 09 / 2002
              </p>
            </div>
            <p className="text-[#8a7a72] text-[14px] italic leading-relaxed !font-elegant">
              "Cô gái dịu dàng, rạng rỡ với nụ cười tỏa nắng, mang hạnh phúc và
              bình yên đến với người thương."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const LOVE_STORY = [
  {
    date: "Tháng 2, 2023",
    title: "Lần đầu gặp nhau",
    text: "Cơ duyên bắt đầu ngay giữa ngày hội làng quê. Trong không khí náo nhiệt ấy, anh vô tình bắt quả tang một cô nàng đang len lén đưa điện thoại lên chụp trộm mình. Lời làm quen bối rối hôm đó kéo theo một chầu cà phê, và mọi chuyện sau đó diễn ra thật tự nhiên.",
    image: IMAGES.story4,
    icon: "coffee",
  },
  {
    date: "14 Tháng 2, 2023",
    title: "Lần hẹn hò đầu tiên",
    text: "Buổi hẹn hò chính thức đầu tiên, hai đứa chọn đi xem phim. Bộ phim có hay không thì chẳng nhớ, chỉ nhớ là những câu chuyện kể cho nhau nghe sau đó cứ kéo dài mãi không muốn về.",
    image: IMAGES.story6,
    icon: "walk",
  },
  {
    date: "Tháng 9, 2025",
    title: "Lời cầu hôn",
    text: "Sự chuẩn bị có đôi phần lóng ngóng nhưng ngập tràn chân thành. Nhìn thẳng vào mắt nhau, anh bảo: 'Làm vợ anh nhé? Để anh được chăm sóc em mỗi ngày'. Chỉ đơn giản vậy thôi, cũng đủ để em mỉm cười gật đầu.",
    image: IMAGES.story5,
    icon: "ring",
  },
  {
    date: "2023 — nay",
    title: "Và chúng mình vẫn đang tiếp tục...",
    text: "Sau tất cả, tụi mình vẫn ở đây, bên cạnh nhau. Không cần quá ồn ào, chỉ cần mỗi ngày đều có nhau là đủ. Và hành trình này, vẫn sẽ còn tiếp tục thật lâu về sau.",
    image: IMAGES.story3,
    icon: "heart",
  },
];
function getTimelineIcon(icon: string) {
  switch (icon) {
    case "coffee":
      return <CoffeeIcon />;
    case "walk":
      return <WalkIcon />;
    case "heart":
      return <HeartIcon />;
    case "ring":
      return <RingIcon />;
    default:
      return <HeartIcon />;
  }
}
// Câu chuyện tình yêu
function LoveStorySection() {
  return (
    <section className="wedding-section timeline-section" id="story">
      <div className="animate-on-scroll">
        <p className="section-title-script">Câu chuyện tình yêu</p>
        <p className="section-subtitle">
          Hành trình đến bên nhau của chúng tôi
        </p>
      </div>

      <div className="timeline">
        {LOVE_STORY.map((item, index) => (
          <div
            key={index}
            className={`timeline-item animate-on-scroll ${index % 2 === 0 ? "slide-left" : "slide-right"} delay-${(index + 1) * 200}`}
          >
            <div className="timeline-dot">{getTimelineIcon(item.icon)}</div>
            <span className="timeline-date !text-base !font-elegant">
              {item.date}
            </span>
            <h3 className="timeline-title !font-elegant">{item.title}</h3>
            <p className="timeline-text !font-elegant">{item.text}</p>
            <div className="timeline-image">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type ConfettiPieceSpec = {
  id: number;
  dx: string;
  dy: string;
  rot: string;
  color: string;
  size: number;
  delay: number;
};

const CONFETTI_PALETTE = [
  "#d4a5a5",
  "#c9a96e",
  "#c9956b",
  "#fdf8f5",
  "#3a2a22",
  "#f8e8e0",
];

const buildConfettiSpecs = (): ConfettiPieceSpec[] => {
  const specs: ConfettiPieceSpec[] = [];
  const n = 18;
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n + Math.random() * 0.35;
    const dist = 64 + Math.random() * 72;
    specs.push({
      id: i,
      dx: `${Math.cos(angle) * dist}px`,
      dy: `${Math.sin(angle) * dist}px`,
      rot: `${420 + Math.random() * 420}deg`,
      color: CONFETTI_PALETTE[i % CONFETTI_PALETTE.length],
      size: 5 + Math.random() * 8,
      delay: Math.random() * 0.08,
    });
  }
  return specs;
};

function GiftQrSurprise() {
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confetti = useMemo(() => buildConfettiSpecs(), []);

  const handleOpenGift = useCallback(() => {
    if (opened) return;
    setShowConfetti(true);
    setOpened(true);
    window.setTimeout(() => setShowConfetti(false), 880);
  }, [opened]);

  const handleGiftKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpenGift();
      }
    },
    [handleOpenGift],
  );

  return (
    <div className="relative flex w-full flex-col items-center py-2">
      <div className="relative mx-auto flex min-h-[268px] w-full max-w-[320px] items-center justify-center">
        {showConfetti ? (
          <div className="confetti-burst-layer" aria-hidden="true">
            {confetti.map((c) => (
              <span
                key={c.id}
                className="confetti-piece"
                style={
                  {
                    width: c.size,
                    height: Math.max(4, c.size * 0.55),
                    backgroundColor: c.color,
                    left: "50%",
                    top: "45%",
                    marginLeft: -c.size / 2,
                    marginTop: -(c.size * 0.28),
                    "--dx": c.dx,
                    "--dy": c.dy,
                    "--rot": c.rot,
                    animationDelay: `${c.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        ) : null}

        {!opened ? (
          <div
            role="button"
            tabIndex={0}
            onClick={handleOpenGift}
            onKeyDown={handleGiftKeyDown}
            className="group gift-wiggle relative flex flex-col items-center cursor-pointer select-none"
          >
            <p className="font-elegant mb-2 text-[13px] text-[#9c8f87]">
              Một chút lộc nhỏ gửi bạn
            </p>
            <p className="font-elegant mb-5 text-[15px] text-[#c9a96e]">
              Chạm để mở
            </p>

            <div className="relative w-[8.5rem] h-[13rem]">
              {/* Shadow */}
              <div className="absolute inset-0 translate-y-2 blur-xl opacity-30 rounded-3xl" />

              {/* Bao lì xì */}
              <div className="relative inset-0 h-full w-full rounded-2xl bg-[#c62828] shadow-[0_12px_25px_rgba(0,0,0,0.25)] overflow-hidden">
                {/* Texture giấy */}
                <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle,_#ffffff_1px,_transparent_1px)] [background-size:6px_6px]" />

                {/* Viền gold foil */}
                <div
                  className="
               absolute inset-0 rounded-2xl
               border border-[#e6c27a]
               shadow-[0_0_6px_rgba(230,194,122,0.4)]
             "
                />

                {/* Nắp */}
                <div
                  className="
               absolute top-0 left-0 w-full h-[32%]
               origin-top
               bg-[#b71c1c]
               rounded-t-2xl
               shadow-[inset_0_-2px_6px_rgba(0,0,0,0.25)]
               transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
               group-hover:-rotate-x-[55deg]
             "
                />

                {/* Seal vàng */}
                <div
                  className="
               absolute top-[38%] left-1/2 -translate-x-1/2 z-20
               w-[2.6rem] h-[2.6rem]
               rounded-full
               bg-gradient-to-br from-[#fff6cc] via-[#f5d97a] to-[#c9a96e]
               shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_6px_12px_rgba(0,0,0,0.35)]
               flex items-center justify-center
               text-[15px] font-bold text-[#8c6b1f]
             "
                >
                  囍
                </div>

                {/* Shine chạy qua (ánh kim) */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <div
                    className="
                 absolute -left-1/2 top-0 h-full w-1/3
                 rotate-12
                 bg-gradient-to-r from-transparent via-white/50 to-transparent
                 blur-md
                 opacity-0
                 group-hover:opacity-100
                 group-hover:animate-[goldShine_1.6s_ease_forwards]
               "
                  />
                </div>

                {/* Glow nhẹ quanh seal */}
                <div
                  className="
               absolute top-[38%] left-1/2 -translate-x-1/2
               w-[3.5rem] h-[3.5rem]
               rounded-full
               blur-xl
               opacity-0
               bg-[#f5d97a]
               group-hover:opacity-40
               transition duration-500
             "
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-6 items-center justify-center">
            <div className="gift-qr-reveal relative z-10 flex w-full flex-col items-center !p-4">
              <p className="font-elegant mt-1 !mb-5 text-center text-[14px] text-[#8a7a72]">
                Cảm ơn bạn rất nhiều
              </p>
              <div className="mt-5 rounded-2xl border-4 border-white bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                <img
                  src={IMAGES.qrChure}
                  alt={`Mã QR mừng cưới ${WEDDING.groomName} và ${WEDDING.brideName}`}
                  width={120}
                  height={120}
                  className="h-auto w-[120px] max-w-full object-contain sm:w-[220px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
       
            </div>

            <div className="gift-qr-reveal relative z-10 flex w-full flex-col items-center !p-4">
              <p className="font-elegant mt-1 !mb-5 text-center text-[14px] text-[#8a7a72]">
                Cảm ơn bạn rất nhiều
              </p>
              <div className="mt-5 rounded-2xl border-4 border-white bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                <img
                  src={IMAGES.qrCodau}
                  alt={`Mã QR mừng cưới ${WEDDING.groomName} và ${WEDDING.brideName}`}
                  width={120}
                  height={120}
                  className="h-auto w-[120px] max-w-full object-contain sm:w-[220px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
          
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VenueMapAndGiftSection() {
  const primary = WEDDING.events[0];

  return (
    <div className="mx-auto mt-10 w-full max-w-[460px] px-4 animate-on-scroll delay-200 md:mt-12">
      <div className="ornament-divider mb-6">
        <span className="line" />
        <span className="icon">📍</span>
        <span className="line" />
      </div>
      <p className="section-title-script text-center !text-[clamp(1.45rem,4.8vw,1.85rem)]">
        Địa điểm
      </p>
      <p className="section-subtitle mb-8 text-center">
        Xem bản đồ và gửi lời chúc
      </p>

      <div className="overflow-hidden rounded-2xl !bg-gradient-to-b !from-[#fff9f7] !to-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="p-5 md:p-6  !mt-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex justify-center">
              <MapPinIcon className="h-7 w-7 text-[#c9956b]" />
            </div>
            <div className="min-w-0 flex flex-col items-center justify-center gap-3 pb-2">
              <p className="font-elegant text-[17px] font-semibold text-[#3a2a22]">
                {primary.venue}
              </p>
              <p className="font-elegant text-[15px] leading-relaxed text-[#5c4a40]">
                {primary.address}
              </p>

              <a
                href={WEDDING.venueLocation.mapsOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-button mt-4 inline-flex !font-elegant text-[14px] text-[#8a7a72] w-[300px] flex justify-center items-center w-auto"
                aria-label="Mở địa điểm trong Google Maps"
              >
                <MapPinIcon className="h-4 w-4" />
                Mở Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className=" p-4 md:p-5 !h-[250px] sm:!h-[350px]">
          <div className="relative mx-auto aspect-[4/3] rounded-xl">
            <iframe
              title="Bản đồ địa điểm lễ cưới"
              src={WEDDING.venueLocation.mapEmbedUrl}
              className="absolute inset-0 h-[200px] w-[300px] sm:h-[300px] sm:w-[500px] border-0 !mt-5 !mx-auto !rounded-xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className=" p-4 md:p-5 !mb-5">
          <GiftQrSurprise />
        </div>
      </div>
    </div>
  );
}

// ── 5. Event Info Section ──
function EventSection() {
  const countdown = useCountdown(WEDDING.date);

  return (
    <section className="wedding-section event-section" id="event">
      <div className="animate-on-scroll">
        <p className="section-title-script">Lễ Cưới</p>
        <p className="section-subtitle">Trân trọng kính mời</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-stretch justify-center max-w-5xl mx-auto px-4">
        {WEDDING.events.map((event, idx) => (
          <div
            key={event.id}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#d4a5a5]/30 w-full md:w-1/2 flex flex-col items-center text-center animate-on-scroll relative"
            style={{ transitionDelay: `${(idx + 1) * 200}ms` }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#f0d5d5] via-[#c9a96e] to-[#f0d5d5]"></div>

            <div className="w-14 h-14 rounded-full bg-[#f8e8e0] border border-[#d4a5a5]/30 flex flex-col items-center justify-center mt-2 mb-5 text-[#c48b8b]">
              {idx === 0 ? (
                <HeartIcon className="w-7 h-7" />
              ) : (
                <RingIcon className="w-7 h-7" />
              )}
            </div>

            <h3 className="font-elegant text-[20px] font-semibold text-[#3a2a22] mb-6">
              {event.title}
            </h3>

            <div className="space-y-4 w-full flex-grow">
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-2.5">
                  <CalendarIcon className="w-5 h-5 text-[#c9956b]" />
                  <p className="font-elegant text-[#3a2a22] font-medium text-[16px]">
                    {event.relativeDay}, {event.date}
                  </p>
                </div>
                <p className="font-elegant text-[#c9956b] italic text-[14px]">
                  ({event.lunarDate})
                </p>
              </div>

              <div className="flex items-center justify-center gap-2.5">
                <ClockIcon className="w-5 h-5 text-[#c9956b]" />
                <p className="font-elegant text-[#3a2a22] font-medium text-[16px]">
                  {event.time}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center mb-6">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <MapPinIcon className="w-5 h-5 text-[#c9956b] pulse-anim" />
                  <p className="font-elegant text-[#3a2a22] font-medium text-[16px]">
                    {event.venue}
                  </p>
                </div>
                <p className="font-elegant text-[#8a7a72] text-[15px] px-2 pb-8">
                  {event.address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Countdown */}
      <div className="animate-on-scroll delay-500">
        <div className="ornament-divider" style={{ marginTop: 48 }}>
          <span className="line" />
          <span className="icon">♡</span>
          <span className="line" />
        </div>
        <p className="section-subtitle" style={{ marginBottom: 16 }}>
          Đếm ngược đến ngày trọng đại
        </p>
        <div className="event-countdown !font-elegant">
          <div className="countdown-item ">
            <span className="countdown-number !font-elegant">
              {countdown.days}
            </span>
            <span className="countdown-label !font-elegant">Ngày</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number !font-elegant">
              {String(countdown.hours).padStart(2, "0")}
            </span>
            <span className="countdown-label !font-elegant">Giờ</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number !font-elegant">
              {String(countdown.minutes).padStart(2, "0")}
            </span>
            <span className="countdown-label !font-elegant">Phút</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number !font-elegant">
              {String(countdown.seconds).padStart(2, "0")}
            </span>
            <span className="countdown-label !font-elegant">Giây</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 6. Message Section ──
const MESSAGE_TEXT =
  "Chúng tôi thật hạnh phúc và vinh dự khi được đón tiếp bạn trong ngày trọng đại. Sự hiện diện của bạn là món quà ý nghĩa nhất mà chúng tôi có thể nhận được. Xin hãy đến và cùng chia sẻ niềm vui này với chúng tôi.";

function MessageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="wedding-section message-section"
      id="message"
      ref={sectionRef}
    >
      <div className="animate-on-scroll">
        <p className="section-title-script">Lời nhắn gửi</p>
      </div>

      <div className="message-content animate-on-scroll scale-in delay-300">
        <span className="message-quote-mark">&ldquo;</span>
        <p className="message-text !font-elegant text-[#5c4a40] leading-loose">
          {MESSAGE_TEXT}
        </p>
      </div>
    </section>
  );
}

// ── 7. Gallery Section ──
function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll gallery
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let speed = 0.5;
    let paused = false;
    let direction = 1;
    let currentScroll = el.scrollLeft;

    const scroll = () => {
      if (!paused && el) {
        // Sync float scroll value if user manually scrolled
        if (Math.abs(currentScroll - el.scrollLeft) > 1) {
          currentScroll = el.scrollLeft;
        }

        currentScroll += speed * direction;
        el.scrollLeft = currentScroll;

        // Bounce back and forth
        if (
          el.scrollLeft >= el.scrollWidth - el.clientWidth - 1 &&
          direction === 1
        ) {
          direction = -1;
        } else if (el.scrollLeft <= 0 && direction === -1) {
          direction = 1;
        }
      }
      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      setTimeout(() => {
        paused = false;
      }, 2000);
    };

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("mousedown", pause, { passive: true });
    el.addEventListener("mouseup", resume, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("mousedown", pause);
      el.removeEventListener("mouseup", resume);
    };
  }, []);

  return (
    <section className="wedding-section gallery-section" id="gallery">
      <div className="animate-on-scroll">
        <p className="section-title-script">Khoảnh Khắc Đẹp</p>
        <p className="section-subtitle !font-elegant">
          Những khoảnh khắc ngọt ngào của chúng tôi
        </p>
      </div>

      <div className="gallery-scroll" ref={scrollRef}>
        {IMAGES.gallery.map((src, i) => (
          <div className="gallery-item" key={i}>
            <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 8. Wishes Section ──
type Wish = {
  id: number;
  name: string;
  wish: string;
  date: string;
};

function WishesSection() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wishesList, setWishesList] = useState<Wish[]>([]);

  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfIDRaXmWeOOENsW0oQvkeRvMA1c7rsLAPWI6H85IpK3eL85w/formResponse";
  const GOOGLE_CSV_URL =
    "https://docs.google.com/spreadsheets/d/1kJ_nMM9x_YUgAe8NQd4wMmW2MZ53B4N60fLDIC9_lKg/gviz/tq?tqx=out:csv";
  const ENTRY_NAME = "entry.1073959576";
  const ENTRY_WISH = "entry.639698557";

  // Load from Google Sheet on mount
  useEffect(() => {
    const loadWishes = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(GOOGLE_CSV_URL, { cache: "no-store" });
        const csvData = await response.text();

        // Basic CSV parsing (skipping header)
        const rows = csvData.split("\n").slice(1);
        const parsedWishes: Wish[] = rows
          .map((row, index) => {
            // Regex to handle potential commas inside quotes
            const parts = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (parts.length < 3) return null;

            return {
              id: index,
              name: parts[1]?.replace(/^"|"$/g, "").trim() || "Ẩn danh",
              wish: parts[2]?.replace(/^"|"$/g, "").trim() || "",
              date: parts[0]?.split(" ")[0] || "", // Extract date from timestamp
            };
          })
          .filter((w): w is Wish => w !== null && w.wish !== "")
          .reverse(); // Newest first

        setWishesList(parsedWishes);
      } catch (e) {
        console.error("Failed to fetch wishes from Google Sheets", e);
        // Fallback to localStorage if CSV fails
        const saved = localStorage.getItem("wedding_wishes");
        if (saved) setWishesList(JSON.parse(saved));
      }
      setIsFetching(false);
    };
    loadWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && wish.trim() && !isSubmitting) {
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append(ENTRY_NAME, name);
        formData.append(ENTRY_WISH, wish);

        // Submit to Google Form
        await fetch(GOOGLE_FORM_URL, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });

        // Add to local state immediately for UX
        const newWish: Wish = {
          id: Date.now(),
          name: name,
          wish: wish,
          date: new Date().toLocaleDateString("vi-VN"),
        };

        const updatedList = [newWish, ...wishesList];
        setWishesList(updatedList);

        // Also save to localStorage as backup
        localStorage.setItem("wedding_wishes", JSON.stringify(updatedList));

        setIsSubmitting(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setName("");
        setWish("");
      } catch (error) {
        console.error("Submission failed", error);
        setIsSubmitting(false);
        alert("Có lỗi xảy ra khi gửi lời chúc. Vui lòng thử lại sau!");
      }
    }
  };

  return (
    <section className="wedding-section wishes-section" id="wishes">
      <div className="animate-on-scroll">
        <p className="section-title-script">Gửi lời chúc</p>
        <p className="section-subtitle !font-elegant">
          Lời chúc tốt đẹp nhất dành cho đôi uyên ương
        </p>
      </div>

      <form
        className="wishes-form animate-on-scroll delay-200"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="wishes-input !font-elegant"
          placeholder="Tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <textarea
          className="wishes-textarea !font-elegant"
          placeholder="Viết lời chúc..."
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="wishes-button flex items-center !font-elegant justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Đang gửi...
            </>
          ) : submitted ? (
            "✓ Đã gửi lời chúc!"
          ) : (
            "Gửi lời chúc ♡"
          )}
        </button>
      </form>

      {/* Wishes List Display */}
      <div className="mt-16 max-w-[400px] mx-auto px-1">
        {isFetching ? (
          <div className="flex flex-col items-center justify-center py-10 opacity-50">
            <div className="w-8 h-8 border-2 border-[#d4a5a5]/30 border-t-[#d4a5a5] rounded-full animate-spin mb-3"></div>
            <p className="font-elegant italic text-sm text-[#8a7a72]">
              Đang tải lời chúc...
            </p>
          </div>
        ) : wishesList.length > 0 ? (
          <div className="wishes-list">
            <p className="text-center font-elegant text-[#c48b8b] text-sm mb-8 italic opacity-80 decoration-[0.5px] decoration-dotted underline underline-offset-8">
              — Sổ lưu bút ({wishesList.length}) —
            </p>
            {wishesList.map((item) => (
              <div key={item.id} className="wishes-card fade-in-up">
                <p className="wish-name">{item.name}</p>
                <p className="wish-text">"{item.wish}"</p>
                <span className="wish-date">{item.date}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

// ── 9. Footer Section ──
function FooterSection() {
  return (
    <section className="footer-section" id="footer">
      <div className="animate-on-scroll">
        <div className="footer-sparkle-container">
          <span className="footer-sparkle">✦</span>
          <span className="footer-sparkle">✧</span>
          <span className="footer-sparkle">✦</span>
          <span className="footer-sparkle">✧</span>
          <span className="footer-heart">💕</span>
        </div>
      </div>

      <div className="animate-on-scroll delay-200">
        <h2 className="footer-thankyou">Cảm ơn bạn!</h2>
      </div>

      <div className="animate-on-scroll delay-300">
        <p className="footer-message">
          Sự hiện diện của bạn sẽ làm cho ngày trọng đại của chúng tôi thêm phần
          trọn vẹn và ý nghĩa. Cảm ơn bạn đã luôn yêu thương và ủng hộ.
        </p>
      </div>

      <div className="animate-on-scroll delay-400">
        <div className="footer-names">
          {WEDDING.groomName} &amp; {WEDDING.brideName}
        </div>
      </div>

      <div className="footer-bottom animate-on-scroll font-elegant delay-500">
        <p className="text-center !font-elegant">♡ {WEDDING.dateDisplay} ♡</p>
      </div>
    </section>
  );
}

// ── Floating Music Player ──
function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt autoplay immediately upon component mount
    if (audioRef.current && !isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn(
              "Auto-play was prevented by the browser. Waiting for user interaction...",
              err,
            );
          });
      }
    }

    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn("Autoplay prevented or audio source missing:", err);
            });
        }
      }
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    document.addEventListener("scroll", handleFirstInteraction); // Add scroll as an extra fallback just in case

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn("Play failed or audio source missing:", err);
              // Cập nhật lại UI nếu play thất bại
              setIsPlaying(false);
            });
        }
      }
    }
  };

  return (
    <div
      onClick={togglePlay}
      className={`floating-music-btn w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-[0_4px_16px_rgba(212,165,165,0.4)] cursor-pointer border-2 border-[#d4a5a5] transition-transform duration-300 ${
        isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
      }`}
    >
      <audio ref={audioRef} src="/audio/leduong.mp3" autoPlay loop />
      <span className="text-xl leading-none">🎵</span>
      {/* Red dot indicator if paused */}
      {!isPlaying && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════
export default function Home() {
  const containerRef = useScrollAnimation();
  const [showLanding, setShowLanding] = useState(true);
  const [recipientName, setRecipientName] = useState(DEFAULT_GUEST_NAME);
  const [partnerName, setPartnerName] = useState(DEFAULT_PARTNER_NAME);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("wedding_guest_names") : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { guest: string; partner: string };
        setRecipientName(parsed.guest || DEFAULT_GUEST_NAME);
        setPartnerName(parsed.partner || DEFAULT_PARTNER_NAME);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleStart = useCallback((guest: string, partner: string) => {
    const finalGuest = guest || DEFAULT_GUEST_NAME;
    const finalPartner = partner || DEFAULT_PARTNER_NAME;
    setRecipientName(finalGuest);
    setPartnerName(finalPartner);
    localStorage.setItem(
      "wedding_guest_names",
      JSON.stringify({ guest: finalGuest, partner: finalPartner }),
    );
    setShowLanding(false);
  }, []);

  return (
    <main ref={containerRef}>
      {showLanding && (
        <LandingScreen
          initialGuest={recipientName}
          initialPartner={partnerName}
          onStart={handleStart}
        />
      )}
      <FloatingMusicPlayer />
      <FloatingPetals />
      <HeroSection guestName={recipientName} partnerName={partnerName} />
      <CoupleSection />
      <IntroductionSection />
      <LoveStorySection />
      <EventSection />
      <MessageSection />
      <GallerySection />
      <WishesSection />
      <VenueMapAndGiftSection />
      <FooterSection />
    </main>
  );
}
