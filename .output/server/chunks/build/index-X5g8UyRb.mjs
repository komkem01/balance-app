import { _ as __nuxt_component_0 } from './AppLoading-BXAO02Ye.mjs';
import { u as useSidebarNavigation, _ as __nuxt_component_2 } from './useSidebarNavigation-aIYe8rqa.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { u as useAuthApi } from './useAuthApi-DtYXwYlQ.mjs';
import { u as useTotalNetWorth } from './useTotalNetWorth-otK3r20a.mjs';
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
    const mobileSidebarOpen = ref(false);
    const { currentPath, sections, logoutConfirmOpen, confirmLogout, cancelLogout, userDisplayName } = useSidebarNavigation({
      initialSections: {
        overview: true,
        management: false,
        actions: false,
        system: false
      },
      singleOpen: true,
      mobileMaxWidth: 1024
    });
    const {
      listMyTransactionMonthlySummary
    } = useAuthApi();
    const { totalNetWorth: totalNetWorthFromAPI } = useTotalNetWorth();
    useRouter();
    const wallets = ref([]);
    const categories = ref([]);
    const budgets = ref([]);
    const allTransactions = ref([]);
    const monthlySummaryItems = ref([]);
    const pageLoading = ref(false);
    const chartLoading = ref(false);
    const selectedChartRange = ref("All Time");
    const customStartDate = ref("");
    const customEndDate = ref("");
    const normalizeErrorMessage = (error) => {
      if (error instanceof Error && error.message.trim()) {
        return error.message;
      }
      return "request-failed";
    };
    const headerTotalNetWorth = computed(() => {
      const fallback = wallets.value.reduce((acc, curr) => acc + curr.balance, 0);
      return totalNetWorthFromAPI.value ?? fallback;
    });
    const recentTransactions = computed(() => allTransactions.value.slice(0, 3));
    const chartRanges = ["1 Day", "1 Week", "1 Month", "1 Year", "All Time"];
    const hasCustomDateFilter = computed(() => Boolean(customStartDate.value || customEndDate.value));
    const chartRangeQueryMap = {
      "1 Day": "1d",
      "1 Week": "1w",
      "1 Month": "1m",
      "1 Year": "1y",
      "All Time": "all"
    };
    const chartSummaryQuery = computed(() => {
      if (hasCustomDateFilter.value) {
        return {
          startDate: customStartDate.value || void 0,
          endDate: customEndDate.value || void 0,
          range: void 0
        };
      }
      return {
        startDate: void 0,
        endDate: void 0,
        range: chartRangeQueryMap[selectedChartRange.value]
      };
    });
    const monthlyPerformance = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const baseMonths = Array.from({ length: 12 }, (_, offset) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (11 - offset), 1);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return {
          key: `${date.getFullYear()}-${month}`,
          label: date.toLocaleString("en-US", { month: "short" }),
          income: 0,
          expense: 0
        };
      });
      const monthMap = new Map(baseMonths.map((item) => [item.key, item]));
      for (const item of monthlySummaryItems.value) {
        const monthItem = monthMap.get(item.month);
        if (!monthItem) {
          continue;
        }
        monthItem.income += Number(item.income_total || 0);
        monthItem.expense += Number(item.expense_total || 0);
      }
      return baseMonths;
    });
    const chartMaxValue = computed(() => {
      const max = Math.max(
        ...monthlyPerformance.value.flatMap((item) => [item.income, item.expense]),
        1
      );
      return max;
    });
    const monthlyStackBars = computed(() => {
      const max = chartMaxValue.value;
      return monthlyPerformance.value.map((item) => {
        const total = item.income + item.expense;
        const height = total > 0 ? Math.max(total / max * 100, 14) : 0;
        const expenseShare = total > 0 ? item.expense / total : 0;
        const bottomSegment = 32 + expenseShare * 28;
        const middleSegment = 24;
        const topSegment = 100 - bottomSegment - middleSegment;
        return {
          key: item.key,
          label: item.label,
          height,
          bottomSegment,
          middleSegment,
          topSegment
        };
      });
    });
    const activeBudgets = computed(() => {
      const categoryMap = new Map(categories.value.map((item) => [item.id, item.name]));
      return budgets.value.map((budget) => {
        const percent = budget.amount > 0 ? Math.min(Math.round(budget.spent / budget.amount * 100), 100) : 0;
        return {
          id: budget.id,
          category: categoryMap.get(budget.category_id) || "Unknown",
          percent
        };
      });
    });
    const loadMonthlySummary = async () => {
      chartLoading.value = true;
      try {
        const res = await listMyTransactionMonthlySummary(chartSummaryQuery.value);
        monthlySummaryItems.value = (res.items || []).map((item) => ({
          month: item.month,
          income_total: Number(item.income_total || 0),
          expense_total: Number(item.expense_total || 0),
          transaction_count: Number(item.transaction_count || 0)
        }));
      } catch (error) {
        console.error("monthly-summary-load-failed", normalizeErrorMessage(error));
        monthlySummaryItems.value = [];
      } finally {
        chartLoading.value = false;
      }
    };
    watch([selectedChartRange, customStartDate, customEndDate], () => {
      void loadMonthlySummary();
    });
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
      const _component_AppLoading = __nuxt_component_0;
      const _component_AppConfirmModal = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden" }, _attrs))} data-v-f5c60499><div class="absolute inset-0 z-0 pointer-events-none" data-v-f5c60499><div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40" data-v-f5c60499></div></div>`);
      if (mobileSidebarOpen.value) {
        _push(`<div class="fixed inset-0 z-10 bg-slate-900/30 backdrop-blur-[1px] min-[1025px]:hidden" data-v-f5c60499></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "w-72 h-screen shrink-0 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-300 ease-out",
        "max-[1024px]:fixed max-[1024px]:inset-y-0 max-[1024px]:left-0 max-[1024px]:z-30 min-[1025px]:translate-x-0",
        mobileSidebarOpen.value ? "max-[1024px]:translate-x-0" : "max-[1024px]:-translate-x-full"
      ])}" data-v-f5c60499><div class="relative p-10" data-v-f5c60499><button class="inline-flex min-[1025px]:hidden absolute top-5 right-4 h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition" aria-label="Close sidebar" data-v-f5c60499><span class="text-base" data-v-f5c60499>×</span></button><h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1" data-v-f5c60499> Archive </h1><h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase" data-v-f5c60499> Balance </h2></div><nav class="flex-1 px-6 space-y-2 overflow-hidden" data-v-f5c60499><div class="space-y-1" data-v-f5c60499><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-f5c60499> Overview <span class="${ssrRenderClass([{ "rotate-180": unref(sections).overview }, "text-[9px] transition-transform duration-300"])}" data-v-f5c60499>▼</span></button><div class="${ssrRenderClass([
        unref(sections).overview ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-f5c60499><button class="${ssrRenderClass(navClass("dashboard"))}" data-v-f5c60499> Dashboard </button><button class="${ssrRenderClass(navClass("history"))}" data-v-f5c60499> Transaction Ledger </button></div></div><div class="space-y-1" data-v-f5c60499><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-f5c60499> Management <span class="${ssrRenderClass([{ "rotate-180": unref(sections).management }, "text-[9px] transition-transform duration-300"])}" data-v-f5c60499>▼</span></button><div class="${ssrRenderClass([
        unref(sections).management ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-f5c60499><button class="${ssrRenderClass(navClass("wallets"))}" data-v-f5c60499> Wallets </button><button class="${ssrRenderClass(navClass("categories"))}" data-v-f5c60499> Categories </button><button class="${ssrRenderClass(navClass("budgets"))}" data-v-f5c60499> Budgets </button></div></div><div class="space-y-1" data-v-f5c60499><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-f5c60499> Entry <span class="${ssrRenderClass([{ "rotate-180": unref(sections).actions }, "text-[9px] transition-transform duration-300"])}" data-v-f5c60499>▼</span></button><div class="${ssrRenderClass([
        unref(sections).actions ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-f5c60499><button class="${ssrRenderClass(navClass("record"))}" data-v-f5c60499> New Transaction </button></div></div><div class="space-y-1" data-v-f5c60499><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-f5c60499> System <span class="${ssrRenderClass([{ "rotate-180": unref(sections).system }, "text-[9px] transition-transform duration-300"])}" data-v-f5c60499>▼</span></button><div class="${ssrRenderClass([
        unref(sections).system ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-f5c60499><button class="${ssrRenderClass(navClass("profile"))}" data-v-f5c60499> Account Profile </button><button class="${ssrRenderClass(navClass("settings"))}" data-v-f5c60499> Settings </button></div></div></nav><div class="border-t border-slate-100 bg-slate-900 px-6 py-5 text-white" data-v-f5c60499><p class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1" data-v-f5c60499> Authenticated as </p><p class="text-sm font-semibold tracking-tight" data-v-f5c60499>${ssrInterpolate(unref(userDisplayName))}</p><button class="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition" data-v-f5c60499> Logout </button></div></aside><main class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1" data-v-f5c60499>`);
      if (pageLoading.value) {
        _push(ssrRenderComponent(_component_AppLoading, {
          overlay: "",
          label: "Loading data..."
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between" data-v-f5c60499><div data-v-f5c60499><button class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600" data-v-f5c60499><span class="text-sm" data-v-f5c60499>☰</span> Menu </button><p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2" data-v-f5c60499>${ssrInterpolate(unref(currentPath))}</p><h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900" data-v-f5c60499>${ssrInterpolate(pageTitle.value)}</h3></div><div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6" data-v-f5c60499><div class="text-right sm:text-right" data-v-f5c60499><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-f5c60499> Total Net Worth </p><p class="text-2xl font-medium tracking-tight" data-v-f5c60499> ฿ ${ssrInterpolate(headerTotalNetWorth.value.toLocaleString(void 0, {
        minimumFractionDigits: 2
      }))}</p></div><button class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-f5c60499> Quick Entry </button></div></header><div class="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700" data-v-f5c60499>`);
      if (unref(currentPath) === "dashboard") {
        _push(`<div class="grid grid-cols-1 xl:grid-cols-3 items-start gap-10" data-v-f5c60499><div class="xl:col-span-2 min-w-0 space-y-10" data-v-f5c60499><div class="relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-f5c60499>`);
        if (chartLoading.value) {
          _push(`<div class="absolute inset-0 z-20 rounded-[2.5rem] bg-white/75 backdrop-blur-[1px] flex items-center justify-center" data-v-f5c60499><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500" data-v-f5c60499>Loading chart...</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-between items-center mb-7" data-v-f5c60499><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-f5c60499> Monthly Performance </h4><div class="flex space-x-4" data-v-f5c60499><div class="flex items-center space-x-2" data-v-f5c60499><div class="w-2 h-2 rounded-full bg-slate-900" data-v-f5c60499></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-f5c60499>High Activity</span></div><div class="flex items-center space-x-2" data-v-f5c60499><div class="w-2 h-2 rounded-full bg-slate-500" data-v-f5c60499></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-f5c60499>Medium</span></div><div class="flex items-center space-x-2" data-v-f5c60499><div class="w-2 h-2 rounded-full bg-slate-200" data-v-f5c60499></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-f5c60499>Low</span></div></div></div><div class="relative h-56 px-2" data-v-f5c60499><div class="absolute inset-x-2 inset-y-0 grid" style="${ssrRenderStyle({ "grid-template-rows": "repeat(5, minmax(0, 1fr))" })}" data-v-f5c60499><!--[-->`);
        ssrRenderList(5, (marker) => {
          _push(`<div class="border-b border-slate-100" data-v-f5c60499></div>`);
        });
        _push(`<!--]--></div><div class="relative z-10 h-full flex items-end justify-between gap-3" data-v-f5c60499><!--[-->`);
        ssrRenderList(monthlyStackBars.value, (month) => {
          _push(`<div class="flex-1 flex justify-center" data-v-f5c60499><div class="w-full max-w-10 min-w-6 rounded-t-full overflow-hidden flex flex-col-reverse" style="${ssrRenderStyle({ height: `${month.height}%` })}" data-v-f5c60499><div class="w-full bg-slate-900 rounded-t-full" style="${ssrRenderStyle({ height: `${month.bottomSegment}%` })}" data-v-f5c60499></div><div class="w-full bg-slate-500 rounded-t-full" style="${ssrRenderStyle({ height: `${month.middleSegment}%` })}" data-v-f5c60499></div><div class="w-full bg-slate-200 rounded-t-full" style="${ssrRenderStyle({ height: `${month.topSegment}%` })}" data-v-f5c60499></div></div></div>`);
        });
        _push(`<!--]--></div></div><div class="flex justify-between mt-5 px-2 text-[9px] text-slate-400 uppercase tracking-widest font-bold" data-v-f5c60499><!--[-->`);
        ssrRenderList(monthlyStackBars.value, (month) => {
          _push(`<span data-v-f5c60499>${ssrInterpolate(month.label)}</span>`);
        });
        _push(`<!--]--></div><div class="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6" data-v-f5c60499><div class="flex items-center gap-2 rounded-full bg-slate-50 p-1" data-v-f5c60499><!--[-->`);
        ssrRenderList(chartRanges, (range) => {
          _push(`<button type="button" class="${ssrRenderClass([selectedChartRange.value === range && !hasCustomDateFilter.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700", "rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition"])}" data-v-f5c60499>${ssrInterpolate(range)}</button>`);
        });
        _push(`<!--]--></div><div class="flex flex-wrap items-center gap-3" data-v-f5c60499><div class="relative" data-v-f5c60499><input${ssrRenderAttr("value", customStartDate.value)} type="date" class="date-input h-14 w-60 rounded-3xl border border-slate-300/80 bg-slate-100/70 px-7 pr-7 text-[12px] font-bold tracking-wide text-slate-600 outline-none transition focus:border-slate-500" aria-label="Start date" data-v-f5c60499></div><span class="text-xl font-semibold tracking-widest text-slate-300" data-v-f5c60499>TO</span><div class="relative" data-v-f5c60499><input${ssrRenderAttr("value", customEndDate.value)} type="date" class="date-input h-14 w-60 rounded-3xl border border-slate-300/80 bg-slate-100/70 px-7 pr-7 text-[12px] font-bold tracking-wide text-slate-600 outline-none transition focus:border-slate-500" aria-label="End date" data-v-f5c60499></div>`);
        if (hasCustomDateFilter.value) {
          _push(`<button type="button" class="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-[10px] font-bold uppercase tracking-wide text-slate-500 transition hover:border-slate-300 hover:text-slate-700" data-v-f5c60499> Clear </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-f5c60499><div class="flex justify-between items-center mb-8" data-v-f5c60499><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-f5c60499> Recent Activity </h4><button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider hover:opacity-70 transition-opacity" data-v-f5c60499> View All Ledger </button></div><div class="space-y-5" data-v-f5c60499><!--[-->`);
        ssrRenderList(recentTransactions.value, (item) => {
          _push(`<div class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0" data-v-f5c60499><div class="flex items-center space-x-4" data-v-f5c60499><div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400" data-v-f5c60499>${ssrInterpolate(item.category.substring(0, 2).toUpperCase())}</div><div data-v-f5c60499><p class="text-sm font-medium text-slate-900" data-v-f5c60499>${ssrInterpolate(item.note || item.category)}</p><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-f5c60499>${ssrInterpolate(item.wallet)} • ${ssrInterpolate(item.date)}</p></div></div><p class="${ssrRenderClass([
            "text-sm font-semibold",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-f5c60499>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="min-w-0 space-y-10" data-v-f5c60499><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden" data-v-f5c60499><div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" data-v-f5c60499></div><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-f5c60499> Active Wallets </h4><div class="space-y-6" data-v-f5c60499><!--[-->`);
        ssrRenderList(wallets.value, (wallet) => {
          _push(`<div class="group cursor-pointer" data-v-f5c60499><div class="flex justify-between items-end mb-2" data-v-f5c60499><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-f5c60499>${ssrInterpolate(wallet.name)}</p><span class="text-[8px] text-slate-600 group-hover:text-indigo-400 transition-colors" data-v-f5c60499>DETAILS</span></div><p class="text-xl font-light tracking-tight" data-v-f5c60499> ฿ ${ssrInterpolate(wallet.balance.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div><button class="w-full mt-8 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all" data-v-f5c60499> Manage Assets </button></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-f5c60499><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-f5c60499> Budget Status </h4><div class="space-y-6" data-v-f5c60499><!--[-->`);
        ssrRenderList(activeBudgets.value, (budget) => {
          _push(`<div class="space-y-3" data-v-f5c60499><div class="flex justify-between text-[10px] uppercase tracking-widest" data-v-f5c60499><span class="font-bold text-slate-900" data-v-f5c60499>${ssrInterpolate(budget.category)}</span><span class="text-slate-400" data-v-f5c60499>${ssrInterpolate(budget.percent)}%</span></div><div class="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden" data-v-f5c60499><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.percent > 90 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({ width: budget.percent + "%" })}" data-v-f5c60499></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<div class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-white/30 backdrop-blur-sm" data-v-f5c60499><div class="text-center max-w-sm" data-v-f5c60499><h5 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-4" data-v-f5c60499> Module Locked </h5><p class="text-sm text-slate-400 font-light leading-relaxed mb-8" data-v-f5c60499> The interface for <span class="text-indigo-500 font-medium" data-v-f5c60499>${ssrInterpolate(pageTitle.value)}</span> is currently under architectural review. </p><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity" data-v-f5c60499> Return to Core </button></div></div>`);
      }
      _push(`</div></main>`);
      _push(ssrRenderComponent(_component_AppConfirmModal, {
        open: unref(logoutConfirmOpen),
        title: "Confirm Logout",
        description: "Are you sure you want to log out from this session?",
        "confirm-label": "Logout",
        "cancel-label": "Cancel",
        "onUpdate:open": unref(cancelLogout),
        onConfirm: unref(confirmLogout),
        onCancel: unref(cancelLogout)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5c60499"]]);

export { index as default };
//# sourceMappingURL=index-X5g8UyRb.mjs.map
