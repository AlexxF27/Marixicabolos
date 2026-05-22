import { createContext, useContext, useState, ReactNode } from 'react';

export interface Review {
  id: number;
  productId: number;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean; // Se a pessoa realmente comprou
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getProductReviews: (productId: number) => Review[];
  getAverageRating: (productId: number) => number;
  getTotalReviews: (productId: number) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

// Avaliações iniciais de exemplo
const initialReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: 'Ana Silva',
    userEmail: 'ana@example.com',
    rating: 5,
    comment: 'Simplesmente divinal! O bolo estava perfeito, húmido e com um sabor incrível. Todos os convidados adoraram. A Marixica conseguiu captar exatamente o que eu queria.',
    date: '2026-04-10',
    verified: true
  },
  {
    id: 2,
    productId: 1,
    userName: 'Carlos Mendes',
    userEmail: 'carlos@example.com',
    rating: 5,
    comment: 'Encomendei para o aniversário da minha filha e foi um sucesso total! A qualidade é extraordinária e o atendimento impecável. Recomendo vivamente!',
    date: '2026-04-05',
    verified: true
  },
  {
    id: 3,
    productId: 1,
    userName: 'Joana Costa',
    userEmail: 'joana@example.com',
    rating: 4,
    comment: 'Muito bom! Só não dou 5 estrelas porque gostaria que tivesse um pouco mais de recheio. De resto, está perfeito e muito bonito.',
    date: '2026-03-28',
    verified: true
  },
  {
    id: 4,
    productId: 2,
    userName: 'Ricardo Santos',
    userEmail: 'ricardo@example.com',
    rating: 5,
    comment: 'Os cupcakes estavam maravilhosos! A apresentação é impecável e o sabor ainda melhor. Já encomendei várias vezes e nunca decepciona.',
    date: '2026-04-12',
    verified: true
  },
  {
    id: 5,
    productId: 2,
    userName: 'Marta Ferreira',
    userEmail: 'marta@example.com',
    rating: 5,
    comment: 'Perfeitos! Levei para o escritório e foram um sucesso. Toda a gente me pediu o contacto da pastelaria. Qualidade premium!',
    date: '2026-04-08',
    verified: true
  },
  {
    id: 6,
    productId: 3,
    userName: 'Sofia Rodrigues',
    userEmail: 'sofia@example.com',
    rating: 5,
    comment: 'A tarte de morango é absolutamente deliciosa! O equilíbrio entre o doce e o ácido está perfeito. É o meu favorito da Marixica.',
    date: '2026-04-14',
    verified: true
  },
  {
    id: 7,
    productId: 4,
    userName: 'Miguel Alves',
    userEmail: 'miguel@example.com',
    rating: 5,
    comment: 'Os macarons são incríveis! Textura perfeita, crocante por fora e macio por dentro. Os sabores são autênticos e deliciosos.',
    date: '2026-04-11',
    verified: true
  },
  {
    id: 8,
    productId: 4,
    userName: 'Beatriz Lima',
    userEmail: 'beatriz@example.com',
    rating: 4,
    comment: 'Muito bons! São dos melhores macarons que já provei em Portugal. Só achei o preço um pouco elevado, mas a qualidade justifica.',
    date: '2026-04-06',
    verified: true
  }
];

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: reviews.length + 1,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newReview, ...reviews]);
  };

  const getProductReviews = (productId: number) => {
    return reviews
      .filter(review => review.productId === productId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getAverageRating = (productId: number) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / productReviews.length) * 10) / 10;
  };

  const getTotalReviews = (productId: number) => {
    return getProductReviews(productId).length;
  };

  return (
    <ReviewContext.Provider value={{ 
      reviews, 
      addReview, 
      getProductReviews, 
      getAverageRating,
      getTotalReviews 
    }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
}
