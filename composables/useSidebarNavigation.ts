import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthApi } from "./useAuthApi";

type SidebarSectionKey = "overview" | "management" | "actions" | "system";

type SidebarSections = Record<SidebarSectionKey, boolean>;

type SidebarRouteKey =
  | "dashboard"
  | "history"
  | "wallets"
  | "categories"
  | "budgets"
  | "goals"
  | "loans"
  | "record"
  | "profile"
  | "settings";

type UseSidebarNavigationOptions = {
  initialSections?: Partial<SidebarSections>;
  singleOpen?: boolean;
  mobileMaxWidth?: number;
  onCloseSidebar?: () => void;
};

const defaultSections: SidebarSections = {
  overview: true,
  management: false,
  actions: false,
  system: false,
};

const routeKeyMap: Record<string, SidebarRouteKey> = {
  "/dashboard": "dashboard",
  "/transaction-ledger": "history",
  "/wallet": "wallets",
  "/categories": "categories",
  "/budget": "budgets",
  "/goal": "goals",
  "/loan": "loans",
  "/new-entry": "record",
  "/account-profile": "profile",
  "/setting": "settings",
};

const pathByKey: Record<SidebarRouteKey, string> = {
  dashboard: "/dashboard",
  history: "/transaction-ledger",
  wallets: "/wallet",
  categories: "/categories",
  budgets: "/budget",
  goals: "/goal",
  loans: "/loan",
  record: "/new-entry",
  profile: "/account-profile",
  settings: "/setting",
};

const sectionByRouteKey: Record<SidebarRouteKey, SidebarSectionKey> = {
  dashboard: "overview",
  history: "overview",
  wallets: "management",
  categories: "management",
  budgets: "management",
  goals: "management",
  loans: "management",
  record: "actions",
  profile: "system",
  settings: "system",
};

export const useSidebarNavigation = (options: UseSidebarNavigationOptions = {}) => {
  const route = useRoute();
  const router = useRouter();
  const authApi = useAuthApi();
  const logoutConfirmOpen = ref(false);
  const userDisplayName = ref("Member");

  const singleOpen = options.singleOpen ?? true;

  const mobileMaxWidth = options.mobileMaxWidth ?? 1024;
  const sections = reactive<SidebarSections>({
    ...defaultSections,
    ...options.initialSections,
  });

  const currentPath = ref<SidebarRouteKey>("dashboard");

  const syncCurrentPath = () => {
    currentPath.value = routeKeyMap[route.path] ?? "dashboard";

    if (!singleOpen) {
      return;
    }

    const activeSection = sectionByRouteKey[currentPath.value] ?? "overview";
    (Object.keys(sections) as SidebarSectionKey[]).forEach((key) => {
      sections[key] = key === activeSection;
    });
  };

  const loadCurrentMember = async () => {
    if (typeof window === "undefined") {
      return;
    }

    const accessToken = authApi.getAccessToken().trim();
    if (!accessToken) {
      return;
    }

    try {
      const res = await authApi.getMe();
      const profile = res.data;
      const displayName = profile.display_name?.trim();
      const fallbackName = `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
      const accountName = profile.account?.username?.trim() || "";
      userDisplayName.value = displayName || fallbackName || accountName || "Member";
    } catch {
      // Keep fallback display name when profile fetch fails.
    }
  };

  const userInitials = computed(() => {
    const parts = userDisplayName.value
      .split(/\s+/)
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      return "ME";
    }

    return parts
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  });

  onMounted(() => {
    syncCurrentPath();
    void loadCurrentMember();
  });
  watch(
    () => route.path,
    () => {
      syncCurrentPath();
    }
  );

  const toggleSection = (section: SidebarSectionKey) => {
    if (!singleOpen) {
      sections[section] = !sections[section];
      return;
    }

    const willOpen = !sections[section];
    (Object.keys(sections) as SidebarSectionKey[]).forEach((key) => {
      sections[key] = false;
    });

    if (willOpen) {
      sections[section] = true;
    }
  };

  const goTo = (key: SidebarRouteKey) => {
    const target = pathByKey[key] ?? "/dashboard";
    if (route.path === target) {
      return;
    }

    if (typeof window !== "undefined" && window.innerWidth <= mobileMaxWidth) {
      options.onCloseSidebar?.();
    }

    router.push(target);
  };

  const confirmLogout = () => {
    logoutConfirmOpen.value = false;

    if (typeof window !== "undefined") {
      authApi.clearSession();

      window.location.href = "/";
    }
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
    loadCurrentMember,
  };
};
