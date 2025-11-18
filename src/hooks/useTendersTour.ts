import { useState, useCallback } from 'react';
import type { TourStep } from '../components/tour-guide/TourGuide';
import type { CallBackProps } from 'react-joyride';

export const useTendersTour = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: TourStep[] = [
    {
      target: '.tour-step-budget',
      content: 'Introduce la mayor facturación anual de tu empresa en los últimos tres años. Este dato nos ayudará a filtrar licitaciones acordes al tamaño de tu empresa.',
      disableBeacon: true,
      placement: 'auto',
    },
    {
      target: '.tour-step-location',
      content: 'Indica la provincia o ámbito geográfico donde tu empresa presta servicios. Esto nos permite mostrarte licitaciones relevantes en tu zona. NOTA: Aunque tu empresa preste servicios a nivel nacional, es importante que indiques una ubicación para optimizar los resultados de búsqueda.',
      placement: 'auto',
    },
    {
      target: '.tour-step-exact-place',
      content: 'Activa esta opción si quieres buscar únicamente licitaciones en la ubicación exacta que indicaste, sin incluir zonas cercanas.',
      placement: 'bottom',
    },
    {
      target: '.tour-step-cpv',
      content: 'Este campo es opcional. Selecciona los códigos CPV que correspondan a la actividad de tu empresa. ⚠️ IMPORTANTE: Esta búsqueda es exclusiva, solo mostrará licitaciones que contengan estos códigos.',
      placement: 'auto',
    },
    {
      target: '.tour-step-description',
      content: 'Describe brevemente la actividad de tu empresa. Este es el campo más importante, ya que permite al sistema identificar licitaciones realmente relevantes para ti.',
      placement: 'auto',
    },
    {
      target: '.tour-step-submit',
      content: '¡Ya estás listo! Haz clic aquí para buscar licitaciones que se ajusten al perfil de tu empresa.',
      placement: 'auto',
    },
  ];

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, action, index, type } = data;

    // Update stepIndex based on the actual index from joyride
    if (type === 'step:after') {
      setStepIndex(index + (action === 'next' ? 1 : action === 'prev' ? -1 : 0));
    }

    if (status === 'finished' || status === 'skipped') {
      setRun(false);
      setStepIndex(0);
    }
  }, []);

  const startTour = useCallback(() => {
    setStepIndex(0);
    setRun(true);
  }, []);

  const stopTour = useCallback(() => {
    setRun(false);
    setStepIndex(0);
  }, []);

  return {
    run,
    steps,
    stepIndex,
    startTour,
    stopTour,
    handleJoyrideCallback,
  };
};