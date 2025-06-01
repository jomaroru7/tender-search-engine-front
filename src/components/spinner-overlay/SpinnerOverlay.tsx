
type SpinnerOverlayProps = {
  message?: string;
};

const SpinnerOverlay = ({ message }: SpinnerOverlayProps) => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-6"></div>
    {message && (
      <p className="text-lg text-slate-800 font-semibold text-center max-w-md">{message}</p>
    )}
  </div>
);

export default SpinnerOverlay;