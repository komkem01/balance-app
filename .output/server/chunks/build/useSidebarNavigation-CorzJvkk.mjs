import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
  return {
    currentPath,
    sections,
    toggleSection,
    goTo,
    mobileMaxWidth
  };
};

export { useSidebarNavigation as u };
//# sourceMappingURL=useSidebarNavigation-CorzJvkk.mjs.map
