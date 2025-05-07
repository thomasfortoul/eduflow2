import { Course } from '@/types';

export const SAMPLE_COURSES: Course[] = [
  {
    id: 'web-dev-101',
    title: 'Introduction to Web Development',
    level: 'Beginner',
    learningObjectives: [
      'Understand basic HTML structure and elements',
      'Learn CSS styling and layout techniques',
      'Master JavaScript fundamentals and DOM manipulation',
      'Build responsive web applications',
      'Implement modern web development practices'
    ]
  },
  {
    id: 'react-mastery',
    title: 'React Development Mastery',
    level: 'Intermediate',
    learningObjectives: [
      'Master React component architecture',
      'Implement state management with hooks',
      'Build reusable component libraries',
      'Create performant React applications',
      'Implement advanced React patterns'
    ]
  },
  {
    id: 'node-backend',
    title: 'Node.js Backend Development',
    level: 'Intermediate',
    learningObjectives: [
      'Build RESTful APIs with Express.js',
      'Implement authentication and authorization',
      'Work with databases and ORMs',
      'Handle asynchronous operations',
      'Deploy and scale Node.js applications'
    ]
  }
]; 