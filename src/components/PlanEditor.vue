<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRaw,
  useTemplateRef,
  type ComponentPublicInstance,
} from "vue";
import Jersey from "./Jersey.vue";
import Pitch from "./Pitch.vue";
import type { Formation } from "../types/game.type";
import { usePlayStore } from "../store/play.store";
import { storeToRefs } from "pinia";
import { useAppStore } from "../store/app.store";

const { switchRoute } = useAppStore();
const playStore = usePlayStore();
const { addNewFormation } = playStore;
const { gamePlaySettings } = storeToRefs(playStore);

const newFormationPayload = ref<Formation>({
  name: "",
  players: structuredClone([
    ...toRaw(gamePlaySettings.value.gameSettings.selectedFormation.players),
  ]),
});

const gamePitch = useTemplateRef("gamePitch");

type ExposedPlayer = ComponentPublicInstance<{
  jerseyRef: HTMLDivElement | null;
}>;

const players = reactive<ExposedPlayer[]>([]);

let grabbedEl: HTMLDivElement | null = null;

function setGrabbedEl(jerseyRef: HTMLDivElement | null) {
  return (e: Event) => {
    e.stopPropagation();
    if (grabbedEl === null) {
      grabbedEl = jerseyRef;
    }
  };
}

function unsetGrabbedEl(e: Event) {
  e.stopPropagation();
  if (grabbedEl) grabbedEl.style.cursor = "grab";
  grabbedEl = null;
}

function movementsHandler(field: HTMLDivElement) {
  return (e: MouseEvent) => {
    if (grabbedEl !== null) {
      const bBox = field.getBoundingClientRect();
      const dx = e.clientX - bBox.x;
      const dy = e.clientY - bBox.y;
      grabbedEl.style.cursor = "grabbing";
      const match = newFormationPayload.value.players.find(
        (p) => p.number === Number(grabbedEl!.id)
      );
      if (match) {
        match.isPixel = true;
        match.xPos = dx;
        match.yPos = dy;
      }
    }
  };
}

const listeners: Function[] = [];

onMounted(() => {
  if (!gamePitch.value || !(players.length > 0)) return;

  const field = gamePitch.value.teamContainer;

  if (!field) return;

  players.forEach((player) => {
    if (player.jerseyRef) {
      player.jerseyRef.addEventListener(
        "mousedown",
        setGrabbedEl(player.jerseyRef)
      );
      listeners.push(() =>
        player.jerseyRef!.removeEventListener(
          "mousedown",
          setGrabbedEl(player.jerseyRef)
        )
      );
      player.jerseyRef.addEventListener("mouseup", unsetGrabbedEl);
      listeners.push(() =>
        player.jerseyRef!.removeEventListener("mouseup", unsetGrabbedEl)
      );
    }
  });

  field.addEventListener("mousemove", movementsHandler(field));
  listeners.push(() =>
    field.removeEventListener("mousemove", movementsHandler(field))
  );
});

onUnmounted(() => {
  listeners.forEach((listener) => listener());
  listeners.length = 0;
});

function saveState() {
  if (!newFormationPayload.value.name) {
    alert("Name must be set");
    return;
  }
  if (newFormationPayload.value.name.length < 1) {
    alert("Name must have more than 1 character at least");
    return;
  }

  if (
    gamePlaySettings.value.gameSettings.formations.find(
      (f) => f.name === newFormationPayload.value.name
    )
  ) {
    alert("This name is already taken");
    return;
  }
  addNewFormation(newFormationPayload.value);
}
</script>

<template>
  <main class="game-plan">
    <Pitch class="game-plan_pitch" ref="gamePitch">
      <template
        v-for="player in newFormationPayload.players"
        :key="player.number"
      >
        <Jersey
          :ref="(el) => players.push(el as ExposedPlayer)"
          :player="player"
          editable
        />
      </template>
    </Pitch>
    <section class="actions">
      <h2>New Formation</h2>
      <div>
        <fieldset>
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="newFormationPayload.name"
            placeholder="give a name to this formation"
          />
        </fieldset>
        <button @click="saveState">Save</button>
        <button @click="switchRoute('game-plan')">Cancel</button>
      </div>
    </section>
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

  .actions {
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
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      h2 {
        margin: 0;
      }
      fieldset {
        border: none;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 0;

        align-items: flex-start;
        flex-direction: column;
        input {
          width: 100%;
          padding: 5px;
        }
        label {
          font-size: 1rem;
          user-select: none;
        }
      }
    }
  }
}
</style>
