import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Send, Sparkles, AlertCircle, Wrench, Calendar, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Array<{ icon: any; label: string; }>;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm your AI vehicle assistant. I can help you understand your vehicle's condition, schedule repairs, and answer any questions. What would you like to know?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { icon: AlertCircle, text: "What's my vehicle's current condition?" },
    { icon: Sparkles, text: "Why did my engine light turn on?" },
    { icon: Wrench, text: "Schedule a repair" },
    { icon: FileText, text: "Give me RCA of last issue" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content?: string) => {
    const messageText = content || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      let actions = undefined;

      if (messageText.toLowerCase().includes('condition') || messageText.toLowerCase().includes('current')) {
        aiResponse = "Your vehicle is in good overall condition with a health score of 87/100. I detected 2 minor issues:\n\n1. Brake fluid is running low (estimated 5 days until critical)\n2. Front left tire pressure is 2 PSI below optimal\n\nBoth are non-urgent but should be addressed within the next week.";
        actions = [
          { icon: Calendar, label: 'Schedule Service' },
          { icon: FileText, label: 'View Details' }
        ];
      } else if (messageText.toLowerCase().includes('engine light')) {
        aiResponse = "Your engine light came on due to a detected issue with the oxygen sensor. This sensor monitors exhaust gases to optimize fuel efficiency.\n\nRoot Cause Analysis:\n• Sensor reading outside normal range\n• Likely caused by sensor age (4.2 years)\n• No immediate safety risk\n\nRecommended Action: Schedule a diagnostic check within 2 weeks to prevent potential fuel efficiency loss.";
        actions = [
          { icon: Wrench, label: 'Book Diagnostic' },
          { icon: FileText, label: 'Full RCA Report' }
        ];
      } else if (messageText.toLowerCase().includes('schedule') || messageText.toLowerCase().includes('repair')) {
        aiResponse = "I can help you schedule a repair! Based on your current issues, I recommend:\n\n• Service: Brake fluid refill + tire pressure check\n• Duration: 30-45 minutes\n• Recommended date: 3 days from now\n• Best workshop: AutoCare Pro (2.3 km away, 4.8★)\n\nWould you like me to book this appointment?";
        actions = [
          { icon: Calendar, label: 'Confirm Booking' }
        ];
      } else if (messageText.toLowerCase().includes('rca') || messageText.toLowerCase().includes('last issue')) {
        aiResponse = "Root Cause Analysis - Last Issue (Brake Warning Light):\n\n**Timeline:** 3 days ago\n**Component:** Brake fluid reservoir\n**Root Cause:** Gradual fluid depletion due to minor leak in brake line connection\n\n**CAPA (Corrective Action):**\n• Tighten brake line connection\n• Refill brake fluid to optimal level\n\n**Preventive Action:**\n• Inspect brake lines every 6 months\n• Monitor fluid levels weekly\n\nThe issue was resolved during your last service, but levels are declining again.";
        actions = [
          { icon: FileText, label: 'Download Full Report' }
        ];
      } else {
        aiResponse = "I understand you're asking about your vehicle. Could you be more specific? I can help you with:\n\n• Current vehicle health status\n• Explaining warning lights or issues\n• Scheduling maintenance or repairs\n• Providing root cause analysis of problems\n• Answering technical questions";
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        actions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-800 bg-[#0A0E1A] sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl">AI Assistant</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <p className="text-sm text-gray-400">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                      : 'bg-[#141824] border border-gray-800'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                </div>
                
                {message.actions && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.actions.map((action, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 bg-[#141824] border border-gray-800 rounded-xl text-xs hover:bg-[#1a1f35] transition-colors"
                      >
                        <action.icon className="w-3 h-3 text-blue-400" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-2 px-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-[#141824] border border-gray-800 rounded-2xl p-4">
              <div className="flex gap-1">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-xs text-gray-400 mb-3">Quick questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt.text)}
                className="flex items-start gap-2 p-3 bg-[#141824] border border-gray-800 rounded-xl text-left hover:bg-[#1a1f35] transition-colors"
              >
                <prompt.icon className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs">{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 pt-4 border-t border-gray-800 bg-[#0A0E1A]">
        <div className="flex items-end gap-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 ${
              isRecording
                ? 'bg-red-500 animate-pulse'
                : 'bg-[#141824] border border-gray-800 hover:bg-[#1a1f35]'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about your vehicle..."
              className="w-full bg-[#141824] border border-gray-800 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
          >
            <div className="flex gap-1">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [1, 2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 h-4 bg-red-400 rounded-full"
                />
              ))}
            </div>
            <p className="text-sm text-red-400">Recording...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
