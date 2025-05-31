
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 I'm Joe's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("skill") || message.includes("technology") || message.includes("tech")) {
      return "Joe specializes in full-stack development! 💻 His main skills include:\n• React & TypeScript\n• Node.js & MongoDB\n• Docker & Git\n• Modern web development tools\n\nCheck out the Skills section for a complete overview!";
    }
    
    if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
      return "Joe has worked on some amazing projects! 🚀 Including:\n• AI Interview System\n• Movie Applications\n• Web Development Projects\n• Modern responsive websites\n\nVisit the Projects section to see detailed case studies!";
    }
    
    if (message.includes("education") || message.includes("study") || message.includes("college")) {
      return "Joe's educational background includes:\n📚 Bachelor of Computer Applications at St. Joseph's College, Trichy (2023-2026)\n🎓 Strong academic performance in Computer Science\n📖 Continuous learning in modern web technologies";
    }
    
    if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("hire")) {
      return "Ready to connect with Joe? 📬 You can:\n• Fill out the contact form on this website\n• Connect on social media\n• Download his resume\n\nJust scroll to the contact section or click 'Contact Me'!";
    }
    
    if (message.includes("experience") || message.includes("background") || message.includes("work")) {
      return "Joe brings 1+ years of passionate full-stack development experience! 💪\n• Built multiple production applications\n• Strong expertise in React ecosystem\n• Proven track record in modern web technologies\n• Always eager to learn and adapt";
    }
    
    if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("good")) {
      return "Hello there! 😊 Great to meet you! I'm here to help you discover everything about Joe Rakesh A. Whether you're interested in his technical skills, exciting projects, or professional background - just ask away!";
    }
    
    if (message.includes("thank") || message.includes("thanks")) {
      return "You're absolutely welcome! 🌟 Is there anything else you'd like to explore about Joe's portfolio? I'm here to help!";
    }

    if (message.includes("resume") || message.includes("cv")) {
      return "You can download Joe's resume directly from this website! 📄 Look for the download button in the hero section or contact area.";
    }

    if (message.includes("location") || message.includes("where")) {
      return "Joe is based in Tamil Nadu, India 🇮🇳 and is open to both local and remote opportunities!";
    }
    
    return "That's a great question! 🤔 I'd love to help you learn more about Joe. You can explore:\n• His technical skills and expertise\n• Exciting projects he's built\n• Educational background\n• Professional experience\n\nWhat interests you most?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Tell me about Joe's skills",
    "Show me his projects",
    "What's his education?",
    "How can I contact Joe?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 animate-pulse",
          isOpen && "scale-0 opacity-0"
        )}
        size="icon"
      >
        <Bot className="h-8 w-8" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 overflow-hidden",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0",
          isMinimized ? "h-16" : "h-[500px]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/Joe.jpg" alt="Joe" />
              <AvatarFallback className="bg-white text-primary">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-semibold">Joe's AI Assistant</span>
              <div className="text-xs opacity-90">Online</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsMinimized(!isMinimized)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-line",
                      message.sender === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-white border border-gray-200 rounded-bl-none shadow-sm"
                    )}
                  >
                    {message.text}
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-gray-600 text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-3 bg-white border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">Quick questions:</div>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Joe..."
                  className="flex-1 border-gray-200 focus:border-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 shrink-0"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chatbot;
