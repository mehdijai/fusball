import type { Formation } from "./game.type";

export type JerseyColorScheme = {
  main: {
    bg: string;
    fore: string;
    border: string;
  };
  gk: {
    bg: string;
    fore: string;
    border: string;
  };
};

export type GamePlaySettings = {
  playerSettings: {
    showNumber: boolean;
    showName: boolean;
    showPosition: boolean;
    showCaptainBadge: boolean;
    colorScheme: JerseyColorScheme;
  };
  pitchSettings: {
    showGuides: boolean;
  };
  gameSettings: {
    formations: Formation[];
    selectedFormation: Formation;
  };
};
