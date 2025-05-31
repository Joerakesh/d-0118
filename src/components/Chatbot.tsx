
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Copy, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  rating?: "up" | "down";
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
  const [messageCount, setMessageCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("skill") || message.includes("technology") || message.includes("tech")) {
      return "Joe specializes in full-stack development! 💻 His main skills include:\n• React & TypeScript - Advanced level\n• Node.js & MongoDB - Experienced\n• Docker & Git - Proficient\n• Modern web development tools\n• Responsive design & UI/UX\n\nCheck out the Skills section for a complete overview with detailed progress bars!";
    }
    
    if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
      return "Joe has worked on some amazing projects! 🚀 Including:\n• AI Interview System - Advanced AI-powered interview platform\n• Movie Applications - React-based movie discovery apps\n• Web Development Projects - Modern responsive websites\n• Full-stack applications with database integration\n\nVisit the Projects section to see detailed case studies with live demos and GitHub links!";
    }
    
    if (message.includes("education") || message.includes("study") || message.includes("college") || message.includes("school")) {
      return "Joe's educational journey includes:\n🎓 Bachelor of Computer Applications at St. Joseph's College, Trichy (2023-2026) - Current CGPA: 8.5\n📚 Higher Secondary at Velammal Matric Hr. Sec. School (2021-2023) - 78%\n📖 Secondary School at Velammal Matric Hr. Sec. School (2020-2021) - 85%\n💡 Continuous learning in modern web technologies and industry best practices";
    }
    
    if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("hire")) {
      return "Ready to connect with Joe? 📬 Multiple ways to reach out:\n• Fill out the contact form on this website\n• Connect on LinkedIn and GitHub\n• Download his comprehensive resume\n• Email directly through the contact section\n\nJoe is actively looking for opportunities and responds quickly to messages!";
    }
    
    if (message.includes("experience") || message.includes("background") || message.includes("intern")) {
      return "Joe brings valuable experience! 💪\n• Web Development Intern at Edubridge India (2022)\n• 1+ years of passionate full-stack development\n• Built multiple production applications\n• Strong expertise in React ecosystem\n• Proven track record with modern web technologies\n• Always eager to learn and adapt to new challenges";
    }
    
    if (message.includes("certificate") || message.includes("certification")) {
      return "Joe has earned several professional certifications! 🏆\n• ChatGPT for Web Developers\n• GitHub Professional Certificate\n• Microsoft Career Essentials\n• Various web development certifications\n\nCheck out the Certifications section to see all his verified credentials!";
    }

    if (message.includes("achievement") || message.includes("award")) {
      return "Joe has accomplished great things! 🌟\n• Multiple successful project deployments\n• Strong academic performance\n• Professional certifications completed\n• Growing portfolio of web applications\n\nVisit the Achievements section for detailed accomplishments!";
    }
    
    if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("good")) {
      return "Hello there! 😊 Great to meet you! I'm here to help you discover everything about Joe Rakesh A. Whether you're interested in his technical skills, exciting projects, educational background, or professional experience - just ask away! Feel free to use the quick questions below or ask anything specific.";
    }
    
    if (message.includes("thank") || message.includes("thanks")) {
      return "You're absolutely welcome! 🌟 Is there anything else you'd like to explore about Joe's portfolio? I'm here to help and provide detailed information about any aspect of his work or background!";
    }

    if (message.includes("resume") || message.includes("cv")) {
      return "You can download Joe's comprehensive resume directly from this website! 📄 Look for the download button in the hero section. It includes all his skills, projects, education, and experience in a professional format.";
    }

    if (message.includes("location") || message.includes("where")) {
      return "Joe is based in Tamil Nadu, India 🇮🇳 and is open to both local and remote opportunities worldwide! He's flexible with time zones and has experience working with international teams.";
    }

    if (message.includes("github") || message.includes("code") || message.includes("repository")) {
      return "Check out Joe's GitHub profile to see his code! 💻 You'll find:\n• Open source projects\n• Code samples and repositories\n• Contribution history\n• Active development work\n\nLinks are available in the contact section and project details!";
    }
    
    return "That's a great question! 🤔 I'd love to help you learn more about Joe. You can explore:\n• His technical skills and expertise levels\n• Exciting projects with live demos\n• Educational background and certifications\n• Professional experience and achievements\n• Contact information and resume\n\nWhat interests you most? Feel free to ask specific questions!";
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
    setMessageCount(prev => prev + 1);

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

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
      duration: 2000,
    });
  };

  const rateMessage = (messageId: string, rating: "up" | "down") => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
    toast({
      title: rating === "up" ? "Thanks!" : "Feedback noted",
      description: rating === "up" ? "Glad I could help!" : "I'll try to improve my responses",
      duration: 2000,
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hi! 👋 I'm Joe's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setMessageCount(1);
    toast({
      title: "Chat cleared",
      description: "Starting fresh conversation",
      duration: 2000,
    });
  };

  const quickQuestions = [
    "Tell me about Joe's skills",
    "Show me his projects",
    "What's his education?",
    "How can I contact Joe?",
    "What certifications does he have?",
    "Tell me about his experience"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300",
          isOpen && "scale-0 opacity-0",
          !isOpen && "animate-pulse"
        )}
        size="icon"
      >
        <Bot className="h-8 w-8" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl transition-all duration-300 overflow-hidden",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0",
          isMinimized ? "h-16" : "h-[500px]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-primary-dark text-white border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/Joe.jpg" alt="Joe" />
              <AvatarFallback className="bg-white text-primary">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-semibold">Joe's AI Assistant</span>
              <div className="text-xs opacity-90 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Online • {messageCount} messages
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={clearChat}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              title="Clear chat"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
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
            <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4 bg-gray-50 dark:bg-gray-800">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3 group",
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
                  
                  <div className="flex flex-col">
                    <div
                      className={cn(
                        "max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-line relative",
                        message.sender === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-bl-none shadow-sm text-gray-900 dark:text-gray-100"
                      )}
                    >
                      {message.text}
                      
                      {/* Message actions for bot messages */}
                      {message.sender === "bot" && (
                        <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            onClick={() => copyMessage(message.text)}
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => rateMessage(message.id, "up")}
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-6 w-6",
                              message.rating === "up" 
                                ? "text-green-600 dark:text-green-400" 
                                : "text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                            )}
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => rateMessage(message.id, "down")}
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-6 w-6",
                              message.rating === "down" 
                                ? "text-red-600 dark:text-red-400" 
                                : "text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                            )}
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className={cn(
                      "text-xs text-gray-500 dark:text-gray-400 mt-1",
                      message.sender === "user" ? "text-right" : "text-left"
                    )}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
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
                  <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-3 rounded-lg rounded-bl-none shadow-sm">
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
              <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</div>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full transition-colors text-left"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Joe..."
                  className="flex-1 border-gray-200 dark:border-gray-600 focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
