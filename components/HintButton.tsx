import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Lightbulb } from "lucide-react-native";
import { useGame } from "@/contexts/GameContext";

export default function HintButton() {
    const { showHint } = useGame();

    return (
        <TouchableOpacity
            testID="hint-button"
            style={styles.button}
            onPress={showHint}
            activeOpacity={0.8}
        >
            <Lightbulb size={24} color="#1B3E7A" />
            <Text style={styles.text}>HINT</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFC93C",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: "800" as const,
        color: "#1B3E7A",
        letterSpacing: 1,
    },
});
