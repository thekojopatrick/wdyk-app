import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Link } from "expo-router";
import { Button, ThemeText } from "@/ui";

const EnterOtpForm = () => {
  const [otp, setOTP] = useState("");

  return (
    <View>
      <View className="mb-5 gap-2">
        <ThemeText variant="title1" testID="form-title" className="font-bold">
          Enter the 6-digit code
        </ThemeText>
        <ThemeText testID="form-description" className="pb-6">
          We sent a verification code to your email
        </ThemeText>
      </View>
      <View className="mb-auto gap-4">
        <View>
          <ThemeText
            variant="subhead"
            testID="email-ID"
            className={clxStyles.label}
          >
            Enter code
          </ThemeText>
          <OtpInput
            numberOfDigits={6}
            onTextChange={setOTP}
            onFilled={setOTP}
            textInputProps={{
              accessibilityLabel: "One-Time Password",
            }}
            theme={{
              containerStyle: styles.container,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
        </View>

        <View className="mt-auto w-full gap-4 text-center">
          <Link href={"/(auth)/reset-password"} asChild>
            <Button label="Next" onPress={() => {}} />
          </Link>
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

const clxStyles = {
  label: "text-grey-100 mb-2 text-lg dark:text-neutral-100",
};

const styles = StyleSheet.create({
  container: {},
  pinCodeContainer: {},
  pinCodeText: {},
  focusStick: {
    backgroundColor: "#6229FF",
  },
  activePinCodeContainer: {
    borderColor: "#6229FF",
    backgroundColor: "rgba(106, 41, 255, 0.1)",
  },
});

export default EnterOtpForm;
