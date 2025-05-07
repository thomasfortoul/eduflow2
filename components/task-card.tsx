"use client";

import React from 'react';
import { Task } from '@/types';
import { useChat } from '@/contexts/ChatContext';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { startTask } = useChat();
  
  return (
    <div 
      className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
      onClick={() => startTask(task)}
    >
      <h3 className="text-xl font-semibold text-card-foreground mb-2">{task.title}</h3>
      <p className="text-muted-foreground mb-4">{task.goal}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{task.steps.length} steps</span>
        <button 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            startTask(task);
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}