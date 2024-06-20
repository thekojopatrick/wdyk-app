import type { Profile } from "@/types";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { create } from "zustand";

import type { TokenType } from "./utils";
import { getToken, removeToken, setToken } from "./utils";

interface AuthState {
  session: Session | null;
  token: TokenType | null;
  status: "idle" | "signOut" | "signIn";
  profile: Profile | null;
  userName: string | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (token: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  setUserName: (userName: string | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  token: null,
  status: "idle",
  profile: null,
  userName: null,
  isAdmin: false,
  loading: true,
  signIn: (token) => {
    void setToken(token);
    set({ status: "signIn", token });
  },
  signOut: () => {
    void removeToken();
    void supabase.auth.signOut();
    set({ status: "signOut", token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      get().signOut();
    }
  },
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setUserName: (userName) => set({ userName }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));
