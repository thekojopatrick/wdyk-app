import type { Session } from "@supabase/supabase-js";
import type { PropsWithChildren } from "react";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useAuthStore } from "@/core/auth";
import { supabase } from "@/utils/supabase";

export default function AuthProvider({ children }: PropsWithChildren) {
  const {
    session,
    profile,
    loading,
    userName,
    isAdmin,
    setSession,
    setProfile,
    setLoading,
    setUserName,
    setIsAdmin,
  } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        await fetchProfile(session);
      }

      setLoading(false);

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session) {
          fetchProfile(session);
        } else {
          setProfile(null);
          setUserName(null);
          //setIsAdmin(false);
        }
      });
    };

    initAuth();
  }, [setSession, setProfile, setLoading, setUserName, setIsAdmin]);

  const fetchProfile = async (session: Session) => {
    setLoading(true);
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setProfile(data);
        const userName = data.full_name.replace(/\s+/g, "").toLowerCase();
        setUserName(userName);
        // setIsAdmin(data.role === "ADMIN");
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return <>{children}</>;
}

export const useAuth = () => {
  const {
    session,
    profile,
    userName,
    isAdmin,
    loading,
    signIn,
    signOut,
    hydrate,
  } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return {
    session,
    profile,
    userName,
    isAdmin,
    loading,
    signIn,
    signOut,
  };
};
