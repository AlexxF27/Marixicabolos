import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showNumber?: boolean;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 20, 
  interactive = false,
  onRatingChange,
  showNumber = false
}: StarRatingProps) {
  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.floor(rating);
          const isHalf = starValue === Math.ceil(rating) && rating % 1 !== 0;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              disabled={!interactive}
              className={`relative ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            >
              {/* Estrela de fundo (vazia) */}
              <Star 
                size={size} 
                className="text-foreground/20"
                strokeWidth={1.5}
              />
              
              {/* Estrela preenchida */}
              {isFilled && (
                <Star 
                  size={size} 
                  className="absolute top-0 left-0 text-[#FFB800] fill-[#FFB800]"
                  strokeWidth={1.5}
                />
              )}
              
              {/* Meia estrela */}
              {isHalf && (
                <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${size * 0.5}px` }}>
                  <Star 
                    size={size} 
                    className="text-[#FFB800] fill-[#FFB800]"
                    strokeWidth={1.5}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {showNumber && (
        <span className="text-sm text-foreground/70 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
