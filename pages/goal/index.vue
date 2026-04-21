<template>
  <div class="h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40"></div>
    </div>

    <div
      v-if="mobileSidebarOpen"
      class="fixed inset-0 z-10 bg-slate-900/30 backdrop-blur-[1px] min-[1025px]:hidden"
      @click="mobileSidebarOpen = false"
    ></div>

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
        <h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1">Archive</h1>
        <h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase">Balance</h2>
      </div>

      <nav class="flex-1 px-6 space-y-2 overflow-hidden">
        <div class="space-y-1">
          <button
            @click="toggleSection('overview')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Overview
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': sections.overview }">▼</span>
          </button>
          <div
            :class="[
              sections.overview ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100'
            ]"
          >
            <button @click="goTo('dashboard')" :class="navClass('dashboard')">Dashboard</button>
            <button @click="goTo('history')" :class="navClass('history')">Transaction Ledger</button>
          </div>
        </div>

        <div class="space-y-1">
          <button
            @click="toggleSection('management')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Management
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': sections.management }">▼</span>
          </button>
          <div
            :class="[
              sections.management ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100'
            ]"
          >
            <button @click="goTo('wallets')" :class="navClass('wallets')">Wallets</button>
            <button @click="goTo('categories')" :class="navClass('categories')">Categories</button>
            <button @click="goTo('budgets')" :class="navClass('budgets')">Budgets</button>
            <button @click="goTo('goals')" :class="navClass('goals')">Goals</button>
            <button @click="goTo('loans')" :class="navClass('loans')">Loans</button>
          </div>
        </div>

        <div class="space-y-1">
          <button
            @click="toggleSection('actions')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Entry
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': sections.actions }">▼</span>
          </button>
          <div
            :class="[
              sections.actions ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100'
            ]"
          >
            <button @click="goTo('record')" :class="navClass('record')">New Transaction</button>
          </div>
        </div>

        <div class="space-y-1">
          <button
            @click="toggleSection('system')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            System
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': sections.system }">▼</span>
          </button>
          <div
            :class="[
              sections.system ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100'
            ]"
          >
            <button @click="goTo('profile')" :class="navClass('profile')">Account Profile</button>
            <button @click="goTo('settings')" :class="navClass('settings')">Settings</button>
          </div>
        </div>
      </nav>

      <div class="border-t border-slate-100 bg-slate-900 px-6 py-5 text-white">
        <p class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1">Authenticated as</p>
        <p class="text-sm font-semibold tracking-tight">{{ userDisplayName }}</p>
        <button
          @click="logout"
          class="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition"
        >
          Logout
        </button>
      </div>
    </aside>

    <main class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1">
      <header class="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600"
            @click="mobileSidebarOpen = true"
          >
            <span class="text-sm">☰</span> Menu
          </button>
          <p class="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] mb-2">Planning</p>
          <h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900">Goals Planner</h3>
        </div>

        <button
          @click="showAddForm = !showAddForm"
          class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
        >
          + Add Goal
        </button>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-slate-100">
          <p class="text-[9px] text-slate-400 uppercase tracking-widest">Active Goals</p>
          <p class="text-2xl font-light mt-1">{{ activeGoals }}</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-100">
          <p class="text-[9px] text-slate-400 uppercase tracking-widest">Completed</p>
          <p class="text-2xl font-light mt-1">{{ completedGoals }}</p>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-100">
          <p class="text-[9px] text-slate-400 uppercase tracking-widest">Total Target</p>
          <p class="text-2xl font-light mt-1">฿ {{ totalTargetAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</p>
        </div>
      </div>

      <div v-if="showAddForm" class="bg-white border border-slate-100 rounded-3xl p-6 mb-8">
        <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Create Goal</h4>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="createGoal">
          <input v-model.trim="newGoal.name" placeholder="Goal name" class="px-4 py-3 rounded-xl border border-slate-200 text-sm" required />

          <select v-model="newGoal.type" class="px-4 py-3 rounded-xl border border-slate-200 text-sm" required>
            <option value="savings">Savings</option>
            <option value="debt_payoff">Debt Payoff</option>
          </select>

          <input v-model.number="newGoal.target_amount" type="number" step="0.01" min="0" placeholder="Target amount" class="px-4 py-3 rounded-xl border border-slate-200 text-sm" required />
          <input v-model.number="newGoal.start_amount" type="number" step="0.01" min="0" placeholder="Start amount" class="px-4 py-3 rounded-xl border border-slate-200 text-sm" />

          <input v-model="newGoal.start_date" type="date" class="px-4 py-3 rounded-xl border border-slate-200 text-sm" />
          <input v-model="newGoal.target_date" type="date" class="px-4 py-3 rounded-xl border border-slate-200 text-sm" />

          <div class="md:col-span-2 flex items-center gap-2">
            <input id="goal-auto-tracking" v-model="newGoal.auto_tracking" type="checkbox" />
            <label for="goal-auto-tracking" class="text-sm text-slate-700">Auto tracking</label>
          </div>

          <template v-if="newGoal.auto_tracking">
            <select v-model="newGoal.tracking_source_type" class="px-4 py-3 rounded-xl border border-slate-200 text-sm">
              <option value="">Select tracking source</option>
              <option value="all_wallets">All Wallets</option>
              <option value="wallet">Specific Wallet</option>
              <option value="loan">Specific Loan</option>
            </select>

            <select
              v-model="newGoal.tracking_source_id"
              :disabled="newGoal.tracking_source_type !== 'wallet' && newGoal.tracking_source_type !== 'loan'"
              class="px-4 py-3 rounded-xl border border-slate-200 text-sm disabled:bg-slate-100"
            >
              <option value="">Select source item</option>
              <option
                v-for="item in trackingSourceItems"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </template>

          <div class="md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" class="px-5 py-2 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-widest" @click="showAddForm = false">Cancel</button>
            <button type="submit" :disabled="saving" class="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-widest disabled:opacity-60">Save Goal</button>
          </div>
        </form>
      </div>

      <div class="flex items-center gap-3 mb-5">
        <select v-model="statusFilter" class="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
          <option value="archived">Archived</option>
        </select>

        <select v-model="typeFilter" class="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white">
          <option value="all">All Types</option>
          <option value="savings">Savings</option>
          <option value="debt_payoff">Debt Payoff</option>
        </select>

        <button class="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white" @click="void loadGoals()">Refresh</button>
      </div>

      <div v-if="loading" class="text-sm text-slate-500">Loading goals...</div>
      <div v-else-if="goals.length === 0" class="bg-white border border-slate-100 rounded-3xl p-10 text-center text-sm text-slate-400">
        No goals found.
      </div>

      <div v-else class="space-y-4 pb-10">
        <div v-for="goal in goals" :key="goal.id" class="bg-white border border-slate-100 rounded-3xl p-6">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <p class="text-lg font-semibold text-slate-900">{{ goal.name }}</p>
              <p class="text-xs text-slate-500 uppercase tracking-wider mt-1">{{ goal.type.replace('_', ' ') }} • {{ goal.status }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-slate-400">Progress</p>
              <p class="text-sm font-semibold text-slate-800">{{ progressPercent(goal).toFixed(1) }}%</p>
            </div>
          </div>

          <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div class="h-full bg-emerald-500" :style="{ width: `${Math.min(100, progressPercent(goal))}%` }"></div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <p>Target: <span class="font-semibold">฿ {{ goal.targetAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</span></p>
            <p>Current: <span class="font-semibold">฿ {{ goal.currentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</span></p>
            <p>Date: <span class="font-semibold">{{ goal.targetDate || '-' }}</span></p>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <button
              class="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-widest"
              @click="startEditGoal(goal)"
            >Edit</button>
            <button
              class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest"
              @click="openGoalDetail(goal.id)"
            >Detail</button>
            <button
              v-if="goal.status !== 'completed'"
              class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest"
              @click="updateGoalStatus(goal.id, 'completed')"
            >Mark Complete</button>
            <button
              v-if="goal.status !== 'paused'"
              class="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest"
              @click="updateGoalStatus(goal.id, 'paused')"
            >Pause</button>
            <button
              v-if="goal.status !== 'archived'"
              class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-widest"
              @click="updateGoalStatus(goal.id, 'archived')"
            >Archive</button>
            <button
              class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-widest"
              @click="requestDeleteGoal(goal.id)"
            >Delete</button>
          </div>

          <form
            v-if="editingGoalID === goal.id"
            class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
            @submit.prevent="saveEditedGoal"
          >
            <input
              v-model.trim="editGoal.name"
              placeholder="Goal name"
              class="px-3 py-2 rounded-lg border border-slate-200 text-sm"
              required
            />
            <select
              v-model="editGoal.status"
              class="px-3 py-2 rounded-lg border border-slate-200 text-sm"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
              <option value="archived">Archived</option>
            </select>

            <input
              v-model.number="editGoal.target_amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="Target amount"
              class="px-3 py-2 rounded-lg border border-slate-200 text-sm"
              required
            />
            <input
              v-model.number="editGoal.current_amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="Current amount"
              class="px-3 py-2 rounded-lg border border-slate-200 text-sm"
            />

            <input
              v-model="editGoal.target_date"
              type="date"
              class="px-3 py-2 rounded-lg border border-slate-200 text-sm"
            />

            <div class="md:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                class="px-4 py-2 rounded-lg border border-slate-200 text-[10px] font-bold uppercase tracking-widest"
                @click="cancelEditGoal"
              >Cancel</button>
              <button
                type="submit"
                class="px-4 py-2 rounded-lg bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest"
              >Save</button>
            </div>
          </form>
        </div>
      </div>

      <div v-if="toastMessage" class="fixed top-6 right-6 z-[70] rounded-2xl border bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-widest shadow-2xl" :class="toastType === 'error' ? 'border-rose-200 text-rose-600' : 'border-emerald-200 text-emerald-600'">
        {{ toastMessage }}
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

    <AppConfirmModal
      :open="deleteConfirmOpen"
      title="Confirm Delete"
      description="Delete this goal?"
      confirm-label="Delete"
      cancel-label="Cancel"
      @update:open="deleteConfirmOpen = false"
      @confirm="confirmDeleteGoal"
      @cancel="deleteConfirmOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useSidebarNavigation } from "../../composables/useSidebarNavigation";
import { useAuthApi } from "../../composables/useAuthApi";

type GoalType = "savings" | "debt_payoff";
type GoalStatus = "active" | "completed" | "paused" | "archived";
type GoalTrackingSourceType = "wallet" | "all_wallets" | "loan";

type GoalItem = {
  id: string;
  name: string;
  type: GoalType;
  targetAmount: number;
  startAmount: number;
  currentAmount: number;
  targetDate: string;
  status: GoalStatus;
  autoTracking: boolean;
};

type WalletItem = { id: string; name: string; balance: number };
type LoanItem = { id: string; name: string; remainingBalance: number };

const mobileSidebarOpen = ref(false);
const router = useRouter();
const {
  currentPath,
  sections,
  toggleSection,
  goTo,
  logout,
  logoutConfirmOpen,
  confirmLogout,
  cancelLogout,
  userDisplayName,
} = useSidebarNavigation({
  mobileMaxWidth: 1024,
  onCloseSidebar: () => {
    mobileSidebarOpen.value = false;
  },
});

const navClass = (key: string) =>
  [
    "w-full text-left pl-4 pr-2 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-widest transition-all",
    currentPath.value === key
      ? "bg-slate-900 text-white"
      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
  ].join(" ");

const { listMyGoals, createMyGoal, updateMyGoal, deleteMyGoal, listMyWallets, listMyLoans } = useAuthApi();

const goals = ref<GoalItem[]>([]);
const wallets = ref<WalletItem[]>([]);
const loans = ref<LoanItem[]>([]);
const loading = ref(false);
const saving = ref(false);
const showAddForm = ref(false);

const statusFilter = ref<GoalStatus | "all">("all");
const typeFilter = ref<GoalType | "all">("all");

const deleteConfirmOpen = ref(false);
const pendingDeleteGoalID = ref("");
const editingGoalID = ref("");

const toastMessage = ref("");
const toastType = ref<"success" | "error">("success");
let toastTimer: ReturnType<typeof setTimeout> | null = null;

const showToast = (message: string, type: "success" | "error" = "success") => {
  toastType.value = type;
  toastMessage.value = message;
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  toastTimer = setTimeout(() => {
    toastMessage.value = "";
  }, 2400);
};

const newGoal = reactive({
  name: "",
  type: "savings" as GoalType,
  target_amount: 0,
  start_amount: 0,
  current_amount: 0,
  start_date: "",
  target_date: "",
  status: "active" as GoalStatus,
  auto_tracking: true,
  tracking_source_type: "all_wallets" as GoalTrackingSourceType | "",
  tracking_source_id: "",
});

const editGoal = reactive({
  name: "",
  target_amount: 0,
  current_amount: 0,
  target_date: "",
  status: "active" as GoalStatus,
});

const trackingSourceItems = computed(() => {
  if (newGoal.tracking_source_type === "wallet") {
    return wallets.value.map((wallet) => ({
      label: `${wallet.name} (฿${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })})`,
      value: wallet.id,
    }));
  }

  if (newGoal.tracking_source_type === "loan") {
    return loans.value.map((loan) => ({
      label: `${loan.name} (฿${loan.remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })})`,
      value: loan.id,
    }));
  }

  return [];
});

const activeGoals = computed(() => goals.value.filter((goal) => goal.status === "active").length);
const completedGoals = computed(() => goals.value.filter((goal) => goal.status === "completed").length);
const totalTargetAmount = computed(() => goals.value.reduce((acc, goal) => acc + goal.targetAmount, 0));

const progressPercent = (goal: GoalItem) => {
  if (goal.targetAmount <= 0) {
    return 0;
  }

  return (goal.currentAmount / goal.targetAmount) * 100;
};

const loadGoals = async () => {
  loading.value = true;
  try {
    const res = await listMyGoals({
      page: 1,
      size: 300,
      status: statusFilter.value === "all" ? undefined : statusFilter.value,
      type: typeFilter.value === "all" ? undefined : typeFilter.value,
    });

    goals.value = (res.items || []).map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      targetAmount: Number(item.target_amount || 0),
      startAmount: Number(item.start_amount || 0),
      currentAmount: Number(item.current_amount || 0),
      targetDate: item.target_date || "",
      status: item.status,
      autoTracking: Boolean(item.auto_tracking),
    }));
  } catch {
    showToast("Failed to load goals", "error");
  } finally {
    loading.value = false;
  }
};

const loadTrackingSources = async () => {
  try {
    const [walletRes, loanRes] = await Promise.all([
      listMyWallets({ page: 1, size: 200, isActive: true }),
      listMyLoans({ page: 1, size: 200 }),
    ]);

    wallets.value = (walletRes.items || []).map((item) => ({
      id: item.id,
      name: item.name,
      balance: Number(item.balance || 0),
    }));

    loans.value = (loanRes.items || []).map((item) => ({
      id: item.id,
      name: item.name,
      remainingBalance: Number(item.remaining_balance || 0),
    }));
  } catch {
    showToast("Failed to load tracking sources", "error");
  }
};

const resetGoalForm = () => {
  newGoal.name = "";
  newGoal.type = "savings";
  newGoal.target_amount = 0;
  newGoal.start_amount = 0;
  newGoal.current_amount = 0;
  newGoal.start_date = "";
  newGoal.target_date = "";
  newGoal.status = "active";
  newGoal.auto_tracking = true;
  newGoal.tracking_source_type = "all_wallets";
  newGoal.tracking_source_id = "";
};

const createGoal = async () => {
  if (!newGoal.name.trim()) {
    showToast("Goal name is required", "error");
    return;
  }

  if (newGoal.target_amount < 0) {
    showToast("Target amount is invalid", "error");
    return;
  }

  if (
    newGoal.auto_tracking &&
    (newGoal.tracking_source_type === "wallet" || newGoal.tracking_source_type === "loan") &&
    !newGoal.tracking_source_id
  ) {
    showToast("Please select a tracking source", "error");
    return;
  }

  saving.value = true;
  try {
    await createMyGoal({
      name: newGoal.name.trim(),
      type: newGoal.type,
      target_amount: Number(newGoal.target_amount || 0),
      start_amount: Number(newGoal.start_amount || 0),
      current_amount: Number(newGoal.current_amount || 0),
      start_date: newGoal.start_date || undefined,
      target_date: newGoal.target_date || undefined,
      status: newGoal.status,
      auto_tracking: newGoal.auto_tracking,
      tracking_source_type: newGoal.auto_tracking && newGoal.tracking_source_type
        ? newGoal.tracking_source_type
        : undefined,
      tracking_source_id: newGoal.auto_tracking ? newGoal.tracking_source_id || undefined : undefined,
    });

    showToast("Goal created", "success");
    resetGoalForm();
    showAddForm.value = false;
    await loadGoals();
  } catch {
    showToast("Failed to create goal", "error");
  } finally {
    saving.value = false;
  }
};

const updateGoalStatus = async (goalID: string, status: GoalStatus) => {
  try {
    await updateMyGoal(goalID, { status });
    goals.value = goals.value.map((goal) =>
      goal.id === goalID ? { ...goal, status } : goal,
    );
    showToast("Goal updated", "success");
  } catch {
    showToast("Failed to update goal", "error");
  }
};

const startEditGoal = (goal: GoalItem) => {
  editingGoalID.value = goal.id;
  editGoal.name = goal.name;
  editGoal.target_amount = goal.targetAmount;
  editGoal.current_amount = goal.currentAmount;
  editGoal.target_date = goal.targetDate;
  editGoal.status = goal.status;
};

const cancelEditGoal = () => {
  editingGoalID.value = "";
};

const saveEditedGoal = async () => {
  if (!editingGoalID.value) {
    return;
  }

  if (!editGoal.name.trim()) {
    showToast("Goal name is required", "error");
    return;
  }

  if (editGoal.target_amount < 0 || editGoal.current_amount < 0) {
    showToast("Amount must be non-negative", "error");
    return;
  }

  try {
    await updateMyGoal(editingGoalID.value, {
      name: editGoal.name.trim(),
      target_amount: Number(editGoal.target_amount || 0),
      current_amount: Number(editGoal.current_amount || 0),
      target_date: editGoal.target_date || undefined,
      status: editGoal.status,
    });

    goals.value = goals.value.map((goal) =>
      goal.id === editingGoalID.value
        ? {
            ...goal,
            name: editGoal.name.trim(),
            targetAmount: Number(editGoal.target_amount || 0),
            currentAmount: Number(editGoal.current_amount || 0),
            targetDate: editGoal.target_date || "",
            status: editGoal.status,
          }
        : goal,
    );

    editingGoalID.value = "";
    showToast("Goal updated", "success");
  } catch {
    showToast("Failed to save goal", "error");
  }
};

const requestDeleteGoal = (goalID: string) => {
  pendingDeleteGoalID.value = goalID;
  deleteConfirmOpen.value = true;
};

const openGoalDetail = (goalID: string) => {
  void router.push(`/goal/${goalID}`);
};

const confirmDeleteGoal = async () => {
  const goalID = pendingDeleteGoalID.value;
  deleteConfirmOpen.value = false;

  if (!goalID) {
    return;
  }

  try {
    await deleteMyGoal(goalID);
    goals.value = goals.value.filter((goal) => goal.id !== goalID);
    showToast("Goal deleted", "success");
  } catch {
    showToast("Failed to delete goal", "error");
  } finally {
    pendingDeleteGoalID.value = "";
  }
};

watch([statusFilter, typeFilter], () => {
  void loadGoals();
});

watch(
  () => newGoal.auto_tracking,
  (enabled) => {
    if (!enabled) {
      newGoal.tracking_source_type = "";
      newGoal.tracking_source_id = "";
    }
  },
);

watch(
  () => newGoal.tracking_source_type,
  () => {
    newGoal.tracking_source_id = "";
  },
);

onMounted(async () => {
  await Promise.all([loadGoals(), loadTrackingSources()]);
});
</script>

<style scoped>
.mesh-gradient {
  background-image:
    radial-gradient(circle at 18% 20%, rgba(16, 185, 129, 0.13), transparent 40%),
    radial-gradient(circle at 84% 16%, rgba(14, 165, 233, 0.14), transparent 45%),
    radial-gradient(circle at 70% 78%, rgba(148, 163, 184, 0.12), transparent 42%);
}
</style>
