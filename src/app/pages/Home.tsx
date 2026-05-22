import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import {
  Truck,
  MousePointerClick,
  PenTool,
  CheckCircle2,
  ChevronDown,
  Instagram,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Layout } from '../components/Layout';
import { products } from '../data/products';
import { StarRating } from '../components/StarRating';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import img1 from "../../imports/image.png";
import img2 from "../../imports/image-1.png";
import img3 from "../../imports/image-2.png";
import img4 from "../../imports/image-3.png";
import img5 from "../../imports/image-4.png";
import img6 from "../../imports/image-5.png";

const faqs = [
  {
    question: "Com quanto tempo de antecedência devo encomendar?",
    answer: "Para bolos personalizados e encomendas maiores, recomendamos um mínimo de 5 a 7 dias de antecedência. Para produtos standard do nosso catálogo, 48 horas costumam ser suficientes, mas estão sempre sujeitos à nossa disponibilidade diária. Para datas especiais como Natal ou Páscoa, recomendamos encomendar com 2 a 3 semanas de antecedência."
  },
  {
    question: "Fazem entregas ao domicílio? Em que zonas?",
    answer: "Sim! Fazemos entregas na zona da Grande Porto (Porto, Matosinhos, Gaia, Maia, entre outros). A taxa de entrega é de 5€ e é calculada no checkout. Também pode optar por levantar a sua encomenda gratuitamente no nosso atelier em Porto."
  },
  {
    question: "Como funcionam os bolos personalizados?",
    answer: "Os nossos bolos personalizados são feitos de raiz conforme as suas preferências — escolhe o sabor, o tamanho, as cores e a decoração. Depois de fazer a encomenda online, entraremos em contacto em até 24 horas para confirmar todos os detalhes e acertar os pormenores."
  },
  {
    question: "Como funcionam os tamanhos e número de fatias?",
    answer: "Os nossos bolos variam entre 15cm (aprox. 12-15 fatias), 20cm (aprox. 20-25 fatias) e tamanhos superiores para eventos. Temos também o formato Bento Cake, ideal para 2-4 pessoas. Basta indicar o número de convidados e ajudamos a escolher o tamanho certo."
  },
  {
    question: "Têm opções para restrições alimentares (alergénios)?",
    answer: "Sim, podemos adaptar algumas receitas para opções sem glúten ou sem lactose. No entanto, alertamos que o nosso espaço manipula farinhas e frutos secos, pelo que não podemos garantir a ausência total de vestígios por contaminação cruzada. Indique sempre as suas restrições no momento da encomenda."
  },
  {
    question: "Quais são os métodos de pagamento aceites?",
    answer: "Aceitamos MBWay, Multibanco (referência) e Cartão de Crédito/Débito (Visa e Mastercard). A encomenda só é confirmada após o pagamento de um sinal de 50% (ou pagamento integral no momento do checkout)."
  }
];

const galleryImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h4 className="font-serif text-base md:text-lg text-foreground pr-8 group-hover:text-primary transition-colors">{question}</h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-primary"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-foreground/80 leading-relaxed text-sm md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Home() {
  const bestSellers = products.slice(0, 4);

  useEffect(() => {
    document.title = "Marixica — Bolos Caseiros e Personalizados no Porto";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", "Bolos caseiros e personalizados no Porto e Grande Porto. Bolos de aniversário artesanais feitos à mão por encomenda. Entrega ao domicílio ou levantamento em Porto.");
    setMeta("keywords", "bolos caseiros Porto, bolos personalizados Porto, bolos de aniversário Porto, pastelaria artesanal Porto, Grande Porto");
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[92vh] md:min-h-[88vh] flex items-center justify-center pt-12 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1761637604780-3b6a5721f00b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY2VsZWJyYXRpb24lMjBjYWtlJTIwYXJ0aXNhbmFsJTIwYmFrZXJ5fGVufDF8fHx8MTc3NjQyMTc1MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Bolo artesanal elegante feito à mão na Marixica, Porto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent h-32" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.25)_45%,transparent_75%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-5 text-center flex flex-col items-center mt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto space-y-5 bg-black/12 backdrop-blur-sm p-7 md:p-12 rounded-3xl border border-white/10"
          >
            {/* SEO-rich subtitle above main heading */}
            <p className="text-primary/90 text-sm md:text-base uppercase tracking-widest font-semibold drop-shadow-md">
              Bolos artesanais · Porto e Grande Porto
            </p>

            <h1
              className="text-white font-serif leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}
            >
              Bolos caseiros e personalizados para o seu momento especial
            </h1>

            <p className="text-white/95 text-sm md:text-base leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
              Feitos à mão com ingredientes selecionados. Para aniversários, festas e eventos especiais em Porto e Grande Porto.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/produtos"
                className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-transparent flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Encomendar agora
              </Link>
              <Link
                to="/produtos"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-white/20 transition-all shadow-lg flex items-center justify-center"
              >
                Ver catálogo
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-4 text-white"
            >
              <div className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary/90" />
                <span className="text-xs font-medium drop-shadow-md">Bolos 100% personalizados</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Truck className="w-3.5 h-3.5 text-primary/90" />
                <span className="text-xs font-medium drop-shadow-md">Entrega no Grande Porto</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Clock className="w-3.5 h-3.5 text-primary/90" />
                <span className="text-xs font-medium drop-shadow-md">Resposta em 24h</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mais Vendidos Section */}
      <section id="produtos" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-3">
            <div>
              <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">Os favoritos dos nossos clientes</p>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground">Bolos Mais Vendidos</h2>
            </div>
            <Link to="/produtos" className="text-primary font-medium hover:underline flex items-center gap-1 text-sm">
              Ver todos os produtos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col"
              >
                <Link to={`/produto/${product.id}`} className="flex flex-col h-full bg-secondary/30 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border/50 hover:-translate-y-1">
                  <div className="relative h-44 md:h-56 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={`${product.name} — bolo artesanal Marixica Porto`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.customizable && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-primary/90 text-primary-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          Personalizável
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <h3 className="font-serif text-base md:text-lg mb-1.5 text-foreground group-hover:text-primary transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-foreground/60 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="font-semibold text-primary text-sm md:text-base">
                        {product.price}
                      </p>
                      <span className="text-primary/70 text-xs underline underline-offset-2">Ver mais</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm text-sm md:text-base"
            >
              Ver todos os bolos e produtos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Como Encomendar Section */}
      <section id="como-encomendar" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-5 md:px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">Simples e rápido</p>
            <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-3">Como encomendar o seu bolo</h2>
            <p className="text-foreground/70 text-sm md:text-base max-w-xl mx-auto">Um processo simples, sem complicações. Recebe o seu bolo artesanal em casa ou levanta no Porto.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-border z-0" />

            {[
              {
                icon: MousePointerClick,
                title: '1. Escolhe o teu bolo',
                desc: 'Explora o catálogo com bolos de aniversário, cupcakes, bento cakes e muito mais. Filtra por categoria, preço ou ocasião.'
              },
              {
                icon: PenTool,
                title: '2. Personaliza ao teu gosto',
                desc: 'Escolhe o sabor, tamanho, decoração e a mensagem personalizada. Os nossos bolos adaptam-se a qualquer ocasião.'
              },
              {
                icon: CheckCircle2,
                title: '3. Recebe ou levanta',
                desc: 'Pagamento seguro online, entrega no Grande Porto (5€) ou levantamento gratuito no nosso atelier em Porto.'
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center bg-background p-7 md:p-8 rounded-3xl shadow-sm border border-border"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-5">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg md:text-xl mb-2">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-sm md:text-base">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              Encomendar agora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Prova Social Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-5 md:px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">Avaliações reais</p>
            <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-3">O que dizem os nossos clientes</h2>
            <p className="text-foreground/70 text-sm md:text-base">A maior recompensa do nosso trabalho é a satisfação de quem nos escolhe.</p>
          </div>

          <ReviewsCarousel />
        </div>
      </section>

      {/* Sobre Nós Resumo Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-border">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1570692408135-37cfdf2a83d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlciUyMHdvcmtpbmclMjBraXRjaGVuJTIwY2FrZXxlbnwxfHx8fDE3NzY3NzQ1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Marixica — cozinha artesanal, produção de bolos caseiros no Porto"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full md:w-1/2 space-y-5"
            >
              <p className="text-primary text-xs uppercase tracking-widest font-semibold">A nossa história</p>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground">Feito com amor, <br/>fatiado com alegria.</h2>
              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                A Marixica nasceu da paixão de Maria e Francisca por transformar ingredientes simples em memórias inesquecíveis. Na nossa cozinha artesanal no Porto, cada bolo é preparado à mão com receitas de família e um toque de modernidade.
              </p>
              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                Acreditamos que os melhores momentos da vida merecem ser celebrados com sabor genuíno. É por isso que cada encomenda é tratada com dedicação total.
              </p>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: 'Bolos artesanais', desc: 'Produção 100% caseira' },
                  { label: 'Entrega no Porto', desc: 'E Grande Porto' },
                  { label: 'Resposta em 24h', desc: 'Sempre disponíveis' },
                  { label: 'Personalização total', desc: 'À sua medida' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-foreground/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/sobre"
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm text-sm md:text-base"
                >
                  Conhecer a nossa história
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">Dúvidas frequentes</p>
            <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-3">Perguntas Frequentes</h2>
            <p className="text-foreground/70 text-sm md:text-base">Tudo o que precisa de saber sobre encomendas, prazos, personalização e entrega.</p>
          </div>

          <div className="bg-background rounded-3xl p-5 md:p-8 shadow-sm border border-border">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-foreground/60 text-sm mb-3">Não encontrou a sua resposta?</p>
            <Link
              to="/contactos"
              className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-2.5 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
            >
              Falar connosco
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Galeria Instagram Section */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">Inspira-te</p>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground">Siga-nos no Instagram</h2>
              <p className="text-foreground/70 text-sm md:text-base mt-1">Novidades, bolos e criações artesanais todos os dias.</p>
            </div>
            <a
              href="https://www.instagram.com/marixica.bolos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              <Instagram className="w-5 h-5" />
              @marixica.bolos
            </a>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {galleryImages.map((src, idx) => (
              <motion.a
                href="https://www.instagram.com/marixica.bolos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw="
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="relative group aspect-square rounded-xl md:rounded-2xl overflow-hidden cursor-pointer block"
              >
                <img
                  src={src}
                  alt={`Bolo artesanal Marixica Porto — galeria Instagram ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 md:w-8 md:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.instagram.com/marixica.bolos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              Seguir no Instagram
            </a>
          </div>
        </div>
      </section>

    </Layout>
  );
}
