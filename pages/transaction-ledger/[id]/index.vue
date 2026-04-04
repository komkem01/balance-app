<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthApi } from "../../../composables/useAuthApi";

type TransactionType = "income" | "expense";

type TransactionItem = {
	id: string;
	wallet_id: string | null;
	category_id: string | null;
	amount: number;
	type: TransactionType;
	transaction_date: string | null;
	note: string;
	image_url: string;
	created_at: string;
	updated_at: string;
};

type WalletItem = {
	id: string;
	name: string;
};

type CategoryItem = {
	id: string;
	name: string;
	type: TransactionType;
};

type TransferDirection = "in" | "out";

type TransferNoteMeta = {
	ref: string;
	direction: TransferDirection;
	counterpartyWalletID: string;
	userNote: string;
};

const transferNotePrefix = "__transfer__|";

const parseTransferNote = (note: string): TransferNoteMeta | null => {
	if (!note.startsWith(transferNotePrefix)) {
		return null;
	}

	const [prefix, ref, direction, counterpartyWalletID, ...rest] = note.split("|");
	if (prefix !== "__transfer__") {
		return null;
	}
	if (!ref || (direction !== "in" && direction !== "out") || !counterpartyWalletID) {
		return null;
	}

	return {
		ref,
		direction,
		counterpartyWalletID,
		userNote: rest.join("|").trim(),
	};
};

const route = useRoute();
const router = useRouter();
const api = useAuthApi();

const loading = ref(true);
const errorMessage = ref("");
const actionError = ref("");
const actionLoading = ref(false);
const editMode = ref(false);
const deleteConfirmOpen = ref(false);
const toastMessage = ref("");
const transaction = ref<TransactionItem | null>(null);
const wallets = ref<WalletItem[]>([]);
const categories = ref<CategoryItem[]>([]);
const slipDisplayURL = ref("");

const editForm = reactive({
	wallet_id: "",
	category_id: "",
	amount: 0,
	type: "expense" as TransactionType,
	transaction_date: "",
	note: "",
});

const transactionID = computed(() => {
	const id = route.params.id;
	if (Array.isArray(id)) {
		return id[0] || "";
	}
	return String(id || "").trim();
});

const moneyFormatter = new Intl.NumberFormat(undefined, {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	month: "short",
	year: "numeric",
});

const formatDateTime = (value: string | null) => {
	if (!value) {
		return "-";
	}

	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) {
		return value;
	}

	return dateTimeFormatter.format(parsed);
};

const walletName = computed(() => {
	const walletID = transaction.value?.wallet_id;
	if (!walletID) {
		return "Unknown Wallet";
	}
	const item = wallets.value.find((wallet) => wallet.id === walletID);
	return item?.name || "Unknown Wallet";
});

const categoryName = computed(() => {
	if (isTransferTransaction.value) {
		return "Transfer";
	}

	const categoryID = transaction.value?.category_id;
	if (!categoryID) {
		return "Uncategorized";
	}
	const item = categories.value.find((category) => category.id === categoryID);
	return item?.name || "Uncategorized";
});

const transferMeta = computed(() => {
	if (!transaction.value) {
		return null;
	}

	return parseTransferNote(transaction.value.note || "");
});

const isTransferTransaction = computed(() => {
	if (!transaction.value) {
		return false;
	}

	return transferMeta.value !== null || transaction.value.note === "Wallet transfer";
});

const entryTypeBadgeLabel = computed(() => {
	if (isTransferTransaction.value) {
		if (transferMeta.value?.direction === "out") {
			return "Transfer Out";
		}
		if (transferMeta.value?.direction === "in") {
			return "Transfer In";
		}
		return "Transfer";
	}

	return transaction.value?.type || "-";
});

const counterpartyWalletName = computed(() => {
	const walletID = transferMeta.value?.counterpartyWalletID;
	if (!walletID) {
		return "Unknown Wallet";
	}

	const item = wallets.value.find((wallet) => wallet.id === walletID);
	return item?.name || "Unknown Wallet";
});

const transferRouteLabel = computed(() => {
	if (!isTransferTransaction.value) {
		return "";
	}

	if (transferMeta.value?.direction === "out") {
		return `From ${walletName.value} to ${counterpartyWalletName.value}`;
	}
	if (transferMeta.value?.direction === "in") {
		return `From ${counterpartyWalletName.value} to ${walletName.value}`;
	}

	return "Wallet transfer";
});

const displayNote = computed(() => {
	if (!transaction.value) {
		return "-";
	}

	if (!isTransferTransaction.value) {
		return transaction.value.note || "-";
	}

	if (transferMeta.value?.userNote) {
		return transferMeta.value.userNote;
	}

	return "Wallet transfer";
});

