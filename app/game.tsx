import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GameProvider, useGame } from "@/contexts/GameContext";
import TopBar from "@/components/TopBar";
import Grid from "@/components/Grid";
import HintButton from "@/components/HintButton";
import LevelModal from "@/components/LevelModal";
import { LEVELS } from "@/utils/gameLogic";

function GameContent() {
  const insets = useSafeAreaInsets();
  const {
    showLevelComplete,
    showLevelFailed,
    currentLevel,
    score,
    currentLevelConfig,
    resetLevel,
    nextLevel,
  } = useGame();

  const hasNextLevel = currentLevel < LEVELS.length;

  return (
    <LinearGradient colors={["#1B3E7A", "#2A5298"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <TopBar />
          <View style={styles.gridWrapper}>
            <Grid />
          </View>
          <View style={styles.hintContainer}>
            <HintButton />
          </View>
        </View>
      </ScrollView>

      <LevelModal
        visible={showLevelComplete}
        isSuccess={true}
        currentLevel={currentLevel}
        score={score}
        targetScore={currentLevelConfig.targetScore}
        onRetry={resetLevel}
        onNext={hasNextLevel ? nextLevel : undefined}
      />

      <LevelModal
        visible={showLevelFailed}
        isSuccess={false}
        currentLevel={currentLevel}
        score={score}
        targetScore={currentLevelConfig.targetScore}
        onRetry={resetLevel}
      />
    </LinearGradient>
  );
}

export default function GameScreen() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 24,
  },
  gridWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hintContainer: {
    alignItems: "center",
    paddingBottom: 16,
  },
});
