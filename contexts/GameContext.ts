import createContextHook from "@nkzw/create-context-hook";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { TileData, generateGrid, isValidMatch, applyGravity, findAllMatches, LEVELS, LevelConfig } from "@/utils/gameLogic";

interface GameSettings {
    soundEnabled: boolean;
    vibrationEnabled: boolean;
}

export const [GameProvider, useGame] = createContextHook(() => {
    const [grid, setGrid] = useState<TileData[]>(() => generateGrid());
    const [selectedTiles, setSelectedTiles] = useState<TileData[]>([]);
    const [score, setScore] = useState<number>(0);
    const [currentLevel, setCurrentLevel] = useState<number>(1);
    const [timeRemaining, setTimeRemaining] = useState<number>(120);
    const [isGameActive, setIsGameActive] = useState<boolean>(true);
    const [settings, setSettings] = useState<GameSettings>({
        soundEnabled: true,
        vibrationEnabled: true,
    });
    const [hintPair, setHintPair] = useState<[TileData, TileData] | null>(null);
    const [showLevelComplete, setShowLevelComplete] = useState<boolean>(false);
    const [showLevelFailed, setShowLevelFailed] = useState<boolean>(false);

    const currentLevelConfig: LevelConfig = LEVELS.find(l => l.level === currentLevel) || LEVELS[0];

    const triggerHaptic = useCallback(() => {
        if (settings.vibrationEnabled && Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }, [settings.vibrationEnabled]);

    const selectTile = useCallback((tile: TileData) => {
        setSelectedTiles(current => {
            if (current.find(t => t.id === tile.id)) {
                triggerHaptic();
                return current.filter(t => t.id !== tile.id);
            }

            if (current.length < 2) {
                triggerHaptic();
                return [...current, tile];
            }

            return current;
        });
    }, [triggerHaptic]);

    const removePair = useCallback(() => {
        if (selectedTiles.length !== 2) return;

        const [tile1, tile2] = selectedTiles;

        if (isValidMatch(tile1, tile2)) {
            const removedIds = [tile1.id, tile2.id];
            const newGrid = applyGravity(grid, removedIds);

            setGrid(newGrid);
            setScore(prev => prev + 1);
            setSelectedTiles([]);

            if (settings.vibrationEnabled && Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
        } else {
            setSelectedTiles([]);

            if (settings.vibrationEnabled && Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }
        }
    }, [selectedTiles, grid, settings.vibrationEnabled]);

    useEffect(() => {
        if (selectedTiles.length === 2) {
            const timer = setTimeout(() => {
                removePair();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [selectedTiles, removePair]);

    useEffect(() => {
        if (!isGameActive) return;

        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    setIsGameActive(false);
                    setShowLevelFailed(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isGameActive]);

    useEffect(() => {
        if (score >= currentLevelConfig.targetScore && isGameActive) {
            setIsGameActive(false);
            setShowLevelComplete(true);
        }
    }, [score, currentLevelConfig.targetScore, isGameActive]);

    const showHint = useCallback(() => {
        const matches = findAllMatches(grid);
        if (matches.length > 0) {
            const randomMatch = matches[Math.floor(Math.random() * matches.length)];
            setHintPair(randomMatch);
            triggerHaptic();

            setTimeout(() => {
                setHintPair(null);
            }, 2000);
        }
    }, [grid, triggerHaptic]);

    const usePowerUp = useCallback(() => {
        const matches = findAllMatches(grid);
        if (matches.length > 0) {
            const randomMatch = matches[Math.floor(Math.random() * matches.length)];
            const removedIds = [randomMatch[0].id, randomMatch[1].id];
            const newGrid = applyGravity(grid, removedIds);

            setGrid(newGrid);
            setScore(prev => prev + 1);
            triggerHaptic();
        }
    }, [grid, triggerHaptic]);

    const resetLevel = useCallback(() => {
        setGrid(generateGrid());
        setSelectedTiles([]);
        setScore(0);
        setTimeRemaining(currentLevelConfig.timeSeconds);
        setIsGameActive(true);
        setShowLevelComplete(false);
        setShowLevelFailed(false);
        setHintPair(null);
    }, [currentLevelConfig.timeSeconds]);

    const nextLevel = useCallback(() => {
        if (currentLevel < LEVELS.length) {
            const nextLevelNum = currentLevel + 1;
            const nextConfig = LEVELS.find(l => l.level === nextLevelNum);

            setCurrentLevel(nextLevelNum);
            setGrid(generateGrid());
            setSelectedTiles([]);
            setScore(0);
            setTimeRemaining(nextConfig?.timeSeconds || 120);
            setIsGameActive(true);
            setShowLevelComplete(false);
            setShowLevelFailed(false);
            setHintPair(null);
        }
    }, [currentLevel]);

    const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    }, []);

    return useMemo(() => ({
        grid,
        selectedTiles,
        score,
        currentLevel,
        timeRemaining,
        isGameActive,
        settings,
        hintPair,
        showLevelComplete,
        showLevelFailed,
        currentLevelConfig,
        selectTile,
        showHint,
        usePowerUp,
        resetLevel,
        nextLevel,
        updateSettings,
    }), [
        grid,
        selectedTiles,
        score,
        currentLevel,
        timeRemaining,
        isGameActive,
        settings,
        hintPair,
        showLevelComplete,
        showLevelFailed,
        currentLevelConfig,
        selectTile,
        showHint,
        usePowerUp,
        resetLevel,
        nextLevel,
        updateSettings,
    ]);
});
