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

export function performAnalysis(items: IClothingItem[]): OutfitAnalysis {
  // Example analysis logic
  const styleScore = calculateStyleScore(items);
  const colorHarmony = calculateColorHarmony(items);
  const seasonalMatch = calculateSeasonalMatch(items);
  const versatility = calculateVersatility(items);
  const categories = categorizeItems(items);
  const brands = countBrands(items);
  const occasionMatch = determineOccasion(categories);
  const weatherSuitability = determineWeatherSuitability(items);
  const sustainabilityScore = calculateSustainability(items);
  const estimatedCost = calculateEstimatedCost(items);

  return {
    styleScore,
    colorHarmony,
    seasonalMatch,
    versatility,
    categories,
    brands,
    occasionMatch,
    weatherSuitability,
    sustainabilityScore,
    estimatedCost,
  };
}

export function generateRecommendations(analysis: OutfitAnalysis, items: IClothingItem[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Style Score Recommendations
  if (analysis.styleScore < 80) {
    recommendations.push(...generateStyleRecommendations(items));
  }

  // Color Harmony Recommendations
  if (analysis.colorHarmony < 85) {
    recommendations.push(...generateColorRecommendations(items));
  }

  // Occasion-based Recommendations
  recommendations.push(...generateOccasionRecommendations(analysis.occasionMatch, items));

  // Weather Suitability Recommendations
  recommendations.push(...generateWeatherRecommendations(analysis.weatherSuitability, items));

  // Versatility Recommendations
  if (analysis.versatility < 70) {
    recommendations.push(...generateVersatilityRecommendations(items));
  }

  // Sustainability Recommendations
  if (analysis.sustainabilityScore < 75) {
    recommendations.push(...generateSustainabilityRecommendations(items));
  }

  return recommendations;
}

function generateStyleRecommendations(items: IClothingItem[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const categories = new Set(items.map(item => item.category.toLowerCase()));

  // Check for missing essential pieces
  if (!categories.has('accessories')) {
    recommendations.push({
      type: "Style Enhancement",
      suggestion: "Add accessories to complete the look",
      reason: "Accessories like jewelry, belts, or scarves can elevate your outfit and add personal flair."
    });
  }

  // Check for layering opportunities
  if (!categories.has('outerwear') && !categories.has('blazer')) {
    recommendations.push({
      type: "Layering",
      suggestion: "Consider adding a layering piece",
      reason: "A blazer, jacket, or cardigan can add sophistication and versatility to your outfit."
    });
  }

  return recommendations;
}

function generateColorRecommendations(items: IClothingItem[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const colors = items.map(item => item.color.toLowerCase());
  
  // Check for color balance
  const uniqueColors = new Set(colors);
  if (uniqueColors.size < 2) {
    recommendations.push({
      type: "Color Balance",
      suggestion: "Introduce a complementary color",
      reason: "Adding another color will create visual interest and depth in your outfit."
    });
  }

  // Check for seasonal color harmony
  const season = determineColorSeason(colors);
  if (season) {
    const palette = COLOR_PALETTES[season];
    recommendations.push({
      type: "Color Harmony",
      suggestion: `Consider adding items in ${palette.accent.join(' or ')}`,
      reason: `These colors complement your current ${season} palette and will enhance the overall look.`
    });
  }

  return recommendations;
}

function generateOccasionRecommendations(occasion: string, items: IClothingItem[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const currentCategories = new Set(items.map(item => item.category.toLowerCase()));
  
  const essentials = OCCASION_ESSENTIALS[occasion.toLowerCase()] || [];
  const missingEssentials = essentials.filter(item => 
    !Array.from(currentCategories).some(category => 
      category.includes(item.toLowerCase())
    )
  );

  if (missingEssentials.length > 0) {
    recommendations.push({
      type: "Occasion Appropriate",
      suggestion: `Consider adding ${missingEssentials.join(' or ')}`,
      reason: `These pieces are essential for ${occasion} attire and will make your outfit more suitable.`
    });
  }

  return recommendations;
}

function generateWeatherRecommendations(weather: string, items: IClothingItem[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const categories = new Set(items.map(item => item.category.toLowerCase()));

  switch (weather.toLowerCase()) {
    case 'sunny':
      if (!categories.has('sunglasses') && !categories.has('hat')) {
        recommendations.push({
          type: "Weather Protection",
          suggestion: "Add sun protection accessories",
          reason: "Sunglasses or a hat will protect you from the sun and complete your summer look."
        });
      }
      break;
    case 'rainy':
      if (!categories.has('outerwear') || !categories.has('waterproof')) {
        recommendations.push({
          type: "Weather Protection",
          suggestion: "Include water-resistant pieces",
          reason: "A waterproof jacket or umbrella will keep you dry and stylish in wet weather."
        });
      }
      break;
    // Add more weather conditions as needed
  }

  return recommendations;
}

function generateVersatilityRecommendations(items: IClothingItem[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const categories = new Set(items.map(item => item.category.toLowerCase()));

  // Check for basic versatile pieces
  const versatilePieces = ['blazer', 'white shirt', 'black pants', 'neutral shoes'];
  const missingVersatilePieces = versatilePieces.filter(piece => 
    !Array.from(categories).some(category => 
      category.includes(piece.toLowerCase())
    )
  );

  if (missingVersatilePieces.length > 0) {
    recommendations.push({
      type: "Versatility",
      suggestion: `Add versatile basics like ${missingVersatilePieces.join(' or ')}`,
      reason: "These pieces can be mixed and matched with multiple outfits, increasing your wardrobe versatility."
    });
  }

  return recommendations;
}

function generateSustainabilityRecommendations(items: IClothingItem[]): Recommendation[] {
  return [{
    type: "Sustainability",
    suggestion: "Consider sustainable alternatives",
    reason: "Look for pieces made from recycled materials or sustainable brands to improve your outfit's environmental impact."
  }];
}

// Helper function to determine color season
function determineColorSeason(colors: string[]): string | null {
  // Implement color season logic based on the colors in the outfit
  // This is a simplified version
  const colorLower = colors.map(c => c.toLowerCase());
  
  if (colorLower.some(c => ['yellow', 'coral', 'peach'].includes(c))) return 'spring';
  if (colorLower.some(c => ['blue', 'purple', 'pink'].includes(c))) return 'summer';
  if (colorLower.some(c => ['burgundy', 'orange', 'brown'].includes(c))) return 'fall';
  if (colorLower.some(c => ['black', 'white', 'red'].includes(c))) return 'winter';
  
  return null;
}

// Helper functions (implement your actual logic here)
export function calculateStyleScore(_items: IClothingItem[]): number {
  return 85;
}

export function calculateColorHarmony(_items: IClothingItem[]): number {
  return 90;
}

export function calculateSeasonalMatch(_items: IClothingItem[]): number {
  return 75;
}

export function calculateVersatility(_items: IClothingItem[]): number {
  return 80;
}

function categorizeItems(items: IClothingItem[]): Record<string, number> {
  const categories: Record<string, number> = {};
  items.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + 1;
  });
  return categories;
}

function countBrands(items: IClothingItem[]): Record<string, number> {
  const brands: Record<string, number> = {};
  items.forEach(item => {
    brands[item.brand] = (brands[item.brand] || 0) + 1;
  });
  return brands;
}

function determineOccasion(categories: Record<string, number>): string {
  // Placeholder logic based on categories
  if (categories['Formal']) return 'Formal';
  if (categories['Casual']) return 'Casual';
  return 'Smart Casual';
}

function determineWeatherSuitability(items: IClothingItem[]): string {
  // Placeholder logic based on item attributes
  return 'Sunny';
}

function calculateSustainability(items: IClothingItem[]): number {
  // Placeholder logic
  return 70;
}

function calculateEstimatedCost(items: IClothingItem[]): string {
  const total = items.reduce((sum, item) => sum + parseFloat(item.price || '0'), 0);
  return `$${total.toFixed(2)}`;
} 