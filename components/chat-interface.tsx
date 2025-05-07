//components/chat-interface.tsx

"use client";

import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import MessageList from './message-list';
import MessageInput from './message-input';
import StepNavigator from './step-navigator';
import { ProgressBar } from './ui/progress-bar';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function ChatInterface() {
  const { messages, task, progress, isTyping, sendMessage, goToPreviousStep, completeStep } = useChat();
  
  if (!task || !progress) {
    return null;
  }

  const completionPercentage = (progress.completedSteps.length / task.steps.length) * 100;
  
  const handleCompleteStep = () => {
    completeStep(progress.currentStep);
  };
  
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-background">
      <div className="flex flex-col flex-1 h-full">
        <div className="border-b border-border p-4 sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {progress.currentStep > 1 && (
                <button
                  onClick={goToPreviousStep}
                  className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/90 transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Go Back</span>
                </button>
              )}
              <h2 className="text-xl font-bold">{task.title}</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              Step {progress.currentStep} of {task.steps.length}
            </span>
          </div>
          
          <div className="mb-2">
            <p className="text-sm text-muted-foreground">{task.goal}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <ProgressBar 
              value={progress.completedSteps.length} 
              max={task.steps.length} 
              className="flex-1"
            />
            <span className="text-sm font-medium">
              {Math.round(completionPercentage)}%
            </span>
          </div>
        </div>
        
        <MessageList messages={messages} isTyping={isTyping} />
        
        <div className="border-t border-border">
          {!progress.completedSteps.includes(progress.currentStep) && (
            <div className="p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Current checkpoint:</h3>
                  <p className="text-sm text-muted-foreground">
                    {task.steps.find(s => s.number === progress.currentStep)?.checkpoint}
                  </p>
                </div>
                <button
                  onClick={handleCompleteStep}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  <CheckCircle size={16} />
                  <span>Complete Step</span>
                </button>
              </div>
            </div>
          )}
          
          <MessageInput 
            onSendMessage={sendMessage} 
            disabled={isTyping}
          />
        </div>
      </div>
      
      <div className="md:w-64 lg:w-80 border-t md:border-t-0 md:border-l border-border flex flex-col">
        <StepNavigator 
          steps={task.steps}
          currentStep={progress.currentStep}
          completedSteps={progress.completedSteps}
        />
      </div>
    </div>
  );
}