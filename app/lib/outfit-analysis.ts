type PlainClothingItem = {
  _id: string;
  userId: string;
  category: string;
  color: string;
  size: string;
  brand: string;
  imageUrls: string[];
  price?: string;
};

function calculateStyleScore(items: PlainClothingItem[]): number {
  return 85;
}

function calculateColorHarmony(items: PlainClothingItem[]): number {
  return 90;
}

export function performAnalysis(items: PlainClothingItem[]) {
  const styleScore = calculateStyleScore(items);
  const colorHarmonyScore = calculateColorHarmony(items);

  return {
    styleScore,
    colorHarmonyScore,
    overallScore: (styleScore + colorHarmonyScore) / 2,
  };
}

export function generateRecommendations(analysis: ReturnType<typeof performAnalysis>, items: PlainClothingItem[]) {
  const recommendations = [];

  if (analysis.styleScore < 90) {
    recommendations.push("Consider adding more variety in clothing styles");
  }

  if (analysis.colorHarmonyScore < 90) {
    recommendations.push("Try incorporating complementary colors");
  }

  if (items.length < 3) {
    recommendations.push("Add more items to create a complete outfit");
  }

  return recommendations;
} 