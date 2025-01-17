<script setup lang="ts">
import { computed } from "vue";
import Jersey from "./Jersey.vue";
import Pitch from "./Pitch.vue";
import type { TeamPlayer } from "../types/game.type";
import { usePlayStore } from "../store/play.store";
import { storeToRefs } from "pinia";
import GameControl from "./GameControl.vue";
import JerseyControl from "./JerseyControl.vue";

const playStore = usePlayStore();
const { gamePlaySettings } = storeToRefs(playStore);

const team = computed<TeamPlayer[]>(
  () => gamePlaySettings.value.gameSettings.selectedFormation.players ?? []
);
</script>

<template>
  <main class="game-plan">
    <JerseyControl />
    <Pitch class="game-plan_pitch">
      <template v-for="player in team" :key="player.number">
        <Jersey :player="player" />
      </template>
    </Pitch>
    <GameControl />
  </main>
</template>

<style lang="scss">
.game-plan {
  width: fit-content;
  display: flex;
  gap: 20px;

  .game-plan_pitch {
    height: 600px;
  }
}
</style>
