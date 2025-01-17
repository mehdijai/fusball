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

export type TeamPlayer = {
  name: string;
  position: PositionName;
  number: number;
  isCaptain?: boolean;
  xPos: number;
  yPos: number;
  isPixel?: boolean;
};
