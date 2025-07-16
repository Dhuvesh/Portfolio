"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Server,
  Terminal,
  Menu,
  X,
  ArrowRight,
  Volume2,
  VolumeX,
  MousePointer,
  Sparkles,
  Cpu,
  Globe,
  Monitor,
  Coffee,
  Heart,
  Star,
  Rocket,
  CloudLightningIcon as Lightning,
  Eye,
  BookOpen,
  Trophy,
  MapPin,
  Phone,
  GraduationCap,
  Briefcase,
  Calendar,
  Users,
  Gamepad2,
  Dumbbell,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse" />

        {/* Floating Code Snippets */}
        <div className="absolute top-20 left-10 opacity-20 font-mono text-xs animate-float">
          {'{ developer: "passionate" }'}
        </div>
        <div className="absolute top-40 right-20 opacity-20 font-mono text-xs animate-float-delayed">
          {'console.log("Hello World")'}
        </div>
        <div className="absolute bottom-40 left-20 opacity-20 font-mono text-xs animate-float">
          {"npm run build"}
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 font-mono text-xs animate-float-delayed">
          {'git commit -m "magic"'}
        </div>
      </div>

      <Navigation currentSection={currentSection} />
      <HeroSection isLoaded={isLoaded} />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />

      {/* Sound Toggle */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}

