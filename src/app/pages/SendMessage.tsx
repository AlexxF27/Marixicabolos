import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { 
  Send, 
  MapPin, 
  Clock, 
  Instagram, 
  AlertCircle,
  MessageCircle,
  ShoppingBag,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout';

const topics = [
  "Dúvidas sobre produtos",
  "Ajuda com encomenda",
  "Alterações a uma encomenda",
  "Pagamento e faturação",
  "Parcerias e eventos",
  "Outros"
];

export function SendMessage() {
  const { addMessage, isAuthenticated, currentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    subject: '',
    orderNumber: '',
    message: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = "Enviar Mensagem — Marixica";
  }, []);

  // Update form data if user data loads slightly after initial render
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || currentUser.name,
        email: prev.email || currentUser.email
      }));
    }
  }, [currentUser]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Este campo é obrigatório.';
    if (!formData.email.trim()) {
      newErrors.email = 'Este campo é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Insere um email válido.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Este campo é obrigatório. Seleciona um tema acima.';
    if (!formData.message.trim()) newErrors.message = 'Este campo é obrigatório.';
    if (!formData.consent) newErrors.consent = 'Tens de aceitar a Política de Privacidade.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Por favor, preenche os campos obrigatórios corretamente.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (isAuthenticated) {
        addMessage({
          subject: formData.subject,
          content: formData.message,
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  const handleTopicClick = (topic: string) => {
    setFormData(prev => ({ ...prev, subject: topic }));
    if (errors.subject) {
      setErrors(prev => ({ ...prev, subject: '' }));
    }
  };

  return (
    <Layout>
      {/* Top Banner Recommendation */}
      <div className="bg-secondary text-secondary-foreground py-2.5 px-4 text-center text-sm sm:text-base font-medium flex items-center justify-center gap-2 border-b border-border/50">
        <AlertCircle className="w-4 h-4 text-primary" />
        <span>
          <span className="font-semibold text-primary">Encomendas apenas no site</span> — visita a secção de produtos.
        </span>
        <Link to="/produtos" className="underline underline-offset-4 hover:text-primary transition-colors ml-1">
          Ver Produtos
        </Link>
      </div>

      {/* Hero Section / Main Title */}
      <section className="bg-background pt-16 pb-10 md:pt-20 md:pb-12 border-b border-border/50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Link to="/contactos" className="text-sm font-medium text-primary hover:underline mb-4 inline-block">
            &larr; Voltar aos contactos
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
          >
            {isSuccess ? 'Mensagem enviada!' : 'Como podemos ajudar?'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            {isSuccess 
              ? 'Obrigada pelo teu contacto. Vamos responder-te o mais rapidamente possível.'
              : 'Escolhe o tema e envia-nos uma mensagem. Respondemos num prazo máximo de 24 horas.'}
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
            
            {/* Left Column: Form / Success Message */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-background rounded-3xl p-10 md:p-14 shadow-sm border border-border text-center flex flex-col items-center justify-center min-h-[400px]"
                  >
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="font-serif text-3xl text-foreground mb-4">A tua mensagem foi enviada com sucesso!</h2>
                    <p className="text-foreground/70 text-lg mb-8 max-w-md">
                      Agradecemos o teu contacto. A nossa equipa já está a analisar o teu pedido e <strong>respondemos em até 24 horas</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                      <Link 
                        to="/produtos"
                        className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-base font-medium hover:bg-primary/90 transition-all shadow-sm inline-flex items-center justify-center gap-2"
                      >
                        Ver produtos
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({ name: '', email: '', subject: '', orderNumber: '', message: '', consent: false });
                        }}
                        className="bg-transparent border border-border text-foreground px-8 py-3.5 rounded-full text-base font-medium hover:bg-secondary transition-all"
                      >
                        Enviar outra mensagem
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Quick Contact Chips as Subject Selector */}
                    <div className="mb-8">
                      <p className="text-foreground/80 mb-4 font-medium">Tema da mensagem *</p>
                      <div className="flex flex-wrap gap-2.5">
                        {topics.map((topic) => (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => handleTopicClick(topic)}
                            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                              formData.subject === topic 
                                ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                                : errors.subject && !formData.subject
                                  ? 'bg-destructive/5 border-destructive text-destructive hover:bg-destructive/10'
                                  : 'bg-background text-foreground/80 border-border hover:border-primary/50 hover:text-primary'
                            }`}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                      {errors.subject && !formData.subject && (
                        <p className="text-destructive text-sm mt-3">{errors.subject}</p>
                      )}
                    </div>

                    {/* Form */}
                    <div className="bg-background rounded-3xl p-8 md:p-10 shadow-sm border border-border">
                      {!isAuthenticated ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <MessageCircle className="w-8 h-8" />
                          </div>
                          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Inicia sessão para enviar mensagem</h2>
                          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                            Para podermos ajudar-te de forma mais rápida e manter o teu histórico de mensagens organizado no teu perfil, precisas de ter a sessão iniciada.
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link 
                              to="/login"
                              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-base font-medium hover:bg-primary/90 transition-all shadow-sm w-full sm:w-auto text-center"
                            >
                              Iniciar sessão
                            </Link>
                            <Link 
                              to="/registar"
                              className="bg-transparent border border-border text-foreground px-8 py-3.5 rounded-full text-base font-medium hover:bg-secondary transition-all w-full sm:w-auto text-center"
                            >
                              Criar conta
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mb-8">
                            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">A tua mensagem</h2>
                            <p className="text-foreground/70">Preenche os campos abaixo.</p>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground">
                                  Nome *
                                </label>
                                <input
                                  id="name"
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => {
                                    setFormData({...formData, name: e.target.value});
                                    if(errors.name) setErrors({...errors, name: ''});
                                  }}
                                  className={`w-full px-4 py-3 rounded-xl bg-secondary/30 border ${errors.name ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} outline-none transition-all`}
                                  placeholder="O teu nome"
                                />
                                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                              </div>
                              
                              <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground">
                                  Email *
                                </label>
                                <input
                                  id="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => {
                                    setFormData({...formData, email: e.target.value});
                                    if(errors.email) setErrors({...errors, email: ''});
                                  }}
                                  className={`w-full px-4 py-3 rounded-xl bg-secondary/30 border ${errors.email ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} outline-none transition-all`}
                                  placeholder="o.teu@email.com"
                                />
                                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="orderNumber" className="text-sm font-medium text-foreground">
                                Número da encomenda <span className="text-foreground/50 font-normal">(Opcional)</span>
                              </label>
                              <input
                                id="orderNumber"
                                type="text"
                                value={formData.orderNumber}
                                onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border focus:border-primary focus:ring-primary/20 outline-none transition-all"
                                placeholder="#12345"
                              />
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="message" className="text-sm font-medium text-foreground">
                                Mensagem *
                              </label>
                              <textarea
                                id="message"
                                rows={5}
                                value={formData.message}
                                onChange={(e) => {
                                  setFormData({...formData, message: e.target.value});
                                  if(errors.message) setErrors({...errors, message: ''});
                                }}
                                className={`w-full px-4 py-3 rounded-xl bg-secondary/30 border ${errors.message ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} outline-none transition-all resize-y min-h-[120px]`}
                                placeholder="Escreve aqui a tua dúvida — se for sobre uma encomenda, inclui a data e o número."
                              />
                              {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                            </div>

                            <div className="space-y-2 pt-2">
                              <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center mt-1">
                                  <input
                                    type="checkbox"
                                    checked={formData.consent}
                                    onChange={(e) => {
                                      setFormData({...formData, consent: e.target.checked});
                                      if(errors.consent) setErrors({...errors, consent: ''});
                                    }}
                                    className="peer sr-only"
                                  />
                                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${errors.consent && !formData.consent ? 'border-destructive' : 'border-border peer-checked:bg-primary peer-checked:border-primary'}`}>
                                    {formData.consent && <svg className="w-3.5 h-3.5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                  </div>
                                </div>
                                <span className="text-sm text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                                  Li e aceito a <Link to="#" className="underline underline-offset-2 hover:text-primary">Política de Privacidade</Link>.*
                                </span>
                              </label>
                              {errors.consent && <p className="text-destructive text-sm ml-8">{errors.consent}</p>}
                            </div>

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full sm:w-auto mt-6 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-medium hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? (
                                <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              ) : (
                                <>
                                  Enviar mensagem
                                  <Send className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </form>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Column: Info & Social */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-background rounded-3xl p-8 shadow-sm border border-border">
                <h2 className="font-serif text-2xl text-foreground mb-6">Informação útil</h2>
                
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0 text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Tempo de resposta</h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">Respondemos o mais breve possível — normalmente no próprio dia, até 24 horas.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0 text-primary">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Encomendas</h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">As encomendas são feitas apenas no site. Não aceitamos pedidos por redes sociais.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0 text-primary">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Apoio ao cliente</h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">Apoio para dúvidas, alterações de última hora e acompanhamento de encomendas.</p>
                    </div>
                  </li>
                </ul>

                <hr className="my-8 border-border" />

                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    O nosso atelier
                  </h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    <a href="https://maps.google.com/?q=R.+Manuel+Pinto+de+Azevedo+748,+4100-320+Porto" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      R. Manuel Pinto de Azevedo 748,<br/>
                      4100-320 Porto
                    </a><br/>
                    <span className="text-xs opacity-80 mt-1 block">(Levantamento de encomendas apenas com marcação prévia)</span>
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                <h2 className="font-serif text-2xl text-foreground mb-2">Acompanha a Marixica</h2>
                <p className="text-sm text-foreground/70 mb-6">Novidades, bastidores e inspirações todos os dias.</p>
                
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/marixica.bolos" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary hover:-translate-y-1 transition-all shadow-sm">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 bg-primary overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-primary-foreground leading-tight">
              Pronto para adoçar o teu próximo momento?
            </h2>
            <p className="text-primary-foreground/90 text-lg md:text-xl">
              Faz a tua encomenda diretamente no site — rápido, simples e com todo o cuidado Marixica.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                to="/produtos"
                className="w-full sm:w-auto bg-background text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-white transition-all shadow-lg hover:-translate-y-0.5"
              >
                Fazer encomenda
              </Link>
              <Link 
                to="/produtos"
                className="w-full sm:w-auto bg-transparent border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary-foreground/10 transition-all"
              >
                Ver produtos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}