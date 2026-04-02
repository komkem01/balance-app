<template>
  <div
    class="h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden"
  >
    <!-- Mesh Background Layer -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div
        class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40"
      ></div>
    </div>

    <div
      v-if="mobileSidebarOpen"
      class="fixed inset-0 z-10 bg-slate-900/30 backdrop-blur-[1px] min-[1025px]:hidden"
      @click="mobileSidebarOpen = false"
    ></div>

    <!-- Sidebar Section -->
    <aside
      :class="[
        'w-72 h-screen shrink-0 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-300 ease-out',
        'max-[1024px]:fixed max-[1024px]:inset-y-0 max-[1024px]:left-0 max-[1024px]:z-30 min-[1025px]:translate-x-0',
        mobileSidebarOpen ? 'max-[1024px]:translate-x-0' : 'max-[1024px]:-translate-x-full'
      ]"
    >
      <div class="relative p-10">
        <button
          class="inline-flex min-[1025px]:hidden absolute top-5 right-4 h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
          aria-label="Close sidebar"
          @click="mobileSidebarOpen = false"
        >
          <span class="text-base">×</span>
        </button>
        <h1
          class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1"
        >
          Archive
        </h1>
        <h2
          class="text-2xl font-light tracking-tighter text-slate-900 uppercase"
        >
          Balance
        </h2>
      </div>

      <!-- Navigation Accordion -->
      <nav class="flex-1 px-6 space-y-2 overflow-hidden">
        <!-- Section: Overview -->
        <div class="space-y-1">
          <button
            @click="toggleSection('overview')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Overview
            <span
              class="text-[9px] transition-transform duration-300"
              :class="{ 'rotate-180': sections.overview }"
              >▼</span
            >
          </button>

          <div
            :class="[
              sections.overview
                ? 'max-h-96 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100'
            ]"
          >
            <button
              @click="goTo('dashboard')"
              :class="navClass('dashboard')"
            >
              Dashboard
            </button>
            <button
              @click="goTo('history')"
              :class="navClass('history')"
            >
              Transaction Ledger
            </button>
          </div>
        </div>

        <!-- Section: Management -->
        <div class="space-y-1">
          <button
            @click="toggleSection('management')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Management
            <span
              class="text-[9px] transition-transform duration-300"
              :class="{ 'rotate-180': sections.management }"
              >▼</span
            >
          </button>

          <div
            :class="[
              sections.management
                ? 'max-h-96 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100'
            ]"
          >
            <button
              @click="goTo('wallets')"
              :class="navClass('wallets')"
            >
              Wallets
            </button>
            <button
              @click="goTo('categories')"
              :class="navClass('categories')"
            >
              Categories
            </button>
            <button
              @click="goTo('budgets')"
              :class="navClass('budgets')"
            >
              Budgets
            </button>
          </div>
        </div>

        <!-- Section: Actions -->
        <div class="space-y-1">
          <button
            @click="toggleSection('actions')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Entry
            <span
              class="text-[9px] transition-transform duration-300"
              :class="{ 'rotate-180': sections.actions }"
              >▼</span
            >
          </button>

          <div
            :class="[
              sections.actions
                ? 'max-h-96 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100'
            ]"
          >
            <button @click="goTo('record')" :class="navClass('record')">
              New Transaction
            </button>
          </div>
        </div>

        <!-- Section: System -->
        <div class="space-y-1">
          <button
            @click="toggleSection('system')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            System
            <span
              class="text-[9px] transition-transform duration-300"
              :class="{ 'rotate-180': sections.system }"
              >▼</span
            >
          </button>

          <div
            :class="[
              sections.system
                ? 'max-h-96 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100'
            ]"
          >
            <button
              @click="goTo('profile')"
              :class="navClass('profile')"
            >
              Account Profile
            </button>
            <button
              @click="goTo('settings')"
              :class="navClass('settings')"
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      <!-- Footer User Info -->
      <div class="border-t border-slate-100 bg-slate-900 px-6 py-5 text-white">
        <p class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1">
          Authenticated as
        </p>
        <p class="text-sm font-semibold tracking-tight">{{ userDisplayName }}</p>
        <button
          @click="logout"
          class="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition"
        >
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main
      class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1"
    >
      <AppLoading v-if="pageLoading" overlay label="Loading data..." />

      <!-- Dynamic Header Based on currentPath -->
      <header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600"
            @click="mobileSidebarOpen = true"
          >
            <span class="text-sm">☰</span>
            Menu
          </button>
          <p
            class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2"
          >
            {{ currentPath }}
          </p>
          <h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900">
            {{ pageTitle }}
          </h3>
        </div>
        <div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6">
          <div class="text-right sm:text-right">
            <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">
              Total Net Worth
            </p>
            <p class="text-2xl font-medium tracking-tight">
              ฿
              {{
                headerTotalNetWorth.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })
              }}
            </p>
          </div>
          <button
            @click="goTo('record')"
            class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            Quick Entry
          </button>
        </div>
      </header>

      <!-- Content Views -->
      <div
        class="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700"
      >
        <!-- Dashboard View -->
        <div
          v-if="currentPath === 'dashboard'"
          class="grid grid-cols-1 xl:grid-cols-3 items-start gap-10"
        >
          <!-- Left Column: Chart & History -->
          <div class="xl:col-span-2 min-w-0 space-y-10">
            <!-- Monthly Performance Chart -->
            <div
              class="relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <div
                v-if="chartLoading"
                class="absolute inset-0 z-20 rounded-[2.5rem] bg-white/75 backdrop-blur-[1px] flex items-center justify-center"
              >
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Loading chart...</p>
              </div>
              <div class="flex justify-between items-center mb-7">
                <h4
                  class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  Monthly Performance
                </h4>
                <div class="flex space-x-4">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span
                      class="text-[9px] text-slate-400 uppercase tracking-widest"
                      >Income</span
                    >
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full bg-sky-400"></div>
                    <span
                      class="text-[9px] text-slate-400 uppercase tracking-widest"
                      >Expense</span
                    >
                  </div>
                </div>
              </div>
              <div class="relative h-56 px-2">
                <Line
                  class="relative z-10 h-full w-full"
                  :data="lineChartData"
                  :options="lineChartOptions"
                />
              </div>
              <div class="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6">
                <div class="flex items-center gap-2 rounded-full bg-slate-50 p-1">
                  <button
                    v-for="range in chartRanges"
                    :key="range"
                    type="button"
                    @click="setChartRange(range)"
                    class="rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition"
                    :class="selectedChartRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-700'"
                  >
                    {{ range }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Recent Activity List -->
            <div
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <div class="flex justify-between items-center mb-8">
                <h4
                  class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  Recent Activity
                </h4>
                <button
                  @click="goTo('history')"
                  class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider hover:opacity-70 transition-opacity"
                >
                  View All Ledger
                </button>
              </div>
              <div class="space-y-5">
                <div
                  v-for="item in recentTransactions"
                  :key="item.id"
                  class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0"
                >
                  <div class="flex items-center space-x-4">
                    <div
                      class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400"
                    >
                      {{ item.category.substring(0, 2).toUpperCase() }}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-slate-900">
                        {{ item.note || item.category }}
                      </p>
                      <p
                        class="text-[10px] text-slate-400 uppercase tracking-widest"
                      >
                        {{ item.wallet }} • {{ item.date }}
                      </p>
                    </div>
                  </div>
                  <p
                    :class="[
                      'text-sm font-semibold',
                      item.type === 'expense'
                        ? 'text-rose-500'
                        : 'text-emerald-500',
                    ]"
                  >
                    {{ item.type === "expense" ? "-" : "+" }}
                    {{ item.amount.toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Wallets & Budgets -->
          <div class="min-w-0 space-y-10">
            <!-- Asset Snapshot -->
            <div
              class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"
              ></div>
              <h4
                class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8"
              >
                Active Wallets
              </h4>
              <div class="space-y-6">
                <div
                  v-for="wallet in wallets"
                  :key="wallet.id"
                  class="group cursor-pointer"
                  @click="openWalletDetail(wallet.id)"
                >
                  <div class="flex justify-between items-end mb-2">
                    <p
                      class="text-[10px] text-slate-400 uppercase tracking-widest"
                    >
                      {{ wallet.name }}
                    </p>
                    <span
                      class="text-[8px] text-slate-600 group-hover:text-indigo-400 transition-colors"
                      >DETAILS</span
                    >
                  </div>
                  <p class="text-xl font-light tracking-tight">
                    ฿ {{ wallet.balance.toLocaleString() }}
                  </p>
                </div>
              </div>
              <button
                @click="goTo('wallets')"
                class="w-full mt-8 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Manage Assets
              </button>
            </div>

            <!-- Budget Progress -->
            <div
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <h4
                class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8"
              >
                Budget Status
              </h4>
              <div class="space-y-6">
                <div
                  v-for="budget in activeBudgets"
                  :key="budget.id"
                  class="space-y-3"
                >
                  <div
                    class="flex justify-between text-[10px] uppercase tracking-widest"
                  >
                    <span class="font-bold text-slate-900">{{
                      budget.category
                    }}</span>
                    <span class="text-slate-400">{{ budget.percent }}%</span>
                  </div>
                  <div
                    class="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden"
                  >
                    <div
                      :class="[
                        'h-full transition-all duration-1000',
                        budget.percent > 90 ? 'bg-rose-500' : 'bg-slate-900',
                      ]"
                      :style="{ width: budget.percent + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Placeholder for other modules -->
        <div
          v-else
          class="min-h-[500px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-white/30 backdrop-blur-sm"
        >
          <div class="text-center max-w-sm">
            <h5
              class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] mb-4"
            >
              Module Locked
            </h5>
            <p class="text-sm text-slate-400 font-light leading-relaxed mb-8">
              The interface for
              <span class="text-indigo-500 font-medium">{{ pageTitle }}</span>
              is currently under architectural review.
            </p>
            <button
              @click="goTo('dashboard')"
              class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1 hover:opacity-50 transition-opacity"
            >
              Return to Core
            </button>
          </div>
        </div>
      </div>
    </main>

    <AppConfirmModal
      :open="logoutConfirmOpen"
      title="Confirm Logout"
      description="Are you sure you want to log out from this session?"
      confirm-label="Logout"
      cancel-label="Cancel"
      @update:open="cancelLogout"
      @confirm="confirmLogout"
      @cancel="cancelLogout"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type ChartOptions,
} from "chart.js";
import { useAuthApi } from "../../composables/useAuthApi";
import { useTotalNetWorth } from "../../composables/useTotalNetWorth";
import { useSidebarNavigation } from "../../composables/useSidebarNavigation";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

