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
    <main class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1">
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
          <div class="text-right">
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
          <div class="space-y-8">
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
              <div class="space-y-8">
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
                class="w-full mt-10 py-3 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
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
                  @click="historyTypeFilter = 'all'"
                  :class="[
                    'text-[10px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors',
                    historyTypeFilter === 'all'
                      ? 'text-slate-900 border-slate-900'
                      : 'text-slate-400 border-transparent hover:text-slate-900',
                  ]"
                >
                  All Activity
                </button>
                <button
                  @click="historyTypeFilter = 'income'"
                  :class="[
                    'text-[10px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors',
                    historyTypeFilter === 'income'
                      ? 'text-slate-900 border-slate-900'
                      : 'text-slate-400 border-transparent hover:text-slate-900',
                  ]"
                >
                  Income
                </button>
                <button
                  @click="historyTypeFilter = 'expense'"
                  :class="[
                    'text-[10px] font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors',
                    historyTypeFilter === 'expense'
                      ? 'text-slate-900 border-slate-900'
                      : 'text-slate-400 border-transparent hover:text-slate-900',
                  ]"
                >
                  Expenses
                </button>
              </div>
              <div
                class="text-[10px] font-bold text-slate-300 uppercase tracking-widest"
              >
                Displaying {{ displayStart }}-{{ displayEnd }}
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
                    class="min-w-[120px] whitespace-nowrap text-[10px] font-bold text-slate-300 tracking-tighter"
                  >
                    {{ item.date }}
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
                  <div class="mt-2 flex items-center justify-end gap-3">
                    <button
                      class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-700"
                      @click="openEditTransaction(item)"
                    >
                      Edit
                    </button>
                    <button
                      class="text-[9px] font-bold uppercase tracking-widest text-slate-300 hover:text-rose-500"
                      @click="requestDeleteTransaction(item)"
                    >
                      Delete
                    </button>
                  </div>
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

    <AppConfirmModal
      :open="deleteConfirmOpen"
      title="Confirm Delete"
      :description="deleteConfirmDescription"
      confirm-label="Delete"
      cancel-label="Cancel"
      @update:open="cancelDeleteTransaction"
      @confirm="confirmDeleteTransaction"
      @cancel="cancelDeleteTransaction"
    />

    <Transition name="fade">
      <div
        v-if="editModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
        @click="closeEditModal"
      >
        <div
          class="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl"
          @click.stop
        >
          <h4 class="text-sm font-bold uppercase tracking-widest text-slate-900">
            Edit Transaction
          </h4>

          <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <label class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Type</label>
              <AppDropdown
                v-model="editTransaction.type"
                label="Select Type"
                :items="editTypeDropdownItems"
                unstyled
                trigger-class="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                menu-class="w-full"
              />
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Amount</label>
              <input
                v-model.number="editTransaction.amount"
                type="number"
                step="0.01"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
              />
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Wallet</label>
              <AppDropdown
                v-model="editTransaction.walletID"
                label="Select Wallet"
                :items="editWalletDropdownItems"
                unstyled
                trigger-class="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                menu-class="w-full"
              />
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Category</label>
              <AppDropdown
                v-model="editTransaction.categoryID"
                label="Select Category"
                :items="editCategoryDropdownItems"
                unstyled
                trigger-class="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                menu-class="w-full"
              />
            </div>

            <div class="space-y-2 md:col-span-2">
              <label class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Transaction Date</label>
              <div ref="editDatePickerContainerRef" class="relative">
                <button
                  type="button"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700"
                  @click="editDatePickerOpen = !editDatePickerOpen"
                >
                  {{ editDateButtonLabel }}
                </button>
                <div
                  v-if="editDatePickerOpen"
                  class="absolute bottom-full left-0 z-50 mb-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl"
                >
                  <calendar-date
                    class="cally block rounded-xl border border-slate-200 bg-slate-50 p-2"
                    :value="editTransaction.transactionDate"
                    @change="onEditCalendarDateChange"
                  >
                    <svg
                      aria-label="Previous"
                      class="size-4 fill-current text-slate-500"
                      slot="previous"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                    </svg>
                    <svg
                      aria-label="Next"
                      class="size-4 fill-current text-slate-500"
                      slot="next"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                    </svg>
                    <calendar-month></calendar-month>
                  </calendar-date>
                </div>
              </div>
              <input v-model="editTransaction.transactionDate" type="date" class="sr-only" />
            </div>

            <div class="space-y-2 md:col-span-2">
              <label class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Note</label>
              <input
                v-model="editTransaction.note"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
              />
            </div>
          </div>

          <p v-if="actionError" class="mt-4 text-xs font-semibold text-rose-500">
            {{ actionError }}
          </p>

          <div class="mt-8 flex justify-end gap-3">
            <button
              class="rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50"
              @click="closeEditModal"
            >
              Cancel
            </button>
            <button
              class="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800 disabled:opacity-50"
              :disabled="actionLoading"
              @click="saveEditedTransaction"
            >
              {{ actionLoading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from "vue";
import { useAuthApi } from "../../composables/useAuthApi";
import { useTotalNetWorth } from "../../composables/useTotalNetWorth";
import { useSidebarNavigation } from "../../composables/useSidebarNavigation";

type TransactionType = "income" | "expense";

type WalletItem = {
  id: string;
  name: string;
  balance: number;
};

type CategoryItem = {
  id: string;
  name: string;
  type: TransactionType;
};

type BudgetItem = {
  id: string;
  category_id: string;
  amount: number;
  spent: number;
};

type LedgerItem = {
  id: string;
  walletID: string;
  categoryID: string;
  transactionDate: string;
  category: string;
  note: string;
  amount: number;
  type: TransactionType;
  wallet: string;
  date: string;
};

const mobileSidebarOpen = ref(false);
const { currentPath, sections, toggleSection, goTo, logout, logoutConfirmOpen, confirmLogout, cancelLogout, userDisplayName } = useSidebarNavigation({
  mobileMaxWidth: 1024,
  onCloseSidebar: () => {
    mobileSidebarOpen.value = false;
  },
});
const { listMyWallets, listMyCategories, listMyBudgets, listMyTransactions, updateMyTransaction, deleteMyTransaction } = useAuthApi();
const { totalNetWorth: totalNetWorthFromAPI, refreshTotalNetWorth } = useTotalNetWorth();

const wallets = ref<WalletItem[]>([]);
const categories = ref<CategoryItem[]>([]);
const budgets = ref<BudgetItem[]>([]);
const allTransactions = ref<LedgerItem[]>([]);
const historyTypeFilter = ref<"all" | TransactionType>("all");
const pageLoading = ref(false);
const actionLoading = ref(false);
const actionError = ref("");
const editModalOpen = ref(false);
const deleteConfirmOpen = ref(false);
const deleteConfirmDescription = ref("Delete this transaction?");
const deleteTargetID = ref("");
const editDatePickerOpen = ref(false);
const editDatePickerContainerRef = ref<HTMLElement | null>(null);

const editTransaction = reactive({
  id: "",
  walletID: "",
  categoryID: "",
  amount: 0,
  type: "expense" as TransactionType,
  transactionDate: "",
  note: "",
});

const headerTotalNetWorth = computed(() => {
  const fallback = wallets.value.reduce((acc, curr) => acc + curr.balance, 0);
  return totalNetWorthFromAPI.value ?? fallback;
});

const normalizeErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  return "request-failed";
};

const formatDate = (value: string | null) => {
  if (!value) {
    return "-";
  }
  const normalized = value.includes("T") ? value : `${value}T00:00:00`;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const normalizeDateInput = (value: string | null) => {
  if (!value) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().split("T")[0];
};

const formatDateDisplay = (value: string) => {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

const editDateButtonLabel = computed(() => {
  if (!editTransaction.transactionDate) {
    return "เลือกวันที่";
  }

  return formatDateDisplay(editTransaction.transactionDate);
});

const recentTransactionsSnapshot = computed(() => allTransactions.value.slice(0, 3));

const filteredTransactions = computed(() => {
  if (historyTypeFilter.value === "all") {
    return allTransactions.value;
  }
  return allTransactions.value.filter((item) => item.type === historyTypeFilter.value);
});

const editCategoryOptions = computed(() => {
  return categories.value.filter((item) => item.type === editTransaction.type);
});

const editTypeDropdownItems = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
];

const editWalletDropdownItems = computed(() => {
  return wallets.value.map((wallet) => ({
    label: wallet.name,
    value: wallet.id,
  }));
});

const editCategoryDropdownItems = computed(() => {
  return editCategoryOptions.value.map((category) => ({
    label: category.name,
    value: category.id,
  }));
});

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 6;

const totalTransactions = computed(() => filteredTransactions.value.length);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalTransactions.value / itemsPerPage)),
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => startIndex.value + itemsPerPage);
const displayStart = computed(() => (totalTransactions.value === 0 ? 0 : startIndex.value + 1));
const displayEnd = computed(() => Math.min(endIndex.value, totalTransactions.value));

