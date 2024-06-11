import { Button, ThemeText } from "@/ui";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

import { Link } from "expo-router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <View className="mb-5 gap-2">
        <ThemeText variant="title1" testID="form-title" className="font-bold">
          Welcome back!
        </ThemeText>
        <ThemeText testID="form-description" className="pb-6">
          Login to continue your wordy adventure
        </ThemeText>
      </View>
      <View className="mb-auto gap-4">
        <View>
          <ThemeText
            variant="subhead"
            testID="email-ID"
            className={styles.label}
          >
            Email
          </ThemeText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Your email address"
            className={styles.input}
            autoCapitalize="none"
          />
        </View>

        <View className="mb-3">
          <ThemeText
            variant="subhead"
            testID="email-ID"
            className={styles.label}
          >
            Password
          </ThemeText>
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
          <Link
            replace
            href={{ pathname: "/(tabs)/", params: { name: "Kojo" } }}
            asChild
          >
            <Button label="Continue" onPress={() => {}} />
          </Link>
        </View>
        <View className="my-2 text-center">
          <Link href="/(auth)/forgot-password" asChild>
            <ThemeText
              variant="subhead"
              className="text-primary-600 text-center font-medium"
            >
              Forgotten Password?
            </ThemeText>
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
