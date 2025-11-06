import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGame } from "@/contexts/GameContext";

export default function Timer() {
  const { timeRemaining } = useGame();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isWarning = timeRemaining <= 30;

  return (
    <View style={[styles.container, isWarning && styles.warningContainer]}>
      <Text style={[styles.timeText, isWarning && styles.warningText]}>
        {timeString}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  warningContainer: {
    backgroundColor: "rgba(255, 60, 60, 0.3)",
  },
  timeText: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  warningText: {
    color: "#FF6B6B",
  },
});
