import type { RouterOutputs } from "@/utils/api";
import { useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { Button, EmptyList, FocusAwareStatusBar, Text, View } from "@/ui";
import { api } from "@/utils/api";
import { FlashList } from "@shopify/flash-list";

function GameplayCard(props: {
  Gameplay: RouterOutputs["Gameplay"]["all"][number];
  onDelete: () => void;
}) {
  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/Gameplay/[id]",
            params: { id: props.Gameplay.id },
          }}
        >
          <Pressable className="">
            <Text className=" text-xl font-semibold text-primary">
              {props.Gameplay.title}
            </Text>
            <Text className="mt-2 text-foreground">
              {props.Gameplay.content}
            </Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className="font-bold uppercase text-primary">Delete</Text>
      </Pressable>
    </View>
  );
}

export default function Index() {
  return (
    <>
      {/* Changes page title visible on the header */}
      <Stack.Screen
        options={{
          title: "Feed",
          headerRight: () => (
            <Link href="/Gameplay/add-Gameplay">
              <Text className="text-primary">Add Gameplay</Text>
            </Link>
          ),
        }}
      />
      <View className="h-full w-full bg-background p-4">
        {/* <FlashList
          data={}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          ListEmptyComponent={<EmptyList isLoading={} />}
          renderItem={(p) => (
            <GameplayCard
              Gameplay={p.item}
              onDelete={() => {}}
            />
          )}
        /> */}

        <Button onPress={() => {}} label="Refresh Gameplays" />
      </View>
    </>
  );
}
