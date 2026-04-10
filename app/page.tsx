"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Image paths ──
const IMAGES = {
  hero: "/images/wedding/wedding-2.jpg",
  couple: "/images/wedding/wedding-11.jpg",
  story1: "/images/wedding/wedding-3.jpg",
  story2: "/images/wedding/wedding-5.jpg",
  story3: "/images/wedding/wedding-8.jpg",
  story4: "/images/wedding/wedding-6.jpg",
  story5: "/images/wedding/wedding-1.jpg",
  story6: "/images/wedding/wedding-16.jpg",
  story7: "/images/wedding/wedding-15.jpg",
  gallery: [
    "/images/wedding/wedding-2.jpg",
    "/images/wedding/wedding-4.jpg",
    "/images/wedding/wedding-9.jpg",
    "/images/wedding/wedding-10.jpg",
    "/images/wedding/wedding-1.jpg",
    "/images/wedding/wedding-12.jpg",
    "/images/wedding/wedding-13.jpg",
    "/images/wedding/wedding-14.jpg",
    "/images/wedding/wedding-15.jpg",
    "/images/wedding/wedding-16.jpg",
  ],
};

// ── Wedding info ──
const WEDDING = {
  groomName: "Đức Việt",
  brideName: "Thoa Nguyễn",
  date: "2026-05-09",
  dateDisplay: "09 . 05 . 2026",
  timeLeReception: "17:00",
  timeLeCeremony: "14:00",
  venue: "Thôn Phù Lưu, Xã Yên Phong, Tỉnh Bắc Ninh",
  venueAddress: "Thôn Phù Lưu, Xã Yên Phong, Tỉnh Bắc Ninh",
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

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

function RingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const el = ref.current;
    if (el) {
      const children = el.querySelectorAll(".animate-on-scroll");
      children.forEach((c) => observer.observe(c));
    }

    return () => observer.disconnect();
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
        <p className="hero-date">{WEDDING.dateDisplay}</p>
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

      <div className="animate-on-scroll delay-500">
        <p className="couple-description">
          Chúng tôi trân trọng kính mời bạn đến chung vui<br />
          trong ngày lễ trọng đại của chúng tôi
        </p>
      </div>
    </section>
  );
}

// ── 3. Love Story Timeline ──
const LOVE_STORY = [
  {
    date: "Tháng 2, 2023",
    title: "Lần đầu gặp nhau",
    text: "Một buổi chiều nắng nhẹ, tình cờ gặp nhau tại quán cà phê quen thuộc. Ánh mắt chạm nhau, và từ khoảnh khắc ấy, trái tim đã biết rằng đây là người đặc biệt.",
    image: IMAGES.story4,
    icon: "coffee",
  },
  {
    date: "15 Tháng 2, 2020",
    title: "Lần hẹn hò đầu tiên",
    text: "Buổi tối đầu tiên bên nhau, đi dạo dọc bờ sông, kể cho nhau nghe những câu chuyện dở dang. Những bước chân chậm rãi mà lòng đầy háo hức.",
    image: IMAGES.story6,
    icon: "walk",
  },
  {
    date: "2023 — 2026",
    title: "Hành trình yêu nhau",
    text: "Cùng nhau đi qua bao mùa nắng mưa, cùng cười, cùng khóc, cùng lớn lên. Mỗi ngày bên nhau là một hành trình kỳ diệu tuyệt vời.",
    image: IMAGES.story3,
    icon: "heart",
  },
  {
    date: "Tháng 9, 2025",
    title: "Lời cầu hôn",
    text: "Trong ánh nến lung linh và ngàn cánh hoa hồng — \"Em có muốn là người đồng hành cùng anh trọn đời không?\" — \"Em đồng ý!\"",
    image: IMAGES.story5,
    icon: "ring",
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
            <span className="timeline-date">{item.date}</span>
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

// ── 4. Event Info Section ──
function EventSection() {
  const countdown = useCountdown(WEDDING.date);

  return (
    <section className="wedding-section event-section" id="event">
      <div className="animate-on-scroll">
        <p className="section-title-script">Lễ Cưới</p>
        <p className="section-subtitle">Trân trọng kính mời</p>
      </div>

      <div className="event-cards">
        <div className="event-card animate-on-scroll delay-200">
          <div className="event-card-icon">
            <CalendarIcon />
          </div>
          <p className="event-card-label">Ngày cưới</p>
          <p className="event-card-value">{WEDDING.dateDisplay}</p>
          <p className="event-card-detail">Thứ Bảy</p>
        </div>

        <div className="event-card animate-on-scroll delay-300">
          <div className="event-card-icon">
            <ClockIcon />
          </div>
          <p className="event-card-label">Thời gian</p>
          <p className="event-card-value">
            Lễ cưới: {WEDDING.timeLeCeremony}
          </p>
          <p className="event-card-detail">Tiệc mừng: {WEDDING.timeLeReception}</p>
        </div>

        <div className="event-card animate-on-scroll delay-400">
          <div className="event-card-icon pulse-anim">
            <MapPinIcon />
          </div>
          <p className="event-card-label">Địa điểm</p>
          <p className="event-card-value">{WEDDING.venue}</p>
          <p className="event-card-detail">{WEDDING.venueAddress}</p>
          <button className="map-button w-auto h-9" onClick={() => alert("Mở bản đồ (placeholder)")}>
            <MapPinIcon className="w-4 h-4" /> Xem bản đồ
          </button>
        </div>
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

// ── 5. Message Section ──
const MESSAGE_TEXT =
  "Chúng tôi thật hạnh phúc và vinh dự khi được đón tiếp bạn trong ngày trọng đại. Sự hiện diện của bạn là món quà ý nghĩa nhất mà chúng tôi có thể nhận được. Xin hãy đến và cùng chia sẻ niềm vui này với chúng tôi.";

function MessageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { displayed, done, start } = useTypewriter(MESSAGE_TEXT, 35, 800);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          start();
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted, start]);

  return (
    <section className="wedding-section message-section" id="message" ref={sectionRef}>
      <div className="animate-on-scroll">
        <p className="section-title-script">Lời nhắn gửi</p>
      </div>

      <div className="message-content animate-on-scroll delay-300">
        <span className="message-quote-mark">&ldquo;</span>
        <p className="message-text">
          <span className="typewriter-text">{displayed}</span>
          {!done && <span className="typewriter-cursor" />}
        </p>
      </div>
    </section>
  );
}

// ── 6. Gallery Section ──
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
        <p className="section-subtitle">Những kỷ niệm ngọt ngào của chúng tôi</p>
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

// ── 7. Wishes Section ──
function WishesSection() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && wish.trim()) {
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
        />
        <textarea
          className="wishes-textarea"
          placeholder="Viết lời chúc..."
          value={wish}
          onChange={(e) => setWish(e.target.value)}
        />
        <button type="submit" className="wishes-button">
          {submitted ? "✓ Đã gửi lời chúc!" : "Gửi lời chúc ♡"}
        </button>
      </form>
    </section>
  );
}

// ── 8. Footer Section ──
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
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
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
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-[0_4px_16px_rgba(212,165,165,0.4)] cursor-pointer border-2 border-[#d4a5a5] transition-transform duration-300 ${
        isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
      }`}
    >
      <audio ref={audioRef} src="/audio/leduong.mp3" loop />
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
    <div ref={containerRef}>
      <FloatingMusicPlayer />
      <FloatingPetals />
      <HeroSection />
      <CoupleSection />
      <LoveStorySection />
      <EventSection />
      <MessageSection />
      <GallerySection />
      <WishesSection />
      <FooterSection />
    </div>
  );
}
