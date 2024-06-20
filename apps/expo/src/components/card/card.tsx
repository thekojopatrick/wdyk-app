import type { Post } from "@/api";
import React from "react";
import { images } from "@/api/dummyData";
import { Button, Image, Pressable, Text, View } from "@/ui";
import { Ionicons } from "@expo/vector-icons";

type Props = Post;

export const Card = ({ title, body, id }: Props) => {
  return (
    <>
      <Pressable>
        <View className="m-2 min-h-80 items-center justify-center overflow-hidden rounded-xl  border border-neutral-300">
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
              className="text-center leading-snug text-gray-600 dark:text-white"
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
    </>
  );
};
