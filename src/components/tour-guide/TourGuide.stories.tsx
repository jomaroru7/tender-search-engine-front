import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TourGuide from "./TourGuide";
import type { TourStep } from "./TourGuide";

const meta: Meta<typeof TourGuide> = {
  title: "Components/TourGuide",
  component: TourGuide,
  decorators: [
    (Story) => (
      <div className="p-8">
        <div className="step-1 p-4 bg-blue-100 rounded mb-4">
          Elemento 1 del tutorial
        </div>
        <div className="step-2 p-4 bg-green-100 rounded mb-4">
          Elemento 2 del tutorial
        </div>
        <div className="step-3 p-4 bg-yellow-100 rounded mb-4">
          Elemento 3 del tutorial
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TourGuide>;

const defaultSteps: TourStep[] = [
  {
    target: ".step-1",
    content: "Este es el primer paso del tutorial. Aquí aprenderás lo básico.",
    placement: "bottom",
  },
  {
    target: ".step-2",
    content: "Segundo paso: más información importante sobre esta sección.",
    placement: "top",
  },
  {
    target: ".step-3",
    content: "Último paso: ¡ya casi terminas! Haz clic en finalizar.",
    placement: "auto",
  },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    run: true,
    stepIndex: 0,
    showButton: false,
    continuous: true,
    showProgress: true,
    showSkipButton: true,
  },
};

export const WithStartButton: Story = {
  render: () => {
    const [run, setRun] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);

    return (
      <TourGuide
        steps={defaultSteps}
        run={run}
        stepIndex={stepIndex}
        showButton={true}
        buttonText="Ver tutorial"
        buttonPosition="bottom-right"
        onStartTour={() => {
          setRun(true);
          setStepIndex(0);
        }}
        onCallback={(data) => {
          const { action, index, type } = data;
          
          if (type === 'step:after') {
            setStepIndex(index + (action === 'next' ? 1 : action === 'prev' ? -1 : 0));
          } else if (type === 'tour:end') {
            setRun(false);
            setStepIndex(0);
          }
        }}
      />
    );
  },
};

export const ButtonTopLeft: Story = {
  render: () => {
    const [run, setRun] = useState(false);

    return (
      <TourGuide
        steps={defaultSteps}
        run={run}
        showButton={true}
        buttonPosition="top-left"
        buttonText="Ayuda"
        onStartTour={() => setRun(true)}
        onCallback={(data) => {
          if (data.type === 'tour:end') {
            setRun(false);
          }
        }}
      />
    );
  },
};

export const ButtonTopRight: Story = {
  render: () => {
    const [run, setRun] = useState(false);

    return (
      <TourGuide
        steps={defaultSteps}
        run={run}
        showButton={true}
        buttonPosition="top-right"
        buttonText="Tutorial"
        onStartTour={() => setRun(true)}
        onCallback={(data) => {
          if (data.type === 'tour:end') {
            setRun(false);
          }
        }}
      />
    );
  },
};

export const ButtonBottomLeft: Story = {
  render: () => {
    const [run, setRun] = useState(false);

    return (
      <TourGuide
        steps={defaultSteps}
        run={run}
        showButton={true}
        buttonPosition="bottom-left"
        onStartTour={() => setRun(true)}
        onCallback={(data) => {
          if (data.type === 'tour:end') {
            setRun(false);
          }
        }}
      />
    );
  },
};

export const CustomButtonText: Story = {
  render: () => {
    const [run, setRun] = useState(false);

    return (
      <TourGuide
        steps={defaultSteps}
        run={run}
        showButton={true}
        buttonText="¿Necesitas ayuda?"
        onStartTour={() => setRun(true)}
        onCallback={(data) => {
          if (data.type === 'tour:end') {
            setRun(false);
          }
        }}
      />
    );
  },
};

export const WithoutProgress: Story = {
  args: {
    steps: defaultSteps,
    run: true,
    stepIndex: 0,
    showButton: false,
    continuous: true,
    showProgress: false,
    showSkipButton: true,
  },
};

export const WithoutSkipButton: Story = {
  args: {
    steps: defaultSteps,
    run: true,
    stepIndex: 0,
    showButton: false,
    continuous: true,
    showProgress: true,
    showSkipButton: false,
  },
};

export const SingleStep: Story = {
  args: {
    steps: [
      {
        target: ".step-1",
        content: "Este es un tutorial de un solo paso.",
        placement: "bottom",
      },
    ],
    run: true,
    stepIndex: 0,
    showButton: false,
  },
};

export const DifferentPlacements: Story = {
  args: {
    steps: [
      {
        target: ".step-1",
        content: "Posición: bottom",
        placement: "bottom",
      },
      {
        target: ".step-2",
        content: "Posición: top",
        placement: "top",
      },
      {
        target: ".step-3",
        content: "Posición: auto (se ajusta automáticamente)",
        placement: "auto",
      },
    ],
    run: true,
    stepIndex: 0,
    showButton: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [run, setRun] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);

    const handleCallback = (data: any) => {
      const { action, index, type } = data;

      if (type === 'step:after') {
        const newIndex = index + (action === 'next' ? 1 : action === 'prev' ? -1 : 0);
        setStepIndex(newIndex);
      } else if (type === 'tour:end') {
        setRun(false);
        setStepIndex(0);
      }
    };

    return (
      <div>
        <TourGuide
          steps={defaultSteps}
          run={run}
          stepIndex={stepIndex}
          showButton={true}
          buttonText="Iniciar tutorial interactivo"
          onStartTour={() => {
            setRun(true);
            setStepIndex(0);
          }}
          onCallback={handleCallback}
        />
      </div>
    );
  },
};