import { FeatureCard } from "./FeatureCard";

const features = [
  {
    title: "Smart Organization",
    description:
      "Categorize and track your clothing with ease using AI-powered recognition",
    icon: "🎯",
  },
  {
    title: "Outfit Planning",
    description:
      "Get personalized outfit suggestions based on weather and occasions",
    icon: "✨",
  },
  {
    title: "Style Analytics",
    description: "Understand your style preferences and optimize your wardrobe",
    icon: "📊",
  },
];

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto my-16 px-4">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  );
}
