import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { CookieProvider } from './context/CookieContext';
import { ModalProvider } from './context/ModalContext';
import { CartProvider } from './context/CartContext';
import { ReviewProvider } from './context/ReviewContext';

export default function App() {
  return (
    <AuthProvider>
      <CookieProvider>
        <ModalProvider>
          <CartProvider>
            <ReviewProvider>
              <RouterProvider router={router} />
            </ReviewProvider>
          </CartProvider>
        </ModalProvider>
      </CookieProvider>
    </AuthProvider>
  );
}