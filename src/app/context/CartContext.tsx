import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CustomizationOptions {
  base?: string;
  flavor?: string;
  filling?: string;
  frosting?: string;
  size?: string;
  message?: string;
  extras?: string[];
  referenceImage?: string; // Data URL da imagem de referência
  referenceImageName?: string; // Nome do ficheiro
  eventDate?: string;
  eventTime?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: CustomizationOptions;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, customization?: CustomizationOptions, quantity?: number) => void;
  removeFromCart: (productId: number, customization?: CustomizationOptions) => void;
  updateQuantity: (productId: number, quantity: number, customization?: CustomizationOptions) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isUpsellOpen: boolean;
  upsellProduct: Product | null;
  openUpsell: (product: Product) => void;
  closeUpsell: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [upsellProduct, setUpsellProduct] = useState<Product | null>(null);

  const isSameCustomization = (a?: CustomizationOptions, b?: CustomizationOptions): boolean => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const addToCart = (product: Product, customization?: CustomizationOptions, quantityToAdd: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        item => item.product.id === product.id && isSameCustomization(item.customization, customization)
      );
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id && isSameCustomization(item.customization, customization)
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      
      return [...currentItems, { product, quantity: quantityToAdd, customization }];
    });
  };

  const removeFromCart = (productId: number, customization?: CustomizationOptions) => {
    setItems((currentItems) => 
      currentItems.filter(item => 
        !(item.product.id === productId && isSameCustomization(item.customization, customization))
      )
    );
  };

  const updateQuantity = (productId: number, quantity: number, customization?: CustomizationOptions) => {
    if (quantity <= 0) {
      removeFromCart(productId, customization);
      return;
    }
    
    setItems((currentItems) =>
      currentItems.map(item =>
        item.product.id === productId && isSameCustomization(item.customization, customization)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openUpsell = (product: Product) => {
    setUpsellProduct(product);
    setIsUpsellOpen(true);
  };

  const closeUpsell = () => {
    setIsUpsellOpen(false);
    setTimeout(() => setUpsellProduct(null), 300); // delay cleanup for animation
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        isCartOpen,
        openCart,
        closeCart,
        isUpsellOpen,
        upsellProduct,
        openUpsell,
        closeUpsell,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}