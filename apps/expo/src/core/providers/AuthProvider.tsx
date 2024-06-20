import React, { useCallback, useEffect } from "react";

import { Alert } from "react-native";
import type { Profile } from "@/types";
import type { PropsWithChildren } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { useAuthStore } from "@/core/auth";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { profile, setSession, setProfile, setLoading, setUserName } =
    useAuthStore();

  // Handle fetch profile function
  const fetchProfile = useCallback(
    async (session: Session) => {
      setLoading(true);
      try {
        const { data, error, status } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setProfile(data as Profile);
          const userName = data.full_name.replace(/\s+/g, "").toLowerCase();
          setUserName(profile.username);
        }
      } catch (error) {
        Alert.alert((error as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setProfile, setUserName],
  );

  // Init fetch auth session
  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        await fetchProfile(session);
      } else {
        setLoading(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session);
      } else {
        setProfile(null);
        setUserName(null);
      }
    });

    initAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, [setSession, fetchProfile, setLoading, setProfile, setUserName]);

  return <>{children}</>;
};

export default AuthProvider;

export const useAuth = () => {
  const {
    status,
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
    status,
    session,
    profile,
    userName,
    isAdmin,
    loading,
    signIn,
    signOut,
  };
};
