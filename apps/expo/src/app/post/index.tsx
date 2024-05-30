import type { RouterOutputs } from "@/utils/api";
import { useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { Button, EmptyList, FocusAwareStatusBar, Text, View } from "@/ui";
import { api } from "@/utils/api";
import { FlashList } from "@shopify/flash-list";

function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
  onDelete: () => void;
}) {
  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: "/post/[id]",
            params: { id: props.post.id },
          }}
        >
          <Pressable className="">
            <Text className=" text-xl font-semibold text-primary">
              {props.post.title}
            </Text>
            <Text className="mt-2 text-foreground">{props.post.content}</Text>
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
  const utils = api.useUtils();

  const postQuery = api.post.all.useQuery();

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate().then(),
  });

  return (
    <>
      {/* Changes page title visible on the header */}
      <Stack.Screen
        options={{
          title: "Feed",
          headerRight: () => (
            <Link href="/post/add-post">
              <Text className="text-primary">Add Post</Text>
            </Link>
          ),
        }}
      />
      <View className="h-full w-full bg-background p-4">
        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          ListEmptyComponent={<EmptyList isLoading={!postQuery} />}
          renderItem={(p) => (
            <PostCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        />

        <Button
          onPress={() => void utils.post.all.invalidate()}
          label="Refresh posts"
        />
      </View>
    </>
  );
}
