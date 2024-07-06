import { Button, Input, ThemedText } from "@/ui";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { colors } from "@/theme";

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
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(15);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [countdownInterval, setCountdownInterval] =
    useState<NodeJS.Timeout | null>(null);

  const currentQuestion = useMemo(
    () => data[currentIndex],
    [data, currentIndex],
  );
  const { word, origin, partOfSpeech, definition } = currentQuestion;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [countdownInterval]);

  useEffect(() => {
    if (countdown === 0) {
      setShowWord(true);
      setIsInputDisabled(true);
      setShowNextButton(true); // Show next button when countdown ends
      if (countdownInterval) clearInterval(countdownInterval);
    }
  }, [countdown, countdownInterval]);

  const endGame = useCallback(() => {
    setGameEnded(true);
    console.log({
      score: userScore,
      timeSpent: totalTimeSpent.toFixed(2) + "secs",
    });
  }, [userScore, totalTimeSpent]);

  const setCorrectState = useCallback(
    (isCorrect: boolean) => {
      setIsCorrect(isCorrect);
      setShowNextButton(true);
      setShowWord(true);
      setIsInputDisabled(true);

      if (currentIndex + 1 >= data.length) {
        endGame();
      }

      if (isCorrect) {
        setUserScore(userScore + 10); // Each correct answer gives 10 points
      }
      const timeSpent = (Date.now() - startTime) / 1000;
      setTotalTimeSpent(totalTimeSpent + timeSpent);
      if (countdownInterval) clearInterval(countdownInterval);
    },
    [
      currentIndex,
      data.length,
      startTime,
      totalTimeSpent,
      countdownInterval,
      endGame,
      userScore,
    ],
  );

  const startTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (userInput.trim() !== "") {
        setCorrectState(false);
        Vibration.vibrate();
      }
    }, 5000);
  }, [userInput, setCorrectState]);

  const resetState = useCallback(() => {
    setShowNextButton(false);
    setShowWord(false);
    setIsInputDisabled(false);
    setUserInput("");
    setStartTime(Date.now());
    setIsCorrect(null);
    setCountdown(15);
    setIsTimerRunning(false);
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentIndex + 1 < data.length) {
      setCurrentIndex((prev) => prev + 1);
      resetState();
    } else {
      endGame();
    }
  }, [currentIndex, data, resetState, endGame]);

  const startCountdown = () => {
    if (countdownInterval) clearInterval(countdownInterval);
    setIsTimerRunning(true);
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsTimerRunning(false);
          setShowWord(true);
          setIsInputDisabled(true);
          setShowNextButton(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setCountdownInterval(intervalId);
  };

  const handleTextChange = useCallback(
    (text: string) => {
      const inputWord = text.trim().toLowerCase();
      const comparedWord = word.toLowerCase();
      setUserInput(text);

      if (inputWord === comparedWord) {
        setCorrectState(true);
        if (countdownInterval) clearInterval(countdownInterval);
        setIsTimerRunning(false);
      } else {
        setShowWord(false);
        setShowNextButton(false);

        if (inputWord.length > comparedWord.length) {
          startTimeout();
        } else {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
      }
    },
    [word, setCorrectState, countdownInterval, startTimeout],
  );

  if (gameEnded) {
    return (
      <View className="p-4">
        <ThemedText variant="title1" className="font-semibold">
          Game Over
        </ThemedText>
        <ThemedText variant="body" className="mt-4">
          Total Score: {userScore}
        </ThemedText>
        <ThemedText variant="body" className="mt-2">
          Total Time Spent: {totalTimeSpent.toFixed(2)} seconds
        </ThemedText>
      </View>
    );
  }

  return (
    <>
      <View className="rounded-md bg-white p-4">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="items-center justify-center rounded-sm bg-purple-100 px-3 py-2">
            <ThemedText className="font-semibold text-primary">
              W{currentIndex + 1}
            </ThemedText>
          </View>
          <ThemedText variant="subhead">{`00:${countdown < 10 ? `0${countdown}` : countdown}`}</ThemedText>
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
            onFocus={() => {
              if (!isTimerRunning) startCountdown();
            }} // Start countdown on focus
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