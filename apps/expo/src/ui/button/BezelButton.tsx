import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BezelButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.buttonContainer}
    >
      <View style={styles.bezel}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "auto",
    flex: 1,
    //margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bezel: {
    backgroundColor: "purple",
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
  },
});

export default BezelButton;
