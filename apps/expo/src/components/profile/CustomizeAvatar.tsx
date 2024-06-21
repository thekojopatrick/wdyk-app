import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, ThemedText, View } from "@/ui";

import { avataars } from "./avataars";

const backgroundColors = [
  "#FF3B30",
  "#007AFF",
  "#34C759",
  "#FFCC00",
  "#5856D6",
];

interface CustomizeAvatarProps {
  testID?: string;
  selected: string;
  onPress: () => void;
}

const SelectedAvatar = ({
  selected,
  backgroundColor,
}: {
  selected: string;
  backgroundColor: string | null;
}) => {
  const selectedAvatar = avataars.find((avatar) =>
    avatar.value.includes(selected),
  );
  return (
    <View className="mb-6 items-center">
      <View
        style={[
          styles.selectedAvatar,
          { backgroundColor: `${backgroundColor}` },
        ]}
      >
        {selectedAvatar?.icon}
      </View>
      <ThemedText style={styles.avatarLabel}>
        {selectedAvatar?.label}
      </ThemedText>
      <ThemedText style={styles.avatarMeaning}>
        {selectedAvatar?.meaning}
      </ThemedText>
    </View>
  );
};

const CustomizeAvatar = ({ selected, onPress }: CustomizeAvatarProps) => {
  const [bgColor, setBackgroundColor] = useState<string | null>("#f0f0f0");

  return (
    <View style={styles.container}>
      <View className="gap-2 text-left">
        <ThemedText style={styles.heading}>Your avatar</ThemedText>
        <ThemedText style={styles.subheading}>
          Choose an avatar that reflects your wordy style.
        </ThemedText>
      </View>
      {selected && (
        <SelectedAvatar selected={selected} backgroundColor={bgColor} />
      )}
      <Text style={styles.label}>Choose a background color</Text>
      <View style={styles.colorContainer}>
        {backgroundColors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorOption, { backgroundColor: color }]}
            onPress={() => setBackgroundColor(color)}
          />
        ))}
      </View>

      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Rock this Avatar!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomizeAvatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  selectedAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
  },
  avatarLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  avatarMeaning: {
    fontSize: 14,
    color: "#666",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#5856D6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
