<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRuntimeConfig } from "nuxt/app"
import { useAuthApi } from "../composables/useAuthApi"

const REMEMBERED_USERNAME_KEY = "balance_app_remembered_username"
const LOCALE_KEY = "balance_app_locale"
const LOCALE_EVENT = "app-locale-changed"
type Locale = "en" | "th"

const normalizeLocale = (value: string | null | undefined): Locale => {
  if (value === "th" || value === "TH") {
    return "th"
  }

  return "en"
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    fallbackRequestFailed: "Request failed",
    loginSuccess: "Security Verified",
    sessionExpired: "Session expired, please login again",
    brandTagline: "Wealth Archive",
    usernameLabel: "Identification",
    usernamePlaceholder: "Username",
    passwordLabel: "Security Key",
    hidePassword: "Hide password",
    showPassword: "Show password",
    rememberMe: "Keep me signed in",
    loginButton: "Login",
    newToSystem: "New to the system?",
    register: "Register",
    systemOperational: "System Operational",
    language: "Language",
    orContinueWith: "Or continue with",
    continueWithGoogle: "Continue with Google",
    googleLoginUnavailable: "Google login is not configured",
    googleLoginFailed: "Google sign-in failed, please try again",
    googleLoginFailedInvalidState: "Google sign-in failed: invalid state",
    googleLoginFailedDenied: "Google sign-in was cancelled",
    googleLoginFailedDisabled: "Google sign-in is currently unavailable",
  },
  th: {
    fallbackRequestFailed: "ไม่สามารถส่งคำขอได้",
    loginSuccess: "ยืนยันความปลอดภัยเรียบร้อย",
    sessionExpired: "เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง",
    brandTagline: "คลังความมั่งคั่ง",
    usernameLabel: "ชื่อผู้ใช้งาน",
    usernamePlaceholder: "กรอกชื่อผู้ใช้งาน",
    passwordLabel: "รหัสผ่าน",
    hidePassword: "ซ่อนรหัสผ่าน",
    showPassword: "แสดงรหัสผ่าน",
    rememberMe: "จดจำการเข้าสู่ระบบ",
    loginButton: "เข้าสู่ระบบ",
    newToSystem: "ยังไม่มีบัญชี?",
    register: "สมัครสมาชิก",
    systemOperational: "ระบบพร้อมใช้งาน",
    language: "ภาษา",
    orContinueWith: "หรือเข้าสู่ระบบด้วย",
    continueWithGoogle: "เข้าสู่ระบบด้วย Google",
    googleLoginUnavailable: "ยังไม่ได้ตั้งค่าการเข้าสู่ระบบด้วย Google",
    googleLoginFailed: "เข้าสู่ระบบด้วย Google ไม่สำเร็จ กรุณาลองใหม่",
    googleLoginFailedInvalidState: "เข้าสู่ระบบด้วย Google ไม่สำเร็จ: สถานะไม่ถูกต้อง",
    googleLoginFailedDenied: "ยกเลิกการเข้าสู่ระบบด้วย Google",
    googleLoginFailedDisabled: "ยังไม่พร้อมใช้งานการเข้าสู่ระบบด้วย Google",
  },
}

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const loading = ref(false)
const message = ref("")
const showPassword = ref(false)
const locale = ref<Locale>("en")
const authApi = useAuthApi()
const form = reactive({
  username: "",
  password: "",
  remember: false
})

const t = computed(() => translations[locale.value])
const googleAuthUrl = computed(() => String(config.public.googleAuthUrl || "").trim())

const extractErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return t.value.fallbackRequestFailed
}

async function handleLogin() {
  loading.value = true
  try {
    await authApi.loginMember({
      username: form.username.trim(),
      password: form.password,
    })

    await authApi.getMe()

    if (typeof window !== "undefined") {
      if (form.remember && form.username.trim()) {
        localStorage.setItem(REMEMBERED_USERNAME_KEY, form.username.trim())
      } else {
        localStorage.removeItem(REMEMBERED_USERNAME_KEY)
      }
    }

    message.value = t.value.loginSuccess
    await router.push("/dashboard")
  } catch (error) {
    message.value = extractErrorMessage(error)
  } finally {
    loading.value = false
    setTimeout(() => {
      message.value = ""
    }, 3000)
  }
}

