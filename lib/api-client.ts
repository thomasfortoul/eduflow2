// lib/api-client.ts

import { Message, TaskProgress } from "@/types";
import { generateId } from "./helpers";
import axios from 'axios';

// Mock API client
export const apiClient = {
  sendMessage: async (content: string, taskId: string, currentStep: number): Promise<Message> => {
    
  try {
    // Call our own API route instead of Anthropic's API directly
    const response = await axios.post('/api/chat', {
      message: content,
      step: currentStep
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
  },

  updateProgress: async (progress: TaskProgress): Promise<TaskProgress> => {
    // This would normally be a fetch call to the API
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progress),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating progress:', error);
      // Return the original progress in case of error
      return progress;
    }
  }
};