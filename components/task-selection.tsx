import React from 'react';
import { Task } from '@/types';
import TaskCard from './task-card';

interface TaskSelectionProps {
  tasks: Task[];
}

export default function TaskSelection({ tasks }: TaskSelectionProps) {
  return (
    <div className="py-8 px-4 md:px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select a Task</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}