import { u as useSidebarNavigation, _ as __nuxt_component_1, a as useAuthApi } from './useSidebarNavigation-C9KuT-FJ.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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
    const { deleteMyCategory, updateMyCategory } = useAuthApi();
    const { totalNetWorth: totalNetWorthFromAPI } = useTotalNetWorth();
    const wallets = [
      { id: 1, name: "Main Savings", balance: 12e4 },
      { id: 2, name: "Cash on Hand", balance: 2500 },
      { id: 3, name: "Investment Port", balance: 2e4 }
    ];
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
    const headerTotalNetWorth = computed(() => {
      const fallback = wallets.reduce((acc, curr) => acc + curr.balance, 0);
      return totalNetWorthFromAPI.value ?? fallback;
    });
    const categories = ref([]);
    const categoriesLoading = ref(false);
    const categoriesSaving = ref(false);
    const categoriesDeletingID = ref("");
    const categoriesError = ref("");
    const categoryEditOpen = ref(false);
    const editCategory = reactive({
      id: "",
      name: "",
      type: "expense",
      colorCode: "#0F172A"
    });
    const categoryConfirmOpen = ref(false);
    const categoryConfirmTitle = ref("Confirm Action");
    const categoryConfirmDescription = ref("");
    const categoryConfirmLabel = ref("Confirm");
    const categoryConfirmAction = ref("");
    const categoryPendingID = ref("");
    const categoryFilter = ref("all");
    const newCategory = reactive({
      name: "",
      type: "expense",
      colorCode: "#0F172A"
    });
    const categoryColorChoices = [
      "#0F172A",
      "#2563EB",
      "#7C3AED",
      "#EC4899",
      "#DC2626",
      "#EA580C",
      "#16A34A",
      "#0891B2"
    ];
    const filteredCategories = computed(() => {
      if (categoryFilter.value === "all") return categories.value;
      return categories.value.filter((c) => c.type === categoryFilter.value);
    });
    const normalizeCategoryError = (error) => {
      if (error instanceof Error && error.message.trim()) {
        return error.message;
      }
      return "category-request-failed";
    };
    const removeCategory = async (categoryID) => {
      if (!categoryID) {
        return;
      }
      categoriesDeletingID.value = categoryID;
      categoriesError.value = "";
      try {
        await deleteMyCategory(categoryID);
        categories.value = categories.value.filter((item) => item.id !== categoryID);
      } catch (error) {
        categoriesError.value = normalizeCategoryError(error);
      } finally {
        categoriesDeletingID.value = "";
      }
    };
    const cancelCategoryEdit = () => {
      categoryEditOpen.value = false;
      editCategory.id = "";
      editCategory.name = "";
      editCategory.type = "expense";
      editCategory.colorCode = "#0F172A";
    };
    const confirmCategoryAction = async () => {
      try {
        if (categoryConfirmAction.value === "delete" && categoryPendingID.value) {
          await removeCategory(categoryPendingID.value);
          categoryPendingID.value = "";
        }
        if (categoryConfirmAction.value === "update" && editCategory.id) {
          const res = await updateMyCategory(editCategory.id, {
            name: editCategory.name.trim(),
            type: editCategory.type,
            color_code: editCategory.colorCode
          });
          categories.value = categories.value.map(
            (item) => item.id === editCategory.id ? {
              id: res.data.id,
              name: res.data.name,
              type: res.data.type,
              colorCode: res.data.color_code || editCategory.colorCode
            } : item
          );
          cancelCategoryEdit();
        }
      } catch (error) {
        categoriesError.value = normalizeCategoryError(error);
      } finally {
        categoryConfirmOpen.value = false;
        categoryConfirmAction.value = "";
      }
    };
    const cancelCategoryConfirm = () => {
      categoryConfirmOpen.value = false;
      categoryConfirmAction.value = "";
      categoryPendingID.value = "";
    };
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
      const _component_AppConfirmModal = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden" }, _attrs))} data-v-01a845fa><div class="absolute inset-0 z-0 pointer-events-none" data-v-01a845fa><div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40" data-v-01a845fa></div></div>`);
      if (mobileSidebarOpen.value) {
        _push(`<div class="fixed inset-0 z-10 bg-slate-900/30 backdrop-blur-[1px] min-[1025px]:hidden" data-v-01a845fa></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "w-72 h-screen shrink-0 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-300 ease-out",
        "max-[1024px]:fixed max-[1024px]:inset-y-0 max-[1024px]:left-0 max-[1024px]:z-30 min-[1025px]:translate-x-0",
        mobileSidebarOpen.value ? "max-[1024px]:translate-x-0" : "max-[1024px]:-translate-x-full"
      ])}" data-v-01a845fa><div class="relative p-10" data-v-01a845fa><button class="inline-flex min-[1025px]:hidden absolute top-5 right-4 h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition" aria-label="Close sidebar" data-v-01a845fa><span class="text-base" data-v-01a845fa>×</span></button><h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1" data-v-01a845fa> Archive </h1><h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase" data-v-01a845fa> Balance </h2></div><nav class="flex-1 px-6 space-y-2 overflow-hidden" data-v-01a845fa><div class="space-y-1" data-v-01a845fa><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-01a845fa> Overview <span class="${ssrRenderClass([{ "rotate-180": unref(sections).overview }, "text-[9px] transition-transform duration-300"])}" data-v-01a845fa>▼</span></button><div class="${ssrRenderClass([
        unref(sections).overview ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-01a845fa><button class="${ssrRenderClass(navClass("dashboard"))}" data-v-01a845fa> Dashboard </button><button class="${ssrRenderClass(navClass("history"))}" data-v-01a845fa> Transaction Ledger </button></div></div><div class="space-y-1" data-v-01a845fa><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-01a845fa> Management <span class="${ssrRenderClass([{ "rotate-180": unref(sections).management }, "text-[9px] transition-transform duration-300"])}" data-v-01a845fa>▼</span></button><div class="${ssrRenderClass([
        unref(sections).management ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-01a845fa><button class="${ssrRenderClass(navClass("wallets"))}" data-v-01a845fa> Wallets </button><button class="${ssrRenderClass(navClass("categories"))}" data-v-01a845fa> Categories </button><button class="${ssrRenderClass(navClass("budgets"))}" data-v-01a845fa> Budgets </button></div></div><div class="space-y-1" data-v-01a845fa><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-01a845fa> Entry <span class="${ssrRenderClass([{ "rotate-180": unref(sections).actions }, "text-[9px] transition-transform duration-300"])}" data-v-01a845fa>▼</span></button><div class="${ssrRenderClass([
        unref(sections).actions ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-01a845fa><button class="${ssrRenderClass(navClass("record"))}" data-v-01a845fa> New Transaction </button></div></div><div class="space-y-1" data-v-01a845fa><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-01a845fa> System <span class="${ssrRenderClass([{ "rotate-180": unref(sections).system }, "text-[9px] transition-transform duration-300"])}" data-v-01a845fa>▼</span></button><div class="${ssrRenderClass([
        unref(sections).system ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-01a845fa><button class="${ssrRenderClass(navClass("profile"))}" data-v-01a845fa> Account Profile </button><button class="${ssrRenderClass(navClass("settings"))}" data-v-01a845fa> Settings </button></div></div></nav><div class="border-t border-slate-100 bg-slate-900 px-6 py-5 text-white" data-v-01a845fa><p class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1" data-v-01a845fa> Authenticated as </p><p class="text-sm font-semibold tracking-tight" data-v-01a845fa>${ssrInterpolate(unref(userDisplayName))}</p><button class="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition" data-v-01a845fa> Logout </button></div></aside><main class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1" data-v-01a845fa><header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between" data-v-01a845fa><div data-v-01a845fa><button class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600" data-v-01a845fa><span class="text-sm" data-v-01a845fa>☰</span> Menu </button><p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2" data-v-01a845fa>${ssrInterpolate(unref(currentPath))}</p><h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900" data-v-01a845fa>${ssrInterpolate(pageTitle.value)}</h3></div><div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6" data-v-01a845fa><div class="text-right" data-v-01a845fa><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-01a845fa> Total Net Worth </p><p class="text-2xl font-medium tracking-tight" data-v-01a845fa> ฿ ${ssrInterpolate(headerTotalNetWorth.value.toLocaleString(void 0, {
        minimumFractionDigits: 2
      }))}</p></div><button class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-01a845fa> Quick Entry </button></div></header><div class="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700" data-v-01a845fa>`);
      if (unref(currentPath) === "dashboard") {
        _push(`<div class="grid grid-cols-1 xl:grid-cols-3 items-start gap-10" data-v-01a845fa><div class="xl:col-span-2 min-w-0 space-y-10" data-v-01a845fa><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-01a845fa><div class="flex justify-between items-center mb-7" data-v-01a845fa><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-01a845fa> Monthly Performance </h4><div class="flex space-x-4" data-v-01a845fa><div class="flex items-center space-x-2" data-v-01a845fa><div class="w-2 h-2 rounded-full bg-indigo-500" data-v-01a845fa></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-01a845fa>Income</span></div><div class="flex items-center space-x-2" data-v-01a845fa><div class="w-2 h-2 rounded-full bg-slate-200" data-v-01a845fa></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-01a845fa>Expense</span></div></div></div><div class="h-56 flex items-end justify-between px-2 gap-4" data-v-01a845fa><!--[-->`);
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
          _push(`<div class="flex-1 group relative" data-v-01a845fa><div class="w-full bg-slate-50 rounded-t-xl transition-all group-hover:bg-indigo-50" style="${ssrRenderStyle({ height: h * 0.8 + "%" })}" data-v-01a845fa></div><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer" style="${ssrRenderStyle({ height: h * 0.5 + "%" })}" data-v-01a845fa></div></div>`);
        });
        _push(`<!--]--></div><div class="flex justify-between mt-6 px-2 text-[9px] text-slate-300 uppercase tracking-widest font-bold" data-v-01a845fa><span data-v-01a845fa>Jan</span><span data-v-01a845fa>Feb</span><span data-v-01a845fa>Mar</span><span data-v-01a845fa>Apr</span><span data-v-01a845fa>May</span><span data-v-01a845fa>Jun</span><span data-v-01a845fa>Jul</span><span data-v-01a845fa>Aug</span><span data-v-01a845fa>Sep</span><span data-v-01a845fa>Oct</span><span data-v-01a845fa>Nov</span><span data-v-01a845fa>Dec</span></div></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-01a845fa><div class="flex justify-between items-center mb-8" data-v-01a845fa><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-01a845fa> Recent Activity </h4><button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider hover:opacity-70 transition-opacity" data-v-01a845fa> View All Ledger </button></div><div class="space-y-6" data-v-01a845fa><!--[-->`);
        ssrRenderList(recentTransactionsSnapshot.value, (item) => {
          _push(`<div class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0" data-v-01a845fa><div class="flex items-center space-x-4" data-v-01a845fa><div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400" data-v-01a845fa>${ssrInterpolate(item.category.substring(0, 2).toUpperCase())}</div><div data-v-01a845fa><p class="text-sm font-medium text-slate-900" data-v-01a845fa>${ssrInterpolate(item.note || item.category)}</p><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-01a845fa>${ssrInterpolate(item.wallet)} • ${ssrInterpolate(item.date)}</p></div></div><p class="${ssrRenderClass([
            "text-sm font-semibold",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-01a845fa>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-8" data-v-01a845fa><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden" data-v-01a845fa><div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" data-v-01a845fa></div><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-01a845fa> Active Wallets </h4><div class="space-y-8" data-v-01a845fa><!--[-->`);
        ssrRenderList(wallets, (wallet) => {
          _push(`<div class="group cursor-pointer" data-v-01a845fa><div class="flex justify-between items-end mb-2" data-v-01a845fa><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-01a845fa>${ssrInterpolate(wallet.name)}</p><span class="text-[8px] text-slate-600 group-hover:text-indigo-400 transition-colors" data-v-01a845fa>DETAILS</span></div><p class="text-xl font-light tracking-tight" data-v-01a845fa> ฿ ${ssrInterpolate(wallet.balance.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div><button class="w-full mt-10 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all" data-v-01a845fa> Manage Assets </button></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-01a845fa><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-01a845fa> Budget Status </h4><div class="space-y-8" data-v-01a845fa><!--[-->`);
        ssrRenderList(activeBudgets, (budget) => {
          _push(`<div class="space-y-3" data-v-01a845fa><div class="flex justify-between text-[10px] uppercase tracking-widest" data-v-01a845fa><span class="font-bold text-slate-900" data-v-01a845fa>${ssrInterpolate(budget.category)}</span><span class="text-slate-400" data-v-01a845fa>${ssrInterpolate(budget.percent)}%</span></div><div class="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden" data-v-01a845fa><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.percent > 90 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({ width: budget.percent + "%" })}" data-v-01a845fa></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "history") {
        _push(`<div class="space-y-8" data-v-01a845fa><div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden" data-v-01a845fa><div class="p-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6" data-v-01a845fa><div class="flex space-x-8" data-v-01a845fa><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1" data-v-01a845fa> All Activity </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-01a845fa> Income </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-01a845fa> Expenses </button></div><div class="text-[10px] font-bold text-slate-300 uppercase tracking-widest" data-v-01a845fa> Displaying ${ssrInterpolate(startIndex.value + 1)}-${ssrInterpolate(Math.min(endIndex.value, totalTransactions.value))} of ${ssrInterpolate(totalTransactions.value)} Records </div></div><div class="divide-y divide-slate-50" data-v-01a845fa><!--[-->`);
        ssrRenderList(paginatedTransactions.value, (item) => {
          _push(`<div class="px-10 py-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center" data-v-01a845fa><div class="flex items-center space-x-6" data-v-01a845fa><div class="text-[10px] font-bold text-slate-300 uppercase tracking-tighter w-16" data-v-01a845fa>${ssrInterpolate(item.date.split(",")[0])}</div><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500" data-v-01a845fa>${ssrInterpolate(item.category.substring(0, 1).toUpperCase())}</div><div data-v-01a845fa><p class="text-sm font-medium text-slate-900" data-v-01a845fa>${ssrInterpolate(item.note || item.category)}</p><p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5" data-v-01a845fa>${ssrInterpolate(item.category)} • ${ssrInterpolate(item.wallet)}</p></div></div><div class="text-right" data-v-01a845fa><p class="${ssrRenderClass([
            "text-sm font-semibold tracking-tight",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-01a845fa>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><p class="text-[9px] text-slate-300 uppercase tracking-widest mt-1" data-v-01a845fa> Confirmed </p></div></div>`);
        });
        _push(`<!--]--></div><div class="p-10 border-t border-slate-50 flex justify-between items-center" data-v-01a845fa><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-01a845fa> Previous Archive </button><div class="flex items-center space-x-6" data-v-01a845fa><!--[-->`);
        ssrRenderList(totalPages.value, (page) => {
          _push(`<button class="${ssrRenderClass([
            "text-[10px] font-bold transition-all",
            currentPage.value === page ? "text-indigo-600 scale-125" : "text-slate-300 hover:text-slate-600"
          ])}" data-v-01a845fa>${ssrInterpolate(page.toString().padStart(2, "0"))}</button>`);
        });
        _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-01a845fa> Next Archive </button></div></div></div>`);
      } else if (unref(currentPath) === "categories") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-01a845fa><div class="space-y-8" data-v-01a845fa><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-01a845fa><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-01a845fa> Define New Taxonomy </h4><form class="space-y-6" data-v-01a845fa><div class="space-y-2" data-v-01a845fa><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-01a845fa>Label Name</label><input${ssrRenderAttr("value", newCategory.name)} type="text" placeholder="E.g. Digital Services" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-01a845fa></div><div class="space-y-2" data-v-01a845fa><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-01a845fa>Type Classification</label><div class="grid grid-cols-2 gap-4" data-v-01a845fa><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "income" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-01a845fa> Income </button><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "expense" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-01a845fa> Expense </button></div></div><div class="space-y-2" data-v-01a845fa><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-01a845fa>Category Color</label><div class="flex flex-wrap gap-3 px-1" data-v-01a845fa><!--[-->`);
        ssrRenderList(categoryColorChoices, (color) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "h-7 w-7 rounded-full border-2 transition-all",
            newCategory.colorCode === color ? "border-slate-900 scale-110" : "border-white"
          ])}" style="${ssrRenderStyle({ backgroundColor: color })}"${ssrRenderAttr("aria-label", `Select category color ${color}`)} data-v-01a845fa></button>`);
        });
        _push(`<!--]--></div></div><button type="submit"${ssrIncludeBooleanAttr(categoriesSaving.value || categoriesLoading.value) ? " disabled" : ""} class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4" data-v-01a845fa>${ssrInterpolate(categoriesSaving.value ? "Archiving..." : "Archive Asset")}</button></form></div><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl" data-v-01a845fa><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6" data-v-01a845fa> Taxonomy Stats </h4><div class="flex justify-between items-center" data-v-01a845fa><div data-v-01a845fa><p class="text-3xl font-light tracking-tighter" data-v-01a845fa>${ssrInterpolate(categories.value.length)}</p><p class="text-[9px] text-slate-500 uppercase tracking-widest mt-1" data-v-01a845fa> Total Classes </p></div><div class="text-right" data-v-01a845fa><p class="text-sm font-medium" data-v-01a845fa>${ssrInterpolate(categories.value.filter((c) => c.type === "expense").length)} Expenses </p><p class="text-sm font-medium" data-v-01a845fa>${ssrInterpolate(categories.value.filter((c) => c.type === "income").length)} Income </p></div></div></div></div><div class="space-y-8" data-v-01a845fa><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-01a845fa><div class="flex justify-between items-center mb-7" data-v-01a845fa><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-01a845fa> Existing Archive </h4><div class="flex space-x-4" data-v-01a845fa><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "all" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-01a845fa> All </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "income" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-01a845fa> Income </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "expense" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-01a845fa> Expense </button></div></div>`);
        if (categoriesLoading.value) {
          _push(`<p class="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400" data-v-01a845fa> Loading categories... </p>`);
        } else if (categoriesError.value) {
          _push(`<p class="mb-4 text-[10px] font-bold uppercase tracking-widest text-rose-500" data-v-01a845fa>${ssrInterpolate(categoriesError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (categoryEditOpen.value) {
          _push(`<div class="mb-6 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 space-y-4" data-v-01a845fa><div class="flex items-center justify-between" data-v-01a845fa><h5 class="text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-01a845fa> Edit Asset </h5><button type="button" class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900" data-v-01a845fa> Close </button></div><input${ssrRenderAttr("value", editCategory.name)} type="text" placeholder="Category name" class="w-full px-4 py-3 bg-white border border-transparent rounded-xl outline-none focus:border-slate-200 transition-all text-sm" data-v-01a845fa><div class="grid grid-cols-2 gap-3" data-v-01a845fa><button type="button" class="${ssrRenderClass([
            "py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
            editCategory.type === "income" ? "bg-slate-900 text-white" : "bg-white text-slate-500 hover:bg-slate-100"
          ])}" data-v-01a845fa> Income </button><button type="button" class="${ssrRenderClass([
            "py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
            editCategory.type === "expense" ? "bg-slate-900 text-white" : "bg-white text-slate-500 hover:bg-slate-100"
          ])}" data-v-01a845fa> Expense </button></div><div class="flex flex-wrap gap-3" data-v-01a845fa><!--[-->`);
          ssrRenderList(categoryColorChoices, (color) => {
            _push(`<button type="button" class="${ssrRenderClass([
              "h-7 w-7 rounded-full border-2 transition-all",
              editCategory.colorCode === color ? "border-slate-900 scale-110" : "border-white"
            ])}" style="${ssrRenderStyle({ backgroundColor: color })}"${ssrRenderAttr("aria-label", `Select color ${color}`)} data-v-01a845fa></button>`);
          });
          _push(`<!--]--></div><div class="flex justify-end gap-2" data-v-01a845fa><button type="button" class="px-4 py-2 rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-01a845fa> Cancel </button><button type="button" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest" data-v-01a845fa> Save Changes </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-4" data-v-01a845fa><!--[-->`);
        ssrRenderList(filteredCategories.value, (cat) => {
          _push(`<div class="group p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50 flex justify-between items-center" data-v-01a845fa><div class="flex items-center gap-3" data-v-01a845fa><div class="h-4 w-4 rounded-full ring-2 ring-white" style="${ssrRenderStyle({ backgroundColor: cat.colorCode })}" data-v-01a845fa></div><div data-v-01a845fa><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-01a845fa> Category </p><p class="text-base font-medium text-slate-900 tracking-tight" data-v-01a845fa>${ssrInterpolate(cat.name)}</p></div></div><div class="text-right" data-v-01a845fa><p class="text-lg font-light tracking-tighter text-slate-900 uppercase" data-v-01a845fa>${ssrInterpolate(cat.type)}</p><div class="mt-1 flex items-center justify-end gap-3 action-reveal" data-v-01a845fa><button type="button"${ssrIncludeBooleanAttr(categoriesDeletingID.value === cat.id || categoriesLoading.value) ? " disabled" : ""} class="text-[9px] font-bold text-slate-500 uppercase tracking-widest" data-v-01a845fa> Edit </button><button type="button"${ssrIncludeBooleanAttr(categoriesDeletingID.value === cat.id || categoriesLoading.value) ? " disabled" : ""} class="text-[9px] font-bold text-rose-500 uppercase tracking-widest" data-v-01a845fa>${ssrInterpolate(categoriesDeletingID.value === cat.id ? "Detaching..." : "Detach")}</button></div></div></div>`);
        });
        _push(`<!--]-->`);
        if (!categoriesLoading.value && !categoriesError.value && filteredCategories.value.length === 0) {
          _push(`<p class="text-sm text-slate-400" data-v-01a845fa> No categories found. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<div class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-white/30 backdrop-blur-sm" data-v-01a845fa><div class="text-center max-w-sm" data-v-01a845fa><h5 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-4" data-v-01a845fa> Module Locked </h5><p class="text-sm text-slate-400 font-light leading-relaxed mb-8" data-v-01a845fa> The interface for <span class="text-indigo-500 font-medium" data-v-01a845fa>${ssrInterpolate(pageTitle.value)}</span> is currently under architectural review. </p><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity" data-v-01a845fa> Return to Core </button></div></div>`);
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
        open: categoryConfirmOpen.value,
        title: categoryConfirmTitle.value,
        description: categoryConfirmDescription.value,
        "confirm-label": categoryConfirmLabel.value,
        "cancel-label": "Cancel",
        "onUpdate:open": cancelCategoryConfirm,
        onConfirm: confirmCategoryAction,
        onCancel: cancelCategoryConfirm
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categories/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-01a845fa"]]);

export { index as default };
//# sourceMappingURL=index-CXyq4edt.mjs.map
