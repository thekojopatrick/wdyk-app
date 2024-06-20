import { Alert, AppState, TextInput } from "react-native";
import { Button, ThemedText, View } from "@/ui";
import React, { useState } from "react";

import { Link } from "expo-router";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/core/providers";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const useAuthState = () => {
  const { signIn } = useAuth();
  return { signIn };
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuthState();

  const signInWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    if (session) {
      signIn({ access: session.access_token, refresh: session.refresh_token });
    }

    setLoading(false);
  };

  return (
    <>
      <View className={styles.header}>
        <ThemedText
          variant="title1"
          testID="form-title"
          className={styles.title}
        >
          Welcome back!
        </ThemedText>
        <ThemedText testID="form-description" className={styles.description}>
          Login to continue your wordy adventure
        </ThemedText>
      </View>
      <View className={styles.form}>
        <View>
          <ThemedText
            variant="subhead"
            testID="email-ID"
            className={styles.label}
          >
            Email
          </ThemedText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Your email address"
            className={styles.input}
            autoCapitalize="none"
          />
        </View>
        <View className={styles.passwordContainer}>
          <ThemedText
            variant="subhead"
            testID="password-ID"
            className={styles.label}
          >
            Password
          </ThemedText>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            className={styles.input}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <View className={styles.buttonContainer}>
          <Button
            label="Continue"
            loading={loading}
            onPress={signInWithEmail}
          />
        </View>
        <View className={styles.forgotPasswordContainer}>
          <Link href="/(auth)/forgot-password" asChild>
            <ThemedText variant="subhead" className={styles.forgotPasswordText}>
              Forgotten Password?
            </ThemedText>
          </Link>
        </View>
      </View>
    </>
  );
};

const styles = {
  header: "mb-4 gap-2",
  title: "font-bold",
  description: "pb-6",
  form: "mb-auto gap-4",
  label: "text-grey-100 mb-2 text-lg dark:text-neutral-100",
  input:
    "mt-0 py-4 rounded-xl border-[0.1px] border-neutral-300 bg-neutral-100 px-4 text-base  font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
  passwordContainer: "mb-3",
  buttonContainer: "mt-auto w-full gap-4 text-center",
  forgotPasswordContainer: "my-2 text-center",
  forgotPasswordText:
    "text-primary-600 text-center font-medium dark:text-white",
};

export default LoginForm;
