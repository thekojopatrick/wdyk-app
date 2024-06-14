import type { Post } from "@/api";
import React from "react";
import { Link } from "expo-router";
import { Button, Image, Pressable, Text, View } from "@/ui";
import { Ionicons } from "@expo/vector-icons";

type Props = Post;

const images = [
  "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515386474292-47555758ef2e?auto=format&fit=crop&w=800&q=80",
  "https://plus.unsplash.com/premium_photo-1666815503002-5f07a44ac8fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80",
];

export const Card = ({ title, body, id }: Props) => {
  return (
    <Link href={`/gameplay/${id}`} asChild>
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
    </Link>
  );
};
