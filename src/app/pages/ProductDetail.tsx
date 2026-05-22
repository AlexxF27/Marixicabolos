import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ShoppingBag, ArrowLeft, Check, Plus, Minus, Sparkles, MessageSquarePlus, Cake, Ruler, CalendarHeart } from 'lucide-react';
import { Layout } from '../components/Layout';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewContext';
import { StarRating } from '../components/StarRating';
import { ReviewCard } from '../components/ReviewCard';
import { ReviewForm } from '../components/ReviewForm';
import { useState, useEffect } from 'react';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, openUpsell } = useCart();
  const { getProductReviews, getAverageRating, getTotalReviews, addReview } = useReviews();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Marixica, Bolos Artesanais Porto`;
      const setMeta = (name: string, content: string) => {
        let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!el) {
          el = document.createElement('meta');
          el.name = name;
          document.head.appendChild(el);
        }
        el.content = content;
      };
      setMeta("description", `${product.description} Encomende online com entrega no Porto e Grande Porto. Marixica — bolos caseiros e personalizados.`);
    }
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-serif text-4xl mb-4">Produto não encontrado</h1>
          <Link to="/produtos" className="text-primary hover:underline">
            Ver todos os produtos
          </Link>
        </div>
      </Layout>
    );
  }

  const productReviews = getProductReviews(product.id);
  const averageRating = getAverageRating(product.id);
  const totalReviews = getTotalReviews(product.id);

  const handleReviewSubmit = (data: { rating: number; comment: string; userName: string; userEmail: string }) => {
    addReview({
      productId: product.id,
      rating: data.rating,
      comment: data.comment,
      userName: data.userName,
      userEmail: data.userEmail,
      verified: false
    });
    setShowReviewForm(false);
    setTimeout(() => {
      document.getElementById('avaliacoes')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={`${product.name} — bolo artesanal Marixica Porto`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-background" />

          <div className="relative container mx-auto px-5 md:px-6 h-full flex flex-col justify-between py-5 md:py-8">
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit hover:bg-black/30"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Produtos
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pb-4 md:pb-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-background/20 backdrop-blur-sm text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
                  {product.category}
                </span>
                {product.customizable && (
                  <span className="bg-primary/90 text-primary-foreground text-xs uppercase tracking-wide px-3 py-1 rounded-full font-semibold">
                    Personalizável
                  </span>
                )}
              </div>
              <h1
                className="font-serif text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', lineHeight: '1.1' }}
              >
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-white text-xl md:text-2xl font-semibold drop-shadow-md">{product.price}</p>
                {totalReviews > 0 && (
                  <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <StarRating rating={averageRating} size={14} showNumber={false} />
                    <span className="text-white text-xs font-medium">{averageRating.toFixed(1)} ({totalReviews})</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Produto Content */}
        <div className="container mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">

            {/* Left: Descrição + CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-2xl md:text-3xl mb-4 text-foreground">Sobre este produto</h2>
                <p className="text-foreground/80 leading-relaxed text-sm md:text-base mb-3">
                  {product.description}
                </p>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {product.details}
                </p>
              </div>

              {/* Product Attributes */}
              <div className="grid grid-cols-1 gap-3">
                {product.flavors && product.flavors.length > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-2xl border border-border/40">
                    <Cake className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-1">Sabores disponíveis</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.flavors.map((flavor, i) => (
                          <span key={i} className="text-xs bg-background border border-border px-2.5 py-1 rounded-full text-foreground/80">
                            {flavor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-2xl border border-border/40">
                    <Ruler className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-1">Tamanhos (nº de fatias)</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((size, i) => (
                          <span key={i} className="text-xs bg-background border border-border px-2.5 py-1 rounded-full text-foreground/80">
                            {size} pessoas
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {product.occasions && product.occasions.length > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-2xl border border-border/40">
                    <CalendarHeart className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-1">Ideal para</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.occasions.map((occasion, i) => (
                          <span key={i} className="text-xs bg-background border border-border px-2.5 py-1 rounded-full text-foreground/80">
                            {occasion}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA (Desktop) */}
              <div className="hidden md:block">
                {product.customizable ? (
                  <div className="space-y-3">
                    <Link
                      to={`/personalizar/${product.id}`}
                      className="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all text-base font-semibold shadow-sm"
                    >
                      <Sparkles className="w-5 h-5" />
                      Personalizar este bolo
                    </Link>
                    <p className="text-xs text-foreground/60 text-center">
                      Escolhe sabor, tamanho, decoração e mensagem personalizada.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                      <div className="flex items-center bg-background border-2 border-border rounded-2xl p-1.5 h-14 shadow-sm">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-secondary text-foreground transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-secondary text-foreground transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => { addToCart(product, undefined, quantity); openUpsell(product); }}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-2xl hover:bg-primary/90 transition-all text-base font-semibold shadow-sm"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Adicionar ao Cesto
                      </button>
                    </div>
                    <p className="text-xs text-foreground/60 text-center">
                      Mínimo 48h de antecedência. Levantamento gratuito ou entrega no Grande Porto (5€).
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Ingredientes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-secondary/40 rounded-3xl p-7 md:p-10 md:sticky md:top-24">
                <h3 className="font-serif text-xl md:text-2xl mb-5 text-foreground">Ingredientes</h3>
                <ul className="space-y-3">
                  {product.ingredients.map((ingredient, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.07 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground/80 text-sm leading-relaxed">{ingredient}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-7 pt-6 border-t border-foreground/10">
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    <strong>Nota:</strong> Todos os produtos são feitos artesanalmente com ingredientes frescos. Podem conter alergénios como glúten, lactose e frutos secos.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sticky CTA — Mobile Only */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-foreground/60">Preço</span>
              <span className="font-semibold text-primary text-sm">{product.price}</span>
            </div>
            <div className="flex-1">
              {product.customizable ? (
                <Link
                  to={`/personalizar/${product.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Personalizar e Encomendar
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-secondary/50 border border-border rounded-xl p-0.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background text-foreground transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background text-foreground transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => { addToCart(product, undefined, quantity); openUpsell(product); }}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Adicionar ao Cesto
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Avaliações */}
        <div id="avaliacoes" className="bg-secondary/20 py-14 md:py-20">
          <div className="container mx-auto px-5 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-serif text-2xl md:text-4xl mb-3 text-foreground">
                  Avaliações dos Clientes
                </h2>
                {totalReviews > 0 ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-serif">{averageRating.toFixed(1)}</span>
                      <div>
                        <StarRating rating={averageRating} size={22} showNumber={false} />
                        <p className="text-foreground/60 text-sm mt-1">
                          {totalReviews} {totalReviews === 1 ? 'avaliação' : 'avaliações'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-foreground/60 text-sm">Seja o primeiro a avaliar este produto</p>
                )}
              </div>

              <div className="flex justify-center mb-10">
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-2xl hover:bg-primary/90 transition-all text-sm font-semibold shadow-sm"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  Escrever Avaliação
                </button>
              </div>

              {productReviews.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {productReviews.map((review, index) => (
                    <ReviewCard key={review.id} review={review} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <ReviewForm
            productId={product.id}
            productName={product.name}
            onSubmit={handleReviewSubmit}
            onClose={() => setShowReviewForm(false)}
          />
        )}

        {/* CTA Final */}
        <div className="bg-secondary/40 py-14 md:py-20 mb-16 md:mb-0">
          <div className="container mx-auto px-5 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-2xl md:text-4xl mb-4 text-foreground">
                Pronto para encomendar?
              </h2>
              <p className="text-foreground/70 text-sm md:text-base mb-8 leading-relaxed">
                Entrega no Porto e Grande Porto. Levantamento gratuito no atelier. Respondemos em até 24 horas.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {product.customizable ? (
                  <Link
                    to={`/personalizar/${product.id}`}
                    className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl hover:bg-primary/90 transition-all inline-flex items-center gap-2 font-semibold text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    Personalizar
                  </Link>
                ) : (
                  <button
                    onClick={() => { addToCart(product, undefined, quantity); openUpsell(product); }}
                    className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl hover:bg-primary/90 transition-all inline-flex items-center gap-2 font-semibold text-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Adicionar ao Cesto
                  </button>
                )}
                <Link
                  to="/produtos"
                  className="border border-foreground/30 text-foreground px-8 py-3.5 rounded-2xl hover:bg-foreground hover:text-background transition-all text-sm font-medium"
                >
                  Ver Mais Produtos
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
