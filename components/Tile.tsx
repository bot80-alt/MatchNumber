import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { TileData } from "@/utils/gameLogic";

const { width } = Dimensions.get("window");
const GRID_SIZE = 8;
const TILE_MARGIN = 4;
const GRID_PADDING = 16;
const TILE_SIZE = (width - GRID_PADDING * 2 - TILE_MARGIN * (GRID_SIZE - 1)) / GRID_SIZE;

interface TileProps {
  tile: TileData;
  isSelected: boolean;
  isHinted: boolean;
  onPress: (tile: TileData) => void;
}

export default function Tile({ tile, isSelected, isHinted, onPress }: TileProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.ValueXY({ 
    x: tile.col * (TILE_SIZE + TILE_MARGIN), 
    y: tile.row * (TILE_SIZE + TILE_MARGIN) 
  })).current;

  useEffect(() => {
    Animated.spring(positionAnim, {
      toValue: { 
        x: tile.col * (TILE_SIZE + TILE_MARGIN), 
        y: tile.row * (TILE_SIZE + TILE_MARGIN) 
      },
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [tile.row, tile.col, positionAnim]);

  useEffect(() => {
    if (isSelected) {
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isSelected, scaleAnim]);

  useEffect(() => {
    if (isHinted) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [isHinted, glowAnim]);

  const handlePress = () => {
    onPress(tile);
  };

  const backgroundColor = isSelected ? "#FFDB6E" : "#FFC93C";
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.8],
  });

  return (
    <Animated.View
      style={[
        styles.tileContainer,
        {
          transform: [
            { translateX: positionAnim.x },
            { translateY: positionAnim.y },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      {isHinted && (
        <Animated.View
          style={[
            styles.glowContainer,
            {
              opacity: glowOpacity,
            },
          ]}
        />
      )}
      <TouchableOpacity
        testID={`tile-${tile.id}`}
        style={[styles.tile, { backgroundColor }]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.tileText}>{tile.value}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    position: "absolute" as const,
    width: TILE_SIZE,
    height: TILE_SIZE,
  },
  glowContainer: {
    position: "absolute" as const,
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    backgroundColor: "#FFE066",
    borderRadius: 14,
    shadowColor: "#FFC93C",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tileText: {
    fontSize: TILE_SIZE * 0.5,
    fontWeight: "800" as const,
    color: "#FFFFFF",
  },
});
