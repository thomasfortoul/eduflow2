"use client";

import React, { useEffect, useRef } from 'react';
import { Message } from '@/types';
import ChatMessage from './chat-message';
import TypingIndicator from './typing-indicator';
import { scrollToBottom } from '@/lib/helpers';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export default function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom('message-container');
  }, [messages, isTyping]);
  
  return (
    <div 
      id="message-container"
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
    >
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isTyping && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
}