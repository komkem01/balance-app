import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderSlot, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppDropdown",
  __ssrInlineRender: true,
  props: {
    label: { default: "Click" },
    items: {},
    modelValue: { default: null },
    align: { default: "left" },
    triggerClass: { default: "" },
    menuClass: { default: "" },
    closeOnSelect: { type: Boolean, default: true },
    unstyled: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const root = ref(null);
    const open = ref(false);
    const selectedItem = computed(() => {
      return props.items.find((item) => item.value === props.modelValue) ?? null;
    });
    const computedTriggerClass = computed(() => {
      if (props.unstyled) {
        return props.triggerClass;
      }
      const base = "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50";
      const disabledClass = props.disabled ? "opacity-60 cursor-not-allowed" : "";
      return props.triggerClass ? `${base} ${disabledClass} ${props.triggerClass}` : `${base} ${disabledClass}`;
    });
    const computedMenuClass = computed(() => {
      const alignClass = props.align === "right" ? "right-0" : "left-0";
      const base = `absolute ${alignClass} z-40 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl`;
      return props.menuClass ? `${base} ${props.menuClass}` : base;
    });
    const close = () => {
      open.value = false;
    };
    const handleSelect = (item) => {
      emit("update:modelValue", item.value);
      emit("select", item);
      if (props.closeOnSelect) {
        close();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "root",
        ref: root,
        class: "relative inline-block text-left"
      }, _attrs))} data-v-aae7216e><button type="button" class="${ssrRenderClass(computedTriggerClass.value)}"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} aria-haspopup="menu"${ssrRenderAttr("aria-expanded", open.value ? "true" : "false")}${ssrRenderAttr("aria-disabled", __props.disabled ? "true" : "false")} data-v-aae7216e>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {
        open: open.value,
        selectedItem: selectedItem.value
      }, () => {
        _push(`<span data-v-aae7216e>${ssrInterpolate(selectedItem.value?.label ?? __props.label)}</span><svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-v-aae7216e><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" data-v-aae7216e></path></svg>`);
      }, _push, _parent);
      _push(`</button>`);
      if (open.value) {
        _push(`<ul class="${ssrRenderClass(computedMenuClass.value)}" role="menu" tabindex="-1" data-v-aae7216e><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(`<li data-v-aae7216e>`);
          ssrRenderSlot(_ctx.$slots, "item", {
            item,
            select: () => handleSelect(item)
          }, () => {
            _push(`<button type="button" class="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100" role="menuitem" data-v-aae7216e>${ssrInterpolate(item.label)}</button>`);
          }, _push, _parent);
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppDropdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-aae7216e"]]), { __name: "AppDropdown" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppDropdown-CgoRgesi.mjs.map
