import type { CallBackProps, Step } from 'react-joyride';
import Joyride from 'react-joyride';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';

export interface TourStep {
  target: string;
  content: string | ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'auto';
  disableBeacon?: boolean;
}

interface TourGuideProps {
  steps: TourStep[];
  run: boolean;
  stepIndex?: number;
  onCallback?: (data: CallBackProps) => void;
  onStartTour?: () => void;
  continuous?: boolean;
  showProgress?: boolean;
  showSkipButton?: boolean;
  showButton?: boolean;
  buttonPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  buttonText?: string;
}

const TourGuide = ({
  steps,
  run,
  stepIndex = 0,
  onCallback,
  onStartTour,
  continuous = true,
  showProgress = true,
  showSkipButton = true,
  showButton = true,
  buttonPosition = 'bottom-right',
  buttonText = 'Ver tutorial',
}: TourGuideProps) => {
  const joyrideSteps: Step[] = steps.map((step) => ({
    target: step.target,
    content: step.content,
    placement: step.placement || 'bottom',
    disableBeacon: step.disableBeacon,
  }));

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <>
      <Joyride
        steps={joyrideSteps}
        run={run}
        stepIndex={stepIndex}
        continuous={continuous}
        showProgress={showProgress}
        showSkipButton={showSkipButton}
        callback={onCallback}
        scrollToFirstStep
        disableScrolling={false}
        scrollOffset={120}
        spotlightPadding={10}
        disableOverlayClose={true}
        disableCloseOnEsc={false}
        hideCloseButton={true}
        floaterProps={{
          disableAnimation: false,
        }}
        styles={{
          options: {
            primaryColor: '#2563eb',
            zIndex: 10000,
          },
          spotlight: {
            borderRadius: 8,
          },
        }}
        locale={{
          back: 'Atrás',
          close: 'Cerrar',
          last: 'Finalizar',
          next: 'Siguiente',
          nextLabelWithProgress: 'Siguiente (Paso {step} de {steps})',
          open: 'Abrir',
          skip: 'Saltar',
        }}
      />

      {showButton && onStartTour && (
        <button
          onClick={onStartTour}
          className={`fixed ${positionClasses[buttonPosition]} z-50 flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105`}
          aria-label="Iniciar tutorial"
          title={buttonText}
        >
          <QuestionMarkCircleIcon className="w-5 h-5" />
          <span className="inline">{buttonText}</span>
        </button>
      )}
    </>
  );
};

export default TourGuide;