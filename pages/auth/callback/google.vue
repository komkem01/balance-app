<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthApi } from "../../../composables/useAuthApi"

const LOCALE_KEY = "balance_app_locale"
type Locale = "en" | "th"

const router = useRouter()
const authApi = useAuthApi()
const loading = ref(true)
const message = ref("")
const locale = ref<Locale>("en")

const translations: Record<Locale, Record<string, string>> = {
  en: {
    verifying: "Verifying Google sign-in...",
    missingToken: "Google sign-in failed: token is missing",
    invalidToken: "Google sign-in failed: invalid token payload",
    profileFailed: "Google sign-in failed: unable to load profile",
    backToLogin: "Back to login",
  },
  th: {
    verifying: "กำลังยืนยันการเข้าสู่ระบบด้วย Google...",
    missingToken: "เข้าสู่ระบบด้วย Google ไม่สำเร็จ: ไม่พบโทเคน",
    invalidToken: "เข้าสู่ระบบด้วย Google ไม่สำเร็จ: ข้อมูลโทเคนไม่ถูกต้อง",
    profileFailed: "เข้าสู่ระบบด้วย Google ไม่สำเร็จ: ไม่สามารถโหลดข้อมูลผู้ใช้",
    backToLogin: "กลับไปหน้าเข้าสู่ระบบ",
  },
}

const t = computed(() => translations[locale.value])

onMounted(async () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved === "en" || saved === "th") {
      locale.value = saved
    }

    document.documentElement.lang = locale.value
  }

  message.value = t.value.verifying

  try {
    const hashValue = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : ""
    const params = new URLSearchParams(hashValue)

    const accessToken = params.get("access_token") || ""
    const refreshToken = params.get("refresh_token") || ""
    const tokenType = params.get("token_type") || "Bearer"
    const expiresIn = Number(params.get("expires_in") || 0)
    const refreshExpiresIn = Number(params.get("refresh_expires_in") || 0)
    const memberID = params.get("member_id") || ""
    const username = params.get("username") || ""

    if (!accessToken || !refreshToken) {
      message.value = t.value.missingToken
      loading.value = false
      return
    }

    if (!Number.isFinite(expiresIn) || !Number.isFinite(refreshExpiresIn) || expiresIn <= 0 || refreshExpiresIn <= 0) {
      message.value = t.value.invalidToken
      loading.value = false
      return
    }

    authApi.applyLoginSession({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: tokenType,
      expires_in: expiresIn,
      refresh_expires_in: refreshExpiresIn,
      member_id: memberID,
      username,
    })

    try {
      await authApi.getMe()
    } catch {
      authApi.clearSession()
      message.value = t.value.profileFailed
      loading.value = false
      return
    }

    await router.replace("/dashboard")
  } catch {
    message.value = t.value.invalidToken
    loading.value = false
  }
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-900">
    <div class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div v-if="loading" class="mx-auto mb-4 h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900"></div>
      <p class="text-sm text-slate-600">{{ message }}</p>
      <NuxtLink
        v-if="!loading"
        to="/"
        class="mt-5 inline-block rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
      >
        {{ t.backToLogin }}
      </NuxtLink>
    </div>
  </div>
</template>