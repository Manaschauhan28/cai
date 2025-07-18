import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Star, Zap } from "lucide-react";

export default function Blog() {
  const navigate = useNavigate();
  const [dots, setDots] = useState("");
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [Clock, Star, Zap];

  useEffect(() => {
    // Animate the dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    // Animate the icons
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 1000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(iconInterval);
    };
  }, []);

  const CurrentIcon = icons[currentIcon];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-lime-400/20 animate-pulse" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-lime-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: "translateY(0px) rotate(0deg)",
              transition: "transform 3s ease-in-out infinite",
            }}
            className="animate-bounce"
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-20 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl font-bold">
            <span className="text-lime-400">CI</span>{" "}
            <span className="text-white">GPT</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-lime-400 transition-colors"
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
          <button className="text-lime-400 hover:text-lime-300 transition-colors">
            Blog
          </button>
        </nav>

        <button
          onClick={() => navigate("/")}
          className="border border-gray-500 hover:border-lime-400 px-6 py-2 rounded-full text-white hover:text-lime-400 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </header>

      {/* Coming Soon Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Icon */}
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-lime-400 to-purple-600 rounded-full flex items-center justify-center mb-8 transform transition-all duration-1000 animate-bounce">
              <CurrentIcon className="w-16 h-16 text-white animate-pulse" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-lime-400 via-purple-500 to-lime-400 bg-clip-text text-transparent animate-pulse">
            COMING SOON{dots}
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-3xl text-gray-300 mb-12 animate-fade-in-up">
            Our blog is under construction
          </p>

          {/* Description */}
          <div className="mb-16">
            <p
              className="text-lg text-gray-400 mb-6 opacity-0 animate-pulse"
              style={{
                animationDelay: "0.5s",
                opacity: 1,
                transform: "translateY(0)",
                transition: "all 1s ease-out 0.5s",
              }}
            >
              We're working hard to bring you amazing content about Canadian
              immigration, success stories, tips, and insights.
            </p>
            <p
              className="text-gray-500"
              style={{
                animationDelay: "1s",
                opacity: 1,
                transform: "translateY(0)",
                transition: "all 1s ease-out 1s",
              }}
            >
              Stay tuned for updates!
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="mb-12">
            <div className="w-full max-w-md mx-auto bg-slate-800 rounded-full h-4 mb-4">
              <div
                className="bg-gradient-to-r from-lime-400 to-purple-600 h-4 rounded-full"
                style={{
                  width: "75%",
                  transition: "width 3s ease-in-out",
                  animation: "pulse 2s infinite",
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">
              Building something amazing...
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Success Stories", desc: "Real immigration journeys" },
              { title: "Expert Tips", desc: "Professional guidance" },
              { title: "Latest Updates", desc: "Immigration news & changes" },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 transform transition-all duration-500 hover:scale-105 hover:border-lime-400"
                style={{
                  opacity: 1,
                  transform: "translateY(0)",
                  transition: `all 1s ease-out ${index * 0.2 + 1.5}s`,
                }}
              >
                <h3 className="text-lime-400 font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/chat")}
              className="bg-lime-400 text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-lime-300 transition-all duration-300 transform hover:scale-110"
            >
              Try CI GPT Now
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-110"
            >
              Explore Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
