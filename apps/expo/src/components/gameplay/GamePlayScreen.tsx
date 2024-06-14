import { StyleSheet, Text, View } from "react-native";

import React from "react";
import WordPlayGame from "./WordPlayGame";

const GamePlayScreen = () => {
  return (
    <View className="h-full w-full p-4">
      <WordPlayGame />
    </View>
  );
};

export default GamePlayScreen;

const styles = StyleSheet.create({});