type TransactionType = "income" | "expense";

type WalletItem = {
  id: string;
  name: string;
  balance: number;
};

type CategoryItem = {
  id: string;
  name: string;
};

type BudgetItem = {
  id: string;
  category_id: string;
  amount: number;
  spent: number;
};

type TransactionItem = {
  id: string;
  walletID: string;
  category: string;
  note: string;
  amount: number;
  type: TransactionType;
  wallet: string;
  date: string;
  transactionDateRaw: string | null;
  createdAtRaw: string | null;
};

type MonthlyPerformanceItem = {
  key: string;
  label: string;
  income: number;
  expense: number;
};

type MonthlySummaryAggregateItem = {
  month: string;
  income_total: number;
  expense_total: number;
  transaction_count: number;
};

type ChartRange = "1 Day" | "1 Week" | "1 Month" | "1 Year" | "All Time";
type ChartRangeQuery = "1d" | "1w" | "1m" | "1y" | "all";

const mobileSidebarOpen = ref(false);

const { currentPath, sections, toggleSection, goTo, logout, logoutConfirmOpen, confirmLogout, cancelLogout, userDisplayName } = useSidebarNavigation({
  initialSections: {
    overview: true,
    management: false,
    actions: false,
    system: false,
  },
  singleOpen: true,
  mobileMaxWidth: 1024,
  onCloseSidebar: () => {
    mobileSidebarOpen.value = false;
  },
});
const {
  listMyWallets,
  listMyCategories,
  listMyBudgets,
  listMyTransactions,
  listMyTransactionMonthlySummary,
} = useAuthApi();
const { totalNetWorth: totalNetWorthFromAPI, refreshTotalNetWorth } = useTotalNetWorth();
const router = useRouter();
const wallets = ref<WalletItem[]>([]);
const categories = ref<CategoryItem[]>([]);
const budgets = ref<BudgetItem[]>([]);
const allTransactions = ref<TransactionItem[]>([]);
const monthlySummaryItems = ref<MonthlySummaryAggregateItem[]>([]);
const pageLoading = ref(false);
const chartLoading = ref(false);
const selectedChartRange = ref<ChartRange>("All Time");

