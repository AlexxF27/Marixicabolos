import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect } from 'react';

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsModal({ open, onOpenChange }: TermsModalProps) {
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
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                    Termos e Condições
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
                  <h3 className="text-lg font-bold mb-2">1. Âmbito de Aplicação</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Estes Termos e Condições regulam o uso do site e as compras realizadas na Marixica. Ao efetuar uma encomenda, concorda com os presentes termos.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">2. Encomendas</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    As encomendas devem ser feitas com um mínimo de 48 horas de antecedência. Reservamo-nos o direito de cancelar encomendas por falta de disponibilidade, sendo o valor devolvido.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">3. Preços e Pagamentos</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Os preços incluem IVA à taxa legal em vigor. Os pagamentos podem ser efetuados via MB WAY, Cartão de Crédito ou Apple Pay. A encomenda só é validada após confirmação do pagamento.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">4. Entregas e Levantamentos</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    As entregas ao domicílio têm um custo associado que será calculado no checkout. Caso o cliente não se encontre no local à hora acordada, a encomenda regressa à loja e não haverá lugar a reembolso.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">5. Cancelamentos</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Cancelamentos devem ser comunicados com pelo menos 48h de antecedência para um reembolso total. Cancelamentos feitos com menos de 48h não dão direito a reembolso.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-2">6. Alergénios</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Os nossos produtos são confecionados num ambiente onde se manipulam glúten, ovos, leite, frutos de casca rija, entre outros. Não podemos garantir a ausência total de vestígios destes alergénios.
                  </p>
                </section>
              </div>

              <div className="p-6 border-t border-border bg-secondary/30 flex justify-end items-center">
                <button
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground py-2.5 px-6 rounded-full hover:opacity-90 transition-opacity"
                >
                  <CheckCircle className="w-4 h-4" /> Aceitar e Fechar
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
