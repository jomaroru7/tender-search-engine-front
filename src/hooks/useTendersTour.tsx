import { useEffect } from 'react';
import { useTour } from '@reactour/tour';
import type { TourStep } from '../components/tour-guide/TourGuide';

export const useTendersTour = () => {
  const { setIsOpen, setSteps, setCurrentStep } = useTour();

  const steps: TourStep[] = [
    {
      selector: '.tour-step-budget',
      content: (
        <div>
          <p className="text-base font-semibold mb-2">Mayor facturación anual</p>
          <p className="text-sm">
            Introduce la mayor facturación anual de tu empresa en los últimos tres años. 
            Este dato nos ayudará a <span className="font-bold text-blue-600">filtrar licitaciones acordes</span> al tamaño de tu empresa.
          </p>
        </div>
      ),
      position: 'bottom',
    },
    {
      selector: '.tour-step-location',
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
      position: 'bottom',
    },
    {
      selector: '.tour-step-exact-place',
      content: (
        <div>
          <p className="text-sm">
            Activa esta opción si quieres buscar <span className="font-bold">únicamente</span> licitaciones 
            en la ubicación exacta que indicaste, sin incluir zonas cercanas.
          </p>
        </div>
      ),
      position: 'bottom',
    },
    {
      selector: '.tour-step-cpv',
      content: (
        <div>
          <p className="text-base font-semibold mb-2">Códigos CPV</p>
          <p className="text-sm mb-2">
            Este campo es <span className="italic">opcional</span>. Selecciona los códigos CPV que correspondan a tu actividad.
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 p-2 text-xs">
            <p className="font-semibold text-red-800">⚠️ IMPORTANTE:</p>
            <p className="text-red-700">
              Esta búsqueda es exclusiva, solo mostrará licitaciones que contengan estos códigos.
            </p>
          </div>
        </div>
      ),
      position: 'bottom',
    },
    {
      selector: '.tour-step-description',
      content: (
        <div>
          <p className="text-base font-semibold mb-2">Descripción de actividad</p>
          <p className="text-sm">
            Describe brevemente la actividad de tu empresa. 
            <span className="block mt-2 font-bold text-green-600">
              ✨ Este es el campo más importante
            </span>
            <span className="block mt-1 text-xs text-gray-600">
              Permite al sistema identificar licitaciones realmente relevantes para ti.
            </span>
          </p>
        </div>
      ),
      position: 'bottom',
    },
    {
      selector: '.tour-step-submit',
      content: (
        <div className="text-center">
          <p className="text-lg font-bold mb-2">🎉 ¡Ya estás listo!</p>
          <p className="text-sm">
            Haz clic aquí para buscar licitaciones que se ajusten al perfil de tu empresa.
          </p>
        </div>
      ),
      position: 'bottom',
    },
  ];

  useEffect(() => {
    if (setSteps) {
      setSteps(steps);
    }
  }, [setSteps]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tourShown = localStorage.getItem('tendersTourShown');
      if (!tourShown) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [setIsOpen]);

  const startTour = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  return {
    startTour,
  };
};