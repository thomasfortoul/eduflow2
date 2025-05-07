"use client";

import { useState, useEffect } from 'react';
import TaskSelection from '@/components/task-selection';
import CourseSelection from '@/components/course-selection';
import ChatInterface from '@/components/chat-interface';
import { AVAILABLE_TASKS } from '@/lib/sample-tasks';
import { SAMPLE_COURSES } from '@/lib/sample-courses';
import { useChat } from '@/contexts/ChatContext';
import { Layers, ArrowLeftCircle } from 'lucide-react';
import { Course, Task } from '@/types';

export default function Home() {
  const { task, course, startTask } = useChat();
  const [mounted, setMounted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleTaskSelect = (task: Task) => {
    startTask(task);
  };

  const handleReset = () => {
    setSelectedCourse(null);
    startTask(AVAILABLE_TASKS[0]);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border bg-background flex items-center px-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Layers className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Educational Task Assistant</h1>
          </div>
          
          {(task || selectedCourse) && (
            <button
              onClick={handleReset}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftCircle size={16} className="mr-1" />
              Reset
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        {task ? (
          <ChatInterface />
        ) : selectedCourse ? (
          <TaskSelection 
            tasks={AVAILABLE_TASKS.filter(task => task.courseId === selectedCourse.id)} 
            onSelectTask={handleTaskSelect}
          />
        ) : (
          <CourseSelection 
            courses={SAMPLE_COURSES} 
            onSelectCourse={handleCourseSelect}
          />
        )}
      </div>
    </main>
  );
}