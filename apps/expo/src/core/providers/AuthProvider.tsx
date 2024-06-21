import type { Profile } from "@/types";
import type { Session } from "@supabase/supabase-js";
import type { PropsWithChildren } from "react";
import React, { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { useAuthStore } from "@/core/auth";
import { supabase } from "@/utils/supabase";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { setSession, setProfile, setLoading, setUserName } = useAuthStore();

  // Handle fetch profile function
  const fetchProfile = useCallback(
    async (session: Session) => {
      setLoading(true);
      try {
        const {
          data: profile,
          error,
          status,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single<Profile>();

        if (error && status !== 406) {
          throw error;
        }

        if (profile) {
          //const profile = data;
          setProfile(profile);
          setUserName(profile.username ?? null);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
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
        void fetchProfile(session);
      }
    });

    void initAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
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
    setUserName,
    setProfile,
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
    setUserName,
    setProfile,
  };
};
