import { IClothingItem } from "@/models/clothingItem";

interface OutfitAnalysis {
  styleScore: number;
  colorHarmony: number;
  seasonalMatch: number;
  versatility: number;
  categories: Record<string, number>;
  brands: Record<string, number>;
  occasionMatch: string;
  weatherSuitability: string;
  sustainabilityScore: number;
  estimatedCost: string;
}

interface Recommendation {
  type: string;
  suggestion: string;
  reason: string;
}

interface ColorPalette {
  primary: string[];
  neutral: string[];
  accent: string[];
}

const COLOR_PALETTES: Record<string, ColorPalette> = {
  spring: {
    primary: ['yellow', 'coral', 'peach', 'mint'],
    neutral: ['beige', 'ivory', 'light gray'],
    accent: ['light blue', 'pink', 'lavender']
  },
  summer: {
    primary: ['blue', 'purple', 'pink', 'teal'],
    neutral: ['gray', 'navy', 'white'],
    accent: ['mint', 'lavender', 'light yellow']
  },
  fall: {
    primary: ['burgundy', 'orange', 'olive', 'brown'],
    neutral: ['camel', 'cream', 'dark brown'],
    accent: ['forest green', 'rust', 'gold']
  },
  winter: {
    primary: ['black', 'white', 'red', 'navy'],
    neutral: ['charcoal', 'silver', 'dark gray'],
    accent: ['emerald', 'purple', 'royal blue']
  }
};

const OCCASION_ESSENTIALS: Record<string, string[]> = {
  formal: ['suit', 'dress shirt', 'dress', 'blazer'],
  business: ['blazer', 'slacks', 'button-up', 'pencil skirt'],
  casual: ['t-shirt', 'jeans', 'sneakers', 'sweater'],
  'smart casual': ['polo', 'chinos', 'blouse', 'cardigan']
};

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

function calculateStyleScore(_items: PlainClothingItem[]): number {
  return 85;
}

function calculateColorHarmony(_items: PlainClothingItem[]): number {
  return 90;
}

export function performAnalysis(items: PlainClothingItem[]) {
  const styleScore = calculateStyleScore(items);
  const colorHarmonyScore = calculateColorHarmony(items);

  // Calculate category distribution
  const categories = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate brand distribution
  const brands = items.reduce((acc, item) => {
    acc[item.brand] = (acc[item.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    styleScore,
    colorHarmony: colorHarmonyScore,
    seasonalMatch: 75, // You can implement actual calculation
    versatility: 80, // You can implement actual calculation
    categories,
    brands,
    occasionMatch: "Business Casual", // You can implement actual calculation
    weatherSuitability: "All Seasons", // You can implement actual calculation
    sustainabilityScore: 75, // You can implement actual calculation
    estimatedCost: "$12.50" // You can implement actual calculation
  };
}

export function generateRecommendations(analysis: ReturnType<typeof performAnalysis>, items: PlainClothingItem[]) {
  const recommendations: Recommendation[] = [];

  // Style Score Recommendations
  if (analysis.styleScore < 90) {
    recommendations.push({
      type: "Style Balance",
      suggestion: "Consider adding more variety in clothing styles",
      reason: "A diverse range of styles creates more interesting and versatile outfits"
    });
  }

  // Color Harmony Recommendations
  if (analysis.colorHarmony < 90) {
    recommendations.push({
      type: "Color Coordination",
      suggestion: "Try incorporating complementary colors",
      reason: "Complementary colors create visual interest and balance in your outfit"
    });
  }

  // Item Count Recommendations
  if (items.length < 3) {
    recommendations.push({
      type: "Outfit Completion",
      suggestion: "Add more items to create a complete outfit",
      reason: "A well-rounded outfit typically includes 3-5 pieces for better styling options"
    });
  }

  // Category Balance Recommendations
  const categoryCount = Object.keys(analysis.categories).length;
  if (categoryCount < 3) {
    recommendations.push({
      type: "Category Mix",
      suggestion: "Include items from different clothing categories",
      reason: "A balanced outfit combines various types of clothing for a complete look"
    });
  }

  // Brand Mix Recommendations
  const brandCount = Object.keys(analysis.brands).length;
  if (brandCount < 2) {
    recommendations.push({
      type: "Brand Diversity",
      suggestion: "Consider mixing different brands",
      reason: "Combining different brands can create a more personalized and unique style"
    });
  }

  // Season-specific Recommendations
  if (analysis.seasonalMatch < 80) {
    recommendations.push({
      type: "Seasonal Adaptation",
      suggestion: "Add pieces more suitable for the current season",
      reason: "Season-appropriate clothing ensures both comfort and style"
    });
  }

  // Versatility Recommendations
  if (analysis.versatility < 85) {
    recommendations.push({
      type: "Versatility Enhancement",
      suggestion: "Add versatile pieces that can be mixed and matched",
      reason: "Versatile items increase the number of possible outfit combinations"
    });
  }

  return recommendations;
} 