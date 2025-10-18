import React, { useState, useEffect } from 'react';
import SocialLinkButton from './components/SocialLinkButton';
import { PRIMARY_LINKS, CONTACT_LINKS } from './constants';

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// Realistic Maple Leaf SVG Component using imported SVG
const MapleLeafIcon = ({ size = 45, delay = 0 }: { size?: number; delay?: number }) => (
  <div
    className="absolute pointer-events-none opacity-40"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${Math.random() * 100}%`,
      animation: `float-maple ${15 + Math.random() * 10}s linear 0s infinite`,
      top: '-80px',
    }}
  >
    <img
      src="/image/maple-leaf-svgrepo-com (1).svg"
      alt="Maple Leaf"
      className="w-full h-full"
      style={{
        filter: 'drop-shadow(0 0 3px rgba(255, 107, 53, 0.3))'
      }}
    />
  </div>
);

// Globe Component
const GlobeComponent = () => (
  <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
    <div
      className="w-32 h-32 rounded-full border-2 border-white relative"
      style={{ animation: 'rotate-globe 30s linear infinite' }}
    >
      <div className="absolute inset-0 rounded-full border border-white/30"
           style={{ transform: 'rotateY(60deg)' }}></div>
      <div className="absolute inset-0 rounded-full border border-white/20"
           style={{ transform: 'rotateY(120deg)' }}></div>
    </div>
  </div>
);

// Flight Path Trails
const FlightPath = () => (
  <svg className="absolute inset-0 pointer-events-none opacity-10" width="100%" height="100%">
    <path
      d="M 20 30 Q 40 20, 60 35 T 100 30"
      stroke="white"
      strokeWidth="1"
      fill="none"
      strokeDasharray="5,5"
      style={{ animation: 'dash-move 20s linear infinite' }}
    />
    <path
      d="M 80 70 Q 70 50, 85 40 T 95 20"
      stroke="white"
      strokeWidth="1"
      fill="none"
      strokeDasharray="5,5"
      style={{ animation: 'dash-move 25s linear infinite' }}
    />
    <circle r="2" fill="white" style={{ animation: 'move-along-path 15s linear infinite' }}>
      <animateMotion dur="15s" repeatCount="indefinite">
        <mpath href="#flightPath1"/>
      </animateMotion>
    </circle>
    <path id="flightPath1" d="M 20 30 Q 40 20, 60 35 T 100 30" fill="none"/>
  </svg>
);

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

// 3D Card Flip Component
const FlipCard = ({ children }: { children: React.ReactNode }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full backface-hidden rounded-2xl shadow-2xl p-6 md:p-8 text-center border border-white/30 bg-white/20 backdrop-blur-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {React.Children.toArray(children)[0]}
        </div>
        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden rounded-2xl shadow-2xl p-6 md:p-8 text-center border border-white/30 bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {React.Children.toArray(children)[1] || (
            <div className="text-white">
              <h3 className="text-xl font-bold mb-4">About Canada Gateway</h3>
              <p className="text-sm opacity-80 mb-4">
                We are your trusted partners in making your Canadian dream a reality.
              </p>
              <div className="text-xs opacity-60">
                <p>📞 Contact: 076-691-9362</p>
                <p>📧 Email: info@migratetocanada.com</p>
                <p>🌐 www.migrateto-canada.com</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
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
  @keyframes float-maple {
    0% {
      transform: translateY(-80px) translateX(0) rotate(0deg) scale(0.8);
      opacity: 0;
    }
    10% {
      opacity: 0.4;
      transform: translateY(-60px) translateX(10px) rotate(15deg) scale(1);
    }
    25% {
      transform: translateY(-20px) translateX(-15px) rotate(60deg) scale(1.1);
    }
    40% {
      transform: translateY(20px) translateX(20px) rotate(120deg) scale(1.2);
    }
    60% {
      transform: translateY(40vh) translateX(-10px) rotate(240deg) scale(1.1);
    }
    75% {
      transform: translateY(60vh) translateX(15px) rotate(300deg) scale(1);
    }
    90% {
      opacity: 0.4;
      transform: translateY(80vh) translateX(5px) rotate(345deg) scale(0.9);
    }
    100% {
      transform: translateY(calc(100vh + 80px)) translateX(0) rotate(360deg) scale(0.8);
      opacity: 0;
    }
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
  const typingText = useTypingText("We make your Canada dream come true", 40);

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
      {/* Floating Maple Leaves */}
      {[...Array(15)].map((_, i) => (
        <MapleLeafIcon key={i} size={40 + Math.random() * 20} delay={i * 1} />
      ))}

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-2xl shadow-2xl p-6 md:p-8 text-center border border-white/30 bg-white/20 backdrop-blur-xl animate-tilt-load">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="relative inline-block">
              <img
                src="/image/image.jpg"
                alt="Canada Gateway Immigration Consultants Logo"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white/30 shadow-lg object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Canada Gateway Immigration Consultants
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