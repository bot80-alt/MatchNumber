export interface TileData {
    id: string;
    value: number;
    row: number;
    col: number;
}

export interface Position {
    row: number;
    col: number;
}

export function generateGrid(rows: number = 8, cols: number = 8): TileData[] {
    const grid: TileData[] = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid.push({
                id: `${row}-${col}-${Date.now()}-${Math.random()}`,
                value: Math.floor(Math.random() * 9) + 1,
                row,
                col,
            });
        }
    }
    return grid;
}

export function generateNewTiles(count: number, col: number, startRow: number = 0): TileData[] {
    const newTiles: TileData[] = [];
    for (let i = 0; i < count; i++) {
        newTiles.push({
            id: `${startRow - i - 1}-${col}-${Date.now()}-${Math.random()}`,
            value: Math.floor(Math.random() * 9) + 1,
            row: startRow - i - 1,
            col,
        });
    }
    return newTiles;
}

export function isValidMatch(tile1: TileData, tile2: TileData): boolean {
    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);

    const isAdjacent = rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff > 0);

    if (!isAdjacent) return false;

    return tile1.value + tile2.value === 10 || tile1.value === tile2.value;
}

export function findAllMatches(grid: TileData[]): [TileData, TileData][] {
    const matches: [TileData, TileData][] = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = i + 1; j < grid.length; j++) {
            if (isValidMatch(grid[i], grid[j])) {
                matches.push([grid[i], grid[j]]);
            }
        }
    }

    return matches;
}

export function applyGravity(grid: TileData[], removedIds: string[]): TileData[] {
    const cols = 8;
    const rows = 8;

    const remainingTiles = grid.filter(tile => !removedIds.includes(tile.id));

    const columnArrays: TileData[][] = Array.from({ length: cols }, () => []);

    remainingTiles.forEach(tile => {
        columnArrays[tile.col].push(tile);
    });

    const newGrid: TileData[] = [];

    columnArrays.forEach((column, colIndex) => {
        column.sort((a, b) => b.row - a.row);

        const emptySlots = rows - column.length;

        const newTiles = generateNewTiles(emptySlots, colIndex, 0);

        column.forEach((tile, index) => {
            const newRow = rows - 1 - index;
            newGrid.push({
                ...tile,
                row: newRow,
            });
        });

        newTiles.forEach((tile, index) => {
            newGrid.push({
                ...tile,
                row: index,
            });
        });
    });

    return newGrid;
}

export interface LevelConfig {
    level: number;
    targetScore: number;
    timeSeconds: number;
}

export const LEVELS: LevelConfig[] = [
    { level: 1, targetScore: 20, timeSeconds: 120 },
    { level: 2, targetScore: 35, timeSeconds: 120 },
    { level: 3, targetScore: 50, timeSeconds: 120 },
];
