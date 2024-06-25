import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";
import { colors } from "@/theme";
import { Button, Input, ThemedText } from "@/ui";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export interface WordProps {
  word: string;
  origin: string;
  definition: string;
  partOfSpeech: string;
  difficulty: string;
}

interface WordPlayGameProps {
  data: WordProps[];
}

const WordMeaning: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <View>
    <ThemedText variant="subhead" className="font-semibold">
      {title}
    </ThemedText>
    <ThemedText variant="body" className="text-md">
      {content}
    </ThemedText>
  </View>
);

const FAB: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <View className="absolute bottom-[125px] right-4">
    <Button
      size="icon"
      className="h-12 w-12 items-center justify-center pl-3 pr-2"
      style={{ backgroundColor: colors.secondary[400] }}
      onPress={onPress}
    >
      <FontAwesome5 name="play" size={18} color="black" />
    </Button>
  </View>
);

const WordPlayGame: React.FC<WordPlayGameProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [userScore, setUserScore] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [showWord, setShowWord] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const currentQuestion = data[currentIndex];
  const { word, origin, partOfSpeech, definition } = currentQuestion;

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  const handleTextChange = (text: string) => {
    const inputWord = text.trim().toLowerCase();
    const comparedWord = word.toLowerCase();
    setUserInput(text);

    if (inputWord === comparedWord) {
      setCorrectState(true);
    } else {
      setIsCorrect(false);
      setShowWord(false);
      setShowNextButton(false);

      if (inputWord.length > comparedWord.length) {
        startTimeout();
      } else {
        clearTimeout(timer);
      }
    }
  };

  const setCorrectState = (isCorrect: boolean) => {
    setIsCorrect(isCorrect);
    setShowNextButton(true);
    setShowWord(true);
    setIsInputDisabled(true);
    if (isCorrect) setUserScore(userScore + 1);
  };

  const startTimeout = () => {
    const timerId = setTimeout(() => {
      if (userInput.trim() !== "") {
        setCorrectState(false);
        Vibration.vibrate();
      }
    }, 5000);
    setTimer(timerId);
  };

  const handleNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
    resetState();
  };

  const resetState = () => {
    setShowNextButton(false);
    setShowWord(false);
    setIsInputDisabled(false);
    setUserInput("");
    setStartTime(Date.now());
    setIsCorrect(null);
  };

  return (
    <>
      <View className="rounded-md bg-white p-4">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="items-center justify-center rounded-sm bg-purple-100 px-3 py-2">
            <ThemedText className="font-semibold text-primary">
              W{currentIndex + 1}
            </ThemedText>
          </View>
          <ThemedText variant="subhead">00:15</ThemedText>
        </View>
        <View className="mb-4 gap-2">
          <ThemedText variant="footnote" className="font-semibold uppercase">
            Your word is:
          </ThemedText>
          <View className="h-8 w-full">
            {showWord && (
              <ThemedText
                variant="title1"
                className=" font-semibold capitalize"
              >
                {word}
              </ThemedText>
            )}
          </View>
        </View>
        <View className="mb-6 flex-row items-center gap-2">
          <Text className="font-medium">
            Listen to the word and type it below:
          </Text>
          <Pressable>
            <MaterialIcons name="play-circle" size={24} color="black" />
          </Pressable>
        </View>
        <View className="gap-5">
          <ThemedText className="text-md capitalize">
            Part of Speech:{" "}
            <Text className="font-semibold">{partOfSpeech}</Text>
          </ThemedText>
          <ThemedText className="text-md">
            Origin: <Text className="font-semibold">{origin}</Text>
          </ThemedText>
          <WordMeaning title="Definition" content={definition} />
        </View>
        <View className="mt-6">
          <Input
            style={[
              isCorrect === null
                ? null
                : isCorrect
                  ? styles.correct
                  : styles.incorrect,
            ]}
            placeholder="Enter Word Here"
            onChangeText={handleTextChange}
            value={userInput}
            autoCapitalize="words"
            autoComplete="off"
            autoCorrect={false}
            importantForAutofill="no"
            inputMode="text"
            returnKeyType="done"
            spellCheck={false}
            editable={!isInputDisabled}
          />
        </View>
      </View>
      <FAB onPress={() => console.log("Play audio")} />
      <View className="mt-auto">
        {showNextButton && (
          <View className="gap-2">
            <Button label="Try Again" onPress={resetState} />
            <Button
              variant="secondary"
              label="Next"
              onPress={handleNextQuestion}
              textClassName="text-black"
              style={{ backgroundColor: colors.secondary[400] }}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default WordPlayGame;

const styles = StyleSheet.create({
  correct: {
    borderColor: "green",
  },
  incorrect: {
    borderColor: "red",
  },
});
