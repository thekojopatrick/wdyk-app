import { Button, ThemeText } from "@/ui";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

import { Link } from "expo-router";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View>
      <View className="mb-5 gap-2">
        <ThemeText variant="title1" testID="form-title" className="font-bold">
          Set up a new password?
        </ThemeText>
        <ThemeText testID="form-description" className="pb-6">
          No problem, we&apos;ll send instructions to your inbox to reset your
          password.
        </ThemeText>
      </View>
      <View className="mb-auto gap-4">
        <View className="mb-3">
          <ThemeText
            variant="subhead"
            testID="new-password-ID"
            className={styles.label}
          >
            New Password
          </ThemeText>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            className={styles.input}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <View className="mb-3">
          <ThemeText
            variant="subhead"
            testID="confirm-password-ID"
            className={styles.label}
          >
            Confirm Password
          </ThemeText>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            className={styles.input}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <View className="mt-auto w-full gap-4 text-center">
          <Link
            replace
            href={{ pathname: "/(app)/", params: { name: "Kojo" } }}
            asChild
          >
            <Button label="Continue" onPress={() => {}} />
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

export default ResetPasswordForm;
