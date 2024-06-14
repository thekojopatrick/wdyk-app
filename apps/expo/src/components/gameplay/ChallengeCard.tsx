import { Button, Image } from "@/ui";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { images } from "@/api/dummyData";

interface ChallengeGameCardProps {
  title: string;
  body: string;
  image?: string;
  buttonText?: string;
  buttonAction?: () => void;
}

const ChallengeCard: React.FC<ChallengeGameCardProps> = ({ title, body }) => {
  return (
    <Pressable>
      <View className="m-2 min-h-80 items-center justify-center overflow-hidden rounded-xl  border border-neutral-300 bg-white  dark:bg-neutral-900">
        <Image
          className="h-56 w-full overflow-hidden rounded-t-xl"
          contentFit="cover"
          source={{
            uri: images[Math.floor(Math.random() * images.length)],
          }}
        />

        <View className="items-center p-4 text-center">
          <Text className="py-3 text-center text-2xl">{title}</Text>
          <Text
            numberOfLines={3}
            className="text-center leading-snug text-gray-600"
          >
            {body}
          </Text>
          <Button variant="default" size="sm" className="mt-6 gap-2">
            <Ionicons name="play" color={"white"} />
            <Text className="text-white">Play now</Text>
          </Button>
        </View>
      </View>
    </Pressable>
  );
};

export default ChallengeCard;

const styles = StyleSheet.create({});
