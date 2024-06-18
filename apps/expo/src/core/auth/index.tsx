import { getToken, removeToken, setToken } from "./utils";
import { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import type { TokenType } from "./utils";
import { create } from "zustand";
import { supabase } from "@/utils/supabase";

interface AuthState {
  token: TokenType | null;
  status: "idle" | "signOut" | "signIn";
  signIn: (token: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  status: "idle",
  signIn: (token) => {
    setToken(token);
    set({ status: "signIn", token });
  },
  signOut: () => {
    removeToken();
    supabase.auth.signOut();
    set({ status: "signOut", token: null });
  },
  hydrate: () => {
    const userToken = getToken();
    if (userToken) {
      get().signIn(userToken);
    } else {
      get().signOut();
    }
  },
}));

const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { hydrate, signIn, signOut, status, token } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    void supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setLoading(false);
        setToken(session.access_token);
        signIn(session.access_token as TokenType);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setLoading(false);
          setToken(session.access_token);
          signIn(session.access_token as TokenType);
        } else {
          removeToken();
          signOut();
        }

        setSession(session);
      },
    );

    hydrate();
    setLoading(false);

    return () => {
      listener.subscription.unsubscribe;
    };
  }, [hydrate, signIn, signOut, loading]);

  return {
    loading,
    session,
    status,
    token,
    signIn,
    signOut,
  };
};

export default useAuth;
