import React from "react";
import { images } from "@/api/dummyData";
import { Image, Text, View } from "@/ui";
import { Ionicons } from "@expo/vector-icons";

interface ChallengeGameCardProps {
  title: string;
  body: string;
  image?: string;
  buttonText?: string;
  buttonAction?: () => void;
}

const ChallengeCard: React.FC<ChallengeGameCardProps> = ({ title, body }) => {
  return (
    <>
      <View className={styles.container}>
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
          <View className="mt-6 h-8 flex-row items-center justify-center gap-2 rounded-md bg-primary px-3 text-white">
            <Ionicons name="play" color={"white"} />
            <Text className="text-white">Play now</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ChallengeCard;

const styles = {
  container: `m-2 min-h-80 items-center justify-center overflow-hidden rounded-xl border border-neutral-300`,
};
