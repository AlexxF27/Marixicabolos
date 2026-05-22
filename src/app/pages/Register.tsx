import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, Phone, Calendar, User, ArrowLeft, Check, ChevronDown } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { cn } from '../components/ui/utils';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export function Register() {
  const navigate = useNavigate();
  const { registerUser, users, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthday: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    const newErrors: {[key: string]: string} = {};

    if (formData.name.length < 3) {
      newErrors.name = 'O nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Email inválido';
    }

    if (users.some(u => u.email === formData.email)) {
      newErrors.email = 'Este email já se encontra registado.';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'A palavra-passe deve ter pelo menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As palavras-passe não coincidem';
    }

    if (!formData.phone || formData.phone.length < 9) {
      newErrors.phone = 'Número de telefone inválido';
    }

    if (!formData.birthday) {
      newErrors.birthday = 'A data de nascimento é obrigatória';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await registerUser(formData.name, formData.email, formData.phone, formData.password);

    if (result.success) {
      login(formData.email);
      navigate('/');
    } else {
      setErrors({ email: result.error || 'Erro ao criar conta' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Limpar erro do campo quando o utilizador começa a escrever
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
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
            to="/login"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-all hover:gap-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Login
          </Link>

          {/* Card de Registo */}
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-xl">
            {/* Ícone */}
            <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
              <UserPlus className="w-10 h-10 text-primary-foreground" />
            </div>

            {/* Título */}
            <h1 
              className="font-serif text-center mb-2" 
              style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', lineHeight: '1.1' }}
            >
              Criar Conta
            </h1>
            <p className="text-center text-foreground/70 mb-8">
              Junte-se à família Marixica
            </p>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block mb-2 flex items-center gap-2 text-foreground/80">
                  <User className="w-4 h-4 text-primary" />
                  <span>Nome Completo</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Maria Silva"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-border'} bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

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
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-border'} bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
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
                  className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-border'} bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirmar Password */}
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 flex items-center gap-2 text-foreground/80">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Confirmar Palavra-passe</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-border'} bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label htmlFor="phone" className="block mb-2 flex items-center gap-2 text-foreground/80">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Telefone</span>
                </label>
                <div className={`flex items-center rounded-xl border ${errors.phone ? 'border-red-500 focus-within:ring-red-500/50' : 'border-border focus-within:ring-primary/50'} bg-secondary/50 transition-all focus-within:ring-2 overflow-hidden px-4 py-1 [&>div>input]:bg-transparent [&>div>input]:border-none [&>div>input]:focus:outline-none [&>div>input]:py-2`}>
                  <PhoneInput
                    international
                    defaultCountry="PT"
                    value={formData.phone ? formData.phone.replace(/\s/g, '') : undefined}
                    onChange={(v) => {
                      setFormData({ ...formData, phone: v || '' });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className="w-full"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Data de Aniversário */}
              <div>
                <label className="block mb-2 flex items-center gap-2 text-foreground/80">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Data de Nascimento</span>
                </label>
                <input
                  type="date"
                  value={formData.birthday ? formData.birthday.split('T')[0] : ''}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    if (dateValue) {
                      setFormData({ ...formData, birthday: new Date(dateValue).toISOString() });
                      if (errors.birthday) {
                        setErrors({ ...errors, birthday: '' });
                      }
                    } else {
                      setFormData({ ...formData, birthday: '' });
                    }
                  }}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all block",
                    errors.birthday ? "border-red-500" : "border-border",
                    !formData.birthday && "text-foreground/50"
                  )}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.birthday && (
                  <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>
                )}
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium mt-6"
              >
                <UserPlus className="w-5 h-5" />
                Criar Conta
              </button>
            </form>

            {/* Divisor */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-foreground/60">Já tem uma conta?</span>
              </div>
            </div>

            {/* Link para Login */}
            <Link
              to="/login"
              className="w-full block text-center border-2 border-primary text-primary py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-all font-medium"
            >
              Iniciar Sessão
            </Link>
          </div>

          {/* Info adicional */}
          <p className="text-center text-sm text-foreground/60 mt-6">
            Ao criar uma conta, concorda com os nossos{' '}
            <a href="#" className="text-primary hover:underline">Termos e Condições</a>
            {' '}e{' '}
            <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
