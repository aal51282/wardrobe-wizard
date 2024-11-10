import { FeatureCard } from "./FeatureCard";
import styles from "../../../app/Page.module.css";

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
    <div className={styles.featureGrid}>
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
