import React, { useEffect, useRef, useState } from 'react';
import SocialLinkButton from './components/SocialLinkButton';
import { CONTACT_LINKS, PRIMARY_LINKS, PROFILE } from './constants';

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
};

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    let interactionListenersAttached = false;

    const removeInteractionListeners = () => {
      if (!interactionListenersAttached) return;
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      interactionListenersAttached = false;
    };

    const playVideo = async () => {
      try {
        await video.play();
        removeInteractionListeners();
      } catch {
        if (!interactionListenersAttached) {
          document.addEventListener('click', handleUserInteraction, {
            once: true,
            passive: true,
          });
          document.addEventListener('touchstart', handleUserInteraction, {
            once: true,
            passive: true,
          });
          interactionListenersAttached = true;
        }
      }
    };

    function handleUserInteraction() {
      void playVideo();
    }

    void playVideo();
    return removeInteractionListeners;
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        ref={videoRef}
        className="h-full w-full object-cover opacity-50"
        autoPlay={!prefersReducedMotion}
        loop
        muted
        playsInline
        preload="metadata"
        tabIndex={-1}
        style={{
          filter: 'blur(1px) brightness(0.8)',
          transform: 'scale(1.05)',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <source src={PROFILE.backgroundVideoSrc} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-700/40 to-gray-900/60"
        style={{ zIndex: 2 }}
      />
    </div>
  );
};

const useTypingText = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return undefined;
    }

    let currentIndex = 0;
    let intervalId: number | undefined;

    const startTimeout = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        currentIndex += 1;
        setDisplayText(text.slice(0, currentIndex));

        if (currentIndex >= text.length && intervalId !== undefined) {
          window.clearInterval(intervalId);
        }
      }, speed);
    }, 1000);

    return () => {
      window.clearTimeout(startTimeout);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [prefersReducedMotion, speed, text]);

  return displayText;
};

const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-10px) scale(1.05); }
  }
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3); }
    50% { text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6); }
  }
  @keyframes tilt-load {
    0% {
      transform: perspective(1000px) rotateX(-15deg) rotateY(-10deg) scale(0.9);
      opacity: 0;
      filter: blur(5px);
    }
    50% {
      transform: perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02);
      opacity: 0.8;
      filter: blur(1px);
    }
    100% {
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
  @keyframes passport-stamp {
    0% {
      transform: scale(0) rotate(-45deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.2) rotate(-10deg);
      opacity: 1;
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 0;
    }
  }
  .animate-float-glow {
    animation: float 3s ease-in-out infinite, glow 2s ease-in-out infinite;
  }
  .animate-tilt-load {
    animation: tilt-load 1.5s ease-out forwards;
  }
  .passport-stamp {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 3px solid #ff6b35;
    border-radius: 50%;
    pointer-events: none;
    animation: passport-stamp 0.8s ease-out forwards;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff6b35;
    font-weight: bold;
    font-size: 12px;
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-float-glow,
    .animate-tilt-load,
    .passport-stamp {
      animation: none !important;
    }
  }
`;

const App: React.FC = () => {
  const [passportStamps, setPassportStamps] = useState<
    { x: number; y: number; id: string }[]
  >([]);
  const typingText = useTypingText(PROFILE.tagline, 40);

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const handlePassportStamp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const stamp = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      id: crypto.randomUUID(),
    };

    setPassportStamps((current) => [...current, stamp]);
    window.setTimeout(() => {
      setPassportStamps((current) =>
        current.filter((currentStamp) => currentStamp.id !== stamp.id),
      );
    }, 800);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-gray-700 to-gray-900 p-4">
      <VideoBackground />

      <main className="relative z-10 w-full max-w-md">
        <div className="animate-tilt-load rounded-2xl border border-white/30 bg-white/20 p-6 text-center shadow-2xl backdrop-blur-xl md:p-8">
          <header className="mb-8">
            <img
              src={PROFILE.logoSrc}
              alt={`${PROFILE.name} logo`}
              className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-white/30 object-cover shadow-lg"
            />
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {PROFILE.name}
            </h1>
            <p className="mt-1 h-6 text-md text-slate-300">
              <span className="sr-only">{PROFILE.tagline}</span>
              <span aria-hidden="true">
                {typingText}
                <span className="animate-pulse motion-reduce:animate-none">|</span>
              </span>
            </p>
          </header>

          <div className="space-y-4">
            <a
              href={PROFILE.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePassportStamp}
              className="group relative flex w-full transform items-center justify-center overflow-hidden rounded-xl bg-yellow-600 p-4 text-lg font-bold text-white shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-yellow-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-700 motion-reduce:transform-none"
            >
              <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:bg-white group-hover:opacity-20" />
              <span className="relative z-10 mr-3">
                <StarIcon />
              </span>
              <span className="relative z-10">Add a Review</span>
              {passportStamps.map((stamp) => (
                <span
                  key={stamp.id}
                  className="passport-stamp"
                  style={{ left: stamp.x - 20, top: stamp.y - 20 }}
                  aria-hidden="true"
                >
                  GO
                </span>
              ))}
            </a>

            <div className="py-4 text-center">
              <p className="text-3xl font-bold text-white">
                Follow us on social media
              </p>
            </div>

            {PRIMARY_LINKS.map((link) => (
              <SocialLinkButton key={link.name} link={link} />
            ))}

            <nav className="mt-6 flex justify-center space-x-4" aria-label="Contact options">
              {CONTACT_LINKS.map((link) => {
                const opensNewTab = link.url.startsWith('http');
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target={opensNewTab ? '_blank' : undefined}
                    rel={opensNewTab ? 'noopener noreferrer' : undefined}
                    className={`
                      relative flex h-12 w-12 transform items-center justify-center rounded-full
                      shadow-lg transition-all duration-300 ease-in-out hover:scale-110
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                      focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 motion-reduce:transform-none
                      ${link.bgColor} ${link.hoverBgColor} ${link.textColor}
                    `}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
