import { motion } from 'motion/react';
import { CheckCircle, User } from 'lucide-react';
import { StarRating } from './StarRating';
import { Review } from '../context/ReviewContext';

interface ReviewCardProps {
  review: Review;
  index: number;
}

export function ReviewCard({ review, index }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-secondary rounded-2xl p-6 space-y-4"
    >
      {/* Header - Avatar e Info do Usuário */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          
          {/* Nome e Data */}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{review.userName}</p>
              {review.verified && (
                <div className="flex items-center gap-1 text-primary" title="Compra Verificada">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs">Verificado</span>
                </div>
              )}
            </div>
            <p className="text-sm text-foreground/60">{formatDate(review.date)}</p>
          </div>
        </div>
      </div>

      {/* Rating */}
      <StarRating rating={review.rating} size={18} />

      {/* Comentário */}
      <p className="text-foreground/80 leading-relaxed">{review.comment}</p>
    </motion.div>
  );
}
