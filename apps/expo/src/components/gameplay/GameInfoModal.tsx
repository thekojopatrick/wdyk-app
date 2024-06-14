import { Button, Modal, ThemedText, useModal } from "@/ui";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";

const ListItem = ({ text }: { text: string }) => {
  return (
    <View className="flex-row items-center gap-3">
      <Ionicons name="ellipse" size={8} />
      <ThemedText variant="body">{text}</ThemedText>
    </View>
  );
};

export const GameInfoModal = ({ id }) => {
  const { ref, present, dismiss } = useModal();

  return (
    <View>
      <Button label="Open Modal" onPress={present} />

      <Modal
        snapPoints={["60%"]} // optional
        ref={ref}
      >
        <View className="h-full w-full flex-1 border border-red-300 p-4">
          <View className="mb-10">
            <View className="flex-row gap-6">
              <View className="h-24 w-24 items-center justify-center rounded-md bg-green-500 px-4 ">
                {/* <Ionicons
                name="extension-puzzle-outline"
                size={48}
                color="white"
              /> */}
                <FontAwesome6 name="puzzle-piece" size={48} color="white" />
              </View>
              <View className="items-start gap-2 text-left">
                <ThemedText variant="title2" className="font-bold">
                  Modal Content
                </ThemedText>
                <ThemedText variant="body" className="text-md">
                  Modal Content
                </ThemedText>
                <View className="items-center rounded-full bg-lime-100 px-2 py-1 ">
                  <ThemedText
                    variant="footnote"
                    className="font-semibold uppercase"
                  >
                    10 words
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-auto gap-4">
            <ThemedText variant="title2" className="font-semibold">
              How to play
            </ThemedText>
            <View className="gap-2">
              <ListItem text="Tap on the start button" />
              <ListItem text="Tap on the play button to listen to word" />
              <ListItem text="Enter the word" />
              <ListItem text="Earn a point" />
            </View>
          </View>
          <Link href={`/gameplay/${id}`} asChild>
            <Button label="Start game" className="mb-3" onPress={dismiss} />
          </Link>
        </View>
      </Modal>
    </View>
  );
};
