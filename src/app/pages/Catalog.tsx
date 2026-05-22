import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ShoppingBag, Heart, Sparkles, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Link } from 'react-router';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewContext';
import { StarRating } from '../components/StarRating';

const testimonials = [
  {
    id: 1,
    name: 'Ana M.',
    text: 'O bolo de aniversário mais bonito e delicioso que já comi!',
    rating: 5
  },
  {
    id: 2,
    name: 'João P.',
    text: 'Qualidade excepcional e atendimento muito personalizado. Recomendo!',
    rating: 5
  },
  {
    id: 3,
    name: 'Sofia R.',
    text: 'Os cupcakes foram o sucesso da festa. Voltarei a encomendar com certeza!',
    rating: 5
  },
  {
    id: 4,
    name: 'Ricardo S.',
    text: 'Desde o primeiro contacto até à entrega, foi tudo simples e profissional. Nota-se o cuidado em cada detalhe.',
    rating: 5
  },
  {
    id: 5,
    name: 'Cláudia F.',
    text: 'Os convidados perguntaram todos onde tinha sido feito o bolo. Ficou exatamente como imaginei.',
    rating: 5
  },
  {
    id: 6,
    name: 'Inês T.',
    text: 'Precisava de algo diferente para um evento de trabalho e superou as expectativas. Muito profissional.',
    rating: 5
  },
  {
    id: 7,
    name: 'Alexandre F.',
    text: 'Os cupcakes foram um sucesso na festa. Muito saborosos e bem apresentados, só gostava que houvesse ainda mais opções de sabores.',
    rating: 4
  },
  {
    id: 8,
    name: 'Pedro A.',
    text: 'Gostei bastante da qualidade e do cuidado na apresentação. A entrega demorou um pouco mais do que o previsto, mas correu tudo bem.',
    rating: 4
  }
];

export function Catalog() {
  const [activeFilter, setActiveFilter] = useState('tudo');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { getAverageRating, getTotalReviews } = useReviews();

  const filteredProducts = activeFilter === 'tudo'
    ? products
    : products.filter(p => p.category === activeFilter);

  // Autoplay para testemunhos - muda a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Layout>
      {/* Products Section */}
      <section id="produtos" className="py-20 bg-secondary pt-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif mb-4" style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>
              As Nossas Especialidades
            </h2>
          </motion.div>

          {/* Filters */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {['tudo', 'bolos', 'cupcakes', 'personalizados'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-primary/10'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => {
              const avgRating = getAverageRating(product.id);
              const totalReviews = getTotalReviews(product.id);
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-background rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                >
                  <Link to={`/produto/${product.id}`}>
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif mb-2" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
                        {product.name}
                      </h3>
                      <p className="text-primary mb-3">{product.price}</p>
                      
                      {/* Rating */}
                      {totalReviews > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <StarRating rating={avgRating} size={16} />
                          <span className="text-sm text-foreground/60">
                            ({totalReviews})
                          </span>
                        </div>
                      )}
                      
                      <p className="text-sm text-foreground/70 line-clamp-2">{product.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1769655102909-e8dfef0835c0?w=1200&q=80"
                alt="Marixica Kitchen"
                className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif mb-6" style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>
                Da nossa cozinha para a sua mesa
              </h2>
              <p className="text-lg mb-6 text-foreground/80">
                A Marixica nasceu da paixão pelo detalhe e pelo sabor autêntico dos doces de infância.
                Cada receita é preparada com ingredientes selecionados e muito carinho, para garantir
                que cada mordida seja uma experiência única.
              </p>
              <p className="text-lg text-foreground/80">
                Acreditamos que os momentos especiais merecem doces especiais. Por isso, trabalhamos
                de forma artesanal e personalizada, criando sobremesas que contam histórias e celebram
                a vida.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="encomendas" className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif mb-4" style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>
              Como Funciona
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Heart, title: 'Escolha', desc: 'Escolha o sabor e o design que mais gosta' },
              { icon: Sparkles, title: 'Personalize', desc: 'Ajustamos cada detalhe ao seu evento' },
              { icon: ShoppingBag, title: 'Receba', desc: 'Entrega ao domicílio ou pick-up' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-serif mb-3" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem' }}>
                  {step.title}
                </h3>
                <p className="text-foreground/80">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif mb-4" style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>
              O Que Dizem os Nossos Clientes
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-secondary rounded-3xl p-12 text-center"
            >
              <div className="flex justify-center mb-4">
                <StarRating rating={testimonials[currentTestimonial].rating} />
              </div>
              <p className="text-xl mb-6 italic text-foreground/90">
                "{testimonials[currentTestimonial].text}"
              </p>
              <p className="font-serif" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
                — {testimonials[currentTestimonial].name}
              </p>
            </motion.div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:opacity-80 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:opacity-80 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contactos" className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-center mb-12" style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>
              Faça a Sua Encomenda
            </h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Nome</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="O seu nome"
                  />
                </div>
                <div>
                  <label className="block mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Data do Evento</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block mb-2">Tipo de Doce</label>
                  <select className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Bolo de Aniversário</option>
                    <option>Bento Cake</option>
                    <option>Cupcakes</option>
                    <option>Bolo de Casamento</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2">Mensagem</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Conte-nos sobre o seu evento e como podemos torná-lo especial..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                Enviar Pedido de Orçamento
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}