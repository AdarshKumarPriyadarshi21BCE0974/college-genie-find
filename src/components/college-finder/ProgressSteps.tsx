
import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-end mb-4">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map((step) => (
        <React.Fragment key={step}>
          <div 
            className={`rounded-full w-4 h-4 flex items-center justify-center ${
              step === currentStep 
                ? 'bg-teal-500' 
                : step < currentStep 
                  ? 'bg-teal-500' 
                  : 'bg-gray-300'
            }`}
          />
          {step < totalSteps && (
            <div 
              className={`h-0.5 w-5 ${
                step < currentStep ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;
