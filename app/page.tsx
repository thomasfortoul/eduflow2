"use client";

import { useState, useEffect } from 'react';
import TaskSelection from '@/components/task-selection';
import ChatInterface from '@/components/chat-interface';
import { AVAILABLE_TASKS } from '@/lib/sample-tasks';
import { useChat } from '@/contexts/ChatContext';
import { Layers, ArrowLeftCircle } from 'lucide-react';

export default function Home() {
  const { task, startTask } = useChat();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border bg-background flex items-center px-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Layers className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Educational Task Assistant</h1>
          </div>
          
          {task && (
            <button
              onClick={() => startTask(AVAILABLE_TASKS[0])}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftCircle size={16} className="mr-1" />
              Reset Task
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        {task ? (
          <ChatInterface />
        ) : (
          <TaskSelection tasks={AVAILABLE_TASKS} />
        )}
      </div>
    </main>
  );
}