import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            router.replace("/game" as any);
        }, 2500);

        return () => clearTimeout(timer);
    }, [router, scaleAnim, fadeAnim]);

    return (
        <LinearGradient
            colors={["#1B3E7A", "#2A5298"]}
            style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
        >
            <Animated.View
                style={[
                    styles.content,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: fadeAnim,
                    },
                ]}
            >
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>🔢</Text>
                </View>
                <Text style={styles.title}>Number Master</Text>
                <Text style={styles.subtitle}>Merge</Text>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        alignItems: "center",
    },
    iconContainer: {
        width: width * 0.3,
        height: width * 0.3,
        backgroundColor: "#FFC93C",
        borderRadius: width * 0.15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    icon: {
        fontSize: width * 0.15,
    },
    title: {
        fontSize: 48,
        fontWeight: "800" as const,
        color: "#FFFFFF",
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 32,
        fontWeight: "600" as const,
        color: "#FFC93C",
        letterSpacing: 4,
        marginTop: 8,
    },
});
