import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, ShoppingBag, User, Mail, Phone, Calendar, MessageSquare } from 'lucide-react';
import { Layout } from '../components/Layout';
import { products } from '../data/products';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export function OrderProduct() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica de envio do formulário
    console.log('Encomenda submetida:', { product, ...formData });
    alert('Obrigado pela sua encomenda! Entraremos em contacto em breve.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

          <div className="max-w-3xl mx-auto">
            {/* Cabeçalho */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 
                className="font-serif mb-4" 
                style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', lineHeight: '1.1' }}
              >
                Encomendar {product.name}
              </h1>
              <p className="text-xl text-foreground/70">
                Preencha o formulário abaixo e entraremos em contacto consigo nas próximas 24 horas.
              </p>
            </motion.div>

            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-secondary/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label className="block mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span>Nome Completo *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="O seu nome completo"
                  />
                </div>

                {/* Email e Telefone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>Telefone</span>
                    </label>
                    <div className="w-full px-5 py-2 bg-background rounded-xl border border-border focus-within:ring-2 focus-within:ring-primary transition-all [&>div>input]:bg-transparent [&>div>input]:border-none [&>div>input]:focus:outline-none">
                      <PhoneInput
                        international
                        defaultCountry="PT"
                        value={formData.phone ? formData.phone.replace(/\s/g, '') : undefined}
                        onChange={(v) => setFormData({ ...formData, phone: v || '' })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Data da Encomenda */}
                <div>
                  <label className="block mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Data Pretendida para Entrega *</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-5 py-4 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <p className="text-sm text-foreground/60 mt-2">
                    Recomendamos encomendar com pelo menos 3 dias de antecedência.
                  </p>
                </div>

                {/* Mensagem */}
                <div>
                  <label className="block mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span>Observações e Pedidos Especiais</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-5 py-4 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
                    placeholder="Conte-nos sobre cores preferidas, sabores específicos, alergias, tamanho pretendido ou qualquer outro detalhe importante..."
                  />
                </div>

                {/* Info do Produto */}
                <div className="bg-primary/10 rounded-xl p-6 border-l-4 border-primary">
                  <h3 className="font-serif mb-2" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
                    Produto Selecionado
                  </h3>
                  <p className="text-foreground/80 mb-1">{product.name}</p>
                  <p className="text-primary font-medium">{product.price}</p>
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground py-5 rounded-full hover:opacity-90 transition-opacity font-medium text-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Confirmar Encomenda
                  </button>
                  <Link
                    to={`/produto/${product.id}`}
                    className="px-8 py-5 border border-foreground/30 rounded-full hover:bg-foreground/5 transition-all"
                  >
                    Cancelar
                  </Link>
                </div>

                <p className="text-sm text-center text-foreground/60">
                  Ao confirmar, aceita que entremos em contacto consigo para finalizar os detalhes da encomenda.
                </p>
              </form>
            </motion.div>

            {/* Informações Adicionais */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 grid md:grid-cols-3 gap-6 text-center"
            >
              <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-2">⏱️</div>
                <h4 className="font-serif mb-2">Resposta Rápida</h4>
                <p className="text-sm text-foreground/70">Respondemos em até 24h</p>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-2">✨</div>
                <h4 className="font-serif mb-2">100% Artesanal</h4>
                <p className="text-sm text-foreground/70">Feito à mão com carinho</p>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-2">🎂</div>
                <h4 className="font-serif mb-2">Personalização</h4>
                <p className="text-sm text-foreground/70">Adaptado às suas necessidades</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
