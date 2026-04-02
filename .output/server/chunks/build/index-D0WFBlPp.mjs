import { _ as __nuxt_component_0 } from './AppLoading-BXAO02Ye.mjs';
import { u as useSidebarNavigation, _ as __nuxt_component_2 } from './useSidebarNavigation-aIYe8rqa.mjs';
import { _ as __nuxt_component_1 } from './AppDropdown-CDiYrB_I.mjs';
import { defineComponent, ref, reactive, computed, watch, resolveComponent, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAuthApi } from './useAuthApi-DtYXwYlQ.mjs';
import { u as useTotalNetWorth } from './useTotalNetWorth-otK3r20a.mjs';
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

const itemsPerPage = 6;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileSidebarOpen = ref(false);
    const { currentPath, sections, logoutConfirmOpen, confirmLogout, cancelLogout, userDisplayName } = useSidebarNavigation({
      mobileMaxWidth: 1024
    });
    const { listMyWallets, listMyBudgets, listMyTransactions, deleteMyTransaction } = useAuthApi();
    const { totalNetWorth: totalNetWorthFromAPI, refreshTotalNetWorth } = useTotalNetWorth();
    const wallets = ref([]);
    const categories = ref([]);
    const budgets = ref([]);
    const allTransactions = ref([]);
    const historyTypeFilter = ref("all");
    const pageLoading = ref(false);
    const actionLoading = ref(false);
    const actionError = ref("");
    const editModalOpen = ref(false);
    const deleteConfirmOpen = ref(false);
    const deleteConfirmDescription = ref("Delete this transaction?");
    const deleteTargetID = ref("");
    const editDatePickerOpen = ref(false);
    ref(null);
    const editTransaction = reactive({
      id: "",
      walletID: "",
      categoryID: "",
      amount: 0,
      type: "expense",
      transactionDate: "",
      note: ""
    });
    const headerTotalNetWorth = computed(() => {
      const fallback = wallets.value.reduce((acc, curr) => acc + curr.balance, 0);
      return totalNetWorthFromAPI.value ?? fallback;
    });
    const normalizeErrorMessage = (error) => {
      if (error instanceof Error && error.message.trim()) {
        return error.message;
      }
      return "request-failed";
    };
    const formatDate = (value) => {
      if (!value) {
        return "-";
      }
      const normalized = value.includes("T") ? value : `${value}T00:00:00`;
      const date = new Date(normalized);
      if (Number.isNaN(date.getTime())) {
        return value;
      }
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(date);
    };
    const normalizeDateInput = (value) => {
      if (!value) {
        return "";
      }
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
      }
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return "";
      }
      return date.toISOString().split("T")[0];
    };
    const formatDateDisplay = (value) => {
      const parsed = /* @__PURE__ */ new Date(`${value}T00:00:00`);
      if (Number.isNaN(parsed.getTime())) {
        return value;
      }
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(parsed);
    };
    const editDateButtonLabel = computed(() => {
      if (!editTransaction.transactionDate) {
        return "เลือกวันที่";
      }
      return formatDateDisplay(editTransaction.transactionDate);
    });
    const recentTransactionsSnapshot = computed(() => allTransactions.value.slice(0, 3));
    const filteredTransactions = computed(() => {
      if (historyTypeFilter.value === "all") {
        return allTransactions.value;
      }
      return allTransactions.value.filter((item) => item.type === historyTypeFilter.value);
    });
    const editCategoryOptions = computed(() => {
      return categories.value.filter((item) => item.type === editTransaction.type);
    });
    const editTypeDropdownItems = [
      { label: "Expense", value: "expense" },
      { label: "Income", value: "income" }
    ];
    const editWalletDropdownItems = computed(() => {
      return wallets.value.map((wallet) => ({
        label: wallet.name,
        value: wallet.id
      }));
    });
    const editCategoryDropdownItems = computed(() => {
      return editCategoryOptions.value.map((category) => ({
        label: category.name,
        value: category.id
      }));
    });
    const currentPage = ref(1);
    const totalTransactions = computed(() => filteredTransactions.value.length);
    const totalPages = computed(
      () => Math.max(1, Math.ceil(totalTransactions.value / itemsPerPage))
    );
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
    const endIndex = computed(() => startIndex.value + itemsPerPage);
    const displayStart = computed(() => totalTransactions.value === 0 ? 0 : startIndex.value + 1);
    const displayEnd = computed(() => Math.min(endIndex.value, totalTransactions.value));
    const paginatedTransactions = computed(() => {
      return filteredTransactions.value.slice(startIndex.value, endIndex.value);
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
    const loadWallets = async () => {
      const res = await listMyWallets({ page: 1, size: 200, isActive: true });
      wallets.value = (res.items || []).map((item) => ({
        id: item.id,
        name: item.name,
        balance: Number(item.balance || 0)
      }));
    };
    const loadBudgets = async () => {
      const res = await listMyBudgets({ page: 1, size: 300 });
      budgets.value = (res.items || []).map((item) => ({
        id: item.id,
        category_id: item.category_id || "",
        amount: Number(item.amount || 0),
        spent: Number(item.spent_amount || 0)
      }));
    };
    const loadTransactions = async () => {
      const res = await listMyTransactions({ page: 1, size: 500 });
      const walletMap = new Map(wallets.value.map((item) => [item.id, item.name]));
      const categoryMap = new Map(categories.value.map((item) => [item.id, item.name]));
      allTransactions.value = (res.items || []).map((item) => ({
        id: item.id,
        walletID: item.wallet_id || "",
        categoryID: item.category_id || "",
        transactionDate: normalizeDateInput(item.transaction_date),
        category: item.category_id ? categoryMap.get(item.category_id) || "Uncategorized" : "Uncategorized",
        note: item.note || "",
        amount: Number(item.amount || 0),
        type: item.type,
        wallet: item.wallet_id ? walletMap.get(item.wallet_id) || "Unknown Wallet" : "Unknown Wallet",
        date: formatDate(item.transaction_date)
      }));
    };
    const onEditCalendarDateChange = (event) => {
      const target = event.target;
      if (target?.value) {
        editTransaction.transactionDate = target.value;
        editDatePickerOpen.value = false;
      }
    };
    const cancelDeleteTransaction = () => {
      deleteConfirmOpen.value = false;
      deleteTargetID.value = "";
    };
    const confirmDeleteTransaction = async () => {
      const transactionID = deleteTargetID.value;
      if (!transactionID) {
        cancelDeleteTransaction();
        return;
      }
      actionLoading.value = true;
      actionError.value = "";
      try {
        await deleteMyTransaction(transactionID);
        await Promise.all([loadWallets(), loadBudgets(), loadTransactions(), refreshTotalNetWorth()]);
        cancelDeleteTransaction();
      } catch (error) {
        actionError.value = normalizeErrorMessage(error);
      } finally {
        actionLoading.value = false;
      }
    };
    watch(historyTypeFilter, () => {
      currentPage.value = 1;
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
      const _component_AppDropdown = __nuxt_component_1;
      const _component_calendar_date = resolveComponent("calendar-date");
      const _component_calendar_month = resolveComponent("calendar-month");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden" }, _attrs))} data-v-9f59e953><div class="absolute inset-0 z-0 pointer-events-none" data-v-9f59e953><div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40" data-v-9f59e953></div></div>`);
      if (mobileSidebarOpen.value) {
        _push(`<div class="fixed inset-0 z-10 bg-slate-900/30 backdrop-blur-[1px] min-[1025px]:hidden" data-v-9f59e953></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "w-72 h-screen shrink-0 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-300 ease-out",
        "max-[1024px]:fixed max-[1024px]:inset-y-0 max-[1024px]:left-0 max-[1024px]:z-30 min-[1025px]:translate-x-0",
        mobileSidebarOpen.value ? "max-[1024px]:translate-x-0" : "max-[1024px]:-translate-x-full"
      ])}" data-v-9f59e953><div class="relative p-10" data-v-9f59e953><button class="inline-flex min-[1025px]:hidden absolute top-5 right-4 h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition" aria-label="Close sidebar" data-v-9f59e953><span class="text-base" data-v-9f59e953>×</span></button><h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1" data-v-9f59e953> Archive </h1><h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase" data-v-9f59e953> Balance </h2></div><nav class="flex-1 px-6 space-y-2 overflow-hidden" data-v-9f59e953><div class="space-y-1" data-v-9f59e953><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-9f59e953> Overview <span class="${ssrRenderClass([{ "rotate-180": unref(sections).overview }, "text-[9px] transition-transform duration-300"])}" data-v-9f59e953>▼</span></button><div class="${ssrRenderClass([
        unref(sections).overview ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-9f59e953><button class="${ssrRenderClass(navClass("dashboard"))}" data-v-9f59e953> Dashboard </button><button class="${ssrRenderClass(navClass("history"))}" data-v-9f59e953> Transaction Ledger </button></div></div><div class="space-y-1" data-v-9f59e953><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-9f59e953> Management <span class="${ssrRenderClass([{ "rotate-180": unref(sections).management }, "text-[9px] transition-transform duration-300"])}" data-v-9f59e953>▼</span></button><div class="${ssrRenderClass([
        unref(sections).management ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-9f59e953><button class="${ssrRenderClass(navClass("wallets"))}" data-v-9f59e953> Wallets </button><button class="${ssrRenderClass(navClass("categories"))}" data-v-9f59e953> Categories </button><button class="${ssrRenderClass(navClass("budgets"))}" data-v-9f59e953> Budgets </button></div></div><div class="space-y-1" data-v-9f59e953><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-9f59e953> Entry <span class="${ssrRenderClass([{ "rotate-180": unref(sections).actions }, "text-[9px] transition-transform duration-300"])}" data-v-9f59e953>▼</span></button><div class="${ssrRenderClass([
        unref(sections).actions ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-9f59e953><button class="${ssrRenderClass(navClass("record"))}" data-v-9f59e953> New Transaction </button></div></div><div class="space-y-1" data-v-9f59e953><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-9f59e953> System <span class="${ssrRenderClass([{ "rotate-180": unref(sections).system }, "text-[9px] transition-transform duration-300"])}" data-v-9f59e953>▼</span></button><div class="${ssrRenderClass([
        unref(sections).system ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-9f59e953><button class="${ssrRenderClass(navClass("profile"))}" data-v-9f59e953> Account Profile </button><button class="${ssrRenderClass(navClass("settings"))}" data-v-9f59e953> Settings </button></div></div></nav><div class="border-t border-slate-100 bg-slate-900 px-6 py-5 text-white" data-v-9f59e953><p class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1" data-v-9f59e953> Authenticated as </p><p class="text-sm font-semibold tracking-tight" data-v-9f59e953>${ssrInterpolate(unref(userDisplayName))}</p><button class="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition" data-v-9f59e953> Logout </button></div></aside><main class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1" data-v-9f59e953>`);
      if (pageLoading.value) {
        _push(ssrRenderComponent(_component_AppLoading, {
          overlay: "",
          label: "Loading data..."
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between" data-v-9f59e953><div data-v-9f59e953><button class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600" data-v-9f59e953><span class="text-sm" data-v-9f59e953>☰</span> Menu </button><p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2" data-v-9f59e953>${ssrInterpolate(unref(currentPath))}</p><h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900" data-v-9f59e953>${ssrInterpolate(pageTitle.value)}</h3></div><div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6" data-v-9f59e953><div class="text-right" data-v-9f59e953><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-9f59e953> Total Net Worth </p><p class="text-2xl font-medium tracking-tight" data-v-9f59e953> ฿ ${ssrInterpolate(headerTotalNetWorth.value.toLocaleString(void 0, {
        minimumFractionDigits: 2
      }))}</p></div><button class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-9f59e953> Quick Entry </button></div></header><div class="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700" data-v-9f59e953>`);
      if (unref(currentPath) === "dashboard") {
        _push(`<div class="grid grid-cols-1 xl:grid-cols-3 items-start gap-10" data-v-9f59e953><div class="xl:col-span-2 min-w-0 space-y-10" data-v-9f59e953><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-9f59e953><div class="flex justify-between items-center mb-7" data-v-9f59e953><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-9f59e953> Monthly Performance </h4><div class="flex space-x-4" data-v-9f59e953><div class="flex items-center space-x-2" data-v-9f59e953><div class="w-2 h-2 rounded-full bg-indigo-500" data-v-9f59e953></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-9f59e953>Income</span></div><div class="flex items-center space-x-2" data-v-9f59e953><div class="w-2 h-2 rounded-full bg-slate-200" data-v-9f59e953></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-9f59e953>Expense</span></div></div></div><div class="h-56 flex items-end justify-between px-2 gap-4" data-v-9f59e953><!--[-->`);
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
          _push(`<div class="flex-1 group relative" data-v-9f59e953><div class="w-full bg-slate-50 rounded-t-xl transition-all group-hover:bg-indigo-50" style="${ssrRenderStyle({ height: h * 0.8 + "%" })}" data-v-9f59e953></div><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer" style="${ssrRenderStyle({ height: h * 0.5 + "%" })}" data-v-9f59e953></div></div>`);
        });
        _push(`<!--]--></div><div class="flex justify-between mt-6 px-2 text-[9px] text-slate-300 uppercase tracking-widest font-bold" data-v-9f59e953><span data-v-9f59e953>Jan</span><span data-v-9f59e953>Feb</span><span data-v-9f59e953>Mar</span><span data-v-9f59e953>Apr</span><span data-v-9f59e953>May</span><span data-v-9f59e953>Jun</span><span data-v-9f59e953>Jul</span><span data-v-9f59e953>Aug</span><span data-v-9f59e953>Sep</span><span data-v-9f59e953>Oct</span><span data-v-9f59e953>Nov</span><span data-v-9f59e953>Dec</span></div></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-9f59e953><div class="flex justify-between items-center mb-8" data-v-9f59e953><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-9f59e953> Recent Activity </h4><button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider hover:opacity-70 transition-opacity" data-v-9f59e953> View All Ledger </button></div><div class="space-y-6" data-v-9f59e953><!--[-->`);
        ssrRenderList(recentTransactionsSnapshot.value, (item) => {
          _push(`<div class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0" data-v-9f59e953><div class="flex items-center space-x-4" data-v-9f59e953><div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400" data-v-9f59e953>${ssrInterpolate(item.category.substring(0, 2).toUpperCase())}</div><div data-v-9f59e953><p class="text-sm font-medium text-slate-900" data-v-9f59e953>${ssrInterpolate(item.note || item.category)}</p><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-9f59e953>${ssrInterpolate(item.wallet)} • ${ssrInterpolate(item.date)}</p></div></div><p class="${ssrRenderClass([
            "text-sm font-semibold",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-9f59e953>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-8" data-v-9f59e953><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden" data-v-9f59e953><div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" data-v-9f59e953></div><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-9f59e953> Active Wallets </h4><div class="space-y-8" data-v-9f59e953><!--[-->`);
        ssrRenderList(wallets.value, (wallet) => {
          _push(`<div class="group cursor-pointer" data-v-9f59e953><div class="flex justify-between items-end mb-2" data-v-9f59e953><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-9f59e953>${ssrInterpolate(wallet.name)}</p><span class="text-[8px] text-slate-600 group-hover:text-indigo-400 transition-colors" data-v-9f59e953>DETAILS</span></div><p class="text-xl font-light tracking-tight" data-v-9f59e953> ฿ ${ssrInterpolate(wallet.balance.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div><button class="w-full mt-10 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all" data-v-9f59e953> Manage Assets </button></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-9f59e953><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-9f59e953> Budget Status </h4><div class="space-y-8" data-v-9f59e953><!--[-->`);
        ssrRenderList(activeBudgets.value, (budget) => {
          _push(`<div class="space-y-3" data-v-9f59e953><div class="flex justify-between text-[10px] uppercase tracking-widest" data-v-9f59e953><span class="font-bold text-slate-900" data-v-9f59e953>${ssrInterpolate(budget.category)}</span><span class="text-slate-400" data-v-9f59e953>${ssrInterpolate(budget.percent)}%</span></div><div class="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden" data-v-9f59e953><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.percent > 90 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({ width: budget.percent + "%" })}" data-v-9f59e953></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "history") {
        _push(`<div class="space-y-8" data-v-9f59e953><div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden" data-v-9f59e953><div class="p-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6" data-v-9f59e953><div class="flex space-x-8" data-v-9f59e953><button class="${ssrRenderClass([
          "text-[10px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors",
          historyTypeFilter.value === "all" ? "text-slate-900 border-slate-900" : "text-slate-400 border-transparent hover:text-slate-900"
        ])}" data-v-9f59e953> All Activity </button><button class="${ssrRenderClass([
          "text-[10px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors",
          historyTypeFilter.value === "income" ? "text-slate-900 border-slate-900" : "text-slate-400 border-transparent hover:text-slate-900"
        ])}" data-v-9f59e953> Income </button><button class="${ssrRenderClass([
          "text-[10px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors",
          historyTypeFilter.value === "expense" ? "text-slate-900 border-slate-900" : "text-slate-400 border-transparent hover:text-slate-900"
        ])}" data-v-9f59e953> Expenses </button></div><div class="text-[10px] font-bold text-slate-300 uppercase tracking-widest" data-v-9f59e953> Displaying ${ssrInterpolate(displayStart.value)}-${ssrInterpolate(displayEnd.value)} of ${ssrInterpolate(totalTransactions.value)} Records </div></div><div class="divide-y divide-slate-50" data-v-9f59e953><!--[-->`);
        ssrRenderList(paginatedTransactions.value, (item) => {
          _push(`<div class="px-10 py-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center" data-v-9f59e953><div class="flex items-center space-x-6" data-v-9f59e953><div class="min-w-[120px] whitespace-nowrap text-[10px] font-bold text-slate-300 tracking-tighter" data-v-9f59e953>${ssrInterpolate(item.date)}</div><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500" data-v-9f59e953>${ssrInterpolate(item.category.substring(0, 1).toUpperCase())}</div><div data-v-9f59e953><p class="text-sm font-medium text-slate-900" data-v-9f59e953>${ssrInterpolate(item.note || item.category)}</p><p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5" data-v-9f59e953>${ssrInterpolate(item.category)} • ${ssrInterpolate(item.wallet)}</p></div></div><div class="text-right" data-v-9f59e953><p class="${ssrRenderClass([
            "text-sm font-semibold tracking-tight",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-9f59e953>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><p class="text-[9px] text-slate-300 uppercase tracking-widest mt-1" data-v-9f59e953> Confirmed </p><div class="mt-2 flex items-center justify-end gap-3" data-v-9f59e953><button class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-700" data-v-9f59e953> Edit </button><button class="text-[9px] font-bold uppercase tracking-widest text-slate-300 hover:text-rose-500" data-v-9f59e953> Delete </button></div></div></div>`);
        });
        _push(`<!--]--></div><div class="p-10 border-t border-slate-50 flex justify-between items-center" data-v-9f59e953><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-9f59e953> Previous Archive </button><div class="flex items-center space-x-6" data-v-9f59e953><!--[-->`);
        ssrRenderList(totalPages.value, (page) => {
          _push(`<button class="${ssrRenderClass([
            "text-[10px] font-bold transition-all",
            currentPage.value === page ? "text-indigo-600 scale-125" : "text-slate-300 hover:text-slate-600"
          ])}" data-v-9f59e953>${ssrInterpolate(page.toString().padStart(2, "0"))}</button>`);
        });
        _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-9f59e953> Next Archive </button></div></div></div>`);
      } else {
        _push(`<div class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-white/30 backdrop-blur-sm" data-v-9f59e953><div class="text-center max-w-sm" data-v-9f59e953><h5 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-4" data-v-9f59e953> Module Locked </h5><p class="text-sm text-slate-400 font-light leading-relaxed mb-8" data-v-9f59e953> The interface for <span class="text-indigo-500 font-medium" data-v-9f59e953>${ssrInterpolate(pageTitle.value)}</span> is currently under architectural review. </p><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity" data-v-9f59e953> Return to Core </button></div></div>`);
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
      _push(ssrRenderComponent(_component_AppConfirmModal, {
        open: deleteConfirmOpen.value,
        title: "Confirm Delete",
        description: deleteConfirmDescription.value,
        "confirm-label": "Delete",
        "cancel-label": "Cancel",
        "onUpdate:open": cancelDeleteTransaction,
        onConfirm: confirmDeleteTransaction,
        onCancel: cancelDeleteTransaction
      }, null, _parent));
      if (editModalOpen.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4" data-v-9f59e953><div class="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl" data-v-9f59e953><h4 class="text-sm font-bold uppercase tracking-widest text-slate-900" data-v-9f59e953> Edit Transaction </h4><div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2" data-v-9f59e953><div class="space-y-2" data-v-9f59e953><label class="text-[9px] font-bold uppercase tracking-widest text-slate-400" data-v-9f59e953>Type</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: editTransaction.type,
          "onUpdate:modelValue": ($event) => editTransaction.type = $event,
          label: "Select Type",
          items: editTypeDropdownItems,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-2" data-v-9f59e953><label class="text-[9px] font-bold uppercase tracking-widest text-slate-400" data-v-9f59e953>Amount</label><input${ssrRenderAttr("value", editTransaction.amount)} type="number" step="0.01" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" data-v-9f59e953></div><div class="space-y-2" data-v-9f59e953><label class="text-[9px] font-bold uppercase tracking-widest text-slate-400" data-v-9f59e953>Wallet</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: editTransaction.walletID,
          "onUpdate:modelValue": ($event) => editTransaction.walletID = $event,
          label: "Select Wallet",
          items: editWalletDropdownItems.value,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-2" data-v-9f59e953><label class="text-[9px] font-bold uppercase tracking-widest text-slate-400" data-v-9f59e953>Category</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: editTransaction.categoryID,
          "onUpdate:modelValue": ($event) => editTransaction.categoryID = $event,
          label: "Select Category",
          items: editCategoryDropdownItems.value,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-2 md:col-span-2" data-v-9f59e953><label class="text-[9px] font-bold uppercase tracking-widest text-slate-400" data-v-9f59e953>Transaction Date</label><div class="relative" data-v-9f59e953><button type="button" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700" data-v-9f59e953>${ssrInterpolate(editDateButtonLabel.value)}</button>`);
        if (editDatePickerOpen.value) {
          _push(`<div class="absolute bottom-full left-0 z-50 mb-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl" data-v-9f59e953>`);
          _push(ssrRenderComponent(_component_calendar_date, {
            class: "cally block rounded-xl border border-slate-200 bg-slate-50 p-2",
            value: editTransaction.transactionDate,
            onChange: onEditCalendarDateChange
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg aria-label="Previous" class="size-4 fill-current text-slate-500" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-9f59e953${_scopeId}><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" data-v-9f59e953${_scopeId}></path></svg><svg aria-label="Next" class="size-4 fill-current text-slate-500" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-9f59e953${_scopeId}><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" data-v-9f59e953${_scopeId}></path></svg>`);
                _push2(ssrRenderComponent(_component_calendar_month, null, null, _parent2, _scopeId));
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    "aria-label": "Previous",
                    class: "size-4 fill-current text-slate-500",
                    slot: "previous",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      fill: "currentColor",
                      d: "M15.75 19.5 8.25 12l7.5-7.5"
                    })
                  ])),
                  (openBlock(), createBlock("svg", {
                    "aria-label": "Next",
                    class: "size-4 fill-current text-slate-500",
                    slot: "next",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      fill: "currentColor",
                      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
                    })
                  ])),
                  createVNode(_component_calendar_month)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><input${ssrRenderAttr("value", editTransaction.transactionDate)} type="date" class="sr-only" data-v-9f59e953></div><div class="space-y-2 md:col-span-2" data-v-9f59e953><label class="text-[9px] font-bold uppercase tracking-widest text-slate-400" data-v-9f59e953>Note</label><input${ssrRenderAttr("value", editTransaction.note)} type="text" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" data-v-9f59e953></div></div>`);
        if (actionError.value) {
          _push(`<p class="mt-4 text-xs font-semibold text-rose-500" data-v-9f59e953>${ssrInterpolate(actionError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-8 flex justify-end gap-3" data-v-9f59e953><button class="rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50" data-v-9f59e953> Cancel </button><button class="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800 disabled:opacity-50"${ssrIncludeBooleanAttr(actionLoading.value) ? " disabled" : ""} data-v-9f59e953>${ssrInterpolate(actionLoading.value ? "Saving..." : "Save")}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/transaction-ledger/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9f59e953"]]);

export { index as default };
//# sourceMappingURL=index-D0WFBlPp.mjs.map
