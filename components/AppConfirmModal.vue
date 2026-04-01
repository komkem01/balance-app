<template>
  <Transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
      @click="onCancel"
    >
      <div
        class="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl"
        @click.stop
      >
        <h4 class="text-sm font-bold uppercase tracking-widest text-slate-900">
          {{ title }}
        </h4>
        <p class="mt-3 text-sm leading-relaxed text-slate-500">
          {{ description }}
        </p>
        <div class="mt-8 flex justify-end gap-3">
          <button
            class="rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50"
            @click="onCancel"
          >
            {{ cancelLabel }}
          </button>
          <button
            class="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800"
            @click="onConfirm"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
  }>(),
  {
    title: "Confirm Action",
    description: "Are you sure you want to continue?",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  }
);

const emit = defineEmits<{
  "update:open": [value: boolean];
  confirm: [];
  cancel: [];
}>();

const onCancel = () => {
  emit("update:open", false);
  emit("cancel");
};

const onConfirm = () => {
  emit("confirm");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
