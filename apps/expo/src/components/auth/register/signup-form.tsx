import React, { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button, ControlledInput, Text, ThemedText, View } from "@/ui";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Provide a vaild email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

type FormType = z.infer<typeof schema>;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, isLoading, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  // Function to handle user sign-up
  const signUpWithEmail = async ({ email, password, name }: FormType) => {
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
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormType) => {
    console.log({ data });
    if (isDirty && !isSubmitting) {
      await signUpWithEmail(data);
    }
  };

  return (
    <View className={styles.container}>
      <View className={styles.titleHeaderContainer}>
        <ThemedText
          variant="title1"
          testID="form-title"
          className={styles.title}
        >
          Sign up
        </ThemedText>
        <Text testID="form-title" className={styles.description}>
          Create an your account to start your word adventure. it's quick and
          easy.
        </Text>
      </View>

      <ControlledInput
        testID="name"
        control={control}
        name="name"
        label="Full name"
        placeholder="What's your full name?"
      />

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
        placeholder="What's your email?"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="Choose a password"
        secureTextEntry={true}
      />
      <Button
        testID="login-button"
        label="Sign up"
        loading={loading || isLoading || isSubmitting}
        disabled={!isValid || isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default SignUpForm;

const styles = {
  container: `flex-1`,
  titleHeaderContainer: `mb-4 gap-2`,
  title: `font-bold`,
  description: `w-[90%] text-gray-600`,
};
