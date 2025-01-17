<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayStore } from "../store/play.store";

const playStore = usePlayStore();
const { gamePlaySettings } = storeToRefs(playStore);
</script>

<template>
  <div class="control">
    <div>
      <h2>Jersey Color Settings</h2>
      <hr />
      <h3>Main Jersey</h3>
      <hr />
      <fieldset>
        <input
          type="color"
          v-model="gamePlaySettings.playerSettings.colorScheme.main.bg"
          id="mainBg"
        />
        <label for="mainBg">Main jersey fill</label>
      </fieldset>
      <fieldset>
        <input
          type="color"
          v-model="gamePlaySettings.playerSettings.colorScheme.main.border"
          id="mainBorder"
        />
        <label for="mainBorder">Main jersey border color</label>
      </fieldset>
      <fieldset>
        <input
          type="color"
          v-model="gamePlaySettings.playerSettings.colorScheme.main.fore"
          id="mainFore"
        />
        <label for="mainFore">Main jersey fore color</label>
      </fieldset>
      <h3>GK Jersey</h3>
      <hr />
      <fieldset>
        <input
          type="color"
          v-model="gamePlaySettings.playerSettings.colorScheme.gk.bg"
          id="gkBg"
        />
        <label for="gkBg">GK jersey fill</label>
      </fieldset>
      <fieldset>
        <input
          type="color"
          v-model="gamePlaySettings.playerSettings.colorScheme.gk.border"
          id="gkBorder"
        />
        <label for="gkBorder">GK jersey border color</label>
      </fieldset>
      <fieldset>
        <input
          type="color"
          v-model="gamePlaySettings.playerSettings.colorScheme.gk.fore"
          id="gkFore"
        />
        <label for="gkFore">GK jersey fore color</label>
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
  height: 80%;
  overflow-y: auto;

  div {
    h2 {
      font-size: 1rem;
      font-weight: 700;
      margin: 0;
    }
    h3 {
      font-size: 0.9rem;
      font-weight: 600;
      margin: 0;
      color: gray;
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
