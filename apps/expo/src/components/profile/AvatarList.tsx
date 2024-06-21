import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/theme";

import { avataars } from "./avataars";

export interface AvatarOptionProps {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
  meaning?: string; // Added meaning property
  onPress: (value: string) => void;
  selected?: string;
  testID?: string;
}

const AvatarOption = ({
  label,
  icon,
  value,
  onPress,
  testID,
  id,
  selected,
}: AvatarOptionProps) => {
  const handlePress = useCallback(() => {
    onPress(value);
  }, [onPress, value]);

  return (
    <TouchableOpacity
      id={`${id}`}
      style={[
        styles.avatarOption,
        selected === value && styles.avatarOptionSelected,
      ]}
      onPress={handlePress}
      testID={testID}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.avatarLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const AvatarList = ({
  selectedAvatar,
  onAvatarPress,
}: {
  selectedAvatar: string;
  onAvatarPress: (value: string) => void;
}) => {
  const renderSelectItem = useCallback(
    ({ item }: { item: AvatarOptionProps }) => (
      <AvatarOption
        key={`select-avatar-item-${item.value}`}
        id={item.id}
        label={item.label}
        value={item.value}
        icon={item.icon}
        meaning={item.meaning}
        onPress={onAvatarPress}
        selected={selectedAvatar}
        testID={`select-avatar-item-${item.value}`}
      />
    ),
    [onAvatarPress, selectedAvatar],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={avataars.map((avatar) => ({
          ...avatar,
          onPress: onAvatarPress,
        }))}
        keyExtractor={(item) => `select-avatar-item-${item.value}`}
        renderItem={renderSelectItem}
        numColumns={3}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
};

export default AvatarList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  avatarOption: {
    height: 100,
    width: 100,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  avatarOptionSelected: {
    borderColor: colors.primary[400],
    borderWidth: 1.5,
  },
  iconContainer: {
    marginBottom: 5,
  },
  avatarLabel: {
    fontSize: 10,
    textAlign: "center",
  },
});
