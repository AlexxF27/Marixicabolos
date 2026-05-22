import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, ShoppingBag, User, Mail, Phone, Calendar, MessageSquare, Package, CreditCard, Smartphone, Banknote, CheckCircle2, Lock, Copy, SmartphoneNfc, MapPin, ChevronDown } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Layout } from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { cn } from '../components/ui/utils';

type PaymentMethod = 'mbway' | 'multibanco' | 'card' | 'applepay' | '';
type PaymentStatus = 'idle' | 'processing' | 'mbway_waiting' | 'success' | 'pending_multibanco' | 'error';

export function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalItems, clearCart } = useCart();
  const { isAuthenticated, currentUser, addOrder, updateProfile, addAddress } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone,
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mbway');
  const [mbwayPhone, setMbwayPhone] = useState('');
  
  // Card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [deliveryMethod, setDeliveryMethod] = useState<'levantamento' | 'entrega'>('levantamento');
  
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  // Endereço
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    currentUser?.addresses?.find(a => a.isDefault)?.id || 
    (currentUser?.addresses?.[0]?.id) || 
    'new'
  );
  const [newAddress, setNewAddress] = useState({ name: 'Minha Morada', street: '', postalCode: '', city: '' });

  // mock price calculation
  const subtotal = items.reduce((acc, item) => {
    const match = item.product.price.match(/\d+/);
    const val = match ? parseInt(match[0]) : 20;
    return acc + val * item.quantity;
  }, 0);
  const isFirstPurchase = currentUser && currentUser.orders && currentUser.orders.length === 0;
  const firstPurchaseDiscount = isFirstPurchase ? subtotal * 0.1 : 0;
  const deliveryFee = deliveryMethod === 'entrega' ? 5 : 0;
  const total = subtotal - firstPurchaseDiscount + deliveryFee;

  const registerOrder = (status: string, method: PaymentMethod) => {
    if (formData.name && formData.email && formData.phone) {
      updateProfile(formData.name, formData.email, formData.phone);
    }
    
    let addressData = null;
    if (deliveryMethod === 'entrega') {
      if (selectedAddressId === 'new') {
        if (newAddress.street && newAddress.city && newAddress.postalCode) {
          addressData = {
            name: newAddress.name || 'Minha Morada',
            street: newAddress.street,
            postalCode: newAddress.postalCode,
            city: newAddress.city
          };
          addAddress(addressData);
        }
      } else {
        addressData = currentUser?.addresses?.find(a => a.id === selectedAddressId);
      }
    }

    const orderItems = items.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }));
    
    addOrder({
      status: status === 'success' ? 'Em Processamento' : 'Aguardando Pagamento',
      total: total,
      items: orderItems
    });

    const localOrderId = `MRX-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      id: localOrderId,
      date: formData.date,
      deliveryMethod,
      address: addressData,
      paymentMethod: method,
      items: orderItems,
      total: total
    });
  };

  const isDateDisabled = (date: Date) => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    minDate.setHours(0,0,0,0);
    if (date < minDate) return true;

    if (date.getDay() === 0) return true;

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const holidays = ['1-1', '4-25', '5-1', '6-10', '8-15', '10-5', '11-1', '12-1', '12-8', '12-25'];
    if (holidays.includes(`${month}-${day}`)) return true;

    return false;
  };

  const validateLuhn = (num: string) => {
    const arr = num.replace(/\s/g, '').split('').reverse().map(x => parseInt(x, 10));
    const sum = arr.reduce((acc, val, i) => {
        let n = val;
        if (i % 2 !== 0) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        return acc + n;
    }, 0);
    return sum % 10 === 0 && arr.length >= 13;
  };

  const validateOrder = (isExpress = false) => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'O nome é obrigatório.';
    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Insere um email válido.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'O telefone é obrigatório.';

    if (!formData.date) {
      newErrors.date = 'Selecione uma data para a encomenda.';
    } else if (isDateDisabled(new Date(formData.date))) {
      newErrors.date = 'A data selecionada não é válida (mínimo 48h, encerrados à segunda ou feriados).';
    }

    if (deliveryMethod === 'entrega' && selectedAddressId === 'new') {
      if (!newAddress.street.trim()) newErrors.street = 'A rua é obrigatória.';
      if (!newAddress.city.trim()) newErrors.city = 'A cidade é obrigatória.';
      if (!newAddress.postalCode.trim() || !/^\d{4}-\d{3}$/.test(newAddress.postalCode)) {
        newErrors.postalCode = 'Insira um código postal válido (ex: 4000-000).';
      }
    }

    if (!isExpress) {
      if (!paymentMethod) {
        newErrors.payment = 'Selecione um método de pagamento.';
      } else if (paymentMethod === 'mbway') {
        if (!mbwayPhone.trim() || !/^9\d{8}$/.test(mbwayPhone.replace(/\s/g, ''))) {
          newErrors.mbway = 'Insere um número de telemóvel válido (9xx xxx xxx).';
        }
      } else if (paymentMethod === 'card') {
        if (!cardNumber || !validateLuhn(cardNumber)) newErrors.cardNumber = 'Número de cartão inválido.';
        if (!cardExpiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardExpiry)) newErrors.cardExpiry = 'Data inválida (MM/AA).';
        if (!cardCvc || !/^\d{3,4}$/.test(cardCvc)) newErrors.cardCvc = 'CVC inválido.';
      }
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOrder()) return;

    if (paymentMethod === 'mbway') {
      setPaymentStatus('mbway_waiting');
      setTimeout(() => {
        setPaymentStatus('success');
        registerOrder('success', 'mbway');
        clearCart();
      }, 3000);
    } else if (paymentMethod === 'multibanco') {
      setPaymentStatus('processing');
      setTimeout(() => {
        setPaymentStatus('pending_multibanco');
        registerOrder('pending', 'multibanco');
        clearCart();
      }, 1500);
    } else if (paymentMethod === 'card') {
      setPaymentStatus('processing');
      setTimeout(() => {
        setPaymentStatus('success');
        registerOrder('success', 'card');
        clearCart();
      }, 2000);
    }
  };

  const handleExpressPay = (method: 'applepay') => {
    if (!validateOrder(true)) return;

    setPaymentMethod(method);
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      registerOrder('success', 'applepay');
      clearCart();
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para a área de transferência!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors(prev => ({...prev, [e.target.name]: ''}));
    }
  };

  if (!isAuthenticated) {
    return null; // Avoid rendering checkout if not logged in while redirect happens
  }

  if (items.length === 0 && paymentStatus === 'idle') {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-foreground/30" />
            </div>
            <h1 className="font-serif text-4xl mb-4">O seu cesto está vazio</h1>
            <p className="text-foreground/70 mb-8">
              Adicione produtos ao cesto antes de finalizar a encomenda.
            </p>
            <Link
              to="/#produtos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              Ver Produtos
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto bg-background rounded-3xl p-8 md:p-12 shadow-sm border border-border"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl mb-4">Pagamento confirmado!</h1>
            <p className="text-foreground/70 mb-8">
              Obrigada pela tua encomenda. Irás receber um email com os detalhes muito em breve.
            </p>
            
            {confirmedOrder && (
              <div className="bg-secondary/50 rounded-2xl p-6 text-left mb-8 space-y-4 text-sm border border-border/50">
                <div className="flex justify-between border-b border-border/50 pb-3">
                  <span className="text-foreground/60">Nº Encomenda</span>
                  <span className="font-medium font-mono text-base">{confirmedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-3">
                  <span className="text-foreground/60">Data Desejada</span>
                  <span className="font-medium">{format(new Date(confirmedOrder.date), "PPP", { locale: pt })}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-3">
                  <span className="text-foreground/60">Método de Entrega</span>
                  <span className="font-medium">{confirmedOrder.deliveryMethod === 'entrega' ? 'Entrega ao Domicílio' : 'Levantamento na Loja'}</span>
                </div>
                {confirmedOrder.deliveryMethod === 'entrega' && confirmedOrder.address && (
                  <div className="flex justify-between border-b border-border/50 pb-3">
                    <span className="text-foreground/60">Morada de Entrega</span>
                    <span className="font-medium text-right max-w-[200px]">{confirmedOrder.address.street}, {confirmedOrder.address.postalCode} {confirmedOrder.address.city}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-border/50 pb-3">
                  <span className="text-foreground/60">Método de Pagamento</span>
                  <span className="font-medium capitalize">{confirmedOrder.paymentMethod === 'applepay' ? 'Apple Pay' : confirmedOrder.paymentMethod}</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground/60 block mb-3">Produtos Encomendados:</span>
                  <ul className="space-y-2">
                    {confirmedOrder.items.map((item: any, i: number) => (
                      <li key={i} className="flex justify-between items-center bg-background p-3 rounded-lg border border-border/50">
                        <span><span className="font-bold mr-2">{item.quantity}x</span> {item.name}</span>
                        <span className="font-medium text-primary">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-border">
                  <span className="font-bold text-lg">Total Pago</span>
                  <span className="font-bold text-2xl text-primary">{confirmedOrder.total.toFixed(2).replace('.', ',')} €</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium"
              >
                Voltar à Loja
              </Link>
              <Link
                to="/perfil"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-transparent text-foreground border border-border px-8 py-4 rounded-full hover:bg-secondary transition-colors font-medium"
              >
                Ver a minha encomenda
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (paymentStatus === 'pending_multibanco') {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto bg-background rounded-3xl p-8 md:p-12 shadow-sm border border-border"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
              <Banknote className="w-12 h-12 text-orange-600" />
            </div>
            <h1 className="font-serif text-3xl mb-4">Aguardamos pagamento</h1>
            <p className="text-foreground/70 mb-6">
              Aguardamos o pagamento por referência para confirmar a encomenda. Irás receber um email com os detalhes.
            </p>
            
            <div className="bg-secondary p-6 rounded-xl space-y-4 mb-8 text-left text-sm border border-border/50">
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-foreground/60">Entidade:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg">12345</span>
                  <button onClick={() => copyToClipboard('12345')} className="text-primary hover:text-primary/70 p-1"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                <span className="text-foreground/60">Referência:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg">123 456 789</span>
                  <button onClick={() => copyToClipboard('123 456 789')} className="text-primary hover:text-primary/70 p-1"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/60">Valor:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg text-primary">{total.toFixed(2).replace('.', ',')} €</span>
                  <button onClick={() => copyToClipboard(`${total.toFixed(2)}`)} className="text-primary hover:text-primary/70 p-1"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-medium"
              >
                Voltar à Loja
              </Link>
              <Link
                to="/perfil"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-transparent text-foreground border border-border px-8 py-4 rounded-full hover:bg-secondary transition-colors font-medium"
              >
                Ver a minha encomenda
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-secondary/30 py-12">
        <div className="container mx-auto px-6">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-all hover:gap-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar à Loja
          </Link>

          <div className="max-w-6xl mx-auto">
            {/* Cabeçalho */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 
                className="font-serif mb-4" 
                style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', lineHeight: '1.1' }}
              >
                Finalizar Encomenda
              </h1>
              <p className="text-xl text-foreground/70">
                Preenche os teus dados e escolhe o método de pagamento.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Resumo da Encomenda */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-background rounded-3xl p-8 lg:sticky lg:top-24 border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="w-6 h-6 text-primary" />
                    <h2 className="font-serif text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                      Resumo da Encomenda
                    </h2>
                  </div>

                  <div className="space-y-4 mb-6">
                    {items.map((item, index) => (
                      <div key={`${item.product.id}-${index}`} className="flex gap-4 pb-4 border-b border-border last:border-0">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif mb-1 leading-tight">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-primary mb-1">{item.product.price}</p>
                          <p className="text-sm text-foreground/60 mb-2">
                            Quantidade: {item.quantity}
                          </p>
                          
                          {/* Customization Details */}
                          {item.customization && (
                            <div className="text-xs text-foreground/60 bg-secondary rounded-lg p-2 mt-2 space-y-1">
                              <p className="font-semibold text-foreground/80">Personalização:</p>
                              {item.customization.base && <p>• Base: {item.customization.base}</p>}
                              {item.customization.flavor && <p>• Sabor: {item.customization.flavor}</p>}
                              {item.customization.filling && <p>• Recheio: {item.customization.filling}</p>}
                              {item.customization.frosting && <p>• Cobertura: {item.customization.frosting}</p>}
                              {item.customization.size && <p>• Tamanho: {item.customization.size}</p>}
                              {item.customization.extras && item.customization.extras.length > 0 && (
                                <p>• Extras: {item.customization.extras.join(', ')}</p>
                              )}
                              {item.customization.message && (
                                <p>• Mensagem: {item.customization.message}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-foreground/70">Subtotal:</span>
                      <span className="font-medium">{subtotal.toFixed(2).replace('.', ',')} €</span>
                    </div>
                    {isFirstPurchase && (
                      <div className="flex justify-between items-center text-sm text-green-600">
                        <span>10% Primeira Compra:</span>
                        <span className="font-medium">- {firstPurchaseDiscount.toFixed(2).replace('.', ',')} €</span>
                      </div>
                    )}
                    {deliveryMethod === 'entrega' && (
                      <div className="flex justify-between items-center text-sm text-primary">
                        <span>Taxa de Entrega:</span>
                        <span className="font-medium">5,00 €</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-border/50">
                      <span className="text-lg">Total Final:</span>
                      <span className="text-2xl font-serif text-primary">
                        {total.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Formulário e Pagamento */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <div className="bg-background rounded-3xl p-8 md:p-12 border border-border">
                  
                  {/* Pagamento Rápido */}
                  <div className="mb-10 pb-10 border-b border-border">
                    <h2 className="font-serif mb-2 text-xl" style={{ fontFamily: 'var(--font-serif)' }}>
                      Pagamento rápido
                    </h2>
                    <p className="text-sm text-foreground/70 mb-5">
                      Finaliza em segundos com pagamento rápido. Preenche os teus dados abaixo primeiro.
                    </p>
                    <div className="flex flex-col gap-4">
                      <button 
                        type="button" 
                        onClick={() => handleExpressPay('applepay')} 
                        disabled={paymentStatus !== 'idle'}
                        className="w-full bg-black text-white h-14 rounded-xl flex items-center justify-center font-medium gap-3 hover:bg-black/90 transition-colors disabled:opacity-50"
                      >
                        <SmartphoneNfc className="w-5 h-5" /> 
                        Apple Pay
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 
                      className="font-serif mb-6" 
                      style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}
                    >
                      Dados de Contacto
                    </h2>

                    {/* Nome */}
                    <div>
                      <label className="block mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>Nome Completo *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-secondary rounded-xl border ${errors.name ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary'} focus:outline-none focus:ring-2 transition-all`}
                        placeholder="O teu nome completo"
                      />
                      {errors.name && <p className="text-destructive text-sm mt-2">{errors.name}</p>}
                    </div>

                    {/* Email e Telefone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <span>Email *</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-5 py-4 bg-secondary rounded-xl border ${errors.email ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary'} focus:outline-none focus:ring-2 transition-all`}
                          placeholder="teu@email.com"
                        />
                        {errors.email && <p className="text-destructive text-sm mt-2">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>Telefone *</span>
                        </label>
                        <PhoneInput
                          international
                          defaultCountry="PT"
                          value={formData.phone ? formData.phone.replace(/\s/g, '') : undefined}
                          onChange={(v) => setFormData({ ...formData, phone: v || '' })}
                          className={`w-full px-5 py-4 bg-secondary rounded-xl border ${errors.phone ? 'border-destructive focus-within:ring-destructive/20' : 'border-border focus-within:ring-primary'} focus-within:ring-2 transition-all [&>input]:bg-transparent [&>input]:border-none [&>input]:focus:outline-none`}
                        />
                        {errors.phone && <p className="text-destructive text-sm mt-2">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="mt-10 mb-10 pt-10 border-t border-border">
                      <h2 
                        className="font-serif mb-6" 
                        style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}
                      >
                        Entrega ou Levantamento
                      </h2>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('levantamento')}
                          className={`py-4 px-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                            deliveryMethod === 'levantamento'
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <Package className="w-6 h-6" />
                          <span className="font-medium text-center">Levantamento na Loja</span>
                          <span className="text-xs opacity-90 text-center leading-tight">
                            <a href="https://maps.google.com/?q=R.+Manuel+Pinto+de+Azevedo+748,+4100-320+Porto" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="underline underline-offset-2 hover:opacity-80 transition-opacity">R. Manuel Pinto de Azevedo 748, Porto</a><br />(Gratuito)
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('entrega')}
                          className={`py-4 px-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                            deliveryMethod === 'entrega'
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <MapPin className="w-6 h-6" />
                          <span className="font-medium">Entrega ao Domicílio</span>
                          <span className="text-xs opacity-80">5,00€ (Zonas limitadas)</span>
                        </button>
                      </div>

                      {deliveryMethod === 'entrega' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
                          {currentUser?.addresses && currentUser.addresses.length > 0 && (
                            <div>
                              <label className="block mb-2 flex items-center gap-2">
                                <span>Morada de Entrega</span>
                              </label>
                              <div className="relative">
                                <select
                                  value={selectedAddressId}
                                  onChange={(e) => setSelectedAddressId(e.target.value)}
                                  className="w-full px-5 py-4 bg-secondary rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
                                >
                                  {currentUser.addresses.map(addr => (
                                    <option key={addr.id} value={addr.id}>
                                      {addr.name} ({addr.street}, {addr.city})
                                    </option>
                                  ))}
                                  <option value="new">+ Adicionar nova morada</option>
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50 pointer-events-none" />
                              </div>
                            </div>
                          )}

                          {selectedAddressId === 'new' && (
                            <div className="space-y-6 border border-border p-5 rounded-xl bg-background mt-4">
                              <h4 className="font-medium mb-2">Nova Morada</h4>
                              <div>
                                <label className="block mb-2 flex items-center gap-2 text-sm text-foreground/80">
                                  <span>Nome da Morada (ex: Casa, Trabalho)</span>
                                </label>
                                <input
                                  type="text"
                                  value={newAddress.name}
                                  onChange={(e) => {
                                    setNewAddress({...newAddress, name: e.target.value});
                                  }}
                                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                  placeholder="Casa"
                                />
                              </div>
                              <div>
                                <label className="block mb-2 flex items-center gap-2 text-sm text-foreground/80">
                                  <span>Rua e Porta *</span>
                                </label>
                                <input
                                  type="text"
                                  value={newAddress.street}
                                  onChange={(e) => {
                                    setNewAddress({...newAddress, street: e.target.value});
                                    if(errors.street) setErrors(prev => ({...prev, street: ''}));
                                  }}
                                  className={`w-full px-4 py-3 bg-secondary rounded-xl border ${errors.street ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary'} focus:outline-none focus:ring-2 transition-all`}
                                  placeholder="Rua das Flores, 123"
                                />
                                {errors.street && <p className="text-destructive text-sm mt-2">{errors.street}</p>}
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block mb-2 flex items-center gap-2 text-sm text-foreground/80">
                                    <span>Código Postal *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={newAddress.postalCode}
                                    onChange={(e) => {
                                      setNewAddress({...newAddress, postalCode: e.target.value});
                                      if(errors.postalCode) setErrors(prev => ({...prev, postalCode: ''}));
                                    }}
                                    className={`w-full px-4 py-3 bg-secondary rounded-xl border ${errors.postalCode ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary'} focus:outline-none focus:ring-2 transition-all`}
                                    placeholder="4000-000"
                                  />
                                  {errors.postalCode && <p className="text-destructive text-sm mt-2">{errors.postalCode}</p>}
                                </div>
                                <div>
                                  <label className="block mb-2 flex items-center gap-2 text-sm text-foreground/80">
                                    <span>Cidade *</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={newAddress.city}
                                    onChange={(e) => {
                                      setNewAddress({...newAddress, city: e.target.value});
                                      if(errors.city) setErrors(prev => ({...prev, city: ''}));
                                    }}
                                    className={`w-full px-4 py-3 bg-secondary rounded-xl border ${errors.city ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary'} focus:outline-none focus:ring-2 transition-all`}
                                    placeholder="Porto"
                                  />
                                  {errors.city && <p className="text-destructive text-sm mt-2">{errors.city}</p>}
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}

                      <div className="mt-6">
                        <label className="block mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>Data Desejada *</span>
                        </label>
                        <input
                          type="date"
                          value={formData.date ? formData.date.split('T')[0] : ''}
                          min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                          onChange={(e) => {
                            const dateValue = e.target.value;
                            if (dateValue) {
                              setFormData(prev => ({ ...prev, date: new Date(dateValue).toISOString() }));
                              if(errors.date) setErrors(prev => ({...prev, date: ''}));
                            } else {
                              setFormData(prev => ({ ...prev, date: '' }));
                            }
                          }}
                          className={cn(
                            "w-full px-5 py-4 bg-secondary rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary transition-all block",
                            errors.date ? "border-destructive focus:ring-destructive/20" : "border-border",
                            !formData.date && "text-foreground/50"
                          )}
                        />
                        {errors.date && <p className="text-destructive text-sm mt-2">{errors.date}</p>}
                        <p className="text-xs text-foreground/60 mt-2">* Pedidos com mínimo de 48h de antecedência. Estamos encerrados aos domingos e aos feriados.</p>
                      </div>
                    </div>

                    {/* Mensagem */}
                    <div>
                      <label className="block mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span>Observações</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-5 py-4 bg-secondary rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
                        placeholder="Algum detalhe importante para a encomenda?"
                      />
                    </div>

                    {/* Seção de Pagamento Principal */}
                    <div className="mt-12 pt-10 border-t border-border">
                      <h2 
                        className="font-serif mb-2" 
                        style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}
                      >
                        Pagamento
                      </h2>
                      <p className="text-sm text-foreground/70 mb-6">
                        Escolhe o método de pagamento que preferes. Pagamento seguro.
                      </p>
                      {errors.payment && <p className="text-destructive text-sm mb-4">{errors.payment}</p>}
                      
                      <div className="space-y-4">
                        {/* MB WAY */}
                        <div className={`border rounded-xl transition-all ${paymentMethod === 'mbway' ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}>
                          <label className="flex items-center gap-3 p-4 cursor-pointer">
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="mbway" 
                              checked={paymentMethod === 'mbway'}
                              onChange={() => {
                                setPaymentMethod('mbway');
                                if(errors.payment) setErrors(prev => ({...prev, payment: ''}));
                              }}
                              className="w-5 h-5 text-primary accent-primary"
                            />
                            <Smartphone className={`w-6 h-6 ${paymentMethod === 'mbway' ? 'text-primary' : 'text-foreground/50'}`} />
                            <span className="font-medium text-lg">MB WAY</span>
                          </label>
                          
                          <AnimatePresence>
                            {paymentMethod === 'mbway' && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-5 pt-2 ml-10 pl-2 text-sm">
                                  <input 
                                    type="tel" 
                                    placeholder="9xx xxx xxx" 
                                    value={mbwayPhone}
                                    onChange={e => {
                                      setMbwayPhone(e.target.value);
                                      if(errors.mbway) setErrors(prev => ({...prev, mbway: ''}));
                                    }}
                                    className={`w-full max-w-[240px] px-4 py-3 bg-background rounded-lg border ${errors.mbway ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary'} focus:outline-none mb-2 block`}
                                  />
                                  {errors.mbway && <p className="text-destructive text-xs mb-2">{errors.mbway}</p>}
                                  <p className="text-foreground/60 text-xs">Recebes um pedido na app MB WAY para confirmar o pagamento.</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Multibanco */}
                        <div className={`border rounded-xl transition-all ${paymentMethod === 'multibanco' ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}>
                          <label className="flex items-center gap-3 p-4 cursor-pointer">
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="multibanco" 
                              checked={paymentMethod === 'multibanco'}
                              onChange={() => {
                                setPaymentMethod('multibanco');
                                if(errors.payment) setErrors(prev => ({...prev, payment: ''}));
                              }}
                              className="w-5 h-5 text-primary accent-primary"
                            />
                            <Banknote className={`w-6 h-6 ${paymentMethod === 'multibanco' ? 'text-primary' : 'text-foreground/50'}`} />
                            <span className="font-medium text-lg">Multibanco (Referência)</span>
                          </label>
                          
                          <AnimatePresence>
                            {paymentMethod === 'multibanco' && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-5 pt-2 ml-10 pl-2 text-sm">
                                  <p className="text-foreground/80 mb-3">Podes pagar no multibanco ou homebanking. Guarda estes dados.</p>
                                  <div className="bg-background border border-border p-4 rounded-lg space-y-3 max-w-[300px]">
                                    <div className="flex justify-between items-center">
                                      <span className="text-foreground/60">Entidade:</span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono font-medium">12345</span>
                                        <button type="button" onClick={() => copyToClipboard('12345')} className="text-primary hover:text-primary/70 p-1"><Copy className="w-4 h-4" /></button>
                                      </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-foreground/60">Referência:</span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono font-medium">123 456 789</span>
                                        <button type="button" onClick={() => copyToClipboard('123 456 789')} className="text-primary hover:text-primary/70 p-1"><Copy className="w-4 h-4" /></button>
                                      </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-foreground/60">Valor:</span>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono font-medium">{getTotalItems() * 25},00 €</span>
                                        <button type="button" onClick={() => copyToClipboard(`${getTotalItems() * 25},00`)} className="text-primary hover:text-primary/70 p-1"><Copy className="w-4 h-4" /></button>
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-foreground/60 text-xs mt-3">A encomenda fica confirmada após o pagamento.</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Cartão */}
                        <div className={`border rounded-xl transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}>
                          <label className="flex items-center gap-3 p-4 cursor-pointer">
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="card" 
                              checked={paymentMethod === 'card'}
                              onChange={() => {
                                setPaymentMethod('card');
                                if(errors.payment) setErrors(prev => ({...prev, payment: ''}));
                              }}
                              className="w-5 h-5 text-primary accent-primary"
                            />
                            <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-primary' : 'text-foreground/50'}`} />
                            <span className="font-medium text-lg">Cartão (Visa/Mastercard)</span>
                          </label>
                          
                          <AnimatePresence>
                            {paymentMethod === 'card' && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-5 pt-2 ml-10 pl-2 text-sm space-y-4">
                                  <div>
                                    <input 
                                      type="text" 
                                      placeholder="0000 0000 0000 0000" 
                                      value={cardNumber}
                                      onChange={(e) => {
                                        setCardNumber(e.target.value);
                                        if(errors.cardNumber) setErrors(prev => ({...prev, cardNumber: ''}));
                                      }}
                                      className={`w-full max-w-[300px] px-4 py-3 bg-background rounded-lg border ${errors.cardNumber ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary'} focus:outline-none`}
                                    />
                                    {errors.cardNumber && <p className="text-destructive text-xs mt-1">{errors.cardNumber}</p>}
                                  </div>
                                  <div className="flex gap-3 max-w-[300px]">
                                    <div className="w-1/2">
                                      <input 
                                        type="text" 
                                        placeholder="MM/AA" 
                                        value={cardExpiry}
                                        onChange={(e) => {
                                          setCardExpiry(e.target.value);
                                          if(errors.cardExpiry) setErrors(prev => ({...prev, cardExpiry: ''}));
                                        }}
                                        className={`w-full px-4 py-3 bg-background rounded-lg border ${errors.cardExpiry ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary'} focus:outline-none`}
                                      />
                                      {errors.cardExpiry && <p className="text-destructive text-xs mt-1">{errors.cardExpiry}</p>}
                                    </div>
                                    <div className="w-1/2">
                                      <input 
                                        type="text" 
                                        placeholder="CVC" 
                                        value={cardCvc}
                                        onChange={(e) => {
                                          setCardCvc(e.target.value);
                                          if(errors.cardCvc) setErrors(prev => ({...prev, cardCvc: ''}));
                                        }}
                                        className={`w-full px-4 py-3 bg-background rounded-lg border ${errors.cardCvc ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:ring-primary'} focus:outline-none`}
                                      />
                                      {errors.cardCvc && <p className="text-destructive text-xs mt-1">{errors.cardCvc}</p>}
                                    </div>
                                  </div>
                                  <p className="text-foreground/60 text-xs flex items-center gap-1 mt-2">
                                    <Lock className="w-3 h-3" /> Pagamento seguro. Poderá ser pedida validação (3D Secure).
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Trust Badge */}
                      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-foreground/70 bg-secondary py-3 px-4 rounded-xl">
                        <Lock className="w-4 h-4 text-green-600" />
                        <span>Pagamento seguro • Encomendas exclusivamente no site</span>
                      </div>
                    </div>

                    {/* Botão Submit */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={paymentStatus !== 'idle'}
                        className="w-full bg-primary text-primary-foreground py-5 rounded-full hover:opacity-90 transition-opacity font-medium text-lg flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {paymentStatus === 'processing' || paymentStatus === 'mbway_waiting' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            {paymentStatus === 'mbway_waiting' ? 'A aguardar confirmação...' : 'A processar...'}
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-5 h-5" />
                            Finalizar Encomenda
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}