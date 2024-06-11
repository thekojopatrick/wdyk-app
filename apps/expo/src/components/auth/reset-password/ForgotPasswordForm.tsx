import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Link } from "expo-router";
import { Button, ThemedText } from "@/ui";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  return (
    <View>
      <View className="mb-5 gap-2">
        <ThemedText variant="title1" testID="form-title" className="font-bold">
          Forgotten your password?
        </ThemedText>
        <ThemedText testID="form-description" className="pb-6">
          No problem, we’ll send instructions to your inbox to reset your
          password.
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

        <View className="mt-auto w-full gap-4 text-center">
          <Link href={"/(auth)/check-mail"} asChild>
            <Button label="Send mail" onPress={() => {}} />
          </Link>
        </View>

        <View className="my-2 text-center">
          <Button variant="link">
            <ThemedText variant="callout" className="mr-2">
              Haven't received it?
            </ThemedText>
            <ThemedText variant="callout" className="text-primary">
              Resend
            </ThemedText>
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
