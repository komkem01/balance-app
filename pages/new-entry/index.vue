<template>
  <div
    class="min-h-screen flex bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden"
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
        'w-72 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col z-20 relative transition-all duration-300 ease-out',
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
      <nav class="flex-1 px-6 space-y-2 overflow-y-auto">
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
      <div class="p-8 border-t border-slate-50">
        <p class="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
          Authenticated as
        </p>
        <p class="text-xs font-semibold text-slate-900">Johnathan Doe</p>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="relative z-10 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1">
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
          <div class="text-right">
            <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">
              Total Net Worth
            </p>
            <p class="text-2xl font-medium tracking-tight">
              ฿
              {{
                totalNetWorth.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })
              }}
            </p>
          </div>
          <button
            v-if="currentPath !== 'record'"
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
              <div class="h-56 flex items-end justify-between px-2 gap-4">
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

            <!-- Recent Activity List Snapshot -->
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
              <div class="space-y-6">
                <div
                  v-for="item in recentTransactionsSnapshot"
                  :key="item.id"
                  class="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0"
                >
                  <div class="flex items-center space-x-4">
                    <div
                      class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400"
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

          <!-- Right Column: Wallets & Budgets Snapshot -->
          <div class="space-y-8">
            <div
              class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              <h4
                class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8"
              >
                Active Wallets
              </h4>
              <div class="space-y-8">
                <div
                  v-for="wallet in wallets.slice(0, 3)"
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
                class="w-full mt-10 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Manage Assets
              </button>
            </div>

            <div
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <h4
                class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8"
              >
                Budget Status
              </h4>
              <div class="space-y-8">
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

        <!-- New Transaction Entry View -->
        <div
          v-else-if="currentPath === 'record'"
          class="max-w-3xl mx-auto space-y-8"
        >
          <div
            class="bg-white p-12 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden"
          >
            <h4
              class="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 text-center"
            >
              Execute New Transaction
            </h4>

            <form @submit.prevent="confirmSubmitTransaction" class="space-y-10">
              <!-- Type Toggle (Income / Expense) -->
              <div
                class="flex p-1.5 bg-slate-50 rounded-[2rem] max-w-sm mx-auto"
              >
                <button
                  type="button"
                  @click="newRecord.type = 'expense'"
                  :class="[
                    'flex-1 py-4 rounded-[1.8rem] text-[10px] font-bold uppercase tracking-widest transition-all',
                    newRecord.type === 'expense'
                      ? 'bg-white shadow-sm text-rose-500'
                      : 'text-slate-400 hover:text-slate-600',
                  ]"
                >
                  Expense
                </button>
                <button
                  type="button"
                  @click="newRecord.type = 'income'"
                  :class="[
                    'flex-1 py-4 rounded-[1.8rem] text-[10px] font-bold uppercase tracking-widest transition-all',
                    newRecord.type === 'income'
                      ? 'bg-white shadow-sm text-emerald-500'
                      : 'text-slate-400 hover:text-slate-600',
                  ]"
                >
                  Income
                </button>
              </div>

              <!-- Amount Input (Large) -->
              <div class="text-center space-y-4">
                <label
                  class="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]"
                  >Monetary Value</label
                >
                <div class="flex items-center justify-center space-x-4">
                  <span class="text-2xl font-light text-slate-300">฿</span>
                  <input
                    v-model.number="newRecord.amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="bg-transparent text-6xl font-light tracking-tighter text-slate-900 focus:outline-none w-full max-w-xs text-center"
                    required
                  />
                </div>
              </div>

              <!-- Selection Inputs -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="space-y-3">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Archive Source (Wallet)</label
                  >
                  <select
                    v-model="newRecord.wallet_id"
                    class="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm appearance-none"
                    required
                  >
                    <option value="" disabled>Select Wallet</option>
                    <option v-for="w in wallets" :key="w.id" :value="w.id">
                      {{ w.name }} (฿{{ w.balance.toLocaleString() }})
                    </option>
                  </select>
                </div>

                <div class="space-y-3">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Taxonomy (Category)</label
                  >
                  <select
                    v-model="newRecord.category_id"
                    class="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm appearance-none"
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    <option
                      v-for="c in categories.filter(
                        (cat) => cat.type === newRecord.type,
                      )"
                      :key="c.id"
                      :value="c.id"
                    >
                      {{ c.name }}
                    </option>
                  </select>
                </div>

                <div class="space-y-3">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Transaction Date</label
                  >
                  <input
                    v-model="newRecord.date"
                    type="date"
                    class="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                    required
                  />
                </div>

                <div class="space-y-3">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Identifier (Note)</label
                  >
                  <input
                    v-model="newRecord.note"
                    type="text"
                    placeholder="Brief description..."
                    class="w-full px-8 py-5 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  />
                </div>
              </div>

              <!-- Submit Button -->
              <div class="pt-6">
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-xs font-bold uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
                >
                  <span v-if="!loading">Confirm Transaction</span>
                  <div
                    v-else
                    class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"
                  ></div>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Wallets View (Asset Management) -->
        <div
          v-else-if="currentPath === 'wallets'"
          class="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <!-- Create Wallet Form -->
          <div class="space-y-8">
            <div
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <h4
                class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8"
              >
                Register New Asset
              </h4>
              <form @submit.prevent="confirmAddWallet" class="space-y-6">
                <div class="space-y-2">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Asset Name</label
                  >
                  <input
                    v-model="newWallet.name"
                    type="text"
                    placeholder="E.g. Commercial Bank A"
                    class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Initial Balance</label
                  >
                  <input
                    v-model.number="newWallet.balance"
                    type="number"
                    placeholder="0.00"
                    class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Currency Code</label
                  >
                  <select
                    v-model="newWallet.currency"
                    class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm appearance-none"
                  >
                    <option value="THB">THB - Thai Baht</option>
                    <option value="USD">USD - US Dollar</option>
                  </select>
                </div>
                <button
                  type="submit"
                  class="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all mt-4"
                >
                  Archive Asset
                </button>
              </form>
            </div>
          </div>

          <!-- Wallets Inventory -->
          <div class="space-y-8">
            <div
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]"
            >
              <h4
                class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-7"
              >
                Asset Inventory
              </h4>
              <div class="space-y-4">
                <div
                  v-for="wallet in wallets"
                  :key="wallet.id"
                  class="group p-8 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50 flex justify-between items-center"
                >
                  <div>
                    <p
                      class="text-[9px] text-slate-400 uppercase tracking-widest mb-1"
                    >
                      {{ wallet.currency }}
                    </p>
                    <p
                      class="text-base font-medium text-slate-900 tracking-tight"
                    >
                      {{ wallet.name }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p
                      class="text-lg font-light tracking-tighter text-slate-900"
                    >
                      ฿
                      {{
                        wallet.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </p>
                    <button
                      class="text-[9px] font-bold text-rose-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all mt-1"
                    >
                      Detach
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- History View (Transaction Ledger) -->
        <div v-else-if="currentPath === 'history'" class="space-y-8">
          <div
            class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
          >
            <!-- History Header/Filters -->
            <div
              class="p-10 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6"
            >
              <div class="flex space-x-8">
                <button
                  class="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1"
                >
                  All Activity
                </button>
                <button
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1"
                >
                  Income
                </button>
                <button
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors pb-1"
                >
                  Expenses
                </button>
              </div>
              <div
                class="text-[10px] font-bold text-slate-300 uppercase tracking-widest"
              >
                Displaying {{ startIndex + 1 }}-{{
                  Math.min(endIndex, totalTransactions)
                }}
                of {{ totalTransactions }} Records
              </div>
            </div>

            <!-- History Table-like List -->
            <div class="divide-y divide-slate-50">
              <div
                v-for="item in paginatedTransactions"
                :key="item.id"
                class="px-10 py-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center"
              >
                <div class="flex items-center space-x-6">
                  <div
                    class="text-[10px] font-bold text-slate-300 uppercase tracking-tighter w-16"
                  >
                    {{ item.date.split(",")[0] }}
                  </div>
                  <div
                    class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500"
                  >
                    {{ item.category.substring(0, 1).toUpperCase() }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-slate-900">
                      {{ item.note || item.category }}
                    </p>
                    <p
                      class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5"
                    >
                      {{ item.category }} • {{ item.wallet }}
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p
                    :class="[
                      'text-sm font-semibold tracking-tight',
                      item.type === 'expense'
                        ? 'text-rose-500'
                        : 'text-emerald-500',
                    ]"
                  >
                    {{ item.type === "expense" ? "-" : "+" }}
                    {{
                      item.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })
                    }}
                  </p>
                  <p
                    class="text-[9px] text-slate-300 uppercase tracking-widest mt-1"
                  >
                    Confirmed
                  </p>
                </div>
              </div>
            </div>

            <!-- Pagination Controls -->
            <div
              class="p-10 border-t border-slate-50 flex justify-between items-center"
            >
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                Previous Archive
              </button>

              <div class="flex items-center space-x-6">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'text-[10px] font-bold transition-all',
                    currentPage === page
                      ? 'text-indigo-600 scale-125'
                      : 'text-slate-300 hover:text-slate-600',
                  ]"
                >
                  {{ page.toString().padStart(2, "0") }}
                </button>
              </div>

              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                Next Archive
              </button>
            </div>
          </div>
        </div>

        <!-- Categories View (Taxonomy Settings) -->
        <div
          v-else-if="currentPath === 'categories'"
          class="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <!-- Management Section -->
          <div class="space-y-8">
            <div
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <h4
                class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8"
              >
                Define New Taxonomy
              </h4>
              <form @submit.prevent="confirmAddCategory" class="space-y-6">
                <div class="space-y-2">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Label Name</label
                  >
                  <input
                    v-model="newCategory.name"
                    type="text"
                    placeholder="E.g. Digital Services"
                    class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Type Classification</label
                  >
                  <div class="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      @click="newCategory.type = 'income'"
                      :class="[
                        'py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all',
                        newCategory.type === 'income'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100',
                      ]"
                    >
                      Income
                    </button>
                    <button
                      type="button"
                      @click="newCategory.type = 'expense'"
                      :class="[
                        'py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all',
                        newCategory.type === 'expense'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100',
                      ]"
                    >
                      Expense
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4"
                >
                  Add Classification
                </button>
              </form>
            </div>

            <!-- Summary Stats -->
            <div
              class="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl"
            >
              <h4
                class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6"
              >
                Taxonomy Stats
              </h4>
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-3xl font-light tracking-tighter">
                    {{ categories.length }}
                  </p>
                  <p
                    class="text-[9px] text-slate-500 uppercase tracking-widest mt-1"
                  >
                    Total Classes
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium">
                    {{
                      categories.filter((c) => c.type === "expense").length
                    }}
                    Expenses
                  </p>
                  <p class="text-sm font-medium">
                    {{
                      categories.filter((c) => c.type === "income").length
                    }}
                    Income
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Listing Section -->
          <div class="space-y-8">
            <div
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]"
            >
              <div class="flex justify-between items-center mb-7">
                <h4
                  class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  Existing Archive
                </h4>
                <div class="flex space-x-4">
                  <button
                    @click="categoryFilter = 'all'"
                    :class="[
                      'text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all',
                      categoryFilter === 'all'
                        ? 'text-slate-900 border-slate-900'
                        : 'text-slate-300 border-transparent',
                    ]"
                  >
                    All
                  </button>
                  <button
                    @click="categoryFilter = 'income'"
                    :class="[
                      'text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all',
                      categoryFilter === 'income'
                        ? 'text-slate-900 border-slate-900'
                        : 'text-slate-300 border-transparent',
                    ]"
                  >
                    Income
                  </button>
                  <button
                    @click="categoryFilter = 'expense'"
                    :class="[
                      'text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all',
                      categoryFilter === 'expense'
                        ? 'text-slate-900 border-slate-900'
                        : 'text-slate-300 border-transparent',
                    ]"
                  >
                    Expense
                  </button>
                </div>
              </div>

              <div class="space-y-4">
                <div
                  v-for="cat in filteredCategories"
                  :key="cat.id"
                  class="group flex justify-between items-center p-6 bg-slate-50 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50"
                >
                  <div class="flex items-center space-x-4">
                    <div
                      :class="[
                        'w-2 h-2 rounded-full',
                        cat.type === 'income'
                          ? 'bg-emerald-400'
                          : 'bg-rose-400',
                      ]"
                    ></div>
                    <span
                      class="text-sm font-medium text-slate-700 tracking-tight"
                      >{{ cat.name }}</span
                    >
                  </div>
                  <button
                    @click="confirmRemoveCategory(cat.id)"
                    class="text-[9px] font-bold text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Budgets View (Budget Allocation) -->
        <div
          v-else-if="currentPath === 'budgets'"
          class="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <!-- Create Budget Form -->
          <div class="space-y-8">
            <div
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <h4
                class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8"
              >
                Set Spending Constraint
              </h4>
              <form @submit.prevent="confirmAddBudget" class="space-y-6">
                <div class="space-y-2">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Target Taxonomy</label
                  >
                  <select
                    v-model="newBudget.category_id"
                    class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm appearance-none"
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    <option
                      v-for="cat in categories.filter(
                        (c) => c.type === 'expense',
                      )"
                      :key="cat.id"
                      :value="cat.id"
                    >
                      {{ cat.name }}
                    </option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Allocated Amount</label
                  >
                  <input
                    v-model.number="newBudget.amount"
                    type="number"
                    placeholder="0.00"
                    class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >Time Period</label
                  >
                  <div class="grid grid-cols-3 gap-4">
                    <button
                      v-for="p in ['daily', 'weekly', 'monthly']"
                      :key="p"
                      type="button"
                      @click="newBudget.period = p"
                      :class="[
                        'py-4 rounded-2xl text-[9px] font-bold uppercase tracking-widest transition-all',
                        newBudget.period === p
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100',
                      ]"
                    >
                      {{ p }}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  class="w-full py-5 bg-indigo-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all mt-4"
                >
                  Archive Budget
                </button>
              </form>
            </div>
          </div>

          <!-- Budgets List -->
          <div class="space-y-8">
            <div
              class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]"
            >
              <div class="flex justify-between items-center mb-7">
                <h4
                  class="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  Active Constraints
                </h4>
                <div class="flex space-x-4">
                  <button
                    @click="budgetPeriodFilter = 'all'"
                    :class="[
                      'text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all',
                      budgetPeriodFilter === 'all'
                        ? 'text-slate-900 border-slate-900'
                        : 'text-slate-300 border-transparent',
                    ]"
                  >
                    All
                  </button>
                  <button
                    @click="budgetPeriodFilter = 'monthly'"
                    :class="[
                      'text-[9px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-all',
                      budgetPeriodFilter === 'monthly'
                        ? 'text-slate-900 border-slate-900'
                        : 'text-slate-300 border-transparent',
                    ]"
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div class="space-y-8">
                <div
                  v-for="budget in filteredBudgets"
                  :key="budget.id"
                  class="space-y-4 group"
                >
                  <div class="flex justify-between items-end px-1">
                    <div>
                      <p
                        class="text-base font-medium text-slate-900 tracking-tight"
                      >
                        {{ getCategoryName(budget.category_id) }}
                      </p>
                      <p
                        class="text-[9px] text-slate-400 uppercase tracking-[0.2em] mt-0.5"
                      >
                        {{ budget.period }} Constraint
                      </p>
                    </div>
                    <div class="text-right">
                      <p
                        class="text-sm font-semibold tracking-tight text-slate-900"
                      >
                        ฿ {{ budget.spent.toLocaleString() }} /
                        {{ budget.amount.toLocaleString() }}
                      </p>
                      <p
                        class="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5"
                      >
                        {{ Math.round((budget.spent / budget.amount) * 100) }}%
                        Used
                      </p>
                    </div>
                  </div>
                  <div
                    class="w-full bg-slate-50 h-2 rounded-full overflow-hidden"
                  >
                    <div
                      :class="[
                        'h-full transition-all duration-1000',
                        budget.spent / budget.amount > 0.9
                          ? 'bg-rose-500'
                          : 'bg-slate-900',
                      ]"
                      :style="{
                        width:
                          Math.min(budget.spent / budget.amount, 1) * 100 + '%',
                      }"
                    ></div>
                  </div>
                  <div
                    class="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      @click="confirmRemoveBudget(budget.id)"
                      class="text-[9px] font-bold text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors"
                    >
                      Terminate
                    </button>
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

    <!-- Confirmation Modal -->
    <Transition name="fade">
      <div
        v-if="confirmModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
        @click="closeConfirmModal"
      >
        <div
          class="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl"
          @click.stop
        >
          <h4 class="text-sm font-bold uppercase tracking-widest text-slate-900">
            {{ confirmTitle }}
          </h4>
          <p class="mt-3 text-sm leading-relaxed text-slate-500">
            {{ confirmDescription }}
          </p>
          <div class="mt-8 flex justify-end gap-3">
            <button
              class="rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50"
              @click="closeConfirmModal"
            >
              Cancel
            </button>
            <button
              class="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800"
              @click="handleConfirmAction"
            >
              {{ confirmActionLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Success Message Overlay -->
    <Transition name="fade-slide">
      <div
        v-if="message"
        class="fixed top-6 right-6 px-8 py-4 bg-white border border-slate-100 shadow-2xl rounded-2xl text-[10px] font-bold tracking-widest text-slate-900 uppercase z-50"
      >
        {{ message }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useSidebarNavigation } from "../../composables/useSidebarNavigation";

const mobileSidebarOpen = ref(false);
const { currentPath, sections, toggleSection, goTo } = useSidebarNavigation({
  mobileMaxWidth: 1024,
  onCloseSidebar: () => {
    mobileSidebarOpen.value = false;
  },
});
const loading = ref(false);
const message = ref("");
const confirmModalOpen = ref(false);
const confirmTitle = ref("Confirm Action");
const confirmDescription = ref("");
const confirmActionLabel = ref("Confirm");
let pendingConfirmAction: null | (() => void | Promise<void>) = null;

const openConfirmModal = (
  title: string,
  description: string,
  actionLabel: string,
  action: () => void | Promise<void>,
) => {
  confirmTitle.value = title;
  confirmDescription.value = description;
  confirmActionLabel.value = actionLabel;
  pendingConfirmAction = action;
  confirmModalOpen.value = true;
};

const closeConfirmModal = () => {
  confirmModalOpen.value = false;
  pendingConfirmAction = null;
};

const handleConfirmAction = async () => {
  const action = pendingConfirmAction;
  closeConfirmModal();

  if (action) {
    await action();
  }
};

// Wallets State & Logic
const wallets = ref([
  { id: 1, name: "Main Savings", balance: 120000, currency: "THB" },
  { id: 2, name: "Cash on Hand", balance: 2500, currency: "THB" },
  { id: 3, name: "Investment Port", balance: 20000, currency: "THB" },
]);

const newWallet = reactive({
  name: "",
  balance: 0,
  currency: "THB",
});

const totalNetWorth = computed(() => {
  return wallets.value.reduce((acc, curr) => acc + curr.balance, 0);
});

const addWallet = () => {
  if (!newWallet.name) return;
  wallets.value.unshift({
    id: Date.now(),
    name: newWallet.name,
    balance: newWallet.balance,
    currency: newWallet.currency,
  });
  newWallet.name = "";
  newWallet.balance = 0;
};

const confirmAddWallet = () => {
  openConfirmModal("Confirm Save", "Save this wallet entry?", "Save", addWallet);
};

// Categories State & Logic
const categories = ref([
  { id: 1, name: "Food & Drink", type: "expense" },
  { id: 2, name: "Salary", type: "income" },
  { id: 3, name: "Transport", type: "expense" },
  { id: 4, name: "Freelance", type: "income" },
  { id: 5, name: "Subscription", type: "expense" },
  { id: 6, name: "Health", type: "expense" },
  { id: 7, name: "Dining Out", type: "expense" },
  { id: 8, name: "Entertainment", type: "expense" },
  { id: 9, name: "Shopping", type: "expense" },
]);

const categoryFilter = ref("all");
const newCategory = reactive({
  name: "",
  type: "expense",
});

const filteredCategories = computed(() => {
  if (categoryFilter.value === "all") return categories.value;
  return categories.value.filter((c) => c.type === categoryFilter.value);
});

const getCategoryName = (id: number) => {
  const cat = categories.value.find((c) => c.id === id);
  return cat ? cat.name : "Unknown";
};

const addCategory = () => {
  if (!newCategory.name) return;
  categories.value.unshift({
    id: Date.now(),
    name: newCategory.name,
    type: newCategory.type,
  });
  newCategory.name = "";
};

const removeCategory = (id: number) => {
  categories.value = categories.value.filter((cat) => cat.id !== id);
};

const confirmAddCategory = () => {
  openConfirmModal(
    "Confirm Save",
    "Save this category entry?",
    "Save",
    addCategory,
  );
};

const confirmRemoveCategory = (id: number) => {
  openConfirmModal("Confirm Delete", "Delete this category?", "Delete", () =>
    removeCategory(id),
  );
};

// Budgets State & Logic
const budgets = ref([
  { id: 1, category_id: 7, amount: 5000, spent: 4250, period: "monthly" },
  { id: 2, category_id: 8, amount: 2000, spent: 600, period: "monthly" },
  { id: 3, category_id: 9, amount: 3000, spent: 2760, period: "monthly" },
]);

const budgetPeriodFilter = ref("all");
const newBudget = reactive({
  category_id: "",
  amount: 0,
  period: "monthly",
});

const filteredBudgets = computed(() => {
  if (budgetPeriodFilter.value === "all") return budgets.value;
  return budgets.value.filter((b) => b.period === budgetPeriodFilter.value);
});

const addBudget = () => {
  if (!newBudget.category_id || !newBudget.amount) return;
  budgets.value.unshift({
    id: Date.now(),
    category_id: Number(newBudget.category_id),
    amount: newBudget.amount,
    spent: 0,
    period: newBudget.period,
  });
  newBudget.category_id = "";
  newBudget.amount = 0;
};

const removeBudget = (id: number) => {
  budgets.value = budgets.value.filter((budget) => budget.id !== id);
};

const confirmAddBudget = () => {
  openConfirmModal("Confirm Save", "Save this budget?", "Save", addBudget);
};

const confirmRemoveBudget = (id: number) => {
  openConfirmModal("Confirm Delete", "Delete this budget?", "Delete", () =>
    removeBudget(id),
  );
};

// Transaction Ledger (History) State & Logic
const allTransactions = ref([
  {
    id: 1,
    category: "Food & Drink",
    note: "Starbucks Coffee",
    amount: 145,
    type: "expense",
    wallet: "Cash",
    date: "2026-04-01",
  },
  {
    id: 2,
    category: "Salary",
    note: "Monthly Revenue",
    amount: 45000,
    type: "income",
    wallet: "Main Savings",
    date: "2026-03-31",
  },
  {
    id: 3,
    category: "Transport",
    note: "Grab Ride",
    amount: 220,
    type: "expense",
    wallet: "Main Savings",
    date: "2026-03-30",
  },
  {
    id: 4,
    category: "Shopping",
    note: "Uniqlo Store",
    amount: 1290,
    type: "expense",
    wallet: "Main Savings",
    date: "2026-03-29",
  },
  {
    id: 5,
    category: "Food & Drink",
    note: "Dinner at Shabu",
    amount: 850,
    type: "expense",
    wallet: "Cash",
    date: "2026-03-28",
  },
  {
    id: 6,
    category: "Freelance",
    note: "Logo Design Project",
    amount: 5000,
    type: "income",
    wallet: "Investment Port",
    date: "2026-03-27",
  },
]);

const recentTransactionsSnapshot = computed(() =>
  allTransactions.value.slice(0, 3),
);

// New Entry State & Logic
const newRecord = reactive({
  type: "expense",
  amount: null,
  wallet_id: "",
  category_id: "",
  date: new Date().toISOString().split("T")[0],
  note: "",
});

const submitTransaction = async () => {
  if (!newRecord.amount || !newRecord.wallet_id || !newRecord.category_id)
    return;

  loading.value = true;

  // Simulate API Call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const selectedWallet = wallets.value.find(
    (w) => w.id === Number(newRecord.wallet_id),
  );
    const selectedCategory = categories.value.find(
        (c) => c.id === Number(newRecord.category_id),
    );

  if (selectedWallet && selectedCategory) {
    // Update Wallet Balance
    if (newRecord.type === "expense") {
      selectedWallet.balance -= newRecord.amount;
    } else {
      selectedWallet.balance += newRecord.amount;
    }

    // Add to History
    allTransactions.value.unshift({
      id: Date.now(),
      category: selectedCategory.name,
      note: newRecord.note,
      amount: newRecord.amount,
      type: newRecord.type,
      wallet: selectedWallet.name,
      date: newRecord.date,
    });

    // Check and update Budget if it's an expense
    if (newRecord.type === "expense") {
      const budget = budgets.value.find(
        (b) => b.category_id === selectedCategory.id,
      );
      if (budget) budget.spent += newRecord.amount;
    }
  }

  loading.value = false;
  message.value = "Entry Archived Successfully";

  // Reset Form
  newRecord.amount = null;
  newRecord.note = "";

  setTimeout(() => {
    message.value = "";
    goTo("dashboard");
  }, 2000);
};

const confirmSubmitTransaction = () => {
  openConfirmModal(
    "Confirm Save",
    "Save this transaction record?",
    "Save",
    submitTransaction,
  );
};

const confirmUpdateProfile = () => {
  openConfirmModal(
    "Confirm Update",
    "Save profile changes?",
    "Update",
    () => {
      message.value = "Profile Updated Successfully";
      setTimeout(() => {
        message.value = "";
      }, 1800);
    },
  );
};

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 6;

const totalTransactions = computed(() => allTransactions.value.length);
const totalPages = computed(() =>
  Math.ceil(totalTransactions.value / itemsPerPage),
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => startIndex.value + itemsPerPage);

const paginatedTransactions = computed(() => {
  return allTransactions.value.slice(startIndex.value, endIndex.value);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Dashboard specific budget snapshot
const activeBudgets = computed(() => {
  return budgets.value.map((b) => ({
    id: b.id,
    category: getCategoryName(b.category_id),
    percent: Math.min(Math.round((b.spent / b.amount) * 100), 100),
  }));
});

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
      return "Execute Entry";
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

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