function handleGoogleLogin() {
  if (!googleAuthUrl.value) {
    message.value = t.value.googleLoginUnavailable
    setTimeout(() => {
      message.value = ""
    }, 3000)
    return
  }

  if (typeof window !== "undefined") {
    window.location.assign(googleAuthUrl.value)
  }
}

onMounted(() => {
  if (typeof window === "undefined") {
    return
  }

  locale.value = normalizeLocale(localStorage.getItem(LOCALE_KEY))

  document.documentElement.lang = locale.value

  window.addEventListener(LOCALE_EVENT, (event) => {
    locale.value = normalizeLocale((event as CustomEvent<string>).detail)
  })

  window.addEventListener("storage", (event) => {
    if (event.key !== LOCALE_KEY) {
      return
    }

    locale.value = normalizeLocale(event.newValue)
  })

  if (route.query.reason === "session-expired") {
    message.value = t.value.sessionExpired
    setTimeout(() => {
      message.value = ""
    }, 3000)

    router.replace({ path: "/" })
  } else if (typeof route.query.reason === "string" && route.query.reason.startsWith("google-oauth")) {
    const reason = route.query.reason
    if (reason === "google-oauth-invalid-state") {
      message.value = t.value.googleLoginFailedInvalidState
    } else if (reason === "google-oauth-denied") {
      message.value = t.value.googleLoginFailedDenied
    } else if (reason === "google-oauth-disabled") {
      message.value = t.value.googleLoginFailedDisabled
    } else {
      message.value = t.value.googleLoginFailed
    }
    setTimeout(() => {
      message.value = ""
    }, 3000)

    router.replace({ path: "/" })
  }

  const rememberedUsername = localStorage.getItem(REMEMBERED_USERNAME_KEY)
  if (rememberedUsername) {
    form.username = rememberedUsername
    form.remember = true
  }
})

watch(
  () => form.remember,
  (remember) => {
    if (typeof window === "undefined" || remember) {
      return
    }

    localStorage.removeItem(REMEMBERED_USERNAME_KEY)
  }
)

