<template>
  <div :class="wrapperClass" role="status" aria-live="polite" :aria-label="label || 'Loading'">
    <span :class="['loading', 'loading-dots', sizeClass]"></span>
    <p v-if="label" class="text-xs font-semibold tracking-wide text-slate-500">
      {{ label }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type LoadingSize = "xs" | "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    size?: LoadingSize;
    fullScreen?: boolean;
    overlay?: boolean;
    label?: string;
  }>(),
  {
    size: "lg",
    fullScreen: false,
    overlay: false,
    label: "",
  }
);

const sizeClass = computed(() => `loading-${props.size}`);

const wrapperClass = computed(() => {
  const base = "flex items-center justify-center gap-3";

  if (props.fullScreen) {
    return `${base} h-screen w-full`;
  }

  if (props.overlay) {
    return `${base} absolute inset-0 z-50 bg-white/70 backdrop-blur-[1px]`;
  }

  return base;
});
</script>
