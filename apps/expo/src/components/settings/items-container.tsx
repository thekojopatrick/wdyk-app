import type { TxKeyPath } from "@/core";
import React from "react";
import { Text, View } from "@/ui";

type Props = {
  children: React.ReactNode;
  title?: TxKeyPath;
};

export const ItemsContainer = ({ children, title }: Props) => {
  return (
    <>
      {title && <Text className="pb-2 pt-4 text-lg" tx={title} />}
      {<View className="">{children}</View>}
    </>
  );
};
