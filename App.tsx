import React, { useState, useEffect, useRef } from 'react';
import SocialLinkButton from './components/SocialLinkButton';
import { PRIMARY_LINKS, CONTACT_LINKS } from './constants';

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// Video Background Component
const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log("Video element found:", video);
      
      // Add event listeners for debugging
      video.addEventListener('loadstart', () => console.log("Video loading started"));
      video.addEventListener('loadeddata', () => console.log("Video data loaded"));
      video.addEventListener('canplay', () => console.log("Video can play"));
      video.addEventListener('error', (e) => console.error("Video error:", e));
      
      // Force video to play immediately
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Video started playing successfully");
        }).catch(error => {
          console.log("Auto-play was prevented:", error);
          // Fallback: try to play after user interaction
          const handleUserInteraction = () => {
            console.log("Attempting to play after user interaction");
            video.play().then(() => {
              console.log("Video started playing after interaction");
            }).catch(e => console.log("Play after interaction failed:", e));
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
          };
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
        });
      }
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover opacity-50"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          filter: 'blur(1px) brightness(0.8)',
          transform: 'scale(1.05)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        {/* Using local video file */}
        <source src="/video/Download.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>
      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/40 to-gray-900/60" style={{ zIndex: 2 }}></div>
    </div>
  );
};

// Typing Animation Hook
const useTypingText = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // Start typing after 1 second delay
    const startTimeout = setTimeout(() => {
      setStartTyping(true);
    }, 1000);

    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (startTyping && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, startTyping]);

  return displayText;
};

// Add custom styles for cool animation
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
`;

const App: React.FC = () => {
  const [passportStamps, setPassportStamps] = useState<{x: number, y: number, id: string}[]>([]);
  const typingText = useTypingText("YOUR GATEWAY TO THE WORLD", 40);

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handlePassportStamp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now().toString();

    setPassportStamps(prev => [...prev, { x, y, id }]);

    setTimeout(() => {
      setPassportStamps(prev => prev.filter(stamp => stamp.id !== id));
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Video Background */}
      <VideoBackground />

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-2xl shadow-2xl p-6 md:p-8 text-center border border-white/30 bg-white/20 backdrop-blur-xl animate-tilt-load">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="relative inline-block">
              <img
                src="/image/image.jpg?v=2"
                alt="Global Immigateway Logo"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white/30 shadow-lg object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Global Immigateway
            </h1>
            <p className="text-md text-slate-300 mt-1 h-6">
              {typingText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* Action Links */}
          <div className="space-y-4">
            <a
              href="https://www.google.com/search?sca_esv=6e20e6c2949c4c68&rlz=1CDGOYI_enLK1016LK1016&hl=en-US&q=canada+gateway+immigration+consultants+reviews&uds=AOm0WdHmhxkZ4wIyCKRo0CHUx4u1LX9wtC_AsCGNWYyXJ-udYBgANhBNvJZT2Eb5b9t0VpP1Mx6Woshh--wwz4G_rzGxBRYeZQkGZ-APkO1dDbqbtDbvl57YF5wr0aMmERSHfB11hPWK5-Fpj600pnEAjL6ecNxKQ8Jx2Hra99uS4L6Hi5rG2Tjh41dtlrXYt6NEcoPe_QKgDXtx4_29d94pPXA53p_EjEiXZrzxtPELbt_RiqMCClJHuOjdAC11kNH5j_VRen59Mg1fSx17EHw1S-tMiN_jtzdcKZrQ9MAL7EArowpCk2fCi24CUBzyeEZ4nH1lI45hMGND1-RY0Bgr2eGaJpGX_M7ASR5IR9FDYt1T7dsqKKqcOEGi5CBJRFw1sGeIEkytVRmox-7mwc_k4ujObKI4JJ0Ix3fhmIF2BiYtbdPne1VfjyzIaQd1cDrGxLWE3Hh_sxE7uCUZGqro6pG7-2Eu5Ug00zzLZgq8Y8KjrkF_PcUu9whjDirl68p2losXO4F2&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EyKY2nbymmA8pZNHMPPf-oX6TbZPIB51M_Lh0ojFE_W3zkoj__xFJwYDSgLuGMbl3wEq2din22UhXqIc_zrjeY-nqFu42FHC8ZrGo058vFuIMUy3-P-xTQWvVnn0tqCegWEo4Q0%3D&sa=X&ved=2ahUKEwj8j5vnsa2QAxUXjGMGHe2eLykQk8gLegQIGhAB&ictx=1&stq=1&cs=1&lei=slfzaPzuG5eYjuMP7b2-yQI#ebo=2"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePassportStamp}
              className="group relative flex items-center justify-center w-full p-4 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 font-bold text-lg shadow-xl bg-yellow-600 hover:bg-yellow-700 text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="mr-3 relative z-10"><StarIcon /></span>
              <span className="relative z-10">Add a Review</span>
            </a>

            <div className="text-center py-4">
              <p className="text-3xl font-bold text-white animate-pulse">Follow us on our social media!!</p>
            </div>

            {PRIMARY_LINKS.map((link) => (
              <SocialLinkButton key={link.name} link={link} />
            ))}

            {/* Contact Links */}
            <div className="mt-6 flex justify-center space-x-4">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      relative flex items-center justify-center w-12 h-12 rounded-full
                      transition-all duration-300 ease-in-out transform hover:scale-110
                      shadow-lg
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                      ${link.bgColor} ${link.hoverBgColor} ${link.textColor}
                    `}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;