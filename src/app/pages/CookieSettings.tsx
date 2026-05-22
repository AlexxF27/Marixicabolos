import { motion } from 'motion/react';
import { ArrowLeft, Cookie, Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import { Layout } from '../components/Layout';
import { useCookies, CookiePreferences } from '../context/CookieContext';
import { useState } from 'react';

interface CookieCategory {
  id: keyof CookiePreferences;
  title: string;
  description: string;
  examples: string[];
  required?: boolean;
}

const categories: CookieCategory[] = [
  {
    id: 'essential',
    title: 'Cookies Essenciais',
    description: 'Necessários para o funcionamento básico do site. Estes cookies não podem ser desativados pois garantem funcionalidades críticas como autenticação, segurança e gestão do carrinho de compras.',
    examples: ['Autenticação de utilizador', 'Carrinho de compras', 'Segurança e prevenção de fraude', 'Preferências de sessão'],
    required: true,
  },
  {
    id: 'performance',
    title: 'Cookies de Desempenho',
    description: 'Permitem-nos analisar como os visitantes utilizam o site, ajudando-nos a melhorar a sua experiência através de análises de tráfego e comportamento. Todos os dados são agregados e anónimos.',
    examples: ['Google Analytics', 'Métricas de velocidade de carregamento', 'Análise de padrões de navegação', 'Otimização de desempenho'],
  },
  {
    id: 'functional',
    title: 'Cookies Funcionais',
    description: 'Guardam as suas preferências e escolhas para proporcionar uma experiência mais personalizada e conveniente. Lembram-se das suas definições entre visitas.',
    examples: ['Idioma preferido', 'Região/localização', 'Preferências de visualização', 'Histórico de produtos visualizados'],
  },
  {
    id: 'marketing',
    title: 'Cookies de Marketing',
    description: 'Utilizados para apresentar anúncios relevantes e campanhas promocionais personalizadas com base nos seus interesses e histórico de navegação. Ajudam-nos a medir a eficácia das nossas campanhas.',
    examples: ['Publicidade personalizada', 'Retargeting', 'Análise de conversão de campanhas', 'Integração com redes sociais'],
  },
];

export function CookieSettings() {
  const { preferences, savePreferences } = useCookies();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleToggle = (id: keyof CookiePreferences) => {
    if (id === 'essential') return;
    setLocalPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    savePreferences(localPreferences);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      performance: true,
      functional: true,
      marketing: true,
    };
    setLocalPreferences(allAccepted);
    savePreferences(allAccepted);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleRejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      performance: false,
      functional: false,
      marketing: false,
    };
    setLocalPreferences(onlyEssential);
    savePreferences(onlyEssential);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/perfil"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Perfil
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Cookie className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl">
                  Definições de Cookies
                </h1>
                <p className="text-foreground/60 mt-1">
                  Gerencie as suas preferências de privacidade
                </p>
              </div>
            </div>
          </motion.div>

          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center gap-3 text-primary"
            >
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">Preferências guardadas com sucesso!</p>
            </motion.div>
          )}

          <div className="bg-secondary/30 border border-border rounded-2xl p-6 md:p-8 mb-6">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência, analisar o tráfego do site
              e personalizar conteúdos. Escolha abaixo quais os tipos de cookies que deseja permitir.
            </p>
            <p className="text-sm text-foreground/60">
              Os cookies essenciais estão sempre ativos pois são necessários para o funcionamento básico do site.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border rounded-2xl bg-background overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl">{category.title}</h3>
                        {category.required && (
                          <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                            Sempre Ativo
                          </span>
                        )}
                      </div>
                      <p className="text-foreground/70 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle(category.id)}
                      disabled={category.required}
                      className={`flex-shrink-0 w-16 h-9 rounded-full transition-all duration-200 ${
                        localPreferences[category.id]
                          ? 'bg-primary'
                          : 'bg-border'
                      } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`}
                    >
                      <motion.div
                        animate={{
                          x: localPreferences[category.id] ? 28 : 2,
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className={`w-7 h-7 rounded-full mt-1 flex items-center justify-center ${
                          localPreferences[category.id]
                            ? 'bg-primary-foreground'
                            : 'bg-background'
                        }`}
                      >
                        {localPreferences[category.id] && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </motion.div>
                    </button>
                  </div>

                  <div className="bg-secondary/30 rounded-xl p-4">
                    <p className="text-sm font-medium text-foreground/80 mb-2">Exemplos de utilização:</p>
                    <ul className="space-y-1.5">
                      {category.examples.map((example, index) => (
                        <li key={index} className="text-sm text-foreground/60 flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-background border-t border-border pt-6 pb-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRejectAll}
              className="flex-1 py-3 px-6 rounded-full border border-border hover:bg-secondary/50 transition-colors font-medium"
            >
              Rejeitar Todos
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-3 px-6 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors font-medium"
            >
              Aceitar Todos
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
            >
              <Check className="w-4 h-4" />
              Guardar Preferências
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
