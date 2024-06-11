import type { Post } from "@/api";
import React from "react";
import { EmptyList, FocusAwareStatusBar, Text, View } from "@/ui";
import { FlashList } from "@shopify/flash-list";

export default function Home() {
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
    </View>
  );
}
