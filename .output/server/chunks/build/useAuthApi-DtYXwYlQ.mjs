import { c as useRuntimeConfig } from './server.mjs';

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
  const runtimeConfig = useRuntimeConfig();
  const apiBase = runtimeConfig.public.apiBase || void 0 || void 0 || "http://localhost:8080/api/v1";
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
  const getRefreshExpiresAt = () => {
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
  const listMyTransactionMonthlySummary = async (params) => {
    const query = new URLSearchParams();
    if (params?.walletID) {
      query.set("wallet_id", params.walletID);
    }
    if (params?.categoryID) {
      query.set("category_id", params.categoryID);
    }
    if (params?.startDate) {
      query.set("start_date", params.startDate);
    }
    if (params?.endDate) {
      query.set("end_date", params.endDate);
    }
    if (params?.range) {
      query.set("range", params.range);
    }
    const queryString = query.toString();
    const path = queryString ? `/balances/transactions/monthly-summary?${queryString}` : "/balances/transactions/monthly-summary";
    const res = await requestWithAuth(path, {
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
    getAccessExpiresAt,
    getRefreshToken,
    getRefreshExpiresAt,
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
    listMyTransactionMonthlySummary,
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

export { useAuthApi as u };
//# sourceMappingURL=useAuthApi-DtYXwYlQ.mjs.map
