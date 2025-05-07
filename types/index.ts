// Type definitions for the educational task assistant

export interface StepCriteria {
  requiredElements: string[];
  minLength?: number;
  maxLength?: number;
  keywords?: string[];
}

export interface StepPrompt {
  systemContext: string;
  initialPrompt: string;
  followUpPrompts: string[];
}

export interface Step {
  number: number;
  description: string;
  checkpoint: string;
  prompt: StepPrompt;
  criteria: StepCriteria;
}

export interface Task {
  id: string;
  title: string;
  goal: string;
  steps: Step[];
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  stepNumber?: number;
}

export interface AIResponse {
  stepApproved: boolean;
  message: string;
}

export interface TaskProgress {
  taskId: string;
  currentStep: number;
  completedSteps: number[];
  isCompleted: boolean;
}

export interface ChatContextType {
  messages: Message[];
  task: Task | null;
  progress: TaskProgress | null;
  isTyping: boolean;
  sendMessage: (content: string) => void;
  startTask: (task: Task) => void;
  goToPreviousStep: () => void;
  completeStep: (stepNumber: number) => void;
}