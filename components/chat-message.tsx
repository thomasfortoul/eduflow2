"use client";

import React from 'react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/helpers';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={cn(
      "flex w-full mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
      isAI ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-3",
        isAI ? "bg-secondary text-secondary-foreground rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"
      )}>
        <div className="flex flex-col">
          <div className="break-words">{message.content}</div>
          <div className={cn(
            "text-xs mt-1 self-end",
            isAI ? "text-muted-foreground" : "text-primary-foreground/80"
          )}>
            {formatDate(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}