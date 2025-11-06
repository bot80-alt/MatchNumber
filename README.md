# Match Number

Match Number is a strategic tile-based puzzle game built using React Native (Expo).  
The objective is to match and remove valid tile pairs from an 8x8 grid before time runs out.

---

## Game Rules

A pair of tiles is considered valid if:

1. The tiles are adjacent (up, down, left, or right), and
2. The tiles either:
   - Sum to 10, or
   - Have the same number.

When a valid pair is removed:
- Tiles above fall downward with a smooth gravity animation.
- New tiles are generated at the top.
- The player earns score for each valid match.

Each level is limited to **2 minutes**, requiring fast visual scanning and efficient pattern recognition.

---

## Level Structure

| Level | Objective               | Time Limit | Grid Size |
|-------|-------------------------|------------|-----------|
| 1     | Score minimum to pass   | 2 minutes  | 8x8       |
| 2     | Higher score threshold  | 2 minutes  | 8x8       |
| 3+    | Increasing challenge    | 2 minutes  | 8x8       |

Difficulty increases through board variations and tighter score demands.

---

## Screenshots

<div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
    <img src="https://github.com/bot80-alt/MatchNumber/blob/main/assets/images/splash.png" alt="splash" width="260"/>
    <img src="https://github.com/bot80-alt/MatchNumber/blob/main/assets/images/main.png" alt="main gameplay" width="260"/>
    <img src="https://github.com/bot80-alt/MatchNumber/blob/main/assets/images/setn.png" alt="settings screen" width="260"/>
</div>

---

## Features

- Clean minimal UI theme
- Smooth tile removal and gravity animations
- Responsive touch-based interactions
- Level-based gameplay progression
- Settings screen for user customization

---

## Tech Stack

| Component       | Technology                                  | Purpose                                                |
|-----------------|----------------------------------------------|--------------------------------------------------------|
| Framework       | React Native (Expo)                          | Application foundation                                |
| Language        | TypeScript                                   | Strong typing and maintainable code                   |
| Navigation      | React Navigation                             | Screen routing                                         |
| Animations      | React Native Reanimated                      | Tile transitions and gravity effects                   |
| Gesture Input   | React Native Gesture Handler                 | Tile selection interactions                            |
| State Logic     | React Hooks (useState, useEffect)            | Game state and timer management                        |
| Layout System   | Flexbox, Dimensions API                      | Responsive UI                                          |
| Assets          | Expo Asset Manager                           | Image resource handling                                |

---

## Project Architecture

src/
├── screens/
│ ├── SplashScreen.tsx
│ ├── GameScreen.tsx
│ └── SettingsScreen.tsx
│
├── components/
│ └── Tile.tsx
│
├── utils/
│ └── gameLogic.ts // Match validation, scoring, gravity mechanics
│
├── hooks/
│ └── useTimer.ts // Level countdown logic
│
└── App.tsx // Navigation and app setup

## App Release 
- Download it from GitHub releases or 
- Drive link : <href link="https://drive.google.com/drive/folders/1wigsHM3uDYP2ELgyx2WlfHK-nBPBbJ9r?usp=sharing">Download here!</href>