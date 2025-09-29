import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Coffee,
  Book,
  Music,
  VolumeX,
  Volume2,
  Star,
  Sparkles,
  Zap,
  Lightbulb,
  Target,
  Brain,
  TreePine,
  Leaf,
  Globe,
  Waves,
  Sun,
  Cloud,
} from "lucide-react";
import "../index.css";

const Respite = () => {
  const [isResting, setIsResting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStyle, setCurrentStyle] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [restTime, setRestTime] = useState(0);
  const [isZoneExpanded, setIsZoneExpanded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const audioRef = useRef(null);
  const charIndexRef = useRef(0);

  const restStyles = [
    {
      name: "Dream Space",
      icon: <Moon className="w-6 h-6" />,
      bgColor: "bg-indigo-100",
      activeColor: "bg-indigo-100",
      shadowColor: "rgba(99, 102, 241, 0.5)",
      cursorGradient:
        "radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.6) 25%, rgba(79, 70, 229, 0.4) 50%, rgba(67, 56, 202, 0.2) 75%, rgba(55, 48, 163, 0.1) 100%)",
      messages: [
        "you are not broken you are breaking through",
        "i am learning to love the sound of my feet walking away from things not meant for me",
        "you must want to spend the rest of your life with yourself first",
        "still i rise like dust i rise",
        "i am a woman phenomenally phenomenal woman that's me",
        "you may write me down in history with your bitter twisted lies",
        "you may trod me in the very dirt but still like dust i'll rise",
        "i am not afraid of storms for i am learning how to sail my ship",
        "there is no greater agony than bearing an untold story inside you",
        "nothing can dim the light that shines from within",
        "you are your best thing",
        "i come as one but i stand as ten thousand",
      ],
      soundDescription: "Gentle white noise with soft chimes",
      audioFile:
        "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/dream-space.mp3",
    },
    {
      name: "Café Corner",
      icon: <Coffee className="w-6 h-6" />,
      bgColor: "bg-amber-100",
      activeColor: "bg-amber-100",
      shadowColor: "rgba(251, 191, 36, 0.5)",
      cursorGradient:
        "radial-gradient(circle at 70% 30%, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.6) 25%, rgba(217, 119, 6, 0.4) 50%, rgba(180, 83, 9, 0.2) 75%, rgba(146, 64, 14, 0.1) 100%)",
      messages: [
        "Coffee is the second most traded commodity in the world after oil",
        "Finland consumes the most coffee per capita in the world",
        "The word coffee comes from the Arabic word qahwah meaning wine",
        "Coffee beans are actually seeds from the coffee cherry fruit",
        "The first coffeehouse opened in Constantinople in 1475",
        "Coffee was discovered by an Ethiopian goat herder named Kaldi",
        "Brazil produces about 40% of the world's coffee supply",
        "Coffee can reduce the risk of type 2 diabetes by up to 50%",
        "The most expensive coffee in the world is Kopi Luwak from Indonesia",
        "Coffee contains over 1000 chemical compounds",
        "The first webcam was created to monitor a coffee pot at Cambridge University",
        "Coffee was banned in Mecca in 1511 for being a drug",
      ],
      soundDescription: "Cozy café ambiance",
      audioFile:
        "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/cafe-corner.mp3",
    },
    {
      name: "Study Sanctuary",
      icon: <Book className="w-6 h-6" />,
      bgColor: "bg-sky-100",
      activeColor: "bg-sky-100",
      shadowColor: "rgba(56, 189, 248, 0.5)",
      cursorGradient:
        "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.8) 0%, rgba(14, 165, 233, 0.6) 25%, rgba(2, 132, 199, 0.4) 50%, rgba(3, 105, 161, 0.2) 75%, rgba(7, 89, 133, 0.1) 100%)",
      messages: ["You can do it, keep your focus"],
      soundDescription: "Soft lo-fi beats",
      audioFile:
        "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/study-sanctuary.mp3",
    },
    {
      name: "Melody Maven",
      icon: <Music className="w-6 h-6" />,
      bgColor: "bg-purple-100",
      activeColor: "bg-purple-100",
      shadowColor: "rgba(192, 132, 252, 0.5)",
      cursorGradient:
        "radial-gradient(circle at 40% 60%, rgba(192, 132, 252, 0.8) 0%, rgba(168, 85, 247, 0.6) 25%, rgba(147, 51, 234, 0.4) 50%, rgba(126, 34, 206, 0.2) 75%, rgba(109, 40, 217, 0.1) 100%)",
      messages: [
        "Music activates more parts of the brain than any other human activity",
        "The oldest known musical instrument is a 40,000-year-old bone flute",
        "Listening to music can reduce anxiety by up to 65%",
        "Mozart's music can temporarily boost spatial reasoning abilities",
        "The Beatles' song Yesterday has been covered over 2,200 times",
        "Music therapy can help stroke patients recover speech",
        "The human brain can recognize a song in just 0.1 seconds",
        "Playing music increases the brain's gray matter volume",
        "The world's longest concert lasted 639 years and is still ongoing",
        "Music can synchronize heartbeats between people",
        "The first music streaming service was launched in 1994",
        "Classical music can help plants grow faster",
      ],
      soundDescription: "Calming piano melodies",
      audioFile:
        "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/melody-maven.mp3",
    },
    {
      name: "Nature Nook",
      icon: <TreePine className="w-6 h-6" />,
      bgColor: "bg-emerald-100",
      activeColor: "bg-emerald-100",
      shadowColor: "rgba(16, 185, 129, 0.5)",
      cursorGradient:
        "radial-gradient(circle at 60% 40%, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.6) 25%, rgba(4, 120, 87, 0.4) 50%, rgba(6, 95, 70, 0.2) 75%, rgba(6, 78, 59, 0.1) 100%)",
      messages: [
        "Trees can live for thousands of years",
        "The Amazon produces 20% of Earth's oxygen",
        "A single tree can absorb 48 pounds of CO2 yearly",
        "Forests are home to 80% of terrestrial biodiversity",
        "Nature is the original internet - everything is connected",
        "Yellowstone National Park was the first national park in the world",
        "The Great Barrier Reef is visible from space",
        "Yosemite's Half Dome rises 4,737 feet above the valley floor",
        "Grand Canyon is 277 miles long and up to 18 miles wide",
        "Banff National Park in Canada spans 2,564 square miles",
        "The Serengeti hosts the world's largest mammal migration",
        "Mount Everest grows about 4mm taller each year",
        "The Amazon rainforest covers 2.1 million square miles",
        "Antarctica is the driest continent on Earth",
        "The Pacific Ocean is larger than all land masses combined",
      ],
      soundDescription: "Peaceful forest sounds",
      audioFile:
        "https://github.com/AnushriyaB/Respite/raw/refs/heads/main/public/audio/nature-nook.mp3",
    },
  ];

  const getFormattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getCurrentMessage = () => {
    const currentMessages = restStyles[currentStyle].messages;
    return currentMessages[messageIndex % currentMessages.length];
  };

  const renderMessageWithIcon = (message) => {
    // Get the appropriate icon for the current mode
    const getModeIcon = () => {
      const currentMode = restStyles[currentStyle];
      switch (currentMode.name) {
        case "Dream Space":
          return <Moon className="w-4 h-4 inline mr-1" />;
        case "Café Corner":
          return <Coffee className="w-4 h-4 inline mr-1" />;
        case "Study Sanctuary":
          return <Book className="w-4 h-4 inline mr-1" />;
        case "Melody Maven":
          return <Music className="w-4 h-4 inline mr-1" />;
        case "Nature Nook":
          return <TreePine className="w-4 h-4 inline mr-1" />;
        default:
          return null;
      }
    };

    // Check if this is a poem (Dream Space messages)
    const isPoem = restStyles[currentStyle].name === "Dream Space";

    return (
      <span className={isPoem ? "italic" : ""}>
        {getModeIcon()}
        {message}
      </span>
    );
  };

  // Typewriter effect
  useEffect(() => {
    if (!isZoneExpanded) {
      setDisplayedText("");
      setIsTyping(false);
      charIndexRef.current = 0;
      return;
    }

    const currentMessage = getCurrentMessage();

    // For Study Sanctuary, show text immediately without typing effect
    if (restStyles[currentStyle].name === "Study Sanctuary") {
      setDisplayedText(currentMessage);
      setIsTyping(false);
      return;
    }

    // For other modes, use the typing effect
    charIndexRef.current = 0;
    setIsTyping(true);

    const typeNextChar = () => {
      if (charIndexRef.current < currentMessage.length) {
        setDisplayedText(currentMessage.slice(0, charIndexRef.current + 1));
        charIndexRef.current++;
        setTimeout(typeNextChar, 50); // Typing speed
      } else {
        setIsTyping(false);
        // Wait 5 seconds then move to next message
        setTimeout(() => {
          setMessageIndex((prevIndex) => prevIndex + 1);
          setDisplayedText("");
        }, 5000); // Wait 5 seconds before next message
      }
    };

    typeNextChar();
  }, [isZoneExpanded, messageIndex, currentStyle]);

  // Deletion effect removed - now using direct message cycling

  useEffect(() => {
    let timer;
    if (isResting) {
      timer = setInterval(() => {
        setRestTime((prev) => {
          if (prev + 1 >= 2) {
            setIsZoneExpanded(true);
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setRestTime(0);
      setIsZoneExpanded(false);
      setMessageIndex(0);
      setDisplayedText("");
      setIsTyping(false);
    }
    return () => clearInterval(timer);
  }, [isResting]);

  // Reset message index when style changes
  useEffect(() => {
    setMessageIndex(0);
    setDisplayedText("");
    setIsTyping(false);
  }, [currentStyle]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isZoneExpanded) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isZoneExpanded]);

  // Keyboard event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isResting) {
        setIsResting(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResting]);

  useEffect(() => {
    if (isResting && !isMuted) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audioInstance = new Audio(restStyles[currentStyle].audioFile);
      audioInstance.loop = true;
      audioInstance.volume = 0.5;
      audioInstance
        .play()
        .catch((error) => console.log("Audio playback failed:", error));
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
      style={{ cursor: "none" }}
    >
      {/* Anushriya Button */}
      <motion.a
        href="https://anushriya.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 px-4 py-2 rounded-full shadow-lg transition-all z-40"
        onMouseEnter={() => setHoveredButton(true)}
        onMouseLeave={() => setHoveredButton(false)}
        style={{
          backgroundColor: restStyles[currentStyle].shadowColor,
          color: "#fff",
          transform: hoveredButton ? "scale(1.05)" : "scale(1)",
          transition:
            "transform 0.4s ease-in-out, background-color 0.4s ease-in-out",
        }}
      >
        {hoveredButton ? "Anushriya ↗" : "Anushriya"}
      </motion.a>

      {/* Background Overlay */}
      {isZoneExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-black z-10"
        />
      )}

      {/* Header - Top Left */}
      <motion.div
        className={`fixed top-6 left-6 z-${isZoneExpanded ? 0 : 20}`}
        animate={{ opacity: isZoneExpanded ? 0.5 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="text-[32px] font-medium font-sans text-gray-800">
          Respite
        </h1>
        <p className="text-[14px] font-normal tracking-wide opacity-70 mt-1 font-sans text-gray-600 leading-relaxed">
          Move your cursor into the box to start your break.
        </p>
      </motion.div>

      {/* Main Content Container - Centered */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-16 pb-20">
        {/* Theme Tabs */}
        <motion.div
          className={`mb-12 flex items-center space-x-6 z-${
            isZoneExpanded ? 0 : 20
          }`}
          animate={{ opacity: isZoneExpanded ? 0.5 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {restStyles.map((style, index) => (
            <button
              key={index}
              className={`p-3 rounded-full shadow-lg transition-all ${
                currentStyle === index
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-600"
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
            width: isZoneExpanded ? "80vw" : "20rem",
            height: isZoneExpanded ? "80vh" : "20rem",
          }}
          transition={{
            duration: isResting ? 0.8 : 0.3,
            ease: isResting ? "easeInOut" : "easeOut",
          }}
          style={{
            transition: isResting
              ? "transform 0.8s ease-in-out"
              : "transform 0.3s ease-out",
            transformOrigin: "center",
            boxShadow: `0 10px 30px ${restStyles[currentStyle].shadowColor}`,
          }}
          onMouseEnter={() => setIsResting(true)}
          onMouseLeave={() => setIsResting(false)}
        >
          <motion.div
            className={`rounded-xl ${restStyles[currentStyle].bgColor} flex items-center justify-center shadow-lg relative overflow-hidden`}
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: "center",
            }}
          >
            <motion.div
              className="relative z-10"
              initial={{ opacity: 1 }}
              animate={isResting ? { opacity: 0.6 } : { opacity: 1 }}
              transition={{
                duration: isResting ? 2 : 0.2,
                ease: isResting ? "easeInOut" : "easeOut",
              }}
            >
              {restStyles[currentStyle].icon}
            </motion.div>
          </motion.div>

          {/* Timer and Message */}
          <AnimatePresence>
            {isZoneExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 text-center"
                transition={{
                  duration: isResting ? 0.5 : 0.1,
                  ease: isResting ? "easeInOut" : "easeOut",
                }}
              >
                <div className="text-[18px] font-normal tracking-wide uppercase opacity-70 mt-2 font-sans text-gray-60 whitespace-nowrap">
                  {getFormattedTime(restTime)}
                </div>
                <div className="text-[16px] font-normal tracking-wide opacity-70 mt-2 font-sans text-gray-600 whitespace-nowrap flex items-center">
                  {displayedText && renderMessageWithIcon(displayedText)}
                  <span className="animate-pulse ml-1">|</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Exit Instructions Text */}
          <AnimatePresence>
            {isZoneExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 left-4 z-30"
                transition={{
                  duration: isZoneExpanded ? 0.3 : 0.1,
                  delay: isZoneExpanded ? 0.5 : 0,
                  ease: "easeOut",
                }}
              >
                <p
                  className="text-xs font-medium tracking-wide"
                  style={{
                    color: restStyles[currentStyle].shadowColor.replace(
                      "0.5",
                      "0.8"
                    ),
                  }}
                >
                  Move cursor or press Esc to exit
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Sound Control */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-30"
        animate={{ opacity: isZoneExpanded ? 0.5 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
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
            ? restStyles[currentStyle].cursorGradient
            : `linear-gradient(135deg, #ff6ec4, #7873f5, #42e695)`,
          backgroundSize: isResting ? "100% 100%" : "200% 200%",
          boxShadow: isResting
            ? `0 0 10px 4px ${restStyles[currentStyle].shadowColor}`
            : `0 0 30px 10px ${restStyles[currentStyle].shadowColor}`,
          filter: isResting ? "none" : "saturate(0) brightness(2)",
        }}
        animate={{
          scale: isResting ? [1, 6, 1] : [1, 1.1],
          opacity: isResting ? [1, 0.8] : 1,
          backgroundPosition: isResting ? "50% 50%" : ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: isResting ? 8 : 0.2,
          ease: isResting ? "easeInOut" : "easeOut",
          repeat: isResting ? Infinity : 0,
        }}
      />
    </div>
  );
};

export default Respite;
