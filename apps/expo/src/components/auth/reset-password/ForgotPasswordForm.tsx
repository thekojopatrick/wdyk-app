import { Button, ThemeText } from "@/ui";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { Link } from "expo-router";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  return (
    <View>
      <View className="mb-5 gap-2">
        <ThemeText variant="title1" testID="form-title" className="font-bold">
          Forgotten your password?
        </ThemeText>
        <ThemeText testID="form-description" className="pb-6">
          No problem, we’ll send instructions to your inbox to reset your
          password.
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

        <View className="mt-auto w-full gap-4 text-center">
          <Button label="Send mail" onPress={() => {}} />
        </View>

        <View className="my-2 text-center">
          <Button variant="link">
            <ThemeText variant="callout" className="mr-2">
              Haven't received it?
            </ThemeText>
            <ThemeText variant="callout" className="text-primary">
              Resend
            </ThemeText>
          </Button>
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

export default ForgotPasswordForm;
