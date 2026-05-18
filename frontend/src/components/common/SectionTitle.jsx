export default function SectionTitle({ title, subtitle, icon }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <p className="text-white/40 text-sm">{subtitle}</p>
    </div>
  );
}