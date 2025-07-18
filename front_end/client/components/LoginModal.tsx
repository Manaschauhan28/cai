import { useState } from "react";
import { X, AlertCircle, Loader } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const { login, signup, isLoading, error, clearError } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      return;
    }

    const success = isSignup
      ? await signup(email, password)
      : await login(email, password);

    if (success) {
      setEmail("");
      setPassword("");
      onClose();
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    clearError();
    setIsSignup(false);
    onClose();
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    clearError();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-slate-800 flex shadow-2xl border border-slate-700 overflow-hidden relative"
        style={{
          borderRadius: "18px",
          width: "900px",
          height: "500px",
        }}
      >
        {/* Absolute Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-full transition-colors z-20 bg-slate-900/80 border border-slate-600"
          disabled={isLoading}
        >
          <X className="w-6 h-6 text-white" />
        </button>
        {/* Left Side - Login Form */}
        <div className="w-[400px] p-8 flex flex-col justify-center">
          <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold">
                <span className="text-lime-400">CI</span>{" "}
                <span className="text-white">GPT</span>
              </span>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-slate-700 rounded-full transition-colors z-10 bg-slate-800/80"
                disabled={isLoading}
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Login Form */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignup ? "Sign Up" : "Login"}
              </h2>
              <p className="text-gray-400">
                {isSignup
                  ? "Create your account to access CI GPT's immigration assistance."
                  : "Welcome back! Sign in to continue your immigration journey."}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-600 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full px-6 py-3 bg-white rounded-full text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 disabled:opacity-50"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full px-6 py-3 bg-white rounded-full text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 disabled:opacity-50"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-lime-400 hover:bg-lime-300 text-slate-900 font-semibold py-3 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                  {isSignup ? "Sign Up" : "Login Now"}
                </button>
                <button
                  type="button"
                  onClick={toggleMode}
                  className="flex-1 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-full transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isSignup ? "Login Instead" : "Sign Up"}
                </button>
              </div>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <p className="text-center text-gray-400 mb-4 text-sm">
                Login With
              </p>
              <div className="flex justify-center gap-4">
                <button className="w-14 h-14 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg border border-gray-200">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
                <button className="w-14 h-14 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg border border-gray-200">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                    <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                    <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                    <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                  </svg>
                </button>
                <button className="w-14 h-14 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg border border-gray-200">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path
                      fill="#000"
                      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-[500px] bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-8">
          <div className="max-w-md">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F743a119568ae42a9aea0affa6fd8ea05%2F2fe31430e8f24d7580f0cf7fdf4bcb8c?format=webp&width=800"
              alt="Laptop with CI GPT interface"
              className="w-full h-auto transform rotate-12 hover:rotate-6 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
