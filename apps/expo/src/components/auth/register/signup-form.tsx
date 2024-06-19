import * as z from "zod";

import { Button, ControlledInput, Text, ThemedText, View } from "@/ui";

import React from "react";
import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const {
    handleSubmit,
    control,
    formState: {
      errors,
      isDirty,
      isSubmitting,
      isLoading,
      touchedFields,
      submitCount,
      isValid,
    },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log({ errors, isDirty, isLoading, isSubmitting });

    console.log(data);
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
        loading={isLoading}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({});
