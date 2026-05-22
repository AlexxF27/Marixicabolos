import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function Promo() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm"
        >
          <div className="text-center mb-10">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Oferta de Boas-vindas
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
              10% de desconto na 1ª compra
            </h1>
            <p className="text-lg text-foreground/70">
              Cria uma conta na Marixica e recebe 10% de desconto na tua primeira encomenda.
            </p>
          </div>

          <div className="space-y-12">
            {/* Como funciona */}
            <div>
              <h2 className="text-2xl font-serif mb-6">
                Como funciona
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mt-0.5">1</div>
                  <div>
                    <h3 className="font-medium text-foreground text-lg">Regista-te</h3>
                    <p className="text-foreground/70">Leva menos de 1 minuto.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mt-0.5">2</div>
                  <div>
                    <h3 className="font-medium text-foreground text-lg">Escolhe os produtos e adiciona ao cesto</h3>
                    <p className="text-foreground/70">Navega pelo nosso catálogo e escolhe as tuas delícias favoritas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mt-0.5">3</div>
                  <div>
                    <h3 className="font-medium text-foreground text-lg">O desconto é aplicado automaticamente no checkout</h3>
                    <p className="text-foreground/70">Sem necessidade de códigos promocionais.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Condições */}
            <div className="bg-muted p-6 rounded-xl">
              <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Condições
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">Válido apenas na primeira compra com conta registada</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">Não acumulável com outras promoções</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">Encomendas exclusivamente no site</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/registo" 
                className="flex-1 bg-primary text-primary-foreground py-4 px-8 rounded-full font-medium text-center transition-colors hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                Criar conta
              </Link>
              <Link 
                to="/produtos" 
                className="flex-1 bg-secondary text-secondary-foreground py-4 px-8 rounded-full font-medium text-center transition-colors hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98]"
              >
                Continuar a comprar
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}