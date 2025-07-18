import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock, ArrowLeft, User } from "lucide-react";
import LoginModal from "./LoginModal";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
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

          <button
            onClick={() => navigate("/")}
            className="border border-gray-500 hover:border-lime-400 px-6 py-2 rounded-full text-white hover:text-lime-400 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </header>

        {/* Login Required Message */}
        <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
          <div className="text-center max-w-2xl mx-auto">
            {/* Lock Icon */}
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-lime-400 to-purple-600 rounded-full flex items-center justify-center mb-8 animate-pulse">
              <Lock className="w-12 h-12 text-white" />
            </div>

            {/* Main Message */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-lime-400 via-purple-500 to-lime-400 bg-clip-text text-transparent">
              PLEASE LOGIN TO USE GPT
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              You need to be logged in to access CI GPT's immigration assistance
              features.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: "🤖",
                  title: "AI Assistance",
                  desc: "Get personalized immigration guidance",
                },
                {
                  icon: "📋",
                  title: "Document Help",
                  desc: "Step-by-step application support",
                },
                {
                  icon: "🎯",
                  title: "Success Tips",
                  desc: "Expert advice for your journey",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 transform transition-all duration-500 hover:scale-105"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lime-400 font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-lime-400 text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-lime-300 transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                Login / Sign Up
              </button>
              <button
                onClick={() => navigate("/")}
                className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-110"
              >
                Learn More
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 p-6 bg-gradient-to-r from-lime-400/10 to-purple-600/10 rounded-2xl border border-lime-400/20">
              <p className="text-gray-300">
                <span className="font-semibold text-lime-400">
                  Free to join!
                </span>{" "}
                Create your account and start your Canadian immigration journey
                today.
              </p>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    );
  }

  return <>{children}</>;
}
