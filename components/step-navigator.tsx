"use client";

import React from 'react';
import { Step } from '@/types';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle } from 'lucide-react';

interface StepNavigatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export default function StepNavigator({
  steps,
  currentStep,
  completedSteps,
}: StepNavigatorProps) {
  return (
    <div className="border-t border-border py-4 px-4">
      <h3 className="text-sm font-medium mb-4">Progress</h3>
      <div className="space-y-2">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;
          
          return (
            <div
              key={step.number}
              className={cn(
                "flex items-start w-full text-left p-2 rounded-md",
                isCurrent && "bg-accent"
              )}
            >
              <div className="flex-shrink-0 mt-0.5 mr-3">
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className={cn(
                    "h-5 w-5",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )} />
                )}
              </div>
              <div className="space-y-1">
                <div className={cn(
                  "text-sm font-medium",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  Step {step.number}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}