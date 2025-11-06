import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Tile from "./Tile";
import { useGame } from "@/contexts/GameContext";
import { TileData } from "@/utils/gameLogic";

const { width } = Dimensions.get("window");
const GRID_SIZE = 8;
const TILE_MARGIN = 4;
const GRID_PADDING = 16;
const TILE_SIZE = (width - GRID_PADDING * 2 - TILE_MARGIN * (GRID_SIZE - 1)) / GRID_SIZE;
const GRID_HEIGHT = TILE_SIZE * GRID_SIZE + TILE_MARGIN * (GRID_SIZE - 1);

export default function Grid() {
    const { grid, selectedTiles, hintPair, selectTile } = useGame();

    const isSelected = (tile: TileData) => {
        return selectedTiles.some(t => t.id === tile.id);
    };

    const isHinted = (tile: TileData) => {
        if (!hintPair) return false;
        return hintPair[0].id === tile.id || hintPair[1].id === tile.id;
    };

    return (
        <View style={styles.container}>
            <View style={styles.gridContainer}>
                {grid.map((tile) => (
                    <Tile
                        key={tile.id}
                        tile={tile}
                        isSelected={isSelected(tile)}
                        isHinted={isHinted(tile)}
                        onPress={selectTile}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    gridContainer: {
        width: width - GRID_PADDING * 2,
        height: GRID_HEIGHT,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 16,
        padding: 0,
        position: "relative" as const,
    },
});
