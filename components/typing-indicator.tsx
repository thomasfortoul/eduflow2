import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground rounded-lg px-4 py-3 rounded-tl-none max-w-[80%] animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-xs text-muted-foreground">Assistant is typing...</span>
    </div>
  );
}