watch(locale, (nextLocale) => {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(LOCALE_KEY, nextLocale)
  document.documentElement.lang = nextLocale
})
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-6 font-sans text-slate-900">
    <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        class="absolute left-0 top-0 h-full w-full"
        style="
          background-color: #f8fafc;
          background-image:
            radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.05) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.05) 0px, transparent 50%);
        "
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <div class="rounded-[2.5rem] border border-white/80 bg-white/70 p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.03)] backdrop-blur-2xl md:p-14">
        <div class="mb-8 flex items-center justify-end gap-2">
          <span class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{{ t.language }}</span>
          <div class="inline-flex rounded-xl border border-slate-200 bg-white/80 p-1">
            <button
              type="button"
              class="rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wider transition-colors"
              :class="locale === 'en' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'"
              @click="locale = 'en'"
            >
              EN
            </button>
            <button
              type="button"
              class="rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wider transition-colors"
              :class="locale === 'th' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'"
              @click="locale = 'th'"
            >
              TH
            </button>
          </div>
        </div>

        <div class="mb-12 text-center">
          <h1 class="mb-3 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">{{ t.brandTagline }}</h1>
          <h2 class="text-4xl font-light tracking-tighter text-slate-900">BALANCE</h2>
        </div>

        <form class="space-y-7" @submit.prevent="handleLogin">
          <div class="group space-y-2">
            <label class="ml-1 block text-[10px] font-semibold uppercase tracking-widest text-slate-400 transition-all group-focus-within:-translate-y-0.5 group-focus-within:text-indigo-600">
              {{ t.usernameLabel }}
            </label>
            <input
              v-model="form.username"
              type="text"
              class="w-full rounded-2xl border border-slate-100 bg-white/50 px-6 py-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:bg-white focus:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)]"
              :placeholder="t.usernamePlaceholder"
              required
            >
          </div>

          <div class="group space-y-2">
            <label class="ml-1 block text-[10px] font-semibold uppercase tracking-widest text-slate-400 transition-all group-focus-within:-translate-y-0.5 group-focus-within:text-indigo-600">
              {{ t.passwordLabel }}
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full rounded-2xl border border-slate-100 bg-white/50 px-6 py-4 pr-16 text-sm tracking-widest outline-none transition-all placeholder:text-slate-300 focus:bg-white focus:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)]"
                placeholder="••••••••"
                required
              >
              <button
                type="button"
                :aria-label="showPassword ? t.hidePassword : t.showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-indigo-600"
                @click="showPassword = !showPassword"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.58 10.58a2 2 0 102.83 2.83" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.88 5.09A9.77 9.77 0 0112 4.88c4.56 0 8.2 2.9 9.5 7.12a10.06 10.06 0 01-4.23 5.56" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.61 6.62A10.05 10.05 0 002.5 12c.53 1.7 1.52 3.21 2.82 4.37" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.46 12C3.73 7.94 7.5 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.04 7-9.54 7s-8.27-2.94-9.54-7z" />
                  <circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center px-1">
            <label class="group flex cursor-pointer items-center">
              <div class="relative mr-2 h-4 w-4">
                <input v-model="form.remember" type="checkbox" class="peer hidden">
                <div class="h-full w-full rounded-md border border-slate-200 transition-all peer-checked:border-slate-900 peer-checked:bg-slate-900"></div>
              </div>
              <span class="whitespace-nowrap text-[11px] text-slate-400 transition-colors group-hover:text-slate-600">{{ t.rememberMe }}</span>
            </label>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full overflow-hidden rounded-2xl bg-slate-900 py-4 shadow-xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <div v-if="loading" class="flex items-center justify-center">
                <div class="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
              </div>
              <span v-else class="text-xs font-bold uppercase tracking-[0.2em] text-white">{{ t.loginButton }}</span>
              <div class="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 transition-all group-hover:w-full"></div>
            </button>
          </div>

          <div class="pt-1">
            <div class="mb-4 flex items-center gap-3">
              <div class="h-px flex-1 bg-slate-200"></div>
              <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{{ t.orContinueWith }}</p>
              <div class="h-px flex-1 bg-slate-200"></div>
            </div>

            <button
              type="button"
              class="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-semibold tracking-wide text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
              @click="handleGoogleLogin"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.9 2.9 14.7 2 12 2 6.9 2 2.8 6.2 2.8 11.3s4.1 9.3 9.2 9.3c5.3 0 8.8-3.8 8.8-9.1 0-.6-.1-1.1-.2-1.3H12z"/>
                <path fill="#34A853" d="M2.8 6.7l3.2 2.3c.9-1.9 2.9-3.3 6-3.3 1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.9 2.9 14.7 2 12 2 8 2 4.5 4.3 2.8 6.7z"/>
                <path fill="#FBBC05" d="M12 20.6c2.6 0 4.7-.8 6.3-2.3l-2.9-2.4c-.8.6-1.8 1.1-3.4 1.1-3.9 0-5.3-2.6-5.5-3.9l-3.3 2.6c1.7 3.3 5 4.9 8.8 4.9z"/>
                <path fill="#4285F4" d="M20.8 11.5c0-.6-.1-1.1-.2-1.3H12v3.9h5.5c-.2 1.1-1 2.5-2.1 3.2l2.9 2.4c1.7-1.6 2.5-4 2.5-6.8z"/>
              </svg>
              <span>{{ t.continueWithGoogle }}</span>
            </button>
          </div>
        </form>

        <div class="mt-12 text-center">
          <p class="text-xs font-light text-slate-400">
            {{ t.newToSystem }}
            <a href="/register" class="ml-1 border-b border-slate-900/10 pb-0.5 font-semibold text-slate-900 transition-all hover:border-slate-900">
              {{ t.register }}
            </a>
          </p>
        </div>
      </div>

      <div class="mt-10 flex items-center justify-center space-x-3 text-center">
        <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div>
        <p class="text-[9px] uppercase tracking-[0.3em] text-slate-400">{{ t.systemOperational }}</p>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="message"
        class="fixed top-6 right-6 z-50 rounded-2xl border border-slate-100 bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-2xl"
      >
        {{ message }}
      </div>
    </Transition>
  </div>
</template>