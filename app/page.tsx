"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
  lunarDate: "Tức 23 tháng 3 năm Bính Ngọ",
  events: [
    {
      id: "dan-trau",
      title: "Lễ Dẫn Trầu",
      date: "09 . 05 . 2026",
      lunarDate: "Tức 23 tháng 3 năm Bính Ngọ",
      relativeDay: "Thứ Bảy",
      time: "09:00",
      venue: "Tư gia",
      address: "Thôn Phù Lưu, Xã Yên Phong, Tỉnh Bắc Ninh",
    },
    {
      id: "dai-le",
      title: "Lễ Cưới",
      date: "10 . 05 . 2026",
      lunarDate: "Tức 24 tháng 3 năm Bính Ngọ",
      relativeDay: "Chủ Nhật",
      time: "14:00",
      venue: "Tư gia",
      address: "Thôn Phù Lưu, Xã Yên Phong, Tỉnh Bắc Ninh",
    }
  ]
};

// ── SVG Icons as components ──
function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 110 8h-1" /><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function RingIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="14" r="8" /><path d="M9 3l3 4 3-4" /><path d="M12 7v3" />
    </svg>
  );
}

function WalkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" /><path d="M15 22l-3-8-3 8" /><path d="M9 14l-2-4 5-2 5 2-2 4" />
    </svg>
  );
}

// ── Floating petals ──
function FloatingPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; left: string; size: number; duration: number; delay: number; opacity: number }>>([]);

  useEffect(() => {
    setPetals(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 8 + Math.random() * 10,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.2 + Math.random() * 0.3,
    })));
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
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
function HeroSection() {
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
        <p className="hero-tagline">&ldquo;Nơi tình yêu bắt đầu chương mới&rdquo;</p>
        <p className="hero-date">{WEDDING.dateDisplay}<br />({WEDDING.lunarDate})</p>

      </div>

      <div className="scroll-indicator" onClick={scrollDown}>
        <ChevronDown />
      </div>
    </section>
  );
}

// ── 2. Couple Names Section ──
function CoupleSection() {
  return (
    <section className="wedding-section couple-section" id="couple">
      <div className="animate-on-scroll scale-in flex justify-center rounded-full">

        <img src={IMAGES.couple} alt="Couple portrait" className="object-cover min-w-[200px] h-[200px] rounded-full" />

      </div>

      <div className="animate-on-scroll delay-200">
        <p className="announcement">Hân hoan thông báo</p>
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
          Trân trọng kính mời bạn cùng người thương<br />
          đến chung vui trong ngày lễ trọng đại của chúng tôi<br />

        </div>
        <div className="couple-description inline-block px-8 pt-3 pb-1 mt-5 rounded-3xl min-w-[220px] bg-gradient-to-r from-[#f8e8e0] via-[#fdfbfb] to-[#f8e8e0] border border-[#d4a5a5]/40 text-[#c48b8b] font-semibold tracking-wide shadow-sm">
          Lúc 17h00 <br />
          09-05-2026 <br />
          <span className="text-[14px] font-medium italic opacity-85">(Tức 23 tháng 3 Âm lịch)</span>
        </div>
      </div>
    </section>
  );
}