onMounted(() => {
  void loadInitialData();
});

const normalizeErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return "request-failed";
};

const formatDateDisplay = (value: string | null) => {
  if (!value) {
    return "-";
  }

  const normalized = value.includes("T") ? value : `${value}T00:00:00`;
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

const headerTotalNetWorth = computed(() => {
  const fallback = wallets.value.reduce((acc, curr) => acc + curr.balance, 0);
  return totalNetWorthFromAPI.value ?? fallback;
});

const recentTransactions = computed(() => allTransactions.value.slice(0, 3));
const chartRanges: ChartRange[] = ["1 Day", "1 Week", "1 Month", "1 Year", "All Time"];

const chartRangeQueryMap: Record<ChartRange, ChartRangeQuery> = {
  "1 Day": "1d",
  "1 Week": "1w",
  "1 Month": "1m",
  "1 Year": "1y",
  "All Time": "all",
};

const formatDateOnly = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getRangeDateWindow = (range: ChartRange) => {
  const now = new Date();
  switch (range) {
    case "1 Day":
      return {
        startDate: formatDateOnly(new Date(now.getTime() - 24 * 60 * 60 * 1000)),
        endDate: formatDateOnly(now),
      };
    case "1 Week":
      return {
        startDate: formatDateOnly(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
        endDate: formatDateOnly(now),
      };
    case "1 Month":
      return {
        startDate: formatDateOnly(new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())),
        endDate: formatDateOnly(now),
      };
    case "1 Year":
      return {
        startDate: formatDateOnly(new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())),
        endDate: formatDateOnly(now),
      };
    default:
      return {
        startDate: undefined,
        endDate: undefined,
      };
  }
};

