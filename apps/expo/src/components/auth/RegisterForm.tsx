import React, { useState } from "react";
import { Alert, AppState, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Button, Checkbox, Text, ThemedText } from "@/ui";
import { supabase } from "@/utils/supabase";

// AppState management to handle auto-refreshing of the auth state
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    void supabase.auth.startAutoRefresh();
  } else {
    void supabase.auth.stopAutoRefresh();
  }
});

// Custom hook to manage auth state
// const useAuthState = () => {
//   const { signIn, session } = useAuth();
//   return { signIn, session };
// };

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle user sign-up
  const signUpWithEmail = async () => {
    // if (!checked) {
    //   Alert.alert("Please agree to terms and conditions first!");
    //   return;
    // }

    setLoading(true);

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!session) {
        router.push("/(auth)/check-mail");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <View className="mb-2 gap-2">
        <ThemedText variant="title1" testID="form-title" className="font-bold">
          Sign up
        </ThemedText>
        <Text testID="form-title" className="w-[80%] pb-6 text-gray-600">
          Create an your account to start your word adventure. it's quick and
          easy.
        </Text>
      </View>
      <View className="mb-4 gap-4">
        <View>
          <ThemedText
            variant="subhead"
            testID="email-ID"
            className={styles.label}
          >
            Name
          </ThemedText>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            className={styles.input}
            autoCapitalize="none"
          />
        </View>
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
        <View>
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
        <View className="mt-2 hidden">
          <Checkbox
            checked={checked}
            onChange={setChecked}
            accessibilityLabel={"Agree to terms"}
            label="By signing up,you agree to our Terms of services and Privacy Policy"
          />
        </View>
      </View>
      <Button
        className=""
        loading={loading}
        label="Sign up"
        onPress={signUpWithEmail}
      />
    </View>
  );
};

const styles = {
  label: "text-grey-100 mb-2 text-lg dark:text-neutral-100",
  input: `mt-0 py-4 rounded-xl border-[0.1px] border-neutral-300 bg-neutral-100 px-4 text-base 
    font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white`,
};

export default RegisterForm;
