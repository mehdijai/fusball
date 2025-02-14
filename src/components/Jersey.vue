<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { TeamPlayer } from "../types/game.type";
import { usePlayStore } from "../store/play.store";
import { storeToRefs } from "pinia";
import { getJerseyColor } from "../utils/jersey-color";

const playStore = usePlayStore();
const { gamePlaySettings } = storeToRefs(playStore);

const props = defineProps<{
  player: TeamPlayer;
  editable?: boolean;
}>();

const _player = computed(() => props.player);

const position = computed(() => ({
  x: _player.value.xPos,
  y: _player.value.yPos,
}));

const colorSet = computed(() =>
  getJerseyColor(
    isKeeper.value,
    gamePlaySettings.value.playerSettings.colorScheme
  )
);

const isPixel = computed(() => _player.value.isPixel ?? false);

const isKeeper = computed(() => _player.value.position === "GK");

const displayPlayerName = computed(
  () => gamePlaySettings.value.playerSettings.showName ?? false
);
const displayPlayerNumber = computed(
  () => gamePlaySettings.value.playerSettings.showNumber ?? false
);
const displayPlayerCaptain = computed(
  () => gamePlaySettings.value.playerSettings.showCaptainBadge ?? false
);
const displayPlayerPosition = computed(
  () => gamePlaySettings.value.playerSettings.showPosition ?? false
);

const displayPlayerInfo = computed(
  () =>
    displayPlayerName.value === true ||
    displayPlayerCaptain.value === true ||
    displayPlayerPosition.value === true
);

const isEditable = computed(() => props.editable ?? false);

const jerseyRef = ref<SVGElement | null>(null);

defineExpose({
  jerseyRef,
});

function setPosition(x: number, y: number) {
  if (!jerseyRef.value) return;
  jerseyRef.value.style.top = `${y}${isPixel.value ? "px" : "%"}`;
  jerseyRef.value.style.left = `${x}${isPixel.value ? "px" : "%"}`;
}

onMounted(() => {
  setPosition(position.value.x, position.value.y);
});

watch(
  () => position.value,
  (to) => {
    setPosition(to.x, to.y);
  }
);
</script>

