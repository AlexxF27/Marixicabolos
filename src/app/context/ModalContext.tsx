import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  openPrivacyModal: () => void;
  openCookiePrefsModal: () => void;
  openTermsModal: () => void;
  isPrivacyModalOpen: boolean;
  isCookiePrefsModalOpen: boolean;
  isTermsModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  setIsCookiePrefsModalOpen: (open: boolean) => void;
  setIsTermsModalOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isCookiePrefsModalOpen, setIsCookiePrefsModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const openPrivacyModal = () => setIsPrivacyModalOpen(true);
  const openCookiePrefsModal = () => setIsCookiePrefsModalOpen(true);
  const openTermsModal = () => setIsTermsModalOpen(true);

  return (
    <ModalContext.Provider
      value={{
        openPrivacyModal,
        openCookiePrefsModal,
        openTermsModal,
        isPrivacyModalOpen,
        isCookiePrefsModalOpen,
        isTermsModalOpen,
        setIsPrivacyModalOpen,
        setIsCookiePrefsModalOpen,
        setIsTermsModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within ModalProvider');
  }
  return context;
}
