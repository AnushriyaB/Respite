import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Coffee, Book, Music, Heart, VolumeX, Volume2 } from 'lucide-react';
import "../index.css";

const Respite = () => {
  const [isResting, setIsResting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStyle, setCurrentStyle] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [restTime, setRestTime] = useState(0);
  const [isZoneExpanded, setIsZoneExpanded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const audioRef = useRef(null);

  const restStyles = [
    {
      name: "Dream Space",
      icon: <Moon className="w-6 h-6" />,
      bgColor: "bg-indigo-100",
      activeColor: "bg-indigo-100",
      shadowColor: "rgba(99, 102, 241, 0.5)",
      message: "Finding peace in stillness 😌",
      soundDescription: "Gentle white noise with soft chimes",
      audioFile: "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/dream-space.mp3"
    },
    {
      name: "Café Corner",
      icon: <Coffee className="w-6 h-6" />,
      bgColor: "bg-amber-100",
      activeColor: "bg-amber-100",
      shadowColor: "rgba(251, 191, 36, 0.5)",
      message: "Coffee break time ☕",
      soundDescription: "Cozy café ambiance",
      audioFile: "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/cafe-corner.mp3"
    },
    {
      name: "Study Sanctuary",
      icon: <Book className="w-6 h-6" />,
      bgColor: "bg-green-100",
      activeColor: "bg-green-100",
      shadowColor: "rgba(16, 185, 129, 0.5)",
      message: "Focus mode activated 📚",
      soundDescription: "Soft lo-fi beats",
      audioFile: "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/study-sanctuary.mp3"
    },
    {
      name: "Melody Maven",
      icon: <Music className="w-6 h-6" />,
      bgColor: "bg-purple-100",
      activeColor: "bg-purple-100",
      shadowColor: "rgba(192, 132, 252, 0.5)",
      message: "Vibing to the rhythm 🎵",
      soundDescription: "Calming piano melodies",
      audioFile: "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/melody-maven.mp3"
    },
    {
      name: "Nature Nook",
      icon: <Heart className="w-6 h-6" />,
      bgColor: "bg-emerald-100",
      activeColor: "bg-emerald-100",
      shadowColor: "rgba(16, 185, 129, 0.5)",
      message: "Connected with nature 🌿",
      soundDescription: "Peaceful forest sounds",
      audioFile: "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/nature-nook.mp3"
    }
  ];

  const getFormattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;
    if (isResting) {
      timer = setInterval(() => {
        setRestTime((prev) => {
          if (prev + 1 >= 5) {
            setIsZoneExpanded(true);
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setRestTime(0);
      setIsZoneExpanded(false);
    }
    return () => clearInterval(timer);
  }, [isResting]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResting) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isResting]);

  useEffect(() => {
    if (isResting && !isMuted) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audioInstance = new Audio(restStyles[currentStyle].audioFile);
      audioInstance.loop = true;
      audioInstance.volume = 0.5;
      audioInstance.play().catch((error) => console.log("Audio playback failed:", error));
      audioRef.current = audioInstance;
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isResting, currentStyle, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 relative overflow-hidden flex flex-col items-center justify-center ${restStyles[currentStyle].bgColor}`}
      style={{ cursor: 'none' }}
    >
      {/* Anushriya Button */}
      <motion.a
        href="https://anushriyabhardwaj.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg transition-all hover:bg-gray-700 z-40"
        onMouseEnter={() => setHoveredButton(true)}
        onMouseLeave={() => setHoveredButton(false)}
        style={{
          backgroundColor: restStyles[currentStyle].shadowColor,
          color: "#fff"
        }}
      >
        {hoveredButton ? "Know about Anushriya ↗️" : "Anushriya 👩🏻‍💻"}
      </motion.a>

      {/* Background Overlay */}
      {isZoneExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 bg-black z-10"
        />
      )}

      {/* Header */}
      <motion.div
        className={`text-center mt-1 mb-14 z-${isZoneExpanded ? 0 : 20}`}
        animate={{ opacity: isZoneExpanded ? 0.5 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <h1 className="text-[64px] font-medium font-['Chillax'] text-gray-800">
          Respite
        </h1>
        <p className="text-[18px] font-normal tracking-wide uppercase opacity-70 mt-1 font-['Inter'] text-gray-600">
          A peaceful retreat for your cursor
        </p>
      </motion.div>

      {/* Theme Tabs */}
      <motion.div
        className={`mt-2 mb-8 flex items-center space-x-6 z-${isZoneExpanded ? 0 : 20}`}
        animate={{ opacity: isZoneExpanded ? 0.5 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {restStyles.map((style, index) => (
          <button
            key={index}
            className={`p-3 rounded-full shadow-lg transition-all ${
              currentStyle === index ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'
            }`}
            onClick={() => setCurrentStyle(index)}
          >
            {style.icon}
          </button>
        ))}
      </motion.div>

      {/* Rest Area */}
      <motion.div
        className={`relative flex flex-col items-center transition-all z-20 rounded-xl`}
        animate={{
          width: isZoneExpanded ? '80vw' : '20rem',
          height: isZoneExpanded ? '80vh' : '20rem'
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut'
        }}
        style={{
          transition: 'transform 1.8s ease-in-out',
          transformOrigin: 'center',
          boxShadow: `0 10px 30px ${restStyles[currentStyle].shadowColor}`
        }}
        onMouseEnter={() => setIsResting(true)}
        onMouseLeave={() => setIsResting(false)}
      >
        <motion.div
          className={`rounded-xl ${restStyles[currentStyle].bgColor} flex items-center justify-center shadow-lg relative overflow-hidden`}
          style={{
            width: '100%',
            height: '100%',
            transformOrigin: 'center'
          }}
        >
          <motion.div
            className="relative z-10"
            initial={{ opacity: 1 }}
            animate={isResting ? { opacity: 0.6 } : { opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            {restStyles[currentStyle].icon}
          </motion.div>
        </motion.div>

        {/* Timer and Message */}
        <AnimatePresence>
          {isResting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 text-center"
              transition={{
                duration: 0.5,
                ease: 'easeInOut'
              }}
            >
              <div className="text-[18px] font-normal tracking-wide uppercase opacity-70 mt-2 font-['Inter'] text-gray-60 whitespace-nowrap">
                {getFormattedTime(restTime)}
              </div>
              <div className="text-[16px] font-normal tracking-wide uppercase opacity-70 mt-2 font-['Inter'] text-gray-600 whitespace-nowrap">
                {restStyles[currentStyle].message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Sound Control */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-30"
        animate={{ opacity: isZoneExpanded ? 0.5 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <motion.button
          className="p-4 bg-white/80 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-gray-600" />
          ) : (
            <Volume2 className="w-6 h-6 text-gray-600" />
          )}
        </motion.button>

        <AnimatePresence>
          {!isMuted && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 backdrop-blur rounded-lg shadow-lg px-4 py-2"
            >
              <p className="text-sm text-gray-600">
                {restStyles[currentStyle].soundDescription}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Custom Cursor */}
      <motion.div
        className={`fixed w-8 h-8 pointer-events-none rounded-full z-50`}
        style={{
          top: mousePosition.y - 24,
          left: mousePosition.x - 24,
          background: isResting
            ? `radial-gradient(circle, ${restStyles[currentStyle].shadowColor} 100%, ${restStyles[currentStyle].bgColor} 0%)`
            : `linear-gradient(135deg, #ff6ec4, #7873f5, #42e695)`,
          backgroundSize: isResting ? "100% 100%" : "200% 200%",
          boxShadow: isResting
            ? `0 0 10px 4px ${restStyles[currentStyle].shadowColor}`
            : `0 0 30px 10px ${restStyles[currentStyle].shadowColor}`,
          filter: isResting ? "none" : "saturate(0) brightness(2)"
        }}
        animate={{
          scale: isResting ? [1, 0.8, 0.6] : [1, 1.1],
          opacity: isResting ? [1, 0.8] : 1,
          backgroundPosition: isResting ? "50% 50%" : ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: isResting ? 10 : 1,
          ease: "easeInOut",
          repeat: isResting ? Infinity : 0
        }}
      />
    </div>
  );
};

export default Respite;
