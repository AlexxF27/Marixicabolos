import { useState } from 'react';
import { motion } from 'motion/react';
import { StarRating } from './StarRating';
import { ImageWithFallback } from './ImageWithFallback';

interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  image?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'João Silva',
    text: 'Encomendei para o batizado do meu filho e ficou lindo! Sabor incrível e apresentação impecável.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Inês Carvalho',
    text: 'O melhor bolo red velvet que já comi. A textura é perfeita e o cream cheese... divinal!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ricardo Martins',
    text: 'Atendimento 5 estrelas. Adaptaram o bolo às minhas necessidades e o resultado superou todas as expectativas.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Beatriz Sousa',
    text: 'Encomendo regularmente para a minha empresa. Os cupcakes são sempre um sucesso nas reuniões!',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Miguel Fernandes',
    text: 'O bento cake de chocolate é viciante. Perfeito para duas pessoas, com sabor autêntico.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Sara Rodrigues',
    text: 'A atenção ao detalhe é impressionante. Cada bolo é uma verdadeira obra de arte comestível.',
    rating: 4,
  },
];

export function ReviewsCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate reviews for infinite loop effect
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];
  const cardWidth = 360; // Card width in pixels
  const gap = 24; // Gap between cards in pixels
  const totalWidth = reviews.length * (cardWidth + gap);

  return (
    <div
      className="w-full overflow-hidden relative py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6"
        animate={{
          x: isPaused ? undefined : [0, -totalWidth],
        }}
        transition={{
          x: {
            duration: 45,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        }}
        style={{
          width: 'fit-content',
        }}
      >
        {duplicatedReviews.map((review, idx) => (
          <motion.div
            key={`${review.id}-${idx}`}
            className="bg-secondary/20 p-8 rounded-2xl border border-border/50 flex flex-col min-w-[360px] cursor-default"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              transition: { duration: 0.2 },
            }}
          >
            <div className="flex mb-4">
              <StarRating rating={review.rating} size={18} />
            </div>
            <p className="text-foreground/80 italic mb-6 flex-grow leading-relaxed">
              "{review.text}"
            </p>
            <div className="flex items-center gap-3 mt-auto">
              {review.image ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
                  <ImageWithFallback
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-serif font-medium">
                  {review.name.charAt(0)}
                </div>
              )}
              <span className="font-medium text-foreground">{review.name}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
