import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AccessibilityInfo,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Audio } from "expo-av";
import { colors } from "@/theme";
import { Button, Input, ThemedText } from "@/ui";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export interface DictationProps {
  word: string;
  origin: string;
  definition: string;
  partOfSpeech: string;
  difficulty: string;
  audioUrl?: string;
}

interface WordPlayGameProps {
  data: DictationProps[];
  onGameEnd: (score: number, timeSpent: number) => void;
}

interface GameState {
  currentIndex: number;
  userInput: string;
  userScore: number;
  isCorrect: boolean | null;
  showNextButton: boolean;
  showWord: boolean;
  isInputDisabled: boolean;
  totalTimeSpent: number;
  isTimerRunning?: boolean;
  gameEnded: boolean;
}

const WordMeaning: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <View accessible accessibilityLabel={`${title}: ${content}`}>
    <ThemedText variant="subhead" className="font-semibold">
      {title}
    </ThemedText>
    <ThemedText variant="body" className="text-md">
      {content}
    </ThemedText>
  </View>
);

const FAB: React.FC<{ onPress: () => void; isPlaying: boolean }> = ({
  onPress,
  isPlaying,
}) => (
  <View className="absolute bottom-[125px] right-4">
    <Button
      size="icon"
      className="h-12 w-12 items-center justify-center pl-3 pr-2"
      style={{ backgroundColor: colors.secondary[400] }}
      onPress={onPress}
      accessibilityLabel={isPlaying ? "Stop audio" : "Play audio"}
    >
      <FontAwesome5
        name={isPlaying ? "stop" : "play"}
        size={18}
        color="black"
      />
    </Button>
  </View>
);

const GAME_DURATION = 15; // seconds

