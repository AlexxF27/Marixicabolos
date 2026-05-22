import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Send, X } from 'lucide-react';
import { StarRating } from './StarRating';

interface ReviewFormProps {
  productId: number;
  productName: string;
  onSubmit: (data: { rating: number; comment: string; userName: string; userEmail: string }) => void;
  onClose: () => void;
}

export function ReviewForm({ productId, productName, onSubmit, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    const newErrors: { [key: string]: string } = {};

    if (rating === 0) {
      newErrors.rating = 'Por favor, selecione uma classificação';
    }

    if (comment.trim().length < 10) {
      newErrors.comment = 'O comentário deve ter pelo menos 10 caracteres';
    }

    if (userName.trim().length < 2) {
      newErrors.userName = 'Por favor, insira o seu nome';
    }

    if (!userEmail.includes('@')) {
      newErrors.userEmail = 'Por favor, insira um email válido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submeter
    onSubmit({
      rating,
      comment: comment.trim(),
      userName: userName.trim(),
      userEmail: userEmail.trim()
    });

    // Limpar formulário
    setRating(0);
    setComment('');
    setUserName('');
    setUserEmail('');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 
              className="font-serif mb-2" 
              style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}
            >
              Deixe a Sua Avaliação
            </h2>
            <p className="text-foreground/70">
              Conte-nos a sua experiência com <strong>{productName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-foreground/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div>
            <label htmlFor="userName" className="block mb-2 text-foreground/80">
              Seu Nome <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                if (errors.userName) setErrors({ ...errors, userName: '' });
              }}
              placeholder="Como devemos chamá-lo?"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.userName ? 'border-red-500' : 'border-border'
              } bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="userEmail" className="block mb-2 text-foreground/80">
              Seu Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
                if (errors.userEmail) setErrors({ ...errors, userEmail: '' });
              }}
              placeholder="seu@email.com"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.userEmail ? 'border-red-500' : 'border-border'
              } bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
            />
            <p className="text-xs text-foreground/60 mt-1">
              O seu email não será publicamente visível
            </p>
            {errors.userEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block mb-3 text-foreground/80">
              Classificação <span className="text-primary">*</span>
            </label>
            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
              <StarRating
                rating={rating}
                size={32}
                interactive={true}
                onRatingChange={setRating}
              />
              {rating > 0 && (
                <span className="text-foreground/70">
                  {rating === 1 && 'Insatisfeito'}
                  {rating === 2 && 'Pouco Satisfeito'}
                  {rating === 3 && 'Satisfeito'}
                  {rating === 4 && 'Muito Satisfeito'}
                  {rating === 5 && 'Excelente!'}
                </span>
              )}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Comentário */}
          <div>
            <label htmlFor="comment" className="block mb-2 text-foreground/80">
              Seu Comentário <span className="text-primary">*</span>
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (errors.comment) setErrors({ ...errors, comment: '' });
              }}
              rows={5}
              placeholder="Conte-nos sobre a sua experiência com este produto..."
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.comment ? 'border-red-500' : 'border-border'
              } bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.comment ? (
                <p className="text-red-500 text-sm">{errors.comment}</p>
              ) : (
                <p className="text-xs text-foreground/60">
                  Mínimo de 10 caracteres
                </p>
              )}
              <p className="text-xs text-foreground/60">
                {comment.length} caracteres
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-full border-2 border-foreground/20 hover:bg-foreground/5 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground px-6 py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
            >
              <Send className="w-5 h-5" />
              Enviar Avaliação
            </button>
          </div>
        </form>

        {/* Nota de privacidade */}
        <p className="text-xs text-foreground/50 text-center mt-6">
          A sua avaliação será publicada após verificação. Valorizamos o feedback honesto dos nossos clientes.
        </p>
      </motion.div>
    </div>
  );
}