const chartSummaryQuery = computed(() => {
  const rangeWindow = getRangeDateWindow(selectedChartRange.value);
  return {
    startDate: rangeWindow.startDate,
    endDate: rangeWindow.endDate,
    range: chartRangeQueryMap[selectedChartRange.value],
  };
});

const buildMonthlySummaryFromTransactions = () => {
  const monthlyMap = new Map<string, MonthlySummaryAggregateItem>();

  for (const item of allTransactions.value) {
    const rawDate = item.transactionDateRaw || item.createdAtRaw;
    if (!rawDate) {
      continue;
    }

    const parsed = new Date(rawDate);
    if (Number.isNaN(parsed.getTime())) {
      continue;
    }

    const month = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}`;
    const current = monthlyMap.get(month) || {
      month,
      income_total: 0,
      expense_total: 0,
      transaction_count: 0,
    };

    if (item.type === "income") {
      current.income_total += Number(item.amount || 0);
    } else {
      current.expense_total += Number(item.amount || 0);
    }
    current.transaction_count += 1;
    monthlyMap.set(month, current);
  }

  return Array.from(monthlyMap.values()).sort((a, b) => a.month.localeCompare(b.month));
};

const normalizeMonthKey = (value: string) => {
  if (!value) {
    return "";
  }

  if (value.length >= 7 && value[4] === "-") {
    return value.slice(0, 7);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  return `${parsed.getFullYear()}-${month}`;
};

const parseMonthKeyToDate = (value: string) => {
  if (!value || value.length < 7) {
    return null;
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
    return null;
  }

  return new Date(year, month - 1, 1);
};

const monthlyPerformance = computed<MonthlyPerformanceItem[]>(() => {
  const summaryItems = monthlySummaryItems.value.length > 0
    ? monthlySummaryItems.value
    : buildMonthlySummaryFromTransactions();

  const latestSummaryMonth = summaryItems
    .map((item) => parseMonthKeyToDate(item.month))
    .filter((date): date is Date => date !== null)
    .sort((a, b) => a.getTime() - b.getTime())
    .at(-1);

  const now = latestSummaryMonth || new Date();
  const baseMonths = Array.from({ length: 12 }, (_, offset) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (11 - offset), 1);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return {
      key: `${date.getFullYear()}-${month}`,
      label: date.toLocaleString("en-US", { month: "short" }),
      income: 0,
      expense: 0,
    };
  });

  const monthMap = new Map(baseMonths.map((item) => [item.key, item]));
  for (const item of summaryItems) {
    const monthItem = monthMap.get(item.month);
    if (!monthItem) {
      continue;
    }

    monthItem.income += Number(item.income_total || 0);
    monthItem.expense += Number(item.expense_total || 0);
  }

  return baseMonths;
});

const lineChartData = computed(() => ({
  labels: monthlyPerformance.value.map((item) => item.label),
  datasets: [
    {
      label: "Income",
      data: monthlyPerformance.value.map((item) => item.income),
      borderColor: "#10b981",
      backgroundColor: "#10b981",
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBorderWidth: 2,
      pointBackgroundColor: "#ffffff",
      pointBorderColor: "#10b981",
      tension: 0.42,
      fill: false,
    },
    {
      label: "Expense",
      data: monthlyPerformance.value.map((item) => item.expense),
      borderColor: "#38bdf8",
      backgroundColor: "#38bdf8",
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBorderWidth: 2,
      pointBackgroundColor: "#ffffff",
      pointBorderColor: "#38bdf8",
      tension: 0.42,
      fill: false,
    },
  ],
}));

const lineChartOptions = computed<ChartOptions<"line">>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.95)",
      padding: 10,
      titleFont: { size: 11, weight: 700 },
      bodyFont: { size: 11, weight: 600 },
      callbacks: {
        label: (ctx) => `${ctx.dataset.label}: ฿ ${Number(ctx.parsed.y || 0).toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#94a3b8",
        font: {
          size: 10,
          weight: 700,
        },
      },
      border: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#94a3b8",
        font: {
          size: 10,
          weight: 700,
        },
        callback: (value) => {
          const num = Number(value || 0);
          return num >= 1000 ? `${Math.round(num / 1000)}K` : `${num}`;
        },
      },
      grid: {
        color: "#e2e8f0",
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
  },
}));

