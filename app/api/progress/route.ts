import { NextRequest, NextResponse } from 'next/server';
import { TaskProgress } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const progress: TaskProgress = await request.json();
    
    if (!progress.taskId || progress.currentStep === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real application, you would save this progress to a database
    
    // For now, just return the progress object with any validation or processing
    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}