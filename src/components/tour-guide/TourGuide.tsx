'use client';

import { TourProvider, useTour } from '@reactour/tour';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';
import type { StepType } from '@reactour/tour';

interface TourGuideProps {
  children?: ReactNode;
  showButton?: boolean;
  buttonPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  buttonText?: string;
  steps?: StepType[]; // Ahora recibe los steps como prop
}

function TourButton({ 
  buttonPosition = 'bottom-right', 
  buttonText = 'Ver tutorial' 
}: { 
  buttonPosition?: string; 
  buttonText?: string;
}) {
  const { setIsOpen } = useTour();

  const handleClick = () => {
    
    setIsOpen(true);
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed ${positionClasses[buttonPosition as keyof typeof positionClasses]} z-50 flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-700 transition-all hover:scale-105`}
      aria-label="Iniciar tutorial"
      title={buttonText}
    >
      <QuestionMarkCircleIcon className="w-5 h-5" />
      <span className="inline">{buttonText}</span>
    </button>
  );
}

const TourGuide = ({
  children,
  showButton = true,
  buttonPosition = 'bottom-right',
  buttonText = 'Ver tutorial',
  steps = [],
}: TourGuideProps) => {
  return (
    <TourProvider
      steps={steps}
      styles={{
        popover: (base) => ({
          ...base,
          borderRadius: 8,
          padding: 20,
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: '#2563eb',
        }),
        controls: (base) => ({
          ...base,
          marginTop: 20,
        }),
        close: (base) => ({
          ...base,
          display: 'none',
        }),
      }}
      onClickMask={({ setIsOpen }) => setIsOpen(false)}
      prevButton={({ currentStep, setCurrentStep }) => {
        return currentStep > 0 ? (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Atrás
          </button>
        ) : null;
      }}
      nextButton={({ currentStep, stepsLength, setIsOpen, setCurrentStep }) => {
        const isLast = currentStep === stepsLength - 1;
        return (
          <button
            onClick={() => {
              if (isLast) {
                setIsOpen(false);
                if (typeof window !== 'undefined') {
                  localStorage.setItem('tendersTourShown', 'true');
                }
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isLast ? 'Finalizar' : 'Siguiente'}
          </button>
        );
      }}
      showBadge={true}
      showCloseButton={false}
      scrollSmooth
    >
      {children}
      {showButton && (
        <TourButton buttonPosition={buttonPosition} buttonText={buttonText} />
      )}
    </TourProvider>
  );
};

export default TourGuide;