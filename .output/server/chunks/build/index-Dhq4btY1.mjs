import { _ as __nuxt_component_0 } from './AppLoading-BXAO02Ye.mjs';
import { _ as __nuxt_component_1 } from './AppDropdown-CDiYrB_I.mjs';
import { u as useSidebarNavigation, _ as __nuxt_component_2, a as useAuthApi } from './useSidebarNavigation-DPx-aobW.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useTotalNetWorth } from './useTotalNetWorth-BWVTxd0T.mjs';
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
    const { createMyWallet, updateMyWallet, deleteMyWallet } = useAuthApi();
    const { totalNetWorth: totalNetWorthFromAPI } = useTotalNetWorth();
    const wallets = ref([]);
    const walletsLoading = ref(false);
    const walletSaving = ref(false);
    const walletDeletingID = ref("");
    const walletError = ref("");
    const walletConfirmOpen = ref(false);
    const walletConfirmTitle = ref("Confirm Action");
    const walletConfirmDescription = ref("");
    const walletConfirmLabel = ref("Confirm");
    const walletConfirmAction = ref("");
    const walletActionLoading = ref(false);
    const pendingWalletID = ref("");
    const walletEditOpen = ref(false);
    const editWallet = reactive({
      id: "",
      name: "",
      balance: 0,
      currency: "THB",
      colorCode: "#0F172A"
    });
    const newWallet = reactive({
      name: "",
      balance: 0,
      currency: "THB",
      colorCode: "#0F172A"
    });
    const totalNetWorth = computed(() => {
      return wallets.value.reduce((acc, curr) => acc + curr.balance, 0);
    });
    const headerTotalNetWorth = computed(() => {
      return totalNetWorthFromAPI.value ?? totalNetWorth.value;
    });
    const currencyDropdownItems = [
      { label: "THB - Thai Baht", value: "THB" },
      { label: "USD - US Dollar", value: "USD" }
    ];
    const walletColorChoices = [
      "#0F172A",
      "#2563EB",
      "#7C3AED",
      "#EC4899",
      "#DC2626",
      "#EA580C",
      "#16A34A",
      "#0891B2"
    ];
    const normalizeWalletError = (error) => {
      if (error instanceof Error && error.message.trim()) {
        return error.message;
      }
      return "wallet-request-failed";
    };
    const normalizeTwoDecimalAmount = (amount) => {
      return Math.round(amount * 100) / 100;
    };
    const addWallet = async () => {
      if (!newWallet.name) return;
      walletSaving.value = true;
      walletError.value = "";
      try {
        const res = await createMyWallet({
          name: newWallet.name.trim(),
          balance: normalizeTwoDecimalAmount(Number(newWallet.balance || 0)),
          currency: newWallet.currency || "THB",
          color_code: newWallet.colorCode
        });
        wallets.value.unshift({
          id: res.data.id,
          name: res.data.name,
          balance: Number(res.data.balance || 0),
          currency: res.data.currency || "THB",
          colorCode: res.data.color_code || newWallet.colorCode
        });
        newWallet.name = "";
        newWallet.balance = 0;
        newWallet.currency = "THB";
        newWallet.colorCode = "#0F172A";
      } catch (error) {
        walletError.value = normalizeWalletError(error);
      } finally {
        walletSaving.value = false;
      }
    };
    const cancelWalletEdit = () => {
      walletEditOpen.value = false;
      editWallet.id = "";
      editWallet.name = "";
      editWallet.balance = 0;
      editWallet.currency = "THB";
      editWallet.colorCode = "#0F172A";
    };
    const detachWallet = async (walletID) => {
      if (!walletID) {
        return;
      }
      walletDeletingID.value = walletID;
      walletError.value = "";
      try {
        await deleteMyWallet(walletID);
        wallets.value = wallets.value.filter((wallet) => wallet.id !== walletID);
      } catch (error) {
        walletError.value = normalizeWalletError(error);
      } finally {
        walletDeletingID.value = "";
      }
    };
    const confirmWalletAction = async () => {
      if (!walletConfirmAction.value) {
        walletConfirmOpen.value = false;
        return;
      }
      walletActionLoading.value = true;
      walletError.value = "";
      try {
        if (walletConfirmAction.value === "create") {
          await addWallet();
        }
        if (walletConfirmAction.value === "update" && editWallet.id) {
          const res = await updateMyWallet(editWallet.id, {
            name: editWallet.name.trim(),
            balance: normalizeTwoDecimalAmount(Number(editWallet.balance || 0)),
            currency: editWallet.currency || "THB",
            color_code: editWallet.colorCode
          });
          wallets.value = wallets.value.map(
            (wallet) => wallet.id === editWallet.id ? {
              id: res.data.id,
              name: res.data.name,
              balance: Number(res.data.balance || 0),
              currency: res.data.currency || "THB",
              colorCode: res.data.color_code || editWallet.colorCode
            } : wallet
          );
          cancelWalletEdit();
        }
        if (walletConfirmAction.value === "delete" && pendingWalletID.value) {
          await detachWallet(pendingWalletID.value);
          pendingWalletID.value = "";
        }
        walletConfirmOpen.value = false;
        walletConfirmAction.value = "";
      } catch (error) {
        walletError.value = normalizeWalletError(error);
      } finally {
        walletActionLoading.value = false;
      }
    };
    const cancelWalletConfirm = () => {
      if (walletActionLoading.value) {
        return;
      }
      walletConfirmOpen.value = false;
      walletConfirmAction.value = "";
      pendingWalletID.value = "";
    };
    const allTransactions = [
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
      },
      {
        id: 4,
        category: "Shopping",
        note: "Uniqlo Store",
        amount: 1290,
        type: "expense",
        wallet: "Savings",
        date: "21 Oct"
      },
      {
        id: 5,
        category: "Food & Drink",
        note: "Dinner at Shabu",
        amount: 850,
        type: "expense",
        wallet: "Cash",
        date: "20 Oct"
      },
      {
        id: 6,
        category: "Freelance",
        note: "Logo Design Project",
        amount: 5e3,
        type: "income",
        wallet: "Investment",
        date: "19 Oct"
      },
      {
        id: 7,
        category: "Bills",
        note: "Electric Bill",
        amount: 1850,
        type: "expense",
        wallet: "Savings",
        date: "18 Oct"
      },
      {
        id: 8,
        category: "Transport",
        note: "Fuel Refill",
        amount: 1200,
        type: "expense",
        wallet: "Cash",
        date: "17 Oct"
      },
      {
        id: 9,
        category: "Subscription",
        note: "Netflix Monthly",
        amount: 419,
        type: "expense",
        wallet: "Savings",
        date: "16 Oct"
      },
      {
        id: 10,
        category: "Food & Drink",
        note: "Lunch Box",
        amount: 65,
        type: "expense",
        wallet: "Cash",
        date: "15 Oct"
      },
      {
        id: 11,
        category: "Health",
        note: "Pharmacy",
        amount: 350,
        type: "expense",
        wallet: "Cash",
        date: "14 Oct"
      },
      {
        id: 12,
        category: "Salary",
        note: "Bonus Pay",
        amount: 15e3,
        type: "income",
        wallet: "Savings",
        date: "13 Oct"
      },
      {
        id: 13,
        category: "Shopping",
        note: "Amazon Purchase",
        amount: 2400,
        type: "expense",
        wallet: "Savings",
        date: "12 Oct"
      },
      {
        id: 14,
        category: "Entertainment",
        note: "Cinema Tickets",
        amount: 500,
        type: "expense",
        wallet: "Cash",
        date: "11 Oct"
      },
      {
        id: 15,
        category: "Investment",
        note: "Stock Dividend",
        amount: 1200,
        type: "income",
        wallet: "Investment",
        date: "10 Oct"
      }
    ];
    const recentTransactionsSnapshot = computed(() => allTransactions.slice(0, 3));
    const categories = ref([
      { id: 1, name: "Food & Drink", type: "expense" },
      { id: 2, name: "Salary", type: "income" },
      { id: 3, name: "Transport", type: "expense" },
      { id: 4, name: "Freelance", type: "income" },
      { id: 5, name: "Subscription", type: "expense" },
      { id: 6, name: "Health", type: "expense" }
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
    const currentPage = ref(1);
    const totalTransactions = computed(() => allTransactions.length);
    const totalPages = computed(
      () => Math.ceil(totalTransactions.value / itemsPerPage)
    );
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
    const endIndex = computed(() => startIndex.value + itemsPerPage);
    const paginatedTransactions = computed(() => {
      return allTransactions.slice(startIndex.value, endIndex.value);
    });
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
      const _component_AppLoading = __nuxt_component_0;
      const _component_AppDropdown = __nuxt_component_1;
      const _component_AppConfirmModal = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden" }, _attrs))} data-v-000dd56a><div class="absolute inset-0 z-0 pointer-events-none" data-v-000dd56a><div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40" data-v-000dd56a></div></div>`);
      if (mobileSidebarOpen.value) {
        _push(`<div class="fixed inset-0 z-10 bg-slate-900/30 backdrop-blur-[1px] min-[1025px]:hidden" data-v-000dd56a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "w-72 h-screen shrink-0 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-300 ease-out",
        "max-[1024px]:fixed max-[1024px]:inset-y-0 max-[1024px]:left-0 max-[1024px]:z-30 min-[1025px]:translate-x-0",
        mobileSidebarOpen.value ? "max-[1024px]:translate-x-0" : "max-[1024px]:-translate-x-full"
      ])}" data-v-000dd56a><div class="relative p-10" data-v-000dd56a><button class="inline-flex min-[1025px]:hidden absolute top-5 right-4 h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition" aria-label="Close sidebar" data-v-000dd56a><span class="text-base" data-v-000dd56a>×</span></button><h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1" data-v-000dd56a> Archive </h1><h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase" data-v-000dd56a> Balance </h2></div><nav class="flex-1 px-6 space-y-2 overflow-hidden" data-v-000dd56a><div class="space-y-1" data-v-000dd56a><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-000dd56a> Overview <span class="${ssrRenderClass([{ "rotate-180": unref(sections).overview }, "text-[9px] transition-transform duration-300"])}" data-v-000dd56a>▼</span></button><div class="${ssrRenderClass([
        unref(sections).overview ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-000dd56a><button class="${ssrRenderClass(navClass("dashboard"))}" data-v-000dd56a> Dashboard </button><button class="${ssrRenderClass(navClass("history"))}" data-v-000dd56a> Transaction Ledger </button></div></div><div class="space-y-1" data-v-000dd56a><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-000dd56a> Management <span class="${ssrRenderClass([{ "rotate-180": unref(sections).management }, "text-[9px] transition-transform duration-300"])}" data-v-000dd56a>▼</span></button><div class="${ssrRenderClass([
        unref(sections).management ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-000dd56a><button class="${ssrRenderClass(navClass("wallets"))}" data-v-000dd56a> Wallets </button><button class="${ssrRenderClass(navClass("categories"))}" data-v-000dd56a> Categories </button><button class="${ssrRenderClass(navClass("budgets"))}" data-v-000dd56a> Budgets </button></div></div><div class="space-y-1" data-v-000dd56a><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-000dd56a> Entry <span class="${ssrRenderClass([{ "rotate-180": unref(sections).actions }, "text-[9px] transition-transform duration-300"])}" data-v-000dd56a>▼</span></button><div class="${ssrRenderClass([
        unref(sections).actions ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-000dd56a><button class="${ssrRenderClass(navClass("record"))}" data-v-000dd56a> New Transaction </button></div></div><div class="space-y-1" data-v-000dd56a><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-000dd56a> System <span class="${ssrRenderClass([{ "rotate-180": unref(sections).system }, "text-[9px] transition-transform duration-300"])}" data-v-000dd56a>▼</span></button><div class="${ssrRenderClass([
        unref(sections).system ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-000dd56a><button class="${ssrRenderClass(navClass("profile"))}" data-v-000dd56a> Account Profile </button><button class="${ssrRenderClass(navClass("settings"))}" data-v-000dd56a> Settings </button></div></div></nav><div class="border-t border-slate-100 bg-slate-900 px-6 py-5 text-white" data-v-000dd56a><p class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1" data-v-000dd56a> Authenticated as </p><p class="text-sm font-semibold tracking-tight" data-v-000dd56a>${ssrInterpolate(unref(userDisplayName))}</p><button class="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition" data-v-000dd56a> Logout </button></div></aside><main class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1" data-v-000dd56a>`);
      if (walletsLoading.value) {
        _push(ssrRenderComponent(_component_AppLoading, {
          overlay: "",
          label: "Loading data..."
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between" data-v-000dd56a><div data-v-000dd56a><button class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600" data-v-000dd56a><span class="text-sm" data-v-000dd56a>☰</span> Menu </button><p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2" data-v-000dd56a>${ssrInterpolate(unref(currentPath))}</p><h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900" data-v-000dd56a>${ssrInterpolate(pageTitle.value)}</h3></div><div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6" data-v-000dd56a><div class="text-right" data-v-000dd56a><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-000dd56a> Total Net Worth </p><p class="text-2xl font-medium tracking-tight" data-v-000dd56a> ฿ ${ssrInterpolate(headerTotalNetWorth.value.toLocaleString(void 0, {
        minimumFractionDigits: 2
      }))}</p></div><button class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-000dd56a> Quick Entry </button></div></header><div class="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700" data-v-000dd56a>`);
      if (unref(currentPath) === "dashboard") {
        _push(`<div class="grid grid-cols-1 xl:grid-cols-3 items-start gap-10" data-v-000dd56a><div class="xl:col-span-2 min-w-0 space-y-10" data-v-000dd56a><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-000dd56a><div class="flex justify-between items-center mb-7" data-v-000dd56a><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-000dd56a> Monthly Performance </h4><div class="flex space-x-4" data-v-000dd56a><div class="flex items-center space-x-2" data-v-000dd56a><div class="w-2 h-2 rounded-full bg-indigo-500" data-v-000dd56a></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-000dd56a>Income</span></div><div class="flex items-center space-x-2" data-v-000dd56a><div class="w-2 h-2 rounded-full bg-slate-200" data-v-000dd56a></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-000dd56a>Expense</span></div></div></div><div class="h-56 flex items-end justify-between px-2 gap-4" data-v-000dd56a><!--[-->`);
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
          _push(`<div class="flex-1 group relative" data-v-000dd56a><div class="w-full bg-slate-50 rounded-t-xl transition-all group-hover:bg-indigo-50" style="${ssrRenderStyle({ height: h * 0.8 + "%" })}" data-v-000dd56a></div><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer" style="${ssrRenderStyle({ height: h * 0.5 + "%" })}" data-v-000dd56a></div></div>`);
        });
        _push(`<!--]--></div><div class="flex justify-between mt-6 px-2 text-[9px] text-slate-300 uppercase tracking-widest font-bold" data-v-000dd56a><span data-v-000dd56a>Jan</span><span data-v-000dd56a>Feb</span><span data-v-000dd56a>Mar</span><span data-v-000dd56a>Apr</span><span data-v-000dd56a>May</span><span data-v-000dd56a>Jun</span><span data-v-000dd56a>Jul</span><span data-v-000dd56a>Aug</span><span data-v-000dd56a>Sep</span><span data-v-000dd56a>Oct</span><span data-v-000dd56a>Nov</span><span data-v-000dd56a>Dec</span></div></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-000dd56a><div class="flex justify-between items-center mb-8" data-v-000dd56a><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-000dd56a> Recent Activity </h4><button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider hover:opacity-70 transition-opacity" data-v-000dd56a> View All Ledger </button></div><div class="space-y-6" data-v-000dd56a><!--[-->`);
        ssrRenderList(recentTransactionsSnapshot.value, (item) => {
          _push(`<div class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0" data-v-000dd56a><div class="flex items-center space-x-4" data-v-000dd56a><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400" data-v-000dd56a>${ssrInterpolate(item.category.substring(0, 2).toUpperCase())}</div><div data-v-000dd56a><p class="text-sm font-medium text-slate-900" data-v-000dd56a>${ssrInterpolate(item.note || item.category)}</p><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-000dd56a>${ssrInterpolate(item.wallet)} • ${ssrInterpolate(item.date)}</p></div></div><p class="${ssrRenderClass([
            "text-sm font-semibold",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-000dd56a>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-8" data-v-000dd56a><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden" data-v-000dd56a><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-000dd56a> Active Wallets </h4><div class="space-y-8" data-v-000dd56a><!--[-->`);
        ssrRenderList(wallets.value.slice(0, 3), (wallet) => {
          _push(`<div class="group cursor-pointer" data-v-000dd56a><div class="flex justify-between items-end mb-2" data-v-000dd56a><div class="flex items-center gap-2" data-v-000dd56a><div class="h-2.5 w-2.5 rounded-full" style="${ssrRenderStyle({ backgroundColor: wallet.colorCode })}" data-v-000dd56a></div><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-000dd56a>${ssrInterpolate(wallet.name)}</p></div><span class="text-[8px] text-slate-600 group-hover:text-indigo-400 transition-colors" data-v-000dd56a>DETAILS</span></div><p class="text-xl font-light tracking-tight" data-v-000dd56a> ฿ ${ssrInterpolate(wallet.balance.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div><button class="w-full mt-10 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all" data-v-000dd56a> Manage Assets </button></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-000dd56a><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-000dd56a> Budget Status </h4><div class="space-y-8" data-v-000dd56a><!--[-->`);
        ssrRenderList(activeBudgets, (budget) => {
          _push(`<div class="space-y-3" data-v-000dd56a><div class="flex justify-between text-[10px] uppercase tracking-widest" data-v-000dd56a><span class="font-bold text-slate-900" data-v-000dd56a>${ssrInterpolate(budget.category)}</span><span class="text-slate-400" data-v-000dd56a>${ssrInterpolate(budget.percent)}%</span></div><div class="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden" data-v-000dd56a><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.percent > 90 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({ width: budget.percent + "%" })}" data-v-000dd56a></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "wallets") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-000dd56a><div class="space-y-8" data-v-000dd56a><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-000dd56a><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-000dd56a> Register New Asset </h4><form class="space-y-6" data-v-000dd56a><div class="space-y-2" data-v-000dd56a><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-000dd56a>Asset Name</label><input${ssrRenderAttr("value", newWallet.name)} type="text" placeholder="E.g. Commercial Bank A" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-000dd56a></div><div class="space-y-2" data-v-000dd56a><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-000dd56a>Initial Balance</label><input${ssrRenderAttr("value", newWallet.balance)} type="number" placeholder="0.00" min="0" step="0.01" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-000dd56a></div><div class="space-y-2" data-v-000dd56a><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-000dd56a>Currency Code</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: newWallet.currency,
          "onUpdate:modelValue": ($event) => newWallet.currency = $event,
          label: "Select Currency",
          items: currencyDropdownItems,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-2" data-v-000dd56a><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-000dd56a>Wallet Color</label><div class="flex flex-wrap gap-3 px-1" data-v-000dd56a><!--[-->`);
        ssrRenderList(walletColorChoices, (color) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "h-8 w-8 rounded-full border-2 transition-all",
            newWallet.colorCode === color ? "border-slate-900 scale-110" : "border-white"
          ])}" style="${ssrRenderStyle({ backgroundColor: color })}"${ssrRenderAttr("aria-label", `Select wallet color ${color}`)} data-v-000dd56a></button>`);
        });
        _push(`<!--]--></div></div><button type="submit"${ssrIncludeBooleanAttr(walletSaving.value || walletsLoading.value) ? " disabled" : ""} class="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all mt-4 disabled:opacity-60 disabled:cursor-not-allowed" data-v-000dd56a>${ssrInterpolate(walletSaving.value ? "Archiving..." : "Archive Asset")}</button></form></div></div><div class="space-y-8" data-v-000dd56a><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-000dd56a><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-7" data-v-000dd56a> Asset Inventory </h4>`);
        if (walletsLoading.value) {
          _push(`<p class="mb-5 text-[10px] font-bold uppercase tracking-widest text-slate-400" data-v-000dd56a> Loading wallet archive... </p>`);
        } else if (walletError.value) {
          _push(`<p class="mb-5 text-[10px] font-bold uppercase tracking-widest text-rose-500" data-v-000dd56a>${ssrInterpolate(walletError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (walletEditOpen.value) {
          _push(`<div class="mb-6 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-6 space-y-4" data-v-000dd56a><div class="flex items-center justify-between" data-v-000dd56a><h5 class="text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-000dd56a> Edit Asset </h5><button type="button" class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900" data-v-000dd56a> Close </button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-000dd56a><input${ssrRenderAttr("value", editWallet.name)} type="text" placeholder="Asset Name" class="w-full px-4 py-3 bg-white border border-transparent rounded-xl outline-none focus:border-slate-200 transition-all text-sm" data-v-000dd56a><input${ssrRenderAttr("value", editWallet.balance)} type="number" placeholder="0.00" min="0" step="0.01" class="w-full px-4 py-3 bg-white border border-transparent rounded-xl outline-none focus:border-slate-200 transition-all text-sm" data-v-000dd56a></div>`);
          _push(ssrRenderComponent(_component_AppDropdown, {
            modelValue: editWallet.currency,
            "onUpdate:modelValue": ($event) => editWallet.currency = $event,
            label: "Select Currency",
            items: currencyDropdownItems,
            unstyled: "",
            "trigger-class": "w-full flex items-center justify-between px-4 py-3 bg-white border border-transparent rounded-xl outline-none focus-within:border-slate-200 transition-all text-sm",
            "menu-class": "w-full"
          }, null, _parent));
          _push(`<div class="flex flex-wrap gap-3" data-v-000dd56a><!--[-->`);
          ssrRenderList(walletColorChoices, (color) => {
            _push(`<button type="button" class="${ssrRenderClass([
              "h-7 w-7 rounded-full border-2 transition-all",
              editWallet.colorCode === color ? "border-slate-900 scale-110" : "border-white"
            ])}" style="${ssrRenderStyle({ backgroundColor: color })}"${ssrRenderAttr("aria-label", `Select wallet color ${color}`)} data-v-000dd56a></button>`);
          });
          _push(`<!--]--></div><div class="flex justify-end gap-2" data-v-000dd56a><button type="button" class="px-4 py-2 rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-000dd56a> Cancel </button><button type="button" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest" data-v-000dd56a> Save Changes </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-4" data-v-000dd56a><!--[-->`);
        ssrRenderList(wallets.value, (wallet) => {
          _push(`<div class="group p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50 flex justify-between items-center" data-v-000dd56a><div class="flex items-center gap-3" data-v-000dd56a><div class="h-4 w-4 rounded-full ring-2 ring-white" style="${ssrRenderStyle({ backgroundColor: wallet.colorCode })}" data-v-000dd56a></div><div data-v-000dd56a><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-000dd56a>${ssrInterpolate(wallet.currency)}</p><p class="text-base font-medium text-slate-900 tracking-tight" data-v-000dd56a>${ssrInterpolate(wallet.name)}</p></div></div><div class="text-right" data-v-000dd56a><p class="text-lg font-light tracking-tighter text-slate-900" data-v-000dd56a> ฿ ${ssrInterpolate(wallet.balance.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><div class="mt-1 flex items-center justify-end gap-3 action-reveal" data-v-000dd56a><button${ssrIncludeBooleanAttr(walletDeletingID.value === wallet.id || walletsLoading.value) ? " disabled" : ""} class="text-[9px] font-bold text-slate-500 uppercase tracking-widest" data-v-000dd56a> Edit </button><button${ssrIncludeBooleanAttr(walletDeletingID.value === wallet.id || walletsLoading.value) ? " disabled" : ""} class="text-[9px] font-bold text-rose-500 uppercase tracking-widest" data-v-000dd56a>${ssrInterpolate(walletDeletingID.value === wallet.id ? "Detaching..." : "Detach")}</button></div></div></div>`);
        });
        _push(`<!--]-->`);
        if (!walletsLoading.value && !walletError.value && wallets.value.length === 0) {
          _push(`<p class="text-sm text-slate-400" data-v-000dd56a> No wallets found. Create your first wallet. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      } else if (unref(currentPath) === "history") {
        _push(`<div class="space-y-8" data-v-000dd56a><div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden" data-v-000dd56a><div class="p-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6" data-v-000dd56a><div class="flex space-x-8" data-v-000dd56a><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1" data-v-000dd56a> All Activity </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-000dd56a> Income </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-000dd56a> Expenses </button></div><div class="text-[10px] font-bold text-slate-300 uppercase tracking-widest" data-v-000dd56a> Displaying ${ssrInterpolate(startIndex.value + 1)}-${ssrInterpolate(Math.min(endIndex.value, totalTransactions.value))} of ${ssrInterpolate(totalTransactions.value)} Records </div></div><div class="divide-y divide-slate-50" data-v-000dd56a><!--[-->`);
        ssrRenderList(paginatedTransactions.value, (item) => {
          _push(`<div class="px-10 py-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center" data-v-000dd56a><div class="flex items-center space-x-6" data-v-000dd56a><div class="text-[10px] font-bold text-slate-300 uppercase tracking-tighter w-16" data-v-000dd56a>${ssrInterpolate(item.date.split(",")[0])}</div><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500" data-v-000dd56a>${ssrInterpolate(item.category.substring(0, 1).toUpperCase())}</div><div data-v-000dd56a><p class="text-sm font-medium text-slate-900" data-v-000dd56a>${ssrInterpolate(item.note || item.category)}</p><p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5" data-v-000dd56a>${ssrInterpolate(item.category)} • ${ssrInterpolate(item.wallet)}</p></div></div><div class="text-right" data-v-000dd56a><p class="${ssrRenderClass([
            "text-sm font-semibold tracking-tight",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-000dd56a>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><p class="text-[9px] text-slate-300 uppercase tracking-widest mt-1" data-v-000dd56a> Confirmed </p></div></div>`);
        });
        _push(`<!--]--></div><div class="p-10 border-t border-slate-50 flex justify-between items-center" data-v-000dd56a><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-000dd56a> Previous Archive </button><div class="flex items-center space-x-6" data-v-000dd56a><!--[-->`);
        ssrRenderList(totalPages.value, (page) => {
          _push(`<button class="${ssrRenderClass([
            "text-[10px] font-bold transition-all",
            currentPage.value === page ? "text-indigo-600 scale-125" : "text-slate-300 hover:text-slate-600"
          ])}" data-v-000dd56a>${ssrInterpolate(page.toString().padStart(2, "0"))}</button>`);
        });
        _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-000dd56a> Next Archive </button></div></div></div>`);
      } else if (unref(currentPath) === "categories") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-000dd56a><div class="space-y-8" data-v-000dd56a><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-000dd56a><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-000dd56a> Define New Taxonomy </h4><form class="space-y-6" data-v-000dd56a><div class="space-y-2" data-v-000dd56a><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-000dd56a>Label Name</label><input${ssrRenderAttr("value", newCategory.name)} type="text" placeholder="E.g. Digital Services" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-000dd56a></div><div class="space-y-2" data-v-000dd56a><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-000dd56a>Type Classification</label><div class="grid grid-cols-2 gap-4" data-v-000dd56a><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "income" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-000dd56a> Income </button><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "expense" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-000dd56a> Expense </button></div></div><button type="submit" class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4" data-v-000dd56a> Add Classification </button></form></div><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl" data-v-000dd56a><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6" data-v-000dd56a> Taxonomy Stats </h4><div class="flex justify-between items-center" data-v-000dd56a><div data-v-000dd56a><p class="text-3xl font-light tracking-tighter" data-v-000dd56a>${ssrInterpolate(categories.value.length)}</p><p class="text-[9px] text-slate-500 uppercase tracking-widest mt-1" data-v-000dd56a> Total Classes </p></div><div class="text-right" data-v-000dd56a><p class="text-sm font-medium" data-v-000dd56a>${ssrInterpolate(categories.value.filter((c) => c.type === "expense").length)} Expenses </p><p class="text-sm font-medium" data-v-000dd56a>${ssrInterpolate(categories.value.filter((c) => c.type === "income").length)} Income </p></div></div></div></div><div class="space-y-8" data-v-000dd56a><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-000dd56a><div class="flex justify-between items-center mb-7" data-v-000dd56a><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-000dd56a> Existing Archive </h4><div class="flex space-x-4" data-v-000dd56a><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "all" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-000dd56a> All </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "income" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-000dd56a> Income </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "expense" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-000dd56a> Expense </button></div></div><div class="space-y-4" data-v-000dd56a><!--[-->`);
        ssrRenderList(filteredCategories.value, (cat) => {
          _push(`<div class="group flex justify-between items-center p-6 bg-slate-50 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50" data-v-000dd56a><div class="flex items-center space-x-4" data-v-000dd56a><div class="${ssrRenderClass([
            "w-2 h-2 rounded-full",
            cat.type === "income" ? "bg-emerald-400" : "bg-rose-400"
          ])}" data-v-000dd56a></div><span class="text-sm font-medium text-slate-700 tracking-tight" data-v-000dd56a>${ssrInterpolate(cat.name)}</span></div><button class="text-[9px] font-bold text-slate-300 uppercase tracking-widest action-reveal hover:text-rose-500 transition-all" data-v-000dd56a> Remove </button></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<div class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-white/30 backdrop-blur-sm" data-v-000dd56a><div class="text-center max-w-sm" data-v-000dd56a><h5 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-4" data-v-000dd56a> Module Locked </h5><p class="text-sm text-slate-400 font-light leading-relaxed mb-8" data-v-000dd56a> The interface for <span class="text-indigo-500 font-medium" data-v-000dd56a>${ssrInterpolate(pageTitle.value)}</span> is currently under architectural review. </p><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity" data-v-000dd56a> Return to Core </button></div></div>`);
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
        open: walletConfirmOpen.value,
        title: walletConfirmTitle.value,
        description: walletConfirmDescription.value,
        "confirm-label": walletActionLoading.value ? "Processing..." : walletConfirmLabel.value,
        "cancel-label": "Cancel",
        "onUpdate:open": cancelWalletConfirm,
        onConfirm: confirmWalletAction,
        onCancel: cancelWalletConfirm
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wallet/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-000dd56a"]]);

export { index as default };
//# sourceMappingURL=index-Dhq4btY1.mjs.map