const activeBudgets = computed(() => {
  const categoryMap = new Map(categories.value.map((item) => [item.id, item.name]));
  return budgets.value.map((budget) => {
    const percent = budget.amount > 0 ? Math.min(Math.round((budget.spent / budget.amount) * 100), 100) : 0;
    return {
      id: budget.id,
      category: categoryMap.get(budget.category_id) || "Unknown",
      percent,
    };
  });
});

const loadWallets = async () => {
  const res = await listMyWallets({ page: 1, size: 200, isActive: true });
  wallets.value = (res.items || []).map((item) => ({
    id: item.id,
    name: item.name,
    balance: Number(item.balance || 0),
  }));
};

const loadCategories = async () => {
  const res = await listMyCategories({ page: 1, size: 300 });
  categories.value = (res.items || []).map((item) => ({
    id: item.id,
    name: item.name,
  }));
};

const loadBudgets = async () => {
  const res = await listMyBudgets({ page: 1, size: 300 });
  budgets.value = (res.items || []).map((item) => ({
    id: item.id,
    category_id: item.category_id || "",
    amount: Number(item.amount || 0),
    spent: Number(item.spent_amount || 0),
  }));
};

const loadTransactions = async () => {
  const res = await listMyTransactions({ page: 1, size: 300 });
  const walletMap = new Map(wallets.value.map((item) => [item.id, item.name]));
  const categoryMap = new Map(categories.value.map((item) => [item.id, item.name]));

  allTransactions.value = (res.items || []).map((item) => ({
    id: item.id,
    walletID: item.wallet_id || "",
    category: item.category_id ? categoryMap.get(item.category_id) || "Uncategorized" : "Uncategorized",
    note: item.note || "",
    amount: Number(item.amount || 0),
    type: item.type,
    wallet: item.wallet_id ? walletMap.get(item.wallet_id) || "Unknown Wallet" : "Unknown Wallet",
    date: formatDateDisplay(item.transaction_date),
    transactionDateRaw: item.transaction_date || null,
    createdAtRaw: item.created_at || null,
  }));
};

