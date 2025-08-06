import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  LogOut,
  User,
} from "lucide-react";
import LoginModal from "../components/LoginModal";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState<string | null>(
    null,
  );
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const howToUseVideos = [
    {
      title: "Video Title",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop",
    },
    {
      title: "Video Title",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=600&fit=crop",
    },
    {
      title: "Video Title",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=600&fit=crop",
    },
    {
      title: "Video Title",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=600&fit=crop",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setTestimonialsLoading(true);
      setTestimonialsError(null);

      const response = await fetch(
        "https://44.212.129.15:8000/api/testimonials",
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Testimonials API response:", data);

        // Handle different possible response formats
        if (data.success && data.data && data.data.testimonials) {
          setTestimonials(data.data.testimonials);
        } else if (data.success && data.data) {
          setTestimonials(data.data);
        } else if (Array.isArray(data)) {
          setTestimonials(data);
        } else if (data.testimonials) {
          setTestimonials(data.testimonials);
        } else {
          console.warn("Unexpected testimonials response format:", data);
          setTestimonials([]);
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonialsError("Failed to load testimonials");
      setTestimonials([]);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  // Load testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-20 py-6">
        <div className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-lime-400">CI</span>{" "}
            <span className="text-white">GPT</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigate("/")}
            className="text-lime-400 hover:text-lime-300 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/chat")}
            className="text-white hover:text-lime-400 transition-colors"
          >
            Chat
          </button>
          <button
            onClick={() => navigate("/about")}
            className="text-white hover:text-lime-400 transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => navigate("/blog")}
            className="text-white hover:text-lime-400 transition-colors"
          >
            Blog
          </button>
        </nav>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lime-400">
              <User className="w-4 h-4" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <button
              onClick={logout}
              className="border border-red-500 hover:border-red-400 px-6 py-2 rounded-full text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="border border-gray-500 hover:border-lime-400 px-6 py-2 rounded-full text-white hover:text-lime-400 transition-colors"
          >
            Login Now
          </button>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center px-6 lg:px-20 py-20 lg:py-32">
        <h1 className="text-4xl lg:text-7xl font-bold mb-6 leading-tight">
          CANADA IMMIGRATION GPT
        </h1>
        <p className="text-gray-300 text-lg lg:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
          Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
          Industry.
          <br />
          Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The
          1500s,
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/chat")}
            className="bg-lime-400 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-lime-300 transition-colors flex items-center gap-2"
          >
            Try CI GPT
            <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-lime-400" />
            </div>
          </button>
          <button className="text-white hover:text-lime-400 transition-colors px-6 py-3">
            How To Use ?
          </button>
          <button className="text-white hover:text-lime-400 transition-colors px-6 py-3">
            Testimonial
          </button>
        </div>
      </section>

      {/* How To Use Section */}
      <section className="relative z-10 px-6 lg:px-20 py-20">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16">
          HOW TO USE?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howToUseVideos.map((video, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="aspect-[3/4] bg-slate-800 rounded-2xl overflow-hidden">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-semibold">{video.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative z-10 px-6 lg:px-20 py-20">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16">
          TESTIMONIAL
          <div className="w-20 h-1 bg-lime-400 mx-auto mt-4"></div>
        </h2>

        {/* Loading State */}
        {testimonialsLoading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading testimonials...</p>
          </div>
        )}

        {/* Error State */}
        {testimonialsError && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">⚠️</span>
            </div>
            <p className="text-red-400 mb-4">{testimonialsError}</p>
            <button
              onClick={fetchTestimonials}
              className="bg-lime-400 text-slate-900 px-6 py-2 rounded-full font-semibold hover:bg-lime-300 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!testimonialsLoading &&
          !testimonialsError &&
          testimonials.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">💬</span>
              </div>
              <p className="text-gray-400">
                No testimonials available at the moment.
              </p>
            </div>
          )}

        {/* Testimonials Carousel */}
        {!testimonialsLoading &&
          !testimonialsError &&
          testimonials.length > 0 && (
            <>
              <div
                className="relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-sm border border-slate-700"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Testimonial Cards Container */}
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTestimonial * 100}%)`,
                    width: `${testimonials.length * 100}%`,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 p-8 lg:p-16"
                      style={{ width: `${100 / testimonials.length}%` }}
                    >
                      <div className="max-w-4xl mx-auto text-center">
                        {/* Stars Rating */}
                        <div className="flex justify-center mb-6">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 text-lime-400 animate-pulse"
                              style={{ animationDelay: `${i * 100}ms` }}
                            >
                              ⭐
                            </div>
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed font-light italic">
                          "
                          {testimonial.message ||
                            testimonial.text ||
                            testimonial.content ||
                            "Great experience with CI GPT!"}
                          "
                        </blockquote>

                        {/* User Info */}
                        <div className="flex items-center justify-center gap-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-lime-400 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-white font-bold text-lg">
                              {(
                                testimonial.user_name ||
                                testimonial.name ||
                                testimonial.author ||
                                "User"
                              ).charAt(0)}
                            </span>
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-lg">
                              {testimonial.user_name ||
                                testimonial.name ||
                                testimonial.author ||
                                "Anonymous User"}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {testimonial.country && testimonial.program
                                ? `${testimonial.country} • ${testimonial.program}`
                                : testimonial.location || "Verified User"}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {testimonial.date ||
                                testimonial.created_at ||
                                new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110 z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-lime-400" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110 z-10"
                >
                  <ChevronRight className="w-6 h-6 text-lime-400" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonial(index);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 2000);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentTestimonial
                        ? "w-8 h-3 bg-lime-400"
                        : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              {/* Auto-play Indicator */}
              <div className="flex items-center justify-center mt-4">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`text-xs px-4 py-2 rounded-full transition-all duration-300 ${
                    isAutoPlaying
                      ? "bg-lime-400/20 text-lime-400"
                      : "bg-gray-600/20 text-gray-400"
                  }`}
                >
                  {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"} Auto-scroll
                </button>
              </div>
            </>
          )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-20 py-16 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold">
                <span className="text-lime-400">CI</span>{" "}
                <span className="text-white">GPT</span>
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/blog")}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => navigate("/terms")}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Terms Of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/privacy")}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/cookies")}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Help@CIGPT.Com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>+1 234 456 678 89</span>
              </li>
            </ul>
            <div className="flex gap-2 mt-4">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Need Help */}
          <div>
            <h3 className="font-semibold mb-4">Need Help ?</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-lime-400"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-semibold transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-400">
          <p>Copyright 2024 CIGPT.Com All Rights Reserved</p>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
