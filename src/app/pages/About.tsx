import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  Heart, 
  ChefHat, 
  Users, 
  MessageCircle, 
  Star
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  useEffect(() => {
    document.title = "Sobre a Marixica — Bolos Artesanais e Caseiros";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Conhece a Marixica, fundada por Maria e Francisca em janeiro de 2026. Bolos 100% caseiros, fabrico artesanal e resposta rápida em até 24 horas.");
    }
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1752652015907-a9279a9ddbac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0d28lMjB3b21lbiUyMGJha2luZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NjQyMzAwMnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Duas mulheres a preparar bolo artesanal"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for legibility (30-45% opacity) */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <h1 
              className="text-white font-serif leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
              style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}
            >
              Quem somos
            </h1>
            
            <p className="text-white text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-light">
              A Marixica nasce da união de dois nomes — Maria e Francisca — e de uma paixão comum: criar bolos 100% caseiros, feitos à mão, para momentos que merecem ser lembrados.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link 
                to="/#como-encomendar"
                className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Encomendar agora
              </Link>
              <Link 
                to="/produtos"
                className="w-full sm:w-auto bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm"
              >
                Ver produtos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECÇÃO 1 — A NOSSA HISTÓRIA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <h2 className="font-serif text-4xl lg:text-5xl text-foreground leading-tight">
                De Maria + Francisca nasceu a Marixica
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
              <div className="space-y-4 text-lg text-foreground/80 leading-relaxed font-light">
                <p>
                  A Marixica foi inaugurada em janeiro de 2026, com um objetivo simples: trazer à mesa bolos que sabem a casa.
                </p>
                <p>
                  O nosso nome vem da junção de Maria e Francisca, e representa exatamente isso: duas pessoas, uma marca e a mesma dedicação em cada encomenda.
                </p>
                <p>
                  Desde o início, apostamos no que é verdadeiro — receitas feitas com carinho, atenção ao detalhe e aquele toque artesanal que transforma uma fatia num momento especial.
                </p>
              </div>

              {/* Fundadoras Placeholders */}
              <div className="flex items-center gap-8 pt-6 mt-8 border-t border-border/60">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-serif text-2xl shadow-sm">
                    M
                  </div>
                  <div>
                    <span className="block text-foreground font-medium">Maria</span>
                    <span className="block text-xs text-foreground/60 uppercase tracking-wide">Co-Fundadora</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-serif text-2xl shadow-sm">
                    F
                  </div>
                  <div>
                    <span className="block text-foreground font-medium">Francisca</span>
                    <span className="block text-xs text-foreground/60 uppercase tracking-wide">Co-Fundadora</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="aspect-[4/5] md:aspect-video lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1765005249334-8194ce969b64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBoYW5kcyUyMGZsb3VyJTIwYXJ0aXNhbmFsfGVufDF8fHx8MTc3NjQyMjk5NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Mãos a trabalhar com farinha - processo artesanal"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECÇÃO 2 — VALORES E DIFERENCIAÇÃO (Consolidação) */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <h2 className="font-serif text-4xl lg:text-5xl text-foreground">
              Bolos artesanais, 100% caseiros
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              Produzimos e vendemos bolos com um fabrico artesanal, destacando-nos pelo sabor de casa, o cuidado com os detalhes e a proximidade com cada cliente. Queremos que te sintas seguro e acompanhado desde o primeiro contacto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Receitas caseiras",
                desc: "Sabor genuíno e ingredientes selecionados"
              },
              {
                icon: ChefHat,
                title: "Produção artesanal",
                desc: "Atenção meticulosa ao detalhe em cada encomenda"
              },
              {
                icon: Users,
                title: "Para todas as idades",
                desc: "A escolha ideal para festas, eventos ou mimos"
              },
              {
                icon: MessageCircle,
                title: "Resposta rápida",
                desc: "Acompanhamento garantido e resposta em 24 horas"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card p-8 rounded-3xl shadow-sm border border-border/50 text-center hover:shadow-md transition-all group hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/70 font-light text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECÇÃO 3 — MISSÃO */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          {/* Subtle pattern background for the mission section */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="currentColor" fillOpacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)"/>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="uppercase tracking-widest text-sm font-semibold mb-6 block opacity-80">A Nossa Missão</span>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
              "Criar bolos caseiros e artesanais que elevam qualquer ocasião — com qualidade, cuidado e um atendimento rápido e próximo."
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECÇÃO 4 — O FUTURO */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="aspect-[4/5] md:aspect-video lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1606854428501-629ffe478e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBpbmdyZWRpZW50cyUyMHJ1c3RpYyUyMHRhYmxlJTIwZG91Z2h8ZW58MXx8fHwxNzc2Nzc1NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Ingredientes dispostos numa bancada rústica - o futuro artesanal"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div className="space-y-6">
                <h2 className="font-serif text-4xl lg:text-5xl text-foreground leading-tight">
                  O futuro da Marixica
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full"></div>
                <p className="text-lg text-foreground/80 leading-relaxed font-light">
                  Hoje, o nosso foco é fazer a marca crescer e ganhar reconhecimento. O amanhã constrói-se com os mesmos ingredientes com que começámos: paixão, autenticidade e muita dedicação.
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Star className="w-24 h-24 text-primary" />
                </div>
                <h3 className="font-medium text-foreground relative z-10">Os nossos grandes objetivos:</h3>
                <ul className="space-y-5 relative z-10">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-foreground/80">Alcançar novos clientes e levar as nossas receitas a mais mesas de forma memorável.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-foreground/80">Expandir gradualmente a nossa oferta de produtos personalizados e doces sazonais.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-foreground/90 font-medium">Abrir a nossa primeira loja física para estarmos ainda mais perto de quem nos escolhe.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECÇÃO FINAL — CTA */}
      <section className="py-24 relative overflow-hidden bg-foreground text-background">
        {/* Dark overlay background for CTA */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1695052544296-63d0b132c63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc3RyYXdiZXJyeSUyMHNsaWNlJTIwY2FrZXxlbnwxfHx8fDE3NzY0MjI5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Bolo elegante de morango"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/80 to-foreground/90" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight">
              Vamos adoçar o teu próximo momento?
            </h2>
            <p className="text-xl text-background/80 font-light">
              Explora os nossos produtos ou faz já a tua encomenda. Estamos desse lado — e respondemos num prazo máximo de 24 horas.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                to="/#como-encomendar"
                className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Encomendar agora
              </Link>
              <Link 
                to="/contactos"
                className="w-full sm:w-auto bg-transparent border border-background/30 text-background px-8 py-4 rounded-full text-lg font-medium hover:bg-background/10 transition-all"
              >
                Falar connosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}