// ── 3. Introduction Section ──
function IntroductionSection() {
  return (
    <section className="wedding-section pb-24 pt-12 relative overflow-hidden" id="introduction">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8e8e0] rounded-full filter blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f0d5d5] rounded-full filter blur-3xl opacity-40 -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="animate-on-scroll mb-16">
        <p className="section-title-script">Chú Rể {" "} &  {" "} Cô Dâu</p>
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
            <img src="/images/wedding/wedding-10.jpg" alt="Chú rể" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="text-center bg-white/80 backdrop-blur-md pt-8 pb-6 px-8 rounded-3xl shadow-[0_8px_30px_rgba(212,165,165,0.25)] -mt-16 relative z-10 w-[85%] md:w-[90%] border border-white/60 group-hover:bg-white transition-colors duration-500">
            <p className="text-[#c48b8b] text-[13px] font-bold uppercase tracking-[0.2em] mb-2">Chú rể</p>
            <h3 className="font-serif text-[28px] md:text-[32px] font-semibold text-[#3a2a22] mb-1">Nguyễn Đức Việt</h3>
            <div className="flex items-center justify-center gap-2 mb-3">
              <CalendarIcon className="w-4 h-4 text-[#c9956b]" />
              <p className="font-elegant text-[#c9956b] text-[16px] tracking-wide">08 / 10 / 2002</p>
            </div>
            <p className="text-[#8a7a72] text-[14px] italic leading-relaxed">
              "Chàng trai trưởng thành, ấm áp, luôn mang lại niềm vui và là chỗ dựa vững chắc cho gia đình nhỏ."
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
            <img src="/images/wedding/wedding-3.jpg" alt="Cô dâu" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="text-center bg-white/80 backdrop-blur-md pt-8 pb-6 px-8 rounded-3xl shadow-[0_8px_30px_rgba(212,165,165,0.25)] -mt-16 relative z-10 w-[85%] md:w-[90%] border border-white/60 group-hover:bg-white transition-colors duration-500">
            <p className="text-[#c48b8b] text-[13px] font-bold uppercase tracking-[0.2em] mb-2">Cô dâu</p>
            <h3 className="font-serif text-[28px] md:text-[32px] font-semibold text-[#3a2a22] mb-1">Nguyễn Thị Thoa</h3>
            <div className="flex items-center justify-center gap-2 mb-3">
              <CalendarIcon className="w-4 h-4 text-[#c9956b]" />
              <p className="font-elegant text-[#c9956b] text-[16px] tracking-wide">28 / 09 / 2002</p>
            </div>
            <p className="text-[#8a7a72] text-[14px] italic leading-relaxed">
              "Cô gái dịu dàng, rạng rỡ với nụ cười tỏa nắng, mang hạnh phúc và bình yên đến với người thương."
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
    case "coffee": return <CoffeeIcon />;
    case "walk": return <WalkIcon />;
    case "heart": return <HeartIcon />;
    case "ring": return <RingIcon />;
    default: return <HeartIcon />;
  }
}
// Câu chuyện tình yêu
function LoveStorySection() {
  return (
    <section className="wedding-section timeline-section" id="story">
      <div className="animate-on-scroll">
        <p className="section-title-script">Câu chuyện tình yêu</p>
        <p className="section-subtitle">Hành trình đến bên nhau của chúng tôi</p>
      </div>

      <div className="timeline">
        {LOVE_STORY.map((item, index) => (
          <div
            key={index}
            className={`timeline-item animate-on-scroll ${index % 2 === 0 ? "slide-left" : "slide-right"} delay-${(index + 1) * 200}`}
          >
            <div className="timeline-dot">{getTimelineIcon(item.icon)}</div>
            <span className="timeline-date !text-base !font-serif">{item.date}</span>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-text">{item.text}</p>
            <div className="timeline-image">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </section>
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
          <div key={event.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#d4a5a5]/30 w-full md:w-1/2 flex flex-col items-center text-center animate-on-scroll relative" style={{ transitionDelay: `${(idx + 1) * 200}ms` }}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#f0d5d5] via-[#c9a96e] to-[#f0d5d5]"></div>

            <div className="w-14 h-14 rounded-full bg-[#f8e8e0] border border-[#d4a5a5]/30 flex flex-col items-center justify-center mt-2 mb-5 text-[#c48b8b]">
              {idx === 0 ? <HeartIcon className="w-7 h-7" /> : <RingIcon className="w-7 h-7" />}
            </div>

            <h3 className="font-serif text-[20px] font-semibold text-[#3a2a22] mb-6">
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
                  <p className="font-elegant text-[#3a2a22] font-medium text-[16px]">{event.venue}</p>
                </div>
                <p className="font-elegant text-[#8a7a72] text-[15px] px-2 pb-8">{event.address}</p>
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
        <p className="section-subtitle" style={{ marginBottom: 16 }}>Đếm ngược đến ngày trọng đại</p>
        <div className="event-countdown">
          <div className="countdown-item">
            <span className="countdown-number">{countdown.days}</span>
            <span className="countdown-label">Ngày</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{String(countdown.hours).padStart(2, "0")}</span>
            <span className="countdown-label">Giờ</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{String(countdown.minutes).padStart(2, "0")}</span>
            <span className="countdown-label">Phút</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{String(countdown.seconds).padStart(2, "0")}</span>
            <span className="countdown-label">Giây</span>
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
    <section className="wedding-section message-section" id="message" ref={sectionRef}>
      <div className="animate-on-scroll">
        <p className="section-title-script">Lời nhắn gửi</p>
      </div>

      <div className="message-content animate-on-scroll scale-in delay-300">
        <span className="message-quote-mark">&ldquo;</span>
        <p className="message-text !font-serif text-[#5c4a40] leading-loose">
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
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1 && direction === 1) {
          direction = -1;
        } else if (el.scrollLeft <= 0 && direction === -1) {
          direction = 1;
        }
      }
      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);

    const pause = () => { paused = true; };
    const resume = () => { setTimeout(() => { paused = false; }, 2000); };

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
        <p className="section-subtitle">Những khoảnh khắc ngọt ngào của chúng tôi</p>
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

  // Load from localStorage on mount (Simulating API fetch)
  useEffect(() => {
    const loadWishes = async () => {
      setIsFetching(true);
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      const saved = localStorage.getItem("wedding_wishes");
      if (saved) {
        try {
          setWishesList(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse wishes", e);
        }
      }
      setIsFetching(false);
    };
    loadWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && wish.trim() && !isSubmitting) {
      setIsSubmitting(true);
      // Simulate API submission latency
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const newWish: Wish = {
        id: Date.now(),
        name: name,
        wish: wish,
        date: new Date().toLocaleDateString("vi-VN"),
      };

      const updatedList = [newWish, ...wishesList];
      setWishesList(updatedList);
      localStorage.setItem("wedding_wishes", JSON.stringify(updatedList));

      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setName("");
      setWish("");
    }
  };

  return (
    <section className="wedding-section wishes-section" id="wishes">
      <div className="animate-on-scroll">
        <p className="section-title-script">Gửi lời chúc</p>
        <p className="section-subtitle">Lời chúc tốt đẹp nhất dành cho đôi uyên ương</p>
      </div>

      <form className="wishes-form animate-on-scroll delay-200" onSubmit={handleSubmit}>
        <input
          type="text"
          className="wishes-input"
          placeholder="Tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <textarea
          className="wishes-textarea"
          placeholder="Viết lời chúc..."
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button type="submit" className="wishes-button flex items-center justify-center gap-2" disabled={isSubmitting}>
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
            <p className="font-elegant italic text-sm text-[#8a7a72]">Đang tải lời chúc...</p>
          </div>
        ) : wishesList.length > 0 ? (
          <div className="wishes-list">
            <p className="text-center font-serif text-[#c48b8b] text-sm mb-8 italic opacity-80 decoration-[0.5px] decoration-dotted underline underline-offset-8">
              — Sổ lưu bút ({wishesList.length}) —
            </p>
            {wishesList.map((item) => (
              <div key={item.id} className="wishes-card fade-in-up">
                <p className="wish-name">
                  {item.name}
                </p>
                <p className="wish-text">
                  "{item.wish}"
                </p>
                <span className="wish-date">
                  {item.date}
                </span>
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
          Sự hiện diện của bạn sẽ làm cho ngày trọng đại của chúng tôi thêm phần trọn vẹn và ý nghĩa.
          Cảm ơn bạn đã luôn yêu thương và ủng hộ.
        </p>
      </div>

      <div className="animate-on-scroll delay-400">
        <p className="footer-names">{WEDDING.groomName} &amp; {WEDDING.brideName}</p>
      </div>

      <div className="footer-bottom animate-on-scroll delay-500">
        <p>♡ {WEDDING.dateDisplay} ♡</p>
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
            console.warn("Auto-play was prevented by the browser. Waiting for user interaction...", err);
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
      className={`floating-music-btn w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-[0_4px_16px_rgba(212,165,165,0.4)] cursor-pointer border-2 border-[#d4a5a5] transition-transform duration-300 ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
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

  return (
    <main ref={containerRef}>
      <FloatingMusicPlayer />
      <FloatingPetals />
      <HeroSection />
      <CoupleSection />
      <IntroductionSection />
      <LoveStorySection />
      <EventSection />
      <MessageSection />
      <GallerySection />
      <WishesSection />
      <FooterSection />
    </main>
  );
}
