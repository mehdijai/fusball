<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { usePlayStore } from "../store/play.store";
import { storeToRefs } from "pinia";

const playStore = usePlayStore();
const { gamePlaySettings } = storeToRefs(playStore);

const showGuides = computed(
  () => gamePlaySettings.value.pitchSettings.showGuides ?? false
);

watch(
  () => showGuides.value,
  (to) => {
    if (to === true) {
      drawGuides();
    } else {
      hideGuides();
    }
  }
);

const fieldRef = ref<SVGRectElement | null>(null);
const teamContainer = ref<HTMLDivElement | null>(null);

const pitchGuides = ref<HTMLDivElement | null>(null);

function hideGuides() {
  if (!pitchGuides.value) return;
  pitchGuides.value.innerHTML = "";
}

function drawGuides(horizontalLines = 6, verticalLines = 10) {
  if (!pitchGuides.value || !teamContainer.value) return;

  pitchGuides.value.innerHTML = "";

  const boxBound = teamContainer.value.getBoundingClientRect();

  for (let i = 0; i < horizontalLines + 1; i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.classList.add("horizontal");

    line.style.left = `${(boxBound.width / horizontalLines) * i}px`;

    pitchGuides.value.appendChild(line);

    const value = document.createElement("span");
    value.innerText = `${i + 1}`;
    value.classList.add("value");
    value.classList.add("horizontal");

    value.style.left = `${(boxBound.width / horizontalLines) * i}px`;

    pitchGuides.value.appendChild(value);
  }

  for (let j = 0; j < verticalLines + 1; j++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.classList.add("vertical");

    line.style.top = `${(boxBound.height / verticalLines) * j}px`;

    pitchGuides.value.appendChild(line);

    const value = document.createElement("span");
    value.innerText = `${j + 1}`;
    value.classList.add("value");
    value.classList.add("vertical");

    value.style.top = `${(boxBound.height / verticalLines) * j}px`;

    pitchGuides.value.appendChild(value);
  }
}

