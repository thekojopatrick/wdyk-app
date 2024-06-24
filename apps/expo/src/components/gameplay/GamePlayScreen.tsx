import React from "react";
import { View } from "react-native";

import WordPlayGame from "./WordPlayGame";

//TODO:Draft and load sample questions
//TODO:Generate questions from Gemini API
//TODO:Implement scoring system
//TODO:Implement time limit
//TODO:Implement game over screen
//TODO:Implement game restart
//TODO:Implement game pause and resume
//TODO:Implement game exit
//TODO:Implement game settings
//TODO:Implement game info
//TODO:Implement game start

const GamePlayScreen = () => {
  return (
    <View className={styles.container}>
      <WordPlayGame />
    </View>
  );
};

export default GamePlayScreen;

const styles = {
  container: "h-full w-full p-4",
};
