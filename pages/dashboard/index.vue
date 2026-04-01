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
        'bg-white border-r border-slate-200 shadow-[8px_0_24px_rgba(15,23,42,0.06)] flex flex-col z-20 transition-all duration-300 ease-out',
        'fixed inset-y-0 left-0',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full min-[1025px]:translate-x-0',
        sidebarCollapsed ? 'min-[1025px]:w-20' : 'min-[1025px]:w-64',
        'w-64'
      ]"
    >
      <div :class="['relative px-7 py-8', sidebarCollapsed ? 'px-3' : '']">
        <button
          class="inline-flex min-[1025px]:hidden absolute top-5 right-4 h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
          aria-label="Close sidebar"
          @click="mobileSidebarOpen = false"
        >
          <span class="text-base">×</span>
        </button>
        <button
          :class="[
            'hidden min-[1025px]:inline-flex absolute top-5 right-4 items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition',
            sidebarCollapsed ? 'h-7 w-7' : 'h-8 w-8'
          ]"
          :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          @click="sidebarCollapsed = !sidebarCollapsed"
        >
          <span class="text-sm">{{ sidebarCollapsed ? '→' : '←' }}</span>
        </button>
        <div :class="['flex', sidebarCollapsed ? 'flex-col items-center gap-3' : 'items-start']">
          <div>
            <h1
              v-if="!sidebarCollapsed"
              class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1"
            >
              Archive
            </h1>
            <h2
              v-if="!sidebarCollapsed"
              class="text-2xl font-light tracking-tighter text-slate-900 uppercase"
            >
              Balance
            </h2>
            <div
              v-else
              class="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold"
            >
              B
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Accordion -->
      <nav :class="['flex-1 px-4 space-y-2 overflow-hidden', sidebarCollapsed ? 'px-2' : '']">
        <!-- Section: Overview -->
        <div class="space-y-1">
          <button
            @click="sidebarCollapsed ? goTo('dashboard') : toggleSection('overview')"
            :class="[
              'w-full flex items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors',
              sidebarCollapsed ? 'justify-center' : 'justify-between'
            ]"
          >
            <span class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 13h8V3H3v10zm10 8h8v-6h-8v6zM13 3v8h8V3h-8zM3 21h8v-6H3v6z" />
              </svg>
              <span :class="sidebarCollapsed ? 'hidden' : ''">Overview</span>
            </span>
            <span
              v-if="!sidebarCollapsed"
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
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100',
              sidebarCollapsed ? 'hidden' : ''
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
            @click="sidebarCollapsed ? goTo('wallets') : toggleSection('management')"
            :class="[
              'w-full flex items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors',
              sidebarCollapsed ? 'justify-center' : 'justify-between'
            ]"
          >
            <span class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 7h16M4 12h16M4 17h10" />
              </svg>
              <span :class="sidebarCollapsed ? 'hidden' : ''">Management</span>
            </span>
            <span
              v-if="!sidebarCollapsed"
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
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100',
              sidebarCollapsed ? 'hidden' : ''
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
            @click="sidebarCollapsed ? goTo('record') : toggleSection('actions')"
            :class="[
              'w-full flex items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors',
              sidebarCollapsed ? 'justify-center' : 'justify-between'
            ]"
          >
            <span class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 5v14M5 12h14" />
              </svg>
              <span :class="sidebarCollapsed ? 'hidden' : ''">Entry</span>
            </span>
            <span
              v-if="!sidebarCollapsed"
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
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100',
              sidebarCollapsed ? 'hidden' : ''
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
            @click="sidebarCollapsed ? goTo('settings') : toggleSection('system')"
            :class="[
              'w-full flex items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors',
              sidebarCollapsed ? 'justify-center' : 'justify-between'
            ]"
          >
            <span class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12h2m14 0h2M12 3v2m0 14v2m-6.36-2.64l1.41-1.41m9.9-9.9l1.41-1.41m0 12.72l-1.41-1.41m-9.9-9.9L4.64 5.64" />
              </svg>
              <span :class="sidebarCollapsed ? 'hidden' : ''">System</span>
            </span>
            <span
              v-if="!sidebarCollapsed"
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
              'overflow-hidden transition-all duration-300 ease-out space-y-1 ml-4 border-l border-slate-100',
              sidebarCollapsed ? 'hidden' : ''
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
      <div :class="['border-t border-slate-100 bg-slate-900 text-white px-6 py-5', sidebarCollapsed ? 'px-3' : '']">
        <p v-if="!sidebarCollapsed" class="text-[9px] uppercase tracking-[0.2em] text-slate-300 mb-1">
          Authenticated as
        </p>
        <p class="text-sm font-semibold tracking-tight" :class="sidebarCollapsed ? 'text-center' : ''">
          {{ sidebarCollapsed ? userInitials : userDisplayName }}
        </p>
        <button
          @click="logout"
          :class="[
            'mt-4 inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition',
            sidebarCollapsed ? 'w-full px-0 py-2' : 'w-full px-4 py-2'
          ]"
        >
          <span :class="sidebarCollapsed ? 'hidden' : ''">Logout</span>
          <span v-if="sidebarCollapsed">↪</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main
      class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300"
      :style="mainContentStyle"
    >
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
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <div class="flex justify-between items-center mb-7">
                <h4
                  class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  Monthly Performance
                </h4>
                <div class="flex space-x-4">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span
                      class="text-[9px] text-slate-400 uppercase tracking-widest"
                      >Income</span
                    >
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                    <span
                      class="text-[9px] text-slate-400 uppercase tracking-widest"
                      >Expense</span
                    >
                  </div>
                </div>
              </div>
              <div class="h-44 flex items-end justify-between px-2 gap-3">
                <div
                  v-for="(h, i) in [
                    40, 70, 45, 90, 65, 80, 50, 60, 40, 85, 30, 95,
                  ]"
                  :key="i"
                  class="flex-1 group relative"
                >
                  <div
                    class="w-full bg-slate-50 rounded-t-xl transition-all group-hover:bg-indigo-50"
                    :style="{ height: h * 0.8 + '%' }"
                  ></div>
                  <div
                    class="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    :style="{ height: h * 0.5 + '%' }"
                  ></div>
                </div>
              </div>
              <div
                class="flex justify-between mt-6 px-2 text-[9px] text-slate-300 uppercase tracking-widest font-bold"
              >
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span
                ><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span
                ><span>Sep</span><span>Oct</span><span>Nov</span
                ><span>Dec</span>
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
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import { useTotalNetWorth } from "../../composables/useTotalNetWorth";
import { useSidebarNavigation } from "../../composables/useSidebarNavigation";

