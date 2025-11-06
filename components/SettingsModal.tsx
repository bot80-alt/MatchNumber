import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useGame } from "@/contexts/GameContext";

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
    const router = useRouter();
    const { settings, updateSettings } = useGame();

    const handleExit = () => {
        onClose();
        router.replace("/");
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Settings</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color="#1B3E7A" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Sound</Text>
                            <Switch
                                testID="sound-toggle"
                                value={settings.soundEnabled}
                                onValueChange={(value) => updateSettings({ soundEnabled: value })}
                                trackColor={{ false: "#D1D5DB", true: "#FFC93C" }}
                                thumbColor="#FFFFFF"
                            />
                        </View>

                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Vibration</Text>
                            <Switch
                                testID="vibration-toggle"
                                value={settings.vibrationEnabled}
                                onValueChange={(value) => updateSettings({ vibrationEnabled: value })}
                                trackColor={{ false: "#D1D5DB", true: "#FFC93C" }}
                                thumbColor="#FFFFFF"
                            />
                        </View>

                        <TouchableOpacity
                            testID="exit-button"
                            style={styles.exitButton}
                            onPress={handleExit}
                        >
                            <Text style={styles.exitButtonText}>Exit to Menu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        width: "85%",
        maxWidth: 400,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FFC93C",
    },
    title: {
        fontSize: 24,
        fontWeight: "800" as const,
        color: "#1B3E7A",
    },
    closeButton: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 20,
        gap: 20,
    },
    settingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    settingLabel: {
        fontSize: 18,
        fontWeight: "600" as const,
        color: "#1B3E7A",
    },
    exitButton: {
        backgroundColor: "#EF4444",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 12,
    },
    exitButtonText: {
        fontSize: 16,
        fontWeight: "700" as const,
        color: "#FFFFFF",
    },
});
