//app/api/chat/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

// Export the POST method handler for the App Router
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { message, step } = body;

    // Validate inputs
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get API key from server environment variables (not exposed to client)
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.error('API key is missing');
      return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
    }

    console.log('calling Claude API');
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-haiku-latest',
        max_tokens: 1000,
        messages: [{ role: 'user', content: message }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    // Extract the content from Claude's response
    const content = response.data.content[0].text;
    
    // If step is provided, evaluate the response
    if (step) {
      const evaluationResult = evaluateResponse(content, step);
      return NextResponse.json(evaluationResult);
    }
    
    // Otherwise just return the content
    return NextResponse.json({ 
      stepApproved: true, 
      message: content,
      reason: "Response received" 
    });
    
  } catch (error) {
    console.error('Error calling Claude API:', error);
    
    // Check if it's an Axios error with a response
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json({
        error: 'API Error',
        details: error.response.data
      }, { status: error.response.status });
    }
    
    return NextResponse.json({ 
      error: 'Failed to communicate with Claude API',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Evaluation function
function evaluateResponse(content: string, step: any): any {
  const { criteria } = step;
  const contentLower = content.toLowerCase();
  
  // Check required elements
  const missingElements = criteria.requiredElements.filter((element: string) => 
    !contentLower.includes(element.toLowerCase())
  );
  
  // Check keywords
  const missingKeywords = (criteria.keywords || []).filter((keyword: string) =>
    !contentLower.includes(keyword.toLowerCase())
  );
  
  // Check length requirements
  const contentLength = content.length;
  const tooShort = criteria.minLength && contentLength < criteria.minLength;
  const tooLong = criteria.maxLength && contentLength > criteria.maxLength;
  
  // Evaluate response
  if (missingElements.length > 0) {
    return {
      stepApproved: false,
      reason: `Missing required elements: ${missingElements.join(", ")}`,
      message: `Your response is missing some key elements. Please include: ${missingElements.join(", ")}`
    };
  }
  
  if (missingKeywords.length > 0) {
    return {
      stepApproved: false,
      reason: `Missing important concepts: ${missingKeywords.join(", ")}`,
      message: "Could you elaborate more on your approach? Make sure to address all key concepts."
    };
  }
  
  if (tooShort) {
    return {
      stepApproved: false,
      reason: `Response too short (${contentLength} chars, minimum ${criteria.minLength})`,
      message: "Could you provide more detail in your response?"
    };
  }
  
  if (tooLong) {
    return {
      stepApproved: false,
      reason: `Response too long (${contentLength} chars, maximum ${criteria.maxLength})`,
      message: "Your response is quite detailed. Could you make it more concise?"
    };
  }
  
  return {
    stepApproved: true,
    reason: "Response meets all criteria",
    message: content
  };
}