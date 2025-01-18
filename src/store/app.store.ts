import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";

type RouteName = "game-plan" | "plan-editor";

export const useAppStore = defineStore("app-store", () => {
  const activeRoute = ref<RouteName>("game-plan");

  const route = computed(() =>
    new URL(window.location.toString()).searchParams.get("route")
  );

  watchEffect(() => {
    if (route.value && ["game-plan", "plan-editor"].includes(route.value)) {
      activeRoute.value = route.value as RouteName;
    }
  });

  function switchRoute(route: RouteName) {
    window.location.search = `?route=${route}`;
    // activeRoute.value = route;
  }

  return {
    activeRoute,
    switchRoute,
  };
});