const WordPlayGame: React.FC<WordPlayGameProps> = ({ data, onGameEnd }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentIndex: 0,
    userInput: "",
    userScore: 0,
    isCorrect: null as boolean | null,
    showNextButton: false,
    showWord: false,
    isInputDisabled: false,
    gameEnded: false,
    totalTimeSpent: 0,
  });

  const [countdown, setCountdown] = useState(GAME_DURATION);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioRef = useRef<Audio.Sound | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = useMemo(
    () => data[gameState.currentIndex],
    [data, gameState.currentIndex],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) audioRef.current.unloadAsync();
    };
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsTimerRunning(false);
            endTurn(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [endTurn, isTimerRunning]);

  const updateGameState = useCallback((updates: Partial<typeof gameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  }, []);

  const startCountdown = useCallback(() => {
    setIsTimerRunning(true);
    setCountdown(GAME_DURATION);
  }, []);

  const endTurn = useCallback(
    (isCorrect: boolean) => {
      setIsTimerRunning(false);
      updateGameState({
        isCorrect,
        showNextButton: true,
        showWord: true,
        isInputDisabled: true,
        userScore: (prev) => (isCorrect ? prev + 10 : prev),
        totalTimeSpent: (prev) => prev + (GAME_DURATION - countdown),
      });
    },
    [countdown, updateGameState],
  );

  const handleTextChange = useCallback(
    (text: string) => {
      const inputWord = text.trim().toLowerCase();
      const comparedWord = currentQuestion.word.toLowerCase();
      updateGameState({ userInput: text });
      if (inputWord === comparedWord) {
        endTurn(true);
      } else if (inputWord.length > comparedWord.length) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => endTurn(false), 1000);
      }
    },
    [currentQuestion, endTurn, updateGameState],
  );

  const resetState = useCallback(() => {
    updateGameState({
      showNextButton: false,
      showWord: false,
      isInputDisabled: false,
      userInput: "",
      isCorrect: null,
    });
    setCountdown(GAME_DURATION);
    setIsTimerRunning(false);
  }, [updateGameState]);

  const handleNextQuestion = useCallback(() => {
    if (gameState.currentIndex + 1 < data.length) {
      updateGameState({ currentIndex: (prev) => prev + 1 });
      resetState();
    } else {
      updateGameState({ gameEnded: true });
      onGameEnd(gameState.userScore, gameState.totalTimeSpent);
    }
  }, [
    data.length,
    gameState.currentIndex,
    gameState.userScore,
    gameState.totalTimeSpent,
    onGameEnd,
    resetState,
    updateGameState,
  ]);

  const playAudio = useCallback(async () => {
    try {
      if (isAudioPlaying && audioRef.current) {
        setIsAudioPlaying(false);
      } else if (currentQuestion && currentQuestion.audioUrl) {
        const { sound } = await Audio.Sound.createAsync({
          uri: currentQuestion.audioUrl,
        });

        setIsAudioPlaying(true);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) setIsAudioPlaying(false);
        });
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      Alert.alert("Error", "Failed to play audio. Please try again.");
    }
  }, [currentQuestion, isAudioPlaying]);

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(
      `New word. ${currentQuestion.partOfSpeech}. ${currentQuestion.definition}`,
    );
  }, [currentQuestion]);

  if (gameState.gameEnded) {
    return (
      <View className="p-4">
        <ThemedText variant="title1" className="font-semibold">
          Game Over
        </ThemedText>
        <ThemedText variant="body" className="mt-4">
          Total Score: {gameState.userScore}
        </ThemedText>
        <ThemedText variant="body" className="mt-2">
          Total Time Spent: {gameState.totalTimeSpent.toFixed(2)} seconds
        </ThemedText>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  return (
    <>
      <View className="rounded-md bg-white p-4">
        <View className="mb-4 flex-row items-center justify-between">
          <View className="items-center justify-center rounded-sm bg-purple-100 px-3 py-2">
            <ThemedText className="font-semibold text-primary">
              W{gameState.currentIndex + 1}
            </ThemedText>
          </View>
          <ThemedText variant="subhead">{`00:${countdown < 10 ? `0${countdown}` : countdown}`}</ThemedText>
        </View>
        <View className="mb-4 gap-2">
          <ThemedText variant="footnote" className="font-semibold uppercase">
            Your word is:
          </ThemedText>
          <View className="h-8 w-full">
            {gameState.showWord && (
              <ThemedText variant="title1" className="font-semibold capitalize">
                {currentQuestion.word}
              </ThemedText>
            )}
          </View>
        </View>
        <View className="mb-6 flex-row items-center gap-2">
          <Text className="font-medium">
            Listen to the word and type it below:
          </Text>
          <Pressable
            onPress={playAudio}
            accessibilityLabel={isAudioPlaying ? "Stop audio" : "Play audio"}
          >
            <MaterialIcons
              name={isAudioPlaying ? "stop" : "play-circle"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        <View className="gap-5">
          <ThemedText className="text-md capitalize">
            Part of Speech:{" "}
            <Text className="font-semibold">
              {currentQuestion.partOfSpeech}
            </Text>
          </ThemedText>
          <ThemedText className="text-md">
            Origin:{" "}
            <Text className="font-semibold">{currentQuestion.origin}</Text>
          </ThemedText>
          <WordMeaning
            title="Definition"
            content={currentQuestion.definition}
          />
        </View>
        <View className="mt-6">
          <Input
            style={[
              gameState.isCorrect === null
                ? null
                : gameState.isCorrect
                  ? styles.correct
                  : styles.incorrect,
            ]}
            placeholder="Enter Word Here"
            onChangeText={handleTextChange}
            value={gameState.userInput}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            importantForAutofill="no"
            inputMode="text"
            returnKeyType="done"
            spellCheck={false}
            editable={!gameState.isInputDisabled}
            onFocus={() => {
              if (!isTimerRunning) startCountdown();
            }}
            accessibilityLabel="Enter the word you heard"
            accessibilityHint="Type the word and submit to check if it's correct"
          />
        </View>
      </View>
      <FAB onPress={playAudio} isPlaying={isAudioPlaying} />
      <View className="mt-auto">
        {gameState.showNextButton && (
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
