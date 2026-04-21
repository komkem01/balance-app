<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 p-6 lg:p-10">
    <div class="max-w-5xl mx-auto space-y-6">
      <div class="flex items-center justify-between gap-3">
        <button
          class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600"
          @click="router.push('/goal')"
        >
          Back to Goals
        </button>

        <button
          class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600"
          @click="void loadGoalDetail()"
        >
          Refresh
        </button>
      </div>

      <div class="bg-white border border-slate-100 rounded-3xl p-6" v-if="goal">
        <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 mb-2">Goal Detail</p>
        <h1 class="text-3xl font-light tracking-tight">{{ goal.name }}</h1>
        <p class="text-xs text-slate-500 uppercase tracking-wider mt-1">{{ goal.type.replace('_', ' ') }} • {{ goal.status }}</p>

        <div class="mt-4 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500" :style="{ width: `${Math.min(100, progressPercent)}%` }"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-sm">
          <p>Target: <span class="font-semibold">฿ {{ goal.targetAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</span></p>
          <p>Current: <span class="font-semibold">฿ {{ goal.currentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</span></p>
          <p>Target Date: <span class="font-semibold">{{ goal.targetDate || '-' }}</span></p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section class="bg-white border border-slate-100 rounded-3xl p-6">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">History</h2>
          <div v-if="historyLoading" class="text-sm text-slate-400">Loading history...</div>
          <div v-else-if="historyItems.length === 0" class="text-sm text-slate-400">No history yet.</div>
          <ul v-else class="space-y-3">
            <li v-for="entry in historyItems" :key="entry.id" class="rounded-xl border border-slate-100 p-3">
              <div class="flex items-center justify-between gap-2">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-600">{{ entry.sourceType }}</p>
                <p class="text-[11px] text-slate-400">{{ formatDateTime(entry.createdAt) }}</p>
              </div>
              <p class="text-sm mt-1">{{ entry.note || '-' }}</p>
              <p class="text-xs text-slate-500 mt-1">
                {{ entry.amountBefore.toFixed(2) }} -> {{ entry.amountAfter.toFixed(2) }}
                (<span :class="entry.amountDelta >= 0 ? 'text-emerald-600' : 'text-rose-600'">{{ entry.amountDelta >= 0 ? '+' : '' }}{{ entry.amountDelta.toFixed(2) }}</span>)
              </p>
            </li>
          </ul>
        </section>

        <section class="bg-white border border-slate-100 rounded-3xl p-6">
          <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Notifications</h2>
          <div v-if="notificationsLoading" class="text-sm text-slate-400">Loading notifications...</div>
          <div v-else-if="notifications.length === 0" class="text-sm text-slate-400">No notifications yet.</div>
          <ul v-else class="space-y-3">
            <li v-for="item in notifications" :key="item.id" class="rounded-xl border border-slate-100 p-3">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-600">{{ item.type }} • {{ item.level }}</p>
              <p class="text-sm mt-1">{{ item.title }}</p>
              <p class="text-[11px] text-slate-500 mt-1">{{ item.description }}</p>
            </li>
          </ul>
        </section>
      </div>

      <div v-if="toastMessage" class="fixed top-6 right-6 z-[70] rounded-2xl border bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-widest shadow-2xl" :class="toastType === 'error' ? 'border-rose-200 text-rose-600' : 'border-emerald-200 text-emerald-600'">
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthApi } from "../../composables/useAuthApi";

type GoalType = "savings" | "debt_payoff";
type GoalStatus = "active" | "completed" | "paused" | "archived";

type GoalDetailItem = {
  id: string;
  name: string;
  type: GoalType;
  status: GoalStatus;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
};

type GoalHistoryItem = {
  id: string;
  sourceType: string;
  amountBefore: number;
  amountAfter: number;
  amountDelta: number;
  note: string;
  createdAt: string;
};

type NotificationItem = {
  id: string;
  type: string;
  level: string;
  title: string;
  description: string;
};

const route = useRoute();
const router = useRouter();
const {
  getMyGoal,
  listMyGoalEntries,
  listMyNotifications,
} = useAuthApi();

const goal = ref<GoalDetailItem | null>(null);
const historyItems = ref<GoalHistoryItem[]>([]);
const notifications = ref<NotificationItem[]>([]);

const historyLoading = ref(false);
const notificationsLoading = ref(false);

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
  }, 2200);
};

const goalID = computed(() => String(route.params.id || "").trim());
const progressPercent = computed(() => {
  if (!goal.value || goal.value.targetAmount <= 0) {
    return 0;
  }

  return (goal.value.currentAmount / goal.value.targetAmount) * 100;
});

const formatDateTime = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString();
};

const loadGoalDetail = async () => {
  if (!goalID.value) {
    return;
  }

  try {
    const res = await getMyGoal(goalID.value);
    goal.value = {
      id: res.data.id,
      name: res.data.name,
      type: res.data.type,
      status: res.data.status,
      targetAmount: Number(res.data.target_amount || 0),
      currentAmount: Number(res.data.current_amount || 0),
      targetDate: res.data.target_date || "",
    };
  } catch {
    showToast("Failed to load goal detail", "error");
  }
};

const loadGoalHistory = async () => {
  if (!goalID.value) {
    return;
  }

  historyLoading.value = true;
  try {
    const res = await listMyGoalEntries(goalID.value);
    historyItems.value = (res.items || []).map((item) => ({
      id: item.id,
      sourceType: item.source_type,
      amountBefore: Number(item.amount_before || 0),
      amountAfter: Number(item.amount_after || 0),
      amountDelta: Number(item.amount_delta || 0),
      note: item.note || "",
      createdAt: item.created_at,
    }));
  } catch {
    showToast("Failed to load goal history", "error");
  } finally {
    historyLoading.value = false;
  }
};

const loadNotifications = async () => {
  notificationsLoading.value = true;
  try {
    const res = await listMyNotifications({ includeRead: true, limit: 10 });
    notifications.value = (res.data || []).map((item) => ({
      id: item.id,
      type: item.type,
      level: item.level,
      title: item.title,
      description: item.description,
    }));
  } catch {
    showToast("Failed to load notifications", "error");
  } finally {
    notificationsLoading.value = false;
  }
};

onMounted(async () => {
  await Promise.all([loadGoalDetail(), loadGoalHistory(), loadNotifications()]);
});
</script>
