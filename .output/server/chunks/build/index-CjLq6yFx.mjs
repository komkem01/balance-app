import { _ as __nuxt_component_0 } from './AppLoading-BXAO02Ye.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
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

const walletItemsPerPage = 5;
const itemsPerPage = 6;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const currentPath = ref("wallet-history");
    ref(false);
    const pageLoading = ref(false);
    const message = ref("");
    useRoute();
    useRouter();
    const sidebarUserDisplayName = ref("Member");
    const sections = reactive({
      overview: false,
      management: true,
      actions: false,
      system: false
    });
    const userProfile = reactive({
      firstName: "Johnathan",
      lastName: "Doe",
      displayName: "Johnathan Doe",
      phone: "081-234-5678"
    });
    const systemSettings = reactive({
      currency: "THB",
      language: "EN",
      notifications: {
        budget: true,
        security: true,
        weekly: false
      }
    });
    const wallets = ref([]);
    const selectedWalletId = ref(null);
    const selectedWallet = computed(
      () => wallets.value.find((w) => w.id === selectedWalletId.value)
    );
    const newWallet = reactive({
      name: "",
      balance: 0,
      currency: "THB"
    });
    const totalNetWorth = computed(() => {
      return wallets.value.reduce((acc, curr) => acc + curr.balance, 0);
    });
    const categories = ref([]);
    const categoryFilter = ref("all");
    const newCategory = reactive({
      name: "",
      type: "expense"
    });
    const filteredCategories = computed(() => {
      if (categoryFilter.value === "all") return categories.value;
      return categories.value.filter((c) => c.type === categoryFilter.value);
    });
    const getCategoryName = (id) => {
      const cat = categories.value.find((c) => c.id === id);
      return cat ? cat.name : "Unknown";
    };
    const budgets = ref([]);
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
    const allTransactions = ref([]);
    const recentTransactionsSnapshot = computed(
      () => allTransactions.value.slice(0, 3)
    );
    const walletTransactions = computed(() => {
      if (!selectedWallet.value) return [];
      return allTransactions.value.filter((t) => t.wallet_id === selectedWalletId.value);
    });
    const walletStats = computed(() => {
      const trans = walletTransactions.value;
      return {
        income: trans.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0),
        expense: trans.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0)
      };
    });
    const walletPage = ref(1);
    const walletTotalPages = computed(
      () => Math.ceil(walletTransactions.value.length / walletItemsPerPage) || 1
    );
    const paginatedWalletTransactions = computed(() => {
      const start = (walletPage.value - 1) * walletItemsPerPage;
      return walletTransactions.value.slice(start, start + walletItemsPerPage);
    });
    reactive({
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
        case "wallet-history":
          return "Wallet Detailed Archive";
        default:
          return "Archive";
      }
    });
    const navClass = (path) => {
      const activePath = currentPath.value === "wallet-history" ? "wallets" : currentPath.value;
      const base = "w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest transition-all duration-300 rounded-xl ";
      return activePath === path ? base + "bg-slate-900 text-white font-bold shadow-lg shadow-slate-200" : base + "text-slate-400 hover:text-slate-900 hover:bg-slate-50";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLoading = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden" }, _attrs))} data-v-e6157125><div class="absolute inset-0 z-0 pointer-events-none" data-v-e6157125><div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40" data-v-e6157125></div></div><aside class="w-72 h-screen shrink-0 sticky top-0 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-500" data-v-e6157125><div class="p-10" data-v-e6157125><h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1" data-v-e6157125> Archive </h1><h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase" data-v-e6157125> Balance </h2></div><nav class="flex-1 px-6 space-y-2 overflow-y-auto" data-v-e6157125><div class="space-y-1" data-v-e6157125><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-e6157125> Overview <span class="${ssrRenderClass([{ "rotate-180": sections.overview }, "text-[9px] transition-transform duration-300"])}" data-v-e6157125>▼</span></button><div class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100" style="${ssrRenderStyle(sections.overview ? null : { display: "none" })}" data-v-e6157125><button class="${ssrRenderClass(navClass("dashboard"))}" data-v-e6157125> Dashboard </button><button class="${ssrRenderClass(navClass("history"))}" data-v-e6157125> Transaction Ledger </button></div></div><div class="space-y-1" data-v-e6157125><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-e6157125> Management <span class="${ssrRenderClass([{ "rotate-180": sections.management }, "text-[9px] transition-transform duration-300"])}" data-v-e6157125>▼</span></button><div class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100" style="${ssrRenderStyle(sections.management ? null : { display: "none" })}" data-v-e6157125><button class="${ssrRenderClass(navClass("wallets"))}" data-v-e6157125> Wallets </button><button class="${ssrRenderClass(navClass("categories"))}" data-v-e6157125> Categories </button><button class="${ssrRenderClass(navClass("budgets"))}" data-v-e6157125> Budgets </button></div></div><div class="space-y-1" data-v-e6157125><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-e6157125> Entry <span class="${ssrRenderClass([{ "rotate-180": sections.actions }, "text-[9px] transition-transform duration-300"])}" data-v-e6157125>▼</span></button><div class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100" style="${ssrRenderStyle(sections.actions ? null : { display: "none" })}" data-v-e6157125><button class="${ssrRenderClass(navClass("record"))}" data-v-e6157125> New Transaction </button></div></div><div class="space-y-1" data-v-e6157125><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-e6157125> System <span class="${ssrRenderClass([{ "rotate-180": sections.system }, "text-[9px] transition-transform duration-300"])}" data-v-e6157125>▼</span></button><div class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100" style="${ssrRenderStyle(sections.system ? null : { display: "none" })}" data-v-e6157125><button class="${ssrRenderClass(navClass("profile"))}" data-v-e6157125> Account Profile </button><button class="${ssrRenderClass(navClass("settings"))}" data-v-e6157125> Settings </button></div></div></nav><div class="border-t border-slate-100 bg-slate-900 px-6 py-5 text-white" data-v-e6157125><p class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1" data-v-e6157125> Authenticated as </p><p class="text-sm font-semibold tracking-tight" data-v-e6157125>${ssrInterpolate(sidebarUserDisplayName.value)}</p><button class="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition" data-v-e6157125> Logout </button></div></aside><main class="flex-1 h-screen min-h-0 min-w-0 relative z-10 overflow-y-auto p-12" data-v-e6157125>`);
      if (pageLoading.value) {
        _push(ssrRenderComponent(_component_AppLoading, {
          overlay: "",
          label: "Loading data..."
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="mb-12 flex justify-between items-end" data-v-e6157125><div data-v-e6157125><p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2" data-v-e6157125>${ssrInterpolate(currentPath.value)}</p><h3 class="text-4xl font-light tracking-tighter text-slate-900" data-v-e6157125>${ssrInterpolate(pageTitle.value)}</h3></div><div class="flex items-center space-x-6" data-v-e6157125><div class="text-right" data-v-e6157125><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-e6157125> Total Net Worth </p><p class="text-2xl font-medium tracking-tight" data-v-e6157125> ฿ ${ssrInterpolate(totalNetWorth.value.toLocaleString(void 0, {
        minimumFractionDigits: 2
      }))}</p></div>`);
      if (currentPath.value !== "record") {
        _push(`<button class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-e6157125> Quick Entry </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><div class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700" data-v-e6157125>`);
      if (currentPath.value === "dashboard") {
        _push(`<div class="grid grid-cols-1 xl:grid-cols-3 gap-8" data-v-e6157125><div class="xl:col-span-2 space-y-8" data-v-e6157125><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><div class="flex justify-between items-center mb-10" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-e6157125> Monthly Performance </h4><div class="flex space-x-4" data-v-e6157125><div class="flex items-center space-x-2" data-v-e6157125><div class="w-2 h-2 rounded-full bg-indigo-500" data-v-e6157125></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e6157125>Income</span></div><div class="flex items-center space-x-2" data-v-e6157125><div class="w-2 h-2 rounded-full bg-slate-200" data-v-e6157125></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e6157125>Expense</span></div></div></div><div class="h-56 flex items-end justify-between px-2 gap-4" data-v-e6157125><!--[-->`);
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
          _push(`<div class="flex-1 group relative" data-v-e6157125><div class="w-full bg-slate-50 rounded-t-xl transition-all group-hover:bg-indigo-50" style="${ssrRenderStyle({ height: h * 0.8 + "%" })}" data-v-e6157125></div><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer" style="${ssrRenderStyle({ height: h * 0.5 + "%" })}" data-v-e6157125></div></div>`);
        });
        _push(`<!--]--></div><div class="flex justify-between mt-6 px-2 text-[9px] text-slate-300 uppercase tracking-widest font-bold" data-v-e6157125><span data-v-e6157125>Jan</span><span data-v-e6157125>Feb</span><span data-v-e6157125>Mar</span><span data-v-e6157125>Apr</span><span data-v-e6157125>May</span><span data-v-e6157125>Jun</span><span data-v-e6157125>Jul</span><span data-v-e6157125>Aug</span><span data-v-e6157125>Sep</span><span data-v-e6157125>Oct</span><span data-v-e6157125>Nov</span><span data-v-e6157125>Dec</span></div></div><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><div class="flex justify-between items-center mb-8" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-e6157125> Recent Activity </h4><button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider hover:opacity-70 transition-opacity" data-v-e6157125> View All Ledger </button></div><div class="space-y-6" data-v-e6157125><!--[-->`);
        ssrRenderList(recentTransactionsSnapshot.value, (item) => {
          _push(`<div class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0" data-v-e6157125><div class="flex items-center space-x-4" data-v-e6157125><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400" data-v-e6157125>${ssrInterpolate(item.category.substring(0, 2).toUpperCase())}</div><div data-v-e6157125><p class="text-sm font-medium text-slate-900" data-v-e6157125>${ssrInterpolate(item.note || item.category)}</p><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-e6157125>${ssrInterpolate(item.wallet)} • ${ssrInterpolate(item.date)}</p></div></div><p class="${ssrRenderClass([
            "text-sm font-semibold",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-e6157125>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-8" data-v-e6157125><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden" data-v-e6157125><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-e6157125> Active Wallets </h4><div class="space-y-8" data-v-e6157125><!--[-->`);
        ssrRenderList(wallets.value.slice(0, 3), (wallet) => {
          _push(`<div class="group cursor-pointer" data-v-e6157125><div class="flex justify-between items-end mb-2" data-v-e6157125><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-e6157125>${ssrInterpolate(wallet.name)}</p><span class="text-[8px] text-slate-600 group-hover:text-indigo-400 transition-colors" data-v-e6157125>DETAILS</span></div><p class="text-xl font-light tracking-tight" data-v-e6157125> ฿ ${ssrInterpolate(wallet.balance.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div><button class="w-full mt-10 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all" data-v-e6157125> Manage Assets </button></div><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-e6157125> Budget Status </h4><div class="space-y-8" data-v-e6157125><!--[-->`);
        ssrRenderList(activeBudgets.value, (budget) => {
          _push(`<div class="space-y-3" data-v-e6157125><div class="flex justify-between text-[10px] uppercase tracking-widest" data-v-e6157125><span class="font-bold text-slate-900" data-v-e6157125>${ssrInterpolate(budget.category)}</span><span class="text-slate-400" data-v-e6157125>${ssrInterpolate(budget.percent)}%</span></div><div class="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden" data-v-e6157125><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.percent > 90 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({ width: budget.percent + "%" })}" data-v-e6157125></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (currentPath.value === "wallet-history") {
        _push(`<div class="space-y-10" data-v-e6157125><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-e6157125> ← Back to Asset Management </button><div class="grid grid-cols-1 lg:grid-cols-3 gap-8" data-v-e6157125><div class="lg:col-span-1 space-y-8" data-v-e6157125><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden" data-v-e6157125><p class="text-[10px] text-slate-500 uppercase tracking-widest mb-4" data-v-e6157125> Current Status </p><h4 class="text-xl font-medium tracking-tight mb-8" data-v-e6157125>${ssrInterpolate(selectedWallet.value?.name)}</h4><div class="space-y-6" data-v-e6157125><div data-v-e6157125><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e6157125> Available Balance </p><p class="text-3xl font-light tracking-tighter" data-v-e6157125> ฿ ${ssrInterpolate(selectedWallet.value?.balance.toLocaleString(void 0, {
          minimumFractionDigits: 2
        }))}</p></div><div class="pt-6 border-t border-white/5 grid grid-cols-2 gap-4" data-v-e6157125><div data-v-e6157125><p class="text-[8px] text-slate-500 uppercase tracking-widest mb-1" data-v-e6157125> Total Income </p><p class="text-sm font-medium text-emerald-400" data-v-e6157125> + ฿${ssrInterpolate(walletStats.value.income.toLocaleString())}</p></div><div data-v-e6157125><p class="text-[8px] text-slate-500 uppercase tracking-widest mb-1" data-v-e6157125> Total Expense </p><p class="text-sm font-medium text-rose-400" data-v-e6157125> - ฿${ssrInterpolate(walletStats.value.expense.toLocaleString())}</p></div></div></div></div></div><div class="lg:col-span-2 space-y-6" data-v-e6157125><div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden" data-v-e6157125><div class="p-10 border-b border-slate-50" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-e6157125> Detailed Ledger </h4></div><div class="divide-y divide-slate-50 min-h-[400px]" data-v-e6157125>`);
        if (paginatedWalletTransactions.value.length === 0) {
          _push(`<div class="p-20 text-center" data-v-e6157125><p class="text-slate-300 text-sm font-light" data-v-e6157125> No records found for this asset. </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(paginatedWalletTransactions.value, (item) => {
          _push(`<div class="px-10 py-6 flex justify-between items-center hover:bg-slate-50/50 transition-colors" data-v-e6157125><div class="flex items-center space-x-6" data-v-e6157125><div class="text-[10px] font-bold text-slate-300 uppercase whitespace-nowrap w-24" data-v-e6157125>${ssrInterpolate(item.date)}</div><div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400" data-v-e6157125>${ssrInterpolate(item.category.substring(0, 1).toUpperCase())}</div><div data-v-e6157125><p class="text-sm font-medium" data-v-e6157125>${ssrInterpolate(item.note || item.category)}</p><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e6157125>${ssrInterpolate(item.category)}</p></div></div><p class="${ssrRenderClass([
            "text-sm font-semibold",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-e6157125>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div>`);
        if (walletTotalPages.value > 1) {
          _push(`<div class="p-8 border-t border-slate-50 flex justify-between items-center" data-v-e6157125><button${ssrIncludeBooleanAttr(walletPage.value === 1) ? " disabled" : ""} class="text-[9px] font-bold uppercase text-slate-400 hover:text-slate-900 disabled:opacity-20" data-v-e6157125> Previous </button><span class="text-[10px] font-bold text-slate-300 uppercase tracking-widest" data-v-e6157125>Page ${ssrInterpolate(walletPage.value)} / ${ssrInterpolate(walletTotalPages.value)}</span><button${ssrIncludeBooleanAttr(walletPage.value === walletTotalPages.value) ? " disabled" : ""} class="text-[9px] font-bold uppercase text-slate-400 hover:text-slate-900 disabled:opacity-20" data-v-e6157125> Next </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      } else if (currentPath.value === "wallets") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-e6157125><div class="space-y-8" data-v-e6157125><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-e6157125> Register New Asset </h4><form class="space-y-6" data-v-e6157125><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Asset Name</label><input${ssrRenderAttr("value", newWallet.name)} type="text" placeholder="E.g. Commercial Bank A" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-e6157125></div><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Initial Balance</label><input${ssrRenderAttr("value", newWallet.balance)} type="number" placeholder="0.00" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-e6157125></div><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Currency Code</label><select class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm appearance-none" data-v-e6157125><option value="THB" data-v-e6157125${ssrIncludeBooleanAttr(Array.isArray(newWallet.currency) ? ssrLooseContain(newWallet.currency, "THB") : ssrLooseEqual(newWallet.currency, "THB")) ? " selected" : ""}>THB - Thai Baht</option><option value="USD" data-v-e6157125${ssrIncludeBooleanAttr(Array.isArray(newWallet.currency) ? ssrLooseContain(newWallet.currency, "USD") : ssrLooseEqual(newWallet.currency, "USD")) ? " selected" : ""}>USD - US Dollar</option></select></div><button type="submit" class="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all mt-4" data-v-e6157125> Archive Asset </button></form></div></div><div class="space-y-8" data-v-e6157125><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10" data-v-e6157125> Asset Inventory </h4><div class="space-y-4" data-v-e6157125><!--[-->`);
        ssrRenderList(wallets.value, (wallet) => {
          _push(`<div class="group p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50 flex justify-between items-center" data-v-e6157125><div data-v-e6157125><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-e6157125>${ssrInterpolate(wallet.currency)}</p><p class="text-base font-medium text-slate-900 tracking-tight" data-v-e6157125>${ssrInterpolate(wallet.name)}</p><button class="text-[8px] font-bold text-indigo-500 uppercase tracking-widest mt-2 hover:opacity-70 transition-opacity" data-v-e6157125> View Ledger → </button></div><div class="text-right" data-v-e6157125><p class="text-lg font-light tracking-tighter text-slate-900" data-v-e6157125> ฿ ${ssrInterpolate(wallet.balance.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><button class="text-[9px] font-bold text-rose-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all mt-1" data-v-e6157125> Detach </button></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (currentPath.value === "history") {
        _push(`<div class="space-y-8" data-v-e6157125><div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden" data-v-e6157125><div class="p-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6" data-v-e6157125><div class="flex space-x-8" data-v-e6157125><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1" data-v-e6157125> All Activity </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-e6157125> Income </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-e6157125> Expenses </button></div><div class="text-[10px] font-bold text-slate-300 uppercase tracking-widest" data-v-e6157125> Displaying ${ssrInterpolate(startIndex.value + 1)}-${ssrInterpolate(Math.min(endIndex.value, totalTransactions.value))} of ${ssrInterpolate(totalTransactions.value)} Records </div></div><div class="divide-y divide-slate-50" data-v-e6157125><!--[-->`);
        ssrRenderList(paginatedTransactions.value, (item) => {
          _push(`<div class="px-10 py-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center" data-v-e6157125><div class="flex items-center space-x-6" data-v-e6157125><div class="text-[10px] font-bold text-slate-300 uppercase tracking-tighter w-16" data-v-e6157125>${ssrInterpolate(item.date.split(",")[0])}</div><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500" data-v-e6157125>${ssrInterpolate(item.category.substring(0, 1).toUpperCase())}</div><div data-v-e6157125><p class="text-sm font-medium text-slate-900" data-v-e6157125>${ssrInterpolate(item.note || item.category)}</p><p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5" data-v-e6157125>${ssrInterpolate(item.category)} • ${ssrInterpolate(item.wallet)}</p></div></div><div class="text-right" data-v-e6157125><p class="${ssrRenderClass([
            "text-sm font-semibold tracking-tight",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-e6157125>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><p class="text-[9px] text-slate-300 uppercase tracking-widest mt-1" data-v-e6157125> Confirmed </p></div></div>`);
        });
        _push(`<!--]--></div><div class="p-10 border-t border-slate-50 flex justify-between items-center" data-v-e6157125><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-e6157125> Previous Archive </button><div class="flex items-center space-x-6" data-v-e6157125><!--[-->`);
        ssrRenderList(totalPages.value, (page) => {
          _push(`<button class="${ssrRenderClass([
            "text-[10px] font-bold transition-all",
            currentPage.value === page ? "text-indigo-600 scale-125" : "text-slate-300 hover:text-slate-600"
          ])}" data-v-e6157125>${ssrInterpolate(page.toString().padStart(2, "0"))}</button>`);
        });
        _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-e6157125> Next Archive </button></div></div></div>`);
      } else if (currentPath.value === "categories") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-e6157125><div class="space-y-8" data-v-e6157125><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-e6157125> Define New Taxonomy </h4><form class="space-y-6" data-v-e6157125><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Label Name</label><input${ssrRenderAttr("value", newCategory.name)} type="text" placeholder="E.g. Digital Services" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-e6157125></div><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Type Classification</label><div class="grid grid-cols-2 gap-4" data-v-e6157125><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "income" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-e6157125> Income </button><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "expense" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-e6157125> Expense </button></div></div><button type="submit" class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4" data-v-e6157125> Add Classification </button></form></div><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl" data-v-e6157125><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6" data-v-e6157125> Taxonomy Stats </h4><div class="flex justify-between items-center" data-v-e6157125><div data-v-e6157125><p class="text-3xl font-light tracking-tighter" data-v-e6157125>${ssrInterpolate(categories.value.length)}</p><p class="text-[9px] text-slate-500 uppercase tracking-widest mt-1" data-v-e6157125> Total Classes </p></div><div class="text-right" data-v-e6157125><p class="text-sm font-medium" data-v-e6157125>${ssrInterpolate(categories.value.filter((c) => c.type === "expense").length)} Expenses </p><p class="text-sm font-medium" data-v-e6157125>${ssrInterpolate(categories.value.filter((c) => c.type === "income").length)} Income </p></div></div></div></div><div class="space-y-8" data-v-e6157125><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-e6157125><div class="flex justify-between items-center mb-10" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-e6157125> Existing Archive </h4><div class="flex space-x-4" data-v-e6157125><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "all" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e6157125> All </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "income" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e6157125> Income </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "expense" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e6157125> Expense </button></div></div><div class="space-y-4" data-v-e6157125><!--[-->`);
        ssrRenderList(filteredCategories.value, (cat) => {
          _push(`<div class="group flex justify-between items-center p-6 bg-slate-50 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50" data-v-e6157125><div class="flex items-center space-x-4" data-v-e6157125><div class="${ssrRenderClass([
            "w-2 h-2 rounded-full",
            cat.type === "income" ? "bg-emerald-400" : "bg-rose-400"
          ])}" data-v-e6157125></div><span class="text-sm font-medium text-slate-700 tracking-tight" data-v-e6157125>${ssrInterpolate(cat.name)}</span></div><button class="text-[9px] font-bold text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all" data-v-e6157125> Remove </button></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (currentPath.value === "budgets") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-e6157125><div class="space-y-8" data-v-e6157125><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-e6157125> Set Spending Constraint </h4><form class="space-y-6" data-v-e6157125><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Target Taxonomy</label><select class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm appearance-none" required data-v-e6157125><option value="" disabled data-v-e6157125${ssrIncludeBooleanAttr(Array.isArray(newBudget.category_id) ? ssrLooseContain(newBudget.category_id, "") : ssrLooseEqual(newBudget.category_id, "")) ? " selected" : ""}>Select Category</option><!--[-->`);
        ssrRenderList(categories.value.filter(
          (c) => c.type === "expense"
        ), (cat) => {
          _push(`<option${ssrRenderAttr("value", cat.id)} data-v-e6157125${ssrIncludeBooleanAttr(Array.isArray(newBudget.category_id) ? ssrLooseContain(newBudget.category_id, cat.id) : ssrLooseEqual(newBudget.category_id, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Allocated Amount</label><input${ssrRenderAttr("value", newBudget.amount)} type="number" placeholder="0.00" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-e6157125></div><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Time Period</label><div class="grid grid-cols-3 gap-4" data-v-e6157125><!--[-->`);
        ssrRenderList(["daily", "weekly", "monthly"], (p) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "py-4 rounded-2xl text-[9px] font-bold uppercase tracking-widest transition-all",
            newBudget.period === p ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
          ])}" data-v-e6157125>${ssrInterpolate(p)}</button>`);
        });
        _push(`<!--]--></div></div><button type="submit" class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4" data-v-e6157125> Archive Budget </button></form></div></div><div class="space-y-8" data-v-e6157125><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-e6157125><div class="flex justify-between items-center mb-10" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-e6157125> Active Constraints </h4><div class="flex space-x-4" data-v-e6157125><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          budgetPeriodFilter.value === "all" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e6157125> All </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          budgetPeriodFilter.value === "monthly" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-e6157125> Monthly </button></div></div><div class="space-y-8" data-v-e6157125><!--[-->`);
        ssrRenderList(filteredBudgets.value, (budget) => {
          _push(`<div class="space-y-4 group" data-v-e6157125><div class="flex justify-between items-end px-1" data-v-e6157125><div data-v-e6157125><p class="text-base font-medium text-slate-900 tracking-tight" data-v-e6157125>${ssrInterpolate(getCategoryName(budget.category_id))}</p><p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5" data-v-e6157125>${ssrInterpolate(budget.period)} Constraint </p></div><div class="text-right" data-v-e6157125><p class="text-sm font-semibold tracking-tight text-slate-900" data-v-e6157125> ฿ ${ssrInterpolate(budget.spent.toLocaleString())} / ${ssrInterpolate(budget.amount.toLocaleString())}</p><p class="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5" data-v-e6157125>${ssrInterpolate(Math.round(budget.spent / budget.amount * 100))}% Used </p></div></div><div class="w-full bg-slate-50 h-2 rounded-full overflow-hidden" data-v-e6157125><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.spent / budget.amount > 0.9 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({
            width: Math.min(budget.spent / budget.amount, 1) * 100 + "%"
          })}" data-v-e6157125></div></div><div class="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity" data-v-e6157125><button class="text-[9px] font-bold text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors" data-v-e6157125> Terminate </button></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (currentPath.value === "profile") {
        _push(`<div class="max-w-4xl space-y-12" data-v-e6157125><div class="grid grid-cols-1 lg:grid-cols-3 gap-12" data-v-e6157125><div class="lg:col-span-2 space-y-8" data-v-e6157125><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10" data-v-e6157125> Personal Information </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-e6157125><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>First Name</label><input type="text"${ssrRenderAttr("value", userProfile.firstName)} class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e6157125></div><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Last Name</label><input type="text"${ssrRenderAttr("value", userProfile.lastName)} class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e6157125></div><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Display Name</label><input type="text"${ssrRenderAttr("value", userProfile.displayName)} class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e6157125></div><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Contact Number</label><input type="text"${ssrRenderAttr("value", userProfile.phone)} class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e6157125></div></div><button class="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-e6157125> Update Profile </button></div><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10" data-v-e6157125> Security Credentials </h4><div class="space-y-6" data-v-e6157125><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Current Password</label><input type="password" placeholder="••••••••" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e6157125></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-e6157125><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>New Password</label><input type="password" placeholder="••••••••" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e6157125></div><div class="space-y-2" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Confirm New Password</label><input type="password" placeholder="••••••••" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-e6157125></div></div></div><button class="mt-10 px-8 py-4 border border-slate-900 text-slate-900 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all" data-v-e6157125> Change Password </button></div></div><div class="space-y-8" data-v-e6157125><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden" data-v-e6157125><p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-e6157125> Account Summary </p><div class="space-y-6" data-v-e6157125><div data-v-e6157125><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e6157125> Username </p><p class="text-base font-medium" data-v-e6157125>john_doe_archive</p></div><div data-v-e6157125><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e6157125> Member Since </p><p class="text-base font-medium" data-v-e6157125>October 2023</p></div><div class="pt-6 border-t border-white/10" data-v-e6157125><button class="text-[10px] font-bold text-rose-400 uppercase tracking-widest hover:text-rose-300 transition-colors" data-v-e6157125> Deactivate Archive </button></div></div></div></div></div></div>`);
      } else if (currentPath.value === "settings") {
        _push(`<div class="max-w-4xl space-y-12" data-v-e6157125><div class="grid grid-cols-1 lg:grid-cols-2 gap-12" data-v-e6157125><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10" data-v-e6157125> Regional Settings </h4><div class="space-y-8" data-v-e6157125><div class="space-y-3" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>Primary Currency</label><select class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm appearance-none" data-v-e6157125><option value="THB" data-v-e6157125${ssrIncludeBooleanAttr(Array.isArray(systemSettings.currency) ? ssrLooseContain(systemSettings.currency, "THB") : ssrLooseEqual(systemSettings.currency, "THB")) ? " selected" : ""}>THB - Thai Baht (฿)</option><option value="USD" data-v-e6157125${ssrIncludeBooleanAttr(Array.isArray(systemSettings.currency) ? ssrLooseContain(systemSettings.currency, "USD") : ssrLooseEqual(systemSettings.currency, "USD")) ? " selected" : ""}>USD - US Dollar ($)</option><option value="EUR" data-v-e6157125${ssrIncludeBooleanAttr(Array.isArray(systemSettings.currency) ? ssrLooseContain(systemSettings.currency, "EUR") : ssrLooseEqual(systemSettings.currency, "EUR")) ? " selected" : ""}>EUR - Euro (€)</option></select></div><div class="space-y-3" data-v-e6157125><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-e6157125>System Language</label><select class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm appearance-none" data-v-e6157125><option value="EN" data-v-e6157125${ssrIncludeBooleanAttr(Array.isArray(systemSettings.language) ? ssrLooseContain(systemSettings.language, "EN") : ssrLooseEqual(systemSettings.language, "EN")) ? " selected" : ""}>English (US)</option><option value="TH" data-v-e6157125${ssrIncludeBooleanAttr(Array.isArray(systemSettings.language) ? ssrLooseContain(systemSettings.language, "TH") : ssrLooseEqual(systemSettings.language, "TH")) ? " selected" : ""}>ไทย (Thai)</option></select></div></div></div><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10" data-v-e6157125> Notification Archive </h4><div class="space-y-6" data-v-e6157125><!--[-->`);
        ssrRenderList(systemSettings.notifications, (val, key) => {
          _push(`<div class="flex justify-between items-center group" data-v-e6157125><div data-v-e6157125><p class="text-sm font-medium text-slate-900 capitalize tracking-tight" data-v-e6157125>${ssrInterpolate(key)} Alerts </p><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e6157125> Enable system ${ssrInterpolate(key)} push </p></div><button class="${ssrRenderClass([
            "w-12 h-6 rounded-full transition-all duration-300 relative",
            systemSettings.notifications[key] ? "bg-slate-900" : "bg-slate-100"
          ])}" data-v-e6157125><div class="${ssrRenderClass([
            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
            systemSettings.notifications[key] ? "left-7" : "left-1"
          ])}" data-v-e6157125></div></button></div>`);
        });
        _push(`<!--]--></div></div><div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-e6157125><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10" data-v-e6157125> Data Management </h4><p class="text-xs text-slate-400 mb-8 leading-relaxed" data-v-e6157125> Securely export your financial archive for external analysis or backup purposes. </p><div class="grid grid-cols-2 gap-4" data-v-e6157125><button class="py-4 border border-slate-100 rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all" data-v-e6157125> Export CSV </button><button class="py-4 border border-slate-100 rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all" data-v-e6157125> Export JSON </button></div></div><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden" data-v-e6157125><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-e6157125> System Manifest </h4><div class="space-y-6" data-v-e6157125><div class="flex justify-between items-end border-b border-white/5 pb-4" data-v-e6157125><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e6157125> Version </p><p class="text-xs font-medium tracking-widest" data-v-e6157125>2.4.0-PRO</p></div><div class="flex justify-between items-end border-b border-white/5 pb-4" data-v-e6157125><p class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-e6157125> Encrypted Status </p><p class="text-xs font-medium text-emerald-400 tracking-widest" data-v-e6157125> AES-256 SECURE </p></div><div class="pt-2 text-center" data-v-e6157125><p class="text-[8px] text-slate-500 uppercase tracking-[0.3em]" data-v-e6157125> Balance Finance Archive © 2026 </p></div></div></div></div></div>`);
      } else {
        _push(`<div class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-white/30 backdrop-blur-sm" data-v-e6157125><div class="text-center max-w-sm" data-v-e6157125><h5 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-4" data-v-e6157125> Module Locked </h5><p class="text-sm text-slate-400 font-light leading-relaxed mb-8" data-v-e6157125> The interface for <span class="text-indigo-500 font-medium" data-v-e6157125>${ssrInterpolate(pageTitle.value)}</span> is currently under architectural review. </p><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity" data-v-e6157125> Return to Core </button></div></div>`);
      }
      _push(`</div></main>`);
      if (message.value) {
        _push(`<div class="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-white border border-slate-100 shadow-2xl rounded-2xl text-[10px] font-bold tracking-widest text-slate-900 uppercase z-50" data-v-e6157125>${ssrInterpolate(message.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wallet/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e6157125"]]);

export { index as default };
//# sourceMappingURL=index-CjLq6yFx.mjs.map
