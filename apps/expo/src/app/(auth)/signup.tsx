import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { RegisterForm } from "@/components/auth";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import SignUpForm from "@/components/auth/register/signup-form";
import { Button } from "@/ui";
import { PrimaryLogo } from "@/ui/icons";
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4 pb-2">
        <View className="mb-4 w-full flex-row items-center justify-between">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 p-2"
            onPress={() => router.replace("/check-mail")}
          >
            <Ionicons name="arrow-back" size={16} />
          </Button>
          <PrimaryLogo />
        </View>
        {/* <RegisterForm /> */}
        <SignUpForm />
        <View className="w-full text-center">
          <GoogleAuthButton />
          <Link href={"/(auth)/login"} asChild>
            <Button variant="link">
              <Text className="pr-2">Already have an account ?</Text>
              <Text className="text-primary">Login</Text>
            </Button>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
