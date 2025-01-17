<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayStore } from "../store/play.store";
import { formations } from "../data/formations.data";
import { computed, ref, watch } from "vue";

const playStore = usePlayStore();
const { gamePlaySettings } = storeToRefs(playStore);

const selectedFormation = ref(
  formations.find(
    (formation) =>
      formation.name ===
      gamePlaySettings.value.gameSettings.selectedFormation.name
  )?.name
);

const formationList = computed(() => formations.map((f) => f.name));

watch(
  () => selectedFormation.value,
  (newVal) => {
    const match = formations.find((f) => f.name === newVal);
    if (match) {
      gamePlaySettings.value.gameSettings.selectedFormation = match;
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="control">
    <div>
      <h2>Player Settings</h2>
      <hr />
      <fieldset>
        <input
          type="checkbox"
          v-model="gamePlaySettings.playerSettings.showNumber"
          id="show-number"
        />
        <label for="show-number">Show Number</label>
      </fieldset>
      <fieldset>
        <input
          type="checkbox"
          v-model="gamePlaySettings.playerSettings.showName"
          id="showName"
        />
        <label for="showName">Show Name</label>
      </fieldset>
      <fieldset>
        <input
          type="checkbox"
          v-model="gamePlaySettings.playerSettings.showPosition"
          id="showPosition"
        />
        <label for="showPosition">Show Position</label>
      </fieldset>
      <fieldset>
        <input
          type="checkbox"
          v-model="gamePlaySettings.playerSettings.showCaptainBadge"
          id="showCaptainBadge"
        />
        <label for="showCaptainBadge">Show Captain Badge</label>
      </fieldset>
    </div>
    <div>
      <h2>Pitch Settings</h2>
      <hr />
      <fieldset>
        <input
          type="checkbox"
          v-model="gamePlaySettings.pitchSettings.showGuides"
          id="showGuides"
        />
        <label for="showGuides">Show Guides</label>
      </fieldset>
    </div>
    <div>
      <h2>Game Settings</h2>
      <hr />
      <fieldset class="block">
        <label for="selectedFormation">Selected Formation</label>
        <select v-model="selectedFormation" id="selectedFormation">
          <template v-for="formation in formationList" :key="formation">
            <option :value="formation">{{ formation }}</option>
          </template>
        </select>
      </fieldset>
    </div>
  </div>
</template>

<style lang="scss">
.control {
  background-color: #e7e7e7;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 300px;

  div {
    h2 {
      font-size: 1rem;
      font-weight: 700;
      margin: 0;
    }
    hr {
      border-color: #d8d8d8;
    }
    fieldset {
      border: none;
      display: flex;
      align-items: center;
      gap: 5px;

      &.block {
        align-items: flex-start;
        flex-direction: column;
      }

      input[type="checkbox"]:checked ~ label {
        color: #183fb4;
        font-weight: 500;
      }

      label {
        font-size: 1rem;
        user-select: none;
      }
    }
  }
}
</style>