const loadMonthlySummary = async () => {
  chartLoading.value = true;
  try {
    let res;
    try {
      res = await listMyTransactionMonthlySummary(chartSummaryQuery.value);
    } catch {
      // Backward compatibility for servers that do not support `range` yet.
      res = await listMyTransactionMonthlySummary();
    }

    const rawItems = Array.isArray(res.items)
      ? res.items
      : (res.items && typeof res.items === "object" && "items" in (res.items as object) && Array.isArray((res.items as { items?: unknown[] }).items)
          ? ((res.items as { items: MonthlySummaryAggregateItem[] }).items || [])
          : []);

    monthlySummaryItems.value = rawItems.map((item) => ({
      month: normalizeMonthKey(item.month),
      income_total: Number(item.income_total || 0),
      expense_total: Number(item.expense_total || 0),
      transaction_count: Number(item.transaction_count || 0),
    }));
  } catch (error) {
    console.error("monthly-summary-load-failed", normalizeErrorMessage(error));
    monthlySummaryItems.value = [];
  } finally {
    chartLoading.value = false;
  }
};

const setChartRange = (range: ChartRange) => {
  selectedChartRange.value = range;
};

const loadInitialData = async () => {
  pageLoading.value = true;
  try {
    await Promise.all([loadWallets(), loadCategories(), loadBudgets()]);
    await Promise.all([loadTransactions(), loadMonthlySummary(), refreshTotalNetWorth()]);
  } catch (error) {
    console.error("dashboard-load-failed", normalizeErrorMessage(error));
  } finally {
    pageLoading.value = false;
  }
};

watch([selectedChartRange], () => {
  void loadMonthlySummary();
});

const openWalletDetail = (walletID: string) => {
  void router.push(`/wallet/${walletID}`);
};

const pageTitle = computed(() => {
  switch (currentPath.value) {
    case "dashboard":
      return "Financial Overview";
    case "history":
      return "Transaction Ledger";
    case "wallets":
      return "Asset Management";
    case "categories":
      return "Taxonomy Settings";
    case "budgets":
      return "Budget Allocation";
    case "record":
      return "New Entry";
    case "profile":
      return "User Identity";
    case "settings":
      return "System Preferences";
    default:
      return "Archive";
  }
});

const navClass = (path: string) => {
  const base =
    "w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest transition-all duration-300 rounded-xl ";
  return currentPath.value === path
    ? base + "bg-slate-900 text-white font-bold shadow-lg shadow-slate-200"
    : base + "text-slate-400 hover:text-slate-900 hover:bg-slate-50";
};
</script>

<style scoped>
.mesh-gradient {
  background-color: #f8fafc;
  background-image:
    radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.08) 0px, transparent 50%),
    radial-gradient(
      at 100% 100%,
      rgba(99, 102, 241, 0.08) 0px,
      transparent 50%
    ),
    radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.08) 0px, transparent 50%);
}

/* Hide scrollbar but keep functionality */
aside::-webkit-scrollbar,
main::-webkit-scrollbar {
  display: none;
}

.premium-card {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-in {
  animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chart-line-income,
.chart-line-expense {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: lineDrawIn 0.7s ease-out forwards;
}

.chart-line-expense {
  animation-delay: 0.08s;
}

@keyframes lineDrawIn {
  from {
    opacity: 0.25;
    stroke-dashoffset: 1;
  }
  to {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}

</style>
