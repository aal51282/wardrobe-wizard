interface ClothingLayerProps {
  type: "shirt" | "pants";
  className?: string;
}

const _ClothingLayer = ({ type, className = "" }: ClothingLayerProps) => {
  return (
    <div className={`absolute ${className}`}>
      {type === "shirt" && (
        <svg
          width="100"
          height="120"
          viewBox="0 0 100 120"
          className="text-gray-200"
        >
          <path
            d="M20 20 H80 V90 C80 100 60 110 50 110 C40 110 20 100 20 90 V20"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      )}
      {type === "pants" && (
        <svg
          width="100"
          height="150"
          viewBox="0 0 100 150"
          className="text-gray-200"
        >
          <path
            d="M30 0 H70 L75 140 H55 L50 150 L45 140 H25 L30 0"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      )}
    </div>
  );
}

export function Mannequin() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="relative h-[700px] w-64">
        {/* Head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gray-200/30" />

        {/* Neck */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-6 h-8 bg-gray-200/30" />

        {/* Torso */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-32 h-48 rounded-lg bg-gray-200/30">
          {/* Shoulders */}
          <div className="absolute -top-2 left-0 w-full h-4 flex justify-between">
            <div className="w-8 h-4 bg-gray-200/30 rounded-full transform -rotate-12" />
            <div className="w-8 h-4 bg-gray-200/30 rounded-full transform rotate-12" />
          </div>
        </div>

        {/* Arms */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 flex justify-between">
          <div className="w-4 h-40 bg-gray-200/30 rounded-full transform rotate-6" />
          <div className="w-4 h-40 bg-gray-200/30 rounded-full transform -rotate-6" />
        </div>

        {/* Legs */}
        <div className="absolute top-[320px] left-1/2 -translate-x-1/2 w-32 flex justify-between">
          {/* Left Leg */}
          <div className="relative w-8">
            <div className="w-8 h-60 bg-gray-200/30 rounded-t-xl transform translate-x-1 rotate-[1deg]">
              {/* Calf */}
              <div className="absolute bottom-0 left-0 w-8 h-40 bg-gray-200/30 rounded-b-3xl" />
            </div>
          </div>
          {/* Right Leg */}
          <div className="relative w-8">
            <div className="w-8 h-60 bg-gray-200/30 rounded-t-xl transform -translate-x-1 -rotate-[1deg]">
              {/* Calf */}
              <div className="absolute bottom-0 right-0 w-8 h-40 bg-gray-200/30 rounded-b-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
