import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect } from 'react';

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenCookies: () => void;
}

export function PrivacyPolicyModal({ open, onOpenChange, onOpenCookies }: PrivacyPolicyModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-[640px] max-h-[85vh] bg-background rounded-3xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden border border-border"
            >
              <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                    Política de Privacidade
                  </h2>
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                <section>
                  <h3 className="text-lg font-bold mb-2">1. Recolha de Dados</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Recolhemos informações pessoais que nos fornece voluntariamente quando se regista, faz uma encomenda ou nos contacta. Estes dados incluem nome, email, telefone e morada de faturação/entrega.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">2. Utilização dos Dados</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Os seus dados são utilizados exclusivamente para processar encomendas, gerir a sua conta, enviar atualizações sobre o estado das compras e, caso consinta, enviar novidades e promoções.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">3. Partilha de Informações</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Não vendemos nem alugamos os seus dados a terceiros. A partilha ocorre apenas com parceiros estritamente necessários para a prestação do serviço (ex: transportadoras e plataformas de pagamento seguro).
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">4. Segurança</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Implementamos medidas técnicas e organizacionais rigorosas para proteger os seus dados pessoais contra acesso, alteração ou destruição não autorizados.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">5. Retenção de Dados</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Mantemos os seus dados apenas durante o tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">6. Os Seus Direitos</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Tem o direito de aceder, corrigir, apagar ou restringir o processamento dos seus dados pessoais a qualquer momento.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">7. Política de Cookies</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Utilizamos cookies para melhorar a sua experiência de navegação e analisar o tráfego do site. Pode gerir as suas preferências a qualquer momento.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">8. Alterações à Política</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    A Marixica reserva-se o direito de atualizar esta política. Quaisquer alterações significativas serão comunicadas através do nosso site ou por email.
                  </p>
                </section>
              </div>

              <div className="p-6 border-t border-border bg-secondary/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <button
                  onClick={() => {
                    onOpenChange(false);
                    onOpenCookies();
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2 px-4 rounded-full hover:bg-black/5"
                >
                  Definições de Cookies
                </button>
                <Link
                  to="/contactos"
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground py-2.5 px-6 rounded-full hover:opacity-90 transition-opacity"
                >
                  Contacte-nos <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
