interface ClothingLayerProps {
  type: "shirt" | "pants";
  className?: string;
}

const _ClothingLayer = ({ type, className = "" }: ClothingLayerProps) => {
  // ... implementation
} 