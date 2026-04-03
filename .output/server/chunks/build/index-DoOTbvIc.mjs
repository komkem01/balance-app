import { _ as __nuxt_component_0 } from './AppLoading-BXAO02Ye.mjs';
import { _ as __nuxt_component_1 } from './AppDropdown-CDiYrB_I.mjs';
import { defineComponent, ref, reactive, computed, watch, resolveComponent, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_2$1 } from './AppConfirmModal-CcVxxKSv.mjs';
import { u as useAuthApi } from './useAuthApi-BJft6TAV.mjs';
import { u as useTotalNetWorth } from './useTotalNetWorth-qMHMuHwQ.mjs';
import { u as useSidebarNavigation } from './useSidebarNavigation-DyztVcBr.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppFileInput",
  __ssrInlineRender: true,
  props: {
    legend: { default: "Pick a file" },
    helperText: { default: "Max size 10MB" },
    name: { default: "file" },
    accept: { default: "" },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    maxSizeMB: { default: 10 },
    invalidSizeMessage: { default: "" },
    chooseFileText: { default: "Choose file" },
    noFileSelectedText: { default: "No file selected" },
    containerClass: { default: "" },
    triggerClass: { default: "" },
    fileNameClass: { default: "" },
    fieldsetClass: { default: "" }
  },
  emits: ["change", "invalid"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref(null);
    const errorMessage = ref("");
    const selectedFiles = ref([]);
    const inputId = `app-file-input-${Math.random().toString(36).slice(2, 10)}`;
    const selectedFileLabel = computed(() => {
      if (selectedFiles.value.length === 0) {
        return props.noFileSelectedText;
      }
      if (selectedFiles.value.length === 1) {
        return selectedFiles.value[0]?.name || props.noFileSelectedText;
      }
      return `${selectedFiles.value.length} files selected`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<fieldset${ssrRenderAttrs(mergeProps({
        class: ["fieldset", __props.fieldsetClass]
      }, _attrs))}>`);
      if (__props.legend) {
        _push(`<legend class="fieldset-legend text-sm font-medium tracking-tight text-slate-700">${ssrInterpolate(__props.legend)}</legend>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("id", inputId)} type="file"${ssrRenderAttr("name", __props.name)}${ssrRenderAttr("accept", __props.accept)}${ssrIncludeBooleanAttr(__props.multiple) ? " multiple" : ""}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="sr-only"><div class="${ssrRenderClass([
        "flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3",
        __props.containerClass
      ])}"><button type="button"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="${ssrRenderClass([
        "inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60",
        __props.triggerClass
      ])}">${ssrInterpolate(__props.chooseFileText)}</button><p class="${ssrRenderClass(["truncate text-sm text-slate-600", __props.fileNameClass])}">${ssrInterpolate(selectedFileLabel.value)}</p></div>`);
      if (__props.helperText) {
        _push(`<label class="label text-xs text-slate-500">${ssrInterpolate(__props.helperText)}</label>`);
      } else {
        _push(`<!---->`);
      }
      if (errorMessage.value) {
        _push(`<label class="label text-xs text-red-500">${ssrInterpolate(errorMessage.value)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</fieldset>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFileInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "AppFileInput" });
const TOAST_DURATION_MS = 2200;
const itemsPerPage = 6;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileSidebarOpen = ref(false);
    const { currentPath, sections, logoutConfirmOpen, confirmLogout, cancelLogout, userDisplayName } = useSidebarNavigation({
      mobileMaxWidth: 1024
    });
    const { uploadMyTransactionSlip, getMyTransactionSlip } = useAuthApi();
    const { totalNetWorth: totalNetWorthFromAPI } = useTotalNetWorth();
    const loading = ref(false);
    const message = ref("");
    let messageTimer = null;
    const pageLoading = ref(false);
    const datePickerOpen = ref(false);
    ref(null);
    const confirmModalOpen = ref(false);
    const confirmTitle = ref("Confirm Action");
    const confirmDescription = ref("");
    const confirmActionLabel = ref("Confirm");
    const wallets = ref([]);
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
    const normalizeErrorMessage = (error) => {
      if (error instanceof Error && error.message.trim()) {
        return error.message;
      }
      return "request-failed";
    };
    const walletDropdownItems = computed(
      () => wallets.value.map((w) => ({
        label: `${w.name} (฿${w.balance.toLocaleString(void 0, { minimumFractionDigits: 2 })})`,
        value: w.id
      }))
    );
    const currencyDropdownItems = [
      { label: "THB - Thai Baht", value: "THB" },
      { label: "USD - US Dollar", value: "USD" }
    ];
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
    const recordCategoryDropdownItems = computed(
      () => categories.value.filter((cat) => cat.type === newRecord.type).map((cat) => ({ label: cat.name, value: cat.id }))
    );
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
    const budgetCategoryDropdownItems = computed(
      () => categories.value.filter((c) => c.type === "expense").map((cat) => ({ label: cat.name, value: cat.id }))
    );
    const allTransactions = ref([]);
    const recentTransactionsSnapshot = computed(
      () => allTransactions.value.slice(0, 3)
    );
    const slipDisplayURLMap = ref({});
    const resolvedSlipTransactionMap = ref({});
    const getTransactionSlipSrc = (item) => {
      return slipDisplayURLMap.value[item.id] || item.image_url || "";
    };
    const newRecord = reactive({
      type: "expense",
      amount: null,
      wallet_id: "",
      category_id: "",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      note: ""
    });
    const attachedSlipFile = ref(null);
    const slipPreviewUrl = ref("");
    const uploadedSlipURL = ref("");
    const slipUploadLoading = ref(false);
    const revokeSlipPreviewURL = () => {
      if (slipPreviewUrl.value.startsWith("blob:")) {
        URL.revokeObjectURL(slipPreviewUrl.value);
      }
    };
    const clearSlipFile = () => {
      revokeSlipPreviewURL();
      slipPreviewUrl.value = "";
      uploadedSlipURL.value = "";
      attachedSlipFile.value = null;
    };
    const onSlipFileChange = async (files) => {
      const file = files?.[0] ?? null;
      if (!file) {
        clearSlipFile();
        return;
      }
      if (!newRecord.wallet_id) {
        clearSlipFile();
        message.value = "Please select a wallet before uploading a slip.";
        return;
      }
      revokeSlipPreviewURL();
      attachedSlipFile.value = file;
      slipPreviewUrl.value = URL.createObjectURL(file);
      slipUploadLoading.value = true;
      uploadedSlipURL.value = "";
      try {
        const res = await uploadMyTransactionSlip(newRecord.wallet_id, file);
        uploadedSlipURL.value = res.data.image_url || "";
        const displayURL = res.data.display_image_url || res.data.image_url || "";
        if (displayURL) {
          revokeSlipPreviewURL();
          slipPreviewUrl.value = displayURL;
        }
      } catch (error) {
        clearSlipFile();
        message.value = normalizeErrorMessage(error);
      } finally {
        slipUploadLoading.value = false;
      }
    };
    const onSlipInvalid = (invalidMessage) => {
      clearSlipFile();
      message.value = invalidMessage;
    };
    const onCalendarDateChange = (event) => {
      const target = event.target;
      if (target?.value) {
        newRecord.date = target.value;
        datePickerOpen.value = false;
      }
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
    const calendarButtonLabel = computed(() => {
      if (!newRecord.date) {
        return "เลือกวันที่";
      }
      return formatDateDisplay(newRecord.date);
    });
    watch(message, (value) => {
      if (messageTimer) {
        clearTimeout(messageTimer);
        messageTimer = null;
      }
      if (!value) {
        return;
      }
      messageTimer = setTimeout(() => {
        message.value = "";
        messageTimer = null;
      }, TOAST_DURATION_MS);
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
    const visibleSlipTransactionIDs = computed(() => {
      const ids = /* @__PURE__ */ new Set();
      for (const item of recentTransactionsSnapshot.value) {
        if (item.image_url) {
          ids.add(item.id);
        }
      }
      for (const item of paginatedTransactions.value) {
        if (item.image_url) {
          ids.add(item.id);
        }
      }
      return Array.from(ids);
    });
    watch(
      visibleSlipTransactionIDs,
      async (transactionIDs) => {
        const pending = transactionIDs.filter((transactionID) => !resolvedSlipTransactionMap.value[transactionID]);
        if (!pending.length) {
          return;
        }
        for (const transactionID of pending) {
          resolvedSlipTransactionMap.value[transactionID] = true;
        }
        await Promise.all(
          pending.map(async (transactionID) => {
            try {
              const res = await getMyTransactionSlip(transactionID);
              const displayURL = res.data.display_image_url || res.data.image_url || "";
              if (displayURL) {
                slipDisplayURLMap.value[transactionID] = displayURL;
              }
            } catch {
            }
          })
        );
      },
      { immediate: true }
    );
    const activeBudgets = computed(() => {
      return budgets.value.map((b) => ({
        id: b.id,
        category: getCategoryName(b.category_id),
        percent: b.amount > 0 ? Math.min(Math.round(b.spent / b.amount * 100), 100) : 0
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
      const _component_AppLoading = __nuxt_component_0;
      const _component_AppDropdown = __nuxt_component_1;
      const _component_calendar_date = resolveComponent("calendar-date");
      const _component_calendar_month = resolveComponent("calendar-month");
      const _component_AppFileInput = __nuxt_component_2;
      const _component_AppConfirmModal = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden" }, _attrs))} data-v-571feedc><div class="absolute inset-0 z-0 pointer-events-none" data-v-571feedc><div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40" data-v-571feedc></div></div>`);
      if (mobileSidebarOpen.value) {
        _push(`<div class="fixed inset-0 z-10 bg-slate-900/30 backdrop-blur-[1px] min-[1025px]:hidden" data-v-571feedc></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "w-72 h-screen shrink-0 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-300 ease-out",
        "max-[1024px]:fixed max-[1024px]:inset-y-0 max-[1024px]:left-0 max-[1024px]:z-30 min-[1025px]:translate-x-0",
        mobileSidebarOpen.value ? "max-[1024px]:translate-x-0" : "max-[1024px]:-translate-x-full"
      ])}" data-v-571feedc><div class="relative p-10" data-v-571feedc><button class="inline-flex min-[1025px]:hidden absolute top-5 right-4 h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition" aria-label="Close sidebar" data-v-571feedc><span class="text-base" data-v-571feedc>×</span></button><h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1" data-v-571feedc> Archive </h1><h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase" data-v-571feedc> Balance </h2></div><nav class="flex-1 px-6 space-y-2 overflow-hidden" data-v-571feedc><div class="space-y-1" data-v-571feedc><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-571feedc> Overview <span class="${ssrRenderClass([{ "rotate-180": unref(sections).overview }, "text-[9px] transition-transform duration-300"])}" data-v-571feedc>▼</span></button><div class="${ssrRenderClass([
        unref(sections).overview ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-571feedc><button class="${ssrRenderClass(navClass("dashboard"))}" data-v-571feedc> Dashboard </button><button class="${ssrRenderClass(navClass("history"))}" data-v-571feedc> Transaction Ledger </button></div></div><div class="space-y-1" data-v-571feedc><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-571feedc> Management <span class="${ssrRenderClass([{ "rotate-180": unref(sections).management }, "text-[9px] transition-transform duration-300"])}" data-v-571feedc>▼</span></button><div class="${ssrRenderClass([
        unref(sections).management ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-571feedc><button class="${ssrRenderClass(navClass("wallets"))}" data-v-571feedc> Wallets </button><button class="${ssrRenderClass(navClass("categories"))}" data-v-571feedc> Categories </button><button class="${ssrRenderClass(navClass("budgets"))}" data-v-571feedc> Budgets </button></div></div><div class="space-y-1" data-v-571feedc><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-571feedc> Entry <span class="${ssrRenderClass([{ "rotate-180": unref(sections).actions }, "text-[9px] transition-transform duration-300"])}" data-v-571feedc>▼</span></button><div class="${ssrRenderClass([
        unref(sections).actions ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-571feedc><button class="${ssrRenderClass(navClass("record"))}" data-v-571feedc> New Transaction </button></div></div><div class="space-y-1" data-v-571feedc><button class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors" data-v-571feedc> System <span class="${ssrRenderClass([{ "rotate-180": unref(sections).system }, "text-[9px] transition-transform duration-300"])}" data-v-571feedc>▼</span></button><div class="${ssrRenderClass([
        unref(sections).system ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none",
        "overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100"
      ])}" data-v-571feedc><button class="${ssrRenderClass(navClass("profile"))}" data-v-571feedc> Account Profile </button><button class="${ssrRenderClass(navClass("settings"))}" data-v-571feedc> Settings </button></div></div></nav><div class="border-t border-slate-100 bg-slate-900 px-6 py-5 text-white" data-v-571feedc><p class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1" data-v-571feedc> Authenticated as </p><p class="text-sm font-semibold tracking-tight" data-v-571feedc>${ssrInterpolate(unref(userDisplayName))}</p><button class="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition" data-v-571feedc> Logout </button></div></aside><main class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1" data-v-571feedc>`);
      if (pageLoading.value) {
        _push(ssrRenderComponent(_component_AppLoading, {
          overlay: "",
          label: "Loading data..."
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between" data-v-571feedc><div data-v-571feedc><button class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600" data-v-571feedc><span class="text-sm" data-v-571feedc>☰</span> Menu </button><p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2" data-v-571feedc>${ssrInterpolate(unref(currentPath))}</p><h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900" data-v-571feedc>${ssrInterpolate(pageTitle.value)}</h3></div><div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6" data-v-571feedc><div class="text-right" data-v-571feedc><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-571feedc> Total Net Worth </p><p class="text-2xl font-medium tracking-tight" data-v-571feedc> ฿ ${ssrInterpolate(headerTotalNetWorth.value.toLocaleString(void 0, {
        minimumFractionDigits: 2
      }))}</p></div>`);
      if (unref(currentPath) !== "record") {
        _push(`<button class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all" data-v-571feedc> Quick Entry </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><div class="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700" data-v-571feedc>`);
      if (unref(currentPath) === "dashboard") {
        _push(`<div class="grid grid-cols-1 xl:grid-cols-3 items-start gap-10" data-v-571feedc><div class="xl:col-span-2 min-w-0 space-y-10" data-v-571feedc><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-571feedc><div class="flex justify-between items-center mb-7" data-v-571feedc><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-571feedc> Monthly Performance </h4><div class="flex space-x-4" data-v-571feedc><div class="flex items-center space-x-2" data-v-571feedc><div class="w-2 h-2 rounded-full bg-indigo-500" data-v-571feedc></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-571feedc>Income</span></div><div class="flex items-center space-x-2" data-v-571feedc><div class="w-2 h-2 rounded-full bg-slate-200" data-v-571feedc></div><span class="text-[9px] text-slate-400 uppercase tracking-widest" data-v-571feedc>Expense</span></div></div></div><div class="h-56 flex items-end justify-between px-2 gap-4" data-v-571feedc><!--[-->`);
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
          _push(`<div class="flex-1 group relative" data-v-571feedc><div class="w-full bg-slate-50 rounded-t-xl transition-all group-hover:bg-indigo-50" style="${ssrRenderStyle({ height: h * 0.8 + "%" })}" data-v-571feedc></div><div class="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer" style="${ssrRenderStyle({ height: h * 0.5 + "%" })}" data-v-571feedc></div></div>`);
        });
        _push(`<!--]--></div><div class="flex justify-between mt-6 px-2 text-[9px] text-slate-300 uppercase tracking-widest font-bold" data-v-571feedc><span data-v-571feedc>Jan</span><span data-v-571feedc>Feb</span><span data-v-571feedc>Mar</span><span data-v-571feedc>Apr</span><span data-v-571feedc>May</span><span data-v-571feedc>Jun</span><span data-v-571feedc>Jul</span><span data-v-571feedc>Aug</span><span data-v-571feedc>Sep</span><span data-v-571feedc>Oct</span><span data-v-571feedc>Nov</span><span data-v-571feedc>Dec</span></div></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-571feedc><div class="flex justify-between items-center mb-8" data-v-571feedc><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-571feedc> Recent Activity </h4><button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider hover:opacity-70 transition-opacity" data-v-571feedc> View All Ledger </button></div><div class="space-y-6" data-v-571feedc><!--[-->`);
        ssrRenderList(recentTransactionsSnapshot.value, (item) => {
          _push(`<div class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0" data-v-571feedc><div class="flex items-center space-x-4" data-v-571feedc><div class="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-[10px] font-bold text-slate-400" data-v-571feedc>`);
          if (getTransactionSlipSrc(item)) {
            _push(`<img${ssrRenderAttr("src", getTransactionSlipSrc(item))} alt="Transaction slip" class="w-full h-full object-cover" loading="lazy" data-v-571feedc>`);
          } else {
            _push(`<span data-v-571feedc>${ssrInterpolate(item.category.substring(0, 2).toUpperCase())}</span>`);
          }
          _push(`</div><div data-v-571feedc><p class="text-sm font-medium text-slate-900" data-v-571feedc>${ssrInterpolate(item.note || item.category)}</p><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-571feedc>${ssrInterpolate(item.wallet)} • ${ssrInterpolate(item.date)}</p></div></div><p class="${ssrRenderClass([
            "text-sm font-semibold",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-571feedc>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-8" data-v-571feedc><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden" data-v-571feedc><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8" data-v-571feedc> Active Wallets </h4><div class="space-y-8" data-v-571feedc><!--[-->`);
        ssrRenderList(wallets.value.slice(0, 3), (wallet) => {
          _push(`<div class="group cursor-pointer" data-v-571feedc><div class="flex justify-between items-end mb-2" data-v-571feedc><p class="text-[10px] text-slate-400 uppercase tracking-widest" data-v-571feedc>${ssrInterpolate(wallet.name)}</p><span class="text-[8px] text-slate-600 group-hover:text-indigo-400 transition-colors" data-v-571feedc>DETAILS</span></div><p class="text-xl font-light tracking-tight" data-v-571feedc> ฿ ${ssrInterpolate(wallet.balance.toLocaleString())}</p></div>`);
        });
        _push(`<!--]--></div><button class="w-full mt-10 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all" data-v-571feedc> Manage Assets </button></div><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-571feedc><h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-571feedc> Budget Status </h4><div class="space-y-8" data-v-571feedc><!--[-->`);
        ssrRenderList(activeBudgets.value, (budget) => {
          _push(`<div class="space-y-3" data-v-571feedc><div class="flex justify-between text-[10px] uppercase tracking-widest" data-v-571feedc><span class="font-bold text-slate-900" data-v-571feedc>${ssrInterpolate(budget.category)}</span><span class="text-slate-400" data-v-571feedc>${ssrInterpolate(budget.percent)}%</span></div><div class="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden" data-v-571feedc><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.percent > 90 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({ width: budget.percent + "%" })}" data-v-571feedc></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "record") {
        _push(`<div class="max-w-3xl mx-auto space-y-8" data-v-571feedc><div class="bg-white p-12 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm relative" data-v-571feedc><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 text-center" data-v-571feedc> Execute New Transaction </h4><form class="space-y-10" data-v-571feedc><div class="flex p-1.5 bg-slate-50 rounded-[2rem] max-w-sm mx-auto" data-v-571feedc><button type="button" class="${ssrRenderClass([
          "flex-1 py-4 rounded-[1.8rem] text-[10px] font-bold uppercase tracking-widest transition-all",
          newRecord.type === "expense" ? "bg-white shadow-sm text-rose-500" : "text-slate-400 hover:text-slate-600"
        ])}" data-v-571feedc> Expense </button><button type="button" class="${ssrRenderClass([
          "flex-1 py-4 rounded-[1.8rem] text-[10px] font-bold uppercase tracking-widest transition-all",
          newRecord.type === "income" ? "bg-white shadow-sm text-emerald-500" : "text-slate-400 hover:text-slate-600"
        ])}" data-v-571feedc> Income </button></div><div class="text-center space-y-4" data-v-571feedc><label class="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]" data-v-571feedc>Monetary Value</label><div class="flex items-center justify-center space-x-4" data-v-571feedc><span class="text-2xl font-light text-slate-300" data-v-571feedc>฿</span><input${ssrRenderAttr("value", newRecord.amount)} type="number" step="0.01" placeholder="0.00" class="bg-transparent text-6xl font-light tracking-tighter text-slate-900 focus:outline-none w-full max-w-xs text-center" required data-v-571feedc></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-10" data-v-571feedc><div class="space-y-3" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Archive Source (Wallet)</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: newRecord.wallet_id,
          "onUpdate:modelValue": ($event) => newRecord.wallet_id = $event,
          label: "Select Wallet",
          items: walletDropdownItems.value,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-3" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Taxonomy (Category)</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: newRecord.category_id,
          "onUpdate:modelValue": ($event) => newRecord.category_id = $event,
          label: "Select Category",
          items: recordCategoryDropdownItems.value,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-3" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Transaction Date</label><div class="relative" data-v-571feedc><button type="button" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-8 py-5 text-left text-sm font-medium text-slate-700 transition hover:bg-white" data-v-571feedc>${ssrInterpolate(calendarButtonLabel.value)}</button>`);
        if (datePickerOpen.value) {
          _push(`<div class="absolute bottom-full left-0 z-50 mb-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl" data-v-571feedc>`);
          _push(ssrRenderComponent(_component_calendar_date, {
            class: "cally block rounded-xl border border-slate-200 bg-slate-50 p-2",
            value: newRecord.date,
            onChange: onCalendarDateChange
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg aria-label="Previous" class="size-4 fill-current text-slate-500" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-571feedc${_scopeId}><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" data-v-571feedc${_scopeId}></path></svg><svg aria-label="Next" class="size-4 fill-current text-slate-500" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-v-571feedc${_scopeId}><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" data-v-571feedc${_scopeId}></path></svg>`);
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
        _push(`</div><input${ssrRenderAttr("value", newRecord.date)} type="date" class="sr-only" required data-v-571feedc></div><div class="space-y-3" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Identifier (Note)</label><input${ssrRenderAttr("value", newRecord.note)} type="text" placeholder="Brief description..." class="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" data-v-571feedc></div><div class="space-y-4 md:col-span-2" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Slip Attachment (Optional)</label><div class="rounded-3xl border border-slate-100 bg-slate-50/80 p-6" data-v-571feedc>`);
        _push(ssrRenderComponent(_component_AppFileInput, {
          legend: "Attach payment slip",
          "helper-text": "Image only (JPG, PNG, WEBP) - Max size 10MB",
          accept: "image/png,image/jpeg,image/webp",
          "invalid-size-message": "Slip image must be 10MB or less.",
          disabled: !newRecord.wallet_id || slipUploadLoading.value,
          "max-size-m-b": 10,
          "fieldset-class": "space-y-2",
          "container-class": "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3",
          "file-name-class": "text-slate-700",
          onChange: onSlipFileChange,
          onInvalid: onSlipInvalid
        }, null, _parent));
        if (slipUploadLoading.value) {
          _push(`<p class="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-571feedc> Uploading slip... </p>`);
        } else {
          _push(`<!---->`);
        }
        if (slipPreviewUrl.value) {
          _push(`<div class="mt-4" data-v-571feedc><div class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white" data-v-571feedc><img${ssrRenderAttr("src", slipPreviewUrl.value)} alt="Slip preview" class="h-52 w-full object-cover" data-v-571feedc><button type="button" class="absolute right-3 top-3 inline-flex items-center rounded-xl bg-slate-900/90 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-900" data-v-571feedc> Remove </button></div><p class="mt-2 text-[10px] uppercase tracking-widest text-slate-400" data-v-571feedc>${ssrInterpolate(attachedSlipFile.value?.name)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="pt-6" data-v-571feedc><button type="submit"${ssrIncludeBooleanAttr(loading.value || slipUploadLoading.value) ? " disabled" : ""} class="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-xs font-bold uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center" data-v-571feedc>`);
        if (!loading.value && !slipUploadLoading.value) {
          _push(`<span data-v-571feedc>Confirm Transaction</span>`);
        } else {
          _push(`<div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" data-v-571feedc></div>`);
        }
        _push(`</button></div></form></div></div>`);
      } else if (unref(currentPath) === "wallets") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-571feedc><div class="space-y-8" data-v-571feedc><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-571feedc><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-571feedc> Register New Asset </h4><form class="space-y-6" data-v-571feedc><div class="space-y-2" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Asset Name</label><input${ssrRenderAttr("value", newWallet.name)} type="text" placeholder="E.g. Commercial Bank A" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-571feedc></div><div class="space-y-2" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Initial Balance</label><input${ssrRenderAttr("value", newWallet.balance)} type="number" placeholder="0.00" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-571feedc></div><div class="space-y-2" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Currency Code</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: newWallet.currency,
          "onUpdate:modelValue": ($event) => newWallet.currency = $event,
          label: "Select Currency",
          items: currencyDropdownItems,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><button type="submit" class="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all mt-4" data-v-571feedc> Archive Asset </button></form></div></div><div class="space-y-8" data-v-571feedc><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-571feedc><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-7" data-v-571feedc> Asset Inventory </h4><div class="space-y-4" data-v-571feedc><!--[-->`);
        ssrRenderList(wallets.value, (wallet) => {
          _push(`<div class="group p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50 flex justify-between items-center" data-v-571feedc><div data-v-571feedc><p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1" data-v-571feedc>${ssrInterpolate(wallet.currency)}</p><p class="text-base font-medium text-slate-900 tracking-tight" data-v-571feedc>${ssrInterpolate(wallet.name)}</p></div><div class="text-right" data-v-571feedc><p class="text-lg font-light tracking-tighter text-slate-900" data-v-571feedc> ฿ ${ssrInterpolate(wallet.balance.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><button class="text-[9px] font-bold text-rose-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all mt-1" data-v-571feedc> Detach </button></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "history") {
        _push(`<div class="space-y-8" data-v-571feedc><div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden" data-v-571feedc><div class="p-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6" data-v-571feedc><div class="flex space-x-8" data-v-571feedc><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1" data-v-571feedc> All Activity </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-571feedc> Income </button><button class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1" data-v-571feedc> Expenses </button></div><div class="text-[10px] font-bold text-slate-300 uppercase tracking-widest" data-v-571feedc> Displaying ${ssrInterpolate(startIndex.value + 1)}-${ssrInterpolate(Math.min(endIndex.value, totalTransactions.value))} of ${ssrInterpolate(totalTransactions.value)} Records </div></div><div class="divide-y divide-slate-50" data-v-571feedc><!--[-->`);
        ssrRenderList(paginatedTransactions.value, (item) => {
          _push(`<div class="px-10 py-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center" data-v-571feedc><div class="flex items-center space-x-6" data-v-571feedc><div class="text-[10px] font-bold text-slate-300 uppercase tracking-tighter w-16" data-v-571feedc>${ssrInterpolate(item.date.split(",")[0])}</div><div class="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-[10px] font-bold text-slate-500" data-v-571feedc>`);
          if (getTransactionSlipSrc(item)) {
            _push(`<img${ssrRenderAttr("src", getTransactionSlipSrc(item))} alt="Transaction slip" class="w-full h-full object-cover" loading="lazy" data-v-571feedc>`);
          } else {
            _push(`<span data-v-571feedc>${ssrInterpolate(item.category.substring(0, 1).toUpperCase())}</span>`);
          }
          _push(`</div><div data-v-571feedc><p class="text-sm font-medium text-slate-900" data-v-571feedc>${ssrInterpolate(item.note || item.category)}</p><p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5" data-v-571feedc>${ssrInterpolate(item.category)} • ${ssrInterpolate(item.wallet)}</p></div></div><div class="text-right" data-v-571feedc><p class="${ssrRenderClass([
            "text-sm font-semibold tracking-tight",
            item.type === "expense" ? "text-rose-500" : "text-emerald-500"
          ])}" data-v-571feedc>${ssrInterpolate(item.type === "expense" ? "-" : "+")} ${ssrInterpolate(item.amount.toLocaleString(void 0, {
            minimumFractionDigits: 2
          }))}</p><p class="text-[9px] text-slate-300 uppercase tracking-widest mt-1" data-v-571feedc> Confirmed </p></div></div>`);
        });
        _push(`<!--]--></div><div class="p-10 border-t border-slate-50 flex justify-between items-center" data-v-571feedc><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-571feedc> Previous Archive </button><div class="flex items-center space-x-6" data-v-571feedc><!--[-->`);
        ssrRenderList(totalPages.value, (page) => {
          _push(`<button class="${ssrRenderClass([
            "text-[10px] font-bold transition-all",
            currentPage.value === page ? "text-indigo-600 scale-125" : "text-slate-300 hover:text-slate-600"
          ])}" data-v-571feedc>${ssrInterpolate(page.toString().padStart(2, "0"))}</button>`);
        });
        _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors" data-v-571feedc> Next Archive </button></div></div></div>`);
      } else if (unref(currentPath) === "categories") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-571feedc><div class="space-y-8" data-v-571feedc><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-571feedc><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-571feedc> Define New Taxonomy </h4><form class="space-y-6" data-v-571feedc><div class="space-y-2" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Label Name</label><input${ssrRenderAttr("value", newCategory.name)} type="text" placeholder="E.g. Digital Services" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-571feedc></div><div class="space-y-2" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Type Classification</label><div class="grid grid-cols-2 gap-4" data-v-571feedc><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "income" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-571feedc> Income </button><button type="button" class="${ssrRenderClass([
          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all",
          newCategory.type === "expense" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
        ])}" data-v-571feedc> Expense </button></div></div><button type="submit" class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4" data-v-571feedc> Add Classification </button></form></div><div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl" data-v-571feedc><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6" data-v-571feedc> Taxonomy Stats </h4><div class="flex justify-between items-center" data-v-571feedc><div data-v-571feedc><p class="text-3xl font-light tracking-tighter" data-v-571feedc>${ssrInterpolate(categories.value.length)}</p><p class="text-[9px] text-slate-500 uppercase tracking-widest mt-1" data-v-571feedc> Total Classes </p></div><div class="text-right" data-v-571feedc><p class="text-sm font-medium" data-v-571feedc>${ssrInterpolate(categories.value.filter((c) => c.type === "expense").length)} Expenses </p><p class="text-sm font-medium" data-v-571feedc>${ssrInterpolate(categories.value.filter((c) => c.type === "income").length)} Income </p></div></div></div></div><div class="space-y-8" data-v-571feedc><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-571feedc><div class="flex justify-between items-center mb-7" data-v-571feedc><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-571feedc> Existing Archive </h4><div class="flex space-x-4" data-v-571feedc><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "all" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-571feedc> All </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "income" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-571feedc> Income </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          categoryFilter.value === "expense" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-571feedc> Expense </button></div></div><div class="space-y-4" data-v-571feedc><!--[-->`);
        ssrRenderList(filteredCategories.value, (cat) => {
          _push(`<div class="group flex justify-between items-center p-6 bg-slate-50 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50" data-v-571feedc><div class="flex items-center space-x-4" data-v-571feedc><div class="${ssrRenderClass([
            "w-2 h-2 rounded-full",
            cat.type === "income" ? "bg-emerald-400" : "bg-rose-400"
          ])}" data-v-571feedc></div><span class="text-sm font-medium text-slate-700 tracking-tight" data-v-571feedc>${ssrInterpolate(cat.name)}</span></div><button class="text-[9px] font-bold text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all" data-v-571feedc> Remove </button></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else if (unref(currentPath) === "budgets") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-571feedc><div class="space-y-8" data-v-571feedc><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm" data-v-571feedc><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8" data-v-571feedc> Set Spending Constraint </h4><form class="space-y-6" data-v-571feedc><div class="space-y-2" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Target Taxonomy</label>`);
        _push(ssrRenderComponent(_component_AppDropdown, {
          modelValue: newBudget.category_id,
          "onUpdate:modelValue": ($event) => newBudget.category_id = $event,
          label: "Select Category",
          items: budgetCategoryDropdownItems.value,
          unstyled: "",
          "trigger-class": "w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm",
          "menu-class": "w-full"
        }, null, _parent));
        _push(`</div><div class="space-y-2" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Allocated Amount</label><input${ssrRenderAttr("value", newBudget.amount)} type="number" placeholder="0.00" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm" required data-v-571feedc></div><div class="space-y-2" data-v-571feedc><label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1" data-v-571feedc>Time Period</label><div class="grid grid-cols-3 gap-4" data-v-571feedc><!--[-->`);
        ssrRenderList(["daily", "weekly", "monthly"], (p) => {
          _push(`<button type="button" class="${ssrRenderClass([
            "py-4 rounded-2xl text-[9px] font-bold uppercase tracking-widest transition-all",
            newBudget.period === p ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
          ])}" data-v-571feedc>${ssrInterpolate(p)}</button>`);
        });
        _push(`<!--]--></div></div><button type="submit" class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4" data-v-571feedc> Archive Budget </button></form></div></div><div class="space-y-8" data-v-571feedc><div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]" data-v-571feedc><div class="flex justify-between items-center mb-7" data-v-571feedc><h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest" data-v-571feedc> Active Constraints </h4><div class="flex space-x-4" data-v-571feedc><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          budgetPeriodFilter.value === "all" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-571feedc> All </button><button class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all",
          budgetPeriodFilter.value === "monthly" ? "text-slate-900 border-slate-900" : "text-slate-300 border-transparent"
        ])}" data-v-571feedc> Monthly </button></div></div><div class="space-y-8" data-v-571feedc><!--[-->`);
        ssrRenderList(filteredBudgets.value, (budget) => {
          _push(`<div class="space-y-4 group" data-v-571feedc><div class="flex justify-between items-end px-1" data-v-571feedc><div data-v-571feedc><p class="text-base font-medium text-slate-900 tracking-tight" data-v-571feedc>${ssrInterpolate(getCategoryName(budget.category_id))}</p><p class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5" data-v-571feedc>${ssrInterpolate(budget.period)} Constraint </p></div><div class="text-right" data-v-571feedc><p class="text-sm font-semibold tracking-tight text-slate-900" data-v-571feedc> ฿ ${ssrInterpolate(budget.spent.toLocaleString())} / ${ssrInterpolate(budget.amount.toLocaleString())}</p><p class="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5" data-v-571feedc>${ssrInterpolate(Math.round(budget.spent / budget.amount * 100))}% Used </p></div></div><div class="w-full bg-slate-50 h-2 rounded-full overflow-hidden" data-v-571feedc><div class="${ssrRenderClass([
            "h-full transition-all duration-1000",
            budget.spent / budget.amount > 0.9 ? "bg-rose-500" : "bg-slate-900"
          ])}" style="${ssrRenderStyle({
            width: Math.min(budget.spent / budget.amount, 1) * 100 + "%"
          })}" data-v-571feedc></div></div><div class="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity" data-v-571feedc><button class="text-[9px] font-bold text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors" data-v-571feedc> Terminate </button></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<div class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-white/30 backdrop-blur-sm" data-v-571feedc><div class="text-center max-w-sm" data-v-571feedc><h5 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-4" data-v-571feedc> Module Locked </h5><p class="text-sm text-slate-400 font-light leading-relaxed mb-8" data-v-571feedc> The interface for <span class="text-indigo-500 font-medium" data-v-571feedc>${ssrInterpolate(pageTitle.value)}</span> is currently under architectural review. </p><button class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity" data-v-571feedc> Return to Core </button></div></div>`);
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
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4" data-v-571feedc><div class="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl" data-v-571feedc><h4 class="text-sm font-bold uppercase tracking-widest text-slate-900" data-v-571feedc>${ssrInterpolate(confirmTitle.value)}</h4><p class="mt-3 text-sm leading-relaxed text-slate-500" data-v-571feedc>${ssrInterpolate(confirmDescription.value)}</p><div class="mt-8 flex justify-end gap-3" data-v-571feedc><button class="rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50" data-v-571feedc> Cancel </button><button class="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800" data-v-571feedc>${ssrInterpolate(confirmActionLabel.value)}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (message.value) {
        _push(`<div class="fixed top-6 right-6 px-8 py-4 bg-white border border-slate-100 shadow-2xl rounded-2xl text-[10px] font-bold tracking-widest text-slate-900 uppercase z-50" data-v-571feedc>${ssrInterpolate(message.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/new-entry/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-571feedc"]]);

export { index as default };
//# sourceMappingURL=index-DoOTbvIc.mjs.map
