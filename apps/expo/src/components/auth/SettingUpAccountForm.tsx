import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Link } from "expo-router";
import { Button, ThemeText } from "@/ui";

import { SelectCountryBottomSheet } from "./SelectCountryModal";

const SettingUpAccountForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <View className="mb-5 gap-2">
        <ThemeText variant="title1" testID="form-title" className="font-bold">
          Tell us about yourself
        </ThemeText>
        <ThemeText testID="form-description" className="pb-6">
          Share some details to personalize your wordy journey.
        </ThemeText>
      </View>
      <View className="mb-auto gap-4">
        <View>
          <ThemeText
            variant="subhead"
            testID="email-ID"
            className={styles.label}
          >
            Country of residence
          </ThemeText>
          <SelectCountryBottomSheet placeholder="Select country of residence" />
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
            href={{ pathname: "/(app)/", params: { name: "Kojo" } }}
            asChild
          >
            <Button label="Continue" onPress={() => {}} />
          </Link>
        </View>
        <View className="my-2 text-center">
          <Link href="/modal" asChild>
            <ThemeText
              variant="subhead"
              className="text-primary-600 text-center font-medium"
            >
              Maybe later
            </ThemeText>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = {
  label: "text-grey-100 mb-2 text-lg dark:text-neutral-100",
  input: `mt-0 py-4 rounded-xl border-[0.1px] border-neutral-300 bg-neutral-100 
  px-4 text-base font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white`,
};

export default SettingUpAccountForm;
