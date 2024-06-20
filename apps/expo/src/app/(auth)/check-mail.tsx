import { Alert, Linking, StyleSheet, View } from "react-native";
import { Button, SafeAreaView, ThemedText } from "@/ui";
import { CheckMailIcon, PrimaryLogo } from "@/ui/icons";
import { Link, useRouter } from "expo-router";
import React, { useCallback } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { openInbox } from "react-native-email-link";

const CheckMail = () => {
  const router = useRouter();

  // const openMail = useCallback(async () => {
  //   // Checking if the link is supported for links with custom URL scheme.
  //   const supported = await Linking.canOpenURL("googlegmail://");

  //   if (supported) {
  //     // Opening the link with some app, if the URL scheme is "http" the web link should be opened
  //     // by some browser in the mobile
  //     await Linking.openURL("googlemail://");
  //   } else {
  //     Alert.alert(`Don't know how to open this URL: ${"googlegmail://"}`);
  //   }
  // }, []);

  const openMail = useCallback(async () => {
    try {
      await openInbox();
    } catch (error) {
      console.log({ error });

      Alert.alert(`No email apps available`);
    }
  }, []);

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
            <ThemedText
              variant="title3"
              testID="form-title"
              className="text-center font-semibold"
            >
              We&apos;ve sent you an email with your magic link
            </ThemedText>
            <ThemedText
              variant="footnote"
              testID="form-description"
              className="text-center"
            >
              Please click on the link to verify your account and access Wdyk?
            </ThemedText>
          </View>
          <View className="my-10 w-full">
            <>
              <Button label="Open mail" className="w-full" onPress={openMail} />
            </>
            <View className="mt-2 hidden text-center">
              <Button variant="link" onPress={() => router.back()}>
                <ThemedText variant="callout" className="mr-2">
                  Haven't received it?
                </ThemedText>
                <ThemedText variant="callout" className="text-primary">
                  Resend
                </ThemedText>
              </Button>
            </View>
          </View>
          <View className="my-2 text-center">
            <Link href={"/(auth)/login"} asChild>
              <Button variant="link">
                <ThemedText
                  variant="callout"
                  className="text-primary dark:text-white"
                >
                  Continue to login
                </ThemedText>
              </Button>
            </Link>
          </View>
          <View className="my-2 hidden text-center">
            <Link href={"/(auth)/enter-otp"} asChild>
              <Button variant="link">
                <ThemedText variant="callout" className="text-primary">
                  Enter code manually
                </ThemedText>
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
