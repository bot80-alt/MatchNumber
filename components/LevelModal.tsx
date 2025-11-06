import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Trophy, RotateCcw } from "lucide-react-native";
import { useRouter } from "expo-router";

interface LevelModalProps {
    visible: boolean;
    isSuccess: boolean;
    currentLevel: number;
    score: number;
    targetScore: number;
    onRetry: () => void;
    onNext?: () => void;
}

export default function LevelModal({
    visible,
    isSuccess,
    currentLevel,
    score,
    targetScore,
    onRetry,
    onNext,
}: LevelModalProps) {
    const router = useRouter();

    const handleExit = () => {
        router.replace("/");
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={[styles.modal, isSuccess ? styles.successModal : styles.failModal]}>
                    <View style={styles.iconContainer}>
                        {isSuccess ? (
                            <Trophy size={80} color="#FFC93C" />
                        ) : (
                            <Text style={styles.failIcon}>⏰</Text>
                        )}
                    </View>

                    <Text style={styles.title}>
                        {isSuccess ? "Level Complete!" : "Time's Up!"}
                    </Text>

                    <Text style={styles.subtitle}>
                        {isSuccess
                            ? `You completed Level ${currentLevel}!`
                            : `You reached ${score} out of ${targetScore} points`}
                    </Text>

                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreLabel}>Final Score</Text>
                        <Text style={styles.scoreValue}>
                            {score} / {targetScore}
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        {isSuccess && onNext && (
                            <TouchableOpacity
                                testID="next-level-button"
                                style={[styles.button, styles.successButton]}
                                onPress={onNext}
                            >
                                <Text style={styles.buttonText}>Next Level</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            testID="retry-button"
                            style={[styles.button, styles.retryButton]}
                            onPress={onRetry}
                        >
                            <RotateCcw size={20} color="#FFFFFF" />
                            <Text style={styles.buttonText}>Retry</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            testID="exit-modal-button"
                            style={[styles.button, styles.exitButton]}
                            onPress={handleExit}
                        >
                            <Text style={[styles.buttonText, styles.exitButtonText]}>Exit</Text>
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
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#FFFFFF",
        borderRadius: 32,
        width: "85%",
        maxWidth: 400,
        padding: 32,
        alignItems: "center",
    },
    successModal: {
        borderWidth: 4,
        borderColor: "#FFC93C",
    },
    failModal: {
        borderWidth: 4,
        borderColor: "#EF4444",
    },
    iconContainer: {
        marginBottom: 20,
    },
    failIcon: {
        fontSize: 80,
    },
    title: {
        fontSize: 32,
        fontWeight: "800" as const,
        color: "#1B3E7A",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "600" as const,
        color: "#6B7280",
        marginBottom: 24,
        textAlign: "center",
    },
    scoreBox: {
        backgroundColor: "#F3F4F6",
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 16,
        marginBottom: 32,
        width: "100%",
        alignItems: "center",
    },
    scoreLabel: {
        fontSize: 14,
        fontWeight: "600" as const,
        color: "#6B7280",
        marginBottom: 4,
        textTransform: "uppercase" as const,
        letterSpacing: 1,
    },
    scoreValue: {
        fontSize: 28,
        fontWeight: "800" as const,
        color: "#1B3E7A",
    },
    buttonContainer: {
        gap: 12,
        width: "100%",
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
    successButton: {
        backgroundColor: "#10B981",
    },
    retryButton: {
        backgroundColor: "#FFC93C",
    },
    exitButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#D1D5DB",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "700" as const,
        color: "#FFFFFF",
    },
    exitButtonText: {
        color: "#6B7280",
    },
});
