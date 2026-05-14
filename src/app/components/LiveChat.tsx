import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{sender: 'bot' | 'user' | 'options', text: string | React.ReactNode}[]>([
    { sender: 'bot', text: "Hi! Have a question? We're here to help." },
    { sender: 'options', text: "" }
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    const handleOpenChat = () => setIsOpen(true);
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-live-chat", handleOpenChat);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-live-chat", handleOpenChat);
    };
  }, [isOpen]);

  const handleOptionClick = (optionText: string, linkTo: string) => {
    setChatLog(prev => [
      ...prev.filter(msg => msg.sender !== 'options'),
      { sender: 'user', text: optionText },
      { sender: 'bot', text: (
        <span>
          Great! You can find more information about that in our <a href={linkTo} onClick={() => setIsOpen(false)} className="underline font-bold hover:text-[color:var(--accent)]">Help Centre</a>. Do you have any other questions?
        </span>
      ) }
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatLog(prev => [
      ...prev.filter(msg => msg.sender !== 'options'),
      { sender: 'user', text: message }
    ]);
    setMessage("");

    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'bot', text: "Thanks for reaching out! A support agent will get back to you at support@zorastore.com." }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-[color:var(--accent)] text-[color:var(--text-on-accent)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open Live Chat"
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[90%] max-w-[350px] bg-[color:var(--bg-card)] rounded-2xl shadow-2xl border border-[color:var(--bg-primary)] overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            <div className="bg-[color:var(--accent)] text-[color:var(--text-on-accent)] p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-sm">ZORA Support</h3>
                  <p className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 p-1">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[color:var(--bg-card)]">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'options' ? (
                    <div className="flex flex-col gap-2 mt-2 w-full">
                      <button onClick={() => handleOptionClick("How do I return an item?", "/help")} className="text-left text-xs bg-[color:var(--bg-primary)] p-2 rounded-lg border border-[color:var(--text-primary)]/10 hover:border-[color:var(--accent)] transition-colors">How do I return an item?</button>
                      <button onClick={() => handleOptionClick("Track my order", "/orders")} className="text-left text-xs bg-[color:var(--bg-primary)] p-2 rounded-lg border border-[color:var(--text-primary)]/10 hover:border-[color:var(--accent)] transition-colors">Track my order</button>
                      <button onClick={() => handleOptionClick("Product compatibility", "/help")} className="text-left text-xs bg-[color:var(--bg-primary)] p-2 rounded-lg border border-[color:var(--text-primary)]/10 hover:border-[color:var(--accent)] transition-colors">Product compatibility</button>
                    </div>
                  ) : (
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[color:var(--accent)] text-[color:var(--text-on-accent)] rounded-br-none' 
                        : 'bg-[color:var(--bg-primary)] text-[color:var(--text-primary)] rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-[color:var(--bg-primary)] bg-[color:var(--bg-card)] flex gap-2 shrink-0">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[color:var(--bg-primary)] border-none rounded-full px-4 py-2 text-sm text-[color:var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--accent)]"
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="w-10 h-10 rounded-full bg-[color:var(--accent)] text-[color:var(--text-on-accent)] flex items-center justify-center disabled:opacity-50 shrink-0"
              >
                <Send size={16} className="-ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}