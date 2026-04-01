import { _ as __nuxt_component_0 } from './AppDropdown-FO-0Uf_o.mjs';
import { u as useSidebarNavigation, _ as __nuxt_component_1 } from './useSidebarNavigation-C9KuT-FJ.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useTotalNetWorth } from './useTotalNetWorth-C5two5OM.mjs';
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
    const loading = ref(false);
    const passwordChanging = ref(false);
    const accountDeactivating = ref(false);
    const message = ref("");
    const { totalNetWorth: totalNetWorthFromAPI } = useTotalNetWorth();
    const confirmModalOpen = ref(false);
    const confirmTitle = ref("Confirm Action");
    const confirmDescription = ref("");
    const confirmActionLabel = ref("Confirm");
    const confirmIsDanger = ref(false);
    const meData = ref(null);
    const formatMonthYear = (value) => {
      if (!value) {
        return "-";
      }
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return "-";
      }
      return date.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric"
      });
    };
    const formatEnglishDateTime = (value) => {
      if (!value) {
        return "-";
      }
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return "-";
      }
      const datePart = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      const timePart = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      return `${datePart} ${timePart}`;
    };
    const meSummary = computed(() => {
      const me = meData.value;
      return {
        username: me?.account?.username || "-",
        memberSince: formatMonthYear(me?.created_at),
        lastLogin: formatEnglishDateTime(me?.last_login),
        updatedAt: formatEnglishDateTime(me?.updated_at)
      };
    });
    const userProfile = reactive({
      firstName: "Johnathan",
      lastName: "Doe",
      displayName: "Johnathan Doe",
      phone: "081-234-5678"
    });
    const passwordForm = reactive({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    const wallets = ref([
      { id: 1, name: "Main Savings", balance: 12e4, currency: "THB" },
      { id: 2, name: "Cash on Hand", balance: 2500, currency: "THB" },
      { id: 3, name: "Investment Port", balance: 2e4, currency: "THB" }
    ]);
    const newWallet = reactive({
      name: "",
      balance: 0,
      currency: "THB"
    });
    const totalNetWorth = computed(() => {
      return wallets.value.reduce((acc, curr) => acc + curr.balance, 0);
    });
    const headerTotalNetWorth = computed(() => {
      return totalNetWorthFromAPI.value ?? totalNetWorth.value;
    });
    const walletDropdownItems = computed(
      () => wallets.value.map((w) => ({
        label: `${w.name} (฿${w.balance.toLocaleString()})`,
        value: w.id
      }))
    );
    const currencyDropdownItems = [
      { label: "THB - Thai Baht", value: "THB" },
      { label: "USD - US Dollar", value: "USD" }
    ];
    const categories = ref([
      { id: 1, name: "Food & Drink", type: "expense" },
      { id: 2, name: "Salary", type: "income" },
      { id: 3, name: "Transport", type: "expense" },
      { id: 4, name: "Freelance", type: "income" },
      { id: 5, name: "Subscription", type: "expense" },
      { id: 6, name: "Health", type: "expense" },
      { id: 7, name: "Dining Out", type: "expense" },
      { id: 8, name: "Entertainment", type: "expense" },
      { id: 9, name: "Shopping", type: "expense" }
    ]);
    const categoryFilter = ref("all");
    const newCategory = reactive({
      name: "",
      type: "expense"
    });
    const filteredCategories = computed(() => {
      if (categoryFilter.value === "all") return categories.value;
      return categories.value.filter((c) => c.type === categoryFilter.value);
    });
    const recordCategoryDropdownItems = computed(
      () => categories.value.filter((cat) => cat.type === newRecord.type).map((cat) => ({ label: cat.name, value: cat.id }))
    );
    const getCategoryName = (id) => {
      const cat = categories.value.find((c) => c.id === id);
      return cat ? cat.name : "Unknown";
    };
    const budgets = ref([
      { id: 1, category_id: 7, amount: 5e3, spent: 4250, period: "monthly" },
      { id: 2, category_id: 8, amount: 2e3, spent: 600, period: "monthly" },
      { id: 3, category_id: 9, amount: 3e3, spent: 2760, period: "monthly" }
    ]);
    const budgetPeriodFilter = ref("all");
    const newBudget = reactive({
      category_id: "",
      amount: 0,
      period: "monthly"
    });
    const filteredBudgets = computed(() => {
      if (budgetPeriodFilter.value === "all") return budgets.value;
      return budgets.value.filter((b) => b.period === budgetPeriodFilter.value);
    });
    const budgetCategoryDropdownItems = computed(
      () => categories.value.filter((c) => c.type === "expense").map((cat) => ({ label: cat.name, value: cat.id }))
    );
    const allTransactions = ref([
      {
        id: 1,
        category: "Food & Drink",
        note: "Starbucks Coffee",
        amount: 145,
        type: "expense",
        wallet: "Cash",
        date: "2026-04-01"
      },
      {
        id: 2,
        category: "Salary",
        note: "Monthly Revenue",
        amount: 45e3,
        type: "income",
        wallet: "Main Savings",
        date: "2026-03-31"
      },
      {
        id: 3,
        category: "Transport",
        note: "Grab Ride",
        amount: 220,
        type: "expense",
        wallet: "Main Savings",
        date: "2026-03-30"
      },
      {
        id: 4,
        category: "Shopping",
        note: "Uniqlo Store",
        amount: 1290,
        type: "expense",
        wallet: "Main Savings",
        date: "2026-03-29"
      },
      {
        id: 5,
        category: "Food & Drink",
        note: "Dinner at Shabu",
        amount: 850,
        type: "expense",
        wallet: "Cash",
        date: "2026-03-28"
      },
      {
        id: 6,
        category: "Freelance",
        note: "Logo Design Project",
        amount: 5e3,
        type: "income",
        wallet: "Investment Port",
        date: "2026-03-27"
      }
    ]);
    const recentTransactionsSnapshot = computed(
      () => allTransactions.value.slice(0, 3)
    );
    const newRecord = reactive({
      type: "expense",
      amount: null,
      wallet_id: "",
      category_id: "",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      note: ""
    });
    const currentPage = ref(1);
    const totalTransactions = computed(() => allTransactions.value.length);
    const totalPages = computed(
      () => Math.ceil(totalTransactions.value / itemsPerPage)
    );
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
    const endIndex = computed(() => startIndex.value + itemsPerPage);
    const paginatedTransactions = computed(() => {
      return allTransactions.value.slice(startIndex.value, endIndex.value);
    });
    const activeBudgets = computed(() => {
      return budgets.value.map((b) => ({
        id: b.id,
        category: getCategoryName(b.category_id),
        percent: Math.min(Math.round(b.spent / b.amount * 100), 100)
      }));
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
          return "Execute Entry";
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
      const _component_AppDropdown = __nuxt_component_0;
      const _component_AppConfirmModal = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden" }, _attrs))} data-v-e035ae8f><div class="absolute inset-0 z-0 pointer-events-none" data-v-e035ae8f><div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40" data-v-e035ae8f></div></div>`);
      if (mobileSidebarOpen.value) {
        _push(`<div class="fixed inset-0 z-10 bg-slate-900/30 backdrop-blur-[1px] min-[1025px]:hidden" data-v-e035ae8f></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "w-72 h-screen shrink-0 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-300 ease-out",
        "max-[1024px]:fixed max-[1024px]:inset-y-0 max-[1024px]:left-0 max-[1024px]:z-30 min-[1025px]:translate-x-0",
        mobileSidebarOpen.value ? "max-[1024px]:translate-x-0" : "max-[1024px]:-translate-x-full"
      ])}" data-v-e035ae8f><div class="relative p-10" data-v-e035ae8f><button class="inline-flex min-[1025px]:hidden absolute top-5 right-4 h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition" aria-label="Close sidebar" data-v-e035ae8f><span class="text-base" data-v-e035ae8f>×</span></button><h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1" data-v-e035ae8f> Archive </h1><h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase" data-v-e035ae8f> Balance </h2></div><nav class="flex-1 px-6 space-y-2 overflow-hidden" data-v-e035ae8f><div class="space-y-1" data-v-e035ae8f><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-e035ae8f> Overview <span class="${ssrRenderClass([{ "rotate-180": unref(sections).overview }, "text-[9px] transition-transform duration-300"])}" data-v-e035ae8f>▼</span></button><div class="${ssrRenderClass([
        unref(sections).overview ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-e035ae8f><button class="${ssrRenderClass(navClass("dashboard"))}" data-v-e035ae8f> Dashboard </button><button class="${ssrRenderClass(navClass("history"))}" data-v-e035ae8f> Transaction Ledger </button></div></div><div class="space-y-1" data-v-e035ae8f><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-e035ae8f> Management <span class="${ssrRenderClass([{ "rotate-180": unref(sections).management }, "text-[9px] transition-transform duration-300"])}" data-v-e035ae8f>▼</span></button><div class="${ssrRenderClass([
        unref(sections).management ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-e035ae8f><button class="${ssrRenderClass(navClass("wallets"))}" data-v-e035ae8f> Wallets </button><button class="${ssrRenderClass(navClass("categories"))}" data-v-e035ae8f> Categories </button><button class="${ssrRenderClass(navClass("budgets"))}" data-v-e035ae8f> Budgets </button></div></div><div class="space-y-1" data-v-e035ae8f><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-e035ae8f> Entry <span class="${ssrRenderClass([{ "rotate-180": unref(sections).actions }, "text-[9px] transition-transform duration-300"])}" data-v-e035ae8f>▼</span></button><div class="${ssrRenderClass([
        unref(sections).actions ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-e035ae8f><button class="${ssrRenderClass(navClass("record"))}" data-v-e035ae8f> New Transaction </button></div></div><div class="space-y-1" data-v-e035ae8f><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-e035ae8f> System <span class="${ssrRenderClass([{ "rotate-180": unref(sections).system }, "text-[9px] transition-transform duration-300"])}" data-v-e035ae8f>▼</span></button><div class="${ssrRenderClass([
        unref(sections).system ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-e035ae8f><button class="${ssrRenderClass(navClass("profile"))}" data-v-e035ae8f> Account Profile </button><button class="${ssrRenderClass(navClass("settings"))}" data-v-e035ae8f> Settings </button></div></div></nav><div class="border-t border-slate-100 bg-slate-900 px-6 py-5 text-white" data-v-e035ae8f><p class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1" data-v-e035ae8f> Authenticated as </p><p class="text-sm font-semibold tracking-tight" data-v-e035ae8f>${ssrInterpolate(unref(userDisplayName))}</p><button class="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition" data-v-e035ae8f> Logout </button></div></aside><main class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1" data-v-e035ae8f><header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between" data-v-e035ae8f><div data-v-e035ae8f><button class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600" data-v-e035ae8f><span class="text-sm" data-v-e035ae8f>☰</span> Menu </button><p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2" data-v-e035ae8f>${ssrInterpolate(unref(currentPath))}</p><h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900" data-v-e035ae8f>${ssrInterpolate(pageTitle.value)}</h3></div><div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6" data-v-e035ae8f><div class="text-right" data-v-e035ae8f><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-e035ae8f> Total Net Worth </p><p class="text-2xl font-medium tracking-tight" data-v-e035ae8f> ฿ ${ssrInterpolate(headerTotalNetWorth.value.toLocaleString(void 0, {
        minimumFractionDigits: 2
      }))}</p></div>`);
      if (unref(currentPath) !== "record") {
        _push(`<button class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-e035ae8f> Quick Entry </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><div class="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700" data-v-e035ae8f>`);
      if (unref(currentPath) === "dashboard") {
        _push(`<div class="grid grid-cols-1 xl:grid-cols-3 items-start gap-10" data-v-e035ae8f><div class="xl:col-span-2 min-w-0 space-y-10" data-v-e035ae8f><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e035ae8f><div class="flex justify-between items-center mb-7" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-e035ae8f> Monthly Performance </h4><div class="flex space-x-4" data-v-e035ae8f><div class="flex items-center space-x-2" data-v-e035ae8f><div class="w-2 h-2 rounded-full bg-indigo-500" data-v-e035ae8f></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e035ae8f>Income</span></div><div class="flex items-center space-x-2" data-v-e035ae8f><div class="w-2 h-2 rounded-full bg-slate-200" data-v-e035ae8f></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e035ae8f>Expense</span></div></div></div><div class="h-56 flex items-end justify-between px-2 gap-4" data-v-e035ae8f><!--[-->`);
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
          _push(`<div class="flex-1 group relative" data-v-e035ae8f><div class="w-full bg-slate-50 rounded-t-xl transition-all group-hover:bg-indigo-50" style="${ssrRenderStyle({ height: h * 0.8 + "%" })}" data-v-e035ae8f></div><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer" style="${ssrRenderStyle({ height: h * 0.5 + "%" })}" data-v-e035ae8f></div></div>`);
        });
        _push(`<!--]--></div><div class="flex justify-between mt-6 px-2 text-[9px] text-slate-300 uppercase tracking-widest font-bold" data-v-e035ae8f><span data-v-e035ae8f>Jan</span><span data-v-e035ae8f>Feb</span><span data-v-e035ae8f>Mar</span><span data-v-e035ae8f>Apr</span><span data-v-e035ae8f>May</span><span data-v-e035ae8f>Jun</span><span data-v-e035ae8f>Jul</span><span data-v-e035ae8f>Aug</span><span data-v-e035ae8f>Sep</span><span data-v-e035ae8f>Oct</span><span data-v-e035ae8f>Nov</span><span data-v-e035ae8f>Dec</span></div></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e035ae8f><div class="flex justify-between items-center mb-8" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-e035ae8f> Recent Activity </h4><button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider hover:opacity-70 transition-opacity" data-v-e035ae8f> View All Ledger </button></div><div class="space-y-6" data-v-e035ae8f><!--[-->`);
        ssrRenderList(recentTransactionsSnapshot.value, (item) => {
          _push(`<div class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0" data-v-e035ae8f><div class="flex items-center space-x-4" data-v-e035ae8f><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400" data-v-e035ae8f>${ssrInterpolate(item.category.substring(0, 2).toUpperCase())}</div><div data-v-e035ae8f><p class="text-sm font-medium text-slate-900" data-v-e035ae8f>${ssrInterpolate(item.note || item.category)}</p><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-e035ae8f>${ssrInterpolate(item.wallet)} • ${ssrInterpolate(item.date)}</p></div></div><p class="${ssrRenderClass([
            "text-sm font-semibold",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-e035ae8f>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-8" data-v-e035ae8f><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden" data-v-e035ae8f><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-e035ae8f> Active Wallets </h4><div class="space-y-8" data-v-e035ae8f><!--[-->`);
        ssrRenderList(wallets.value.slice(0, 3), (wallet) => {
          _push(`<div class="group cursor-pointer" data-v-e035ae8f><div class="flex justify-between items-end mb-2" data-v-e035ae8f><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-e035ae8f>${ssrInterpolate(wallet.name)}</p><span class="text-[8px] text-slate-600 group-hover:text-indigo-400 transition-colors" data-v-e035ae8f>DETAILS</span></div><p class="text-xl font-light tracking-tight" data-v-e035ae8f> ฿ ${ssrInterpolate(wallet.balance.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div><button class="w-full mt-10 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all" data-v-e035ae8f> Manage Assets </button></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e035ae8f><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-e035ae8f> Budget Status </h4><div class="space-y-8" data-v-e035ae8f><!--[-->`);
        ssrRenderList(activeBudgets.value, (budget) => {
          _push(`<div class="space-y-3" data-v-e035ae8f><div class="flex justify-between text-[10px] uppercase tracking-widest" data-v-e035ae8f><span class="font-bold text-slate-900" data-v-e035ae8f>${ssrInterpolate(budget.category)}</span><span class="text-slate-400" data-v-e035ae8f>${ssrInterpolate(budget.percent)}%</span></div><div class="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden" data-v-e035ae8f><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.percent > 90 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({ width: budget.percent + "%" })}" data-v-e035ae8f></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "record") {
        _push(`<div class="max-w-3xl mx-auto space-y-8" data-v-e035ae8f><div class="bg-white p-12 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 text-center" data-v-e035ae8f> Execute New Transaction </h4><form class="space-y-10" data-v-e035ae8f><div class="flex p-1.5 bg-slate-50 rounded-[2rem] max-w-sm mx-auto" data-v-e035ae8f><button type="button" class="${ssrRenderClass([
          "flex-1 py-4 rounded-[1.8rem] text-[10px] font-bold uppercase tracking-widest transition-all",
          newRecord.type === "expense" ? "bg-white shadow-sm text-rose-500" : "text-slate-400 hover:text-slate-600"
        ])}" data-v-e035ae8f> Expense </button><button type="button" class="${ssrRenderClass([
          "flex-1 py-4 rounded-[1.8rem] text-[10px] font-bold uppercase tracking-widest transition-all",
          newRecord.type === "income" ? "bg-white shadow-sm text-emerald-500" : "text-slate-400 hover:text-slate-600"
        ])}" data-v-e035ae8f> Income </button></div><div class="text-center space-y-4" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]" data-v-e035ae8f>Monetary Value</label><div class="flex items-center justify-center space-x-4" data-v-e035ae8f><span class="text-2xl font-light text-slate-300" data-v-e035ae8f>฿</span><input${ssrRenderAttr("value", newRecord.amount)} type="number" step="0.01" placeholder="0.00" class="bg-transparent text-6xl font-light tracking-tighter text-slate-900 focus:outline-none w-full max-w-xs text-center" required data-v-e035ae8f></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-10" data-v-e035ae8f><div class="space-y-3" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Archive Source (Wallet)</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: newRecord.wallet_id,
          "onUpdate:modelValue": ($event) => newRecord.wallet_id = $event,
          label: "Select Wallet",
          items: walletDropdownItems.value,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-3" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Taxonomy (Category)</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: newRecord.category_id,
          "onUpdate:modelValue": ($event) => newRecord.category_id = $event,
          label: "Select Category",
          items: recordCategoryDropdownItems.value,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-3" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Transaction Date</label><input${ssrRenderAttr("value", newRecord.date)} type="date" class="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-e035ae8f></div><div class="space-y-3" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Identifier (Note)</label><input${ssrRenderAttr("value", newRecord.note)} type="text" placeholder="Brief description..." class="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e035ae8f></div></div><div class="pt-6" data-v-e035ae8f><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-xs font-bold uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center" data-v-e035ae8f>`);
        if (!loading.value) {
          _push(`<span data-v-e035ae8f>Confirm Transaction</span>`);
        } else {
          _push(`<div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" data-v-e035ae8f></div>`);
        }
        _push(`</button></div></form></div></div>`);
      } else if (unref(currentPath) === "wallets") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-e035ae8f><div class="space-y-8" data-v-e035ae8f><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-e035ae8f> Register New Asset </h4><form class="space-y-6" data-v-e035ae8f><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Asset Name</label><input${ssrRenderAttr("value", newWallet.name)} type="text" placeholder="E.g. Commercial Bank A" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-e035ae8f></div><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Initial Balance</label><input${ssrRenderAttr("value", newWallet.balance)} type="number" placeholder="0.00" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-e035ae8f></div><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Currency Code</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: newWallet.currency,
          "onUpdate:modelValue": ($event) => newWallet.currency = $event,
          label: "Select Currency",
          items: currencyDropdownItems,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><button type="submit" class="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all mt-4" data-v-e035ae8f> Archive Asset </button></form></div></div><div class="space-y-8" data-v-e035ae8f><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-7" data-v-e035ae8f> Asset Inventory </h4><div class="space-y-4" data-v-e035ae8f><!--[-->`);
        ssrRenderList(wallets.value, (wallet) => {
          _push(`<div class="group p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50 flex justify-between items-center" data-v-e035ae8f><div data-v-e035ae8f><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-e035ae8f>${ssrInterpolate(wallet.currency)}</p><p class="text-base font-medium text-slate-900 tracking-tight" data-v-e035ae8f>${ssrInterpolate(wallet.name)}</p></div><div class="text-right" data-v-e035ae8f><p class="text-lg font-light tracking-tighter text-slate-900" data-v-e035ae8f> ฿ ${ssrInterpolate(wallet.balance.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><button class="text-[9px] font-bold text-rose-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all mt-1" data-v-e035ae8f> Detach </button></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "history") {
        _push(`<div class="space-y-8" data-v-e035ae8f><div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden" data-v-e035ae8f><div class="p-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6" data-v-e035ae8f><div class="flex space-x-8" data-v-e035ae8f><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1" data-v-e035ae8f> All Activity </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-e035ae8f> Income </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-e035ae8f> Expenses </button></div><div class="text-[10px] font-bold text-slate-300 uppercase tracking-widest" data-v-e035ae8f> Displaying ${ssrInterpolate(startIndex.value + 1)}-${ssrInterpolate(Math.min(endIndex.value, totalTransactions.value))} of ${ssrInterpolate(totalTransactions.value)} Records </div></div><div class="divide-y divide-slate-50" data-v-e035ae8f><!--[-->`);
        ssrRenderList(paginatedTransactions.value, (item) => {
          _push(`<div class="px-10 py-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center" data-v-e035ae8f><div class="flex items-center space-x-6" data-v-e035ae8f><div class="text-[10px] font-bold text-slate-300 uppercase tracking-tighter w-16" data-v-e035ae8f>${ssrInterpolate(item.date.split(",")[0])}</div><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500" data-v-e035ae8f>${ssrInterpolate(item.category.substring(0, 1).toUpperCase())}</div><div data-v-e035ae8f><p class="text-sm font-medium text-slate-900" data-v-e035ae8f>${ssrInterpolate(item.note || item.category)}</p><p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5" data-v-e035ae8f>${ssrInterpolate(item.category)} • ${ssrInterpolate(item.wallet)}</p></div></div><div class="text-right" data-v-e035ae8f><p class="${ssrRenderClass([
            "text-sm font-semibold tracking-tight",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-e035ae8f>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><p class="text-[9px] text-slate-300 uppercase tracking-widest mt-1" data-v-e035ae8f> Confirmed </p></div></div>`);
        });
        _push(`<!--]--></div><div class="p-10 border-t border-slate-50 flex justify-between items-center" data-v-e035ae8f><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-e035ae8f> Previous Archive </button><div class="flex items-center space-x-6" data-v-e035ae8f><!--[-->`);
        ssrRenderList(totalPages.value, (page) => {
          _push(`<button class="${ssrRenderClass([
            "text-[10px] font-bold transition-all",
            currentPage.value === page ? "text-indigo-600 scale-125" : "text-slate-300 hover:text-slate-600"
          ])}" data-v-e035ae8f>${ssrInterpolate(page.toString().padStart(2, "0"))}</button>`);
        });
        _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-e035ae8f> Next Archive </button></div></div></div>`);
      } else if (unref(currentPath) === "categories") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-e035ae8f><div class="space-y-8" data-v-e035ae8f><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-e035ae8f> Define New Taxonomy </h4><form class="space-y-6" data-v-e035ae8f><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Label Name</label><input${ssrRenderAttr("value", newCategory.name)} type="text" placeholder="E.g. Digital Services" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-e035ae8f></div><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Type Classification</label><div class="grid grid-cols-2 gap-4" data-v-e035ae8f><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "income" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-e035ae8f> Income </button><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "expense" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-e035ae8f> Expense </button></div></div><button type="submit" class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4" data-v-e035ae8f> Add Classification </button></form></div><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl" data-v-e035ae8f><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6" data-v-e035ae8f> Taxonomy Stats </h4><div class="flex justify-between items-center" data-v-e035ae8f><div data-v-e035ae8f><p class="text-3xl font-light tracking-tighter" data-v-e035ae8f>${ssrInterpolate(categories.value.length)}</p><p class="text-[9px] text-slate-500 uppercase tracking-widest mt-1" data-v-e035ae8f> Total Classes </p></div><div class="text-right" data-v-e035ae8f><p class="text-sm font-medium" data-v-e035ae8f>${ssrInterpolate(categories.value.filter((c) => c.type === "expense").length)} Expenses </p><p class="text-sm font-medium" data-v-e035ae8f>${ssrInterpolate(categories.value.filter((c) => c.type === "income").length)} Income </p></div></div></div></div><div class="space-y-8" data-v-e035ae8f><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-e035ae8f><div class="flex justify-between items-center mb-7" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-e035ae8f> Existing Archive </h4><div class="flex space-x-4" data-v-e035ae8f><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "all" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e035ae8f> All </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "income" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e035ae8f> Income </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "expense" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e035ae8f> Expense </button></div></div><div class="space-y-4" data-v-e035ae8f><!--[-->`);
        ssrRenderList(filteredCategories.value, (cat) => {
          _push(`<div class="group flex justify-between items-center p-6 bg-slate-50 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50" data-v-e035ae8f><div class="flex items-center space-x-4" data-v-e035ae8f><div class="${ssrRenderClass([
            "w-2 h-2 rounded-full",
            cat.type === "income" ? "bg-emerald-400" : "bg-rose-400"
          ])}" data-v-e035ae8f></div><span class="text-sm font-medium text-slate-700 tracking-tight" data-v-e035ae8f>${ssrInterpolate(cat.name)}</span></div><button class="text-[9px] font-bold text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all" data-v-e035ae8f> Remove </button></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "budgets") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-e035ae8f><div class="space-y-8" data-v-e035ae8f><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-e035ae8f> Set Spending Constraint </h4><form class="space-y-6" data-v-e035ae8f><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Target Taxonomy</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: newBudget.category_id,
          "onUpdate:modelValue": ($event) => newBudget.category_id = $event,
          label: "Select Category",
          items: budgetCategoryDropdownItems.value,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Allocated Amount</label><input${ssrRenderAttr("value", newBudget.amount)} type="number" placeholder="0.00" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-e035ae8f></div><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Time Period</label><div class="grid grid-cols-3 gap-4" data-v-e035ae8f><!--[-->`);
        ssrRenderList(["daily", "weekly", "monthly"], (p) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "py-4 rounded-2xl text-[9px] font-bold uppercase tracking-widest transition-all",
            newBudget.period === p ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
          ])}" data-v-e035ae8f>${ssrInterpolate(p)}</button>`);
        });
        _push(`<!--]--></div></div><button type="submit" class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4" data-v-e035ae8f> Archive Budget </button></form></div></div><div class="space-y-8" data-v-e035ae8f><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-e035ae8f><div class="flex justify-between items-center mb-7" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-e035ae8f> Active Constraints </h4><div class="flex space-x-4" data-v-e035ae8f><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          budgetPeriodFilter.value === "all" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e035ae8f> All </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          budgetPeriodFilter.value === "monthly" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e035ae8f> Monthly </button></div></div><div class="space-y-8" data-v-e035ae8f><!--[-->`);
        ssrRenderList(filteredBudgets.value, (budget) => {
          _push(`<div class="space-y-4 group" data-v-e035ae8f><div class="flex justify-between items-end px-1" data-v-e035ae8f><div data-v-e035ae8f><p class="text-base font-medium text-slate-900 tracking-tight" data-v-e035ae8f>${ssrInterpolate(getCategoryName(budget.category_id))}</p><p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5" data-v-e035ae8f>${ssrInterpolate(budget.period)} Constraint </p></div><div class="text-right" data-v-e035ae8f><p class="text-sm font-semibold tracking-tight text-slate-900" data-v-e035ae8f> ฿ ${ssrInterpolate(budget.spent.toLocaleString())} / ${ssrInterpolate(budget.amount.toLocaleString())}</p><p class="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5" data-v-e035ae8f>${ssrInterpolate(Math.round(budget.spent / budget.amount * 100))}% Used </p></div></div><div class="w-full bg-slate-50 h-2 rounded-full overflow-hidden" data-v-e035ae8f><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.spent / budget.amount > 0.9 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({
            width: Math.min(budget.spent / budget.amount, 1) * 100 + "%"
          })}" data-v-e035ae8f></div></div><div class="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity" data-v-e035ae8f><button class="text-[9px] font-bold text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors" data-v-e035ae8f> Terminate </button></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "profile") {
        _push(`<div class="max-w-4xl space-y-12" data-v-e035ae8f><div class="grid grid-cols-1 lg:grid-cols-3 gap-12" data-v-e035ae8f><div class="lg:col-span-2 space-y-8" data-v-e035ae8f><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-7" data-v-e035ae8f> Personal Information </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-e035ae8f><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>First Name</label><input type="text"${ssrRenderAttr("value", userProfile.firstName)} class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e035ae8f></div><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Last Name</label><input type="text"${ssrRenderAttr("value", userProfile.lastName)} class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e035ae8f></div><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Display Name</label><input type="text"${ssrRenderAttr("value", userProfile.displayName)} class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e035ae8f></div><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Contact Number</label><input type="text"${ssrRenderAttr("value", userProfile.phone)} class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e035ae8f></div></div><button class="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-e035ae8f> Update Profile </button></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e035ae8f><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-7" data-v-e035ae8f> Security Credentials </h4><div class="space-y-6" data-v-e035ae8f><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Current Password</label><input type="password"${ssrRenderAttr("value", passwordForm.currentPassword)} placeholder="••••••••" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e035ae8f></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-e035ae8f><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>New Password</label><input type="password"${ssrRenderAttr("value", passwordForm.newPassword)} placeholder="••••••••" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e035ae8f></div><div class="space-y-2" data-v-e035ae8f><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e035ae8f>Confirm New Password</label><input type="password"${ssrRenderAttr("value", passwordForm.confirmPassword)} placeholder="••••••••" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e035ae8f></div></div></div><button${ssrIncludeBooleanAttr(passwordChanging.value) ? " disabled" : ""} class="mt-10 px-8 py-4 border border-slate-900 text-slate-900 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed" data-v-e035ae8f>${ssrInterpolate(passwordChanging.value ? "Changing Password..." : "Change Password")}</button></div></div><div class="space-y-8" data-v-e035ae8f><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden" data-v-e035ae8f><p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-e035ae8f> Account Summary </p><div class="space-y-6" data-v-e035ae8f><div data-v-e035ae8f><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e035ae8f> Username </p><p class="text-base font-medium" data-v-e035ae8f>${ssrInterpolate(meSummary.value.username)}</p></div><div data-v-e035ae8f><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e035ae8f> Member Since </p><p class="text-base font-medium" data-v-e035ae8f>${ssrInterpolate(meSummary.value.memberSince)}</p></div><div data-v-e035ae8f><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e035ae8f> Last Login </p><p class="text-sm font-medium" data-v-e035ae8f>${ssrInterpolate(meSummary.value.lastLogin)}</p></div><div data-v-e035ae8f><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e035ae8f> Updated At </p><p class="text-sm font-medium" data-v-e035ae8f>${ssrInterpolate(meSummary.value.updatedAt)}</p></div><div class="pt-6 border-t border-white/10" data-v-e035ae8f><button${ssrIncludeBooleanAttr(accountDeactivating.value) ? " disabled" : ""} class="text-[10px] font-bold text-rose-400 uppercase tracking-widest hover:text-rose-300 transition-colors" data-v-e035ae8f>${ssrInterpolate(accountDeactivating.value ? "Deactivating..." : "Deactivate Archive")}</button></div></div></div></div></div></div>`);
      } else {
        _push(`<div class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-white/30 backdrop-blur-sm" data-v-e035ae8f><div class="text-center max-w-sm" data-v-e035ae8f><h5 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-4" data-v-e035ae8f> Module Locked </h5><p class="text-sm text-slate-400 font-light leading-relaxed mb-8" data-v-e035ae8f> The interface for <span class="text-indigo-500 font-medium" data-v-e035ae8f>${ssrInterpolate(pageTitle.value)}</span> is currently under architectural review. </p><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity" data-v-e035ae8f> Return to Core </button></div></div>`);
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
      if (confirmModalOpen.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4" data-v-e035ae8f><div class="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl" data-v-e035ae8f><h4 class="text-sm font-bold uppercase tracking-widest text-slate-900" data-v-e035ae8f>${ssrInterpolate(confirmTitle.value)}</h4><p class="mt-3 text-sm leading-relaxed text-slate-500" data-v-e035ae8f>${ssrInterpolate(confirmDescription.value)}</p><div class="mt-8 flex justify-end gap-3" data-v-e035ae8f><button class="rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50" data-v-e035ae8f> Cancel </button><button class="${ssrRenderClass(confirmIsDanger.value ? "rounded-xl bg-rose-600 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-rose-700" : "rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800")}" data-v-e035ae8f>${ssrInterpolate(confirmActionLabel.value)}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (message.value) {
        _push(`<div class="fixed top-6 right-6 px-8 py-4 bg-white border border-slate-100 shadow-2xl rounded-2xl text-[10px] font-bold tracking-widest text-slate-900 uppercase z-50" data-v-e035ae8f>${ssrInterpolate(message.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account-profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e035ae8f"]]);

export { index as default };
//# sourceMappingURL=index-C7lqteo-.mjs.map
