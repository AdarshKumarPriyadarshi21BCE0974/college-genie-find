
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
            className={`rounded-full w-6 h-6 flex items-center justify-center text-xs ${
              step === currentStep 
                ? 'bg-teal-500 text-white font-bold' 
                : step < currentStep 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div 
              className={`h-0.5 w-7 ${
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
