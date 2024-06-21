import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, ThemedText, View } from "@/ui";

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

const CustomizeAvatar = ({ selected, onPress }: CustomizeAvatarProps) => {
  const [bgColor, setBackgroundColor] = useState<string | null>(null);

  console.log({ bgColor });

  return (
    <View style={styles.container}>
      <ThemedText style={styles.heading}>Your avatar</ThemedText>
      <Text style={styles.subheading}>
        Choose an avatar that reflects your wordy style.
      </Text>
      {selected && (
        <View
          style={[styles.selectedAvatar, { backgroundColor: `${bgColor}` }]}
        >
          {/* Assuming selectedAvatar has the shape of AvatarOptionProps */}
          <ThemedText style={styles.avatarLabel}>{selected}</ThemedText>
        </View>
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
    padding: 20,
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
    marginBottom: 20,
  },
  avatarLabel: {
    fontSize: 18,
    fontWeight: "bold",
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
