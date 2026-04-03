<template>
  <fieldset :class="['fieldset', fieldsetClass]">
    <legend v-if="legend" class="fieldset-legend">{{ legend }}</legend>
    <input
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :class="['file-input', inputClass]"
      @change="onChange"
    />
    <label v-if="helperText" class="label">{{ helperText }}</label>
    <label v-if="errorMessage" class="label text-red-500">{{ errorMessage }}</label>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
    fieldsetClass?: string;
    inputClass?: string;
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
    fieldsetClass: "",
    inputClass: "",
  },
);

const emit = defineEmits<{
  change: [files: FileList | null];
  invalid: [message: string];
}>();

const errorMessage = ref("");

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  errorMessage.value = "";

  if (!files || files.length === 0) {
    emit("change", null);
    return;
  }

  const maxBytes = props.maxSizeMB * 1024 * 1024;
  const hasInvalidSize = Array.from(files).some((file) => file.size > maxBytes);

  if (hasInvalidSize) {
    const message =
      props.invalidSizeMessage || `File size must be ${props.maxSizeMB}MB or less.`;

    errorMessage.value = message;
    target.value = "";
    emit("change", null);
    emit("invalid", message);
    return;
  }

  emit("change", files);
};
</script>