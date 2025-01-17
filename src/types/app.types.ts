import type { Formation } from "./game.type";

export interface GamePlaySettings {
  playerSettings: {
    showNumber: boolean;
    showName: boolean;
    showPosition: boolean;
    showCaptainBadge: boolean;
    colorScheme: string;
  };
  pitchSettings: {
    showGuides: boolean;
  };
  gameSettings: {
    selectedFormation: Formation;
  };
}
