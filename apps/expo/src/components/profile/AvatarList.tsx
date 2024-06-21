import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { avataars } from "./avataars";

export interface AvatarOptionProps {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
  onPress: (value: string) => void;
  selectedValue: string;
  testID?: string;
}

const AvatarOption = ({
  label,
  icon,
  value,
  onPress,
  selectedValue,
  testID,
  id,
}: AvatarOptionProps) => {
  const handlePress = useCallback(() => {
    onPress(value);
  }, [onPress, value]);

  return (
    <TouchableOpacity
      id={`${id}`}
      style={[
        styles.avatarOption,
        selectedValue === value && styles.avatarOptionSelected,
      ]}
      onPress={handlePress}
      testID={testID}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const AvatarList = ({
  selectedValue,
  onAvatarPress,
}: {
  selectedValue: string;
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
        onPress={onAvatarPress}
        selectedValue={selectedValue}
        testID={`select-avatar-item-${item.value}`}
      />
    ),
    [onAvatarPress, selectedValue],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={avataars}
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
    borderColor: "red",
    borderWidth: 2,
  },
  iconContainer: {
    marginBottom: 5,
  },
});
