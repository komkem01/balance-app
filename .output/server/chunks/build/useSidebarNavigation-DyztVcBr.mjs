import { ref, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { u as useAuthApi } from './useAuthApi-BJft6TAV.mjs';

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
  useAuthApi();
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

export { useSidebarNavigation as u };
//# sourceMappingURL=useSidebarNavigation-DyztVcBr.mjs.map
