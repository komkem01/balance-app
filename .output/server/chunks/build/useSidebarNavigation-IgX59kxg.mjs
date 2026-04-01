import { ref, reactive, computed, watch, defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { useRoute, useRouter } from 'vue-router';

class ApiError extends Error {
  constructor(message, status, code = "request-failed") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}
const ACCESS_REFRESH_BUFFER_MS = 30 * 1e3;
let refreshInFlight = null;
const useAuthApi = () => {
  const apiBase = "http://localhost:8080/api/v1";
  const request = async (path, init) => {
    const response = await fetch(`${apiBase}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...init?.headers || {}
      },
      ...init
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok) {
      throw new ApiError(
        payload?.message || "request-failed",
        response.status,
        payload?.code || "request-failed"
      );
    }
    return payload;
  };
  const saveSession = (payload) => {
    {
      return;
    }
  };
  const clearSession = () => {
    {
      return;
    }
  };
  const getAccessToken = () => {
    {
      return "";
    }
  };
  const getTokenType = () => {
    {
      return "Bearer";
    }
  };
  const getRefreshToken = () => {
    {
      return "";
    }
  };
  const getAccessExpiresAt = () => {
    {
      return 0;
    }
  };
  const shouldRefreshAccessToken = () => {
    const expiresAt = getAccessExpiresAt();
    if (!expiresAt) {
      return false;
    }
    return Date.now() + ACCESS_REFRESH_BUFFER_MS >= expiresAt;
  };
  const shouldRetryWithRefresh = (error) => {
    if (error instanceof ApiError) {
      if (error.status === 401 || error.status === 403) {
        return true;
      }
      const normalized = `${error.code} ${error.message}`.toLowerCase();
      return normalized.includes("unauthorized") || normalized.includes("token") || normalized.includes("member");
    }
    if (error instanceof Error) {
      const normalized = error.message.toLowerCase();
      return normalized.includes("unauthorized") || normalized.includes("token") || normalized.includes("member");
    }
    return false;
  };
  const requestWithAuth = async (path, init, allowRetry = true) => {
    if (allowRetry && shouldRefreshAccessToken()) {
      try {
        await refreshMemberToken();
      } catch {
        throw new Error("access-token-expired");
      }
    }
    let accessToken = getAccessToken().trim();
    if (!accessToken) {
      if (!allowRetry) {
        throw new Error("access-token-missing");
      }
      try {
        await refreshMemberToken();
      } catch {
        throw new Error("access-token-missing");
      }
      accessToken = getAccessToken().trim();
      if (!accessToken) {
        throw new Error("access-token-missing");
      }
    }
    const tokenType = getTokenType().trim() || "Bearer";
    try {
      return await request(path, {
        ...init,
        headers: {
          ...init?.headers || {},
          Authorization: `${tokenType} ${accessToken}`
        }
      });
    } catch (error) {
      if (!allowRetry || !shouldRetryWithRefresh(error)) {
        throw error;
      }
      try {
        await refreshMemberToken();
      } catch {
        throw error;
      }
      return await requestWithAuth(path, init, false);
    }
  };
  const loginMember = async (body) => {
    const res = await request("/public/auth/login", {
      method: "POST",
      body: JSON.stringify(body)
    });
    saveSession({
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
      tokenType: res.data.token_type,
      expiresIn: res.data.expires_in,
      refreshExpiresIn: res.data.refresh_expires_in
    });
    return res;
  };
  const refreshMemberToken = async (refreshToken) => {
    if (refreshInFlight) {
      return await refreshInFlight;
    }
    const token = (refreshToken || getRefreshToken()).trim();
    if (!token) {
      throw new Error("refresh-token-missing");
    }
    refreshInFlight = request("/public/auth/refresh", {
      method: "POST",
      body: JSON.stringify({
        refresh_token: token
      })
    });
    try {
      const res = await refreshInFlight;
      saveSession({
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        tokenType: res.data.token_type,
        expiresIn: res.data.expires_in,
        refreshExpiresIn: res.data.refresh_expires_in
      });
      return res;
    } finally {
      refreshInFlight = null;
    }
  };
  const registerMember = async (body) => {
    return await request("/public/auth/register", {
      method: "POST",
      body: JSON.stringify(body)
    });
  };
  const listGenders = async () => {
    const res = await request("/systems/genders?page=1&size=100");
    return res.data || [];
  };
  const listPrefixes = async () => {
    const res = await request("/systems/prefixes?page=1&size=100");
    return res.data || [];
  };
  const getMe = async () => {
    return await requestWithAuth("/me", {
      method: "GET"
    });
  };
  const updateMe = async (memberID, body) => {
    return await requestWithAuth(`/members/${memberID}`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  };
  const changeMyPassword = async (body) => {
    return await requestWithAuth("/me/change-password", {
      method: "POST",
      body: JSON.stringify(body)
    });
  };
  const deleteMe = async () => {
    return await requestWithAuth("/me", {
      method: "DELETE"
    });
  };
  const getMySettings = async () => {
    return await requestWithAuth("/me/settings", {
      method: "GET"
    });
  };
  const updateMySettings = async (body) => {
    return await requestWithAuth("/me/settings", {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  };
  const updateMyNotificationSettings = async (body) => {
    return await requestWithAuth("/me/settings/notifications", {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  };
  const getSystemManifest = async () => {
    return await request("/system/manifest", {
      method: "GET"
    });
  };
  const listMyWallets = async (params) => {
    const page = params?.page || 1;
    const size = params?.size || 100;
    const query = new URLSearchParams({
      page: String(page),
      size: String(size)
    });
    if (typeof params?.isActive === "boolean") {
      query.set("is_active", String(params.isActive));
    }
    const res = await requestWithAuth(`/balances/wallets?${query.toString()}`, {
      method: "GET"
    });
    return {
      items: res.data || [],
      paginate: res.paginate
    };
  };
  const createMyWallet = async (body) => {
    return await requestWithAuth("/balances/wallets", {
      method: "POST",
      body: JSON.stringify(body)
    });
  };
  const updateMyWallet = async (walletID, body) => {
    return await requestWithAuth(`/balances/wallets/${walletID}`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  };
  const deleteMyWallet = async (walletID) => {
    return await requestWithAuth(`/balances/wallets/${walletID}`, {
      method: "DELETE"
    });
  };
  const listMyCategories = async (params) => {
    const page = params?.page || 1;
    const size = params?.size || 200;
    const query = new URLSearchParams({
      page: String(page),
      size: String(size)
    });
    if (params?.type) {
      query.set("type", params.type);
    }
    const res = await requestWithAuth(`/balances/categories?${query.toString()}`, {
      method: "GET"
    });
    return {
      items: res.data || []
    };
  };
  const createMyCategory = async (body) => {
    return await requestWithAuth("/balances/categories", {
      method: "POST",
      body: JSON.stringify(body)
    });
  };
  const deleteMyCategory = async (categoryID) => {
    return await requestWithAuth(`/balances/categories/${categoryID}`, {
      method: "DELETE"
    });
  };
  const updateMyCategory = async (categoryID, body) => {
    return await requestWithAuth(`/balances/categories/${categoryID}`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  };
  const listMyBudgets = async (params) => {
    const page = params?.page || 1;
    const size = params?.size || 200;
    const query = new URLSearchParams({
      page: String(page),
      size: String(size)
    });
    if (params?.period) {
      query.set("period", params.period);
    }
    if (params?.categoryID) {
      query.set("category_id", params.categoryID);
    }
    const res = await requestWithAuth(`/balances/budgets?${query.toString()}`, {
      method: "GET"
    });
    const data = res.data;
    if (Array.isArray(data)) {
      return {
        items: data,
        totalNetWorth: 0
      };
    }
    return {
      items: data?.items || [],
      totalNetWorth: Number(data?.total_net_worth || 0)
    };
  };
  const createMyBudget = async (body) => {
    return await requestWithAuth("/balances/budgets", {
      method: "POST",
      body: JSON.stringify(body)
    });
  };
  const updateMyBudget = async (budgetID, body) => {
    return await requestWithAuth(`/balances/budgets/${budgetID}`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  };
  const deleteMyBudget = async (budgetID) => {
    return await requestWithAuth(`/balances/budgets/${budgetID}`, {
      method: "DELETE"
    });
  };
  const recalculateAllBudgets = async () => {
    return await requestWithAuth("/balances/budgets/recalculate-all", {
      method: "POST"
    });
  };
  const listMyTransactions = async (params) => {
    const page = params?.page || 1;
    const size = params?.size || 200;
    const query = new URLSearchParams({
      page: String(page),
      size: String(size)
    });
    if (params?.walletID) {
      query.set("wallet_id", params.walletID);
    }
    if (params?.categoryID) {
      query.set("category_id", params.categoryID);
    }
    if (params?.type) {
      query.set("type", params.type);
    }
    const res = await requestWithAuth(`/balances/transactions?${query.toString()}`, {
      method: "GET"
    });
    return {
      items: res.data || []
    };
  };
  const createMyTransaction = async (body) => {
    return await requestWithAuth("/balances/transactions", {
      method: "POST",
      body: JSON.stringify(body)
    });
  };
  const updateMyTransaction = async (transactionID, body) => {
    return await requestWithAuth(`/balances/transactions/${transactionID}`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  };
  const deleteMyTransaction = async (transactionID) => {
    return await requestWithAuth(`/balances/transactions/${transactionID}`, {
      method: "DELETE"
    });
  };
  return {
    clearSession,
    getAccessToken,
    getRefreshToken,
    getTokenType,
    getMe,
    updateMe,
    changeMyPassword,
    deleteMe,
    getMySettings,
    updateMySettings,
    updateMyNotificationSettings,
    getSystemManifest,
    listMyWallets,
    createMyWallet,
    updateMyWallet,
    deleteMyWallet,
    listMyCategories,
    createMyCategory,
    deleteMyCategory,
    updateMyCategory,
    listMyBudgets,
    createMyBudget,
    updateMyBudget,
    deleteMyBudget,
    recalculateAllBudgets,
    listMyTransactions,
    createMyTransaction,
    updateMyTransaction,
    deleteMyTransaction,
    loginMember,
    refreshMemberToken,
    registerMember,
    listGenders,
    listPrefixes
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppConfirmModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: { default: "Confirm Action" },
    description: { default: "Are you sure you want to continue?" },
    confirmLabel: { default: "Confirm" },
    cancelLabel: { default: "Cancel" }
  },
  emits: ["update:open", "confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4" }, _attrs))} data-v-d309bded><div class="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl" data-v-d309bded><h4 class="text-sm font-bold uppercase tracking-widest text-slate-900" data-v-d309bded>${ssrInterpolate(__props.title)}</h4><p class="mt-3 text-sm leading-relaxed text-slate-500" data-v-d309bded>${ssrInterpolate(__props.description)}</p><div class="mt-8 flex justify-end gap-3" data-v-d309bded><button class="rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50" data-v-d309bded>${ssrInterpolate(__props.cancelLabel)}</button><button class="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800" data-v-d309bded>${ssrInterpolate(__props.confirmLabel)}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-d309bded"]]), { __name: "AppConfirmModal" });
const defaultSections = {
  overview: true,
  management: false,
  actions: false,
  system: false
};
const routeKeyMap = {
  "/dashboard": "dashboard",
  "/transaction-ledger": "history",
  "/wallet": "wallets",
  "/categories": "categories",
  "/budget": "budgets",
  "/new-entry": "record",
  "/account-profile": "profile",
  "/setting": "settings"
};
const pathByKey = {
  dashboard: "/dashboard",
  history: "/transaction-ledger",
  wallets: "/wallet",
  categories: "/categories",
  budgets: "/budget",
  record: "/new-entry",
  profile: "/account-profile",
  settings: "/setting"
};
const sectionByRouteKey = {
  dashboard: "overview",
  history: "overview",
  wallets: "management",
  categories: "management",
  budgets: "management",
  record: "actions",
  profile: "system",
  settings: "system"
};
const useSidebarNavigation = (options = {}) => {
  const route = useRoute();
  const router = useRouter();
  const logoutConfirmOpen = ref(false);
  const userDisplayName = ref("Member");
  const singleOpen = options.singleOpen ?? true;
  const mobileMaxWidth = options.mobileMaxWidth ?? 1024;
  const sections = reactive({
    ...defaultSections,
    ...options.initialSections
  });
  const currentPath = ref("dashboard");
  const syncCurrentPath = () => {
    currentPath.value = routeKeyMap[route.path] ?? "dashboard";
    if (!singleOpen) {
      return;
    }
    const activeSection = sectionByRouteKey[currentPath.value] ?? "overview";
    Object.keys(sections).forEach((key) => {
      sections[key] = key === activeSection;
    });
  };
  const loadCurrentMember = async () => {
    {
      return;
    }
  };
  const userInitials = computed(() => {
    const parts = userDisplayName.value.split(/\s+/).map((part) => part.trim()).filter(Boolean);
    if (parts.length === 0) {
      return "ME";
    }
    return parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("");
  });
  watch(
    () => route.path,
    () => {
      syncCurrentPath();
    }
  );
  const toggleSection = (section) => {
    if (!singleOpen) {
      sections[section] = !sections[section];
      return;
    }
    const willOpen = !sections[section];
    Object.keys(sections).forEach((key) => {
      sections[key] = false;
    });
    if (willOpen) {
      sections[section] = true;
    }
  };
  const goTo = (key) => {
    const target = pathByKey[key] ?? "/dashboard";
    if (route.path === target) {
      return;
    }
    router.push(target);
  };
  const confirmLogout = () => {
    logoutConfirmOpen.value = false;
  };
  const cancelLogout = () => {
    logoutConfirmOpen.value = false;
  };
  const logout = () => {
    logoutConfirmOpen.value = true;
  };
  return {
    currentPath,
    sections,
    toggleSection,
    goTo,
    logout,
    logoutConfirmOpen,
    confirmLogout,
    cancelLogout,
    mobileMaxWidth,
    userDisplayName,
    userInitials,
    loadCurrentMember
  };
};

export { __nuxt_component_2 as _, useAuthApi as a, useSidebarNavigation as u };
//# sourceMappingURL=useSidebarNavigation-IgX59kxg.mjs.map
