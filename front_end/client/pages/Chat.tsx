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
  Trash2,
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
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [isCreatingNewChat, setIsCreatingNewChat] = useState(false);
  const [isNewChatLoading, setIsNewChatLoading] = useState(false);
  const [messagesKey, setMessagesKey] = useState(0);
  const [forceClear, setForceClear] = useState(false);
  const [displayedSessions, setDisplayedSessions] = useState<any[]>([]);
  const [sessionsPerPage] = useState(7);
  const [hasMoreSessions, setHasMoreSessions] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState<string | null>(null);

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

  // Monitor selectedSessionId changes
  useEffect(() => {
    console.log("selectedSessionId changed to:", selectedSessionId);
  }, [selectedSessionId]);

  // Monitor messages changes
  useEffect(() => {
    console.log("Messages changed, count:", messages.length);
    console.log("Current messages:", messages);
    console.log("Messages key:", messagesKey);
    console.log("Selected session ID:", selectedSessionId);
    console.log("Force clear:", forceClear);
  }, [messages, messagesKey, selectedSessionId, forceClear]);

  // Close delete options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDeleteOptions && !(event.target as Element).closest('.delete-options')) {
        setShowDeleteOptions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDeleteOptions]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!user?.email) return;
      try {
        const response = await fetch(
          `http://44.212.129.15:8000/sessions?username=${encodeURIComponent(user.email)}`
        );
        if (!response.ok) throw new Error("Failed to fetch chat history");
        const data = await response.json();
        const allSessions = data.data.sessions || [];
        setChatHistory(allSessions);
        
        // Set initial displayed sessions (first 7)
        const initialSessions = allSessions.slice(0, sessionsPerPage);
        setDisplayedSessions(initialSessions);
        
        // Check if there are more sessions to load
        setHasMoreSessions(allSessions.length > sessionsPerPage);
        
        console.log("Total sessions:", allSessions.length);
        console.log("Initial displayed sessions:", initialSessions.length);
        console.log("Has more sessions:", allSessions.length > sessionsPerPage);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setChatHistory([]);
        setDisplayedSessions([]);
        setHasMoreSessions(false);
      }
    };

    fetchChatHistory();
  }, [user?.email, sessionsPerPage]);

  const sendMessage = async (userMessage: string) => {
    // Use selectedSessionId if available, otherwise fall back to sessionId from auth
    const currentSessionId = selectedSessionId || sessionId;
    
    console.log("=== SEND MESSAGE DEBUG ===");
    console.log("Debug - selectedSessionId:", selectedSessionId);
    console.log("Debug - sessionId from auth:", sessionId);
    console.log("Debug - currentSessionId being used:", currentSessionId);
    console.log("Debug - user:", user);
    console.log("Debug - message being sent:", userMessage);
    console.log("=== END DEBUG ===");

    if (!currentSessionId) {
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
      const apiUrl = `http://44.212.129.15:8000/chat/${encodeURIComponent(currentSessionId)}`;
      console.log("Debug - API URL:", apiUrl);
      console.log("Debug - Raw currentSessionId:", currentSessionId);
      console.log("Debug - Encoded currentSessionId:", encodeURIComponent(currentSessionId));

      const requestBody = { message: userMessage };
      console.log("Debug - Request body:", requestBody);
      console.log("Debug - Request body JSON:", JSON.stringify(requestBody));

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log("Debug - Full request details:");
      console.log("  URL:", apiUrl);
      console.log("  Method: POST");
      console.log("  Headers:", {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      });
      console.log("  Body:", JSON.stringify(requestBody));

      console.log("Debug - Response status:", response.status);
      console.log(
        "Debug - Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      let data;
      try {
        data = await response.json();
        console.log("Debug - Response data:", data);
      } catch (jsonError) {
        console.error("Debug - Failed to parse JSON response:", jsonError);
        const responseText = await response.text();
        console.log("Debug - Raw response text:", responseText);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (response.ok) {
        // Add bot response to messages
        const botMessage: ChatMessage = {
          id: `bot_${Date.now()}`,
          type: "bot",
          content:
            data.response ||
            data.data.reply ||
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

  const fetchSessionMessages = async (sessionId: string) => {
    try {
      console.log("Fetching messages for session:", sessionId);
      
      const response = await fetch(
        `http://44.212.129.15:8000/sessions/${sessionId}/messages`
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch session messages:", errorText);
        throw new Error(`Failed to fetch session messages: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Session messages response:", data);
      
      // Handle the actual API response format
      const messages = data.data?.messages || [];
      const formattedMessages = messages.map((msg: any) => ({
        id: msg.id || `${msg.role}_${Date.now()}`,
        type: msg.role === "user" ? "user" : "bot", // Map "role" to "type"
        content: msg.message, // Use "message" field instead of "content"
        timestamp: new Date(msg.created_at), // Use "created_at" field
      }));
      
      console.log("Formatted messages:", formattedMessages);
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching session messages:", error);
      setMessages([]);
    }
  };

  const loadMoreSessions = () => {
    const currentCount = displayedSessions.length;
    const nextSessions = chatHistory.slice(currentCount, currentCount + sessionsPerPage);
    
    setDisplayedSessions(prev => [...prev, ...nextSessions]);
    
    // Check if there are more sessions to load
    const remainingSessions = chatHistory.length - (currentCount + sessionsPerPage);
    setHasMoreSessions(remainingSessions > 0);
    
    console.log("Loaded more sessions. Current displayed:", currentCount + nextSessions.length);
    console.log("Remaining sessions:", remainingSessions);
  };

  const deleteSession = async (sessionId: string) => {
    try {
      console.log("Deleting session:", sessionId);
      
      const response = await fetch(
        `http://44.212.129.15:8000/sessions/${sessionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to delete session:", errorText);
        throw new Error(`Failed to delete session: ${response.status}`);
      }
      
      console.log("Session deleted successfully:", sessionId);
      
      // Remove session from both chatHistory and displayedSessions
      setChatHistory(prev => prev.filter(session => session.session_id !== sessionId));
      setDisplayedSessions(prev => prev.filter(session => session.session_id !== sessionId));
      
      // If the deleted session was selected, clear the selection
      if (selectedSessionId === sessionId) {
        setSelectedSessionId(null);
        setMessages([]);
      }
      
      // Hide delete options
      setShowDeleteOptions(null);
      
    } catch (error) {
      console.error("Error deleting session:", error);
      // You might want to show a toast notification here
    }
  };

  const handleNewChat = async () => {
    if (!user?.email) return;
    
        setIsCreatingNewChat(true);
    setIsNewChatLoading(true);
    console.log("Creating new chat session for user:", user.email);
    
    try {
      const response = await fetch(
        `http://44.212.129.15:8000/new_chat?username=${encodeURIComponent(user.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("New chat response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to create new session:", errorText);
        throw new Error(`Failed to create new session: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("New chat response data:", data);
      console.log("data.data:", data.data);
      console.log("data.data.session:", data.data?.session);
      console.log("data.data.session_id:", data.data?.session_id);
      
      // Extract the new session data - check all possible locations
      let newSession = null;
      
      if (data.data?.session) {
        newSession = data.data.session;
      } else if (data.data?.session_id) {
        // If the session data is directly in data.data
        newSession = {
          session_id: data.data.session_id,
          title: data.data.title || "New Chat",
          first_message: data.data.first_message || "No messages yet"
        };
      } else if (data.session) {
        newSession = data.session;
      } else if (data.session_id) {
        // If session_id is at the root level
        newSession = {
          session_id: data.session_id,
          title: data.title || "New Chat",
          first_message: data.first_message || "No messages yet"
        };
      } else {
        console.error("Could not find session data in response:", data);
        throw new Error("No session data found in API response");
      }
      
      if (!newSession || !newSession.session_id) {
        console.error("Invalid session data received:", data);
        throw new Error("Invalid session data received from server");
      }
      
      console.log("New session created:", newSession);
      
      // Add the new session to chatHistory
      setChatHistory((prev) => {
        const updatedHistory = [newSession, ...prev];
        console.log("Updated chat history:", updatedHistory);
        return updatedHistory;
      });
      
      // Add the new session to displayed sessions (at the top)
      setDisplayedSessions((prev) => {
        const updatedDisplayed = [newSession, ...prev];
        console.log("Updated displayed sessions:", updatedDisplayed);
        return updatedDisplayed;
      });
      
      // Select the new session and clear messages
      setSelectedSessionId(newSession.session_id);
      
      // Add welcome message for the new session
      const welcomeMessage: ChatMessage = {
        id: `welcome_${Date.now()}`,
        type: "bot",
        content: `Hello ${user?.email}! I'm CI GPT, your Canadian immigration assistant. This is a new chat session. How can I help you today?`,
        timestamp: new Date(),
      };
      
      // Clear messages immediately and set welcome message
      console.log("Clearing messages and setting welcome message for new session");
      console.log("Current messages before clearing:", messages);
      
      // Force immediate state update
      console.log("About to clear messages. Current count:", messages.length);
      
      // Clear messages and force loading state
      setIsNewChatLoading(true);
      setForceClear(true);
      setMessages([]);
      setMessagesKey(prev => prev + 1);
      
      console.log("Messages cleared, setting to empty array");
      console.log("Messages key updated to force re-render");
      console.log("Loading state set to true");
      console.log("Force clear set to true");
      
      setTimeout(() => {
        setIsNewChatLoading(false);
        setForceClear(false);
        setMessages([welcomeMessage]);
        console.log("Welcome message set for new session:", newSession.session_id);
        console.log("Messages after setting welcome:", [welcomeMessage]);
        console.log("Force clear set to false");
      }, 100);
      
      console.log("New chat session activated:", newSession.session_id);
      console.log("selectedSessionId should now be:", newSession.session_id);
      
      // Force a re-render to ensure selectedSessionId is updated
      setTimeout(() => {
        console.log("selectedSessionId after timeout:", selectedSessionId);
        console.log("Current messages count:", messages.length);
      }, 100);
      
    } catch (error) {
      console.error("Error creating new session:", error);
      // You might want to show a toast notification here
    } finally {
      setIsCreatingNewChat(false);
      setIsNewChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col h-screen">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-4 border-b border-slate-700">
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
            <button
              onClick={handleNewChat}
              disabled={isCreatingNewChat}
              className="p-2 hover:bg-slate-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="New Chat"
            >
              {isCreatingNewChat ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Edit className="w-5 h-5" />
              )}
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

        {/* Chat History - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Previous Sessions</h3>
            {displayedSessions.map((chat) => (
              <div
                key={chat.session_id}
                className={`group p-3 hover:bg-slate-700 rounded-lg cursor-pointer mb-2 ${
                  selectedSessionId === chat.session_id ? "bg-slate-700 border-l-2 border-lime-400" : ""
                }`}
                onClick={() => {
                  setSelectedSessionId(chat.session_id);
                  fetchSessionMessages(chat.session_id);
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">
                      {chat.title || "Untitled"}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">
                      {chat.first_message || "No messages yet"}
                    </p>
                  </div>
                  <div className="relative">
                    <button 
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-600 rounded transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteOptions(showDeleteOptions === chat.session_id ? null : chat.session_id);
                      }}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    
                    {/* Delete Options Dropdown */}
                    {showDeleteOptions === chat.session_id && (
                      <div className="delete-options absolute right-0 top-8 bg-slate-700 border border-slate-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(chat.session_id);
                          }}
                          className="w-full p-2 text-left text-red-400 hover:bg-slate-600 rounded-t-lg flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Load More Button */}
            {hasMoreSessions && (
              <button
                onClick={loadMoreSessions}
                className="w-full mt-4 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Loader className="w-4 h-4" />
                Load More Sessions
              </button>
            )}
            
            {/* Show total count */}
            {displayedSessions.length > 0 && (
              <div className="mt-4 text-xs text-gray-500 text-center">
                Showing {displayedSessions.length} of {chatHistory.length} sessions
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Chat Header - Fixed */}
        <div className="flex-shrink-0 p-6 border-b border-slate-700">
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
            {selectedSessionId && (
              <div className="mt-4 p-2 bg-slate-800 rounded-lg inline-block">
                <p className="text-xs text-gray-400">
                  Active Session: {selectedSessionId.slice(0, 8)}...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div key={`${selectedSessionId}-${messagesKey}-${forceClear}`} className="max-w-4xl mx-auto space-y-6">
            {isNewChatLoading || forceClear ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Loader className="w-16 h-16 mx-auto mb-4 animate-spin" />
                  <p>Creating new chat session...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
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

        {/* Message Input - Fixed at Bottom */}
        <div className="flex-shrink-0 p-6 border-t border-slate-700">
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
