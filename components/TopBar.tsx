import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Settings, Plus } from "lucide-react-native";
import { useGame } from "@/contexts/GameContext";
import Timer from "./Timer";
import SettingsModal from "./SettingsModal";

export default function TopBar() {
    const { score, currentLevel, currentLevelConfig, usePowerUp } = useGame();
    const [showSettings, setShowSettings] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity
                    testID="settings-button"
                    style={styles.iconButton}
                    onPress={() => setShowSettings(true)}
                >
                    <Settings size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <Timer />

                <TouchableOpacity
                    testID="powerup-button"
                    style={styles.iconButton}
                    onPress={usePowerUp}
                >
                    <View style={styles.powerUpButton}>
                        <Plus size={20} color="#FFFFFF" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Level</Text>
                    <Text style={styles.infoValue}>{currentLevel}</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Score</Text>
                    <Text style={styles.infoValue}>
                        {score} / {currentLevelConfig.targetScore}
                    </Text>
                </View>
            </View>

            <SettingsModal visible={showSettings} onClose={() => setShowSettings(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconButton: {
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 24,
    },
    powerUpButton: {
        backgroundColor: "#FFC93C",
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 16,
    },
    infoBox: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    infoLabel: {
        fontSize: 12,
        fontWeight: "600" as const,
        color: "rgba(255, 255, 255, 0.7)",
        textTransform: "uppercase" as const,
        letterSpacing: 1,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 20,
        fontWeight: "800" as const,
        color: "#FFFFFF",
    },
});
