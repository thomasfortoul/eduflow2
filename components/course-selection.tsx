import React from 'react';
import { Course } from '@/types';
import { useChat } from '@/contexts/ChatContext';

interface CourseSelectionProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export default function CourseSelection({ courses, onSelectCourse }: CourseSelectionProps) {
  return (
    <div className="py-8 px-4 md:px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select a Course</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
            onClick={() => onSelectCourse(course)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-card-foreground">{course.title}</h3>
              <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
                {course.level}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">Learning Objectives:</p>
            <ul className="space-y-2 mb-4">
              {course.learningObjectives.map((objective, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="mr-2">•</span>
                  {objective}
                </li>
              ))}
            </ul>
            <button 
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onSelectCourse(course);
              }}
            >
              Start Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 