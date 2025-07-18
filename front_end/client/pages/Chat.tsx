import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Paperclip,
  MoreHorizontal,
  MessageSquare,
  Edit,
  LogOut,
  User,
  Bot,
  Loader,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, sessionId, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add welcome message on component mount
  useEffect(() => {
    console.log("Debug - Chat component mounted with:", { user, sessionId });

    const welcomeMessage: ChatMessage = {
      id: `welcome_${Date.now()}`,
      type: "bot",
      content: `Hello ${user?.email}! I'm CI GPT, your Canadian immigration assistant. How can I help you today?`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [user?.email, sessionId]);

  const chatHistory = [
    {
      title: "Canada Immigration Process",
      preview: "Lorem Ipsum Dummy Text",
      isToday: true,
    },
    {
      title: "Canada Immigration Process",
      preview: "Lorem Ipsum Dummy Text",
      isToday: false,
    },
    {
      title: "Canada Immigration Process",
      preview: "Lorem Ipsum Dummy Text",
      isToday: false,
    },
    {
      title: "Canada Immigration Process",
      preview: "Lorem Ipsum Dummy Text",
      isToday: false,
    },
    {
      title: "Canada Immigration Process",
      preview: "Lorem Ipsum Dummy Text",
      isToday: false,
    },
    {
      title: "Canada Immigration Process",
      preview: "Lorem Ipsum Dummy Text",
      isToday: false,
    },
  ];

  const sendMessage = async (userMessage: string) => {
    console.log("Debug - sessionId:", sessionId);
    console.log("Debug - user:", user);

    if (!sessionId) {
      console.log("Debug - No sessionId found");
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        type: "bot",
        content: "Session expired. Please log in again to continue.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = `https://just-rapidly-badger.ngrok-free.app/chat/${encodeURIComponent(sessionId)}`;
      console.log("Debug - API URL:", apiUrl);
      console.log("Debug - Raw sessionId:", sessionId);
      console.log("Debug - Encoded sessionId:", encodeURIComponent(sessionId));

      const requestBody = { message: userMessage };
      console.log("Debug - Request body:", requestBody);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Debug - Response status:", response.status);
      console.log(
        "Debug - Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      const data = await response.json();
      console.log("Debug - Response data:", data);

      if (response.ok) {
        // Add bot response to messages
        const botMessage: ChatMessage = {
          id: `bot_${Date.now()}`,
          type: "bot",
          content:
            data.response ||
            data.message ||
            "I received your message but couldn't generate a response.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Handle API error
        const errorMessage: ChatMessage = {
          id: `error_${Date.now()}`,
          type: "bot",
          content: `Sorry, I encountered an error: ${data.message || "Unable to process your request"}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      // Handle network error
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        type: "bot",
        content:
          "Sorry, I'm having trouble connecting to the server. Please check your internet connection and try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      // Add user message to chat
      const userMessage: ChatMessage = {
        id: `user_${Date.now()}`,
        type: "user",
        content: message.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Send to API
      sendMessage(message.trim());

      // Clear input
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-lime-400">CI</span>{" "}
                <span className="text-white">GPT</span>
              </span>
            </button>
            <button className="p-2 hover:bg-slate-700 rounded">
              <Edit className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-lime-400 text-sm">
              <User className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg font-medium transition-colors">
              Upgrade Plan
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Today</h3>
            {chatHistory
              .filter((chat) => chat.isToday)
              .map((chat, index) => (
                <div
                  key={index}
                  className="group p-3 hover:bg-slate-700 rounded-lg cursor-pointer mb-2"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{chat.title}</h4>
                      <p className="text-sm text-gray-400 truncate">
                        {chat.preview}
                      </p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-600 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Yesterday
            </h3>
            {chatHistory
              .filter((chat) => !chat.isToday)
              .slice(0, 2)
              .map((chat, index) => (
                <div
                  key={index}
                  className="group p-3 hover:bg-slate-700 rounded-lg cursor-pointer mb-2"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{chat.title}</h4>
                      <p className="text-sm text-gray-400 truncate">
                        {chat.preview}
                      </p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-600 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Previous 7 Days
            </h3>
            {chatHistory
              .filter((chat) => !chat.isToday)
              .slice(2)
              .map((chat, index) => (
                <div
                  key={index}
                  className="group p-3 hover:bg-slate-700 rounded-lg cursor-pointer mb-2"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{chat.title}</h4>
                      <p className="text-sm text-gray-400 truncate">
                        {chat.preview}
                      </p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-600 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">
              <span className="text-lime-400">
                {user?.email?.toUpperCase()}
              </span>
              , <br />
              WELCOME TO CI GPT
            </h1>
            <p className="text-gray-400 max-w-md mx-auto mb-2">
              Your AI-powered Canadian immigration assistant is ready to help
              you with your journey.
            </p>
            <p className="text-xs text-gray-500">
              Session ID: {sessionId || "No active session"}
            </p>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation to see messages here</p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-4 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.type === "bot" && (
                      <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-6 h-6 text-slate-900" />
                      </div>
                    )}

                    <div
                      className={`max-w-2xl rounded-2xl p-4 ${
                        msg.type === "user"
                          ? "bg-lime-400 text-slate-900"
                          : "bg-slate-800 text-white border border-slate-700"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          msg.type === "user"
                            ? "text-slate-700"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {msg.type === "user" && (
                      <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-lime-400" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-slate-900" />
                    </div>
                    <div className="max-w-2xl rounded-2xl p-4 bg-slate-800 text-white border border-slate-700">
                      <div className="flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        <p className="text-sm">CI GPT is thinking...</p>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-slate-700">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="flex items-center bg-slate-800 border border-slate-600 rounded-lg">
                <button className="p-3 hover:bg-slate-700 transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write Prompt Here..."
                  className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-white placeholder-gray-400 disabled:opacity-50"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className="p-3 m-1 bg-lime-400 hover:bg-lime-300 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 text-slate-900 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-slate-900" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
