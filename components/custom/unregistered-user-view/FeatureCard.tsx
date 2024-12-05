interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white/60 backdrop-blur-md border border-[#f3d19e] rounded-xl transition-shadow hover:shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#a77e3e] mb-2">{title}</h3>
      <p className="text-[#b38c5a]">{description}</p>
    </div>
  );
}
