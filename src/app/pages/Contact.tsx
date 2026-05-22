import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { ChevronDown, MapPin, Clock, MessageSquare, ArrowRight, Instagram } from 'lucide-react';
import { Layout } from '../components/Layout';

const faqs = [
  {
    question: "Com quanto tempo de antecedência preciso de encomendar?",
    answer: "Para produtos standard do catálogo, recomendamos pelo menos 48 horas de antecedência. Para bolos personalizados, celebrações ou encomendas maiores, recomendamos 5 a 7 dias. Em datas especiais (Natal, Páscoa, Dia da Mãe) recomendamos com 2 a 3 semanas."
  },
  {
    question: "Como funciona a personalização de bolos?",
    answer: "Na página do produto, clica em 'Personalizar'. Podes escolher sabor, tamanho, decoração e mensagem. Após a encomenda, entraremos em contacto em até 24 horas para confirmar todos os detalhes e garantir que o bolo fica exatamente ao teu gosto."
  },
  {
    question: "Fazem entregas? Em que zonas e qual o custo?",
    answer: "Sim! Fazemos entregas na zona da Grande Porto (Porto, Gaia, Matosinhos, Maia e arredores). A taxa de entrega é de 5€, calculada automaticamente no checkout. Podes também optar por levantamento gratuito no nosso atelier em Porto."
  },
  {
    question: "Quais são os métodos de pagamento aceites?",
    answer: "Aceitamos MBWay, Multibanco (referência) e Cartão de Crédito/Débito (Visa e Mastercard). O pagamento é feito online no momento do checkout. A encomenda é confirmada após o pagamento ou sinal de 50%."
  },
  {
    question: "Em quanto tempo respondem às minhas mensagens?",
    answer: "Respondemos em até 24 horas úteis. Normalmente respondemos mais rapidamente — tens sempre acompanhamento do início ao fim da tua encomenda."
  },
  {
    question: "Têm opções para alergénios ou restrições alimentares?",
    answer: "Podemos adaptar algumas receitas para opções sem glúten ou sem lactose. No entanto, a nossa cozinha manipula farinhas e frutos secos, pelo que não podemos garantir ausência total de contaminação cruzada. Indica sempre as tuas restrições na encomenda."
  },
  {
    question: "Posso alterar ou cancelar a minha encomenda?",
    answer: "Podes solicitar alterações com pelo menos 48 horas de antecedência relativamente à data de entrega/levantamento. Para cancelamentos, contacta-nos o mais rápido possível — as condições dependem da fase de produção em que a encomenda se encontra."
  },
  {
    question: "Fazem bolos para eventos e festas?",
    answer: "Sim! Temos experiência em bolos para festas de aniversário, batizados, casamentos, eventos corporativos e outras celebrações. Para encomendas maiores ou eventos especiais, contacta-nos para um orçamento personalizado."
  }
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

export function Contact() {
  useEffect(() => {
    document.title = "Contactos — Marixica | Bolos Artesanais Porto";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta("description", "Contacta a Marixica para encomendas, dúvidas sobre personalização, entrega no Porto e Grande Porto. Respondemos em até 24 horas. Bolos caseiros artesanais.");
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background pt-12 pb-14 md:pt-20 md:pb-20 border-b border-border/40">
        <div className="container mx-auto px-5 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-primary text-xs uppercase tracking-widest font-semibold mb-3">Estamos aqui para ajudar</p>
            <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Fala connosco
            </h1>
            <p className="text-foreground/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Tens uma dúvida, queres fazer uma encomenda especial ou precisas de ajuda? Contacta-nos — respondemos em até 24 horas.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            <div className="flex items-start gap-3 p-5 bg-secondary/30 rounded-2xl border border-border/40">
              <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-1">Atelier</p>
                <a href="https://maps.google.com/?q=R.+Manuel+Pinto+de+Azevedo+748,+4100-320+Porto" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:text-primary transition-colors leading-relaxed">R. Manuel Pinto de Azevedo 748, Porto</a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5 bg-secondary/30 rounded-2xl border border-border/40">
              <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-1">Resposta</p>
                <p className="text-sm text-foreground">Em até <strong>24 horas</strong></p>
                <p className="text-xs text-foreground/60 mt-0.5">Seg–Sáb, 9h–19h</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5 bg-secondary/30 rounded-2xl border border-border/40">
              <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Instagram className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-1">Instagram</p>
                <a
                  href="https://www.instagram.com/marixica.bolos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  @marixica.bolos
                </a>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/enviar-mensagem"
              className="w-full sm:w-auto bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Enviar mensagem
            </Link>
            <Link
              to="/produtos"
              className="w-full sm:w-auto bg-transparent border-2 border-primary text-primary px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
            >
              Ver produtos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl">
          <div className="text-center mb-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-xs uppercase tracking-widest font-semibold mb-2"
            >
              Dúvidas frequentes
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-2xl md:text-4xl text-foreground mb-3"
            >
              Perguntas frequentes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-foreground/60 text-sm md:text-base"
            >
              Sobre encomendas, prazos, personalização, entrega e pagamento.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-background rounded-3xl p-5 md:p-8 shadow-sm border border-border"
          >
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-foreground/60 text-sm mb-3">Não encontraste a resposta?</p>
            <Link
              to="/enviar-mensagem"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Enviar mensagem
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
