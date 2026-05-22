import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, MessageCircle, ShoppingBag, UserCircle, Menu, X, Heart, LogOut, MapPin, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useModals } from '../context/ModalContext';
import paymentMethod1 from "../../imports/image-6.png";
import paymentMethod2 from "../../imports/image-7.png";
import paymentMethod3 from "../../imports/image-8.png";
import paymentMethod4 from "../../imports/image-9.png";
import paymentMethod5 from "../../imports/image-10.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const { getTotalItems, openCart } = useCart();
  const { isAuthenticated, logout, currentUser } = useAuth();
  const { openPrivacyModal, openCookiePrefsModal, openTermsModal } = useModals();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const totalItems = getTotalItems();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Promo Banner - Hide if logged in */}
      <AnimatePresence>
        {!isAuthenticated && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-primary-foreground text-center text-sm font-medium overflow-hidden"
          >
            <div className="py-2 px-4">
              Regista-te e obtém 10% de desconto na primeira compra. <Link to="/promo-primeira-compra" className="underline underline-offset-2 hover:text-white ml-1">Saber mais</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border text-foreground transition-colors duration-300"
      >
        <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-12 py-4 relative flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Link to="/" className="font-serif text-[2.25rem] tracking-tight flex items-baseline leading-none transition-colors hover:text-primary" style={{ fontFamily: 'var(--font-serif)' }}>
              Marixica
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-12 absolute left-1/2 -translate-x-1/2 w-max">
            <Link to="/produtos" className="font-medium text-lg text-foreground hover:text-primary transition-colors">Produtos</Link>
            <Link to="/sobre" className="font-medium text-lg text-foreground hover:text-primary transition-colors">Sobre</Link>
            <Link to="/contactos" className="font-medium text-lg text-foreground hover:text-primary transition-colors">Contactos</Link>
            <Link to="/produtos" className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-opacity font-medium text-lg whitespace-nowrap">Fazer Encomenda</Link>
          </nav>

          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-foreground/10 text-foreground"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Login / Logout Link - Desktop only (subtle) */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-3 relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:ring-2 hover:ring-primary/20 text-foreground"
                  title="Conta"
                >
                  <div className="w-8 h-8 rounded-full bg-[#fce7e7] text-[#d65d5d] flex items-center justify-center font-bold text-sm border border-[#f5c6c6] overflow-hidden">
                    {currentUser?.avatar ? (
                      <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      currentUser?.name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-56 bg-background border border-border rounded-xl shadow-lg overflow-hidden flex flex-col z-50 py-1"
                    >
                      <div className="px-4 py-3 border-b border-border/50 bg-muted/20">
                        <p className="font-medium text-sm text-foreground truncate">{currentUser?.name}</p>
                        <p className="text-xs text-foreground/60 truncate">{currentUser?.email}</p>
                      </div>
                      <Link 
                        to="/perfil" 
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors flex items-center gap-2 text-foreground"
                      >
                        <UserCircle className="w-4 h-4" />
                        A minha conta
                      </Link>
                      <Link 
                        to="/perfil?tab=mensagens"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors flex items-center justify-between text-foreground w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Mensagens
                        </div>
                        {currentUser?.messages && currentUser.messages.filter(m => m.status === 'Respondida').length > 0 && (
                          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {currentUser.messages.filter(m => m.status === 'Respondida').length}
                          </span>
                        )}
                      </Link>
                      <button 
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logout();
                        }}
                        className="px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors flex items-center gap-2 text-destructive w-full text-left border-t border-border/50"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-foreground/10 text-foreground/60 hover:text-foreground"
                title="Entrar"
              >
                <UserCircle className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-foreground/10 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-background text-foreground"
            >
              <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/produtos" className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium text-lg text-center mb-2">Fazer Encomenda</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/produtos" className="text-lg py-2 border-b border-border/50">Produtos</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/sobre" className="text-lg py-2 border-b border-border/50">Sobre</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/contactos" className="text-lg py-2 border-b border-border/50">Contactos</Link>
                {isAuthenticated ? (
                  <>
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/perfil" className="text-lg py-2 border-b border-border/50 flex items-center gap-3 w-full text-left">
                      <div className="w-8 h-8 rounded-full bg-[#fce7e7] text-[#d65d5d] flex items-center justify-center font-bold text-sm border border-[#f5c6c6] overflow-hidden">
                        {currentUser?.avatar ? (
                          <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          currentUser?.name?.charAt(0).toUpperCase() || 'U'
                        )}
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="font-medium text-base">{currentUser?.name}</span>
                        <span className="text-xs text-foreground/60">Ver perfil</span>
                      </div>
                    </Link>
                    <Link 
                      to="/perfil?tab=mensagens"
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="text-lg py-2 border-b border-border/50 flex justify-between items-center w-full text-left"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 opacity-60" /> Mensagens
                      </div>
                      {currentUser?.messages && currentUser.messages.filter(m => m.status === 'Respondida').length > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                          {currentUser.messages.filter(m => m.status === 'Respondida').length}
                        </span>
                      )}
                    </Link>
                    <button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }} 
                      className="text-lg py-2 border-b border-border/50 flex items-center gap-3 w-full text-left text-destructive"
                    >
                      <LogOut className="w-5 h-5 opacity-80" /> Sair
                    </button>
                  </>
                ) : (
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="text-lg py-2 border-b border-border/50 flex items-center gap-2">
                    <UserCircle className="w-5 h-5" /> Entrar
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-14 md:py-20 rounded-t-[2.5rem] md:rounded-t-[4rem] mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-12">
            {/* Brand */}
            <div className="space-y-5 lg:col-span-1">
              <h3 className="font-serif text-3xl text-primary" style={{ fontFamily: 'var(--font-serif)' }}>
                Marixica
              </h3>
              <p className="text-background/65 leading-relaxed text-sm">
                Bolos caseiros e personalizados feitos à mão, no Porto. Para aniversários, festas e momentos especiais.
              </p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/marixica.bolos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/8 rounded-full flex items-center justify-center hover:bg-primary hover:text-foreground transition-all duration-300 group border border-background/10">
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-background/45">Navegação</h4>
              <ul className="space-y-2.5 text-background/75 text-sm">
                <li><Link to="/produtos" className="hover:text-primary transition-colors">Produtos</Link></li>
                <li><Link to="/sobre" className="hover:text-primary transition-colors">Sobre nós</Link></li>
                <li><Link to="/contactos" className="hover:text-primary transition-colors">Contactos</Link></li>
                <li><Link to="/enviar-mensagem" className="hover:text-primary transition-colors">Enviar mensagem</Link></li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="space-y-5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-background/45">Contacto</h4>
              <ul className="space-y-3.5 text-background/75">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                  <a href="https://maps.google.com/?q=R.+Manuel+Pinto+de+Azevedo+748,+4100-320+Porto" target="_blank" rel="noopener noreferrer" className="text-sm leading-relaxed hover:text-primary transition-colors">R. Manuel Pinto de Azevedo 748,<br />4100-320 Porto</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 shrink-0 text-primary" />
                  <span className="text-sm">Seg–Sáb, 9h–19h</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 shrink-0 text-primary" />
                  <a href="https://www.instagram.com/marixica.bolos" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">@marixica.bolos</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-background/45">Informações</h4>
              <ul className="space-y-2.5 text-background/75 text-sm">
                <li><button onClick={openPrivacyModal} className="hover:text-primary transition-colors cursor-pointer text-left">Política de Privacidade</button></li>
                <li><button onClick={openCookiePrefsModal} className="hover:text-primary transition-colors cursor-pointer text-left">Definições de Cookies</button></li>
                <li><button onClick={openTermsModal} className="hover:text-primary transition-colors cursor-pointer text-left">Termos e Condições</button></li>
                <li><a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Livro de Reclamações</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-background/45 text-xs">
            <p className="flex items-center gap-1.5">
              Marixica © {new Date().getFullYear()}. Bolos artesanais feitos com <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> no Porto.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-wrap items-center justify-center gap-3 opacity-60 hover:opacity-90 transition-opacity">
              <img src={paymentMethod1} alt="MB WAY" className="h-6 md:h-7 w-auto object-contain" />
              <img src={paymentMethod2} alt="Multibanco" className="h-6 md:h-7 w-auto object-contain" />
              <img src={paymentMethod3} alt="Visa" className="h-6 md:h-7 w-auto object-contain" />
              <img src={paymentMethod4} alt="Mastercard" className="h-6 md:h-7 w-auto object-contain" />
              <img src={paymentMethod5} alt="Apple Pay" className="h-6 md:h-7 w-auto object-contain" />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}