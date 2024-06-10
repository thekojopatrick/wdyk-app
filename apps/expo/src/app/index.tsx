import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link, Stack } from "expo-router";
import { Button } from "@/ui";

export default function Index() {
  return (
    <>
      <SafeAreaView>
        <Stack.Screen options={{ title: "Home" }} />

        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>Hello World</Text>
            <Text style={styles.subtitle}>
              This is the first page of your app.
            </Text>
            <Link href={"/onboarding"} asChild>
              <Button label="Go to Post" />
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    backgroundColor: "#38434D",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#38434D",
  },
});
