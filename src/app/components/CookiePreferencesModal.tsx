import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCookies, CookiePreferences } from '../context/CookieContext';

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CookieCategory {
  id: keyof CookiePreferences;
  title: string;
  description: string;
  required?: boolean;
}

const categories: CookieCategory[] = [
  {
    id: 'essential',
    title: 'Cookies Essenciais',
    description: 'Necessários para o funcionamento básico do site, incluindo autenticação, segurança e gestão do carrinho de compras. Não podem ser desativados.',
    required: true,
  },
  {
    id: 'performance',
    title: 'Cookies de Desempenho',
    description: 'Permitem-nos analisar como os visitantes utilizam o site, ajudando-nos a melhorar a sua experiência através de análises de tráfego e comportamento.',
  },
  {
    id: 'functional',
    title: 'Cookies Funcionais',
    description: 'Guardam as suas preferências e escolhas (como idioma, região) para proporcionar uma experiência mais personalizada e conveniente.',
  },
  {
    id: 'marketing',
    title: 'Cookies de Marketing',
    description: 'Utilizados para apresentar anúncios relevantes e campanhas promocionais personalizadas com base nos seus interesses e histórico de navegação.',
  },
];

export function CookiePreferencesModal({ open, onOpenChange }: CookiePreferencesModalProps) {
  const { preferences: savedPreferences, savePreferences } = useCookies();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(savedPreferences);

  useEffect(() => {
    if (open) {
      setLocalPreferences(savedPreferences);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, savedPreferences]);

  const handleToggle = (id: keyof CookiePreferences) => {
    if (id === 'essential') return;
    setLocalPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    savePreferences(localPreferences);
    onOpenChange(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      performance: true,
      functional: true,
      marketing: true,
    };
    savePreferences(allAccepted);
    onOpenChange(false);
  };

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
              className="w-full max-w-[680px] max-h-[90vh] bg-background rounded-3xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden border border-border"
            >
              <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Cookie className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif text-2xl">
                    Preferências de Cookies
                  </h2>
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                <p className="text-foreground/70 leading-relaxed">
                  Gerencie as suas preferências de cookies abaixo. Os cookies essenciais são sempre ativos
                  pois são necessários para o funcionamento básico do site.
                </p>

                <div className="space-y-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="p-5 border border-border rounded-2xl bg-secondary/20 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg">{category.title}</h3>
                            {category.required && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                Obrigatório
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleToggle(category.id)}
                          disabled={category.required}
                          className={`flex-shrink-0 w-14 h-8 rounded-full transition-all duration-200 ${
                            localPreferences[category.id]
                              ? 'bg-primary'
                              : 'bg-border'
                          } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`}
                        >
                          <motion.div
                            animate={{
                              x: localPreferences[category.id] ? 24 : 2,
                            }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className={`w-6 h-6 rounded-full mt-1 flex items-center justify-center ${
                              localPreferences[category.id]
                                ? 'bg-primary-foreground'
                                : 'bg-background'
                            }`}
                          >
                            {localPreferences[category.id] && (
                              <Check className="w-3.5 h-3.5 text-primary" />
                            )}
                          </motion.div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-border bg-secondary/30 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 flex items-center justify-center gap-2 bg-secondary text-foreground py-3 px-6 rounded-full hover:bg-secondary/80 transition-colors font-medium"
                >
                  Aceitar Todos
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-full hover:opacity-90 transition-opacity font-medium"
                >
                  <Check className="w-4 h-4" />
                  Guardar Preferências
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