const displayedSlipURL = computed(() => {
	return slipDisplayURL.value || transaction.value?.image_url || "";
});

let toastTimer: ReturnType<typeof setTimeout> | null = null;

const showToast = (message: string, duration = 1800) => {
	toastMessage.value = message;
	if (toastTimer) {
		clearTimeout(toastTimer);
	}
	toastTimer = setTimeout(() => {
		toastMessage.value = "";
		toastTimer = null;
	}, duration);
};

const editCategoryOptions = computed(() => {
	return categories.value.filter((item) => item.type === editForm.type);
});

const isValidTwoDecimalAmount = (amount: number) => {
	if (!Number.isFinite(amount)) {
		return false;
	}

	return Math.abs(amount * 100 - Math.round(amount * 100)) < 1e-8;
};

const normalizeDateInput = (value: string | null) => {
	if (!value) {
		return "";
	}

	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return value;
	}

	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) {
		return "";
	}

	return parsed.toISOString().split("T")[0];
};

const fillEditForm = () => {
	if (!transaction.value) {
		return;
	}

	editForm.wallet_id = transaction.value.wallet_id || "";
	editForm.category_id = transaction.value.category_id || "";
	editForm.amount = Number(transaction.value.amount || 0);
	editForm.type = transaction.value.type;
	editForm.transaction_date = normalizeDateInput(transaction.value.transaction_date);
	editForm.note = transaction.value.note || "";
};

const backToLedger = () => {
	void router.push("/transaction-ledger");
};

const openEditMode = () => {
	fillEditForm();
	actionError.value = "";
	editMode.value = true;
};

const cancelEditMode = () => {
	actionError.value = "";
	editMode.value = false;
};

const saveTransactionUpdate = async () => {
	if (!transaction.value) {
		return;
	}

	if (!editForm.wallet_id || !editForm.category_id) {
		actionError.value = "wallet-and-category-required";
		return;
	}

	if (!Number.isFinite(editForm.amount) || editForm.amount < 0) {
		actionError.value = "transaction-amount-must-be-non-negative";
		return;
	}

	if (!isValidTwoDecimalAmount(editForm.amount)) {
		actionError.value = "transaction-amount-must-have-two-decimals";
		return;
	}

	actionLoading.value = true;
	actionError.value = "";
	try {
		await api.updateMyTransaction(transaction.value.id, {
			wallet_id: editForm.wallet_id,
			category_id: editForm.category_id,
			amount: Math.round(editForm.amount * 100) / 100,
			type: editForm.type,
			transaction_date: editForm.transaction_date || undefined,
			note: editForm.note.trim(),
		});

		await loadTransactionDetail();
		editMode.value = false;
		showToast("Saved successfully");
	} catch (error) {
		actionError.value = error instanceof Error ? error.message : "transaction-update-failed";
	} finally {
		actionLoading.value = false;
	}
};

const requestDeleteTransaction = () => {
	deleteConfirmOpen.value = true;
	actionError.value = "";
};

const cancelDeleteTransaction = () => {
	deleteConfirmOpen.value = false;
};

const confirmDeleteTransaction = async () => {
	if (!transaction.value) {
		deleteConfirmOpen.value = false;
		return;
	}

	actionLoading.value = true;
	actionError.value = "";
	try {
		await api.deleteMyTransaction(transaction.value.id);
		deleteConfirmOpen.value = false;
		showToast("Deleted successfully");
		await new Promise((resolve) => {
			setTimeout(resolve, 700);
		});
		void router.push("/transaction-ledger");
	} catch (error) {
		actionError.value = error instanceof Error ? error.message : "transaction-delete-failed";
	} finally {
		actionLoading.value = false;
	}
};

const loadTransactionDetail = async () => {
	if (!transactionID.value) {
		errorMessage.value = "Transaction id is missing.";
		loading.value = false;
		return;
	}

	loading.value = true;
	errorMessage.value = "";

	try {
		const [transactionRes, walletsRes, categoriesRes] = await Promise.all([
			api.getMyTransaction(transactionID.value),
			api.listMyWallets({ page: 1, size: 300, isActive: true }),
			api.listMyCategories({ page: 1, size: 300 }),
		]);

		transaction.value = transactionRes.data;
		wallets.value = (walletsRes.items || []).map((item) => ({
			id: item.id,
			name: item.name,
		}));
		categories.value = (categoriesRes.items || []).map((item) => ({
			id: item.id,
			name: item.name,
			type: item.type,
		}));
		fillEditForm();

		if (transactionRes.data.image_url) {
			try {
				const slipRes = await api.getMyTransactionSlip(transactionID.value);
				slipDisplayURL.value = slipRes.data.display_image_url || slipRes.data.image_url || "";
			} catch {
				slipDisplayURL.value = transactionRes.data.image_url || "";
			}
		} else {
			slipDisplayURL.value = "";
		}
	} catch (error) {
		if (error instanceof Error && error.message) {
			errorMessage.value = error.message;
		} else {
			errorMessage.value = "Unable to load transaction detail.";
		}
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	void loadTransactionDetail();
});

