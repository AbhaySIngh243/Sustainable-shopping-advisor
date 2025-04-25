import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Send, Mic, VolumeX, Volume2 } from "lucide-react";
import { OPENROUTER_API_KEY } from './OPENROUTER_API_KEY';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Web Speech API TypeScript definitions
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation: any;
}

interface SpeechRecognitionError extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionError) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

// Declare global to make TypeScript aware of browser APIs
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm EcoWise, your sustainable shopping advisor. How can I help you make more eco-friendly choices today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableElement) {
        scrollableElement.scrollTop = scrollableElement.scrollHeight;
      }
    }
  }, [messages]);

  // Speak bot messages when they arrive if speaker is enabled
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (isSpeakerEnabled && latestMessage && latestMessage.sender === 'bot' && !isTyping) {
      speakText(latestMessage.text);
    }
  }, [messages, isTyping, isSpeakerEnabled]);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      // Automatically send the message when stopping voice input
      if (input.trim()) {
        handleSendMessage();
      }
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const toggleSpeaker = () => {
    setIsSpeakerEnabled(!isSpeakerEnabled);
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text: string) => {
    if (!isSpeakerEnabled || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Get available voices and pick a female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('Female'));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Format message history for OpenRouter API
      const messageHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Send message to OpenRouter API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin, // Required by OpenRouter
          'X-Title': 'EcoWise Assistant' // Optional but recommended
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-haiku', // FAST and supports streaming
          messages: [
            // System message to define the bot's personality and role
            {
              role: 'system',
              content: 'You are EcoWise, a helpful sustainable shopping advisor. Provide concise, practical advice about eco-friendly products, sustainable choices, and environmental impact of consumer decisions. Focus on actionable tips that help users make more environmentally responsible shopping choices.'
            },
            ...messageHistory,
            { role: 'user', content: input }
          ],
          stream: true // Enable streaming for real-time responses
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let botMessageText = '';
        let botMessageId = Date.now().toString();

        // Process the streaming response
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.substring(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsedData = JSON.parse(data);
                const content = parsedData.choices[0]?.delta?.content || '';
                if (content) {
                  botMessageText += content;
                  
                  // Update the bot message in real time
                  setMessages(prevMessages => {
                    const botMessageIndex = prevMessages.findIndex(msg => msg.id === botMessageId);
                    
                    if (botMessageIndex !== -1) {
                      // Update existing bot message
                      const updatedMessages = [...prevMessages];
                      updatedMessages[botMessageIndex] = {
                        ...updatedMessages[botMessageIndex],
                        text: botMessageText
                      };
                      return updatedMessages;
                    } else {
                      // Create new bot message
                      const botMessage: Message = {
                        id: botMessageId,
                        text: botMessageText,
                        sender: 'bot',
                        timestamp: new Date()
                      };
                      return [...prevMessages, botMessage];
                    }
                  });
                }
              } catch (e) {
                console.error('Error parsing streaming data:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error connecting to my knowledge base. Please try again or check your network connection.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto border border-eco-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-eco-500/10 to-leaf-500/10 border-b border-eco-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 bg-eco-100 text-eco-500 mr-3 border-2 border-eco-200 animate-float">
              <Leaf className="h-5 w-5" />
            </Avatar>
            <div>
              <CardTitle className="text-xl font-heading font-medium text-eco-800">EcoWise Assistant</CardTitle>
              <p className="text-xs text-eco-600">Your sustainable shopping guide</p>
            </div>
          </div>
          <Button
            onClick={toggleSpeaker}
            variant="ghost"
            size="sm"
            className="rounded-full w-8 h-8 p-0 text-eco-600 hover:text-eco-800 hover:bg-eco-100"
          >
            {isSpeakerEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[350px] p-4" ref={scrollAreaRef}>
          <div className="flex flex-col space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} opacity-0 ${
                  message.sender === 'user' ? 'animate-fade-in-left' : 'animate-fade-in-right'
                }`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-eco-500 text-white rounded-tr-none' 
                      : 'bg-eco-100 text-eco-800 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start opacity-0 animate-fade-in-right">
                <div className="max-w-[80%] px-4 py-2 rounded-2xl bg-eco-100 text-eco-800 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-eco-500 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-eco-500 animate-bounce" style={{animationDelay: '0.2s'}} />
                    <div className="w-2 h-2 rounded-full bg-eco-500 animate-bounce" style={{animationDelay: '0.4s'}} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t border-eco-100 bg-gradient-to-r from-eco-50 to-leaf-50">
        <div className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening..." : "Ask about sustainable products..."}
            className={`flex-1 border-eco-200 focus:ring-eco-500 rounded-full px-4 ${isListening ? 'border-eco-500 animate-pulse' : ''}`}
            disabled={isTyping}
          />
          <Button 
            onClick={toggleSpeechRecognition}
            className={`rounded-full w-10 h-10 p-0 ${isListening ? 'bg-eco-600 animate-pulse' : 'bg-eco-400 hover:bg-eco-500'}`}
            disabled={isTyping}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleSendMessage} 
            className="rounded-full w-10 h-10 p-0 bg-eco-500 hover:bg-eco-600"
            disabled={input.trim() === '' || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};