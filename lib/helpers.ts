// lib/helpers.ts

import { Message, AIResponse, Step } from "@/types";
import axios from 'axios';

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
}

export function scrollToBottom(elementId: string, smooth = true): void {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }, 100);
}

export async function callClaudeAPI(userMessage: string, step: Step): Promise<AIResponse> {
  try {
    // Call our own API route instead of Anthropic's API directly
    const response = await axios.post('/api/chat', {
      message: userMessage,
      step: step
    });
    
    // The response is already evaluated by the API route
    return response.data;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    
    // Handle errors from our API
    if (axios.isAxiosError(error) && error.response) {
      return {
        stepApproved: false,
        reason: `API Error: ${error.response.status}`,
        message: error.response.data.message || 'An error occurred when communicating with Claude'
      };
    }
    
    // Generic error handling
    return {
      stepApproved: false,
      reason: 'Failed to communicate with API',
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

// Note: evaluateResponse function has been moved to the API route
// It's no longer needed here since evaluation happens on the server