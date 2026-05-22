import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, Image as ImageIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router';

export function Cart() {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart, getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                  O Seu Cesto
                </h2>
                <p className="text-sm text-foreground/60">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full hover:bg-foreground/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-foreground/30" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">O seu cesto está vazio</h3>
                  <p className="text-foreground/60 mb-6">Adicione produtos para começar a sua encomenda</p>
                  <button
                    onClick={closeCart}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Continuar a Explorar
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${JSON.stringify(item.customization)}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-secondary rounded-2xl p-4 flex gap-4"
                    >
                      {/* Product Image */}
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                      />

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif mb-1 text-lg leading-tight">
                          {item.product.name}
                        </h3>
                        <p className="text-primary text-sm mb-2">{item.product.price}</p>

                        {/* Customization Info */}
                        {item.customization && (
                          <div className="text-xs text-foreground/60 mb-2 space-y-0.5">
                            {item.customization.base && <p>Base: {item.customization.base}</p>}
                            {item.customization.flavor && <p>Sabor: {item.customization.flavor}</p>}
                            {item.customization.size && <p>Tamanho: {item.customization.size}</p>}
                            {item.customization.referenceImage && (
                              <div className="flex items-center gap-1 text-primary mt-1">
                                <ImageIcon className="w-3 h-3" />
                                <span>Com imagem de referência</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-background rounded-full px-3 py-1.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.customization)}
                              className="w-6 h-6 rounded-full hover:bg-foreground/10 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.customization)}
                              className="w-6 h-6 rounded-full hover:bg-foreground/10 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.customization)}
                            className="w-8 h-8 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors text-destructive ml-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="bg-secondary rounded-xl p-4">
                  <p className="text-sm text-foreground/60 mb-2">
                    <strong>Nota:</strong> Os preços finais serão confirmados após análise da sua encomenda.
                  </p>
                  <p className="text-xs text-foreground/50">
                    Entraremos em contacto para confirmar todos os detalhes e valores.
                  </p>
                </div>

                {isAuthenticated ? (
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Finalizar Encomenda
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeCart}
                    className="w-full bg-secondary text-foreground py-4 rounded-full hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 font-medium border border-border"
                  >
                    <ShoppingBag className="w-5 h-5 text-foreground/60" />
                    Iniciar sessão para finalizar
                  </Link>
                )}

                <button
                  onClick={closeCart}
                  className="w-full text-center text-foreground/60 hover:text-foreground transition-colors"
                >
                  Continuar a Explorar
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}