onMounted(() => {
  if (fieldRef.value && teamContainer.value) {
    const fieldBound = fieldRef.value.getBoundingClientRect();
    const containerBound = teamContainer.value.getBoundingClientRect();

    const dx = (containerBound.width - fieldBound.width) / 2;
    const dy = (containerBound.height - fieldBound.height) / 2;

    teamContainer.value.style.width = fieldBound.width + "px";
    teamContainer.value.style.height = fieldBound.height + "px";

    teamContainer.value.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  if (showGuides.value === true) {
    drawGuides();
  }
});
</script>

<template>
  <div class="football-field">
    <svg
      id="field-pitch"
      width="1821"
      height="2812"
      viewBox="0 0 1821 2812"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="football-pitch">
        <g id="pitch">
          <rect
            id="field"
            ref="fieldRef"
            x="50.5834"
            y="77.875"
            width="1719.83"
            height="2655.62"
            fill="#83B327"
          />
          <rect
            id="stripe"
            x="50.5834"
            y="77.875"
            width="245.69"
            height="2655.62"
            fill="#7BA924"
          />
          <rect
            id="stripe_2"
            x="541.242"
            y="77.875"
            width="245.69"
            height="2655.62"
            fill="#7BA924"
          />
          <rect
            id="stripe_3"
            x="1031.9"
            y="77.875"
            width="245.69"
            height="2655.62"
            fill="#7BA924"
          />
          <rect
            id="stripe_4"
            x="1522.56"
            y="77.875"
            width="245.69"
            height="2655.62"
            fill="#7BA924"
          />
        </g>
        <rect
          id="field_2"
          x="51.5834"
          y="78.875"
          width="1717.83"
          height="2653.62"
          stroke="#336294"
          stroke-width="2"
        />
        <g id="middfield">
          <path
            id="halfway-line"
            d="M50.5834 1405.69H1770.42"
            stroke="#336294"
            stroke-width="3"
          />
          <circle
            id="center-circle"
            cx="909.235"
            cy="1406.95"
            r="229.919"
            stroke="#336294"
            stroke-width="3"
          />
          <circle
            id="center-mark"
            cx="910.5"
            cy="1405.69"
            r="12.6458"
            fill="#336294"
          />
        </g>
        <g id="corners">
          <g id="corner-bottom-right">
            <mask id="path-10-inside-1_1_189" fill="white">
              <path
                d="M1719.83 2733.5C1719.83 2720.08 1725.16 2707.22 1734.65 2697.73C1744.14 2688.25 1757 2682.92 1770.42 2682.92L1770.42 2733.5L1719.83 2733.5Z"
              />
            </mask>
            <path
              d="M1719.83 2733.5C1719.83 2720.08 1725.16 2707.22 1734.65 2697.73C1744.14 2688.25 1757 2682.92 1770.42 2682.92L1770.42 2733.5L1719.83 2733.5Z"
              stroke="#336294"
              stroke-width="4"
              mask="url(#path-10-inside-1_1_189)"
            />
          </g>
          <g id="corner-bottom-left">
            <mask id="path-11-inside-2_1_189" fill="white">
              <path
                d="M101.167 2733.5C101.167 2720.08 95.8373 2707.22 86.3511 2697.73C76.8649 2688.25 63.9988 2682.92 50.5833 2682.92L50.5833 2733.5L101.167 2733.5Z"
              />
            </mask>
            <path
              d="M101.167 2733.5C101.167 2720.08 95.8373 2707.22 86.3511 2697.73C76.8649 2688.25 63.9988 2682.92 50.5833 2682.92L50.5833 2733.5L101.167 2733.5Z"
              stroke="#336294"
              stroke-width="4"
              mask="url(#path-11-inside-2_1_189)"
            />
          </g>
          <g id="corner-top-left">
            <mask id="path-12-inside-3_1_189" fill="white">
              <path
                d="M101.167 77.8749C101.167 91.2905 95.8373 104.157 86.3511 113.643C76.8649 123.129 63.9988 128.458 50.5833 128.458L50.5833 77.8749L101.167 77.8749Z"
              />
            </mask>
            <path
              d="M101.167 77.8749C101.167 91.2905 95.8373 104.157 86.3511 113.643C76.8649 123.129 63.9988 128.458 50.5833 128.458L50.5833 77.8749L101.167 77.8749Z"
              stroke="#336294"
              stroke-width="4"
              mask="url(#path-12-inside-3_1_189)"
            />
          </g>
          <g id="corner-top-right">
            <mask id="path-13-inside-4_1_189" fill="white">
              <path
                d="M1719.83 77.8749C1719.83 91.2905 1725.16 104.157 1734.65 113.643C1744.14 123.129 1757 128.458 1770.42 128.458L1770.42 77.8749L1719.83 77.8749Z"
              />
            </mask>
            <path
              d="M1719.83 77.8749C1719.83 91.2905 1725.16 104.157 1734.65 113.643C1744.14 123.129 1757 128.458 1770.42 128.458L1770.42 77.8749L1719.83 77.8749Z"
              stroke="#336294"
              stroke-width="4"
              mask="url(#path-13-inside-4_1_189)"
            />
          </g>
        </g>
        <g id="home-side">
          <rect
            id="penalty-area"
            x="400.608"
            y="2317.19"
            width="1017.76"
            height="415.312"
            stroke="#336294"
            stroke-width="2"
          />
          <rect
            id="goal-area"
            x="678.817"
            y="2595.4"
            width="461.343"
            height="137.104"
            stroke="#336294"
            stroke-width="2"
          />
          <circle
            id="penalty-mark"
            cx="910.5"
            cy="2455.29"
            r="12.6458"
            fill="#336294"
          />
          <path
            id="penalty-arc"
            d="M1093.88 2316.19C1051.59 2260.84 984.901 2225.14 909.873 2225.14C834.845 2225.14 768.156 2260.84 725.871 2316.19H732.279C773.738 2263.8 837.881 2230.2 909.873 2230.2C981.866 2230.2 1046.01 2263.8 1087.47 2316.19H1093.88Z"
            fill="#336294"
          />
          <rect
            id="goal-home"
            x="815.921"
            y="2732.5"
            width="186.629"
            height="77.875"
            stroke="#336294"
            stroke-width="2"
          />
        </g>
        <g id="away-side">
          <rect
            id="penalty-area_2"
            x="1"
            y="-1"
            width="1017.76"
            height="415.312"
            transform="matrix(1 0 0 -1 399.608 493.188)"
            stroke="#336294"
            stroke-width="2"
          />
          <rect
            id="goal-area_2"
            x="1"
            y="-1"
            width="461.343"
            height="137.104"
            transform="matrix(1 0 0 -1 677.817 214.979)"
            stroke="#336294"
            stroke-width="2"
          />
          <circle
            id="penalty-mark_2"
            cx="12.6458"
            cy="12.6458"
            r="12.6458"
            transform="matrix(1 0 0 -1 897.854 368.729)"
            fill="#336294"
          />
          <path
            id="penalty-arc_2"
            d="M1093.88 495.188C1051.59 550.533 984.901 586.238 909.873 586.238C834.845 586.238 768.156 550.533 725.871 495.188H732.279C773.738 547.571 837.881 581.179 909.873 581.179C981.866 581.179 1046.01 547.571 1087.47 495.188H1093.88Z"
            fill="#336294"
          />
          <rect
            id="goal-away"
            x="815.921"
            y="1"
            width="186.629"
            height="77.875"
            stroke="#336294"
            stroke-width="2"
          />
        </g>
      </g>
    </svg>
    <div class="team-container" ref="teamContainer">
      <div class="team-members">
        <div class="guides-container">
          <div class="guides" ref="pitchGuides" />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.football-field {
  height: 100%;
  width: fit-content;
  position: relative;

  .team-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    .team-members {
      width: 100%;
      height: 100%;
      position: relative;
      .guides-container {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .guides {
          width: 100%;
          height: 100%;
          position: relative;

          .line {
            position: absolute;
            &.horizontal {
              height: 100%;
              width: 3px;
              border-left: 2px dashed rgba(154, 25, 25, 0.2);
              top: 0;
            }
            &.vertical {
              width: 100%;
              height: 3px;
              left: 0;
              border-top: 2px dashed rgba(154, 25, 25, 0.2);
            }
          }
          .value {
            position: absolute;
            /* &.horizontal {
              height: 100%;
              width: 3px;
              border-left: 2px dashed rgba(154, 25, 25, 0.2);
              top: 0;
            } */
            &.horizontal {
              top: -10px;
              font-weight: 700;
              font-size: 1rem;
              color: rgba(154, 25, 25, 0.8);
              z-index: 100;
              transform: translate(-50%, -50%);
              text-align: center;
            }
            &.vertical {
              left: -10px;
              font-weight: 700;
              font-size: 1rem;
              color: rgba(154, 25, 25, 0.8);
              z-index: 100;
              transform: translate(-50%, -50%);
              text-align: center;
            }
          }
        }
      }
    }
  }
  svg#field-pitch {
    height: 100%;
    width: auto;
    z-index: 0;
  }
}
</style>
