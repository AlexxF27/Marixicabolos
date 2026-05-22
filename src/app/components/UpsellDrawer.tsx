import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, Product } from '../data/products';
import { ImageWithFallback } from './ImageWithFallback';

function UpsellProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, closeUpsell, openCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, undefined, quantity);
    // When adding an upsell product, maybe just keep the drawer open or go to cart?
    // User might want to add more, but for now let's show a brief success state or close to cart.
    // We'll close upsell and open cart.
    closeUpsell();
    setTimeout(() => openCart(), 300);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity(q => q + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 1) setQuantity(q => q - 1);
  };

  return (
    <div className="flex flex-col min-w-[240px] max-w-[240px] bg-secondary/10 rounded-2xl overflow-hidden border border-border shadow-sm shrink-0">
      <Link to={`/produto/${product.id}`} className="relative h-32 overflow-hidden bg-secondary/50 block group" onClick={closeUpsell}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.customizable && (
          <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-foreground border border-border/50 uppercase tracking-wider">
            Personalizável
          </div>
        )}
      </Link>
      
      <div className="p-3 flex flex-col flex-grow">
        <Link to={`/produto/${product.id}`} className="mb-1" onClick={closeUpsell}>
          <h4 className="font-serif text-sm font-medium leading-tight line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h4>
        </Link>
        <p className="font-semibold text-sm text-primary mb-3">
          {product.price}
        </p>

        <div className="mt-auto">
          {product.customizable ? (
            <Link
              to={`/personalizar/${product.id}`}
              onClick={closeUpsell}
              className="w-full flex items-center justify-center bg-primary text-primary-foreground py-2 rounded-xl text-xs font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              Personalizar
            </Link>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between bg-background border border-border rounded-xl p-0.5 shadow-sm">
                <button
                  onClick={handleDecrement}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary text-foreground transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center font-medium text-xs">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary text-foreground transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2 rounded-xl text-xs font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Adicionar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function UpsellDrawer() {
  const { isUpsellOpen, upsellProduct, closeUpsell, openCart } = useCart();
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    if (isUpsellOpen && upsellProduct) {
      // Find 3-5 random products that are NOT the current product to recommend
      const others = products.filter(p => p.id !== upsellProduct.id);
      const shuffled = [...others].sort(() => 0.5 - Math.random());
      setRecommendations(shuffled.slice(0, 4));
    }
  }, [isUpsellOpen, upsellProduct]);

  return (
    <AnimatePresence>
      {isUpsellOpen && upsellProduct && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeUpsell}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl border-t border-border shadow-2xl pb-4 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3 border-b border-border/50">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <ShoppingBag className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider">Adicionado ao carrinho</span>
                </div>
                <h2 className="font-serif text-lg font-medium text-foreground">
                  Quem comprou este também levou...
                </h2>
              </div>
              <button 
                onClick={closeUpsell}
                className="p-2 -mt-4 hover:bg-secondary rounded-full transition-colors self-start"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Recommended Products */}
            <div className="overflow-x-auto overflow-y-hidden pb-6 pt-4 px-5 scrollbar-hide">
              <div className="flex gap-4">
                {recommendations.map(product => (
                  <UpsellProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 border-t border-border/50 bg-secondary/10 flex gap-3">
              <button 
                onClick={closeUpsell}
                className="flex-1 py-3 px-4 bg-background border border-border rounded-xl font-medium hover:bg-secondary transition-colors text-sm"
              >
                Continuar a comprar
              </button>
              <button 
                onClick={() => {
                  closeUpsell();
                  setTimeout(() => openCart(), 300);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors text-sm shadow-sm"
              >
                Ver carrinho
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
