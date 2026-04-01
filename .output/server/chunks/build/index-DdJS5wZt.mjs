import { _ as __nuxt_component_0 } from './nuxt-link-C81WJ7QQ.mjs';
import { defineComponent, ref, computed, reactive, watch, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderDynamicModel, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const message = ref("");
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const genders = [
      { id: "g1", name: "Male" },
      { id: "g2", name: "Female" },
      { id: "g3", name: "Non-binary" }
    ];
    const prefixes = [
      { id: "p1", name: "Mr.", gender_ids: ["g1"] },
      { id: "p2", name: "Ms.", gender_ids: ["g2"] },
      { id: "p3", name: "Mrs.", gender_ids: ["g2"] },
      { id: "p4", name: "Mx.", gender_ids: ["g3"] }
    ];
    const filteredPrefixes = computed(() => {
      if (!form.gender_id) {
        return [];
      }
      return prefixes.filter((prefix) => prefix.gender_ids.includes(form.gender_id));
    });
    const form = reactive({
      prefix_id: "",
      gender_id: "",
      first_name: "",
      last_name: "",
      phone: "",
      username: "",
      password: "",
      confirm_password: ""
    });
    watch(
      () => form.gender_id,
      () => {
        form.prefix_id = "";
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center p-6 relative overflow-hidden text-slate-900 font-sans bg-slate-50" }, _attrs))} data-v-04bfe133><div class="absolute inset-0 z-0 pointer-events-none overflow-hidden" data-v-04bfe133><div class="mesh-gradient absolute top-0 left-0 w-full h-full" data-v-04bfe133></div></div><div class="w-full max-w-2xl relative z-10 my-12" data-v-04bfe133><div class="premium-card rounded-[2.5rem] p-10 md:p-14 border border-white/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.03)] bg-white/70 backdrop-blur-2xl" data-v-04bfe133><div class="mb-12 text-center" data-v-04bfe133><h1 class="text-[10px] font-bold tracking-[0.5em] text-slate-400 uppercase mb-3 whitespace-nowrap" data-v-04bfe133>Create Archive</h1><h2 class="text-4xl font-light tracking-tighter text-slate-900 uppercase" data-v-04bfe133>Register</h2></div><form class="space-y-8" data-v-04bfe133><div class="space-y-6" data-v-04bfe133><h3 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-2" data-v-04bfe133>Personal Detail</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-04bfe133><div class="space-y-2" data-v-04bfe133><label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1" data-v-04bfe133>Gender</label><select class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm appearance-none" required data-v-04bfe133><option value="" disabled data-v-04bfe133${ssrIncludeBooleanAttr(Array.isArray(form.gender_id) ? ssrLooseContain(form.gender_id, "") : ssrLooseEqual(form.gender_id, "")) ? " selected" : ""}>Select Gender</option><!--[-->`);
      ssrRenderList(genders, (g) => {
        _push(`<option${ssrRenderAttr("value", g.id)} data-v-04bfe133${ssrIncludeBooleanAttr(Array.isArray(form.gender_id) ? ssrLooseContain(form.gender_id, g.id) : ssrLooseEqual(form.gender_id, g.id)) ? " selected" : ""}>${ssrInterpolate(g.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2" data-v-04bfe133><label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1" data-v-04bfe133>Prefix</label><select${ssrIncludeBooleanAttr(!form.gender_id || filteredPrefixes.value.length === 0) ? " disabled" : ""} class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm appearance-none disabled:cursor-not-allowed disabled:bg-slate-100/70 disabled:text-slate-400" required data-v-04bfe133><option value="" disabled data-v-04bfe133${ssrIncludeBooleanAttr(Array.isArray(form.prefix_id) ? ssrLooseContain(form.prefix_id, "") : ssrLooseEqual(form.prefix_id, "")) ? " selected" : ""}>${ssrInterpolate(!form.gender_id ? "Select Gender first" : filteredPrefixes.value.length ? "Select Prefix" : "No prefix available")}</option><!--[-->`);
      ssrRenderList(filteredPrefixes.value, (p) => {
        _push(`<option${ssrRenderAttr("value", p.id)} data-v-04bfe133${ssrIncludeBooleanAttr(Array.isArray(form.prefix_id) ? ssrLooseContain(form.prefix_id, p.id) : ssrLooseEqual(form.prefix_id, p.id)) ? " selected" : ""}>${ssrInterpolate(p.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2" data-v-04bfe133><label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1" data-v-04bfe133>First Name</label><input${ssrRenderAttr("value", form.first_name)} type="text" class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm" placeholder="Your first name" required data-v-04bfe133></div><div class="space-y-2" data-v-04bfe133><label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1" data-v-04bfe133>Last Name</label><input${ssrRenderAttr("value", form.last_name)} type="text" class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm" placeholder="Your last name" required data-v-04bfe133></div></div><div class="space-y-2" data-v-04bfe133><label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1" data-v-04bfe133>Phone Number</label><input${ssrRenderAttr("value", form.phone)} type="tel" class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm" placeholder="081-XXX-XXXX" required data-v-04bfe133></div></div><div class="space-y-6 pt-4" data-v-04bfe133><h3 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-2" data-v-04bfe133>Account Credential</h3><div class="space-y-6" data-v-04bfe133><div class="space-y-2" data-v-04bfe133><label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1" data-v-04bfe133>Username</label><input${ssrRenderAttr("value", form.username)} type="text" class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm" placeholder="Choose a username" required data-v-04bfe133></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-04bfe133><div class="space-y-2" data-v-04bfe133><label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1" data-v-04bfe133>Password</label><div class="relative" data-v-04bfe133><input${ssrRenderDynamicModel(showPassword.value ? "text" : "password", form.password, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} class="custom-input w-full px-6 py-4 pr-20 rounded-2xl outline-none text-sm tracking-widest" placeholder="••••••••" required data-v-04bfe133><button type="button"${ssrRenderAttr("aria-label", showPassword.value ? "Hide password" : "Show password")} class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors" data-v-04bfe133>`);
      if (showPassword.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5" stroke-width="1.8" data-v-04bfe133><path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" data-v-04bfe133></path><path stroke-linecap="round" stroke-linejoin="round" d="M10.58 10.58a2 2 0 102.83 2.83" data-v-04bfe133></path><path stroke-linecap="round" stroke-linejoin="round" d="M9.88 5.09A9.77 9.77 0 0112 4.88c4.56 0 8.2 2.9 9.5 7.12a10.06 10.06 0 01-4.23 5.56" data-v-04bfe133></path><path stroke-linecap="round" stroke-linejoin="round" d="M6.61 6.62A10.05 10.05 0 002.5 12c.53 1.7 1.52 3.21 2.82 4.37" data-v-04bfe133></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5" stroke-width="1.8" data-v-04bfe133><path stroke-linecap="round" stroke-linejoin="round" d="M2.46 12C3.73 7.94 7.5 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.04 7-9.54 7s-8.27-2.94-9.54-7z" data-v-04bfe133></path><circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round" data-v-04bfe133></circle></svg>`);
      }
      _push(`</button></div></div><div class="space-y-2" data-v-04bfe133><label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1" data-v-04bfe133>Confirm Password</label><div class="relative" data-v-04bfe133><input${ssrRenderDynamicModel(showConfirmPassword.value ? "text" : "password", form.confirm_password, null)}${ssrRenderAttr("type", showConfirmPassword.value ? "text" : "password")} class="custom-input w-full px-6 py-4 pr-20 rounded-2xl outline-none text-sm tracking-widest" placeholder="••••••••" required data-v-04bfe133><button type="button"${ssrRenderAttr("aria-label", showConfirmPassword.value ? "Hide confirm password" : "Show confirm password")} class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors" data-v-04bfe133>`);
      if (showConfirmPassword.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5" stroke-width="1.8" data-v-04bfe133><path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" data-v-04bfe133></path><path stroke-linecap="round" stroke-linejoin="round" d="M10.58 10.58a2 2 0 102.83 2.83" data-v-04bfe133></path><path stroke-linecap="round" stroke-linejoin="round" d="M9.88 5.09A9.77 9.77 0 0112 4.88c4.56 0 8.2 2.9 9.5 7.12a10.06 10.06 0 01-4.23 5.56" data-v-04bfe133></path><path stroke-linecap="round" stroke-linejoin="round" d="M6.61 6.62A10.05 10.05 0 002.5 12c.53 1.7 1.52 3.21 2.82 4.37" data-v-04bfe133></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5" stroke-width="1.8" data-v-04bfe133><path stroke-linecap="round" stroke-linejoin="round" d="M2.46 12C3.73 7.94 7.5 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.04 7-9.54 7s-8.27-2.94-9.54-7z" data-v-04bfe133></path><circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round" data-v-04bfe133></circle></svg>`);
      }
      _push(`</button></div></div></div></div></div><div class="pt-8" data-v-04bfe133><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="group relative w-full py-5 bg-slate-900 overflow-hidden rounded-2xl shadow-xl shadow-slate-200 active:scale-[0.98] transition-all disabled:opacity-50" data-v-04bfe133>`);
      if (loading.value) {
        _push(`<div class="flex items-center justify-center" data-v-04bfe133><div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" data-v-04bfe133></div></div>`);
      } else {
        _push(`<span class="text-white text-xs font-bold tracking-[0.3em] uppercase" data-v-04bfe133> Create Account </span>`);
      }
      _push(`<div class="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 transition-all group-hover:w-full" data-v-04bfe133></div></button></div></form><div class="mt-12 text-center pt-8 border-t border-slate-50" data-v-04bfe133><p class="text-xs text-slate-400 font-light" data-v-04bfe133> Already have an archive? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-slate-900 font-semibold border-b border-slate-900/10 hover:border-slate-900 transition-all ml-1 pb-0.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` เข้าสู่ระบบ (Login) `);
          } else {
            return [
              createTextVNode(" เข้าสู่ระบบ (Login) ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><div class="mt-10 text-center flex items-center justify-center space-x-3" data-v-04bfe133><div class="w-1.5 h-1.5 rounded-full bg-emerald-500" data-v-04bfe133></div><p class="text-[9px] text-slate-400 uppercase tracking-[0.3em]" data-v-04bfe133>Encrypted Connection</p></div></div>`);
      if (message.value) {
        _push(`<div class="fixed top-6 right-6 px-8 py-4 bg-white border border-slate-100 shadow-2xl rounded-2xl text-[10px] font-bold tracking-widest text-slate-900 uppercase z-50" data-v-04bfe133>${ssrInterpolate(message.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-04bfe133"]]);

export { index as default };
//# sourceMappingURL=index-DdJS5wZt.mjs.map
