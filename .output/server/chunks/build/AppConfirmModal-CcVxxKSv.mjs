import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppConfirmModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: { default: "Confirm Action" },
    description: { default: "Are you sure you want to continue?" },
    confirmLabel: { default: "Confirm" },
    cancelLabel: { default: "Cancel" }
  },
  emits: ["update:open", "confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4" }, _attrs))} data-v-d309bded><div class="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl" data-v-d309bded><h4 class="text-sm font-bold uppercase tracking-widest text-slate-900" data-v-d309bded>${ssrInterpolate(__props.title)}</h4><p class="mt-3 text-sm leading-relaxed text-slate-500" data-v-d309bded>${ssrInterpolate(__props.description)}</p><div class="mt-8 flex justify-end gap-3" data-v-d309bded><button class="rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50" data-v-d309bded>${ssrInterpolate(__props.cancelLabel)}</button><button class="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800" data-v-d309bded>${ssrInterpolate(__props.confirmLabel)}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-d309bded"]]), { __name: "AppConfirmModal" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=AppConfirmModal-CcVxxKSv.mjs.map
