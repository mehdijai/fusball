<script setup lang="ts">
import { computed } from "vue";
import Jersey from "./Jersey.vue";
import Pitch from "./Pitch.vue";
import type { TeamPlayer } from "../types/game.type";
import { usePlayStore } from "../store/play.store";
import { storeToRefs } from "pinia";
import GameControl from "./GameControl.vue";

const playStore = usePlayStore();
const { gamePlaySettings } = storeToRefs(playStore);

const team = computed<TeamPlayer[]>(
  () => gamePlaySettings.value.gameSettings.selectedFormation.players ?? []
);
// const team = computed<TeamPlayer[]>(() => []);
</script>

<template>
  <main class="game-plan">
    <Pitch>
      <template v-for="player in team" :key="player.number">
        <Jersey :player="player" />
      </template>
    </Pitch>
    <GameControl />
  </main>
</template>

<style lang="scss">
.game-plan {
  height: 600px;
  width: fit-content;
  display: flex;
  gap: 20px;
}
</style>
