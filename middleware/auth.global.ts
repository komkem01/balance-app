import { useAuthApi } from "../composables/useAuthApi";

const PUBLIC_PATHS = new Set(["/", "/register"]);

export default defineNuxtRouteMiddleware(async (to) => {
  if (PUBLIC_PATHS.has(to.path)) {
    return;
  }

  if (import.meta.server) {
    return;
  }

  const authApi = useAuthApi();
  const accessToken = authApi.getAccessToken().trim();
  if (accessToken) {
    return;
  }

  const refreshToken = authApi.getRefreshToken().trim();
  if (!refreshToken) {
    authApi.clearSession();
    return navigateTo("/");
  }

  try {
    await authApi.refreshMemberToken(refreshToken);
  } catch {
    authApi.clearSession();
    return navigateTo("/");
  }
});