const paginatedTransactions = computed(() => {
  return filteredTransactions.value.slice(startIndex.value, endIndex.value);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

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

const isValidTwoDecimalAmount = (amount: number) => {
  if (!Number.isFinite(amount)) {
    return false;
  }

  return Math.abs(amount * 100 - Math.round(amount * 100)) < 1e-8;
};

const normalizeTwoDecimalAmount = (amount: number) => {
  return Math.round(amount * 100) / 100;
};

const transactionDelta = (type: TransactionType, amount: number) => {
  return type === "expense" ? -amount : amount;
};

const getWalletBalance = (walletID: string) => {
  const wallet = wallets.value.find((item) => item.id === walletID);
  return Number(wallet?.balance || 0);
};

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
    type: item.type,
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
  const res = await listMyTransactions({ page: 1, size: 500 });
  const walletMap = new Map(wallets.value.map((item) => [item.id, item.name]));
  const categoryMap = new Map(categories.value.map((item) => [item.id, item.name]));

  allTransactions.value = (res.items || []).map((item) => ({
    id: item.id,
    walletID: item.wallet_id || "",
    categoryID: item.category_id || "",
    transactionDate: normalizeDateInput(item.transaction_date),
    category: item.category_id ? categoryMap.get(item.category_id) || "Uncategorized" : "Uncategorized",
    note: item.note || "",
    amount: Number(item.amount || 0),
    type: item.type,
    wallet: item.wallet_id ? walletMap.get(item.wallet_id) || "Unknown Wallet" : "Unknown Wallet",
    date: formatDate(item.transaction_date),
  }));
};

const loadInitialData = async () => {
  pageLoading.value = true;
  try {
    await Promise.all([loadWallets(), loadCategories(), loadBudgets()]);
    await Promise.all([loadTransactions(), refreshTotalNetWorth()]);
  } catch (error) {
    console.error("transaction-ledger-load-failed", normalizeErrorMessage(error));
  } finally {
    pageLoading.value = false;
  }
};

const openEditTransaction = (item: LedgerItem) => {
  actionError.value = "";
  editTransaction.id = item.id;
  editTransaction.walletID = item.walletID;
  editTransaction.categoryID = item.categoryID;
  editTransaction.amount = item.amount;
  editTransaction.type = item.type;
  editTransaction.transactionDate = item.transactionDate || new Date().toISOString().split("T")[0];
  editTransaction.note = item.note || "";
  editDatePickerOpen.value = false;
  editModalOpen.value = true;
};

const closeEditModal = () => {
  editModalOpen.value = false;
  editDatePickerOpen.value = false;
};

const requestDeleteTransaction = (item: LedgerItem) => {
  deleteTargetID.value = item.id;
  deleteConfirmDescription.value = `Delete transaction ${item.note || item.category}?`;
  deleteConfirmOpen.value = true;
};

const onEditCalendarDateChange = (event: Event) => {
  const target = event.target as { value?: string } | null;
  if (target?.value) {
    editTransaction.transactionDate = target.value;
    editDatePickerOpen.value = false;
  }
};

const onDocumentClick = (event: MouseEvent) => {
  const container = editDatePickerContainerRef.value;
  const target = event.target as Node | null;
  if (container && target && !container.contains(target)) {
    editDatePickerOpen.value = false;
  }
};

const cancelDeleteTransaction = () => {
  deleteConfirmOpen.value = false;
  deleteTargetID.value = "";
};

const confirmDeleteTransaction = async () => {
  const transactionID = deleteTargetID.value;
  if (!transactionID) {
    cancelDeleteTransaction();
    return;
  }

  actionLoading.value = true;
  actionError.value = "";
  try {
    await deleteMyTransaction(transactionID);
    await Promise.all([loadWallets(), loadBudgets(), loadTransactions(), refreshTotalNetWorth()]);
    cancelDeleteTransaction();
  } catch (error) {
    actionError.value = normalizeErrorMessage(error);
  } finally {
    actionLoading.value = false;
  }
};

const saveEditedTransaction = async () => {
  if (!editTransaction.id) {
    return;
  }

  if (!editTransaction.walletID || !editTransaction.categoryID) {
    actionError.value = "wallet-and-category-required";
    return;
  }

  if (!Number.isFinite(editTransaction.amount) || editTransaction.amount < 0) {
    actionError.value = "transaction-amount-must-be-non-negative";
    return;
  }

  if (!isValidTwoDecimalAmount(editTransaction.amount)) {
    actionError.value = "transaction-amount-must-have-two-decimals";
    return;
  }

  const nextAmount = normalizeTwoDecimalAmount(editTransaction.amount);
  const original = allTransactions.value.find((item) => item.id === editTransaction.id);
  let projectedBalance = getWalletBalance(editTransaction.walletID);

  if (original && original.walletID === editTransaction.walletID) {
    projectedBalance -= transactionDelta(original.type, normalizeTwoDecimalAmount(original.amount));
  }

  projectedBalance += transactionDelta(editTransaction.type, nextAmount);
  if (projectedBalance < 0) {
    actionError.value = "transaction-insufficient-funds";
    return;
  }

  actionLoading.value = true;
  actionError.value = "";
  try {
    await updateMyTransaction(editTransaction.id, {
      wallet_id: editTransaction.walletID,
      category_id: editTransaction.categoryID,
      amount: nextAmount,
      type: editTransaction.type,
      transaction_date: editTransaction.transactionDate,
      note: editTransaction.note.trim(),
    });

    await Promise.all([loadWallets(), loadBudgets(), loadTransactions(), refreshTotalNetWorth()]);
    closeEditModal();
  } catch (error) {
    actionError.value = normalizeErrorMessage(error);
  } finally {
    actionLoading.value = false;
  }
};

watch(historyTypeFilter, () => {
  currentPage.value = 1;
});

onMounted(() => {
  if (typeof window !== "undefined") {
    void import("cally");
    document.addEventListener("click", onDocumentClick);
  }
  void loadInitialData();
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    document.removeEventListener("click", onDocumentClick);
  }
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
