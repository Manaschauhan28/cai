import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Users, Target, Award, Heart } from "lucide-react";

export default function AboutUs() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "50K+", label: "Happy Users", icon: Users },
    { number: "98%", label: "Success Rate", icon: Target },
    { number: "24/7", label: "Support", icon: Heart },
    { number: "100+", label: "Countries", icon: Award },
  ];

  const team = [
    {
      name: "John Smith",
      role: "Immigration Expert",
      experience: "15+ years",
    },
    {
      name: "Sarah Johnson",
      role: "AI Developer",
      experience: "12+ years",
    },
    {
      name: "Michael Chen",
      role: "Legal Advisor",
      experience: "18+ years",
    },
  ];

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
          <button className="text-lime-400 hover:text-lime-300 transition-colors">
            About Us
          </button>
          <button
            onClick={() => navigate("/blog")}
            className="text-white hover:text-lime-400 transition-colors"
          >
            Blog
          </button>
        </nav>

        <button
          onClick={() => navigate("/")}
          className="border border-gray-500 hover:border-lime-400 px-6 py-2 rounded-full text-white hover:text-lime-400 transition-colors"
        >
          Back to Home
        </button>
      </header>

      {/* Hero Section */}
      <section
        className={`relative z-10 text-center px-6 lg:px-20 py-20 lg:py-32 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="animate-pulse mb-6">
          <span className="inline-block px-4 py-2 bg-lime-400/20 text-lime-400 rounded-full text-sm font-semibold">
            About CI GPT
          </span>
        </div>
        <h1 className="text-4xl lg:text-7xl font-bold mb-6 leading-tight">
          EMPOWERING YOUR
          <br />
          <span className="text-lime-400 animate-bounce">CANADIAN DREAM</span>
        </h1>
        <p className="text-gray-300 text-lg lg:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
          We're revolutionizing Canadian immigration with cutting-edge AI
          technology, making your journey to Canada smoother, faster, and more
          successful than ever before.
        </p>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 lg:px-20 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 transition-all duration-500 ${
                  currentStat === index
                    ? "scale-110 border-lime-400 shadow-lg shadow-lime-400/20"
                    : "hover:scale-105"
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.8s ease-out",
                }}
              >
                <Icon
                  className={`w-8 h-8 mx-auto mb-4 ${currentStat === index ? "text-lime-400" : "text-gray-400"} transition-colors duration-300`}
                />
                <div
                  className={`text-3xl font-bold mb-2 ${currentStat === index ? "text-lime-400" : "text-white"} transition-colors duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 px-6 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8 animate-pulse">
            OUR MISSION
          </h2>
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 lg:p-12 rounded-3xl border border-slate-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-purple-600/10 animate-pulse" />
            <p className="text-xl lg:text-2xl leading-relaxed relative z-10">
              To democratize Canadian immigration by providing intelligent,
              accessible, and personalized guidance through advanced AI
              technology. We believe everyone deserves a clear path to their
              Canadian dream.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 px-6 lg:px-20 py-20">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16">
          MEET OUR EXPERTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-slate-800 p-8 rounded-2xl text-center transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-xl hover:shadow-lime-400/20"
              style={{
                animationDelay: `${index * 300}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(50px)",
                transition: "all 1s ease-out",
              }}
            >
              <div
                className="w-20 h-20 bg-gradient-to-r from-lime-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{
                  animation: "spin 8s linear infinite",
                }}
              >
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-lime-400 mb-2">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.experience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-20 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            READY TO START YOUR JOURNEY?
          </h2>
          <p className="text-gray-300 text-xl mb-12">
            Join thousands of successful immigrants who trusted CI GPT for their
            Canadian journey.
          </p>
          <button
            onClick={() => navigate("/chat")}
            className="bg-lime-400 text-slate-900 px-12 py-4 rounded-full font-semibold hover:bg-lime-300 transition-all duration-300 transform hover:scale-110 flex items-center gap-2 mx-auto animate-bounce"
          >
            Get Started Today
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
