
import React, { useState, useEffect } from 'react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<1 | 2>(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        
        if (prev === 40) {
          setStage(2);
        }
        
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto text-center p-6">
        <h3 className="text-2xl font-medium mb-8 text-gray-800">
          {stage === 1 ? "Our algorithm is evaluating your profile..." : "Matching your preferences to universities..."}
        </h3>
        
        {stage === 1 ? (
          <div className="w-60 h-60 mx-auto mb-8">
            <img 
              src={`${window.location.origin}/lovable-uploads/f9a06b5c-5197-4713-a89c-63a4e8d85bc6.png`} 
              alt="Evaluating profile" 
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="w-60 h-60 mx-auto mb-8">
            <img 
              src={`${window.location.origin}/lovable-uploads/14d25593-3e3d-4665-93c6-2d6958e28b81.png`} 
              alt="Matching universities" 
              className="w-full h-full object-contain"
            />
          </div>
        )}
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div 
            className="bg-orange-500 h-2.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-lg font-medium text-gray-600">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
