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
      <header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600"
            @click="mobileSidebarOpen = true"
          >
            <span class="text-sm">☰</span> Menu
          </button>
          <p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2">Management</p>
          <h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900">Goals Planner</h3>
        </div>

        <div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6">
          <div class="text-right">
            <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Total Target</p>
            <p class="text-xl font-medium tracking-tight text-slate-900">
              ฿ {{ totalTargetAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
            </p>
            <p class="text-[9px] text-emerald-500 uppercase tracking-widest mb-1 mt-2">Current Progress</p>
            <p class="text-xl font-medium tracking-tight text-emerald-600">
              ฿ {{ totalCurrentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
            </p>
          </div>
          <button
            @click="showAddForm = true"
            class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            + Add Goal
          </button>
        </div>
      </header>

      <div class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Active Goals</p>
            <p class="text-2xl font-light tracking-tight text-slate-900">{{ activeGoals }}</p>
            <p class="text-[9px] text-slate-400 mt-1">{{ goals.length }} total goal{{ goals.length !== 1 ? 's' : '' }}</p>
          </div>
          <div class="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 shadow-sm">
            <p class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-3">Completed</p>
            <p class="text-2xl font-light tracking-tight text-emerald-700">{{ completedGoals }}</p>
            <p class="text-[9px] text-emerald-500 mt-1">{{ completionRate.toFixed(1) }}% completion rate</p>
          </div>
          <div class="bg-slate-900 p-6 rounded-[2rem] shadow-sm">
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Overall Progress</p>
            <p class="text-2xl font-light tracking-tight text-white">
              {{ totalProgressPercent.toFixed(1) }}%
            </p>
            <p class="text-[9px] text-slate-400 mt-1">across all targets</p>
          </div>
        </div>

        <div class="space-y-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Goals Portfolio</h4>

            <div class="flex items-center gap-3">
              <div class="w-[170px] shrink-0">
                <AppDropdown
                  v-model="statusFilter"
                  label="All Status"
                  :items="statusFilterOptions"
                  unstyled
                  trigger-class="inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-slate-600"
                  menu-class="w-full"
                />
              </div>

              <div class="w-[170px] shrink-0">
                <AppDropdown
                  v-model="typeFilter"
                  label="All Types"
                  :items="typeFilterOptions"
                  unstyled
                  trigger-class="inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-slate-600"
                  menu-class="w-full"
                />
              </div>

              <button
                class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-slate-600"
                @click="void loadGoals()"
              >
                Refresh
              </button>
            </div>
          </div>

          <div v-if="loading" class="bg-white p-12 rounded-[2.5rem] border border-slate-100 text-center text-sm text-slate-400">
            Loading goals...
          </div>

          <div v-else-if="goals.length === 0" class="bg-white p-12 rounded-[2.5rem] border border-slate-100 text-center">
            <p class="text-sm text-slate-400 font-light">No goals found. Click "Add Goal" to get started.</p>
          </div>

          <div
            v-for="goal in goals"
            :key="goal.id"
            class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
          >
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div class="flex items-start gap-4 flex-1 min-w-0">
                <div
                  class="mt-1 h-4 w-4 shrink-0 rounded-full ring-2 ring-white shadow"
                  :style="{ backgroundColor: statusDotColor(goal.status) }"
                ></div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 flex-wrap mb-1">
                    <p class="text-base font-semibold text-slate-900 tracking-tight">{{ goal.name }}</p>
                    <span class="px-2 py-0.5 bg-slate-100 rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                      {{ typeLabel(goal.type) }}
                    </span>
                    <span
                      class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                      :class="statusBadgeClass(goal.status)"
                    >
                      {{ statusLabel(goal.status) }}
                    </span>
                  </div>
                  <p class="text-[10px] text-slate-400 uppercase tracking-widest">
                    Target Date: {{ formatGoalDate(goal.targetDate) }}
                  </p>
                  <p v-if="goalTrackingSummary(goal)" class="text-[10px] text-slate-500 mt-1">
                    {{ goalTrackingSummary(goal) }}
                  </p>

                  <div class="mt-5 space-y-2">
                    <div class="flex justify-between text-[9px] uppercase tracking-widest font-bold">
                      <span class="text-slate-400">Progress</span>
                      <span class="text-slate-700">{{ progressPercent(goal).toFixed(1) }}%</span>
                    </div>
                    <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-1000"
                        :class="progressBarClass(goal)"
                        :style="{ width: Math.min(progressPercent(goal), 100) + '%' }"
                      ></div>
                    </div>
                    <div class="flex justify-between text-[9px] text-slate-400 uppercase tracking-widest">
                      <span>฿ {{ goal.currentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }} saved</span>
                      <span>฿ {{ goal.targetAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }} target</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-5 sm:flex sm:flex-col sm:gap-5 sm:text-right shrink-0">
                <div>
                  <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Target</p>
                  <p class="text-lg font-light tracking-tight text-slate-900">
                    ฿ {{ goal.targetAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
                  </p>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Current</p>
                  <p class="text-xl font-light tracking-tight text-emerald-600">
                    ฿ {{ goal.currentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
                  </p>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Remaining</p>
                  <p class="text-base font-medium text-slate-900">
                    ฿ {{ remainingAmount(goal).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
                  </p>
                </div>
                <div class="hidden sm:block">
                  <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Auto Tracking</p>
                  <p class="text-sm font-medium text-slate-700">
                    {{ goal.autoTracking ? 'ON' : 'OFF' }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
              <p class="text-[9px] text-slate-300 uppercase tracking-widest">
                Goal #{{ goal.id.slice(0, 8) }}
              </p>
              <div class="flex gap-4">
                <button
                  v-if="canPayFromWallet(goal)"
                  class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest hover:text-emerald-700 transition-colors"
                  @click="requestPayFromWallet(goal)"
                >Pay From Wallet</button>
                <button
                  class="text-[9px] font-bold text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors"
                  @click="openGoalDetail(goal.id)"
                >Detail</button>
                <button
                  class="text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors"
                  @click="startEditGoal(goal)"
                >Edit</button>
                <button
                  v-if="goal.status !== 'completed'"
                  class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest hover:text-emerald-700 transition-colors"
                  @click="updateGoalStatus(goal.id, 'completed')"
                >Complete</button>
                <button
                  v-if="goal.status !== 'paused'"
                  class="text-[9px] font-bold text-amber-500 uppercase tracking-widest hover:text-amber-700 transition-colors"
                  @click="updateGoalStatus(goal.id, 'paused')"
                >Pause</button>
                <button
                  v-if="goal.status !== 'archived'"
                  class="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                  @click="updateGoalStatus(goal.id, 'archived')"
                >Archive</button>
                <button
                  class="text-[9px] font-bold text-rose-400 uppercase tracking-widest hover:text-rose-600 transition-colors"
                  @click="requestDeleteGoal(goal.id)"
                >Delete</button>
              </div>
            </div>

          </div>
        </div>

        <div
          v-if="showAddForm"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          @click.self="showAddForm = false"
        >
          <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between mb-8">
              <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Create Goal</h4>
              <button
                @click="showAddForm = false"
                type="button"
                class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900"
              >Close</button>
            </div>

            <form @submit.prevent="createGoal" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Goal Name</label>
                <input
                  v-model.trim="newGoal.name"
                  placeholder="E.g. Emergency Fund"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>

              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Goal Type</label>
                <AppDropdown
                  v-model="newGoal.type"
                  label="Select goal type"
                  :items="goalTypeOptions"
                  unstyled
                  trigger-class="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm"
                  menu-class="w-full"
                />
              </div>

              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Amount (฿)</label>
                <input
                  v-model.number="newGoal.target_amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>

              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Start Amount (฿)</label>
                <input
                  v-model.number="newGoal.start_amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>

              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                <input
                  v-model="newGoal.start_date"
                  type="date"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>

              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Date</label>
                <input
                  v-model="newGoal.target_date"
                  type="date"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>

              <div class="sm:col-span-2 flex items-center gap-2 px-1">
                <input id="goal-auto-tracking" v-model="newGoal.auto_tracking" type="checkbox" class="h-4 w-4" />
                <label for="goal-auto-tracking" class="text-sm text-slate-700">Auto tracking</label>
              </div>

              <template v-if="newGoal.auto_tracking">
                <template v-if="newGoal.type === 'debt_payoff'">
                  <div class="space-y-2">
                    <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Deposit Wallet</label>
                    <AppDropdown
                      v-model="newGoal.deposit_wallet_id"
                      label="Select wallet to deposit"
                      :items="walletSourceItems"
                      direction="up"
                      unstyled
                      trigger-class="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm"
                      menu-class="w-full"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Loan Account To Close</label>
                    <AppDropdown
                      v-model="newGoal.payoff_loan_id"
                      label="Select loan to close"
                      :items="loanSourceItems"
                      direction="up"
                      unstyled
                      trigger-class="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm"
                      menu-class="w-full"
                    />
                  </div>

                  <div class="sm:col-span-2 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-600 space-y-1">
                    <p>
                      ฝากเงินเข้าบัญชี: <span class="font-semibold text-slate-900">{{ walletNameByID(newGoal.deposit_wallet_id) }}</span>
                    </p>
                    <p>
                      ต้องการปิดบัญชีเงินกู้: <span class="font-semibold text-slate-900">{{ loanNameByID(newGoal.payoff_loan_id) }}</span>
                    </p>
                  </div>
                </template>

                <template v-else>
                  <div class="space-y-2">
                    <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tracking Source</label>
                    <AppDropdown
                      v-model="newGoal.tracking_source_type"
                      label="Select tracking source"
                      :items="trackingSourceTypeOptions"
                      direction="up"
                      unstyled
                      trigger-class="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm"
                      menu-class="w-full"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Source Item</label>
                    <AppDropdown
                      v-model="newGoal.tracking_source_id"
                      label="Select source item"
                      :items="trackingSourceItems"
                      :disabled="newGoal.tracking_source_type !== 'wallet' && newGoal.tracking_source_type !== 'loan'"
                      direction="up"
                      unstyled
                      trigger-class="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                      menu-class="w-full"
                    />
                  </div>
                </template>
              </template>

              <div class="sm:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  class="px-6 py-3 rounded-2xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500"
                  @click="showAddForm = false"
                >Cancel</button>
                <button
                  type="submit"
                  :disabled="saving"
                  class="px-10 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all disabled:opacity-60"
                >
                  {{ saving ? 'Saving...' : 'Save Goal' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          v-if="editingGoalID"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          @click.self="cancelEditGoal"
        >
          <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between mb-8">
              <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Edit Goal</h4>
              <button
                @click="cancelEditGoal"
                type="button"
                class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900"
              >Close</button>
            </div>

            <form class="grid grid-cols-1 sm:grid-cols-2 gap-6" @submit.prevent="saveEditedGoal">
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Goal Name</label>
                <input
                  v-model.trim="editGoal.name"
                  placeholder="Goal name"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>

              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                <AppDropdown
                  v-model="editGoal.status"
                  label="Select status"
                  :items="goalStatusOptions"
                  unstyled
                  trigger-class="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm"
                  menu-class="w-full"
                />
              </div>

              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Amount (฿)</label>
                <input
                  v-model.number="editGoal.target_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>

              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Amount (฿)</label>
                <input
                  v-model.number="editGoal.current_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>

              <div class="space-y-2 sm:col-span-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Date</label>
                <input
                  v-model="editGoal.target_date"
                  type="date"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>

              <template v-if="editingGoalItem?.type === 'debt_payoff'">
                <div class="space-y-2">
                  <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Deposit Wallet</label>
                  <AppDropdown
                    v-model="editGoal.deposit_wallet_id"
                    label="Select wallet to deposit"
                    :items="walletSourceItems"
                    direction="up"
                    unstyled
                    trigger-class="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm"
                    menu-class="w-full"
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Loan Account To Close</label>
                  <AppDropdown
                    v-model="editGoal.payoff_loan_id"
                    label="Select loan to close"
                    :items="loanSourceItems"
                    direction="up"
                    unstyled
                    trigger-class="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm"
                    menu-class="w-full"
                  />
                </div>

                <div class="sm:col-span-2 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-600 space-y-1">
                  <p>
                    ฝากเงินเข้าบัญชี: <span class="font-semibold text-slate-900">{{ walletNameByID(editGoal.deposit_wallet_id) }}</span>
                  </p>
                  <p>
                    ต้องการปิดบัญชีเงินกู้: <span class="font-semibold text-slate-900">{{ loanNameByID(editGoal.payoff_loan_id) }}</span>
                  </p>
                </div>
              </template>

              <div class="sm:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  @click="cancelEditGoal"
                  class="px-6 py-3 rounded-2xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500"
                >Cancel</button>
                <button
                  type="submit"
                  class="px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
                >Save Changes</button>
              </div>
            </form>
          </div>
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

    <AppConfirmModal
      :open="payConfirmOpen"
      title="Confirm Pay From Wallet"
      :description="payConfirmDescription"
      confirm-label="Pay Max"
      cancel-label="Cancel"
      @update:open="cancelPayFromWallet"
      @confirm="executePayFromWallet"
      @cancel="cancelPayFromWallet"
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
type DropdownValue = GoalType | GoalStatus | GoalTrackingSourceType | "all" | "";
type DropdownItem = { label: string; value: DropdownValue | string };

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
  trackingSourceType: GoalTrackingSourceType | null;
  trackingSourceID: string;
  depositWalletID: string;
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

const {
  listMyGoals,
  createMyGoal,
  updateMyGoal,
  deleteMyGoal,
  listMyWallets,
  listMyLoans,
  updateMyWallet,
  updateMyLoan,
  createMyTransaction,
} = useAuthApi();

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
  deposit_wallet_id: "",
  payoff_loan_id: "",
});

const editGoal = reactive({
  name: "",
  target_amount: 0,
  current_amount: 0,
  target_date: "",
  status: "active" as GoalStatus,
  deposit_wallet_id: "",
  payoff_loan_id: "",
});

const statusFilterOptions: DropdownItem[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Paused", value: "paused" },
  { label: "Archived", value: "archived" },
];

const typeFilterOptions: DropdownItem[] = [
  { label: "All Types", value: "all" },
  { label: "Savings", value: "savings" },
  { label: "Debt Payoff", value: "debt_payoff" },
];

const goalTypeOptions: DropdownItem[] = [
  { label: "Savings", value: "savings" },
  { label: "Debt Payoff", value: "debt_payoff" },
];

const goalStatusOptions: DropdownItem[] = [
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Paused", value: "paused" },
  { label: "Archived", value: "archived" },
];

const trackingSourceTypeOptions: DropdownItem[] = [
  { label: "All Wallets", value: "all_wallets" },
  { label: "Specific Wallet", value: "wallet" },
  { label: "Specific Loan", value: "loan" },
];

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

const walletSourceItems = computed(() => {
  return wallets.value.map((wallet) => ({
    label: `${wallet.name} (฿${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })})`,
    value: wallet.id,
  }));
});

const loanSourceItems = computed(() => {
  return loans.value.map((loan) => ({
    label: `${loan.name} (฿${loan.remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })})`,
    value: loan.id,
  }));
});

const activeGoals = computed(() => goals.value.filter((goal) => goal.status === "active").length);
const completedGoals = computed(() => goals.value.filter((goal) => goal.status === "completed").length);
const totalTargetAmount = computed(() => goals.value.reduce((acc, goal) => acc + goal.targetAmount, 0));
const totalCurrentAmount = computed(() => goals.value.reduce((acc, goal) => acc + goal.currentAmount, 0));
const totalProgressPercent = computed(() => {
  if (totalTargetAmount.value <= 0) {
    return 0;
  }

  return (totalCurrentAmount.value / totalTargetAmount.value) * 100;
});
const completionRate = computed(() => {
  if (goals.value.length === 0) {
    return 0;
  }

  return (completedGoals.value / goals.value.length) * 100;
});

const editingGoalItem = computed(() => {
  if (!editingGoalID.value) {
    return null;
  }

  return goals.value.find((goal) => goal.id === editingGoalID.value) || null;
});

const FIXED_LOAN_REPAYMENT_CATEGORY_ID = "a1b2c3d4-0000-4000-8000-000000000001";

const payingGoal = ref<GoalItem | null>(null);
const payConfirmOpen = ref(false);
const paySaving = ref(false);

const payingWallet = computed(() => {
  if (!payingGoal.value?.depositWalletID) {
    return null;
  }
  return wallets.value.find((wallet) => wallet.id === payingGoal.value?.depositWalletID) || null;
});

const payingLoan = computed(() => {
  if (!payingGoal.value?.trackingSourceID) {
    return null;
  }
  return loans.value.find((loan) => loan.id === payingGoal.value?.trackingSourceID) || null;
});

const maxPayableAmount = computed(() => {
  if (!payingWallet.value || !payingLoan.value) {
    return 0;
  }

  return Math.max(0, Math.min(payingWallet.value.balance, payingLoan.value.remainingBalance));
});

const canPayFromWallet = (goal: GoalItem) => {
  return goal.type === "debt_payoff" && goal.status === "active" && !!goal.depositWalletID && !!goal.trackingSourceID;
};

const today = () => new Date().toISOString().split("T")[0];

const normalizeDateForInput = (value: string | null | undefined) => {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toISOString().slice(0, 10);
};

const payConfirmDescription = computed(() => {
  if (!payingGoal.value || !payingWallet.value || !payingLoan.value) {
    return "Proceed with full repayment from selected wallet?";
  }

  return `Pay full max amount ฿${maxPayableAmount.value.toLocaleString(undefined, { minimumFractionDigits: 2 })} from ${payingWallet.value.name} to ${payingLoan.value.name}?`;
});

const requestPayFromWallet = (goal: GoalItem) => {
  payingGoal.value = goal;

  if (!payingWallet.value || !payingLoan.value) {
    showToast("Goal wallet or loan is missing", "error");
    payingGoal.value = null;
    return;
  }

  if (maxPayableAmount.value <= 0) {
    showToast("No payable amount available", "error");
    payingGoal.value = null;
    return;
  }

  payConfirmOpen.value = true;
};

const cancelPayFromWallet = () => {
  payConfirmOpen.value = false;
  payingGoal.value = null;
};

const executePayFromWallet = async () => {
  if (paySaving.value) {
    return;
  }

  if (!payingGoal.value || !payingWallet.value || !payingLoan.value) {
    showToast("Goal wallet or loan is missing", "error");
    return;
  }

  const amount = maxPayableAmount.value;
  if (amount <= 0) {
    showToast("No payable amount available", "error");
    return;
  }

  paySaving.value = true;
  try {
    const nextWalletBalance = payingWallet.value.balance - amount;
    const nextLoanRemaining = Math.max(0, payingLoan.value.remainingBalance - amount);

    await createMyTransaction({
      wallet_id: payingWallet.value.id,
      category_id: FIXED_LOAN_REPAYMENT_CATEGORY_ID,
      amount,
      type: "expense",
      transaction_date: today(),
      note: `GOAL_PAY_FROM_WALLET|goal_id=${payingGoal.value.id}|wallet_id=${payingWallet.value.id}|loan_id=${payingLoan.value.id}|amount=${amount.toFixed(2)}`,
    });

    await updateMyWallet(payingWallet.value.id, { balance: nextWalletBalance });
    await updateMyLoan(payingLoan.value.id, { remaining_balance: nextLoanRemaining });

    showToast("Paid from wallet successfully", "success");
    cancelPayFromWallet();
    await Promise.all([loadGoals(), loadTrackingSources()]);
  } catch {
    showToast("Failed to pay from wallet", "error");
  } finally {
    paySaving.value = false;
  }
};

const progressPercent = (goal: GoalItem) => {
  if (goal.targetAmount <= 0) {
    return 0;
  }

  return (goal.currentAmount / goal.targetAmount) * 100;
};

const remainingAmount = (goal: GoalItem) => Math.max(0, goal.targetAmount - goal.currentAmount);

const formatGoalDate = (date: string) => {
  if (!date) {
    return "-";
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

const typeLabel = (type: GoalType) => {
  return type === "debt_payoff" ? "Debt Payoff" : "Savings";
};

const statusLabel = (status: GoalStatus) => {
  if (status === "completed") return "Completed";
  if (status === "paused") return "Paused";
  if (status === "archived") return "Archived";
  return "Active";
};

const statusDotColor = (status: GoalStatus) => {
  if (status === "completed") return "#10b981";
  if (status === "paused") return "#f59e0b";
  if (status === "archived") return "#64748b";
  return "#6366f1";
};

const statusBadgeClass = (status: GoalStatus) => {
  if (status === "completed") return "bg-emerald-50 text-emerald-600";
  if (status === "paused") return "bg-amber-50 text-amber-600";
  if (status === "archived") return "bg-slate-100 text-slate-500";
  return "bg-indigo-50 text-indigo-500";
};

const progressBarClass = (goal: GoalItem) => {
  const progress = progressPercent(goal);
  if (progress >= 100) return "bg-emerald-500";
  if (progress >= 50) return "bg-indigo-500";
  return "bg-rose-400";
};

const walletNameByID = (walletID: string) => {
  if (!walletID) return "-";
  return wallets.value.find((wallet) => wallet.id === walletID)?.name || "-";
};

const loanNameByID = (loanID: string) => {
  if (!loanID) return "-";
  return loans.value.find((loan) => loan.id === loanID)?.name || "-";
};

const goalTrackingSummary = (goal: GoalItem) => {
  if (!goal.autoTracking || !goal.trackingSourceType) {
    return "";
  }

  if (goal.trackingSourceType === "loan") {
    return `ฝากเงินเข้าบัญชี: ${walletNameByID(goal.depositWalletID)} | ต้องการปิดบัญชีเงินกู้: ${loanNameByID(goal.trackingSourceID)}`;
  }

  if (goal.trackingSourceType === "wallet") {
    return `ฝากเงินเข้าบัญชี: ${walletNameByID(goal.trackingSourceID)}`;
  }

  return "ติดตามจากทุกบัญชีเงินฝาก";
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
      targetDate: normalizeDateForInput(item.target_date),
      status: item.status,
      autoTracking: Boolean(item.auto_tracking),
      trackingSourceType: item.tracking_source_type,
      trackingSourceID: item.tracking_source_id || "",
      depositWalletID: item.deposit_wallet_id || "",
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
  newGoal.deposit_wallet_id = "";
  newGoal.payoff_loan_id = "";
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
    newGoal.type !== "debt_payoff" &&
    (newGoal.tracking_source_type === "wallet" || newGoal.tracking_source_type === "loan") &&
    !newGoal.tracking_source_id
  ) {
    showToast("Please select a tracking source", "error");
    return;
  }

  if (newGoal.auto_tracking && newGoal.type === "debt_payoff" && !newGoal.payoff_loan_id) {
    showToast("Please select the loan account to close", "error");
    return;
  }

  if (newGoal.auto_tracking && newGoal.type === "debt_payoff" && !newGoal.deposit_wallet_id) {
    showToast("Please select deposit wallet", "error");
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
      tracking_source_type:
        newGoal.auto_tracking && newGoal.type === "debt_payoff"
          ? "loan"
          : (newGoal.auto_tracking && newGoal.tracking_source_type
            ? newGoal.tracking_source_type
            : undefined),
      tracking_source_id:
        newGoal.auto_tracking && newGoal.type === "debt_payoff"
          ? (newGoal.payoff_loan_id || undefined)
          : (newGoal.auto_tracking ? newGoal.tracking_source_id || undefined : undefined),
      deposit_wallet_id:
        newGoal.auto_tracking && newGoal.type === "debt_payoff"
          ? (newGoal.deposit_wallet_id || undefined)
          : undefined,
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
  editGoal.target_date = normalizeDateForInput(goal.targetDate);
  editGoal.status = goal.status;
  editGoal.deposit_wallet_id = goal.depositWalletID;
  editGoal.payoff_loan_id = goal.trackingSourceType === "loan" ? goal.trackingSourceID : "";
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
    const currentGoal = goals.value.find((goal) => goal.id === editingGoalID.value);
    const isDebtPayoff = currentGoal?.type === "debt_payoff";

    if (isDebtPayoff) {
      if (!editGoal.deposit_wallet_id) {
        showToast("Please select deposit wallet", "error");
        return;
      }
      if (!editGoal.payoff_loan_id) {
        showToast("Please select loan account to close", "error");
        return;
      }
    }

    await updateMyGoal(editingGoalID.value, {
      name: editGoal.name.trim(),
      target_amount: Number(editGoal.target_amount || 0),
      current_amount: Number(editGoal.current_amount || 0),
      target_date: editGoal.target_date || undefined,
      status: editGoal.status,
      tracking_source_type: isDebtPayoff ? "loan" : undefined,
      tracking_source_id: isDebtPayoff ? (editGoal.payoff_loan_id || undefined) : undefined,
      deposit_wallet_id: isDebtPayoff ? (editGoal.deposit_wallet_id || undefined) : undefined,
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
            trackingSourceType: isDebtPayoff ? "loan" : goal.trackingSourceType,
            trackingSourceID: isDebtPayoff ? editGoal.payoff_loan_id : goal.trackingSourceID,
            depositWalletID: isDebtPayoff ? editGoal.deposit_wallet_id : goal.depositWalletID,
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

watch(
  () => newGoal.type,
  (type) => {
    if (type === "debt_payoff") {
      newGoal.tracking_source_type = "loan";
      newGoal.tracking_source_id = "";
      return;
    }

    newGoal.tracking_source_type = "all_wallets";
    newGoal.tracking_source_id = "";
    newGoal.payoff_loan_id = "";
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
