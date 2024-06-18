import type { TxKeyPath } from "@/core";
import * as React from "react";
import { Pressable, Text, View } from "@/ui";
import { ArrowRight } from "@/ui/icons";

interface ItemProps {
  text: TxKeyPath;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  showTrailingIcon?: boolean;
}

export const Item = ({
  text,
  value,
  icon,
  onPress,
  showTrailingIcon = true,
}: ItemProps) => {
  const isPressable = onPress !== undefined;
  return (
    <Pressable
      onPress={onPress}
      pointerEvents={isPressable ? "auto" : "none"}
      className="flex-1 flex-row items-center justify-between py-2"
    >
      <View className="flex-row items-center">
        {icon && <View className="pr-2">{icon}</View>}
        <Text tx={text} />
      </View>
      <View className="flex-row items-center">
        <Text className="text-neutral-600 dark:text-white">{value}</Text>
        {showTrailingIcon && (
          <View className="pl-2">
            <ArrowRight />
          </View>
        )}
      </View>
    </Pressable>
  );
};
