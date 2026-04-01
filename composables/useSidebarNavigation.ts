import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

type SidebarSectionKey = "overview" | "management" | "actions" | "system";

type SidebarSections = Record<SidebarSectionKey, boolean>;

type SidebarRouteKey =
  | "dashboard"
  | "history"
  | "wallets"
  | "categories"
  | "budgets"
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
  record: "actions",
  profile: "system",
  settings: "system",
};

export const useSidebarNavigation = (options: UseSidebarNavigationOptions = {}) => {
  const route = useRoute();
  const router = useRouter();
  const logoutConfirmOpen = ref(false);

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

  onMounted(syncCurrentPath);
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
      // Clear storage-backed auth/session state.
      window.localStorage.clear();
      window.sessionStorage.clear();

      // Clear all cookies for current domain.
      document.cookie.split(";").forEach((cookiePart) => {
        const [rawName] = cookiePart.split("=");
        const name = rawName?.trim();
        if (!name) {
          return;
        }
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

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
  };
};
