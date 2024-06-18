import { Alert, AppState, TextInput, View } from "react-native";
import { Button, ThemedText } from "@/ui";
import React, { useState } from "react";

import { Link } from "expo-router";
import { supabase } from "@/utils/supabase";
import useAuth from "@/core/auth";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { status, signIn, signOut } = useAuth();

  async function signInWithEmail() {
    setLoading(true);
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
    signIn(session?.access_token);
  }

  return (
    <View>
      <View className="mb-5 gap-2">
        <ThemedText variant="title1" testID="form-title" className="font-bold">
          Welcome back!
        </ThemedText>
        <ThemedText testID="form-description" className="pb-6">
          Login to continue your wordy adventure
        </ThemedText>
      </View>
      <View className="mb-auto gap-4">
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

        <View className="mb-3">
          <ThemedText
            variant="subhead"
            testID="email-ID"
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
        <View className="mt-auto w-full gap-4 text-center">
          <Button
            label="Continue"
            loading={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
        <View className="my-2 text-center">
          <Link href="/(auth)/forgot-password" asChild>
            <ThemedText
              variant="subhead"
              className="text-primary-600 text-center font-medium"
            >
              Forgotten Password?
            </ThemedText>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = {
  label: "text-grey-100 mb-2 text-lg dark:text-neutral-100",
  input:
    "mt-0 py-4 rounded-xl border-[0.1px] border-neutral-300 bg-neutral-100 px-4 text-base  font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
};

export default LoginForm;
