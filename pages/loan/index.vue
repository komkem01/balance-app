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
        <h1 class="text-xs font-bold tracking-[0.4em] text-slate-400 uppercase mb-1">Archive</h1>
        <h2 class="text-2xl font-light tracking-tighter text-slate-900 uppercase">Balance</h2>
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

        <!-- Section: Management -->
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

        <!-- Section: Actions -->
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

        <!-- Section: System -->
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

      <!-- Footer User Info -->
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

    <!-- Main Content Area -->
    <main class="relative z-10 h-screen min-h-0 min-w-0 overflow-y-auto p-6 lg:p-10 transition-all duration-300 flex-1">
      <!-- Header -->
      <header class="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            class="mb-4 inline-flex min-[1025px]:hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600"
            @click="mobileSidebarOpen = true"
          >
            <span class="text-sm">☰</span> Menu
          </button>
          <p class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-2">Management</p>
          <h3 class="text-3xl lg:text-[2rem] font-light tracking-tight text-slate-900">Loan Register</h3>
        </div>
        <div class="flex w-full items-center justify-between sm:w-auto sm:justify-end sm:space-x-6">
          <div class="text-right">
            <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Total Requested</p>
            <p class="text-xl font-medium tracking-tight text-slate-900">
              ฿ {{ totalBorrowed.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
            </p>
            <p class="text-[9px] text-rose-400 uppercase tracking-widest mb-1 mt-2">Unpaid Balance</p>
            <p class="text-xl font-medium tracking-tight text-rose-500">
              ฿ {{ totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
            </p>
          </div>
          <button
            @click="showAddForm = !showAddForm"
            class="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            + Add Loan
          </button>
        </div>
      </header>

      <div class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        <!-- Summary Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Total Loan Requested</p>
            <p class="text-2xl font-light tracking-tight text-slate-900">
              ฿ {{ totalBorrowed.toLocaleString(undefined, { minimumFractionDigits: 0 }) }}
            </p>
            <p class="text-[9px] text-slate-400 mt-1">{{ loans.length }} active loan{{ loans.length !== 1 ? 's' : '' }}</p>
          </div>
          <div class="bg-rose-50 p-6 rounded-[2rem] border border-rose-100 shadow-sm">
            <p class="text-[9px] font-bold text-rose-400 uppercase tracking-widest mb-3">Unpaid Loan Balance</p>
            <p class="text-2xl font-light tracking-tight text-rose-600">
              ฿ {{ totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 0 }) }}
            </p>
            <p class="text-[9px] text-rose-400 mt-1">
              {{ overallPaidPercent.toFixed(1) }}% paid off
            </p>
          </div>
          <div class="bg-slate-900 p-6 rounded-[2rem] shadow-sm">
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Monthly Obligations</p>
            <p class="text-2xl font-light tracking-tight text-white">
              ฿ {{ totalMonthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 0 }) }}
            </p>
            <p class="text-[9px] text-slate-400 mt-1">due every month</p>
          </div>
        </div>

        <!-- Loan List -->
        <div class="space-y-6">
          <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Loan Portfolio</h4>

          <div v-if="loans.length === 0" class="bg-white p-12 rounded-[2.5rem] border border-slate-100 text-center">
            <p class="text-sm text-slate-400 font-light">No loans registered. Click "Add Loan" to get started.</p>
          </div>

          <div
            v-for="loan in loans"
            :key="loan.id"
            class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
          >
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <!-- Left: Info -->
              <div class="flex items-start gap-4 flex-1 min-w-0">
                <div
                  class="mt-1 h-4 w-4 shrink-0 rounded-full ring-2 ring-white shadow"
                  :style="{ backgroundColor: loan.colorCode }"
                ></div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 flex-wrap mb-1">
                    <p class="text-base font-semibold text-slate-900 tracking-tight">{{ loan.name }}</p>
                    <span class="px-2 py-0.5 bg-slate-100 rounded-full text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                      {{ loan.lender }}
                    </span>
                    <span
                      v-if="loan.interestRate > 0"
                      class="px-2 py-0.5 bg-indigo-50 rounded-full text-[9px] font-bold text-indigo-500 uppercase tracking-wider"
                    >
                      {{ loan.interestRate }}% p.a.
                    </span>
                  </div>
                  <p class="text-[10px] text-slate-400 uppercase tracking-widest">
                    {{ formatLoanDate(loan.startDate) }} → {{ formatLoanDate(loan.endDate) }}
                  </p>

                  <!-- Progress Bar -->
                  <div class="mt-5 space-y-2">
                    <div class="flex justify-between text-[9px] uppercase tracking-widest font-bold">
                      <span class="text-slate-400">Paid Off</span>
                      <span :class="paidPercent(loan) >= 100 ? 'text-emerald-500' : 'text-slate-700'">
                        {{ paidPercent(loan).toFixed(1) }}%
                      </span>
                    </div>
                    <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-1000"
                        :class="paidPercent(loan) >= 90 ? 'bg-emerald-500' : paidPercent(loan) >= 50 ? 'bg-indigo-500' : 'bg-rose-400'"
                        :style="{ width: Math.min(paidPercent(loan), 100) + '%' }"
                      ></div>
                    </div>
                    <div class="flex justify-between text-[9px] text-slate-400 uppercase tracking-widest">
                      <span>฿ {{ paidAmount(loan).toLocaleString() }} paid</span>
                      <span>฿ {{ loan.totalAmount.toLocaleString() }} total</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Key Numbers -->
              <div class="grid grid-cols-2 gap-5 sm:flex sm:flex-col sm:gap-5 sm:text-right shrink-0">
                <div>
                  <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Requested</p>
                  <p class="text-lg font-light tracking-tight text-slate-900">
                    ฿ {{ loan.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 0 }) }}
                  </p>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Unpaid</p>
                  <p class="text-xl font-light tracking-tight text-rose-500">
                    ฿ {{ loan.remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 0 }) }}
                  </p>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Monthly</p>
                  <p class="text-base font-medium text-slate-900">
                    ฿ {{ loan.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 0 }) }}
                  </p>
                </div>
                <div class="hidden sm:block">
                  <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Est. Months Left</p>
                  <p class="text-sm font-medium text-slate-700">
                    {{ estimatedMonthsLeft(loan) }} mo.
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer row -->
            <div class="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
              <p class="text-[9px] text-slate-300 uppercase tracking-widest">
                Updated {{ formatLoanDate(loan.updatedAt) }}
              </p>
              <div class="flex gap-4">
                <button
                  @click="openTransfer(loan)"
                  :disabled="availableToDraw(loan) <= 0"
                  :class="[
                    'text-[9px] font-bold uppercase tracking-widest transition-colors',
                    availableToDraw(loan) > 0
                      ? 'text-indigo-500 hover:text-indigo-700'
                      : 'text-slate-300 cursor-not-allowed'
                  ]"
                  :title="availableToDraw(loan) <= 0 ? 'No available credit to draw' : 'Transfer funds to wallet'"
                >Transfer</button>
                <button
                  @click="startEdit(loan)"
                  class="text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors"
                >Edit</button>
                <button
                  @click="removeLoan(loan.id)"
                  class="text-[9px] font-bold text-rose-400 uppercase tracking-widest hover:text-rose-600 transition-colors"
                >Remove</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Loan Modal -->
        <div
          v-if="showAddForm"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          @click.self="showAddForm = false"
        >
          <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between mb-8">
              <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Register New Loan</h4>
              <button
                @click="showAddForm = false"
                type="button"
                class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900"
              >Close</button>
            </div>
            <form @submit.prevent="addLoan" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Loan Name</label>
                <input
                  v-model="newLoan.name"
                  type="text"
                  placeholder="E.g. Home Loan"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Lender</label>
                <input
                  v-model="newLoan.lender"
                  type="text"
                  placeholder="E.g. Kasikorn Bank"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Total Loan Amount (฿)</label>
                <input
                  v-model.number="newLoan.totalAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Remaining Balance (฿)</label>
                <input
                  v-model.number="newLoan.remainingBalance"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Monthly Payment (฿)</label>
                <input
                  v-model.number="newLoan.monthlyPayment"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Interest Rate (%/yr)</label>
                <input
                  v-model.number="newLoan.interestRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                <input
                  v-model="newLoan.startDate"
                  type="date"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                <input
                  v-model="newLoan.endDate"
                  type="date"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>
              <div class="sm:col-span-2 space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Color Tag</label>
                <div class="flex flex-wrap gap-3 px-1 pt-1">
                  <button
                    v-for="color in loanColorChoices"
                    :key="color"
                    type="button"
                    @click="newLoan.colorCode = color"
                    :class="[
                      'h-8 w-8 rounded-full border-2 transition-all',
                      newLoan.colorCode === color ? 'border-slate-900 scale-110' : 'border-white'
                    ]"
                    :style="{ backgroundColor: color }"
                  ></button>
                </div>
              </div>
              <div class="sm:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  @click="showAddForm = false"
                  class="px-6 py-3 rounded-2xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500"
                >Cancel</button>
                <button
                  type="submit"
                  class="px-10 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all"
                >Register Loan</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Transfer to Wallet Modal -->
        <div
          v-if="transferringLoan"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          @click.self="closeTransfer"
        >
          <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Receive Funds</h4>
                <p class="text-base font-semibold text-slate-900">{{ transferringLoan.name }}</p>
              </div>
              <button
                @click="closeTransfer"
                class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900"
              >Close</button>
            </div>

            <!-- Available credit info -->
            <div class="mb-6 p-4 bg-indigo-50 rounded-2xl">
              <div class="flex justify-between text-[10px] uppercase tracking-widest font-bold text-indigo-500 mb-2">
                <span>Available Credit</span>
                <span>฿ {{ availableToDraw(transferringLoan).toLocaleString() }}</span>
              </div>
              <div class="w-full bg-indigo-100 h-1.5 rounded-full overflow-hidden">
                <div
                  class="h-full bg-indigo-500 rounded-full transition-all duration-700"
                  :style="{ width: Math.min((availableToDraw(transferringLoan) / transferringLoan.totalAmount) * 100, 100) + '%' }"
                ></div>
              </div>
            </div>

            <form @submit.prevent="requestTransferConfirm" class="space-y-5">
              <!-- Destination Wallet -->
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Destination Wallet</label>
                <AppDropdown
                  v-model="transferForm.walletId"
                  label="Select wallet..."
                  :items="transferWalletDropdownItems"
                  :disabled="walletsLoading || transferWalletDropdownItems.length === 0"
                  unstyled
                  trigger-class="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus-within:bg-white focus-within:border-slate-100 transition-all text-sm text-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  menu-class="w-full"
                />
                <p v-if="walletsLoading" class="text-[9px] text-slate-400 ml-1">Loading wallets...</p>
                <p v-else-if="transferWalletDropdownItems.length === 0" class="text-[9px] text-rose-400 ml-1">No destination wallet available.</p>
              </div>

              <!-- Amount -->
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Amount to Draw (฿)</label>
                <input
                  v-model.number="transferForm.amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
                <p class="text-[9px] text-slate-400 ml-1">Max: ฿ {{ availableToDraw(transferringLoan).toLocaleString() }}</p>
              </div>

              <!-- Note -->
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Note (Optional)</label>
                <input
                  v-model="transferForm.note"
                  type="text"
                  placeholder="E.g. Loan disbursement"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>

              <!-- Preview -->
              <div v-if="transferForm.walletId && transferForm.amount > 0" class="p-4 bg-slate-50 rounded-2xl space-y-2">
                <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Transfer Preview</p>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Wallet receives</span>
                  <span class="font-semibold text-emerald-600">+ ฿ {{ Number(transferForm.amount).toLocaleString() }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Loan drawn</span>
                  <span class="font-semibold text-rose-500">+ ฿ {{ Number(transferForm.amount).toLocaleString() }}</span>
                </div>
                <div class="flex justify-between text-sm pt-1 border-t border-slate-100">
                  <span class="text-slate-500">New remaining balance</span>
                  <span class="font-semibold text-slate-900">
                    ฿ {{ (transferringLoan.remainingBalance + Number(transferForm.amount)).toLocaleString() }}
                  </span>
                </div>
              </div>

              <div class="flex gap-3 pt-2">
                <button
                  type="button"
                  @click="closeTransfer"
                  class="flex-1 py-3 rounded-2xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500"
                >Cancel</button>
                <button
                  type="submit"
                  :disabled="transferSaving"
                  class="flex-1 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all disabled:opacity-60"
                >
                  {{ transferSaving ? 'Processing...' : 'Confirm Transfer' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Edit Modal -->
        <div
          v-if="editingLoan"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          @click.self="editingLoan = null"
        >
          <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between mb-8">
              <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Edit Loan</h4>
              <button
                @click="editingLoan = null"
                class="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900"
              >Close</button>
            </div>
            <form @submit.prevent="saveEdit" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Loan Name</label>
                <input
                  v-model="editForm.name"
                  type="text"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Lender</label>
                <input
                  v-model="editForm.lender"
                  type="text"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Total Loan Amount (฿)</label>
                <input
                  v-model.number="editForm.totalAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Remaining Balance (฿)</label>
                <input
                  v-model.number="editForm.remainingBalance"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Monthly Payment (฿)</label>
                <input
                  v-model.number="editForm.monthlyPayment"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Interest Rate (%/yr)</label>
                <input
                  v-model.number="editForm.interestRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                <input
                  v-model="editForm.startDate"
                  type="date"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                <input
                  v-model="editForm.endDate"
                  type="date"
                  class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-100 transition-all text-sm"
                />
              </div>
              <div class="sm:col-span-2 space-y-2">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Color Tag</label>
                <div class="flex flex-wrap gap-3 px-1">
                  <button
                    v-for="color in loanColorChoices"
                    :key="color"
                    type="button"
                    @click="editForm.colorCode = color"
                    :class="[
                      'h-8 w-8 rounded-full border-2 transition-all',
                      editForm.colorCode === color ? 'border-slate-900 scale-110' : 'border-white'
                    ]"
                    :style="{ backgroundColor: color }"
                  ></button>
                </div>
              </div>
              <div class="sm:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  @click="editingLoan = null"
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
    </main>

    <AppConfirmModal
      :open="transferConfirmOpen"
      title="Confirm Transfer"
      :description="transferConfirmDescription"
      confirm-label="Transfer"
      cancel-label="Cancel"
      @update:open="transferConfirmOpen = false"
      @confirm="executeTransfer"
      @cancel="transferConfirmOpen = false"
    />

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

    <div
      v-if="toastMessage"
      class="fixed top-6 right-6 z-[70] rounded-2xl border bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-widest shadow-2xl"
      :class="toastType === 'error' ? 'border-rose-200 text-rose-600' : 'border-emerald-200 text-emerald-600'"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useSidebarNavigation } from "../../composables/useSidebarNavigation";
import { useAuthApi } from "../../composables/useAuthApi";

// ─── Types ───────────────────────────────────────────────────────────────────
type WalletItem = {
  id: string;
  name: string;
  balance: number;
  currency: string;
  colorCode: string;
};

type LoanItem = {
  id: string;
  name: string;
  lender: string;
  totalAmount: number;
  remainingBalance: number;
  monthlyPayment: number;
  interestRate: number;
  startDate: string;
  endDate: string;
  colorCode: string;
  updatedAt: string;
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const mobileSidebarOpen = ref(false);
const {
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
    "loans" === key
      ? "bg-slate-900 text-white"
      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
  ].join(" ");

// ─── Wallets ──────────────────────────────────────────────────────────────────
const { listMyWallets, updateMyWallet, listMyLoans, createMyLoan, updateMyLoan, deleteMyLoan, createMyTransaction } = useAuthApi();
const wallets = ref<WalletItem[]>([]);
const walletsLoading = ref(false);

const transferWalletDropdownItems = computed(() => {
  return wallets.value.map((wallet) => ({
    label: `${wallet.name} (฿ ${wallet.balance.toLocaleString()})`,
    value: wallet.id,
  }));
});

const loadWallets = async () => {
  walletsLoading.value = true;
  try {
    const res = await listMyWallets({ page: 1, size: 200, isActive: true });
    wallets.value = (res.items || []).map((item) => ({
      id: item.id,
      name: item.name,
      balance: Number(item.balance || 0),
      currency: item.currency || "THB",
      colorCode: item.color_code || "#0F172A",
    }));
  } catch {
    // Silently fail – user can still see the modal with no wallets
  } finally {
    walletsLoading.value = false;
  }
};

onMounted(() => {
  void loadWallets();
  void loadLoans();
});

// ─── Constants ───────────────────────────────────────────────────────────────
const loanColorChoices = [
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#0F172A", // slate-900
];

const FIXED_LOAN_DRAW_CATEGORY_ID = "a1b2c3d4-0000-4000-8000-000000000002";

// ─── Loans Data ──────────────────────────────────────────────────────────────
const loans = ref<LoanItem[]>([]);

const mapLoan = (item: { id: string; name: string; lender: string; total_amount: number; remaining_balance: number; monthly_payment: number; interest_rate: number; start_date: string | null; end_date: string | null; updated_at: string }): LoanItem => ({
  id: item.id,
  name: item.name,
  lender: item.lender || "",
  totalAmount: Number(item.total_amount) || 0,
  remainingBalance: Number(item.remaining_balance) || 0,
  monthlyPayment: Number(item.monthly_payment) || 0,
  interestRate: Number(item.interest_rate) || 0,
  startDate: item.start_date || "",
  endDate: item.end_date || "",
  colorCode: "#6366f1",
  updatedAt: item.updated_at || "",
});

const loadLoans = async () => {
  try {
    const res = await listMyLoans({ page: 1, size: 200 });
    loans.value = (res.items || []).map(mapLoan);
  } catch {
    // Silently fail
  }
};

// ─── Computed ─────────────────────────────────────────────────────────────────
const totalBorrowed = computed(() =>
  loans.value.reduce((acc, l) => acc + l.totalAmount, 0)
);
const totalOutstanding = computed(() =>
  loans.value.reduce((acc, l) => acc + l.remainingBalance, 0)
);
const totalMonthlyPayment = computed(() =>
  loans.value.reduce((acc, l) => acc + l.monthlyPayment, 0)
);
const overallPaidPercent = computed(() => {
  if (totalBorrowed.value === 0) return 0;
  return ((totalBorrowed.value - totalOutstanding.value) / totalBorrowed.value) * 100;
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
const paidAmount = (loan: LoanItem) =>
  Math.max(0, loan.totalAmount - loan.remainingBalance);

const paidPercent = (loan: LoanItem) => {
  if (loan.totalAmount === 0) return 0;
  return (paidAmount(loan) / loan.totalAmount) * 100;
};

const estimatedMonthsLeft = (loan: LoanItem) => {
  if (loan.monthlyPayment <= 0) return "–";
  return Math.ceil(loan.remainingBalance / loan.monthlyPayment).toString();
};

const formatLoanDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "–";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "–";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

const today = () => new Date().toISOString().split("T")[0];

// ─── Add Loan ────────────────────────────────────────────────────────────────
const showAddForm = ref(false);
const newLoan = reactive({
  name: "",
  lender: "",
  totalAmount: 0,
  remainingBalance: 0,
  monthlyPayment: 0,
  interestRate: 0,
  startDate: today(),
  endDate: "",
  colorCode: "#6366f1",
});

const addLoan = async () => {
  try {
    const created = await createMyLoan({
      name: newLoan.name.trim(),
      lender: newLoan.lender.trim() || undefined,
      total_amount: Number(newLoan.totalAmount) || 0,
      remaining_balance: Number(newLoan.remainingBalance) || 0,
      monthly_payment: Number(newLoan.monthlyPayment) || 0,
      interest_rate: Number(newLoan.interestRate) || 0,
      start_date: newLoan.startDate || undefined,
      end_date: newLoan.endDate || undefined,
    });
    loans.value.unshift(mapLoan(created.data));
  } catch {
    // Silently fail
  }

  // Reset form
  newLoan.name = "";
  newLoan.lender = "";
  newLoan.totalAmount = 0;
  newLoan.remainingBalance = 0;
  newLoan.monthlyPayment = 0;
  newLoan.interestRate = 0;
  newLoan.startDate = today();
  newLoan.endDate = "";
  newLoan.colorCode = "#6366f1";
  showAddForm.value = false;
};

// ─── Edit Loan ───────────────────────────────────────────────────────────────
const editingLoan = ref<LoanItem | null>(null);
const editForm = reactive({
  name: "",
  lender: "",
  totalAmount: 0,
  remainingBalance: 0,
  monthlyPayment: 0,
  interestRate: 0,
  startDate: "",
  endDate: "",
  colorCode: "#6366f1",
});

const startEdit = (loan: LoanItem) => {
  editingLoan.value = loan;
  editForm.name = loan.name;
  editForm.lender = loan.lender;
  editForm.totalAmount = loan.totalAmount;
  editForm.remainingBalance = loan.remainingBalance;
  editForm.monthlyPayment = loan.monthlyPayment;
  editForm.interestRate = loan.interestRate;
  editForm.startDate = loan.startDate;
  editForm.endDate = loan.endDate;
  editForm.colorCode = loan.colorCode;
};

const saveEdit = async () => {
  if (!editingLoan.value) return;
  try {
    const updated = await updateMyLoan(editingLoan.value.id, {
      name: editForm.name.trim(),
      lender: editForm.lender.trim() || undefined,
      total_amount: Number(editForm.totalAmount) || 0,
      remaining_balance: Number(editForm.remainingBalance) || 0,
      monthly_payment: Number(editForm.monthlyPayment) || 0,
      interest_rate: Number(editForm.interestRate) || 0,
      start_date: editForm.startDate || undefined,
      end_date: editForm.endDate || undefined,
    });
    const idx = loans.value.findIndex((l) => l.id === editingLoan.value!.id);
    if (idx !== -1) {
      loans.value[idx] = { ...loans.value[idx], ...mapLoan(updated.data) };
    }
  } catch {
    // Silently fail
  }
  editingLoan.value = null;
};

// ─── Remove Loan ──────────────────────────────────────────────────────────────
const removeLoan = async (id: string) => {
  try {
    await deleteMyLoan(id);
    loans.value = loans.value.filter((l) => l.id !== id);
  } catch {
    // Silently fail
  }
};

// ─── Transfer to Wallet ───────────────────────────────────────────────────────
const transferringLoan = ref<LoanItem | null>(null);
const transferSaving = ref(false);
const transferConfirmOpen = ref(false);
const toastMessage = ref("");
const toastType = ref<"error" | "success">("error");
let toastTimer: ReturnType<typeof setTimeout> | null = null;
const transferForm = reactive({
  walletId: "",
  amount: 0,
  note: "",
});

const showToast = (message: string, type: "error" | "success" = "error") => {
  toastType.value = type;
  toastMessage.value = message;

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    toastMessage.value = "";
    toastTimer = null;
  }, 2200);
};

const transferTargetWallet = computed(() => {
  return wallets.value.find((wallet) => wallet.id === transferForm.walletId) ?? null;
});

const transferConfirmDescription = computed(() => {
  if (!transferringLoan.value || !transferTargetWallet.value) {
    return "Please review transfer details before confirming.";
  }

  const amount = Number(transferForm.amount) || 0;
  return `Transfer ฿${amount.toLocaleString()} from ${transferringLoan.value.name} to ${transferTargetWallet.value.name}?`;
});

// Available credit = totalAmount - remainingBalance
// (e.g. revolving line: limit 2M, owed 1.5M → 500K available to draw)
const availableToDraw = (loan: LoanItem) =>
  Math.max(0, loan.totalAmount - loan.remainingBalance);

const openTransfer = (loan: LoanItem) => {
  transferringLoan.value = loan;
  transferForm.walletId = "";
  transferForm.amount = 0;
  transferForm.note = "";
};

const closeTransfer = () => {
  transferringLoan.value = null;
  transferConfirmOpen.value = false;
};

const requestTransferConfirm = () => {
  if (!transferringLoan.value) return;

  const loan = transferringLoan.value;
  const drawAmount = Number(transferForm.amount) || 0;
  const maxDraw = availableToDraw(loan);

  if (drawAmount <= 0) {
    showToast("Amount must be greater than 0.");
    return;
  }
  if (drawAmount > maxDraw) {
    showToast(`Amount exceeds available credit of ฿${maxDraw.toLocaleString()}.`);
    return;
  }
  if (!transferForm.walletId) {
    showToast("Please select a destination wallet.");
    return;
  }

  const targetWallet = wallets.value.find((w) => w.id === transferForm.walletId);
  if (!targetWallet) {
    showToast("Wallet not found.");
    return;
  }

  transferConfirmOpen.value = true;
};

const executeTransfer = async () => {
  if (!transferringLoan.value) return;

  const loan = transferringLoan.value;
  const drawAmount = Number(transferForm.amount) || 0;
  const targetWallet = wallets.value.find((w) => w.id === transferForm.walletId);

  if (!targetWallet) {
    showToast("Wallet not found.");
    transferConfirmOpen.value = false;
    return;
  }

  transferSaving.value = true;
  transferConfirmOpen.value = false;

  try {
    const txDate = today();
    const txNote = transferForm.note.trim() || `Loan draw from ${loan.name}`;

    await createMyTransaction({
      wallet_id: targetWallet.id,
      category_id: FIXED_LOAN_DRAW_CATEGORY_ID,
      amount: drawAmount,
      type: "income",
      transaction_date: txDate,
      note: txNote,
    });

    // Update wallet balance via API
    const newBalance = targetWallet.balance + drawAmount;
    await updateMyWallet(targetWallet.id, { balance: newBalance });

    // Update wallet in local state
    const wIdx = wallets.value.findIndex((w) => w.id === targetWallet.id);
    if (wIdx !== -1) {
      wallets.value[wIdx] = { ...wallets.value[wIdx], balance: newBalance };
    }

    // Update loan remaining balance via API
    const newRemaining = loan.remainingBalance + drawAmount;
    await updateMyLoan(loan.id, { remaining_balance: newRemaining });

    // Update loan in local state
    const lIdx = loans.value.findIndex((l) => l.id === loan.id);
    if (lIdx !== -1) {
      loans.value[lIdx] = {
        ...loans.value[lIdx],
        remainingBalance: newRemaining,
        updatedAt: today(),
      };
    }

    closeTransfer();
    showToast("Transfer completed.", "success");
  } catch {
    showToast("Transfer failed. Please try again.");
  } finally {
    transferSaving.value = false;
  }
};
</script>
