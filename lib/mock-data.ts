export const outfitAnalysis = {
  styleScore: 85,
  colorHarmony: 92,
  seasonalMatch: 78,
  versatility: 88,
  sustainabilityScore: 75,
  occasionMatch: "Business Casual",
  weatherSuitability: "All Seasons",
  estimatedCost: "$245",
  wearCount: 0,
  lastWorn: null,
  colorPalette: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C"],
  categories: {
    "T-Shirts": 1,
    "Pants": 1,
    "Jackets": 1,
    "Accessories": 0
  },
  brands: {
    "Nike": 1,
    "Zara": 1,
    "H&M": 1
  }
};

export const recommendations = [
  {
    type: "Accessory",
    suggestion: "Add a leather belt to complete the look",
    reason: "Enhances formal appeal and adds structure"
  },
  {
    type: "Color",
    suggestion: "Consider adding a pop of burgundy",
    reason: "Complements existing color palette"
  },
  {
    type: "Versatility",
    suggestion: "This outfit works for multiple occasions",
    reason: "Can be dressed up or down"
  },
  {
    type: "Style Enhancement",
    suggestion: "Try adding a watch or bracelet",
    reason: "Adds sophistication and personal touch"
  },
  {
    type: "Weather Adaptation",
    suggestion: "Consider adding a light cardigan",
    reason: "Makes the outfit suitable for cooler evenings"
  }
]; 