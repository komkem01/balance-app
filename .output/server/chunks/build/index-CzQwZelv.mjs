import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { u as useSidebarNavigation } from './useSidebarNavigation-CorzJvkk.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'vue-router';
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
    const sidebarCollapsed = ref(false);
    const mobileSidebarOpen = ref(false);
    const isDesktop = ref(false);
    const { currentPath, sections } = useSidebarNavigation({
      initialSections: {
        overview: true,
        management: false,
        actions: false,
        system: false
      },
      singleOpen: true,
      mobileMaxWidth: 1024
    });
    const mainContentStyle = computed(() => {
      if (!isDesktop.value) {
        return { marginLeft: "0px", width: "100%" };
      }
      const sidebarWidth = sidebarCollapsed.value ? 80 : 256;
      return {
        marginLeft: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`
      };
    });
    const wallets = [
      { id: 1, name: "Main Savings", balance: 12e4 },
      { id: 2, name: "Cash on Hand", balance: 2500 },
      { id: 3, name: "Investment Port", balance: 2e4 }
    ];
    const recentTransactions = [
      {
        id: 1,
        category: "Food & Drink",
        note: "Starbucks Coffee",
        amount: 145,
        type: "expense",
        wallet: "Cash",
        date: "Today, 14:20"
      },
      {
        id: 2,
        category: "Salary",
        note: "Monthly Revenue",
        amount: 45e3,
        type: "income",
        wallet: "Savings",
        date: "Yesterday"
      },
      {
        id: 3,
        category: "Transport",
        note: "Grab Ride",
        amount: 220,
        type: "expense",
        wallet: "Savings",
        date: "22 Oct"
      }
    ];
    const activeBudgets = [
      { id: 1, category: "Dining Out", percent: 85 },
      { id: 2, category: "Entertainment", percent: 30 },
      { id: 3, category: "Shopping", percent: 92 }
    ];
    const pageTitle = computed(() => {
      switch (currentPath.value) {
        case "dashboard":
          return "Financial Overview";
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
          return "Archive";
      }
    });
    const navClass = (path) => {
      const base = "w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest transition-all duration-300 rounded-xl ";
      return currentPath.value === path ? base + "bg-slate-900 text-white font-bold shadow-lg shadow-slate-200" : base + "text-slate-400 hover:text-slate-900 hover:bg-slate-50";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden" }, _attrs))} data-v-877ebd0c><div class="absolute inset-0 z-0 pointer-events-none" data-v-877ebd0c><div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40" data-v-877ebd0c></div></div>`);
      if (mobileSidebarOpen.value) {
        _push(`<div class="fixed inset-0 z-10 bg-slate-900/30 backdrop-blur-[1px] min-[1025px]:hidden" data-v-877ebd0c></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "bg-white border-r border-slate-200 shadow-[8px_0_24px_rgba(15,23,42,0.06)] flex flex-col z-20 transition-all duration-300 ease-out",
        "fixed inset-y-0 left-0",
        mobileSidebarOpen.value ? "translate-x-0" : "-translate-x-full min-[1025px]:translate-x-0",
        sidebarCollapsed.value ? "min-[1025px]:w-20" : "min-[1025px]:w-64",
        "w-64"
      ])}" data-v-877ebd0c><div class="${ssrRenderClass(["relative px-7 py-8", sidebarCollapsed.value ? "px-3" : ""])}" data-v-877ebd0c><button class="inline-flex min-[1025px]:hidden absolute top-5 right-4 h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition" aria-label="Close sidebar" data-v-877ebd0c><span class="text-base" data-v-877ebd0c>×</span></button><button class="${ssrRenderClass([
        "hidden min-[1025px]:inline-flex absolute top-5 right-4 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition",
        sidebarCollapsed.value ? "h-7 w-7" : "h-8 w-8"
      ])}"${ssrRenderAttr("aria-label", sidebarCollapsed.value ? "Expand sidebar" : "Collapse sidebar")} data-v-877ebd0c><span class="text-sm" data-v-877ebd0c>${ssrInterpolate(sidebarCollapsed.value ? "→" : "←")}</span></button><div class="${ssrRenderClass(["flex", sidebarCollapsed.value ? "flex-col items-center gap-3" : "items-start"])}" data-v-877ebd0c><div data-v-877ebd0c>`);
      if (!sidebarCollapsed.value) {
        _push(`<h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1" data-v-877ebd0c> Archive </h1>`);
      } else {
        _push(`<!---->`);
      }
      if (!sidebarCollapsed.value) {
        _push(`<h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase" data-v-877ebd0c> Balance </h2>`);
      } else {
        _push(`<div class="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold" data-v-877ebd0c> B </div>`);
      }
      _push(`</div></div></div><nav class="${ssrRenderClass(["flex-1 px-4 space-y-2 overflow-y-auto", sidebarCollapsed.value ? "px-2" : ""])}" data-v-877ebd0c><div class="space-y-1" data-v-877ebd0c><button class="${ssrRenderClass([
        "w-full flex items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors",
        sidebarCollapsed.value ? "justify-center" : "justify-between"
      ])}" data-v-877ebd0c><span class="flex items-center gap-2" data-v-877ebd0c><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4" data-v-877ebd0c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 13h8V3H3v10zm10 8h8v-6h-8v6zM13 3v8h8V3h-8zM3 21h8v-6H3v6z" data-v-877ebd0c></path></svg><span class="${ssrRenderClass(sidebarCollapsed.value ? "hidden" : "")}" data-v-877ebd0c>Overview</span></span>`);
      if (!sidebarCollapsed.value) {
        _push(`<span class="${ssrRenderClass([{ "rotate-180": unref(sections).overview }, "text-[9px] transition-transform duration-300"])}" data-v-877ebd0c>▼</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="${ssrRenderClass([
        unref(sections).overview ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100",
        sidebarCollapsed.value ? "hidden" : ""
      ])}" data-v-877ebd0c><button class="${ssrRenderClass(navClass("dashboard"))}" data-v-877ebd0c> Dashboard </button><button class="${ssrRenderClass(navClass("history"))}" data-v-877ebd0c> Transaction Ledger </button></div></div><div class="space-y-1" data-v-877ebd0c><button class="${ssrRenderClass([
        "w-full flex items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors",
        sidebarCollapsed.value ? "justify-center" : "justify-between"
      ])}" data-v-877ebd0c><span class="flex items-center gap-2" data-v-877ebd0c><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4" data-v-877ebd0c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 7h16M4 12h16M4 17h10" data-v-877ebd0c></path></svg><span class="${ssrRenderClass(sidebarCollapsed.value ? "hidden" : "")}" data-v-877ebd0c>Management</span></span>`);
      if (!sidebarCollapsed.value) {
        _push(`<span class="${ssrRenderClass([{ "rotate-180": unref(sections).management }, "text-[9px] transition-transform duration-300"])}" data-v-877ebd0c>▼</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="${ssrRenderClass([
        unref(sections).management ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100",
        sidebarCollapsed.value ? "hidden" : ""
      ])}" data-v-877ebd0c><button class="${ssrRenderClass(navClass("wallets"))}" data-v-877ebd0c> Wallets </button><button class="${ssrRenderClass(navClass("categories"))}" data-v-877ebd0c> Categories </button><button class="${ssrRenderClass(navClass("budgets"))}" data-v-877ebd0c> Budgets </button></div></div><div class="space-y-1" data-v-877ebd0c><button class="${ssrRenderClass([
        "w-full flex items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors",
        sidebarCollapsed.value ? "justify-center" : "justify-between"
      ])}" data-v-877ebd0c><span class="flex items-center gap-2" data-v-877ebd0c><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4" data-v-877ebd0c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 5v14M5 12h14" data-v-877ebd0c></path></svg><span class="${ssrRenderClass(sidebarCollapsed.value ? "hidden" : "")}" data-v-877ebd0c>Entry</span></span>`);
      if (!sidebarCollapsed.value) {
        _push(`<span class="${ssrRenderClass([{ "rotate-180": unref(sections).actions }, "text-[9px] transition-transform duration-300"])}" data-v-877ebd0c>▼</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="${ssrRenderClass([
        unref(sections).actions ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100",
        sidebarCollapsed.value ? "hidden" : ""
      ])}" data-v-877ebd0c><button class="${ssrRenderClass(navClass("record"))}" data-v-877ebd0c> New Transaction </button></div></div><div class="space-y-1" data-v-877ebd0c><button class="${ssrRenderClass([
        "w-full flex items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors",
        sidebarCollapsed.value ? "justify-center" : "justify-between"
      ])}" data-v-877ebd0c><span class="flex items-center gap-2" data-v-877ebd0c><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4" data-v-877ebd0c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8a4 4 0 100 8 4 4 0 000-8z" data-v-877ebd0c></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12h2m14 0h2M12 3v2m0 14v2m-6.36-2.64l1.41-1.41m9.9-9.9l1.41-1.41m0 12.72l-1.41-1.41m-9.9-9.9L4.64 5.64" data-v-877ebd0c></path></svg><span class="${ssrRenderClass(sidebarCollapsed.value ? "hidden" : "")}" data-v-877ebd0c>System</span></span>`);
      if (!sidebarCollapsed.value) {
        _push(`<span class="${ssrRenderClass([{ "rotate-180": unref(sections).system }, "text-[9px] transition-transform duration-300"])}" data-v-877ebd0c>▼</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="${ssrRenderClass([
        unref(sections).system ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100",
        sidebarCollapsed.value ? "hidden" : ""
      ])}" data-v-877ebd0c><button class="${ssrRenderClass(navClass("profile"))}" data-v-877ebd0c> Account Profile </button><button class="${ssrRenderClass(navClass("settings"))}" data-v-877ebd0c> Settings </button></div></div></nav><div class="${ssrRenderClass(["px-6 py-6 border-t border-slate-50", sidebarCollapsed.value ? "px-3" : ""])}" data-v-877ebd0c>`);
      if (!sidebarCollapsed.value) {
        _push(`<p class="text-[10px] text-slate-400 uppercase tracking-widest mb-1" data-v-877ebd0c> Authenticated as </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="${ssrRenderClass([sidebarCollapsed.value ? "text-center" : "", "text-xs font-semibold text-slate-900"])}" data-v-877ebd0c>${ssrInterpolate(sidebarCollapsed.value ? "JD" : "Johnathan Doe")}</p></div></aside><main class="relative z-10 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300" style="${ssrRenderStyle(mainContentStyle.value)}" data-v-877ebd0c><header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between" data-v-877ebd0c><div data-v-877ebd0c><button class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600" data-v-877ebd0c><span class="text-sm" data-v-877ebd0c>☰</span> Menu </button><p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2" data-v-877ebd0c>${ssrInterpolate(unref(currentPath))}</p><h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900" data-v-877ebd0c>${ssrInterpolate(pageTitle.value)}</h3></div><div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6" data-v-877ebd0c><div class="text-right sm:text-right" data-v-877ebd0c><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-877ebd0c> Total Net Worth </p><p class="text-2xl font-medium tracking-tight" data-v-877ebd0c>฿ 142,500.00</p></div><button class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-877ebd0c> Quick Entry </button></div></header><div class="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700" data-v-877ebd0c>`);
      if (unref(currentPath) === "dashboard") {
        _push(`<div class="grid grid-cols-1 xl:grid-cols-3 items-start gap-10" data-v-877ebd0c><div class="xl:col-span-2 min-w-0 space-y-10" data-v-877ebd0c><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-877ebd0c><div class="flex justify-between items-center mb-7" data-v-877ebd0c><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-877ebd0c> Monthly Performance </h4><div class="flex space-x-4" data-v-877ebd0c><div class="flex items-center space-x-2" data-v-877ebd0c><div class="w-2 h-2 rounded-full bg-indigo-500" data-v-877ebd0c></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-877ebd0c>Income</span></div><div class="flex items-center space-x-2" data-v-877ebd0c><div class="w-2 h-2 rounded-full bg-slate-200" data-v-877ebd0c></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-877ebd0c>Expense</span></div></div></div><div class="h-44 flex items-end justify-between px-2 gap-3" data-v-877ebd0c><!--[-->`);
        ssrRenderList([
          40,
          70,
          45,
          90,
          65,
          80,
          50,
          60,
          40,
          85,
          30,
          95
        ], (h, i) => {
          _push(`<div class="flex-1 group relative" data-v-877ebd0c><div class="w-full bg-slate-50 rounded-t-xl transition-all group-hover:bg-indigo-50" style="${ssrRenderStyle({ height: h * 0.8 + "%" })}" data-v-877ebd0c></div><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer" style="${ssrRenderStyle({ height: h * 0.5 + "%" })}" data-v-877ebd0c></div></div>`);
        });
        _push(`<!--]--></div><div class="flex justify-between mt-6 px-2 text-[9px] text-slate-300 uppercase tracking-widest font-bold" data-v-877ebd0c><span data-v-877ebd0c>Jan</span><span data-v-877ebd0c>Feb</span><span data-v-877ebd0c>Mar</span><span data-v-877ebd0c>Apr</span><span data-v-877ebd0c>May</span><span data-v-877ebd0c>Jun</span><span data-v-877ebd0c>Jul</span><span data-v-877ebd0c>Aug</span><span data-v-877ebd0c>Sep</span><span data-v-877ebd0c>Oct</span><span data-v-877ebd0c>Nov</span><span data-v-877ebd0c>Dec</span></div></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-877ebd0c><div class="flex justify-between items-center mb-8" data-v-877ebd0c><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-877ebd0c> Recent Activity </h4><button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider hover:opacity-70 transition-opacity" data-v-877ebd0c> View All Ledger </button></div><div class="space-y-5" data-v-877ebd0c><!--[-->`);
        ssrRenderList(recentTransactions, (item) => {
          _push(`<div class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0" data-v-877ebd0c><div class="flex items-center space-x-4" data-v-877ebd0c><div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400" data-v-877ebd0c>${ssrInterpolate(item.category.substring(0, 2).toUpperCase())}</div><div data-v-877ebd0c><p class="text-sm font-medium text-slate-900" data-v-877ebd0c>${ssrInterpolate(item.note || item.category)}</p><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-877ebd0c>${ssrInterpolate(item.wallet)} • ${ssrInterpolate(item.date)}</p></div></div><p class="${ssrRenderClass([
            "text-sm font-semibold",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-877ebd0c>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="min-w-0 space-y-10" data-v-877ebd0c><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden" data-v-877ebd0c><div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" data-v-877ebd0c></div><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-877ebd0c> Active Wallets </h4><div class="space-y-6" data-v-877ebd0c><!--[-->`);
        ssrRenderList(wallets, (wallet) => {
          _push(`<div class="group cursor-pointer" data-v-877ebd0c><div class="flex justify-between items-end mb-2" data-v-877ebd0c><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-877ebd0c>${ssrInterpolate(wallet.name)}</p><span class="text-[8px] text-slate-600 group-hover:text-indigo-400 transition-colors" data-v-877ebd0c>DETAILS</span></div><p class="text-xl font-light tracking-tight" data-v-877ebd0c> ฿ ${ssrInterpolate(wallet.balance.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div><button class="w-full mt-8 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all" data-v-877ebd0c> Manage Assets </button></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-877ebd0c><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-877ebd0c> Budget Status </h4><div class="space-y-6" data-v-877ebd0c><!--[-->`);
        ssrRenderList(activeBudgets, (budget) => {
          _push(`<div class="space-y-3" data-v-877ebd0c><div class="flex justify-between text-[10px] uppercase tracking-widest" data-v-877ebd0c><span class="font-bold text-slate-900" data-v-877ebd0c>${ssrInterpolate(budget.category)}</span><span class="text-slate-400" data-v-877ebd0c>${ssrInterpolate(budget.percent)}%</span></div><div class="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden" data-v-877ebd0c><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.percent > 90 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({ width: budget.percent + "%" })}" data-v-877ebd0c></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<div class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-white/30 backdrop-blur-sm" data-v-877ebd0c><div class="text-center max-w-sm" data-v-877ebd0c><h5 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-4" data-v-877ebd0c> Module Locked </h5><p class="text-sm text-slate-400 font-light leading-relaxed mb-8" data-v-877ebd0c> The interface for <span class="text-indigo-500 font-medium" data-v-877ebd0c>${ssrInterpolate(pageTitle.value)}</span> is currently under architectural review. </p><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity" data-v-877ebd0c> Return to Core </button></div></div>`);
      }
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-877ebd0c"]]);

export { index as default };
//# sourceMappingURL=index-CzQwZelv.mjs.map
