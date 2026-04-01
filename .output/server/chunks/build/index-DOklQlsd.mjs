import { defineComponent, ref, reactive, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(false);
    const message = ref("");
    const showPassword = ref(false);
    const form = reactive({
      username: "",
      password: "",
      remember: false
    });
    watch(
      () => form.remember,
      (remember) => {
        {
          return;
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-6 font-sans text-slate-900" }, _attrs))}><div class="pointer-events-none absolute inset-0 z-0 overflow-hidden"><div class="absolute left-0 top-0 h-full w-full" style="${ssrRenderStyle({ "background-color": "#f8fafc", "background-image": "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.05) 0px, transparent 50%),\n            radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.05) 0px, transparent 50%),\n            radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.05) 0px, transparent 50%),\n            radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.05) 0px, transparent 50%)" })}"></div></div><div class="relative z-10 w-full max-w-md"><div class="rounded-[2.5rem] border border-white/80 bg-white/70 p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.03)] backdrop-blur-2xl md:p-14"><div class="mb-12 text-center"><h1 class="mb-3 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">Wealth Archive</h1><h2 class="text-4xl font-light tracking-tighter text-slate-900">BALANCE</h2></div><form class="space-y-7"><div class="group space-y-2"><label class="ml-1 block text-[10px] font-semibold uppercase tracking-widest text-slate-400 transition-all group-focus-within:-translate-y-0.5 group-focus-within:text-indigo-600"> Identification </label><input${ssrRenderAttr("value", form.username)} type="text" class="w-full rounded-2xl border border-slate-100 bg-white/50 px-6 py-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:bg-white focus:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)]" placeholder="Username" required></div><div class="group space-y-2"><label class="ml-1 block text-[10px] font-semibold uppercase tracking-widest text-slate-400 transition-all group-focus-within:-translate-y-0.5 group-focus-within:text-indigo-600"> Security Key </label><div class="relative"><input${ssrRenderDynamicModel(showPassword.value ? "text" : "password", form.password, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} class="w-full rounded-2xl border border-slate-100 bg-white/50 px-6 py-4 pr-16 text-sm tracking-widest outline-none transition-all placeholder:text-slate-300 focus:bg-white focus:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)]" placeholder="••••••••" required><button type="button"${ssrRenderAttr("aria-label", showPassword.value ? "Hide password" : "Show password")} class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-indigo-600">`);
      if (showPassword.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18"></path><path stroke-linecap="round" stroke-linejoin="round" d="M10.58 10.58a2 2 0 102.83 2.83"></path><path stroke-linecap="round" stroke-linejoin="round" d="M9.88 5.09A9.77 9.77 0 0112 4.88c4.56 0 8.2 2.9 9.5 7.12a10.06 10.06 0 01-4.23 5.56"></path><path stroke-linecap="round" stroke-linejoin="round" d="M6.61 6.62A10.05 10.05 0 002.5 12c.53 1.7 1.52 3.21 2.82 4.37"></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.46 12C3.73 7.94 7.5 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.04 7-9.54 7s-8.27-2.94-9.54-7z"></path><circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round"></circle></svg>`);
      }
      _push(`</button></div></div><div class="flex items-center px-1"><label class="group flex cursor-pointer items-center"><div class="relative mr-2 h-4 w-4"><input${ssrIncludeBooleanAttr(Array.isArray(form.remember) ? ssrLooseContain(form.remember, null) : form.remember) ? " checked" : ""} type="checkbox" class="peer hidden"><div class="h-full w-full rounded-md border border-slate-200 transition-all peer-checked:border-slate-900 peer-checked:bg-slate-900"></div></div><span class="whitespace-nowrap text-[11px] text-slate-400 transition-colors group-hover:text-slate-600">Keep me signed in</span></label></div><div class="pt-4"><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="group relative w-full overflow-hidden rounded-2xl bg-slate-900 py-4 shadow-xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-50">`);
      if (loading.value) {
        _push(`<div class="flex items-center justify-center"><div class="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div></div>`);
      } else {
        _push(`<span class="text-xs font-bold uppercase tracking-[0.2em] text-white">Login</span>`);
      }
      _push(`<div class="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 transition-all group-hover:w-full"></div></button></div></form><div class="mt-12 text-center"><p class="text-xs font-light text-slate-400"> New to the system? <a href="/register" class="ml-1 border-b border-slate-900/10 pb-0.5 font-semibold text-slate-900 transition-all hover:border-slate-900"> ลงทะเบียน (Register) </a></p></div></div><div class="mt-10 flex items-center justify-center space-x-3 text-center"><div class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div><p class="text-[9px] uppercase tracking-[0.3em] text-slate-400">System Operational</p></div></div>`);
      if (message.value) {
        _push(`<div class="fixed top-6 right-6 z-50 rounded-2xl border border-slate-100 bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-2xl">${ssrInterpolate(message.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DOklQlsd.mjs.map
