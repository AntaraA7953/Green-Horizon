import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Send, MessageCircle } from 'lucide-react';
import cactoChanImage from '@/assets/cactochan.png';

const CactoChan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🌵 Hi! I'm CactoChan, your eco-friendly assistant! How can I help you live more sustainably today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = [
    "🌱 That's a great eco-friendly question! I'd love to help you with sustainable living tips.",
    "🌿 Remember, every small action counts towards a greener planet!",
    "♻️ Did you know? Recycling one aluminum can saves enough energy to power a TV for 3 hours!",
    "🚶‍♂️ Walking or biking instead of driving is one of the best ways to reduce your carbon footprint!",
    "💚 Thanks for caring about our planet! Together we can make a difference.",
    "🌍 Green Horizon is here to help you track and improve your environmental impact!",
    "🌳 Planting trees is amazing! One tree can absorb 48 pounds of CO2 per year."
  ];

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        text: inputMessage,
        isUser: true,
        timestamp: new Date()
      };

      const randomResponse = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];
      const botResponse = {
        id: messages.length + 2,
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages([...messages, newUserMessage, botResponse]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full btn-eco pulse-glow ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-80 h-96 flex flex-col glass-card animate-scale-in">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <img 
                src={cactoChanImage} 
                alt="CactoChan" 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-sm">CactoChan</h3>
                <p className="text-xs text-muted-foreground">Your Eco Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <CardContent className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </CardContent>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask CactoChan about sustainability..."
                className="flex-1"
              />
              <Button onClick={sendMessage} size="sm" className="btn-eco">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default CactoChan;