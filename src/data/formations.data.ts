import type { TeamPlayer } from "../types/game.type";

export const defaultFormation: {
  name: string;
  players: TeamPlayer[];
} = {
  name: "4-1-3-1",
  players: [
    {
      name: "Manuel Neuer",
      position: "GK",
      number: 1,
      xPos: 50,
      yPos: 95,
    },
    {
      name: "Maldini",
      position: "RB",
      number: 3,
      isCaptain: true,
      xPos: 15,
      yPos: 90,
    },
    {
      name: "Cafu",
      position: "LB",
      number: 2,
      xPos: 85,
      yPos: 90,
    },
    {
      name: "Puyol",
      position: "CB",
      number: 5,
      xPos: 35,
      yPos: 80,
    },
    {
      name: "Piqué",
      position: "CB",
      number: 4,
      xPos: 65,
      yPos: 80,
    },
    {
      name: "Amrabet",
      position: "DMF",
      number: 6,
      xPos: 50,
      yPos: 60,
    },
    {
      name: "Kubo",
      position: "RMF",
      number: 16,
      xPos: 80,
      yPos: 40,
    },
    {
      name: "Gavi",
      position: "LMF",
      number: 8,
      xPos: 20,
      yPos: 40,
    },
    {
      name: "Rooney",
      position: "AMF",
      number: 10,
      xPos: 50,
      yPos: 30,
    },
    {
      name: "Inzagi",
      position: "CF",
      number: 9,
      xPos: 50,
      yPos: 10,
    },
  ],
};
