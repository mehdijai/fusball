export type PositionName =
  | "GK"
  | "RB"
  | "LB"
  | "CB"
  | "DMF"
  | "CMF"
  | "AMF"
  | "RMF"
  | "LMF"
  | "RWF"
  | "LWF"
  | "SS"
  | "CF";

export const PositionNames = [
  "GK",
  "RB",
  "LB",
  "CB",
  "DMF",
  "CMF",
  "AMF",
  "RMF",
  "LMF",
  "RWF",
  "LWF",
  "SS",
  "CF",
];

export type TeamPlayer = {
  _id: string;
  name: string;
  position: PositionName;
  number: string;
  isCaptain?: boolean;
  xPos: number;
  yPos: number;
  isPixel?: boolean;
};

export type Formation = {
  name: string;
  players: TeamPlayer[];
};