onUnmounted(() => {
	if (toastTimer) {
		clearTimeout(toastTimer);
		toastTimer = null;
	}
});

watch(
	() => editForm.type,
	() => {
		if (!editForm.category_id) {
			return;
		}

		const exists = editCategoryOptions.value.some((category) => category.id === editForm.category_id);
		if (!exists) {
			editForm.category_id = editCategoryOptions.value[0]?.id || "";
		}
	},
);
</script>

<template>
	<div class="relative min-h-screen overflow-hidden bg-slate-50 p-6 text-slate-900 md:p-10">
		<div class="pointer-events-none absolute inset-0 z-0">
			<div class="mesh-gradient absolute inset-0 opacity-40"></div>
		</div>

		<main class="relative z-10 mx-auto max-w-5xl space-y-6">
			<div class="flex flex-wrap items-center justify-between gap-4">
				<div>
					<p class="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Transaction Detail</p>
					<h1 class="text-3xl font-light tracking-tight text-slate-900">Ledger Item</h1>
				</div>
				<div class="flex flex-wrap items-center gap-2">
					<button
						type="button"
						class="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
						@click="openEditMode"
					>
						Edit This Transaction
					</button>
					<button
						type="button"
						class="inline-flex items-center rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-rose-700 transition hover:border-rose-400 hover:bg-rose-100"
						@click="requestDeleteTransaction"
					>
						Delete This Transaction
					</button>
					<button
						type="button"
						class="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
						@click="backToLedger"
					>
						Back to Ledger
					</button>
				</div>
			</div>

			<p v-if="actionError" class="text-sm font-semibold text-rose-600">{{ actionError }}</p>

			<AppLoading v-if="loading" overlay label="Loading transaction detail..." />

			<div
				v-if="!loading && errorMessage"
				class="rounded-3xl border border-rose-200 bg-rose-50 p-6"
			>
				<p class="text-sm font-semibold text-rose-700">{{ errorMessage }}</p>
				<button
					type="button"
					class="mt-4 inline-flex items-center rounded-xl bg-rose-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700"
					@click="loadTransactionDetail"
				>
					Retry
				</button>
			</div>

			<section
				v-if="!loading && transaction"
				class="grid gap-6 lg:grid-cols-[1.6fr_1fr]"
			>
				<article
					v-if="editMode"
					class="rounded-[2rem] border border-amber-100 bg-amber-50/60 p-6 shadow-sm lg:col-span-2"
				>
					<h2 class="text-sm font-bold uppercase tracking-widest text-amber-900">Edit Transaction</h2>
					<div class="mt-5 grid gap-4 md:grid-cols-2">
						<div class="space-y-2">
							<label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Type</label>
							<select v-model="editForm.type" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
								<option value="expense">Expense</option>
								<option value="income">Income</option>
							</select>
						</div>
						<div class="space-y-2">
							<label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Amount</label>
							<input v-model.number="editForm.amount" type="number" step="0.01" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" />
						</div>
						<div class="space-y-2">
							<label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Wallet</label>
							<select v-model="editForm.wallet_id" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
								<option value="" disabled>Select wallet</option>
								<option v-for="wallet in wallets" :key="wallet.id" :value="wallet.id">{{ wallet.name }}</option>
							</select>
						</div>
						<div class="space-y-2">
							<label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Category</label>
							<select v-model="editForm.category_id" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
								<option value="" disabled>Select category</option>
								<option v-for="category in editCategoryOptions" :key="category.id" :value="category.id">{{ category.name }}</option>
							</select>
						</div>
						<div class="space-y-2">
							<label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Transaction Date</label>
							<input v-model="editForm.transaction_date" type="date" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" />
						</div>
						<div class="space-y-2 md:col-span-2">
							<label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Note</label>
							<textarea v-model="editForm.note" rows="3" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"></textarea>
						</div>
					</div>
					<div class="mt-5 flex items-center justify-end gap-3">
						<button type="button" class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600" @click="cancelEditMode">Cancel</button>
						<button type="button" class="rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white disabled:opacity-50" :disabled="actionLoading" @click="saveTransactionUpdate">
							{{ actionLoading ? 'Saving...' : 'Save Changes' }}
						</button>
					</div>
				</article>

				<article class="rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-sm backdrop-blur-xl">
					<div class="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
						<div>
							<p class="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Transaction Overview</p>
							<p class="mt-2 text-sm text-slate-600">Summary of this record</p>
						</div>
						<span
							:class="[
								'rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest',
								isTransferTransaction
									? 'bg-blue-100 text-blue-700'
									: transaction.type === 'expense'
										? 'bg-rose-100 text-rose-700'
										: 'bg-emerald-100 text-emerald-700'
							]"
						>
							{{ entryTypeBadgeLabel }}
						</span>
					</div>

					<div class="mt-6 grid gap-5 sm:grid-cols-2">
						<div>
							<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Amount</p>
							<p class="mt-2 text-3xl font-semibold tracking-tight" :class="isTransferTransaction ? 'text-blue-600' : (transaction.type === 'expense' ? 'text-rose-600' : 'text-emerald-600')">
								{{ transaction.type === 'expense' ? '-' : '+' }} {{ moneyFormatter.format(Number(transaction.amount || 0)) }}
							</p>
						</div>
						<div>
							<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Wallet</p>
							<p class="mt-2 text-base font-medium text-slate-900">{{ walletName }}</p>
						</div>
						<div>
							<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Category</p>
							<p class="mt-2 text-base font-medium text-slate-900">{{ categoryName }}</p>
						</div>
						<div v-if="isTransferTransaction" class="sm:col-span-2">
							<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Transfer Route</p>
							<p class="mt-2 text-base font-medium text-blue-700">{{ transferRouteLabel }}</p>
						</div>
						<div>
							<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Transaction Date</p>
							<p class="mt-2 text-base font-medium text-slate-900">{{ formatDateTime(transaction.transaction_date) }}</p>
						</div>
						<div>
							<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Created At</p>
							<p class="mt-2 text-base font-medium text-slate-900">{{ formatDateTime(transaction.created_at) }}</p>
						</div>
						<div>
							<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Updated At</p>
							<p class="mt-2 text-base font-medium text-slate-900">{{ formatDateTime(transaction.updated_at) }}</p>
						</div>
					</div>

					<div class="mt-7 border-t border-slate-100 pt-6">
						<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Note</p>
						<p class="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
							{{ displayNote }}
						</p>
					</div>
				</article>

				<aside class="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
					<p class="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Slip Attachment</p>

					<div v-if="displayedSlipURL" class="mt-4 space-y-4">
						<img
							:src="displayedSlipURL"
							alt="Transaction slip"
							class="h-72 w-full rounded-2xl border border-slate-100 object-cover"
							loading="lazy"
						/>
						<a
							:href="displayedSlipURL"
							target="_blank"
							rel="noreferrer"
							class="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
						>
							Open Original
						</a>
					</div>

					<div
						v-else
						class="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center"
					>
						<p class="text-sm font-medium text-slate-500">No slip uploaded for this transaction.</p>
					</div>
				</aside>
			</section>
		</main>
	</div>

	<Transition
		enter-active-class="transition duration-300 ease-out"
		enter-from-class="translate-y-2 opacity-0"
		enter-to-class="translate-y-0 opacity-100"
		leave-active-class="transition duration-200 ease-in"
		leave-from-class="translate-y-0 opacity-100"
		leave-to-class="translate-y-2 opacity-0"
	>
		<div
			v-if="toastMessage"
			class="fixed right-6 top-6 z-50 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 shadow-lg"
		>
			{{ toastMessage }}
		</div>
	</Transition>

	<AppConfirmModal
		:open="deleteConfirmOpen"
		title="Confirm Delete"
		description="Delete this transaction permanently?"
		confirm-label="Delete"
		cancel-label="Cancel"
		@update:open="cancelDeleteTransaction"
		@confirm="confirmDeleteTransaction"
		@cancel="cancelDeleteTransaction"
	/>
</template>

<style scoped>
.mesh-gradient {
	background-color: #f8fafc;
	background-image:
		radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.08) 0px, transparent 45%),
		radial-gradient(at 100% 0%, rgba(20, 184, 166, 0.08) 0px, transparent 45%),
		radial-gradient(at 100% 100%, rgba(234, 179, 8, 0.08) 0px, transparent 45%),
		radial-gradient(at 0% 100%, rgba(56, 189, 248, 0.08) 0px, transparent 45%);
}
</style>