<template>
  <div class="jersey-wrapper" :class="{ editable: isEditable }" ref="jerseyRef">
    <svg
      class="jersey"
      width="252"
      height="304"
      viewBox="0 0 252 304"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="jersey">
        <path
          id="border"
          d="M111.644 0.401311C98.9796 1.84494 94.9768 3.4198 88.6774 9.45679C77.3252 20.2184 70.3039 24.2212 56.4582 27.8959C44.1874 31.1112 40.2502 32.5548 35.3287 35.7702C26.7326 41.3478 22.3361 48.041 17.349 63.2647C15.9054 67.8581 11.1152 85.4441 6.84991 102.44C-1.94309 137.087 -1.68061 133.478 4.29075 136.562C13.1494 141.089 28.5043 144.83 43.6624 146.142C48.5183 146.536 52.5867 146.93 52.6523 146.995C53.1772 147.389 54.2928 160.775 54.8833 173.637C55.802 194.372 54.7521 228.101 52.5867 248.771C50.6837 266.488 49.5682 281.646 49.5682 289.849C49.5682 298.97 48.8464 298.642 74.1755 301.266C101.014 304.022 135.53 304.744 157.84 303.038C173.589 301.791 197.802 299.035 199.246 298.248C199.902 297.92 200.755 297.067 201.149 296.345C202.527 293.786 201.608 275.15 198.787 248.771C196.621 228.232 195.571 193.716 196.49 173.309C197.081 160.775 198.196 147.389 198.721 146.995C198.787 146.93 202.855 146.536 207.711 146.142C222.869 144.83 238.224 141.089 247.083 136.562C252.923 133.543 252.726 134.068 250.757 126.981C249.839 123.569 246.426 110.051 243.145 96.9275C231.859 52.1094 228.119 43.6445 215.979 35.7702C211.189 32.6205 207.186 31.1112 195.112 27.9615C181.332 24.2868 174.311 20.3496 163.287 9.98175C157.118 4.20724 154.428 2.82923 146.291 1.3856C139.336 0.138833 119.125 -0.451742 111.644 0.401311Z"
          :fill="colorSet.border"
        />
        <path
          id="collar"
          d="M145.373 11.8848C152.066 13.1971 153.247 14.0502 153.247 17.7905C153.247 22.712 147.932 29.0771 139.073 34.7203C134.02 38.0013 127.458 41.0854 125.687 41.0854C122.406 41.0854 109.872 33.8673 104.754 29.0771C98.6515 23.2369 96.2892 16.675 99.3077 13.9846C103.114 10.5068 131.592 9.25998 145.373 11.8848Z"
          :fill="colorSet.collar"
        />
        <g>
          <path
            id="body-fill"
            d="M89.4647 26.1897C89.924 27.3709 90.2521 28.552 90.2521 28.8145C90.2521 29.5363 79.4249 36.4263 75.0941 38.4605C72.7318 39.5105 66.3667 41.6103 60.9203 42.9883C48.9775 46.0724 44.0561 48.1722 40.5126 51.7813C37.0348 55.3247 34.8693 60.0493 35.7224 62.2804C36.5098 64.249 38.8721 66.0207 40.7751 66.0207C42.2843 66.0207 45.6309 63.724 45.6309 62.6085C45.6309 61.0993 48.4526 58.1464 51.0773 56.9652C52.5866 56.1778 58.558 54.4061 64.3325 52.8968C76.144 49.8783 84.0183 46.4005 91.9582 40.6916C94.7143 38.723 97.0766 37.1482 97.339 37.1482C97.6015 37.1482 99.9638 38.7886 102.654 40.8229C109.479 45.9412 121.881 51.9125 125.687 51.9125C129.493 51.9125 141.895 45.9412 148.719 40.8229C151.409 38.7886 153.772 37.1482 154.034 37.1482C154.297 37.1482 156.659 38.723 159.415 40.6916C167.289 46.3349 175.229 49.8783 187.041 52.8968C200.493 56.3747 202.658 57.3589 205.48 61.8211C208.039 65.8239 210.204 66.8081 212.895 65.2989C213.814 64.7739 214.995 63.5272 215.454 62.5429C217.357 58.6057 211.386 50.5345 204.299 47.3192C202.133 46.3349 195.899 44.3663 190.387 42.9883C184.941 41.5447 178.576 39.5105 176.214 38.3949C171.423 36.1639 161.121 29.4707 161.121 28.6176C161.121 28.1583 162.302 25.0086 162.827 24.1555C162.893 24.0243 165.714 25.8616 169.061 28.1583C176.739 33.3422 181.135 35.1796 193.734 38.4605C213.945 43.7101 217.882 47.5817 224.706 68.7767C228.381 80.457 236.124 111.364 235.468 111.954C235.205 112.282 232.712 113.135 230.022 113.923C222.803 115.957 221.753 116.482 220.9 118.254C219.785 120.747 220.047 122.388 221.819 124.094C223.853 126.194 225.625 126.128 232.515 124.028C235.599 123.11 238.29 122.585 238.618 122.913C238.88 123.175 239.274 124.553 239.536 125.866C239.996 128.228 239.93 128.294 237.502 129.343C231.137 132.034 217.291 134.79 204.955 135.905C200.952 136.234 200.493 136.168 200.493 135.052C200.493 134.396 202.133 127.309 204.102 119.238C207.317 106.049 209.68 93.1215 209.68 88.5938C209.68 86.2971 206.923 83.738 204.43 83.738C200.624 83.738 199.64 85.6409 198.327 95.4838C197.671 100.34 195.703 109.92 193.931 116.81C188.681 137.546 187.172 148.176 185.991 173.308C185.072 194.307 186.122 229.282 188.288 249.099C189.994 264.388 191.7 288.274 191.175 288.864C190.715 289.324 176.607 290.898 161.449 292.211C145.241 293.589 109.085 293.72 93.8612 292.539C80.8029 291.489 60.5922 289.258 60.1984 288.799C59.6079 288.274 61.3796 264.519 63.0857 249.099C66.2354 220.226 66.5635 174.752 63.6763 149.357C62.2983 137.415 61.1827 131.575 57.4424 116.81C55.6707 109.92 53.7021 100.34 53.0459 95.4838C51.7335 85.6409 50.7492 83.738 46.9433 83.738C44.4498 83.738 41.6938 86.2971 41.6938 88.5938C41.6938 93.1215 44.0561 106.049 47.2714 119.238C49.24 127.309 50.8805 134.396 50.8805 135.118C50.8805 136.168 50.4868 136.234 46.8121 135.905C33.3601 134.659 22.1392 132.428 15.1179 129.737C11.9025 128.49 11.8369 128.359 11.9682 125.997C12.0994 124.619 12.4275 123.241 12.7556 122.913C13.0837 122.585 15.6428 123.11 18.8582 124.028C25.7482 126.128 27.52 126.194 29.5542 124.094C31.3259 122.322 31.5884 120.747 30.4728 118.254C29.6854 116.548 27.9793 115.76 20.6299 113.595C18.6613 113.004 16.6271 112.282 16.1678 112.02C15.1835 111.364 22.4016 82.0975 27.0606 67.6612C30.7353 56.3747 33.032 51.6501 36.7723 47.9754C40.9063 43.8413 46.3527 41.3478 57.9674 38.3293C69.582 35.3764 76.6033 32.2923 83.3621 27.4365C85.9213 25.5991 88.0867 24.0899 88.2836 24.0899C88.546 24.0243 89.0054 25.0086 89.4647 26.1897Z"
            :fill="colorSet.fill"
          />
          <text
            v-if="displayPlayerNumber"
            x="50%"
            y="50%"
            id="jersey-number"
            :fill="colorSet.number"
            dominant-baseline="middle"
            text-anchor="middle"
            style="font-family: inherit; font-size: 60px; font-weight: 700"
          >
            {{ _player.number }}
          </text>
        </g>
        <path
          id="collar-stroke"
          d="M101.079 51.2563C100.161 52.1094 99.439 53.4218 99.439 54.1436C99.439 57.3589 100.948 58.8026 107.576 62.0179C123.587 69.8266 127.787 69.8266 143.798 62.0835C150.425 58.8682 151.935 57.4246 151.935 54.1436C151.935 52.3062 149.047 49.6158 147.144 49.6158C146.226 49.6158 142.485 51.0595 138.745 52.8312C135.005 54.6685 130.543 56.5059 128.771 56.9652C124.834 58.0151 122.078 57.2933 112.76 52.8968C108.954 51.0595 105.082 49.6158 104.229 49.6158C103.376 49.6158 101.933 50.3377 101.079 51.2563Z"
          :fill="colorSet.collarStroke"
        />
        <path
          id="emblem"
          d="M182.776 86.3628C181.398 83.8036 175.426 81.6382 169.061 81.3757C165.977 81.2445 162.302 81.4413 160.924 81.7694C157.315 82.6881 153.378 84.8535 152.591 86.4284C152.131 87.2815 151.934 91.4155 152.066 98.1087C152.263 108.28 152.263 108.477 154.231 111.626C156.397 115.104 161.121 118.713 165.124 119.894C167.093 120.485 168.274 120.485 170.242 119.894C174.245 118.713 178.97 115.104 181.135 111.626C183.104 108.477 183.104 108.28 183.301 98.1087C183.432 91.153 183.301 87.2815 182.776 86.3628ZM179.495 98.7649C179.363 106.442 179.363 106.574 177.854 108.936C176.214 111.561 172.67 114.251 169.652 115.17C168.142 115.629 167.289 115.629 165.78 115.17C162.762 114.251 159.218 111.561 157.578 108.936C156.069 106.574 156.069 106.442 155.937 98.7649C155.806 93.7122 156.003 90.628 156.331 89.9719C156.922 88.7907 159.874 87.1502 162.63 86.4284C163.68 86.1659 166.436 86.0347 168.733 86.1659C173.523 86.3628 178.051 88.0033 179.101 89.9062C179.495 90.628 179.56 93.5153 179.495 98.7649Z"
          :fill="colorSet.emblem"
        />
      </g>
    </svg>

    <div
      v-if="displayPlayerInfo"
      :class="{ data: true, bg: displayPlayerName }"
    >
      <div
        v-if="displayPlayerCaptain && _player.isCaptain"
        class="captain-badge"
      >
        <span>C</span>
      </div>
      <span v-if="displayPlayerName" class="name">{{ _player.name }}</span>
      <div v-if="displayPlayerPosition" class="position-badge">
        <span>{{ _player.position }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.jersey-wrapper {
  position: absolute;
  width: 50px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  &.editable {
    &:hover {
      cursor: grab;
    }
  }
  &.selected {
    background-color: violet;
  }
  .jersey {
    width: 100%;
    height: auto;
    pointer-events: none;
  }
  .data {
    margin-top: 5px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    overflow: hidden;

    &.bg {
      background-color: rgba(50, 50, 50, 0.8);
      min-width: 100%;
      gap: 10px;
    }

    .captain-badge {
      font-size: 0.6rem;
      text-align: center;
      line-height: 1;
      font-weight: 600;
      background-color: rgb(174, 124, 17);
      color: white;
      width: 15px;
      height: 15px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    .name {
      font-family: inherit;
      margin: 0 auto;
      font-size: 0.6rem;
      text-align: center;
      line-height: 1;
      font-weight: 600;
      letter-spacing: 0.5px;
      word-break: keep-all;
      min-width: max-content;
      color: white;
      padding: 0 5px;
    }
    .position-badge {
      font-size: 0.6rem;
      text-align: center;
      line-height: 1;
      font-weight: 600;
      background-color: rgb(206, 13, 13);
      color: white;
      height: 15px;
      width: fit-content;
      padding: 0 5px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
