//contexts/ChatContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Message, Task, TaskProgress, ChatContextType, AIResponse, Course } from '@/types';
import { generateId, callClaudeAPI } from '@/lib/helpers';
import { SAMPLE_COURSE } from '@/lib/sample-data';

const ChatContext = createContext<ChatContextType>({
  messages: [],
  task: null,
  course: SAMPLE_COURSE,
  progress: null,
  isTyping: false,
  sendMessage: () => {},
  startTask: () => {},
  goToPreviousStep: () => {},
  completeStep: () => {},
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [course] = useState<Course>(SAMPLE_COURSE);
  const [progress, setProgress] = useState<TaskProgress | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const startTask = useCallback((selectedTask: Task) => {
    setTask(selectedTask);
    setProgress({
      taskId: selectedTask.id,
      currentStep: 1,
      completedSteps: [],
      isCompleted: false
    });
    
    setMessages([]);
    
    const welcomeMessage: Message = {
      id: generateId(),
      content: selectedTask.steps[0].prompt.initialPrompt,
      sender: 'ai',
      timestamp: new Date(),
      stepNumber: 1
    };
    
    setMessages([welcomeMessage]);
  }, []);

  const goToPreviousStep = useCallback(() => {
    if (!task || !progress || progress.currentStep <= 1) return;
    
    const previousStep = progress.currentStep - 1;
    
    setProgress(prev => {
      if (!prev) return null;
      
      // Remove all completed steps after the previous step
      const completedSteps = prev.completedSteps.filter(step => step <= previousStep);
      
      return {
        ...prev,
        currentStep: previousStep,
        completedSteps,
        isCompleted: false
      };
    });
    
    const step = task.steps.find(s => s.number === previousStep);
    if (step) {
      const stepMessage: Message = {
        id: generateId(),
        content: `Going back to step ${previousStep}: ${step.description}`,
        sender: 'ai',
        timestamp: new Date(),
        stepNumber: previousStep
      };
      
      setMessages(prev => [...prev, stepMessage]);
    }
  }, [task, progress]);

  const sendMessage = useCallback(async (content: string) => {
    if (!task || !progress) return;
    
    const currentStep = task.steps.find(s => s.number === progress.currentStep);
    if (!currentStep) return;
    
    console.log('📝 Preparing to send message with context:', {
      task: task.title,
      currentStep: currentStep.number,
      course: course.title
    });
    
    const userMessage: Message = {
      id: generateId(),
      content,
      sender: 'user',
      timestamp: new Date(),
      stepNumber: progress.currentStep
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      const contextData = {
        task: {
          title: task.title,
          goal: task.goal,
          currentStep: currentStep.number,
          stepDescription: currentStep.description,
          stepCheckpoint: currentStep.checkpoint
        },
        course: {
          title: course.title,
          level: course.level,
          learningObjectives: course.learningObjectives
        },
        progress: {
          completedSteps: progress.completedSteps,
          isCompleted: progress.isCompleted
        }
      };
      
      console.log('🎯 Sending context data:', contextData);
      
      const aiResponse = await callClaudeAPI(content, currentStep, contextData);
      
      console.log('🤖 Received AI response:', aiResponse);
      
      const aiMessage: Message = {
        id: generateId(),
        content: aiResponse.message,
        sender: 'ai',
        timestamp: new Date(),
        stepNumber: progress.currentStep
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (aiResponse.stepApproved) {
        completeStep(progress.currentStep);
      }
    } catch (error) {
      console.error('❌ Error in sendMessage:', error);
      
      const errorMessage: Message = {
        id: generateId(),
        content: "I'm having trouble processing your message. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
        stepNumber: progress.currentStep
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [task, progress, course]);

  const completeStep = useCallback((stepNumber: number) => {
    if (!task || !progress) return;
    
    if (stepNumber < 1 || stepNumber > task.steps.length) return;
    
    setProgress(prev => {
      if (!prev) return null;
      
      const completedSteps = prev.completedSteps.includes(stepNumber)
        ? prev.completedSteps
        : [...prev.completedSteps, stepNumber];
      
      const isCompleted = completedSteps.length === task.steps.length;
      const nextStep = isCompleted ? prev.currentStep : Math.min(stepNumber + 1, task.steps.length);
      
      return {
        ...prev,
        currentStep: nextStep,
        completedSteps,
        isCompleted
      };
    });
    
    const completionMessage: Message = {
      id: generateId(),
      content: `Great job! You've completed step ${stepNumber}.`,
      sender: 'ai',
      timestamp: new Date(),
      stepNumber
    };
    
    setMessages(prev => [...prev, completionMessage]);
    
    if (stepNumber < task.steps.length) {
      const nextStep = task.steps.find(s => s.number === stepNumber + 1);
      if (nextStep) {
        const nextStepMessage: Message = {
          id: generateId(),
          content: nextStep.prompt.initialPrompt,
          sender: 'ai',
          timestamp: new Date(),
          stepNumber: stepNumber + 1
        };
        
        setMessages(prev => [...prev, nextStepMessage]);
      }
    } else {
      const completionMessage: Message = {
        id: generateId(),
        content: `Congratulations! You've completed the "${task.title}" task. You've achieved the goal: ${task.goal}`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, completionMessage]);
    }
  }, [task, progress]);

  return (
    <ChatContext.Provider value={{
      messages,
      task,
      course,
      progress,
      isTyping,
      sendMessage,
      startTask,
      goToPreviousStep,
      completeStep
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);