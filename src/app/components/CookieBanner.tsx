import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Settings, Check, X } from 'lucide-react';
import { useCookies } from '../context/CookieContext';

interface CookieBannerProps {
  onOpenPreferences: () => void;
  onOpenPrivacy: () => void;
}

export function CookieBanner({ onOpenPreferences, onOpenPrivacy }: CookieBannerProps) {
  const { showBanner, acceptAll, rejectAll } = useCookies();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-background border border-border rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Cookie className="w-7 h-7" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="font-serif text-xl md:text-2xl">
                    A sua privacidade é importante
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                    Utilizamos cookies essenciais para o funcionamento do site e outros para melhorar a sua experiência,
                    analisar o tráfego e personalizar conteúdos. Escolha as suas preferências ou aceite todos para continuar.
                  </p>
                  <button
                    onClick={onOpenPrivacy}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Ler Política de Privacidade
                  </button>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-3">
                  <button
                    onClick={acceptAll}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
                  >
                    <Check className="w-4 h-4" />
                    Aceitar todos
                  </button>

                  <button
                    onClick={rejectAll}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-full hover:bg-secondary/80 transition-colors font-medium"
                  >
                    <X className="w-4 h-4" />
                    Rejeitar todos
                  </button>

                  <button
                    onClick={onOpenPreferences}
                    className="w-full md:w-auto flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-full hover:bg-secondary/50 transition-colors font-medium"
                  >
                    <Settings className="w-4 h-4" />
                    Personalizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
