"use client";

import {
  startTransition,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthSession } from "@/lib/backend/domain";
import { temporaryLocalAuthSessionService } from "@/lib/backend/services";
import AuthModal from "./AuthModal";

type AuthView = "login" | "register";

type AuthModalContextType = {
  isOpen: boolean;
  view: AuthView;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isSubmitting: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeModal: () => void;
  setView: (view: AuthView) => void;
  authenticate: (input: {
    mode: AuthView;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>("login");
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    temporaryLocalAuthSessionService.getSession().then((currentSession) => {
      if (active) {
        setSession(currentSession);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const openLogin = useCallback(() => {
    setView("login");
    setIsOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setView("register");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const authenticate = useCallback(async ({
    mode,
    email,
    password,
  }: {
    mode: AuthView;
    email: string;
    password: string;
  }) => {
    setIsSubmitting(true);

    try {
      const nextSession = await temporaryLocalAuthSessionService.authenticate({
        mode,
        email,
        password,
      });

      startTransition(() => {
        setSession(nextSession);
        setIsOpen(false);
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await temporaryLocalAuthSessionService.clearSession();
    setSession(null);
  }, []);

  const isAuthenticated = session?.status === "authenticated";

  const value = useMemo(
    () => ({
      isOpen,
      view,
      session,
      isAuthenticated,
      isSubmitting,
      openLogin,
      openRegister,
      closeModal,
      setView,
      authenticate,
      logout,
    }),
    [
      isOpen,
      view,
      session,
      isAuthenticated,
      isSubmitting,
      openLogin,
      openRegister,
      closeModal,
      authenticate,
      logout,
    ]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal must be used inside AuthModalProvider");
  }

  return context;
}
