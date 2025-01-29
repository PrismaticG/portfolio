import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { FiHome, FiFilm, FiInfo, FiPlay, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";


const videos = [
  { title: "TbhHonest SHORT", url: "https://www.youtube.com/embed/jWyxWQcPRy0" },
  { title: "GAMBLING CONTENT", url: "https://www.youtube.com/embed/AqgEdVy4niM" },
  { title: "LEAGUE MONTAGE", url: "https://www.youtube.com/embed/ouvJkNiuML0" },
  { title: "OVERWATCH CONTENT", url: "https://www.youtube.com/embed/QZGdZXFB41c" },
  { title: "LEAGUE GAMEPLAY", url: "https://www.youtube.com/embed/07_6aursd5Y" },
  { title: "UNRANKED TO CHALL", url: "https://www.youtube.com/embed/-4htmp8DdFg" },
  { title: "UNRANKED TO CHALL", url: "https://www.youtube.com/embed/wL10X4ENMao" },
  { title: "GTA V", url: "https://www.youtube.com/embed/vthpiVmRTb8?si=GeKLeNS3cZx3mCSq" },
  { title: "SETUP TOUR", url: "https://www.youtube.com/embed/rDfh0h3Nh1U?si=WV3B6xdPwJLPx4-e" },
  { title: "DOCUMENTARY SHORT", url: "https://www.youtube.com/embed/7ODXkgVXC7E?si=f3vIn84JZppL2lEi" },

];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-black/90 backdrop-blur-lg flex flex-col py-6 z-50 border-r border-gray-800 shadow-lg"
      initial={{ width: 80 }}
      animate={{ width: isExpanded ? 240 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="w-full space-y-4">
        <NavLink to="/" icon={<FiHome />} label="Home" isActive={location.pathname === "/"} isExpanded={isExpanded} />
        <NavLink to="/videos" icon={<FiFilm />} label="Portfolio" isActive={location.pathname === "/videos"} isExpanded={isExpanded} />
        <NavLink to="/about" icon={<FiInfo />} label="About" isActive={location.pathname === "/about"} isExpanded={isExpanded} />
      </nav>
    </motion.div>
  );
};

const NavLink = ({ to, icon, label, isActive, isExpanded }) => (
  <Link
    to={to}
    className={`flex items-center gap-4 px-6 py-3 transition-all ${
      isActive ? "text-white bg-white/10" : "text-gray-300 hover:text-white"
    }`}
  >
    <span className={`text-2xl ${isActive ? "text-cyan-400" : ""}`}>{icon}</span>
    <AnimatePresence>
      {isExpanded && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="text-lg"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </Link>
);

const VideoGallery = () => (
   <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl p-8 mx-auto"  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {videos.map((video, index) => (
      <motion.div 
        key={index} 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ delay: index * 0.05 }} 
        className="group relative overflow-hidden rounded-xl bg-black shadow-2xl"
      >
        <div className="relative w-full pt-[56.25%]">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src={video.url}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <h3 className="text-white text-lg font-medium">{video.title}</h3>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

const About = () => (
  <motion.div className="w-full max-w-4xl p-8 space-y-8 text-center mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        About Me
      </h1>
      <img 
        src="/test.png" 
        alt="Profile" 
        className="w-48 h-48 mx-auto rounded-xl border-4 border-cyan-400 object-cover shadow-xl"
      />
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Professional video editor specializing in dynamic gameplay edits and cinematic storytelling.
        With 5+ years of experience creating engaging content for gaming creators and esports organizations.
      </p>
		<div className="flex items-center gap-3 text-lg text-gray-300 mt-4">
        <FaDiscord size={24} className="text-cyan-400" />
        <span className="font-medium">Discord: athernals</span>
      </div>
    </div>
  </motion.div>
);

const ShowreelModal = ({ isOpen, closeModal }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-6xl mx-4">
            <button className="absolute -top-12 right-0 text-white hover:text-cyan-400 z-50" onClick={closeModal}>
              <FiX size={32} />
            </button>
            
            <motion.div
              key={currentVideoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            >
              <iframe
                className="w-full h-full"
                src={`${videos[currentVideoIndex].url}?autoplay=1&mute=1`}
                title="Showreel"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>

            <div className="absolute inset-y-0 left-0 flex items-center justify-center w-16">
              <button onClick={handlePrev} className="p-3 text-white hover:text-cyan-400 transition-colors">
                <FiChevronLeft size={32} />
              </button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center justify-center w-16">
              <button onClick={handleNext} className="p-3 text-white hover:text-cyan-400 transition-colors">
                <FiChevronRight size={32} />
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
              {videos[currentVideoIndex].title}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Home = ({ openShowreel }) => (
  <motion.div className="w-full h-screen flex flex-col justify-center items-center text-center p-8">
    <div className="relative z-10 space-y-8 w-full max-w-3xl"> {/* Added max-width */}
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        initial={{ letterSpacing: "0em" }}
        animate={{ letterSpacing: "0.05em" }}
      >
        CINEMATIC STORYTELLING
      </motion.h1>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold shadow-xl hover:shadow-2xl flex items-center gap-2 mx-auto"
        onClick={openShowreel}
      >
        <FiPlay size={24} />
        Watch Showreel
      </motion.button>
    </div>
  </motion.div>
);

export default function Portfolio() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <Router>
      <Sidebar />
      <div className="relative min-h-screen text-white overflow-hidden">
        <div className="fixed inset-0 -z-50">
          <video className="w-full h-full object-cover opacity-20" autoPlay loop muted playsInline>
            <source src="/alertPSYOPS.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/30" />
        </div>

        {/* Main content container with sidebar-aware padding */}
        <div className="max-w-7xl mx-auto px-4 pl-20 md:pl-24 lg:pl-28 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home openShowreel={() => setShowreelOpen(true)} />} />
            <Route path="/videos" element={<VideoGallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        <ShowreelModal isOpen={showreelOpen} closeModal={() => setShowreelOpen(false)} />
      </div>
    </Router>
  );
}