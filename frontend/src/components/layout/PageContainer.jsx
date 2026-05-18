import BackgroundEffects from "./BackgroundEffects";

export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}