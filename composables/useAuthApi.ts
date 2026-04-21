type ApiEnvelope<T> = {
  code: string;
  message: string;
  data: T;
};

class ApiError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code = "request-failed") {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

declare global {
  interface ImportMeta {
    env: Record<string, string | undefined>;
  }
}

type LoginRequest = {
  username: string;
  password: string;
};

type RegisterRequest = {
  gender_id: string | null;
  prefix_id: string | null;
  first_name: string;
  last_name: string;
  display_name: string;
  phone: string;
  username: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in: number;
  member_id: string;
  username: string;
};

type RefreshResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in: number;
};

type GenderItem = {
  id: string;
  name: string;
  is_active: boolean;
};

type PrefixItem = {
  id: string;
  gender_id: string;
  name: string;
  is_active: boolean;
};

type MeAccount = {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
};

type MeResponse = {
  id: string;
  gender_id: string | null;
  prefix_id: string | null;
  first_name: string;
  last_name: string;
  display_name: string;
  phone: string;
  profile_image_url: string;
  account: MeAccount | null;
  created_at: string;
  updated_at: string;
  last_login: string | null;
};

type MeProfileImageResponse = {
  image_url: string;
};

type UpdateMemberRequest = {
  first_name?: string;
  last_name?: string;
  display_name?: string;
  phone?: string;
  profile_image_url?: string;
};

type ChangeMyPasswordRequest = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

type MeSettingsResponse = {
  preferred_currency: string;
  preferred_language: string;
  notify_budget: boolean;
  notify_security: boolean;
  notify_weekly: boolean;
};

type MeSettingsUpdateRequest = {
  preferred_currency?: string;
  preferred_language?: string;
  notify_budget?: boolean;
  notify_security?: boolean;
  notify_weekly?: boolean;
};

type MeNotificationsUpdateRequest = {
  notify_budget?: boolean;
  notify_security?: boolean;
  notify_weekly?: boolean;
};

type MemberNotificationType = "budget" | "security" | "weekly";
type MemberNotificationLevel = "info" | "warning" | "critical";

type MeNotificationItemResponse = {
  id: string;
  type: MemberNotificationType;
  level: MemberNotificationLevel;
  title: string;
  description: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
};

type SystemManifestResponse = {
  version: string;
  encrypted_status: string;
  environment: string;
};

