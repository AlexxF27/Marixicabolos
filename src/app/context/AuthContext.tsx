import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../lib/supabase';

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  postalCode: string;
  city: string;
  isDefault: boolean;
}

export interface Message {
  id: string;
  date: string;
  subject: string;
  content: string;
  status: 'Enviada' | 'Respondida';
}

export interface User {
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  orders: Order[];
  addresses?: Address[];
  messages?: Message[];
  avatar?: string;
  password?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[];
  login: (email: string) => void;
  registerUser: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  verifyUser: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  resendOtp: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (name: string, email: string, phone: string) => void;
  updateAvatar: (url: string) => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  cancelOrder: (orderId: string) => void;
  addAddress: (address: Omit<Address, 'id' | 'isDefault'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'date' | 'status'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('marixica_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    const authState = localStorage.getItem('marixica_auth');
    if (authState === 'true') {
      const activeUserEmail = localStorage.getItem('marixica_active_user');
      setIsAuthenticated(true);
      if (activeUserEmail && storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        const user = parsedUsers.find((u: User) => u.email === activeUserEmail);
        if (user) setCurrentUser(user);
      }
    }
  }, []);

  const registerUser = async (name: string, email: string, phone: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if user already exists locally
      const existing = users.find(u => u.email === email);
      if (existing) {
        return { success: false, error: 'Este email já se encontra registado.' };
      }

      // Automatically verify and store user without OTP
      const newUser: User = { name, email, phone, password, verified: true, orders: [] };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
      
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: 'Erro inesperado. Por favor, tenta novamente.' };
    }
  };

  const verifyUser = async (email: string, code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Verify OTP with auth service
      const { data, error } = await authService.verifyOtp({
        email,
        token: code,
        type: 'email'
      });

      if (error) {
        console.error('Auth verification error:', error);
        return { success: false, error: 'Código inválido. Por favor, verifica e tenta novamente.' };
      }

      if (!data.user) {
        return { success: false, error: 'Erro ao verificar código. Por favor, tenta novamente.' };
      }

      // Update user as verified
      const updatedUsers = users.map(u =>
        u.email === email ? { ...u, verified: true } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
      localStorage.removeItem('marixica_pending_user');

      return { success: true };
    } catch (err) {
      console.error('Verification error:', err);
      return { success: false, error: 'Erro inesperado. Por favor, tenta novamente.' };
    }
  };

  const resendOtp = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await authService.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });

      if (error) {
        console.error('Auth resend OTP error:', error);
        return { success: false, error: 'Erro ao reenviar código. Por favor, tenta novamente.' };
      }

      return { success: true };
    } catch (err) {
      console.error('Resend OTP error:', err);
      return { success: false, error: 'Erro inesperado. Por favor, tenta novamente.' };
    }
  };

  const login = (email: string) => {
    localStorage.setItem('marixica_auth', 'true');
    localStorage.setItem('marixica_active_user', email);
    setIsAuthenticated(true);
    
    // Ensure the users state is up to date with localStorage
    const storedUsers = localStorage.getItem('marixica_users');
    const currentUsersList = storedUsers ? JSON.parse(storedUsers) : users;
    
    const user = currentUsersList.find((u: User) => u.email === email);
    if (user) setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('marixica_auth');
    localStorage.removeItem('marixica_active_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const updateProfile = (name: string, email: string, phone: string) => {
    if (!currentUser) return;
    
    // Check if email changed and is already taken
    if (email !== currentUser.email && users.find(u => u.email === email)) {
      alert("Este email já está em uso.");
      return;
    }
    
    const updatedUser = { ...currentUser, name, email, phone };
    const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
    
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
    
    if (email !== currentUser.email) {
      localStorage.setItem('marixica_active_user', email);
    }
  };

  const updateAvatar = (url: string) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, avatar: url };
    const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: 'Utilizador não autenticado.' };
    
    // Check old password
    // Allow if old password is correct OR if the user doesn't have a password set yet (for backwards compatibility)
    if (currentUser.password && currentUser.password !== currentPassword) {
      return { success: false, error: 'A palavra-passe atual está incorreta.' };
    }
    
    // Numa aplicação real, enviaríamos o pedido para a API do Supabase aqui.
    // Exemplo: await supabase.auth.updateUser({ password })
    return new Promise(resolve => {
      setTimeout(() => {
        const updatedUser = { ...currentUser, password: newPassword };
        const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
        setUsers(updatedUsers);
        setCurrentUser(updatedUser);
        localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
        resolve({ success: true });
      }, 500); // Simulando uma chamada à API
    });
  };

  const deleteAccount = async (): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: 'Utilizador não autenticado.' };
    
    // Numa aplicação real, a API trataria disto.
    // Exemplo: await supabase.rpc('delete_user')
    try {
      const updatedUsers = users.filter(u => u.email !== currentUser.email);
      setUsers(updatedUsers);
      localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
      logout();
      return { success: true };
    } catch (err) {
      console.error('Erro ao excluir conta:', err);
      return { success: false, error: 'Erro inesperado ao excluir conta.' };
    }
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    if (!currentUser) return;
    
    const newOrder: Order = {
      ...orderData,
      id: `MRX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('pt-PT', { 
        year: 'numeric', month: 'long', day: 'numeric' 
      })
    };
    
    // Make sure orders array exists (for backwards compatibility with existing mocked users)
    const currentOrders = currentUser.orders || [];
    
    const updatedUser = { 
      ...currentUser, 
      orders: [newOrder, ...currentOrders] 
    };
    
    const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
    
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
  };

  const cancelOrder = (orderId: string) => {
    if (!currentUser) return;
    
    const currentOrders = currentUser.orders || [];
    const updatedOrders = currentOrders.map(order => 
      order.id === orderId && order.status === 'Aguardando Pagamento'
        ? { ...order, status: 'Cancelada' }
        : order
    );
    
    const updatedUser = { 
      ...currentUser, 
      orders: updatedOrders 
    };
    
    const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
    
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
  };

  const addAddress = (address: Omit<Address, 'id' | 'isDefault'>) => {
    if (!currentUser) return;

    const newAddress: Address = {
      ...address,
      id: Math.random().toString(36).substr(2, 9),
      isDefault: !(currentUser.addresses && currentUser.addresses.length > 0)
    };

    const currentAddresses = currentUser.addresses || [];
    const updatedUser = {
      ...currentUser,
      addresses: [...currentAddresses, newAddress]
    };

    const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
  };

  const removeAddress = (id: string) => {
    if (!currentUser) return;

    const currentAddresses = currentUser.addresses || [];
    const updatedAddresses = currentAddresses.filter(a => a.id !== id);

    // If we removed the default address and there are still addresses, make the first one default
    if (currentAddresses.find(a => a.id === id)?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    const updatedUser = {
      ...currentUser,
      addresses: updatedAddresses
    };

    const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
  };

  const setDefaultAddress = (id: string) => {
    if (!currentUser) return;

    const currentAddresses = currentUser.addresses || [];
    const updatedAddresses = currentAddresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));

    const updatedUser = {
      ...currentUser,
      addresses: updatedAddresses
    };

    const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
  };

  const addMessage = (messageData: Omit<Message, 'id' | 'date' | 'status'>) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      ...messageData,
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('pt-PT', { 
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      }),
      status: 'Enviada'
    };
    
    const currentMessages = currentUser.messages || [];
    
    const updatedUser = { 
      ...currentUser, 
      messages: [newMessage, ...currentMessages] 
    };
    
    const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
    
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('marixica_users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated, currentUser, users, login, registerUser, verifyUser, resendOtp,
      logout, updateProfile, updateAvatar, updatePassword, deleteAccount, addOrder, cancelOrder, addAddress, removeAddress, setDefaultAddress, addMessage
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}