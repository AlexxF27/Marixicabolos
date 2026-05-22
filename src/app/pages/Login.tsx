import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Lock, Mail, LogIn, ArrowLeft } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login, users } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if user exists
    const user = users.find(u => u.email === formData.email);
    if (!user) {
      setError('O email não está registado. Por favor, crie uma conta.');
      return;
    }

    // Automatically set verified if it was somehow false from before
    if (!user.verified) {
      user.verified = true;
    }

    // In a real app we'd check password via API. Mock checks local user.
    if (user.password && user.password !== formData.password) {
      setError('Palavra-passe incorreta.');
      return;
    }

    login(formData.email);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Voltar */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-all hover:gap-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar à Página Inicial
          </Link>

          {/* Card de Login */}
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-xl">
            {/* Ícone */}
            <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
              <LogIn className="w-10 h-10 text-primary-foreground" />
            </div>

            {/* Título */}
            <h1 
              className="font-serif text-center mb-2" 
              style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', lineHeight: '1.1' }}
            >
              Iniciar Sessão
            </h1>
            <p className="text-center text-foreground/70 mb-8">
              Aceda à sua conta Marixica
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 text-center">
                {error}
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 flex items-center gap-2 text-foreground/80">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 flex items-center gap-2 text-foreground/80">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>Palavra-passe</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Esqueci a password */}
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline">
                  Esqueci-me da palavra-passe
                </a>
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
              >
                <LogIn className="w-5 h-5" />
                Entrar
              </button>
            </form>

            {/* Divisor */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-foreground/60">Ainda não tem conta?</span>
              </div>
            </div>

            {/* Link para Registo */}
            <Link
              to="/registo"
              className="w-full block text-center border-2 border-primary text-primary py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-all font-medium"
            >
              Criar Conta
            </Link>
          </div>

          {/* Info adicional */}
          <p className="text-center text-sm text-foreground/60 mt-6">
            Ao iniciar sessão, concorda com os nossos{' '}
            <a href="#" className="text-primary hover:underline">Termos e Condições</a>
            {' '}e{' '}
            <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
