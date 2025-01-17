import type { Formation } from "./game.type";

export interface GamePlaySettings {
  playerSettings: {
    showNumber: boolean;
    showName: boolean;
    showPosition: boolean;
    showCaptainBadge: boolean;
    colorScheme: {
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
  };
  pitchSettings: {
    showGuides: boolean;
  };
  gameSettings: {
    selectedFormation: Formation;
  };
}
