import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowLeft, ShoppingBag, Palette, Cake, Heart, Sparkles, MessageSquare, Upload, X, Image as ImageIcon, User } from 'lucide-react';
import { Layout } from '../components/Layout';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CustomizationOptions } from '../context/CartContext';

export function CustomizeProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, openUpsell } = useCart();
  const { isAuthenticated } = useAuth();

  const [customization, setCustomization] = useState<CustomizationOptions>({
    base: '',
    flavor: '',
    filling: '',
    frosting: '',
    size: '',
    message: '',
    extras: [],
    eventDate: '',
    eventTime: ''
  });

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-serif text-4xl mb-4">Produto não encontrado</h1>
          <Link to="/" className="text-primary hover:underline">
            Voltar à página inicial
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, customization);
    openUpsell(product);
  };

  const handleCheckoutDirect = () => {
    addToCart(product, customization);
    navigate('/checkout');
  };

  const toggleExtra = (extra: string) => {
    setCustomization(prev => ({
      ...prev,
      extras: prev.extras?.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...(prev.extras || []), extra]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de ficheiro
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas ficheiros de imagem.');
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    // Converter para Data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomization(prev => ({
        ...prev,
        referenceImage: reader.result as string,
        referenceImageName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setCustomization(prev => ({
      ...prev,
      referenceImage: undefined,
      referenceImageName: undefined
    }));
  };

  const baseOptions = ['Pão de Ló', 'Red Velvet', 'Chocolate', 'Baunilha', 'Cenoura'];
  const flavorOptions = ['Chocolate', 'Baunilha', 'Morango', 'Limão', 'Café', 'Coco'];
  const fillingOptions = ['Doce de Leite', 'Chocolate', 'Creme de Pasteleiro', 'Frutas Vermelhas', 'Chantilly', 'Nutella'];
  const frostingOptions = ['Buttercream', 'Fondant', 'Chantilly', 'Ganache de Chocolate', 'Cream Cheese'];
  const sizeOptions = ['Pequeno (8-10 pessoas)', 'Médio (15-20 pessoas)', 'Grande (25-30 pessoas)'];
  const extrasOptions = ['Flores Comestíveis', 'Frutas Frescas', 'Macarons', 'Topo Personalizado', 'Vela de Aniversário'];

  return (
    <Layout>
      <div className="min-h-screen relative">
        {/* Background Image com Overlay */}
        <div className="fixed inset-0 z-0">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 container mx-auto px-6 py-12">
          <Link 
            to={`/produto/${product.id}`}
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-all hover:gap-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Produto
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Cabeçalho */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <Palette className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 
                className="font-serif mb-4" 
                style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', lineHeight: '1.1' }}
              >
                Personalize o Seu {product.name}
              </h1>
              <p className="text-xl text-foreground/70">
                Crie o bolo perfeito escolhendo cada detalhe ao seu gosto.
              </p>
            </motion.div>

            {/* Formulário de Personalização */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background rounded-3xl p-8 md:p-12 shadow-2xl space-y-8"
            >
              {/* Tipo de Base */}
              <div>
                <label className="block mb-4 flex items-center gap-2">
                  <Cake className="w-5 h-5 text-primary" />
                  <span className="text-lg font-serif">Tipo de Base *</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {baseOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCustomization({ ...customization, base: option })}
                      className={`py-4 px-5 rounded-xl border-2 transition-all text-center ${
                        customization.base === option
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sabor Principal */}
              <div>
                <label className="block mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-lg font-serif">Sabor Principal *</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {flavorOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCustomization({ ...customization, flavor: option })}
                      className={`py-4 px-5 rounded-xl border-2 transition-all text-center ${
                        customization.flavor === option
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recheio */}
              <div>
                <label className="block mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-lg font-serif">Recheio *</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {fillingOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCustomization({ ...customization, filling: option })}
                      className={`py-4 px-5 rounded-xl border-2 transition-all text-center ${
                        customization.filling === option
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cobertura */}
              <div>
                <label className="block mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <span className="text-lg font-serif">Tipo de Cobertura *</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  {frostingOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCustomization({ ...customization, frosting: option })}
                      className={`py-4 px-5 rounded-xl border-2 transition-all text-center ${
                        customization.frosting === option
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tamanho */}
              <div>
                <label className="block mb-4 flex items-center gap-2">
                  <Cake className="w-5 h-5 text-primary" />
                  <span className="text-lg font-serif">Tamanho *</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sizeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCustomization({ ...customization, size: option })}
                      className={`py-4 px-5 rounded-xl border-2 transition-all text-center ${
                        customization.size === option
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div>
                <label className="block mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-lg font-serif">Extras (opcional)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {extrasOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleExtra(option)}
                      className={`py-4 px-5 rounded-xl border-2 transition-all text-center ${
                        customization.extras?.includes(option)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data e Hora do Evento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-4 flex items-center gap-2">
                    <span className="text-lg font-serif">Data do Evento *</span>
                  </label>
                  <input
                    type="date"
                    value={customization.eventDate || ''}
                    min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // +48h
                    onChange={(e) => setCustomization({ ...customization, eventDate: e.target.value })}
                    className="w-full px-5 py-4 bg-secondary rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <p className="text-xs text-primary mt-2 flex items-center gap-1">
                    * Encomendas com mínimo de 48h de antecedência.
                  </p>
                </div>
                <div>
                  <label className="block mb-4 flex items-center gap-2">
                    <span className="text-lg font-serif">Hora de Recolha/Entrega *</span>
                  </label>
                  <input
                    type="time"
                    value={customization.eventTime || ''}
                    onChange={(e) => setCustomization({ ...customization, eventTime: e.target.value })}
                    className="w-full px-5 py-4 bg-secondary rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Mensagem Personalizada */}
              <div>
                <label className="block mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="text-lg font-serif">Mensagem no Bolo (Max 50 carateres)</span>
                  </div>
                  <span className="text-sm text-foreground/50">{(customization.message || '').length}/50</span>
                </label>
                <textarea
                  value={customization.message}
                  maxLength={50}
                  onChange={(e) => setCustomization({ ...customization, message: e.target.value })}
                  rows={2}
                  className="w-full px-5 py-4 bg-secondary rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
                  placeholder="Feliz Aniversário Maria!"
                />
              </div>

              {/* Imagem de Referência */}
              <div>
                <label className="block mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <span className="text-lg font-serif">Imagem de Referência (opcional)</span>
                </label>
                <p className="text-sm text-foreground/60 mb-4">
                  Faça upload de uma foto do design desejado, inspiração de bolo, ou qualquer referência visual para ajudar-nos a criar o bolo perfeito.
                </p>

                {!customization.referenceImage ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="referenceImage"
                    />
                    <label
                      htmlFor="referenceImage"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-all bg-secondary/30"
                    >
                      <Upload className="w-12 h-12 text-primary mb-3" />
                      <p className="text-foreground/70 mb-1">Clique para fazer upload</p>
                      <p className="text-sm text-foreground/50">PNG, JPG até 5MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border-2 border-primary bg-secondary/30">
                    <img
                      src={customization.referenceImage}
                      alt="Imagem de referência"
                      className="w-full h-64 object-contain bg-secondary"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <label
                        htmlFor="referenceImage"
                        className="bg-background/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full cursor-pointer hover:bg-background transition-all text-sm flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Substituir
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="referenceImage"
                      />
                      <button
                        onClick={removeImage}
                        className="bg-background/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full hover:bg-background transition-all text-sm flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Remover
                      </button>
                    </div>
                    <div className="p-4 bg-background/80 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <ImageIcon className="w-4 h-4 text-primary" />
                        <span>{customization.referenceImageName}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resumo */}
              {(customization.base || customization.flavor || customization.filling) && (
                <div className="bg-secondary rounded-xl p-6 border-l-4 border-primary">
                  <h3 className="font-serif mb-3 text-lg">
                    Resumo da Personalização
                  </h3>
                  <div className="space-y-2 text-sm">
                    {customization.base && <p><strong>Base:</strong> {customization.base}</p>}
                    {customization.flavor && <p><strong>Sabor:</strong> {customization.flavor}</p>}
                    {customization.filling && <p><strong>Recheio:</strong> {customization.filling}</p>}
                    {customization.frosting && <p><strong>Cobertura:</strong> {customization.frosting}</p>}
                    {customization.size && <p><strong>Tamanho:</strong> {customization.size}</p>}
                    {customization.eventDate && <p><strong>Data do Evento:</strong> {customization.eventDate}</p>}
                    {customization.eventTime && <p><strong>Hora:</strong> {customization.eventTime}</p>}
                    {customization.extras && customization.extras.length > 0 && (
                      <p><strong>Extras:</strong> {customization.extras.join(', ')}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!customization.base || !customization.flavor || !customization.filling || !customization.frosting || !customization.size || !customization.eventDate || !customization.eventTime}
                  className="flex-1 bg-background text-primary border-2 border-primary py-4 rounded-full hover:bg-primary/5 transition-colors font-medium text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Adicionar ao Cesto
                </button>
                {isAuthenticated ? (
                  <button
                    onClick={handleCheckoutDirect}
                    disabled={!customization.base || !customization.flavor || !customization.filling || !customization.frosting || !customization.size || !customization.eventDate || !customization.eventTime}
                    className="flex-1 bg-primary text-primary-foreground py-4 rounded-full hover:opacity-90 transition-opacity font-medium text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Heart className="w-5 h-5" />
                    Finalizar Encomenda
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="flex-1 bg-secondary text-foreground py-4 rounded-full hover:bg-secondary/80 transition-colors font-medium text-lg flex items-center justify-center gap-2 border border-border"
                  >
                    <User className="w-5 h-5 text-foreground/60" />
                    Iniciar sessão para finalizar
                  </button>
                )}
              </div>
              <div className="text-center pt-2">
                <Link
                  to={`/produto/${product.id}`}
                  className="text-foreground/60 hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Cancelar Personalização
                </Link>
              </div>

              <p className="text-sm text-center text-foreground/60">
                * Campos obrigatórios. O valor final será confirmado após análise da sua personalização.
              </p>
            </motion.div>

            {/* Espaço reservado para eventuais adições futuras, se necessário */}
          </div>
        </div>
      </div>
    </Layout>
  );
}