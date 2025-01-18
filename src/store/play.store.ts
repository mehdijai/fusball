import { defineStore } from "pinia";
import { ref } from "vue";
import type { GamePlaySettings } from "../types/app.types";
import { formations } from "../data/formations.data";
import type { Formation } from "../types/game.type";
import { useAppStore } from "./app.store";

export const usePlayStore = defineStore(
  "play-store",
  () => {
    const { switchRoute } = useAppStore();
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
            fore: "#ffffff",
            border: "#333333",
          },
        },
      },
      pitchSettings: {
        showGuides: false,
      },
      gameSettings: {
        formations: formations,
        selectedFormation: formations[0],
      },
    });

    function addNewFormation(newFormation: Formation) {
      gamePlaySettings.value.gameSettings.formations.push(newFormation);
      gamePlaySettings.value.gameSettings.selectedFormation = newFormation;
      switchRoute("game-plan");
    }

    return { gamePlaySettings, addNewFormation };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
