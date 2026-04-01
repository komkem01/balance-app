<template>
  <div class="min-h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-hidden">
    <!-- Mesh Background Layer -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="mesh-gradient absolute top-0 left-0 w-full h-full opacity-40"></div>
    </div>

    <!-- Sidebar Section -->
    <aside class="w-72 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-500">
      <div class="p-10">
        <h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1">Archive</h1>
        <h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase">Balance</h2>
      </div>

      <!-- Navigation Accordion -->
      <nav class="flex-1 px-6 space-y-2">
        <!-- Section: Overview -->
        <div class="space-y-1">
          <button 
            @click="toggleSection('overview')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Overview
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': sections.overview }">▼</span>
          </button>
          
          <div v-show="sections.overview" class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100">
            <button @click="currentPath = 'dashboard'" :class="navClass('dashboard')">Dashboard</button>
            <button @click="currentPath = 'history'" :class="navClass('history')">Transaction Ledger</button>
          </div>
        </div>

        <!-- Section: Management -->
        <div class="space-y-1">
          <button 
            @click="toggleSection('management')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Management
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': sections.management }">▼</span>
          </button>
          
          <div v-show="sections.management" class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100">
            <button @click="currentPath = 'wallets'" :class="navClass('wallets')">Wallets</button>
            <button @click="currentPath = 'categories'" :class="navClass('categories')">Categories</button>
            <button @click="currentPath = 'budgets'" :class="navClass('budgets')">Budgets</button>
          </div>
        </div>

        <!-- Section: Actions -->
        <div class="space-y-1">
          <button 
            @click="toggleSection('actions')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Entry
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': sections.actions }">▼</span>
          </button>
          
          <div v-show="sections.actions" class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100">
            <button @click="currentPath = 'record'" :class="navClass('record')">New Transaction</button>
          </div>
        </div>

        <!-- Section: System -->
        <div class="space-y-1">
          <button 
            @click="toggleSection('system')"
            class="w-full flex justify-between items-center px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            System
            <span class="text-[9px] transition-transform duration-300" :class="{ 'rotate-180': sections.system }">▼</span>
          </button>
          
          <div v-show="sections.system" class="overflow-hidden transition-all duration-300 space-y-1 ml-4 border-l border-slate-100">
            <button @click="currentPath = 'profile'" :class="navClass('profile')">Account Profile</button>
            <button @click="currentPath = 'settings'" :class="navClass('settings')">Settings</button>
          </div>
        </div>
      </nav>

      <!-- Footer User Info -->
      <div class="p-8 border-t border-slate-50">
        <p class="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Authenticated as</p>
        <p class="text-xs font-semibold text-slate-900">Johnathan Doe</p>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 relative z-10 overflow-y-auto p-12">
      <!-- Dynamic Header Based on currentPath -->
      <header class="mb-12 flex justify-between items-end">
        <div>
          <p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2">{{ currentPath }}</p>
          <h3 class="text-4xl font-light tracking-tighter text-slate-900">{{ pageTitle }}</h3>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-right">
            <p class="text-[9px] text-slate-400 uppercase tracking-widest">Total Balance</p>
            <p class="text-xl font-medium tracking-tight">฿ 142,500.00</p>
          </div>
        </div>
      </header>

      <!-- Content Views (Simulated RouterView) -->
      <div class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <!-- Dashboard Simulation -->
        <div v-if="currentPath === 'dashboard'" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="col-span-2 space-y-8">
            <!-- Summary Card -->
            <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Monthly Performance</h4>
              <div class="h-48 flex items-end justify-between px-4">
                <div v-for="h in [40, 70, 45, 90, 65, 80, 50]" :key="h" class="w-12 bg-slate-100 rounded-full transition-all hover:bg-indigo-500" :style="{ height: h + '%' }"></div>
              </div>
            </div>
            
            <!-- Recent Activity -->
            <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div class="flex justify-between items-center mb-8">
                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Recent Activity</h4>
                <button class="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">View All</button>
              </div>
              <div class="space-y-6">
                <div v-for="i in 3" :key="i" class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0">
                  <div>
                    <p class="text-sm font-medium">Starbucks Coffee</p>
                    <p class="text-[10px] text-slate-400 uppercase tracking-widest">Food & Drink • 14:20 PM</p>
                  </div>
                  <p class="text-sm font-semibold text-rose-500">- 145.00</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Column -->
          <div class="space-y-8">
            <!-- Wallet List Snapshot -->
            <div class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
              <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Active Wallets</h4>
              <div class="space-y-6">
                <div>
                  <p class="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Savings Account</p>
                  <p class="text-lg tracking-tight">฿ 120,000.00</p>
                </div>
                <div class="pt-4 border-t border-white/10">
                  <p class="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Cash</p>
                  <p class="text-lg tracking-tight">฿ 2,500.00</p>
                </div>
              </div>
            </div>

            <!-- Budget Alert -->
            <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Budget Alert</h4>
              <p class="text-sm text-slate-600 mb-4">You have reached 85% of your <span class="font-bold text-slate-900">Dining Out</span> budget.</p>
              <div class="w-full bg-slate-50 h-1 rounded-full overflow-hidden">
                <div class="bg-indigo-500 h-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Placeholder for other pages -->
        <div v-else class="min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
          <div class="text-center">
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-2">Module Loaded</p>
            <p class="text-slate-400 font-light">The {{ pageTitle }} interface is ready for integration.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const currentPath = ref('dashboard')

// Accordion States
const sections = reactive({
  overview: true,
  management: true,
  actions: false,
  system: false
})

const toggleSection = (section: keyof typeof sections) => {
  sections[section] = !sections[section]
}

const pageTitle = computed(() => {
  switch (currentPath.value) {
    case 'dashboard': return 'Account Overview'
    case 'history': return 'Transaction Ledger'
    case 'wallets': return 'Asset Management'
    case 'categories': return 'Taxonomy Settings'
    case 'budgets': return 'Budget Allocation'
    case 'record': return 'New Entry'
    case 'profile': return 'User Identity'
    case 'settings': return 'System Preferences'
    default: return 'Overview'
  }
})

const navClass = (path: string) => {
  const base = "w-full text-left px-4 py-2.5 text-[11px] uppercase tracking-widest transition-all duration-300 rounded-lg "
  return currentPath.value === path 
    ? base + "bg-slate-900 text-white font-bold translate-x-1" 
    : base + "text-slate-400 hover:text-slate-900 hover:translate-x-1"
}

const handleLogin = () => {
  // Logic simulate
}
</script>

<style scoped>
.mesh-gradient {
  background-color: #f8fafc;
  background-image: 
    radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.08) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.08) 0px, transparent 50%);
}

/* Hide scrollbar but keep functionality */
aside::-webkit-scrollbar {
  display: none;
}

.premium-card {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Transitions */
.fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>