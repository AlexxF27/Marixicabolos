import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Package, LogOut, ShieldCheck, X, Cookie, MapPin, Trash2, CheckCircle, FileText, Clock, Camera } from 'lucide-react';
import { Link, Navigate, useSearchParams } from 'react-router';
import jsPDF from 'jspdf';

export function Profile() {
  const { isAuthenticated, currentUser, logout, updateProfile, updateAvatar, cancelOrder, updatePassword, deleteAccount } = useAuth();

  // State for user data, populated from current user
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Effect to sync user data when current user changes
  useEffect(() => {
    if (currentUser) {
      setUserData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || ''
      });
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || ''
      });
    }
  }, [currentUser]);

  // State for editing form
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  
  // State for confirmation flow
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [confirmationError, setConfirmationError] = useState('');

  // Estados para Segurança
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    
    if (passwords.new !== passwords.confirm) {
      setPasswordError('As novas palavras-passe não coincidem.');
      return;
    }
    if (passwords.new.length < 6) {
      setPasswordError('A nova palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }
    
    const result = await updatePassword(passwords.current, passwords.new);
    if (result.success) {
      setPasswordSuccess('Palavra-passe alterada com sucesso!');
      setPasswords({ current: '', new: '', confirm: '' });
    } else {
      setPasswordError(result.error || 'Erro ao alterar palavra-passe.');
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError('');
    
    if (deleteConfirmation !== 'ELIMINAR') {
      setDeleteError('Por favor, escreva ELIMINAR para confirmar.');
      return;
    }
    
    const result = await deleteAccount();
    if (!result.success) {
      setDeleteError(result.error || 'Erro ao excluir a conta.');
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleEditClick = () => {
    setFormData({ ...userData });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    // Inicia o fluxo de confirmação ao tentar guardar
    setShowConfirmation(true);
    setConfirmationCode('');
    setConfirmationError('');
  };

  const handleConfirmCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de validação de código
    if (confirmationCode.length >= 4) {
      setUserData({ ...formData });
      updateProfile(formData.name, formData.email, formData.phone);
      setIsEditing(false);
      setShowConfirmation(false);
    } else {
      setConfirmationError('Código inválido. Insira pelo menos 4 dígitos.');
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownloadInvoice = (order: any) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Fatura Marixica', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Encomenda #${order.id}`, 20, 35);
    doc.text(`Data: ${order.date}`, 20, 42);
    doc.text(`Cliente: ${userData.name}`, 20, 49);
    
    let y = 65;
    doc.setFontSize(14);
    doc.text('Artigos:', 20, y);
    y += 10;
    
    doc.setFontSize(12);
    order.items.forEach((item: any) => {
      doc.text(`${item.quantity}x ${item.name}`, 20, y);
      y += 8;
    });
    
    y += 10;
    doc.setFontSize(14);
    doc.text(`Total: ${order.total.toFixed(2)} EUR`, 20, y);
    
    doc.save(`Fatura_${order.id}.pdf`);
  };
  
  const orders = currentUser?.orders || [];
  const messages = currentUser?.messages || [];
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'encomendas';

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16 min-h-[70vh]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="font-serif text-4xl mb-2">Conta</h1>
              <p className="text-foreground/70">Bem-vindo(a), {userData.name}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-full transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sair da Conta
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar / Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 relative">
                <h2 className="font-medium text-lg mb-4">Dados de Conta</h2>
                
                {!isEditing ? (
                  <>
                    <div className="space-y-3 text-sm text-foreground/80">
                      <p><strong>Nome:</strong> {userData.name}</p>
                      <p><strong>Email:</strong> {userData.email}</p>
                      <p><strong>Telefone:</strong> {userData.phone}</p>
                    </div>
                    <button 
                      onClick={handleEditClick}
                      className="mt-6 text-primary font-medium hover:underline text-sm"
                    >
                      Editar Dados
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleSaveClick} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground/70 mb-1">Nome</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground/70 mb-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground/70 mb-1">Telefone</label>
                      <div className="w-full bg-background border border-border rounded-lg text-sm focus-within:ring-1 focus-within:ring-primary px-3 py-1 [&>div>input]:bg-transparent [&>div>input]:border-none [&>div>input]:focus:outline-none [&>div>input]:py-1.5 [&>div>input]:text-sm">
                        <PhoneInput
                          international
                          defaultCountry="PT"
                          value={formData.phone ? formData.phone.replace(/\s/g, '') : undefined}
                          onChange={(v) => setFormData({ ...formData, phone: v || '' })}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button 
                        type="submit"
                        className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Guardar
                      </button>
                      <button 
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex-1 border border-border bg-background py-2 rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Imagem de Perfil */}
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 flex flex-col items-center">
                <h2 className="font-medium text-lg w-full mb-4 text-left">Imagem de Perfil</h2>
                <div className="relative group w-24 h-24 mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-[#fce7e7] text-[#d65d5d] flex items-center justify-center font-bold text-3xl border-2 border-[#f5c6c6]">
                    {currentUser?.avatar ? (
                      <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      currentUser?.name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <label className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium">Alterar</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-center text-foreground/50">
                  Clica na imagem para alterar a tua foto de perfil.
                </p>
              </div>

              <Link
                to="/definicoes-cookies"
                className="bg-background rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-colors flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <Cookie className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Definições de Cookies</h3>
                  <p className="text-sm text-foreground/60">Gerir preferências de privacidade</p>
                </div>
              </Link>
            </div>

            {/* Conteúdo Principal (Tabs) */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex gap-4 border-b border-border mb-6">
                <button
                  onClick={() => setSearchParams({ tab: 'encomendas' })}
                  className={`pb-3 font-medium text-lg border-b-2 transition-colors ${
                    activeTab === 'encomendas' || !activeTab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Histórico de Encomendas
                </button>
                <button
                  onClick={() => setSearchParams({ tab: 'mensagens' })}
                  className={`pb-3 font-medium text-lg border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'mensagens'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Mensagens
                  {messages.length > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {messages.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSearchParams({ tab: 'seguranca' })}
                  className={`pb-3 font-medium text-lg border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'seguranca'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Segurança
                </button>
              </div>

              {activeTab === 'seguranca' ? (
                <div className="space-y-8">
                  {/* Password Change */}
                  <div className="bg-background rounded-2xl p-6 border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium text-lg">Alterar Palavra-passe</h3>
                    </div>
                    
                    {passwordSuccess && (
                      <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm border border-green-100 flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p>{passwordSuccess}</p>
                      </div>
                    )}
                    
                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-1">Palavra-passe Atual</label>
                        <input 
                          type="password"
                          value={passwords.current}
                          onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                          required
                          className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-1">Nova Palavra-passe</label>
                        <input 
                          type="password"
                          value={passwords.new}
                          onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                          required
                          className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-1">Confirmar Nova Palavra-passe</label>
                        <input 
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                          required
                          className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                        {passwordError && (
                          <p className="text-red-500 text-xs mt-2">{passwordError}</p>
                        )}
                      </div>
                      
                      <div className="pt-2">
                        <button 
                          type="submit"
                          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          Atualizar Palavra-passe
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Delete Account */}
                  <div className="bg-background rounded-2xl p-6 border border-red-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-10 opacity-50 pointer-events-none"></div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium text-lg text-red-600">Excluir Conta</h3>
                    </div>
                    
                    <p className="text-sm text-foreground/70 mb-6 max-w-2xl">
                      Ao excluir a sua conta, todos os seus dados pessoais, histórico de encomendas e preferências serão permanentemente removidos. <strong>Esta ação não pode ser desfeita.</strong>
                    </p>

                    {!isDeletingAccount ? (
                      <button
                        type="button"
                        onClick={() => setIsDeletingAccount(true)}
                        className="bg-red-50 text-red-600 border border-red-200 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        Pretendo excluir a minha conta
                      </button>
                    ) : (
                      <form onSubmit={handleDeleteAccount} className="max-w-md p-5 bg-red-50/50 rounded-xl border border-red-100">
                        <label className="block text-sm font-medium text-red-800 mb-2">
                          Para confirmar, escreva <span className="font-bold">ELIMINAR</span> abaixo:
                        </label>
                        <input 
                          type="text"
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="ELIMINAR"
                          className="w-full px-4 py-2.5 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all mb-3 text-center tracking-widest font-bold text-red-700"
                        />
                        {deleteError && (
                          <p className="text-red-600 text-xs mb-4 font-medium">{deleteError}</p>
                        )}
                        <div className="flex gap-3">
                          <button 
                            type="button"
                            onClick={() => {
                              setIsDeletingAccount(false);
                              setDeleteConfirmation('');
                              setDeleteError('');
                            }}
                            className="flex-1 bg-white border border-red-200 text-foreground/70 py-2.5 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
                          >
                            Cancelar
                          </button>
                          <button 
                            type="submit"
                            className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
                          >
                            Excluir Definitivamente
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              ) : activeTab === 'mensagens' ? (
                messages.length === 0 ? (
                  <div className="text-center py-6 text-foreground/60">
                    Não tem mensagens enviadas.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="bg-background rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex justify-between items-start border-b border-border pb-4 mb-4">
                          <div>
                            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-2 ${
                              message.status === 'Respondida' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {message.status}
                            </span>
                            <p className="text-sm text-foreground/60">Mensagem #{message.id}</p>
                            <p className="font-medium text-lg mt-1">{message.subject}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-foreground/60">{message.date}</p>
                          </div>
                        </div>
                        <div className="bg-secondary/30 p-4 rounded-xl">
                          <p className="text-sm text-foreground/80 whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.status === 'Enviada' && (
                          <div className="mt-4 flex gap-2 items-center text-sm text-foreground/60">
                            <Clock className="w-4 h-4 text-primary" />
                            A nossa equipa responderá em breve.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              ) : (
                orders.length === 0 ? (
                  <div className="text-center py-6 text-foreground/60">
                    Não tem encomendas passadas.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, idx) => (
                      <div key={idx} className="bg-background rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex justify-between items-start border-b border-border pb-4 mb-4">
                          <div>
                            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-2 ${
                              order.status === 'Aguardando Pagamento' ? 'bg-amber-100 text-amber-700' :
                              order.status === 'Cancelada' ? 'bg-red-100 text-red-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {order.status}
                            </span>
                            <p className="text-sm text-foreground/60">Encomenda #{order.id}</p>
                            <p className="font-medium">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{order.total.toFixed(2)} €</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          {order.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-4 text-sm text-foreground/80">
                              <Package className="w-5 h-5 text-primary flex-shrink-0" />
                              <span>{item.quantity}x {item.name}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          {order.status === 'Aguardando Pagamento' ? (
                            <button 
                              onClick={() => cancelOrder(order.id)}
                              className="flex-1 border border-red-500 text-red-500 px-4 py-2 rounded-full font-medium hover:bg-red-500 hover:text-white transition-colors text-sm text-center"
                            >
                              Cancelar Encomenda
                            </button>
                          ) : order.status === 'Cancelada' ? (
                            <div className="flex-1 px-4 py-2 text-sm text-center text-foreground/50 border border-border rounded-full cursor-not-allowed">
                              Cancelada
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleDownloadInvoice(order)}
                              className="flex-1 border border-primary text-primary px-4 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition-colors text-sm text-center flex items-center justify-center gap-2"
                            >
                              <FileText className="w-4 h-4" />
                              Ver Fatura
                            </button>
                          )}
                          <Link to="/produtos" className="flex-1 bg-primary text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity text-sm text-center">
                            Repetir Encomenda
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-background border border-border rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <button 
              onClick={handleCancelConfirmation}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl mb-2">Verificação de Segurança</h3>
              <p className="text-sm text-foreground/70">
                Para proteger a sua conta, enviámos um código de confirmação para o seu email e telemóvel.
              </p>
            </div>

            <form onSubmit={handleConfirmCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-center mb-2">
                  Insira o código de 6 dígitos
                </label>
                <input 
                  type="text" 
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Ex: 123456"
                  className="w-full text-center tracking-widest text-lg px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
                {confirmationError && (
                  <p className="text-red-500 text-xs text-center mt-2">{confirmationError}</p>
                )}
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Confirmar e Guardar
              </button>
              
              <p className="text-center text-xs text-foreground/50 mt-4">
                Não recebeu o código? <button type="button" className="text-primary hover:underline">Reenviar</button>
              </p>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}