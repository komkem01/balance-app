import { _ as __nuxt_component_0 } from './AppLoading-BXAO02Ye.mjs';
import { _ as __nuxt_component_2 } from './AppConfirmModal-CcVxxKSv.mjs';
import { defineComponent, ref, reactive, computed, watch, unref, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useAuthApi } from './useAuthApi-BJft6TAV.mjs';
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
    const route = useRoute();
    const router = useRouter();
    const api = useAuthApi();
    const loading = ref(true);
    const errorMessage = ref("");
    const actionError = ref("");
    const actionLoading = ref(false);
    const editMode = ref(false);
    const deleteConfirmOpen = ref(false);
    const toastMessage = ref("");
    const transaction = ref(null);
    const wallets = ref([]);
    const categories = ref([]);
    const slipDisplayURL = ref("");
    const editForm = reactive({
      wallet_id: "",
      category_id: "",
      amount: 0,
      type: "expense",
      transaction_date: "",
      note: ""
    });
    computed(() => {
      const id = route.params.id;
      if (Array.isArray(id)) {
        return id[0] || "";
      }
      return String(id || "").trim();
    });
    const moneyFormatter = new Intl.NumberFormat(void 0, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
    const formatDateTime = (value) => {
      if (!value) {
        return "-";
      }
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) {
        return value;
      }
      return dateTimeFormatter.format(parsed);
    };
    const walletName = computed(() => {
      var _a;
      const walletID = (_a = transaction.value) == null ? void 0 : _a.wallet_id;
      if (!walletID) {
        return "Unknown Wallet";
      }
      const item = wallets.value.find((wallet) => wallet.id === walletID);
      return (item == null ? void 0 : item.name) || "Unknown Wallet";
    });
    const categoryName = computed(() => {
      var _a;
      const categoryID = (_a = transaction.value) == null ? void 0 : _a.category_id;
      if (!categoryID) {
        return "Uncategorized";
      }
      const item = categories.value.find((category) => category.id === categoryID);
      return (item == null ? void 0 : item.name) || "Uncategorized";
    });
    const displayedSlipURL = computed(() => {
      var _a;
      return slipDisplayURL.value || ((_a = transaction.value) == null ? void 0 : _a.image_url) || "";
    });
    let toastTimer = null;
    const showToast = (message, duration = 1800) => {
      toastMessage.value = message;
      if (toastTimer) {
        clearTimeout(toastTimer);
      }
      toastTimer = setTimeout(() => {
        toastMessage.value = "";
        toastTimer = null;
      }, duration);
    };
    const editCategoryOptions = computed(() => {
      return categories.value.filter((item) => item.type === editForm.type);
    });
    const cancelDeleteTransaction = () => {
      deleteConfirmOpen.value = false;
    };
    const confirmDeleteTransaction = async () => {
      if (!transaction.value) {
        deleteConfirmOpen.value = false;
        return;
      }
      actionLoading.value = true;
      actionError.value = "";
      try {
        await api.deleteMyTransaction(transaction.value.id);
        deleteConfirmOpen.value = false;
        showToast("Deleted successfully");
        await new Promise((resolve) => {
          setTimeout(resolve, 700);
        });
        void router.push("/transaction-ledger");
      } catch (error) {
        actionError.value = error instanceof Error ? error.message : "transaction-delete-failed";
      } finally {
        actionLoading.value = false;
      }
    };
    watch(
      () => editForm.type,
      () => {
        var _a;
        if (!editForm.category_id) {
          return;
        }
        const exists = editCategoryOptions.value.some((category) => category.id === editForm.category_id);
        if (!exists) {
          editForm.category_id = ((_a = editCategoryOptions.value[0]) == null ? void 0 : _a.id) || "";
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLoading = __nuxt_component_0;
      const _component_AppConfirmModal = __nuxt_component_2;
      _push(`<!--[--><div class="relative min-h-screen overflow-hidden bg-slate-50 p-6 text-slate-900 md:p-10" data-v-6da3770d><div class="pointer-events-none absolute inset-0 z-0" data-v-6da3770d><div class="mesh-gradient absolute inset-0 opacity-40" data-v-6da3770d></div></div><main class="relative z-10 mx-auto max-w-5xl space-y-6" data-v-6da3770d><div class="flex flex-wrap items-center justify-between gap-4" data-v-6da3770d><div data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400" data-v-6da3770d>Transaction Detail</p><h1 class="text-3xl font-light tracking-tight text-slate-900" data-v-6da3770d>Ledger Item</h1></div><div class="flex flex-wrap items-center gap-2" data-v-6da3770d><button type="button" class="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-700 transition hover:border-slate-400 hover:text-slate-900" data-v-6da3770d> Edit This Transaction </button><button type="button" class="inline-flex items-center rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-rose-700 transition hover:border-rose-400 hover:bg-rose-100" data-v-6da3770d> Delete This Transaction </button><button type="button" class="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-600 transition hover:border-slate-300 hover:text-slate-900" data-v-6da3770d> Back to Ledger </button></div></div>`);
      if (actionError.value) {
        _push(`<p class="text-sm font-semibold text-rose-600" data-v-6da3770d>${ssrInterpolate(actionError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(ssrRenderComponent(_component_AppLoading, {
          overlay: "",
          label: "Loading transaction detail..."
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && errorMessage.value) {
        _push(`<div class="rounded-3xl border border-rose-200 bg-rose-50 p-6" data-v-6da3770d><p class="text-sm font-semibold text-rose-700" data-v-6da3770d>${ssrInterpolate(errorMessage.value)}</p><button type="button" class="mt-4 inline-flex items-center rounded-xl bg-rose-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700" data-v-6da3770d> Retry </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && transaction.value) {
        _push(`<section class="grid gap-6 lg:grid-cols-[1.6fr_1fr]" data-v-6da3770d>`);
        if (editMode.value) {
          _push(`<article class="rounded-[2rem] border border-amber-100 bg-amber-50/60 p-6 shadow-sm lg:col-span-2" data-v-6da3770d><h2 class="text-sm font-bold uppercase tracking-widest text-amber-900" data-v-6da3770d>Edit Transaction</h2><div class="mt-5 grid gap-4 md:grid-cols-2" data-v-6da3770d><div class="space-y-2" data-v-6da3770d><label class="text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-6da3770d>Type</label><select class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" data-v-6da3770d><option value="expense" data-v-6da3770d${ssrIncludeBooleanAttr(Array.isArray(editForm.type) ? ssrLooseContain(editForm.type, "expense") : ssrLooseEqual(editForm.type, "expense")) ? " selected" : ""}>Expense</option><option value="income" data-v-6da3770d${ssrIncludeBooleanAttr(Array.isArray(editForm.type) ? ssrLooseContain(editForm.type, "income") : ssrLooseEqual(editForm.type, "income")) ? " selected" : ""}>Income</option></select></div><div class="space-y-2" data-v-6da3770d><label class="text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-6da3770d>Amount</label><input${ssrRenderAttr("value", editForm.amount)} type="number" step="0.01" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" data-v-6da3770d></div><div class="space-y-2" data-v-6da3770d><label class="text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-6da3770d>Wallet</label><select class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" data-v-6da3770d><option value="" disabled data-v-6da3770d${ssrIncludeBooleanAttr(Array.isArray(editForm.wallet_id) ? ssrLooseContain(editForm.wallet_id, "") : ssrLooseEqual(editForm.wallet_id, "")) ? " selected" : ""}>Select wallet</option><!--[-->`);
          ssrRenderList(wallets.value, (wallet) => {
            _push(`<option${ssrRenderAttr("value", wallet.id)} data-v-6da3770d${ssrIncludeBooleanAttr(Array.isArray(editForm.wallet_id) ? ssrLooseContain(editForm.wallet_id, wallet.id) : ssrLooseEqual(editForm.wallet_id, wallet.id)) ? " selected" : ""}>${ssrInterpolate(wallet.name)}</option>`);
          });
          _push(`<!--]--></select></div><div class="space-y-2" data-v-6da3770d><label class="text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-6da3770d>Category</label><select class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" data-v-6da3770d><option value="" disabled data-v-6da3770d${ssrIncludeBooleanAttr(Array.isArray(editForm.category_id) ? ssrLooseContain(editForm.category_id, "") : ssrLooseEqual(editForm.category_id, "")) ? " selected" : ""}>Select category</option><!--[-->`);
          ssrRenderList(editCategoryOptions.value, (category) => {
            _push(`<option${ssrRenderAttr("value", category.id)} data-v-6da3770d${ssrIncludeBooleanAttr(Array.isArray(editForm.category_id) ? ssrLooseContain(editForm.category_id, category.id) : ssrLooseEqual(editForm.category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
          });
          _push(`<!--]--></select></div><div class="space-y-2" data-v-6da3770d><label class="text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-6da3770d>Transaction Date</label><input${ssrRenderAttr("value", editForm.transaction_date)} type="date" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" data-v-6da3770d></div><div class="space-y-2 md:col-span-2" data-v-6da3770d><label class="text-[10px] font-bold uppercase tracking-widest text-slate-500" data-v-6da3770d>Note</label><textarea rows="3" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" data-v-6da3770d>${ssrInterpolate(editForm.note)}</textarea></div></div><div class="mt-5 flex items-center justify-end gap-3" data-v-6da3770d><button type="button" class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600" data-v-6da3770d>Cancel</button><button type="button" class="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white disabled:opacity-50"${ssrIncludeBooleanAttr(actionLoading.value) ? " disabled" : ""} data-v-6da3770d>${ssrInterpolate(actionLoading.value ? "Saving..." : "Save Changes")}</button></div></article>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<article class="rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-sm backdrop-blur-xl" data-v-6da3770d><div class="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6" data-v-6da3770d><div data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400" data-v-6da3770d>Transaction Overview</p><p class="mt-2 text-sm text-slate-600" data-v-6da3770d>Summary of this record</p></div><span class="${ssrRenderClass([
          "rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest",
          transaction.value.type === "expense" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
        ])}" data-v-6da3770d>${ssrInterpolate(transaction.value.type)}</span></div><div class="mt-6 grid gap-5 sm:grid-cols-2" data-v-6da3770d><div data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400" data-v-6da3770d>Amount</p><p class="${ssrRenderClass([transaction.value.type === "expense" ? "text-rose-600" : "text-emerald-600", "mt-2 text-3xl font-semibold tracking-tight"])}" data-v-6da3770d>${ssrInterpolate(transaction.value.type === "expense" ? "-" : "+")} ${ssrInterpolate(unref(moneyFormatter).format(Number(transaction.value.amount || 0)))}</p></div><div data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400" data-v-6da3770d>Wallet</p><p class="mt-2 text-base font-medium text-slate-900" data-v-6da3770d>${ssrInterpolate(walletName.value)}</p></div><div data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400" data-v-6da3770d>Category</p><p class="mt-2 text-base font-medium text-slate-900" data-v-6da3770d>${ssrInterpolate(categoryName.value)}</p></div><div data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400" data-v-6da3770d>Transaction Date</p><p class="mt-2 text-base font-medium text-slate-900" data-v-6da3770d>${ssrInterpolate(formatDateTime(transaction.value.transaction_date))}</p></div><div data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400" data-v-6da3770d>Created At</p><p class="mt-2 text-base font-medium text-slate-900" data-v-6da3770d>${ssrInterpolate(formatDateTime(transaction.value.created_at))}</p></div><div data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400" data-v-6da3770d>Updated At</p><p class="mt-2 text-base font-medium text-slate-900" data-v-6da3770d>${ssrInterpolate(formatDateTime(transaction.value.updated_at))}</p></div></div><div class="mt-7 border-t border-slate-100 pt-6" data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400" data-v-6da3770d>Note</p><p class="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700" data-v-6da3770d>${ssrInterpolate(transaction.value.note || "-")}</p></div></article><aside class="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl" data-v-6da3770d><p class="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400" data-v-6da3770d>Slip Attachment</p>`);
        if (displayedSlipURL.value) {
          _push(`<div class="mt-4 space-y-4" data-v-6da3770d><img${ssrRenderAttr("src", displayedSlipURL.value)} alt="Transaction slip" class="h-72 w-full rounded-2xl border border-slate-100 object-cover" loading="lazy" data-v-6da3770d><a${ssrRenderAttr("href", displayedSlipURL.value)} target="_blank" rel="noreferrer" class="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 transition hover:border-slate-400 hover:text-slate-900" data-v-6da3770d> Open Original </a></div>`);
        } else {
          _push(`<div class="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center" data-v-6da3770d><p class="text-sm font-medium text-slate-500" data-v-6da3770d>No slip uploaded for this transaction.</p></div>`);
        }
        _push(`</aside></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
      if (toastMessage.value) {
        _push(`<div class="fixed right-6 top-6 z-50 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 shadow-lg" data-v-6da3770d>${ssrInterpolate(toastMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_AppConfirmModal, {
        open: deleteConfirmOpen.value,
        title: "Confirm Delete",
        description: "Delete this transaction permanently?",
        "confirm-label": "Delete",
        "cancel-label": "Cancel",
        "onUpdate:open": cancelDeleteTransaction,
        onConfirm: confirmDeleteTransaction,
        onCancel: cancelDeleteTransaction
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/transaction-ledger/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6da3770d"]]);

export { index as default };
//# sourceMappingURL=index-DEiuKA9K.mjs.map
