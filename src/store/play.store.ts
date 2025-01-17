import { defineStore } from "pinia";
import { ref } from "vue";
import type { GamePlaySettings } from "../types/app.types";
import { formations } from "../data/formations.data";

export const usePlayStore = defineStore(
  "play-store",
  () => {
    const gamePlaySettings = ref<GamePlaySettings>({
      playerSettings: {
        showNumber: true,
        showName: true,
        showPosition: true,
        showCaptainBadge: true,
        colorScheme: {
          main: {
            bg: "#E6E6E6",
            fore: "#333333",
            border: "#333333",
          },
          gk: {
            bg: "#e64747",
            fore: "#fff",
            border: "#333333",
          },
        },
      },
      pitchSettings: {
        showGuides: false,
      },
      gameSettings: {
        selectedFormation: formations[0],
      },
    });

    return { gamePlaySettings };
  },
  // {
  //   persist: {
  //     storage: localStorage,
  //   },
  // }
);
