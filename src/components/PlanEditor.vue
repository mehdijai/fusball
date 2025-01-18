<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRaw,
  useTemplateRef,
  watch,
  type ComponentPublicInstance,
} from "vue";
import Jersey from "./Jersey.vue";
import Pitch from "./Pitch.vue";
import {
  PositionNames,
  type Formation,
  type TeamPlayer,
} from "../types/game.type";
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
  player: TeamPlayer;
}>;

const players = reactive<ExposedPlayer[]>([]);

function setJerseyRef(el: ExposedPlayer) {
  players.push(el);
}

const grabbedEl = ref<ExposedPlayer | null>(null);

function setGrabbedEl(player: ExposedPlayer | null) {
  return (e: Event) => {
    e.stopPropagation();
    if (grabbedEl.value === null) {
      grabbedEl.value = player;
    }
  };
}

function unsetGrabbedEl(e: Event) {
  e.stopPropagation();
  if (grabbedEl.value?.jerseyRef)
    grabbedEl.value.jerseyRef.style.cursor = "grab";
  grabbedEl.value = null;
}

function movementsHandler(field: HTMLDivElement) {
  return (e: MouseEvent) => {
    if (grabbedEl.value?.jerseyRef) {
      const bBox = field.getBoundingClientRect();
      const dx = e.clientX - bBox.x;
      const dy = e.clientY - bBox.y;
      grabbedEl.value.jerseyRef.style.cursor = "grabbing";
      const match = newFormationPayload.value.players.find(
        (p) => p.number === grabbedEl.value?.$props.player.number
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

const selectedPlayer = ref<ExposedPlayer | null>(null);
const selectedPlayerData = ref<TeamPlayer | null>(null);

watch(
  () => selectedPlayer.value,
  (to) => {
    if (to !== null) {
      selectedPlayerData.value = structuredClone(toRaw(to.$props.player));
    } else {
      selectedPlayerData.value = null;
    }
  }
);

function deleteSelectedPlayer() {
  if (selectedPlayer.value) {
    newFormationPayload.value.players =
      newFormationPayload.value.players.filter(
        (p) => p.number !== selectedPlayer.value!.$props.player.number
      );

    selectedPlayer.value = null;
  }
}

function saveSelectedPlayer() {
  if (!selectedPlayerData.value) return;

  const match = newFormationPayload.value.players.find(
    (p) => p.number === selectedPlayer.value?.$props.player?.number
  );

  if (match) {
    if (match.name !== selectedPlayerData.value.name)
      match.name = selectedPlayerData.value.name;
    if (match.number !== selectedPlayerData.value.number.toString()) {
      if (
        newFormationPayload.value.players.some(
          (p) => p.number === selectedPlayerData.value?.number
        )
      ) {
        alert("Number already exists");
        return;
      }
      match.number = selectedPlayerData.value.number.toString();
    }
    if (match.position !== selectedPlayerData.value.position)
      match.position = selectedPlayerData.value.position;
    if (match.isCaptain !== selectedPlayerData.value.isCaptain) {
      if (selectedPlayerData.value.isCaptain === true) {
        newFormationPayload.value.players.forEach((p) => (p.isCaptain = false));
      }
      match.isCaptain = selectedPlayerData.value.isCaptain;
    }
  }

  selectedPlayer.value?.jerseyRef?.classList.remove("selected");
  selectedPlayer.value = null;
}

function handleJerseyClick(player: ExposedPlayer) {
  return () => {
    if (grabbedEl.value !== null) return;
    document
      .querySelector(".jersey-wrapper.selected")
      ?.classList.remove("selected");
    if (selectedPlayer.value === null) {
      selectedPlayer.value = player;
      player.jerseyRef?.classList.add("selected");
    } else if (
      selectedPlayer.value.$props.player.number === player.$props.player.number
    ) {
      selectedPlayer.value = null;
      player.jerseyRef?.classList.remove("selected");
    } else {
      selectedPlayer.value = player;
      player.jerseyRef?.classList.add("selected");
    }
  };
}

onMounted(() => {
  if (!gamePitch.value || !(players.length > 0)) return;

  const field = gamePitch.value.teamContainer;

  if (!field) return;

  players.forEach((player) => {
    if (player.jerseyRef) {
      player.jerseyRef.addEventListener("mousedown", setGrabbedEl(player));
      listeners.push(() =>
        player.jerseyRef?.removeEventListener("mousedown", setGrabbedEl(player))
      );
      player.jerseyRef.addEventListener("mouseup", unsetGrabbedEl);
      listeners.push(() =>
        player.jerseyRef?.removeEventListener("mouseup", unsetGrabbedEl)
      );
      player.jerseyRef.addEventListener("click", handleJerseyClick(player));
      listeners.push(() =>
        player.jerseyRef?.removeEventListener(
          "click",
          handleJerseyClick(player)
        )
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

  if (newFormationPayload.value.players.every((p) => p.isCaptain === false)) {
    alert("You must set at least one captain");
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
    <section class="actions">
      <h2>Player Editor</h2>
      <template v-if="selectedPlayerData">
        <div>
          <fieldset>
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="selectedPlayerData.name"
              placeholder="Player's Name"
            />
          </fieldset>
          <fieldset>
            <label for="number">Number</label>
            <input
              type="number"
              id="number"
              v-model="selectedPlayerData.number"
              placeholder="Player's number"
            />
          </fieldset>
          <fieldset class="inline">
            <input
              type="checkbox"
              id="isCaptain"
              v-model="selectedPlayerData.isCaptain"
            />
            <label for="isCaptain">Is Captain</label>
          </fieldset>
          <fieldset>
            <label for="position">Position</label>
            <select id="position" v-model="selectedPlayerData.position">
              <template
                v-for="positionName in PositionNames"
                :key="positionName"
              >
                <option :value="positionName">{{ positionName }}</option>
              </template>
            </select>
          </fieldset>
          <button @click="saveSelectedPlayer">Save</button>
          <button @click="deleteSelectedPlayer">Delete</button>
        </div>
      </template>
      <template v-else>
        <p>No player is selected yet</p>
      </template>
    </section>
    <Pitch class="game-plan_pitch" ref="gamePitch">
      <template v-for="player in newFormationPayload.players" :key="player._id">
        <Jersey
          :ref="(el) => setJerseyRef(el as ExposedPlayer)"
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

        &:not(.inline) {
          align-items: flex-start;
          flex-direction: column;
          input {
            width: 100%;
            padding: 5px;
          }
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
