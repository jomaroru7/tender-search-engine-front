import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TourGuide from "./TourGuide";
import type { TourStep } from "./TourGuide";

// Mock react-joyride
vi.mock("react-joyride", () => ({
  default: ({ steps, run, stepIndex, callback }: any) => {
    if (!run) return null;
    return (
      <div data-testid="joyride-mock">
        <div data-testid="joyride-step">{steps[stepIndex]?.content}</div>
        <button onClick={() => callback?.({ action: 'next', index: stepIndex, type: 'step:after' })}>
          Next
        </button>
        <button onClick={() => callback?.({ action: 'prev', index: stepIndex, type: 'step:after' })}>
          Back
        </button>
      </div>
    );
  },
}));

describe("TourGuide", () => {
  const mockSteps: TourStep[] = [
    {
      target: ".step-1",
      content: "Primer paso del tutorial",
      placement: "bottom",
    },
    {
      target: ".step-2",
      content: "Segundo paso del tutorial",
      placement: "top",
    },
    {
      target: ".step-3",
      content: "Tercer paso del tutorial",
    },
  ];

  it("renders Joyride when run is true", () => {
    render(<TourGuide steps={mockSteps} run={true} showButton={false} />);
    expect(screen.getByTestId("joyride-mock")).toBeInTheDocument();
  });

  it("does not render Joyride when run is false", () => {
    render(<TourGuide steps={mockSteps} run={false} showButton={false} />);
    expect(screen.queryByTestId("joyride-mock")).not.toBeInTheDocument();
  });

  it("renders start button when showButton is true", () => {
    render(
      <TourGuide 
        steps={mockSteps} 
        run={false} 
        showButton={true}
        onStartTour={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /iniciar tutorial/i })).toBeInTheDocument();
  });

  it("does not render start button when showButton is false", () => {
    render(<TourGuide steps={mockSteps} run={false} showButton={false} />);
    expect(screen.queryByRole("button", { name: /iniciar tutorial/i })).not.toBeInTheDocument();
  });

  it("calls onStartTour when start button is clicked", () => {
    const mockOnStartTour = vi.fn();
    render(
      <TourGuide 
        steps={mockSteps} 
        run={false} 
        showButton={true}
        onStartTour={mockOnStartTour}
      />
    );
    
    const startButton = screen.getByRole("button", { name: /iniciar tutorial/i });
    fireEvent.click(startButton);
    expect(mockOnStartTour).toHaveBeenCalledTimes(1);
  });

  it("renders custom button text", () => {
    render(
      <TourGuide 
        steps={mockSteps} 
        run={false} 
        showButton={true}
        onStartTour={vi.fn()}
        buttonText="Ayuda"
      />
    );
    expect(screen.getByText("Ayuda")).toBeInTheDocument();
  });

  it("applies correct position classes for bottom-right", () => {
    render(
      <TourGuide 
        steps={mockSteps} 
        run={false} 
        showButton={true}
        onStartTour={vi.fn()}
        buttonPosition="bottom-right"
      />
    );
    const button = screen.getByRole("button", { name: /iniciar tutorial/i });
    expect(button).toHaveClass("bottom-4", "right-4");
  });

  it("applies correct position classes for top-left", () => {
    render(
      <TourGuide 
        steps={mockSteps} 
        run={false} 
        showButton={true}
        onStartTour={vi.fn()}
        buttonPosition="top-left"
      />
    );
    const button = screen.getByRole("button", { name: /iniciar tutorial/i });
    expect(button).toHaveClass("top-4", "left-4");
  });

  it("displays current step content", () => {
    render(<TourGuide steps={mockSteps} run={true} stepIndex={0} showButton={false} />);
    expect(screen.getByText("Primer paso del tutorial")).toBeInTheDocument();
  });

  it("calls onCallback when navigating", () => {
    const mockCallback = vi.fn();
    render(
      <TourGuide 
        steps={mockSteps} 
        run={true} 
        stepIndex={0}
        onCallback={mockCallback}
        showButton={false}
      />
    );
    
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(mockCallback).toHaveBeenCalled();
  });

  it("renders QuestionMarkCircleIcon in button", () => {
    render(
      <TourGuide 
        steps={mockSteps} 
        run={false} 
        showButton={true}
        onStartTour={vi.fn()}
      />
    );
    const button = screen.getByRole("button", { name: /iniciar tutorial/i });
    const icon = button.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("converts TourStep to Joyride Step format", () => {
    const customSteps: TourStep[] = [
      {
        target: ".custom-target",
        content: "Custom content",
        placement: "left",
        disableBeacon: true,
      },
    ];
    
    render(<TourGuide steps={customSteps} run={true} showButton={false} />);
    expect(screen.getByTestId("joyride-mock")).toBeInTheDocument();
  });

  it("uses default placement when not specified", () => {
    const stepsWithoutPlacement: TourStep[] = [
      {
        target: ".step-1",
        content: "Step without placement",
      },
    ];
    
    render(<TourGuide steps={stepsWithoutPlacement} run={true} showButton={false} />);
    expect(screen.getByText("Step without placement")).toBeInTheDocument();
  });
});