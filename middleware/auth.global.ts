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
  const now = Date.now();
  const accessExpiresAt = authApi.getAccessExpiresAt();
  if (accessToken && accessExpiresAt > now) {
    return;
  }

  // If user re-enters the site and access token is already expired, force login.
  authApi.clearSession();
  return navigateTo({
    path: "/",
    query: {
      reason: "session-expired",
    },
  });
});
