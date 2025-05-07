// lib/sample-tasks.ts

import { Task } from "@/types";

export const SAMPLE_TASK: Task = {
  id: "quiz-creation",
  title: "Create Multiple-Choice Quiz",
  goal: "Build a functional multiple-choice quiz with scoring system",
  steps: [
    {
      number: 1,
      description: "Design the quiz structure",
      checkpoint: "Create a list of 5 quiz questions with 4 answer options each",
      prompt: {
        systemContext: "You are helping a user design a multiple choice quiz. Guide them through creating well-structured questions and answers.",
        initialPrompt: "Let's start by creating your quiz questions. You'll need 5 questions, each with 4 possible answers. What topic would you like to cover?",
        followUpPrompts: [
          "Make sure each question has one clearly correct answer.",
          "Consider varying the difficulty levels across questions.",
          "Think about how to phrase the incorrect options to be plausible but clearly wrong."
        ]
      },
      criteria: {
        requiredElements: [
          "5 complete questions",
          "4 options per question",
          "Identified correct answers"
        ],
        minLength: 200,
        keywords: ["question", "answer", "option", "correct"]
      }
    },
    {
      number: 2,
      description: "Set up the HTML structure",
      checkpoint: "Create the basic HTML for the quiz container, question display, and answer options",
      prompt: {
        systemContext: "You are guiding the user through creating the HTML structure for a quiz application.",
        initialPrompt: "Now let's create the HTML structure for your quiz. You'll need containers for questions and answer options. How would you like to structure your markup?",
        followUpPrompts: [
          "Consider how to organize the question and answer elements.",
          "Think about semantic HTML elements for better accessibility.",
          "Plan the structure for navigation between questions."
        ]
      },
      criteria: {
        requiredElements: [
          "quiz container",
          "question element",
          "answer options container",
          "navigation elements"
        ],
        keywords: ["div", "button", "container", "class"]
      }
    },
    {
      number: 3,
      description: "Style the quiz with CSS",
      checkpoint: "Add styling for the quiz elements, including hover states and animations",
      prompt: {
        systemContext: "You are helping the user style their quiz interface to be visually appealing and user-friendly.",
        initialPrompt: "Let's style your quiz to make it look professional. What kind of visual theme would you like to create?",
        followUpPrompts: [
          "Consider adding hover effects to make interactions clear.",
          "Think about spacing and typography for readability.",
          "Plan responsive design adjustments for different screen sizes."
        ]
      },
      criteria: {
        requiredElements: [
          "base styles",
          "hover states",
          "responsive design",
          "color scheme"
        ],
        keywords: ["color", "hover", "padding", "margin", "responsive"]
      }
    },
    {
      number: 4,
      description: "Add JavaScript functionality",
      checkpoint: "Implement question navigation, answer selection, and score tracking",
      prompt: {
        systemContext: "You are guiding the user through implementing quiz functionality with JavaScript.",
        initialPrompt: "Now let's add interactivity to your quiz. We'll need to handle answer selection and track scores. How would you like to approach this?",
        followUpPrompts: [
          "Think about how to store and validate answers.",
          "Consider the logic for calculating the final score.",
          "Plan how to handle question navigation."
        ]
      },
      criteria: {
        requiredElements: [
          "answer selection handling",
          "score calculation",
          "navigation logic",
          "state management"
        ],
        keywords: ["function", "event", "score", "select"]
      }
    },
    {
      number: 5,
      description: "Create a results display",
      checkpoint: "Design and implement a results screen showing the final score and correct answers",
      prompt: {
        systemContext: "You are helping the user create an effective results display for their quiz.",
        initialPrompt: "Let's create the results screen to show how well users performed on the quiz. What information would you like to display?",
        followUpPrompts: [
          "Consider showing both the score and correct answers.",
          "Think about adding options to retry the quiz.",
          "Plan how to highlight incorrect answers for learning."
        ]
      },
      criteria: {
        requiredElements: [
          "score display",
          "correct answer review",
          "retry option"
        ],
        keywords: ["score", "result", "correct", "retry"]
      }
    }
  ]
};

export const AVAILABLE_TASKS: Task[] = [SAMPLE_TASK];