function Navigation({ currentSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center group cursor-pointer">
            <div className="text-2xl font-black bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              <span className="font-mono">{"<"}</span>
              <span className="font-serif italic">Dhuvesh</span>
              <span className="font-mono">{"/>"}</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-6 py-3 text-sm font-semibold transition-all duration-300 relative group rounded-full ${
                    currentSection === item.id
                      ? "text-white bg-white/10 border border-white/20"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-8 rounded-full"></span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-3 transition-all duration-300 hover:bg-white/10 rounded-full"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-black/95 backdrop-blur-xl border-b border-white/10`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl ${
                currentSection === item.id
                  ? "text-white bg-white/10 border border-white/20"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ isLoaded }) {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = [
    "Full Stack Dev",
    "MERN Stack Expert",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  const scrollToContact = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/public/resume/Dhuvesh_resume.docx"; // Place your resume.pdf in the public folder
    link.download = "Dhuvesh_resume.docx"; // Custom filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedText.length < currentWord.length) {
            setTypedText(currentWord.slice(0, typedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(typedText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );
    return () => clearTimeout(timeout);
  }, [typedText, currentWordIndex, isDeleting, words]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          {/* Left Side - Main Content */}
          <div
            className={`space-y-12 ${
              isLoaded ? "animate-slide-up" : "opacity-0"
            }`}
          >
            <div className="space-y-8">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-full backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 font-mono font-bold text-sm tracking-wider group-hover:text-white transition-colors">
                  AVAILABLE FOR OPPORTUNITIES
                </span>
                <Sparkles className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors" />
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                  <div className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text ">
                    Hi, I'm{" "}
                    <span className="relative inline-block">
                      <span className="font-serif italic">Dhuvesh Salian</span>
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-white/50 to-transparent rounded-full"></div>
                    </span>
                  </div>
                  <div className="mt-4 text-2xl md:text-4xl lg:text-5xl">
                    <span className="text-white/80">A </span>
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-mono">
                      {typedText}
                      <span className="animate-pulse">|</span>
                    </span>
                  </div>
                </h1>
                <p className="text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed font-light">
                  Information Technology student at{" "}
                  <span className="text-white font-semibold italic">TCET</span>{" "}
                  with expertise in{" "}
                  <span className="font-mono font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    MERN Stack Development
                  </span>
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 9137349465</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>dhuvesh.salian@gmail.com</span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-3">
                {["React", "Node.js", "MongoDB", "Express", "JavaScript"].map(
                  (tech, index) => (
                    <div
                      key={tech}
                      className={`group flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 ${
                        index % 2 === 0
                          ? "animate-float"
                          : "animate-float-delayed"
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <span className="text-white/90 font-semibold text-sm">
                        {tech}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <button
                  onClick={downloadResume}
                  className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-white/20 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center gap-3">
                    <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Resume
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={scrollToContact}
                  className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-white/20 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center gap-3">
                    <Coffee className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Let's Connect
                  </span>
                </button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-6">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    color: "hover:bg-gray-800",
                    url: "https://github.com/Dhuvesh", // Replace with your GitHub URL
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    color: "hover:bg-blue-600",
                    url: "https://www.linkedin.com/in/dhuveshsalian/", // Replace with your LinkedIn URL
                  },
                ].map((social, index) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-4 border border-white/20 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:scale-110 hover:border-white/40 backdrop-blur-sm ${social.color} inline-block`}
                  >
                    <social.icon className="w-6 h-6 text-white/60 group-hover:scale-110 transition-transform group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Visual */}
          <div
            className={`flex justify-center items-start ${
              isLoaded ? "animate-slide-up-delayed" : "opacity-0"
            }`}
          >
            <div className="relative -mt-40">
              <InteractiveCodeVisual />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <div className="text-xs text-white/40 font-mono tracking-widest group-hover:text-white/60 transition-colors">
            SCROLL_TO_EXPLORE
          </div>
          <ChevronDown className="w-6 h-6 text-white/40 group-hover:text-white/60 transition-colors" />
        </div>
      </div>
    </section>
  );
}

function InteractiveCodeVisual() {
  const [activeLines, setActiveLines] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLines((prev) => {
        const newLines = [...prev];
        const randomLine = Math.floor(Math.random() * 12);
        if (newLines.includes(randomLine)) {
          return newLines.filter((line) => line !== randomLine);
        } else {
          return [...newLines, randomLine].slice(-3);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const codeLines = [
    "const developer = {",
    "  name: 'Dhuvesh Salian',",
    "  role: 'Full Stack Developer',",
    "  education: 'IT @ TCET',",
    "  skills: [",
    "    'React', 'Node.js',",
    "    'MongoDB', 'Express',",
    "    'JavaScript'",
    "  ],",
    "  gpa: 8.3,",
    "  passion: 'Building Solutions',",
    "};",
  ];

  return (
    <div
      className="relative w-96 h-96 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Code Container */}
      <div
        className={`relative w-full h-full bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl backdrop-blur-sm transition-all duration-500 ${
          isHovered ? "scale-105 border-white/40" : ""
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div
              className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-green-500 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Terminal className="w-4 h-4 text-white/60" />
            <span className="text-white/60 font-mono text-sm">
              developer.js
            </span>
          </div>
        </div>

        {/* Code Content - Fixed overflow */}
        <div className="p-6 font-mono text-sm space-y-1 overflow-hidden h-80">
          {codeLines.map((line, index) => (
            <div
              key={index}
              className={`transition-all duration-300 whitespace-nowrap ${
                activeLines.includes(index)
                  ? "text-white bg-white/10 px-2 py-1 rounded"
                  : "text-white/70"
              }`}
            >
              <span className="text-white/40 mr-3 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="break-words">{line}</span>
            </div>
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-full border border-white/30 backdrop-blur-sm animate-float flex items-center justify-center">
          <Code className="w-4 h-4 text-white/60" />
        </div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-full border border-white/20 backdrop-blur-sm animate-float-delayed flex items-center justify-center">
          <Heart className="w-5 h-5 text-red-400 animate-pulse" />
        </div>
        <div className="absolute top-1/4 -left-8 w-6 h-6 bg-gradient-to-br from-white/15 to-white/5 rounded-full border border-white/25 backdrop-blur-sm animate-float flex items-center justify-center">
          <Star className="w-3 h-3 text-yellow-400" />
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );
}

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "8.45", label: "Current GPA", icon: GraduationCap },
    { number: "150+", label: "Problems Solved", icon: Trophy },
    { number: "10+", label: "Projects Built", icon: Rocket },
    { number: "2", label: "Internships", icon: Briefcase },
  ];

  const education = [
    {
      degree: "Bachelor of Engineering (B.E.)",
      institution: "Thakur College of Engineering and Technology",
      year: "2022-2026",
      gpa: "8.45 GPA",
    },
    {
      degree: "Higher Secondary School Certificate",
      institution: "Sardar Vallabhai Patel Junior College",
      year: "2022",
      gpa: "60%",
    },
  ];

  const hobbies = [
    { name: "Volleyball", icon: Users },
    { name: "Reading Light Novels", icon: BookOpen },
    { name: "Athletic", icon: Dumbbell },
    { name: "Gaming", icon: Gamepad2 },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Side - Content */}
          <div
            className={`space-y-12 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full backdrop-blur-sm">
                <Eye className="w-4 h-4 text-white/60" />
                <span className="text-white/80 font-mono text-sm font-semibold">
                  ABOUT_ME
                </span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Passionate About
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent font-serif italic">
                  Technology & Innovation
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-white via-gray-400 to-transparent rounded-full"></div>
            </div>

            <div className="space-y-8 text-white/70 leading-relaxed text-lg">
              <p className="text-xl">
                I'm a dedicated{" "}
                <span className="text-white font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Information Technology student
                </span>{" "}
                at Thakur College of Engineering and Technology with a strong
                passion for full-stack development.
              </p>
              <p>
                With hands-on experience in{" "}
                <span className="text-white font-semibold italic">
                  MERN stack development
                </span>
                , I've completed internships at HDFC ERGO and various web
                development projects. My journey includes solving 150+ coding
                problems and participating in multiple hackathons.
              </p>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">Education</h3>
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/20 rounded-xl p-4 backdrop-blur-sm"
                >
                  <h4 className="text-white font-semibold">{edu.degree}</h4>
                  <p className="text-white/70 text-sm">{edu.institution}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/60 text-sm">{edu.year}</span>
                    <span className="text-white font-medium text-sm">
                      {edu.gpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hobbies */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">
                Hobbies & Interests
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {hobbies.map((hobby, index) => (
                  <div
                    key={hobby.name}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <hobby.icon className="w-5 h-5 text-white/60" />
                    <span className="text-white/80 text-sm">{hobby.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Stats & Achievements */}
          <div
            className={`space-y-12 ${
              isVisible ? "animate-slide-up-delayed" : "opacity-0"
            }`}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 text-center hover:border-white/40 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative space-y-4">
                    <stat.icon className="w-8 h-8 mx-auto text-white/60 group-hover:text-white/80 transition-colors group-hover:scale-110 transform duration-300" />
                    <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-white/60 text-sm font-medium tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Achievements & Activities
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white/80 font-medium">
                      Hackathon Participation
                    </p>
                    <p className="text-white/60 text-sm">
                      SIH, DUhacks, and Hackwarts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white/80 font-medium">
                      Paper Presentation
                    </p>
                    <p className="text-white/60 text-sm">
                      Presented at Multicon conference
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white/80 font-medium">Coding Practice</p>
                    <p className="text-white/60 text-sm">
                      150+ problems on LeetCode, CodeChef, GFG
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Internships */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-blue-400" />
                Professional Experience
              </h3>
              <div className="space-y-6">
                <div className="border-l-2 border-white/20 pl-4">
                  <h4 className="text-white font-semibold">
                    Full Stack Developer Intern
                  </h4>
                  <p className="text-white/70">HDFC ERGO</p>
                  <p className="text-white/60 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Apr 2025 - July 2025
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Built a unified AI platform consolidating multiple AI models
                    into one accessible portal.
                  </p>
                </div>
                <div className="border-l-2 border-white/20 pl-4">
                  <h4 className="text-white font-semibold">
                    Web Development Intern
                  </h4>
                  <p className="text-white/70">Weld and Metal Fabrication</p>
                  <p className="text-white/60 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Dec 2024 - Feb 2025
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Developed a dynamic website with interactive 3D
                    visualizations using React.js and Three.js.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "EduCrew",
      subtitle: "Collaborative Learning Platform",
      description:
        "A comprehensive learning platform that allows users to create study groups, assign tasks with due dates, monitor progress, and host virtual study sessions through integrated meeting tools.",
      tech: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Zegocloud",
      ],
      features: [
        "Study Groups",
        "Task Management",
        "Progress Tracking",
        "Virtual Meetings",
      ],
      status: "Live",
      category: "Education",
      date: "Dec 2024",
    },
    {
      title: "PetPal",
      subtitle: "Pet Adoption Platform",
      description:
        "A feature-rich web application to simplify pet adoption, offering advanced pet search filters, real-time tracking of adoption requests, vet locator using Google Places, and a donation portal.",
      tech: [
        "React.js",
        "Tailwind CSS",
        "Express.js",
        "MongoDB",
        "Google Places API",
        "Cloudinary",
      ],
      features: [
        "Pet Search",
        "Adoption Tracking",
        "Vet Locator",
        "Donation Portal",
      ],
      status: "Live",
      category: "Social Impact",
      date: "Oct 2024",
    },
    {
      title: "InterWin",
      subtitle: "Job & Internship Platform",
      description:
        "A comprehensive platform connecting users with personalized job and internship opportunities, featuring expert video calls, 24/7 AI-powered chatbot, real-time interview preparation tools, and robust admin panel for seamless opportunity management.",
      tech: [
        "React",
        "TailwindCSS",
        "Express.js",
        "MongoDB Atlas",
        "Gegocloud",
        "Python",
        "Flask",
      ],
      features: [
        "Expert Video Calls",
        "24/7 AI Chatbot",
        "Interview Preparation",
        "Admin Panel",
      ],
      status: "Development",
      category: "Career Platform",
      date: "Sep-Oct 2024",
    },
    {
      title: "Chat App",
      subtitle: "Real-Time Communication Platform",
      description:
        "A comprehensive chat application featuring real-time messaging, group chats, multiple themes, and robust authentication. Built with responsive design for seamless user experience across all devices.",
      tech: [
        "React.js",
        "Tailwind CSS",
        "Daisy UI",
        "Express.js",
        "MongoDB Atlas",
        "Zustand",
        "Socket.io",
        "Cloudinary",
      ],
      features: [
        "Real-Time Messaging",
        "Group Chats",
        "Multiple Themes",
        "JWT Authentication",
      ],
      status: "Development",
      category: "Communication",
      date: "Dec 2024",
    },
    {
      title: "MeetingAI",
      subtitle: "AI-Powered Meeting Summarizer",
      description:
        "An intelligent meeting summarizer that generates concise, timestamped summaries and key headlines from uploaded meeting recordings. Streamlines workflows by providing structured, digestible insights without reviewing full-length recordings.",
      tech: ["ReactJS", "TailwindCSS", "Python", "Numpy", "Flask"],
      features: [
        "Timestamped Summaries",
        "Key Headlines",
        "Audio Processing",
        "Workflow Integration",
      ],
      status: "Development",
      category: "AI/Productivity",
      date: "Aug 2024",
    },
    {
      title: "Crypto-Monitor",
      subtitle: "Real-Time Cryptocurrency Tracker",
      description:
        "A comprehensive cryptocurrency tracking system leveraging CoinGecko API for real-time market data. Features efficient Redis caching for fast updates and minimal API requests, containerized with Docker for seamless deployment and scalability.",
      tech: [
        "ReactJS",
        "TailwindCSS",
        "CoinGecko API",
        "ExpressJS",
        "Redis",
        "Docker",
      ],
      features: [
        "Real-Time Tracking",
        "Redis Caching",
        "API Optimization",
        "Docker Deployment",
      ],
      status: "Development",
      category: "Cryptocurrency",
      date: "Jan 2025",
    },
    {
      title: "Nike React App",
      subtitle: "Dynamic E-Commerce Website",
      description:
        "A visually stunning Nike-inspired website built with React and Tailwind CSS. Features responsive design, personalized user experience, and performance optimization that reflects the brand's commitment to innovation",
      tech: ["React", "Tailwind CSS"],
      features: [
        "Responsive Design",
        "Visual Experience",
        "Performance Optimized",
        "Brand Experience",
      ],
      status: "Development",
      category: "E-Commerce",
      date: "2023",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-32 px-4 bg-gradient-to-b from-black via-gray-900/30 to-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-20 space-y-6 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full backdrop-blur-sm">
            <Rocket className="w-4 h-4 text-white/60" />
            <span className="text-white/80 font-mono text-sm font-semibold">
              FEATURED_PROJECTS
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Projects That
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent font-serif italic">
              Define My Journey
            </span>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-xl leading-relaxed">
            A collection of projects showcasing my expertise in full-stack
            development, from collaborative learning platforms to innovative web
            applications.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-white via-gray-400 to-transparent rounded-full mx-auto"></div>
        </div>

        {/* Projects Grid - 3 cards per row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/40 hover:scale-105 cursor-pointer overflow-hidden h-full">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative space-y-6 h-full flex flex-col">
                  {/* Project Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full border ${
                          project.status === "Live"
                            ? "bg-green-500/20 border-green-500/40 text-green-400"
                            : project.status === "Development"
                            ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
                            : "bg-blue-500/20 border-blue-500/40 text-blue-400"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-white/60 text-xs">
                        {project.date}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-white group-hover:text-white/90 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/60 font-medium text-sm">
                        {project.subtitle}
                      </p>
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-white/10 border border-white/20 rounded-full text-white/80">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-white/70 leading-relaxed text-sm flex-grow">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold text-xs tracking-wide">
                      KEY FEATURES
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {project.features.map((feature, featureIndex) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                          <span className="text-white/70 text-xs">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold text-xs tracking-wide">
                      TECH STACK
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-white/10 text-white/80 rounded-full border border-white/20 hover:bg-white/20 transition-colors font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-white/10 text-white/60 rounded-full border border-white/20 font-medium">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 mt-auto">
                    <button className="group/btn flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-sm">
                      <ExternalLink className="w-3 h-3 group-hover/btn:rotate-12 transition-transform" />
                      Demo
                    </button>
                    <button className="group/btn flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-300 text-white/80 hover:border-white/40 backdrop-blur-sm text-sm">
                      <Github className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
                      Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects */}
        <div
          className={`text-center mt-16 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-300 text-white/80 hover:border-white/40 backdrop-blur-sm hover:scale-105">
            <span className="flex items-center gap-3">
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              View All Projects on GitHub
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      name: "Languages",
      icon: Code,
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/40",
      skills: [
        { name: "JavaScript", level: 90, icon: "🟨" },

        { name: "C++", level: 80, icon: "⚡" },
        { name: "HTML5", level: 95, icon: "🧡" },
        { name: "CSS3", level: 90, icon: "💙" },
      ],
    },
    {
      name: "Frontend",
      icon: Monitor,
      color: "from-green-500/20 to-green-600/20 border-green-500/40",
      skills: [
        { name: "React.js", level: 92, icon: "⚛️" },
        { name: "Next.js", level: 88, icon: "▲" },
        { name: "Tailwind CSS", level: 95, icon: "🎨" },
        { name: "Bootstrap", level: 85, icon: "🅱️" },
        { name: "Three.js", level: 75, icon: "🎮" },
        { name: "DaisyUI", level: 80, icon: "🌼" },
      ],
    },
    {
      name: "Backend",
      icon: Server,
      color: "from-purple-500/20 to-purple-600/20 border-purple-500/40",
      skills: [
        { name: "Node.js", level: 88, icon: "🟢" },
        { name: "Express.js", level: 90, icon: "⚡" },
        { name: "REST APIs", level: 85, icon: "🔗" },
        { name: "Socket.io", level: 80, icon: "🔌" },
        { name: "JWT", level: 85, icon: "🔐" },
        { name: "Middleware", level: 82, icon: "🔧" },
      ],
    },
    {
      name: "Database & Tools",
      icon: Database,
      color: "from-orange-500/20 to-orange-600/20 border-orange-500/40",
      skills: [
        { name: "MongoDB", level: 90, icon: "🍃" },
        { name: "MySQL", level: 80, icon: "🐬" },
        { name: "Firebase", level: 85, icon: "🔥" },
        { name: "Git/GitHub", level: 92, icon: "🌿" },
        { name: "Docker", level: 70, icon: "🐳" },
        { name: "Postman", level: 88, icon: "📮" },
      ],
    },
    {
      name: "Cloud & Deployment",
      icon: Globe,
      color: "from-red-500/20 to-red-600/20 border-red-500/40",
      skills: [
        { name: "Vercel", level: 90, icon: "▲" },
        { name: "Netlify", level: 85, icon: "🌐" },
        { name: "Render", level: 80, icon: "🚀" },
        { name: "Cloudinary", level: 85, icon: "☁️" },
        { name: "Bitbucket", level: 75, icon: "🪣" },
        { name: "Jira", level: 78, icon: "🐻" },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-32 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-20 space-y-6 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full backdrop-blur-sm">
            <Cpu className="w-4 h-4 text-white/60" />
            <span className="text-white/80 font-mono text-sm font-semibold">
              TECHNICAL_SKILLS
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Skills & Technologies
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent font-serif italic">
              I Work With
            </span>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-xl leading-relaxed">
            A comprehensive toolkit built through academic learning, hands-on
            projects, and real-world internship experience.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-white via-gray-400 to-transparent rounded-full mx-auto"></div>
        </div>

        {/* Category Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-16 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          {skillCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`group flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
                activeCategory === index
                  ? `bg-gradient-to-r ${category.color} text-white scale-105`
                  : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30"
              }`}
            >
              <category.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          className={`${isVisible ? "animate-slide-up" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm hover:border-white/40 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm font-medium">
                        Proficiency
                      </span>
                      <span className="text-white font-bold text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 0.1}s`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div
          className={`mt-20 text-center space-y-8 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl backdrop-blur-sm">
            <Lightning className="w-6 h-6 text-yellow-400" />
            <span className="text-white/90 font-semibold">
              Continuously learning and adapting to new technologies
            </span>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            My skill set grows with every project. I believe in hands-on
            learning and staying updated with the latest industry trends and
            best practices.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      subtitle: "dhuvesh.salian@gmail.com",
      description: "Send me an email and I'll get back to you within 24 hours",
      color: "from-red-500/20 to-red-600/20 border-red-500/40",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Phone",
      subtitle: "+91 9137349465",
      description: "Call me for urgent discussions or quick consultations",
      color: "from-green-500/20 to-green-600/20 border-green-500/40",
      action: "Call Now",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      subtitle: "Connect professionally",
      description: "Let's connect and discuss opportunities",
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/40",
      action: "Connect",
    },
    {
      icon: Github,
      title: "GitHub",
      subtitle: "Check out my code",
      description: "Explore my repositories and contributions",
      color: "from-gray-500/20 to-gray-600/20 border-gray-500/40",
      action: "Follow",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-4 bg-gradient-to-b from-black via-gray-900/30 to-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-20 space-y-6 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full backdrop-blur-sm">
            <MousePointer className="w-4 h-4 text-white/60" />
            <span className="text-white/80 font-mono text-sm font-semibold">
              GET_IN_TOUCH
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Let's Build Something
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent font-serif italic">
              Amazing Together
            </span>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-xl leading-relaxed">
            Ready to collaborate on your next project? I'm always excited to
            discuss new opportunities, innovative ideas, and ways to bring your
            vision to life.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-white via-gray-400 to-transparent rounded-full mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Methods */}
          <div
            className={`space-y-8 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
              <p className="text-white/70 leading-relaxed">
                Choose your preferred way to connect. I'm always open to
                discussing new opportunities, collaborations, internships, or
                just having a chat about technology and development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <div
                  key={method.title}
                  className={`group relative bg-gradient-to-br ${method.color} border rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative space-y-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                      <method.icon className="w-6 h-6 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                        {method.title}
                      </h4>
                      <p className="text-white/60 text-sm">{method.subtitle}</p>
                      <p className="text-white/50 text-xs mt-1">
                        {method.description}
                      </p>
                    </div>
                    <button className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 text-sm font-medium hover:bg-white/20 transition-colors">
                      {method.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="text-center p-6 bg-white/5 border border-white/20 rounded-2xl backdrop-blur-sm">
                <div className="text-2xl font-black text-white">24h</div>
                <div className="text-white/60 text-sm">Response Time</div>
              </div>
              <div className="text-center p-6 bg-white/5 border border-white/20 rounded-2xl backdrop-blur-sm">
                <div className="text-2xl font-black text-white">Mumbai</div>
                <div className="text-white/60 text-sm">Based In</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`${isVisible ? "animate-slide-up" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    Send a Message
                  </h3>
                  <p className="text-white/60">
                    Fill out the form below and I'll get back to you soon.
                  </p>
                </div>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none"
                        placeholder="Tell me about your project or just say hello..."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="group w-full px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative flex items-center justify-center gap-3">
                      <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Send Message
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-20 space-y-8 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex items-center justify-center gap-2 text-white/60">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>by Dhuvesh Salian</span>
          </div>
          <div className="text-white/40 text-sm font-mono">
            © 2024 • Crafted with passion and lots of coffee ☕
          </div>
        </div>
      </div>
    </section>
  );
}
