<template>
  <fieldset :class="['fieldset', fieldsetClass]">
    <legend
      v-if="legend"
      class="fieldset-legend text-sm font-medium tracking-tight text-slate-700"
    >
      {{ legend }}
    </legend>

    <input
      :id="inputId"
      ref="fileInputRef"
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="sr-only"
      @change="onChange"
    />

    <div
      :class="[
        'flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3',
        containerClass,
      ]"
    >
      <button
        type="button"
        :disabled="disabled"
        :class="[
          'inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60',
          triggerClass,
        ]"
        @click="openPicker"
      >
        {{ chooseFileText }}
      </button>

      <p :class="['truncate text-sm text-slate-600', fileNameClass]">
        {{ selectedFileLabel }}
      </p>
    </div>

    <label v-if="helperText" class="label text-xs text-slate-500">{{ helperText }}</label>
    <label v-if="errorMessage" class="label text-xs text-red-500">{{ errorMessage }}</label>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    legend?: string;
    helperText?: string;
    name?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    maxSizeMB?: number;
    invalidSizeMessage?: string;
    chooseFileText?: string;
    noFileSelectedText?: string;
    containerClass?: string;
    triggerClass?: string;
    fileNameClass?: string;
    fieldsetClass?: string;
  }>(),
  {
    legend: "Pick a file",
    helperText: "Max size 2MB",
    name: "file",
    accept: "",
    multiple: false,
    disabled: false,
    maxSizeMB: 2,
    invalidSizeMessage: "",
    chooseFileText: "Choose file",
    noFileSelectedText: "No file selected",
    containerClass: "",
    triggerClass: "",
    fileNameClass: "",
    fieldsetClass: "",
  },
);

const emit = defineEmits<{
  change: [files: FileList | null];
  invalid: [message: string];
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const errorMessage = ref("");
const selectedFiles = ref<File[]>([]);
const inputId = `app-file-input-${Math.random().toString(36).slice(2, 10)}`;

const selectedFileLabel = computed(() => {
  if (selectedFiles.value.length === 0) {
    return props.noFileSelectedText;
  }

  if (selectedFiles.value.length === 1) {
    return selectedFiles.value[0]?.name || props.noFileSelectedText;
  }

  return `${selectedFiles.value.length} files selected`;
});

const openPicker = () => {
  if (props.disabled) {
    return;
  }

  fileInputRef.value?.click();
};

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  errorMessage.value = "";

  if (!files || files.length === 0) {
    selectedFiles.value = [];
    emit("change", null);
    return;
  }

  const maxBytes = props.maxSizeMB * 1024 * 1024;
  const hasInvalidSize = Array.from(files).some((file) => file.size > maxBytes);

  if (hasInvalidSize) {
    const message =
      props.invalidSizeMessage || `File size must be ${props.maxSizeMB}MB or less.`;

    errorMessage.value = message;
    selectedFiles.value = [];
    target.value = "";
    emit("change", null);
    emit("invalid", message);
    return;
  }

  selectedFiles.value = Array.from(files);
  emit("change", files);
};
</script>