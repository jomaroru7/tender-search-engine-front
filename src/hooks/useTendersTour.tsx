import { useState, useCallback } from 'react';
import type { TourStep } from '../components/tour-guide/TourGuide';
import type { CallBackProps } from 'react-joyride';

export const useTendersTour = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: TourStep[] = [
    {
      target: '.tour-step-budget',
      content: (
        <div>
          <p className="text-base font-semibold mb-2">Mayor facturación anual</p>
          <p className="text-sm">
            Introduce la mayor facturación anual de tu empresa en los últimos tres años. 
            Este dato nos ayudará a <span className="font-bold text-blue-600">filtrar licitaciones acordes</span> al tamaño de tu empresa.
          </p>
        </div>
      ),
      disableBeacon: true,
      placement: 'auto',
    },
    {
      target: '.tour-step-location',
      content: (
        <div>
          <p className="text-base font-semibold mb-2">Ubicación geográfica</p>
          <p className="text-sm mb-2">
            Indica la provincia o ámbito geográfico donde tu empresa presta servicios.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 text-xs">
            <p className="font-semibold text-yellow-800">📍 Nota:</p>
            <p className="text-yellow-700">
              Aunque tu empresa preste servicios a nivel nacional, es importante indicar una ubicación para optimizar los resultados.
            </p>
          </div>
        </div>
      ),
      placement: 'auto',
    },
    {
      target: '.tour-step-exact-place',
      content: (
        <div>
          <p className="text-sm">
            Activa esta opción si quieres buscar <span className="font-bold">únicamente</span> licitaciones 
            en la ubicación exacta que indicaste, sin incluir zonas cercanas.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.tour-step-cpv',
      content: (
        <div>
          <p className="text-base font-semibold mb-2">Códigos CPV</p>
          <p className="text-sm mb-2">
            Este campo es <span className="italic text-blue-500">opcional</span>. Selecciona los códigos CPV que correspondan a tu actividad.
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 p-2 text-xs">
            <p className="font-semibold text-red-800">⚠️ IMPORTANTE:</p>
            <p className="text-red-700">
              Esta búsqueda es exclusiva, solo mostrará licitaciones que contengan estos códigos.
            </p>
          </div>
        </div>
      ),
      placement: 'auto',
    },
    {
      target: '.tour-step-description',
      content: (
        <div>
          <p className="text-base font-semibold mb-2">Descripción de actividad</p>
          <p className="text-sm">
            Describe brevemente la actividad de tu empresa. 
            <span className="block mt-1 font-bold text-green-600">
              Este es el campo más importante
            </span>
            <span className="block mt-1 text-xs text-gray-600">
              Permite al sistema identificar licitaciones realmente relevantes para ti.
            </span>
          </p>
        </div>
      ),
      placement: 'auto',
    },
    {
      target: '.tour-step-submit',
      content: (
        <div className="text-center">
          <p className="text-lg font-bold mb-2"> ¡Ya estás listo!</p>
          <p className="text-sm">
            Haz clic aquí para buscar licitaciones que se ajusten al perfil de tu empresa.
          </p>
        </div>
      ),
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