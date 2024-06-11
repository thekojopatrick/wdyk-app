import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Button, ThemeText } from "@/ui";
import { CheckMailIcon, PrimaryLogo } from "@/ui/icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const CheckMail = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4 pb-2">
        <View className="mb-4 w-full flex-row items-center justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 p-2"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={16} />
          </Button>
          <PrimaryLogo />
        </View>
        <View className="mx-auto mb-5 mt-auto h-full max-h-[960px] w-full justify-center ">
          <View className="items-center justify-center gap-2 px-6 text-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-purple-50">
              <CheckMailIcon />
            </View>
            <ThemeText
              variant="title3"
              testID="form-title"
              className="text-center font-semibold"
            >
              We&apos;ve sent you an email with your magic link
            </ThemeText>
            <ThemeText
              variant="footnote"
              testID="form-description"
              className="text-center"
            >
              Please click on the link to verify your account and access Wdyk?
            </ThemeText>
          </View>
          <View className="my-10 w-full">
            <Link href={"(auth)/"} asChild>
              <Button label="Open mail" className="w-full" />
            </Link>
            <View className="mt-2 text-center">
              <Button variant="link" onPress={() => router.back()}>
                <ThemeText variant="callout" className="mr-2">
                  Haven't received it?
                </ThemeText>
                <ThemeText variant="callout" className="text-primary">
                  Resend
                </ThemeText>
              </Button>
            </View>
          </View>
          <View className="my-2 text-center">
            <Link href={"/(auth)/enter-otp"} asChild>
              <Button variant="link">
                <ThemeText variant="callout" className="text-primary">
                  Enter code manually
                </ThemeText>
              </Button>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckMail;

const styles = StyleSheet.create({});