const sidebarCollapsed = ref(false);
const mobileSidebarOpen = ref(false);
const isDesktop = ref(false);
const DESKTOP_MIN_WIDTH = 1025;

const { currentPath, sections, toggleSection, goTo, logout, logoutConfirmOpen, confirmLogout, cancelLogout, userDisplayName, userInitials } = useSidebarNavigation({
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
const { totalNetWorth: totalNetWorthFromAPI, refreshTotalNetWorth } = useTotalNetWorth();

const mainContentStyle = computed(() => {
  if (!isDesktop.value) {
    return { marginLeft: "0px", width: "100%" };
  }

  const sidebarWidth = sidebarCollapsed.value ? 80 : 256;
  return {
    marginLeft: `${sidebarWidth}px`,
    width: `calc(100% - ${sidebarWidth}px)`,
  };
});

const syncResponsiveState = () => {
  if (typeof window === "undefined") {
    return;
  }

  isDesktop.value = window.innerWidth >= DESKTOP_MIN_WIDTH;

  if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
    mobileSidebarOpen.value = false;
  }
};

onMounted(() => {
  syncResponsiveState();
  window.addEventListener("resize", syncResponsiveState);
  void refreshTotalNetWorth();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", syncResponsiveState);
});

// Mock Data for Dashboard
const wallets = [
  { id: 1, name: "Main Savings", balance: 120000 },
  { id: 2, name: "Cash on Hand", balance: 2500 },
  { id: 3, name: "Investment Port", balance: 20000 },
];

const headerTotalNetWorth = computed(() => {
  const fallback = wallets.reduce((acc, curr) => acc + curr.balance, 0);
  return totalNetWorthFromAPI.value ?? fallback;
});

const recentTransactions = [
  {
    id: 1,
    category: "Food & Drink",
    note: "Starbucks Coffee",
    amount: 145,
    type: "expense",
    wallet: "Cash",
    date: "Today, 14:20",
  },
  {
    id: 2,
    category: "Salary",
    note: "Monthly Revenue",
    amount: 45000,
    type: "income",
    wallet: "Savings",
    date: "Yesterday",
  },
  {
    id: 3,
    category: "Transport",
    note: "Grab Ride",
    amount: 220,
    type: "expense",
    wallet: "Savings",
    date: "22 Oct",
  },
];

const activeBudgets = [
  { id: 1, category: "Dining Out", percent: 85 },
  { id: 2, category: "Entertainment", percent: 30 },
  { id: 3, category: "Shopping", percent: 92 },
];

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
</style>
