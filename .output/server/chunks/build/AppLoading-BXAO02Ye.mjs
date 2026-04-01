import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppLoading",
  __ssrInlineRender: true,
  props: {
    size: { default: "lg" },
    fullScreen: { type: Boolean, default: false },
    overlay: { type: Boolean, default: false },
    label: { default: "" }
  },
  setup(__props) {
    const props = __props;
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: wrapperClass.value,
        role: "status",
        "aria-live": "polite",
        "aria-label": __props.label || "Loading"
      }, _attrs))}><span class="${ssrRenderClass(["loading", "loading-dots", sizeClass.value])}"></span>`);
      if (__props.label) {
        _push(`<p class="text-xs font-semibold tracking-wide text-slate-500">${ssrInterpolate(__props.label)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppLoading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "AppLoading" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppLoading-BXAO02Ye.mjs.map
