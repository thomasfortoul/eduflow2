import { NextResponse } from 'next/server';
import axios from 'axios';

interface TaskContext {
  title: string;
  goal: string;
  currentStep: number;
  stepDescription: string;
  stepCheckpoint: string;
}

interface ProgressContext {
  completedSteps: number[];
  isCompleted: boolean;
}

interface RequestBody {
  message: string;
  task?: TaskContext;
  course?: {
    title: string;
    level: string;
    learningObjectives: string[];
  };
  progress?: ProgressContext;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { message, task, course, progress } = body;

    console.log('📨 Received API request:', {
      message,
      task,
      course,
      progress
    });

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('❌ API key is missing');
      return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
    }

    let systemPrompt = `You are an AI assistant helping with an educational task. Your responses should be in JSON format with exactly two fields:
- stepApproved (boolean): whether the user's response meets the step's criteria
- message (string): your response message or feedback
Example: {"stepApproved": true, "message": "Great work! Moving to next step."}`;

    if (course) {
      console.log('📚 Adding course context to prompt:', course);
      systemPrompt += `\n\nCourse Context:
- Course Title: ${course.title}
- Level: ${course.level}
- Learning Objectives:
${course.learningObjectives.map(obj => `  - ${obj}`).join('\n')}`;
    }

    if (task) {
      console.log('📋 Adding task context to prompt:', task);
      systemPrompt += `\n\nTask Context:
- Task: ${task.title}
- Goal: ${task.goal}
- Current Step: ${task.currentStep}
- Step Description: ${task.stepDescription}
- Checkpoint: ${task.stepCheckpoint}`;
    }

    if (progress) {
      console.log('📊 Adding progress context to prompt:', progress);
      systemPrompt += `\n\nProgress:
- Completed Steps: ${progress.completedSteps.join(', ')}
- Task Completed: ${progress.isCompleted}`;
    }

    console.log('🤖 Final system prompt:', systemPrompt);

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-haiku-latest',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    console.log('✅ Received Claude response:', response.data);

    // Pull out the raw JSON-text the model returned
    const raw = response.data.content[0].text.trim();

    // Attempt to parse it as JSON
    let result: { stepApproved: boolean; message: string };
    try {
      result = JSON.parse(raw);
    } catch (err) {
      console.error('Failed to parse AI response JSON:', raw, err);
      return NextResponse.json(
        { stepApproved: false, message: 'Error parsing AI response.' },
        { status: 500 }
      );
    }

    // Return the AI-evaluated result directly
    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ Error in API route:', error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: 'API Error', details: error.response.data },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to communicate with Claude API',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

    // console.log(response.data);
    // Response example:
    // {
    //   id: 'msg_01S3udiez33AYvqymizwejEy',
    //   type: 'message',
    //   role: 'assistant',
    //   model: 'claude-3-5-haiku-20241022',
    //   content: [
    //     {
    //       type: 'text',
    //       text: '\n' +
    //         '    "stepApproved": false, \n' +
    //         `    "message": "Hello! I'm ready to help you with an educational task. Could you please provide more details about what you'd like to work on?"\n` +
    //         '}'
    //     }
    //   ], ... }
