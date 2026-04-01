import { defineComponent, ref, reactive, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
  __name: "main",
  __ssrInlineRender: true,
  setup(__props) {
    const currentPath = ref("dashboard");
    const sections = reactive({
      overview: true,
      management: true,
      actions: false,
      system: false
    });
    const pageTitle = computed(() => {
      switch (currentPath.value) {
        case "dashboard":
          return "Account Overview";
        case "history":
          return "Transaction Ledger";
        case "wallets":
          return "Asset Management";
        case "categories":
          return "Taxonomy Settings";
        case "budgets":
          return "Budget Allocation";
        case "record":
          return "New Entry";
        case "profile":
          return "User Identity";
        case "settings":
          return "System Preferences";
        default:
          return "Overview";
      }
    });
    const navClass = (path) => {
      const base = "w-full text-left px-4 py-2.5 text-[11px] uppercase tracking-widest transition-all duration-300 rounded-lg ";
      return currentPath.value === path ? base + "bg-slate-900 text-white font-bold translate-x-1" : base + "text-slate-400 hover:text-slate-900 hover:translate-x-1";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden" }, _attrs))} data-v-9f6ce3b6><div class="absolute inset-0 z-0 pointer-events-none" data-v-9f6ce3b6><div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40" data-v-9f6ce3b6></div></div><aside class="w-72 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-500" data-v-9f6ce3b6><div class="p-10" data-v-9f6ce3b6><h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1" data-v-9f6ce3b6>Archive</h1><h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase" data-v-9f6ce3b6>Balance</h2></div><nav class="flex-1 px-6 space-y-2" data-v-9f6ce3b6><div class="space-y-1" data-v-9f6ce3b6><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-9f6ce3b6> Overview <span class="${ssrRenderClass([{ "rotate-180": sections.overview }, "text-[9px] transition-transform duration-300"])}" data-v-9f6ce3b6>▼</span></button><div class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100" style="${ssrRenderStyle(sections.overview ? null : { display: "none" })}" data-v-9f6ce3b6><button class="${ssrRenderClass(navClass("dashboard"))}" data-v-9f6ce3b6>Dashboard</button><button class="${ssrRenderClass(navClass("history"))}" data-v-9f6ce3b6>Transaction Ledger</button></div></div><div class="space-y-1" data-v-9f6ce3b6><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-9f6ce3b6> Management <span class="${ssrRenderClass([{ "rotate-180": sections.management }, "text-[9px] transition-transform duration-300"])}" data-v-9f6ce3b6>▼</span></button><div class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100" style="${ssrRenderStyle(sections.management ? null : { display: "none" })}" data-v-9f6ce3b6><button class="${ssrRenderClass(navClass("wallets"))}" data-v-9f6ce3b6>Wallets</button><button class="${ssrRenderClass(navClass("categories"))}" data-v-9f6ce3b6>Categories</button><button class="${ssrRenderClass(navClass("budgets"))}" data-v-9f6ce3b6>Budgets</button></div></div><div class="space-y-1" data-v-9f6ce3b6><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-9f6ce3b6> Entry <span class="${ssrRenderClass([{ "rotate-180": sections.actions }, "text-[9px] transition-transform duration-300"])}" data-v-9f6ce3b6>▼</span></button><div class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100" style="${ssrRenderStyle(sections.actions ? null : { display: "none" })}" data-v-9f6ce3b6><button class="${ssrRenderClass(navClass("record"))}" data-v-9f6ce3b6>New Transaction</button></div></div><div class="space-y-1" data-v-9f6ce3b6><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-9f6ce3b6> System <span class="${ssrRenderClass([{ "rotate-180": sections.system }, "text-[9px] transition-transform duration-300"])}" data-v-9f6ce3b6>▼</span></button><div class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100" style="${ssrRenderStyle(sections.system ? null : { display: "none" })}" data-v-9f6ce3b6><button class="${ssrRenderClass(navClass("profile"))}" data-v-9f6ce3b6>Account Profile</button><button class="${ssrRenderClass(navClass("settings"))}" data-v-9f6ce3b6>Settings</button></div></div></nav><div class="p-8 border-t border-slate-50" data-v-9f6ce3b6><p class="text-[10px] text-slate-400 uppercase tracking-widest mb-1" data-v-9f6ce3b6>Authenticated as</p><p class="text-xs font-semibold text-slate-900" data-v-9f6ce3b6>Johnathan Doe</p></div></aside><main class="flex-1 relative z-10 overflow-y-auto p-12" data-v-9f6ce3b6><header class="mb-12 flex justify-between items-end" data-v-9f6ce3b6><div data-v-9f6ce3b6><p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2" data-v-9f6ce3b6>${ssrInterpolate(currentPath.value)}</p><h3 class="text-4xl font-light tracking-tighter text-slate-900" data-v-9f6ce3b6>${ssrInterpolate(pageTitle.value)}</h3></div><div class="flex items-center space-x-4" data-v-9f6ce3b6><div class="text-right" data-v-9f6ce3b6><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-9f6ce3b6>Total Balance</p><p class="text-xl font-medium tracking-tight" data-v-9f6ce3b6>฿ 142,500.00</p></div></div></header><div class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700" data-v-9f6ce3b6>`);
      if (currentPath.value === "dashboard") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-9f6ce3b6><div class="col-span-2 space-y-8" data-v-9f6ce3b6><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-9f6ce3b6><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-9f6ce3b6>Monthly Performance</h4><div class="h-48 flex items-end justify-between px-4" data-v-9f6ce3b6><!--[-->`);
        ssrRenderList([40, 70, 45, 90, 65, 80, 50], (h) => {
          _push(`<div class="w-12 bg-slate-100 rounded-full transition-all hover:bg-indigo-500" style="${ssrRenderStyle({ height: h + "%" })}" data-v-9f6ce3b6></div>`);
        });
        _push(`<!--]--></div></div><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-9f6ce3b6><div class="flex justify-between items-center mb-8" data-v-9f6ce3b6><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-9f6ce3b6>Recent Activity</h4><button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider" data-v-9f6ce3b6>View All</button></div><div class="space-y-6" data-v-9f6ce3b6><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0" data-v-9f6ce3b6><div data-v-9f6ce3b6><p class="text-sm font-medium" data-v-9f6ce3b6>Starbucks Coffee</p><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-9f6ce3b6>Food &amp; Drink • 14:20 PM</p></div><p class="text-sm font-semibold text-rose-500" data-v-9f6ce3b6>- 145.00</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-8" data-v-9f6ce3b6><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl" data-v-9f6ce3b6><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6" data-v-9f6ce3b6>Active Wallets</h4><div class="space-y-6" data-v-9f6ce3b6><div data-v-9f6ce3b6><p class="text-[10px] text-slate-400 uppercase tracking-widest mb-1" data-v-9f6ce3b6>Savings Account</p><p class="text-lg tracking-tight" data-v-9f6ce3b6>฿ 120,000.00</p></div><div class="pt-4 border-t border-white/10" data-v-9f6ce3b6><p class="text-[10px] text-slate-400 uppercase tracking-widest mb-1" data-v-9f6ce3b6>Cash</p><p class="text-lg tracking-tight" data-v-9f6ce3b6>฿ 2,500.00</p></div></div></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-9f6ce3b6><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4" data-v-9f6ce3b6>Budget Alert</h4><p class="text-sm text-slate-600 mb-4" data-v-9f6ce3b6>You have reached 85% of your <span class="font-bold text-slate-900" data-v-9f6ce3b6>Dining Out</span> budget.</p><div class="w-full bg-slate-50 h-1 rounded-full overflow-hidden" data-v-9f6ce3b6><div class="bg-indigo-500 h-full w-[85%]" data-v-9f6ce3b6></div></div></div></div></div>`);
      } else {
        _push(`<div class="min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[2.5rem]" data-v-9f6ce3b6><div class="text-center" data-v-9f6ce3b6><p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-2" data-v-9f6ce3b6>Module Loaded</p><p class="text-slate-400 font-light" data-v-9f6ce3b6>The ${ssrInterpolate(pageTitle.value)} interface is ready for integration.</p></div></div>`);
      }
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/main.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const main = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9f6ce3b6"]]);

export { main as default };
//# sourceMappingURL=main-DRjUl0s4.mjs.map
