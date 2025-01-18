import Color from "color";
import type { JerseyColorScheme } from "../types/app.types";

export function getJerseyColor(
  isKeeper: boolean,
  colorScheme: JerseyColorScheme
) {
  return isKeeper
    ? {
        border: colorScheme.gk.border,
        collar: Color(colorScheme.gk.bg).darken(0.2).hex().toString(),
        fill: colorScheme.gk.bg,
        number: colorScheme.gk.fore,
        collarStroke: colorScheme.gk.fore,
        emblem: colorScheme.gk.fore,
      }
    : {
        border: colorScheme.main.border,
        collar: Color(colorScheme.main.bg).darken(0.2).hex().toString(),
        fill: colorScheme.main.bg,
        number: colorScheme.main.fore,
        collarStroke: colorScheme.main.fore,
        emblem: colorScheme.main.fore,
      };
}
