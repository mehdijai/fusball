<script setup lang="ts">
import GamePlan from "./components/GamePlan.vue";
import PlanEditor from "./components/PlanEditor.vue";
import { useAppStore } from "./store/app.store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { activeRoute } = storeToRefs(appStore);
</script>

<template>
  <main class="app">
    <template v-if="activeRoute === 'game-plan'">
      <GamePlan />
    </template>
    <template v-if="activeRoute === 'plan-editor'">
      <PlanEditor />
    </template>
  </main>
</template>

<style lang="scss">
.app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
</style>
