import { computed, ref } from 'vue';
import { a as useAuthApi } from './useSidebarNavigation-DPx-aobW.mjs';

const totalNetWorth = ref(null);
const totalNetWorthLoading = ref(false);
const totalNetWorthError = ref("");
let lastLoadedAt = 0;
const useTotalNetWorth = () => {
  const { listMyBudgets } = useAuthApi();
  const refreshTotalNetWorth = async (force = false) => {
    const now = Date.now();
    if (!force && totalNetWorth.value !== null && now - lastLoadedAt < 3e4) {
      return;
    }
    if (totalNetWorthLoading.value) {
      return;
    }
    totalNetWorthLoading.value = true;
    totalNetWorthError.value = "";
    try {
      const res = await listMyBudgets({ page: 1, size: 1 });
      totalNetWorth.value = Number(res.totalNetWorth || 0);
      lastLoadedAt = Date.now();
    } catch (error) {
      totalNetWorthError.value = error instanceof Error ? error.message : "total-net-worth-fetch-failed";
    } finally {
      totalNetWorthLoading.value = false;
    }
  };
  const totalNetWorthValue = computed(() => totalNetWorth.value ?? 0);
  return {
    totalNetWorth,
    totalNetWorthValue,
    totalNetWorthLoading,
    totalNetWorthError,
    refreshTotalNetWorth
  };
};

export { useTotalNetWorth as u };
//# sourceMappingURL=useTotalNetWorth-BWVTxd0T.mjs.map