type WalletItemResponse = {
  id: string;
  member_id: string | null;
  name: string;
  balance: number;
  currency: string;
  color_code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type WalletListResponse = {
  data: WalletItemResponse[];
  paginate?: {
    page?: number;
    size?: number;
    total?: number;
    Page?: number;
    Size?: number;
    Total?: number;
  };
};

type CreateWalletRequest = {
  name: string;
  balance: number;
  currency: string;
  color_code?: string;
};

type UpdateWalletRequest = {
  name?: string;
  balance?: number;
  currency?: string;
  color_code?: string;
  is_active?: boolean;
};

type CategoryType = "income" | "expense";
type CategoryPurpose = "loan_repayment";

type CategoryItemResponse = {
  id: string;
  member_id: string | null;
  name: string;
  type: CategoryType;
  purpose?: CategoryPurpose | null;
  icon_name: string;
  color_code: string;
  created_at: string;
  updated_at: string;
};

type CreateCategoryRequest = {
  name: string;
  type: CategoryType;
  purpose?: CategoryPurpose;
  icon_name?: string;
  color_code?: string;
};

type UpdateCategoryRequest = {
  name?: string;
  type?: CategoryType;
  purpose?: CategoryPurpose;
  icon_name?: string;
  color_code?: string;
};

type BudgetPeriod = "daily" | "weekly" | "monthly";
type TransactionType = "income" | "expense";

// ─── Loan Types ───────────────────────────────────────────────────────────────
type LoanItemResponse = {
  id: string;
  member_id: string | null;
  name: string;
  lender: string;
  total_amount: number;
  remaining_balance: number;
  monthly_payment: number;
  interest_rate: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
};

type LoanListResponse = {
  items: LoanItemResponse[];
  paginate: { page: number; size: number; total: number };
};

type CreateLoanRequest = {
  name: string;
  lender?: string;
  total_amount: number;
  remaining_balance: number;
  monthly_payment?: number;
  interest_rate?: number;
  start_date?: string;
  end_date?: string;
};

type UpdateLoanRequest = {
  name?: string;
  lender?: string;
  total_amount?: number;
  remaining_balance?: number;
  monthly_payment?: number;
  interest_rate?: number;
  start_date?: string;
  end_date?: string;
};

type GoalType = "savings" | "debt_payoff";
type GoalStatus = "active" | "completed" | "paused" | "archived";
type GoalTrackingSourceType = "wallet" | "all_wallets" | "loan";

type GoalItemResponse = {
  id: string;
  member_id: string | null;
  name: string;
  type: GoalType;
  target_amount: number;
  start_amount: number;
  current_amount: number;
  start_date: string | null;
  target_date: string | null;
  status: GoalStatus;
  auto_tracking: boolean;
  tracking_source_type: GoalTrackingSourceType | null;
  tracking_source_id: string | null;
  deposit_wallet_id: string | null;
  created_at: string;
  updated_at: string;
};

type GoalEntrySourceType = "transaction" | "loan" | "system";

type GoalEntryItemResponse = {
  id: string;
  goal_id: string;
  member_id: string | null;
  source_type: GoalEntrySourceType;
  source_id: string | null;
  amount_before: number;
  amount_after: number;
  amount_delta: number;
  note: string;
  created_at: string;
};

type GoalListResponse = {
  items: GoalItemResponse[];
  paginate: { page: number; size: number; total: number };
};

type CreateGoalRequest = {
  member_id?: string;
  name: string;
  type: GoalType;
  target_amount: number;
  start_amount?: number;
  current_amount?: number;
  start_date?: string;
  target_date?: string;
  status?: GoalStatus;
  auto_tracking?: boolean;
  tracking_source_type?: GoalTrackingSourceType;
  tracking_source_id?: string;
  deposit_wallet_id?: string;
};

type UpdateGoalRequest = {
  name?: string;
  target_amount?: number;
  start_amount?: number;
  current_amount?: number;
  start_date?: string;
  target_date?: string;
  status?: GoalStatus;
  auto_tracking?: boolean;
  tracking_source_type?: GoalTrackingSourceType;
  tracking_source_id?: string;
  deposit_wallet_id?: string;
};

type BudgetItemResponse = {
  id: string;
  member_id: string | null;
  category_id: string | null;
  amount: number;
  spent_amount: number;
  used_percent?: number;
  period: BudgetPeriod;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
};

type BudgetListResponseData = {
  items: BudgetItemResponse[];
  total_net_worth: number;
};

type CreateBudgetRequest = {
  member_id?: string;
  category_id?: string;
  amount: number;
  period: BudgetPeriod;
  start_date?: string;
  end_date?: string;
};

type UpdateBudgetRequest = {
  member_id?: string;
  category_id?: string;
  amount?: number;
  period?: BudgetPeriod;
  start_date?: string;
  end_date?: string;
};

type RecalculateAllBudgetsResponse = {
  total_budgets: number;
  updated_date_ranges: number;
  updated_spent_amount: number;
  recalculated_at: string;
};

type TransactionItemResponse = {
  id: string;
  wallet_id: string | null;
  category_id: string | null;
  amount: number;
  type: TransactionType;
  transaction_date: string | null;
  note: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

type TransactionListParams = {
  page?: number;
  size?: number;
  walletID?: string;
  categoryID?: string;
  type?: TransactionType;
};

type TransactionMonthlySummaryItemResponse = {
  month: string;
  income_total: number;
  expense_total: number;
  transaction_count: number;
};

type TransactionMonthlySummaryParams = {
  walletID?: string;
  categoryID?: string;
  startDate?: string;
  endDate?: string;
  range?: "1d" | "1w" | "1m" | "1y" | "all";
};

type StorageUploadSlipResponse = {
  image_url: string;
  display_image_url: string;
};

type StorageGetSlipResponse = {
  image_url: string;
  display_image_url: string;
};

type CreateTransactionRequest = {
  wallet_id?: string;
  category_id?: string;
  amount: number;
  type: TransactionType;
  transaction_date?: string;
  note?: string;
  image_url?: string;
  image_file?: File | null;
};

type CreateTransferTransactionRequest = {
  from_wallet_id: string;
  to_wallet_id: string;
  category_id?: string;
  amount: number;
  transaction_date?: string;
  note?: string;
};

type CreateTransferTransactionResponse = {
  from_transaction: TransactionItemResponse;
  to_transaction: TransactionItemResponse;
};

type UpdateTransactionRequest = {
  wallet_id?: string;
  category_id?: string;
  amount?: number;
  type?: TransactionType;
  transaction_date?: string;
  note?: string;
  image_url?: string;
};

const ACCESS_TOKEN_KEY = "balance_app_access_token";
const REFRESH_TOKEN_KEY = "balance_app_refresh_token";
const TOKEN_TYPE_KEY = "balance_app_token_type";
const ACCESS_EXPIRES_AT_KEY = "balance_app_access_expires_at";
const REFRESH_EXPIRES_AT_KEY = "balance_app_refresh_expires_at";
const ACCESS_TOKEN_COOKIE = "balance_app_access_token";
const REFRESH_TOKEN_COOKIE = "balance_app_refresh_token";
const TOKEN_TYPE_COOKIE = "balance_app_token_type";
const ACCESS_REFRESH_BUFFER_MS = 30 * 1000;
const SILENT_REFRESH_MIN_DELAY_MS = 5 * 1000;
const SILENT_REFRESH_RETRY_DELAY_MS = 60 * 1000;

let silentRefreshTimer: ReturnType<typeof setTimeout> | null = null;
let refreshInFlight: Promise<ApiEnvelope<RefreshResponse>> | null = null;

export const useAuthApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const apiBase =
    (runtimeConfig.public.apiBase as string | undefined) ||
    (import.meta.env.NUXT_PUBLIC_API_BASE as string | undefined) ||
    (import.meta.env.NUXT_PUBLIC_API_URL as string | undefined) ||
    "http://localhost:8080/api/v1";

  const request = async <T>(path: string, init?: RequestInit): Promise<ApiEnvelope<T>> => {
    const headers = new Headers(init?.headers || {});
    if (!(init?.body instanceof FormData) && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${apiBase}${path}`, {
      headers,
      ...init,
    });

    let payload: ApiEnvelope<T> | null = null;
    try {
      payload = (await response.json()) as ApiEnvelope<T>;
    } catch {
      payload = null;
    }

    if (!response.ok) {
      throw new ApiError(
        payload?.message || "request-failed",
        response.status,
        payload?.code || "request-failed",
      );
    }

    return payload as ApiEnvelope<T>;
  };

  const setCookie = (name: string, value: string, maxAgeSeconds: number) => {
    if (typeof document === "undefined") {
      return;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
  };

  const getCookie = (name: string) => {
    if (typeof document === "undefined") {
      return "";
    }

    const found = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${name}=`));

    if (!found) {
      return "";
    }

    return decodeURIComponent(found.slice(name.length + 1));
  };

  const removeCookie = (name: string) => {
    if (typeof document === "undefined") {
      return;
    }
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  };

  const saveSession = (payload: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    refreshExpiresIn: number;
  }) => {
    if (typeof window === "undefined") {
      return;
    }

    const now = Date.now();
    sessionStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken);
    sessionStorage.setItem(TOKEN_TYPE_KEY, payload.tokenType);
    sessionStorage.setItem(ACCESS_EXPIRES_AT_KEY, String(now + payload.expiresIn * 1000));
    sessionStorage.setItem(REFRESH_EXPIRES_AT_KEY, String(now + payload.refreshExpiresIn * 1000));

    // Persist across reload/restart as requested by product behavior.
    localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken);
    localStorage.setItem(TOKEN_TYPE_KEY, payload.tokenType);
    localStorage.setItem(ACCESS_EXPIRES_AT_KEY, String(now + payload.expiresIn * 1000));
    localStorage.setItem(REFRESH_EXPIRES_AT_KEY, String(now + payload.refreshExpiresIn * 1000));

    setCookie(ACCESS_TOKEN_COOKIE, payload.accessToken, payload.expiresIn);
    setCookie(REFRESH_TOKEN_COOKIE, payload.refreshToken, payload.refreshExpiresIn);
    setCookie(TOKEN_TYPE_COOKIE, payload.tokenType, payload.refreshExpiresIn);

    scheduleSilentRefresh();
  };

  const clearSession = () => {
    if (typeof window === "undefined") {
      return;
    }

    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_TYPE_KEY);
    sessionStorage.removeItem(ACCESS_EXPIRES_AT_KEY);
    sessionStorage.removeItem(REFRESH_EXPIRES_AT_KEY);

    // Also clear old persistent values from previous versions.
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_TYPE_KEY);
    localStorage.removeItem(ACCESS_EXPIRES_AT_KEY);
    localStorage.removeItem(REFRESH_EXPIRES_AT_KEY);

    removeCookie(ACCESS_TOKEN_COOKIE);
    removeCookie(REFRESH_TOKEN_COOKIE);
    removeCookie(TOKEN_TYPE_COOKIE);

    clearSilentRefreshTimer();
  };

  const getAccessToken = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return (
      sessionStorage.getItem(ACCESS_TOKEN_KEY)
      || localStorage.getItem(ACCESS_TOKEN_KEY)
      || getCookie(ACCESS_TOKEN_COOKIE)
      || ""
    );
  };

  const getTokenType = () => {
    if (typeof window === "undefined") {
      return "Bearer";
    }

    return (
      sessionStorage.getItem(TOKEN_TYPE_KEY)
      || localStorage.getItem(TOKEN_TYPE_KEY)
      || getCookie(TOKEN_TYPE_COOKIE)
      || "Bearer"
    );
  };

  const getRefreshToken = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return (
      sessionStorage.getItem(REFRESH_TOKEN_KEY)
      || localStorage.getItem(REFRESH_TOKEN_KEY)
      || getCookie(REFRESH_TOKEN_COOKIE)
      || ""
    );
  };

  const getAccessExpiresAt = () => {
    if (typeof window === "undefined") {
      return 0;
    }

    const raw = sessionStorage.getItem(ACCESS_EXPIRES_AT_KEY)
      || localStorage.getItem(ACCESS_EXPIRES_AT_KEY);
    const parsed = Number(raw || 0);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const getRefreshExpiresAt = () => {
    if (typeof window === "undefined") {
      return 0;
    }

    const raw = sessionStorage.getItem(REFRESH_EXPIRES_AT_KEY)
      || localStorage.getItem(REFRESH_EXPIRES_AT_KEY);
    const parsed = Number(raw || 0);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const shouldRefreshAccessToken = () => {
    const expiresAt = getAccessExpiresAt();
    if (!expiresAt) {
      return false;
    }

    return Date.now() + ACCESS_REFRESH_BUFFER_MS >= expiresAt;
  };

  const clearSilentRefreshTimer = () => {
    if (silentRefreshTimer) {
      clearTimeout(silentRefreshTimer);
      silentRefreshTimer = null;
    }
  };

  const scheduleSilentRefresh = () => {
    if (typeof window === "undefined") {
      return;
    }

    clearSilentRefreshTimer();

    const refreshToken = getRefreshToken().trim();
    const refreshExpiresAt = getRefreshExpiresAt();
    if (!refreshToken || (refreshExpiresAt > 0 && Date.now() >= refreshExpiresAt)) {
      return;
    }

    const accessExpiresAt = getAccessExpiresAt();
    const targetDelay = accessExpiresAt > 0
      ? accessExpiresAt - Date.now() - ACCESS_REFRESH_BUFFER_MS
      : SILENT_REFRESH_MIN_DELAY_MS;
    const delay = Math.max(SILENT_REFRESH_MIN_DELAY_MS, targetDelay);

    silentRefreshTimer = setTimeout(async () => {
      try {
        await refreshMemberToken();
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          clearSession();
          return;
        }

        silentRefreshTimer = setTimeout(() => {
          scheduleSilentRefresh();
        }, SILENT_REFRESH_RETRY_DELAY_MS);
        return;
      }

      scheduleSilentRefresh();
    }, delay);
  };

  const shouldRetryWithRefresh = (error: unknown) => {
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

  const requestWithAuth = async <T>(path: string, init?: RequestInit, allowRetry = true): Promise<ApiEnvelope<T>> => {
    if (allowRetry && shouldRefreshAccessToken()) {
      try {
        await refreshMemberToken();
      } catch {
        clearSession();
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
        clearSession();
        throw new Error("access-token-missing");
      }

      accessToken = getAccessToken().trim();
      if (!accessToken) {
        throw new Error("access-token-missing");
      }
    }

    const tokenType = getTokenType().trim() || "Bearer";

    try {
      return await request<T>(path, {
        ...init,
        headers: {
          ...(init?.headers || {}),
          Authorization: `${tokenType} ${accessToken}`,
        },
      });
    } catch (error) {
      if (!allowRetry || !shouldRetryWithRefresh(error)) {
        throw error;
      }

      try {
        await refreshMemberToken();
      } catch {
        clearSession();
        throw error;
      }

      return await requestWithAuth<T>(path, init, false);
    }
  };

  const loginMember = async (body: LoginRequest) => {
    const res = await request<LoginResponse>("/public/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });

    saveSession({
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
      tokenType: res.data.token_type,
      expiresIn: res.data.expires_in,
      refreshExpiresIn: res.data.refresh_expires_in,
    });

    return res;
  };

  const applyLoginSession = (payload: LoginResponse) => {
    saveSession({
      accessToken: payload.access_token,
      refreshToken: payload.refresh_token,
      tokenType: payload.token_type,
      expiresIn: payload.expires_in,
      refreshExpiresIn: payload.refresh_expires_in,
    });
  };

  const refreshMemberToken = async (refreshToken?: string) => {
    if (refreshInFlight) {
      return await refreshInFlight;
    }

    const token = (refreshToken || getRefreshToken()).trim();
    if (!token) {
      throw new Error("refresh-token-missing");
    }

    refreshInFlight = request<RefreshResponse>("/public/auth/refresh", {
      method: "POST",
      body: JSON.stringify({
        refresh_token: token,
      }),
    });

    try {
      const res = await refreshInFlight;

      saveSession({
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        tokenType: res.data.token_type,
        expiresIn: res.data.expires_in,
        refreshExpiresIn: res.data.refresh_expires_in,
      });

      return res;
    } finally {
      refreshInFlight = null;
    }
  };

  scheduleSilentRefresh();

  const registerMember = async (body: RegisterRequest) => {
    return await request<unknown>("/public/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const listGenders = async () => {
    const res = await request<GenderItem[]>("/systems/genders?page=1&size=100");
    return res.data || [];
  };

  const listPrefixes = async () => {
    const res = await request<PrefixItem[]>("/systems/prefixes?page=1&size=100");
    return res.data || [];
  };

  const getMe = async () => {
    return await requestWithAuth<MeResponse>("/me", {
      method: "GET",
    });
  };

  const getMyProfileImage = async () => {
    return await requestWithAuth<MeProfileImageResponse>("/me/profile-image", {
      method: "GET",
    });
  };

  const updateMe = async (memberID: string, body: UpdateMemberRequest) => {
    return await requestWithAuth<MeResponse>(`/members/${memberID}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const uploadMyProfileImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    return await requestWithAuth<MeResponse>("/me/profile-image", {
      method: "POST",
      body: formData,
    });
  };

  const changeMyPassword = async (body: ChangeMyPasswordRequest) => {
    return await requestWithAuth<unknown>("/me/change-password", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const deleteMe = async () => {
    return await requestWithAuth<unknown>("/me", {
      method: "DELETE",
    });
  };

  const getMySettings = async () => {
    return await requestWithAuth<MeSettingsResponse>("/me/settings", {
      method: "GET",
    });
  };

  const updateMySettings = async (body: MeSettingsUpdateRequest) => {
    return await requestWithAuth<MeSettingsResponse>("/me/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const updateMyNotificationSettings = async (body: MeNotificationsUpdateRequest) => {
    return await requestWithAuth<MeSettingsResponse>("/me/settings/notifications", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const listMyNotifications = async (params?: { includeRead?: boolean; limit?: number }) => {
    const query = new URLSearchParams();
    if (typeof params?.includeRead === "boolean") {
      query.set("include_read", String(params.includeRead));
    }
    if (typeof params?.limit === "number" && Number.isFinite(params.limit)) {
      query.set("limit", String(params.limit));
    }

    const suffix = query.toString() ? `?${query.toString()}` : "";
    return await requestWithAuth<MeNotificationItemResponse[]>(`/me/notifications${suffix}`, {
      method: "GET",
    });
  };

  const setMyNotificationRead = async (notificationID: string, isRead = true) => {
    return await requestWithAuth<MeNotificationItemResponse>(`/me/notifications/${notificationID}/read`, {
      method: "PATCH",
      body: JSON.stringify({ is_read: isRead }),
    });
  };

  const markAllMyNotificationsRead = async () => {
    return await requestWithAuth<unknown>("/me/notifications/read-all", {
      method: "PATCH",
      body: JSON.stringify({}),
    });
  };

  const clearMyNotifications = async () => {
    return await requestWithAuth<unknown>("/me/notifications", {
      method: "DELETE",
    });
  };

  const getSystemManifest = async () => {
    return await request<SystemManifestResponse>("/system/manifest", {
      method: "GET",
    });
  };

  const listMyWallets = async (params?: { page?: number; size?: number; isActive?: boolean }) => {
    const page = params?.page || 1;
    const size = params?.size || 100;
    const query = new URLSearchParams({
      page: String(page),
      size: String(size),
    });

    if (typeof params?.isActive === "boolean") {
      query.set("is_active", String(params.isActive));
    }

    const res = await requestWithAuth<WalletItemResponse[]>(`/balances/wallets?${query.toString()}`, {
      method: "GET",
    });

    return {
      items: res.data || [],
      paginate: (res as unknown as WalletListResponse).paginate,
    };
  };

  const createMyWallet = async (body: CreateWalletRequest) => {
    return await requestWithAuth<WalletItemResponse>("/balances/wallets", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const updateMyWallet = async (walletID: string, body: UpdateWalletRequest) => {
    return await requestWithAuth<WalletItemResponse>(`/balances/wallets/${walletID}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const deleteMyWallet = async (walletID: string) => {
    return await requestWithAuth<unknown>(`/balances/wallets/${walletID}`, {
      method: "DELETE",
    });
  };

  const listMyCategories = async (params?: { page?: number; size?: number; type?: CategoryType }) => {
    const page = params?.page || 1;
    const size = params?.size || 200;
    const query = new URLSearchParams({
      page: String(page),
      size: String(size),
    });

    if (params?.type) {
      query.set("type", params.type);
    }

    const res = await requestWithAuth<CategoryItemResponse[]>(`/balances/categories?${query.toString()}`, {
      method: "GET",
    });

    return {
      items: res.data || [],
    };
  };

  const createMyCategory = async (body: CreateCategoryRequest) => {
    return await requestWithAuth<CategoryItemResponse>("/balances/categories", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const deleteMyCategory = async (categoryID: string) => {
    return await requestWithAuth<unknown>(`/balances/categories/${categoryID}`, {
      method: "DELETE",
    });
  };

  const updateMyCategory = async (categoryID: string, body: UpdateCategoryRequest) => {
    return await requestWithAuth<CategoryItemResponse>(`/balances/categories/${categoryID}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const listMyBudgets = async (params?: {
    page?: number;
    size?: number;
    period?: BudgetPeriod;
    categoryID?: string;
  }) => {
    const page = params?.page || 1;
    const size = params?.size || 200;
    const query = new URLSearchParams({
      page: String(page),
      size: String(size),
    });

    if (params?.period) {
      query.set("period", params.period);
    }

    if (params?.categoryID) {
      query.set("category_id", params.categoryID);
    }

    const res = await requestWithAuth<BudgetListResponseData | BudgetItemResponse[]>(`/balances/budgets?${query.toString()}`, {
      method: "GET",
    });

    const data = res.data;
    if (Array.isArray(data)) {
      return {
        items: data,
        totalNetWorth: 0,
      };
    }

    return {
      items: data?.items || [],
      totalNetWorth: Number(data?.total_net_worth || 0),
    };
  };

  const createMyBudget = async (body: CreateBudgetRequest) => {
    return await requestWithAuth<BudgetItemResponse>("/balances/budgets", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const updateMyBudget = async (budgetID: string, body: UpdateBudgetRequest) => {
    return await requestWithAuth<BudgetItemResponse>(`/balances/budgets/${budgetID}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const deleteMyBudget = async (budgetID: string) => {
    return await requestWithAuth<unknown>(`/balances/budgets/${budgetID}`, {
      method: "DELETE",
    });
  };

  const recalculateAllBudgets = async () => {
    return await requestWithAuth<RecalculateAllBudgetsResponse>("/balances/budgets/recalculate-all", {
      method: "POST",
    });
  };

  const listMyTransactions = async (params?: TransactionListParams) => {
    const page = params?.page || 1;
    const size = params?.size || 200;
    const query = new URLSearchParams({
      page: String(page),
      size: String(size),
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

    const res = await requestWithAuth<TransactionItemResponse[]>(`/balances/transactions?${query.toString()}`, {
      method: "GET",
    });

    return {
      items: res.data || [],
    };
  };

  const listMyTransactionMonthlySummary = async (params?: TransactionMonthlySummaryParams) => {
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
    const path = queryString
      ? `/balances/transactions/monthly-summary?${queryString}`
      : "/balances/transactions/monthly-summary";

    const res = await requestWithAuth<TransactionMonthlySummaryItemResponse[]>(path, {
      method: "GET",
    });

    return {
      items: res.data || [],
    };
  };

  const createMyTransaction = async (body: CreateTransactionRequest) => {
    if (body.image_file) {
      const formData = new FormData();

      if (body.wallet_id) {
        formData.append("wallet_id", body.wallet_id);
      }
      if (body.category_id) {
        formData.append("category_id", body.category_id);
      }

      formData.append("amount", String(body.amount));
      formData.append("type", body.type);

      if (body.transaction_date) {
        formData.append("transaction_date", body.transaction_date);
      }
      if (body.note) {
        formData.append("note", body.note);
      }
      if (body.image_url) {
        formData.append("image_url", body.image_url);
      }

      formData.append("image", body.image_file);

      return await requestWithAuth<TransactionItemResponse>("/balances/transactions", {
        method: "POST",
        body: formData,
      });
    }

    const { image_file, ...payload } = body;

    return await requestWithAuth<TransactionItemResponse>("/balances/transactions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  const createMyTransferTransaction = async (body: CreateTransferTransactionRequest) => {
    return await requestWithAuth<CreateTransferTransactionResponse>("/balances/transactions/transfer", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const uploadMyTransactionSlip = async (walletID: string, imageFile: File) => {
    const formData = new FormData();
    formData.append("wallet_id", walletID);
    formData.append("image", imageFile);

    return await requestWithAuth<StorageUploadSlipResponse>("/balances/storage/slips", {
      method: "POST",
      body: formData,
    });
  };

  const getMyTransactionSlip = async (transactionID: string) => {
    return await requestWithAuth<StorageGetSlipResponse>(`/balances/storage/slips/${transactionID}`, {
      method: "GET",
    });
  };

  const getMyTransaction = async (transactionID: string) => {
    return await requestWithAuth<TransactionItemResponse>(`/balances/transactions/${transactionID}`, {
      method: "GET",
    });
  };

  const updateMyTransaction = async (transactionID: string, body: UpdateTransactionRequest) => {
    return await requestWithAuth<TransactionItemResponse>(`/balances/transactions/${transactionID}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const deleteMyTransaction = async (transactionID: string) => {
    return await requestWithAuth<unknown>(`/balances/transactions/${transactionID}`, {
      method: "DELETE",
    });
  };

  // ─── Loans ────────────────────────────────────────────────────────────────────
  const listMyLoans = async (params?: { page?: number; size?: number }) => {
    const q = new URLSearchParams();
    if (params?.page) q.set("page", String(params.page));
    if (params?.size) q.set("size", String(params.size));

    const res = await requestWithAuth<LoanItemResponse[] | LoanListResponse>(`/balances/loans?${q.toString()}`, {
      method: "GET",
    });

    const data = res.data;
    if (Array.isArray(data)) {
      return {
        items: data,
        paginate: (res as unknown as LoanListResponse).paginate,
      };
    }

    return {
      items: data?.items || [],
      paginate: data?.paginate || (res as unknown as LoanListResponse).paginate,
    };
  };

  const createMyLoan = async (body: CreateLoanRequest) => {
    return await requestWithAuth<LoanItemResponse>("/balances/loans", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const updateMyLoan = async (loanID: string, body: UpdateLoanRequest) => {
    return await requestWithAuth<LoanItemResponse>(`/balances/loans/${loanID}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const deleteMyLoan = async (loanID: string) => {
    return await requestWithAuth<unknown>(`/balances/loans/${loanID}`, {
      method: "DELETE",
    });
  };

  const listMyGoals = async (params?: {
    page?: number;
    size?: number;
    status?: GoalStatus;
    type?: GoalType;
  }) => {
    const q = new URLSearchParams();
    if (params?.page) q.set("page", String(params.page));
    if (params?.size) q.set("size", String(params.size));
    if (params?.status) q.set("status", params.status);
    if (params?.type) q.set("type", params.type);

    const res = await requestWithAuth<GoalItemResponse[] | GoalListResponse>(`/balances/goals?${q.toString()}`, {
      method: "GET",
    });

    const data = res.data;
    if (Array.isArray(data)) {
      return {
        items: data,
        paginate: (res as unknown as GoalListResponse).paginate,
      };
    }

    return {
      items: data?.items || [],
      paginate: data?.paginate || (res as unknown as GoalListResponse).paginate,
    };
  };

  const createMyGoal = async (body: CreateGoalRequest) => {
    return await requestWithAuth<GoalItemResponse>("/balances/goals", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const updateMyGoal = async (goalID: string, body: UpdateGoalRequest) => {
    return await requestWithAuth<GoalItemResponse>(`/balances/goals/${goalID}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const getMyGoal = async (goalID: string) => {
    return await requestWithAuth<GoalItemResponse>(`/balances/goals/${goalID}`, {
      method: "GET",
    });
  };

  const listMyGoalEntries = async (goalID: string, params?: { memberID?: string }) => {
    const q = new URLSearchParams();
    if (params?.memberID) {
      q.set("member_id", params.memberID);
    }

    const queryString = q.toString();
    const suffix = queryString ? `?${queryString}` : "";

    const res = await requestWithAuth<GoalEntryItemResponse[]>(`/balances/goals/${goalID}/entries${suffix}`, {
      method: "GET",
    });

    return {
      items: res.data || [],
    };
  };

  const deleteMyGoal = async (goalID: string) => {
    return await requestWithAuth<unknown>(`/balances/goals/${goalID}`, {
      method: "DELETE",
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
    getMyProfileImage,
    updateMe,
    uploadMyProfileImage,
    changeMyPassword,
    deleteMe,
    getMySettings,
    updateMySettings,
    updateMyNotificationSettings,
    listMyNotifications,
    setMyNotificationRead,
    markAllMyNotificationsRead,
    clearMyNotifications,
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
    createMyTransferTransaction,
    uploadMyTransactionSlip,
    getMyTransactionSlip,
    getMyTransaction,
    updateMyTransaction,
    deleteMyTransaction,
    listMyLoans,
    createMyLoan,
    updateMyLoan,
    deleteMyLoan,
    listMyGoals,
    createMyGoal,
    updateMyGoal,
    getMyGoal,
    deleteMyGoal,
    listMyGoalEntries,
    loginMember,
    applyLoginSession,
    refreshMemberToken,
    registerMember,
    listGenders,
    listPrefixes,
  };
};
