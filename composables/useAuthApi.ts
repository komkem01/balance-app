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
  account: MeAccount | null;
  created_at: string;
  updated_at: string;
  last_login: string | null;
};

type UpdateMemberRequest = {
  first_name?: string;
  last_name?: string;
  display_name?: string;
  phone?: string;
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

type SystemManifestResponse = {
  version: string;
  encrypted_status: string;
  environment: string;
};

const ACCESS_TOKEN_KEY = "balance_app_access_token";
const REFRESH_TOKEN_KEY = "balance_app_refresh_token";
const TOKEN_TYPE_KEY = "balance_app_token_type";
const ACCESS_EXPIRES_AT_KEY = "balance_app_access_expires_at";
const REFRESH_EXPIRES_AT_KEY = "balance_app_refresh_expires_at";
const ACCESS_TOKEN_COOKIE = "balance_app_access_token";
const REFRESH_TOKEN_COOKIE = "balance_app_refresh_token";
const TOKEN_TYPE_COOKIE = "balance_app_token_type";

export const useAuthApi = () => {
  const apiBase =
    (import.meta.env.NUXT_PUBLIC_API_BASE as string | undefined) ||
    "http://localhost:8080/api/v1";

  const request = async <T>(path: string, init?: RequestInit): Promise<ApiEnvelope<T>> => {
    const response = await fetch(`${apiBase}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
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
    localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken);
    localStorage.setItem(TOKEN_TYPE_KEY, payload.tokenType);
    localStorage.setItem(ACCESS_EXPIRES_AT_KEY, String(now + payload.expiresIn * 1000));
    localStorage.setItem(REFRESH_EXPIRES_AT_KEY, String(now + payload.refreshExpiresIn * 1000));

    setCookie(ACCESS_TOKEN_COOKIE, payload.accessToken, payload.expiresIn);
    setCookie(REFRESH_TOKEN_COOKIE, payload.refreshToken, payload.refreshExpiresIn);
    setCookie(TOKEN_TYPE_COOKIE, payload.tokenType, payload.refreshExpiresIn);
  };

  const clearSession = () => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_TYPE_KEY);
    localStorage.removeItem(ACCESS_EXPIRES_AT_KEY);
    localStorage.removeItem(REFRESH_EXPIRES_AT_KEY);

    removeCookie(ACCESS_TOKEN_COOKIE);
    removeCookie(REFRESH_TOKEN_COOKIE);
    removeCookie(TOKEN_TYPE_COOKIE);
  };

  const getAccessToken = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return localStorage.getItem(ACCESS_TOKEN_KEY) || getCookie(ACCESS_TOKEN_COOKIE) || "";
  };

  const getTokenType = () => {
    if (typeof window === "undefined") {
      return "Bearer";
    }

    return localStorage.getItem(TOKEN_TYPE_KEY) || getCookie(TOKEN_TYPE_COOKIE) || "Bearer";
  };

  const getRefreshToken = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return localStorage.getItem(REFRESH_TOKEN_KEY) || getCookie(REFRESH_TOKEN_COOKIE) || "";
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

  const refreshMemberToken = async (refreshToken?: string) => {
    const token = (refreshToken || getRefreshToken()).trim();
    if (!token) {
      throw new Error("refresh-token-missing");
    }

    const res = await request<RefreshResponse>("/public/auth/refresh", {
      method: "POST",
      body: JSON.stringify({
        refresh_token: token,
      }),
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

  const updateMe = async (memberID: string, body: UpdateMemberRequest) => {
    return await requestWithAuth<MeResponse>(`/members/${memberID}`, {
      method: "PATCH",
      body: JSON.stringify(body),
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

  const getSystemManifest = async () => {
    return await request<SystemManifestResponse>("/system/manifest", {
      method: "GET",
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
    loginMember,
    refreshMemberToken,
    registerMember,
    listGenders,
    listPrefixes,
  };
};
