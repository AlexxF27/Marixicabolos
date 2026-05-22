import { Outlet } from 'react-router';
import { Cart } from './Cart';
import { UpsellDrawer } from './UpsellDrawer';
import { ScrollToTop } from './ScrollToTop';
import { CookieBanner } from './CookieBanner';
import { CookiePreferencesModal } from './CookiePreferencesModal';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsModal } from './TermsModal';
import { useModals } from '../context/ModalContext';

export function RootLayout() {
  const {
    isPrivacyModalOpen,
    setIsPrivacyModalOpen,
    isCookiePrefsModalOpen,
    setIsCookiePrefsModalOpen,
    isTermsModalOpen,
    setIsTermsModalOpen,
  } = useModals();

  return (
    <>
      <ScrollToTop />
      <Outlet />
      <Cart />
      <UpsellDrawer />
      <CookieBanner
        onOpenPreferences={() => setIsCookiePrefsModalOpen(true)}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
      />
      <CookiePreferencesModal
        open={isCookiePrefsModalOpen}
        onOpenChange={setIsCookiePrefsModalOpen}
      />
      <PrivacyPolicyModal
        open={isPrivacyModalOpen}
        onOpenChange={setIsPrivacyModalOpen}
        onOpenCookies={() => setIsCookiePrefsModalOpen(true)}
      />
      <TermsModal
        open={isTermsModalOpen}
        onOpenChange={setIsTermsModalOpen}
      />
    </>
  );
}