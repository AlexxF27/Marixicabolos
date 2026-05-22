import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Layout } from '../components/Layout';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { products, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ShoppingBag, Sparkles, Search, SlidersHorizontal, X, ChevronDown, ArrowRight } from 'lucide-react';

interface FilterState {
  categories: string[];
  customizable: 'todos' | 'sim' | 'nao';
  price: 'todos' | 'ate-5' | 'ate-20' | '20-50' | 'acima-50';
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  customizable: 'todos',
  price: 'todos',
};

const CATEGORIES = [
  { id: 'Bolos', label: 'Bolos' },
  { id: 'Cupcakes', label: 'Cupcakes' },
  { id: 'Cookies', label: 'Cookies' },
  { id: 'Sobremesas', label: 'Sobremesas' },
  { id: 'Doces', label: 'Doces' },
  { id: 'Eventos', label: 'Eventos' },
];

function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openUpsell } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, undefined, quantity);
    openUpsell(product);
    setQuantity(1);
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
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col h-full bg-background rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-border hover:-translate-y-0.5"
    >
      <Link to={`/produto/${product.id}`} className="flex flex-col flex-grow">
        <div className="relative h-44 md:h-48 overflow-hidden bg-secondary/30">
          <ImageWithFallback
            src={product.image}
            alt={`${product.name} — ${product.category} artesanal Marixica Porto`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.customizable && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm">
                Personalizável
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-background/90 backdrop-blur-sm text-foreground/60 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider">
              {product.category}
            </div>
          </div>
        </div>
        <div className="p-3.5 pb-2 flex flex-col flex-grow">
          <h3 className="font-serif text-sm md:text-base mb-1.5 text-foreground group-hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-foreground/60 text-xs mb-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="mt-auto">
            <p className="font-semibold text-primary text-sm">
              {product.price}
            </p>
          </div>
        </div>
      </Link>

      <div className="px-3.5 pb-3.5 flex flex-col gap-2 border-t border-border/20 pt-2.5">
        {product.customizable ? (
          <Link
            to={`/personalizar/${product.id}`}
            className="w-full flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Personalizar
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-secondary/50 border border-border rounded-xl p-0.5">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-background text-foreground transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-5 text-center font-medium text-xs">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-background text-foreground transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Adicionar
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('populares');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(15);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [tempFilters, setTempFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const applyFiltersLogic = (productData: Product[], currentFilters: FilterState, query: string, sort: string, catTab: string | null) => {
    let result = [...productData];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category tab filter
    if (catTab) {
      result = result.filter(p => p.category.toLowerCase() === catTab.toLowerCase());
    } else if (currentFilters.categories.length > 0) {
      result = result.filter(p =>
        currentFilters.categories.some(cat => p.category.toLowerCase() === cat.toLowerCase())
      );
    }

    if (currentFilters.customizable === 'sim') {
      result = result.filter(p => p.customizable);
    } else if (currentFilters.customizable === 'nao') {
      result = result.filter(p => !p.customizable);
    }

    if (currentFilters.price === 'ate-5') {
      result = result.filter(p => p.basePrice <= 5);
    } else if (currentFilters.price === 'ate-20') {
      result = result.filter(p => p.basePrice > 5 && p.basePrice <= 20);
    } else if (currentFilters.price === '20-50') {
      result = result.filter(p => p.basePrice > 20 && p.basePrice <= 50);
    } else if (currentFilters.price === 'acima-50') {
      result = result.filter(p => p.basePrice > 50);
    }

    result.sort((a, b) => {
      if (sort === 'preco-asc') return a.basePrice - b.basePrice;
      if (sort === 'preco-desc') return b.basePrice - a.basePrice;
      if (sort === 'az') return a.name.localeCompare(b.name);
      if (sort === 'novidades') return b.id - a.id;
      return 0;
    });

    return result;
  };

  const filteredProducts = useMemo(
    () => applyFiltersLogic(products, filters, searchQuery, sortBy, activeCategory),
    [filters, searchQuery, sortBy, activeCategory]
  );

  const tempFilteredProducts = useMemo(
    () => applyFiltersLogic(products, tempFilters, searchQuery, sortBy, activeCategory),
    [tempFilters, searchQuery, sortBy, activeCategory]
  );

  const activeFiltersCount =
    filters.categories.length +
    (filters.customizable !== 'todos' ? 1 : 0) +
    (filters.price !== 'todos' ? 1 : 0);

  useEffect(() => {
    setVisibleCount(15);
  }, [filters, searchQuery, sortBy, activeCategory]);

  useEffect(() => {
    document.title = "Produtos — Bolos Caseiros e Personalizados Porto | Marixica";
  }, []);

  const openPanel = () => {
    setTempFilters(filters);
    setIsPanelOpen(true);
  };

  const closePanel = () => setIsPanelOpen(false);

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setVisibleCount(15);
    closePanel();
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setTempFilters(DEFAULT_FILTERS);
    setActiveCategory(null);
    setVisibleCount(15);
  };

  const handleClearTempFilters = () => setTempFilters(DEFAULT_FILTERS);

  const removeFilterChip = (type: keyof FilterState, value?: string) => {
    const newFilters = { ...filters };
    if (type === 'categories' && value) {
      newFilters.categories = newFilters.categories.filter(c => c !== value);
    } else if (type === 'customizable') {
      newFilters.customizable = 'todos';
    } else if (type === 'price') {
      newFilters.price = 'todos';
    }
    setFilters(newFilters);
    setTempFilters(newFilters);
  };

  const renderActiveChips = () => {
    if (activeFiltersCount === 0 && !activeCategory) return null;
    return (
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {activeCategory && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
            {activeCategory}
            <button onClick={() => setActiveCategory(null)} className="hover:bg-primary/20 rounded-full p-0.5 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {filters.categories.map(cat => (
          <span key={`cat-${cat}`} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-medium">
            {cat}
            <button onClick={() => removeFilterChip('categories', cat)} className="hover:bg-border rounded-full p-0.5 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {filters.customizable !== 'todos' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-medium">
            {filters.customizable === 'sim' ? 'Personalizável' : 'Standard'}
            <button onClick={() => removeFilterChip('customizable')} className="hover:bg-border rounded-full p-0.5 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        {filters.price !== 'todos' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-medium">
            {filters.price === 'ate-5' ? 'Até 5€' :
              filters.price === 'ate-20' ? 'Até 20€' :
                filters.price === '20-50' ? '20€ - 50€' : 'Acima de 50€'}
            <button onClick={() => removeFilterChip('price')} className="hover:bg-border rounded-full p-0.5 transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
        <button
          onClick={handleClearFilters}
          className="text-xs text-red-500 hover:underline ml-1 font-medium"
        >
          Limpar tudo
        </button>
      </div>
    );
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-background pt-5 pb-1">
        <div className="container mx-auto px-5 md:px-6">
          <nav className="flex text-xs text-foreground/60 font-medium">
            <ol className="flex items-center space-x-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Início</Link></li>
              <li><span>/</span></li>
              <li className="text-foreground" aria-current="page">Produtos</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <section className="bg-background pt-4 pb-6 border-b border-border/50">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl md:text-4xl text-foreground mb-2"
          >
            Bolos Caseiros e Personalizados
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 text-xs md:text-sm mx-auto"
          >
            Porto e Grande Porto · Artesanais, feitos à mão, por encomenda
          </motion.p>
        </div>
      </section>

      {/* Category Tabs (Quick Filter) */}
      <div className="bg-background border-b border-border/40 sticky top-16 z-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === null
                  ? 'bg-foreground text-background'
                  : 'bg-secondary/50 text-foreground/70 hover:bg-secondary border border-border'
              }`}
            >
              Todos
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-foreground/70 hover:bg-secondary border border-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-5 md:py-8 bg-background min-h-[60vh]">
        <div className="container mx-auto px-5 md:px-6">

          {/* Top Bar: Search, Filter, Sort */}
          <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                placeholder="Pesquisar bolos, cupcakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-foreground/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-foreground/40 hover:text-foreground transition-colors" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openPanel}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                  activeFiltersCount > 0
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-background hover:bg-secondary/50 text-foreground'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtrar {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>

              <div className="relative flex-1 md:flex-none">
                <select
                  className="w-full md:w-auto appearance-none pl-4 pr-10 py-2.5 bg-background border border-border rounded-xl text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="populares">Mais populares</option>
                  <option value="novidades">Novidades</option>
                  <option value="preco-asc">Preço: baixo → alto</option>
                  <option value="preco-desc">Preço: alto → baixo</option>
                  <option value="az">A → Z</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {renderActiveChips()}

          {/* Results count */}
          <div className="my-4 text-xs text-foreground/50 flex justify-between items-center">
            <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'} encontrados</span>
          </div>

          {/* Product Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
          >
            <AnimatePresence>
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          {filteredProducts.length > visibleCount && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="bg-background border border-border px-8 py-3 rounded-full text-sm font-medium hover:bg-secondary/50 transition-colors shadow-sm text-foreground/80 flex items-center gap-2"
              >
                Carregar mais
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-secondary/10 rounded-3xl border border-dashed border-border/60 max-w-xl mx-auto mt-8 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-5">
                <Search className="w-7 h-7 text-foreground/40" />
              </div>
              <h3 className="font-serif text-xl mb-2 text-foreground">Nenhum produto encontrado</h3>
              <p className="text-foreground/60 text-sm mb-6 px-4 max-w-sm">
                Tenta outro termo de pesquisa ou ajusta os filtros.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleClearFilters();
                }}
                className="bg-background border-2 border-primary text-primary px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filters Drawer */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-[340px] bg-background border-l border-border shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-border/50">
                <div className="flex items-center gap-2 text-foreground">
                  <SlidersHorizontal className="w-4 h-4" />
                  <h2 className="font-serif text-lg font-medium">Filtros</h2>
                </div>
                <button onClick={closePanel} className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-7">
                {/* Category */}
                <div className="space-y-3">
                  <h3 className="font-medium text-xs text-foreground/70 uppercase tracking-wider">Categoria</h3>
                  <div className="space-y-1.5">
                    {CATEGORIES.map(cat => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group py-1">
                        <div className="relative flex items-center justify-center w-5 h-5 border border-border rounded group-hover:border-primary transition-colors flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={tempFilters.categories.includes(cat.id)}
                            onChange={(e) => {
                              const newCats = e.target.checked
                                ? [...tempFilters.categories, cat.id]
                                : tempFilters.categories.filter(c => c !== cat.id);
                              setTempFilters({ ...tempFilters, categories: newCats });
                            }}
                            className="absolute opacity-0 cursor-pointer"
                          />
                          {tempFilters.categories.includes(cat.id) && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-primary rounded-sm" />
                          )}
                        </div>
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Customizable */}
                <div className="space-y-3">
                  <h3 className="font-medium text-xs text-foreground/70 uppercase tracking-wider">Tipo</h3>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'todos', label: 'Todos' },
                      { id: 'sim', label: 'Personalizável' },
                      { id: 'nao', label: 'Standard' }
                    ].map(option => (
                      <label key={option.id} className="flex items-center gap-3 cursor-pointer group py-1">
                        <div className="relative flex items-center justify-center w-5 h-5 border border-border rounded-full group-hover:border-primary transition-colors flex-shrink-0">
                          <input
                            type="radio"
                            name="customizable"
                            value={option.id}
                            checked={tempFilters.customizable === option.id}
                            onChange={() => setTempFilters({ ...tempFilters, customizable: option.id as any })}
                            className="absolute opacity-0 cursor-pointer"
                          />
                          {tempFilters.customizable === option.id && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-primary rounded-full" />
                          )}
                        </div>
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-3">
                  <h3 className="font-medium text-xs text-foreground/70 uppercase tracking-wider">Preço</h3>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'todos', label: 'Qualquer preço' },
                      { id: 'ate-5', label: 'Até 5€' },
                      { id: 'ate-20', label: 'Até 20€' },
                      { id: '20-50', label: '20€ – 50€' },
                      { id: 'acima-50', label: 'Mais de 50€' }
                    ].map(option => (
                      <label key={option.id} className="flex items-center gap-3 cursor-pointer group py-1">
                        <div className="relative flex items-center justify-center w-5 h-5 border border-border rounded-full group-hover:border-primary transition-colors flex-shrink-0">
                          <input
                            type="radio"
                            name="price"
                            value={option.id}
                            checked={tempFilters.price === option.id}
                            onChange={() => setTempFilters({ ...tempFilters, price: option.id as any })}
                            className="absolute opacity-0 cursor-pointer"
                          />
                          {tempFilters.price === option.id && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-primary rounded-full" />
                          )}
                        </div>
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-border/50 bg-background flex gap-3">
                <button
                  onClick={handleClearTempFilters}
                  className="flex-1 py-3 px-4 border border-border rounded-xl font-medium hover:bg-secondary transition-colors text-sm"
                >
                  Limpar
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="flex-[2] bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm shadow-sm"
                >
                  Ver {tempFilteredProducts.length} {tempFilteredProducts.length === 1 ? 'produto' : 'produtos'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
