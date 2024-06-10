import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { router } from "expo-router";
import { Button, Checkbox, Text, ThemeText } from "@/ui";

import { styles } from "./LoginForm";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="flex-1">
      <View className="mb-2 gap-2">
        <ThemeText variant="title1" testID="form-title" className="font-bold">
          Sign up
        </ThemeText>
        <Text testID="form-title" className="w-[80%] pb-6 text-gray-600">
          Create an your account to start your word adventure. it's quick and
          easy.
        </Text>
      </View>
      <View className="mb-4 gap-4">
        <View>
          <ThemeText
            variant="subhead"
            testID="email-ID"
            className={styles.label}
          >
            Name
          </ThemeText>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            className={styles.input}
            autoCapitalize="none"
          />
        </View>
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
        <View>
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
        <View className="mt-2">
          <Checkbox
            onChange={() => {}}
            accessibilityLabel={"Agree to terms"}
            label="By signing up,you agree to our Terms of services and Privacy Policy"
          />
        </View>
      </View>
      <Button
        className=""
        label="Sign up"
        onPress={() => router.push("/account-status")}
      />
    </View>
  );
};

export default RegisterForm;
