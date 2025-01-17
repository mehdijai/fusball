import { defineStore } from "pinia";
import { ref } from "vue";
import type { GamePlaySettings } from "../types/app.types";
import { defaultFormation } from "../data/formations.data";

export const usePlayStore = defineStore(
  "play-store",
  () => {
    const gamePlaySettings = ref<GamePlaySettings>({
      playerSettings: {
        showNumber: true,
        showName: true,
        showPosition: true,
        showCaptainBadge: true,
        colorScheme: "",
      },
      pitchSettings: {
        showGuides: false,
      },
      gameSettings: {
        selectedFormation: defaultFormation,
      },
    });

    return { gamePlaySettings };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
