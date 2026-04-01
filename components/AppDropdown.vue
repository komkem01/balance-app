<template>
  <div ref="root" class="relative block w-full text-left">
    <button
      type="button"
      :class="computedTriggerClass"
      :disabled="disabled"
      aria-haspopup="menu"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-disabled="disabled ? 'true' : 'false'"
      @click="toggle"
    >
      <slot name="trigger" :open="open" :selected-item="selectedItem">
        <span>{{ selectedItem?.label ?? label }}</span>
        <svg
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </slot>
    </button>

    <Transition name="dropdown-pop">
      <ul v-if="open" :class="computedMenuClass" role="menu" tabindex="-1">
        <li v-for="item in items" :key="String(item.value)">
          <slot name="item" :item="item" :select="() => handleSelect(item)">
            <button
              type="button"
              class="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
              role="menuitem"
              @click="handleSelect(item)"
            >
              {{ item.label }}
            </button>
          </slot>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

type DropdownItem = {
  label: string;
  value: string | number;
};

const props = withDefaults(
  defineProps<{
    label?: string;
    items: DropdownItem[];
    modelValue?: string | number | null;
    align?: "left" | "right";
    triggerClass?: string;
    menuClass?: string;
    closeOnSelect?: boolean;
    unstyled?: boolean;
    disabled?: boolean;
  }>(),
  {
    label: "Click",
    modelValue: null,
    align: "left",
    triggerClass: "",
    menuClass: "",
    closeOnSelect: true,
    unstyled: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "select", item: DropdownItem): void;
}>();

const root = ref<HTMLElement | null>(null);
const open = ref(false);

const selectedItem = computed(() => {
  return props.items.find((item) => item.value === props.modelValue) ?? null;
});

const computedTriggerClass = computed(() => {
  if (props.unstyled) {
    return props.triggerClass;
  }

  const base =
    "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50";
  const disabledClass = props.disabled ? "opacity-60 cursor-not-allowed" : "";
  return props.triggerClass
    ? `${base} ${disabledClass} ${props.triggerClass}`
    : `${base} ${disabledClass}`;
});

const computedMenuClass = computed(() => {
  const alignClass = props.align === "right" ? "right-0" : "left-0";
  const base =
    `absolute ${alignClass} z-40 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl`;
  return props.menuClass ? `${base} ${props.menuClass}` : base;
});

const toggle = () => {
  if (props.disabled) {
    return;
  }

  open.value = !open.value;
};

const close = () => {
  open.value = false;
};

const handleSelect = (item: DropdownItem) => {
  emit("update:modelValue", item.value);
  emit("select", item);
  if (props.closeOnSelect) {
    close();
  }
};

const onDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node | null;
  if (!root.value || !target) {
    return;
  }

  if (!root.value.contains(target)) {
    close();
  }
};

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
});
</script>

<style scoped>
.dropdown-pop-enter-active,
.dropdown-pop-leave-active {
  transition: all 0.16s ease;
}

.dropdown-pop-enter-from,
.dropdown-pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
