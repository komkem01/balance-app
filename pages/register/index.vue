<template>
  <div class="min-h-screen flex items-center justify-center p-6 relative overflow-hidden text-slate-900 font-sans bg-slate-50">
    <!-- Mesh Background -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="mesh-gradient absolute top-0 left-0 w-full h-full"></div>
    </div>

    <div class="w-full max-w-2xl relative z-10 my-12">
      <!-- Main Card -->
      <div class="premium-card rounded-[2.5rem] p-10 md:p-14 border border-white/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.03)] bg-white/70 backdrop-blur-2xl">
        
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

        <!-- Header -->
        <div class="mb-12 text-center">
          <h1 class="text-[10px] font-bold tracking-[0.5em] text-slate-400 uppercase mb-3 whitespace-nowrap">{{ t.brandTagline }}</h1>
          <h2 class="text-4xl font-light tracking-tighter text-slate-900 uppercase">{{ t.registerTitle }}</h2>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="space-y-8">
          
          <!-- Personal Information Section -->
          <div class="space-y-6">
            <h3 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-2">{{ t.personalDetail }}</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Gender -->
              <div class="space-y-2">
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">{{ t.genderLabel }}</label>
                <AppDropdown
                  v-model="form.gender_id"
                  :label="t.selectGender"
                  :items="genderDropdownItems"
                  unstyled
                  trigger-class="w-full rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 flex items-center justify-between"
                  menu-class="w-full"
                />
              </div>

              <!-- Prefix -->
              <div class="space-y-2">
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">{{ t.prefixLabel }}</label>
                <AppDropdown
                  v-model="form.prefix_id"
                  :label="!form.gender_id ? t.selectGenderFirst : (filteredPrefixes.length ? t.selectPrefix : t.noPrefixAvailable)"
                  :items="prefixDropdownItems"
                  :disabled="!form.gender_id || filteredPrefixes.length === 0"
                  unstyled
                  trigger-class="w-full rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 flex items-center justify-between disabled:cursor-not-allowed disabled:bg-slate-100/70 disabled:text-slate-400"
                  menu-class="w-full"
                  :close-on-select="true"
                />
              </div>

              <!-- First Name -->
              <div class="space-y-2">
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">{{ t.firstNameLabel }}</label>
                <input 
                  v-model="form.first_name"
                  type="text" 
                  class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm"
                  :placeholder="t.firstNamePlaceholder"
                  required
                >
              </div>

              <!-- Last Name -->
              <div class="space-y-2">
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">{{ t.lastNameLabel }}</label>
                <input 
                  v-model="form.last_name"
                  type="text" 
                  class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm"
                  :placeholder="t.lastNamePlaceholder"
                  required
                >
              </div>
            </div>

            <!-- Phone Number -->
            <div class="space-y-2">
              <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">{{ t.phoneLabel }}</label>
              <input 
                v-model="form.phone"
                type="tel" 
                class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm"
                :placeholder="t.phonePlaceholder"
                required
              >
            </div>
          </div>

          <!-- Account Information Section -->
          <div class="space-y-6 pt-4">
            <h3 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-2">{{ t.accountCredential }}</h3>
            
            <div class="space-y-6">
              <!-- Username -->
              <div class="space-y-2">
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">{{ t.usernameLabel }}</label>
                <input 
                  v-model="form.username"
                  type="text" 
                  class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm"
                  :placeholder="t.usernamePlaceholder"
                  required
                >
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Password -->
                <div class="space-y-2">
                  <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">{{ t.passwordLabel }}</label>
                  <div class="relative">
                    <input 
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      class="custom-input w-full px-6 py-4 pr-20 rounded-2xl outline-none text-sm tracking-widest"
                      placeholder="••••••••"
                      required
                    >
                    <button
                      type="button"
                      :aria-label="showPassword ? t.hidePassword : t.showPassword"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors"
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

                <!-- Confirm Password -->
                <div class="space-y-2">
                  <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">{{ t.confirmPasswordLabel }}</label>
                  <div class="relative">
                    <input 
                      v-model="form.confirm_password"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="custom-input w-full px-6 py-4 pr-20 rounded-2xl outline-none text-sm tracking-widest"
                      placeholder="••••••••"
                      required
                    >
                    <button
                      type="button"
                      :aria-label="showConfirmPassword ? t.hideConfirmPassword : t.showConfirmPassword"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5" stroke-width="1.8">
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
              </div>
            </div>
          </div>

          <div class="pt-2">
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

          <!-- Action Button -->
          <div class="pt-8">
            <button 
              type="submit" 
              :disabled="loading"
              class="group relative w-full py-5 bg-slate-900 overflow-hidden rounded-2xl shadow-xl shadow-slate-200 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <div v-if="loading" class="flex items-center justify-center">
                <div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              </div>
              <span v-else class="text-white text-xs font-bold tracking-[0.3em] uppercase">
                {{ t.createAccountButton }}
              </span>
              <div class="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 transition-all group-hover:w-full"></div>
            </button>
          </div>
        </form>

        <!-- Back to Login -->
        <div class="mt-12 text-center pt-8 border-t border-slate-50">
          <p class="text-xs text-slate-400 font-light">
            {{ t.alreadyHaveArchive }}
            <NuxtLink to="/" class="text-slate-900 font-semibold border-b border-slate-900/10 hover:border-slate-900 transition-all ml-1 pb-0.5">
              {{ t.loginLink }}
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Status -->
      <div class="mt-10 text-center flex items-center justify-center space-x-3">
        <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        <p class="text-[9px] text-slate-400 uppercase tracking-[0.3em]">{{ t.encryptedConnection }}</p>
      </div>
    </div>

    <!-- Notification -->
    <Transition name="fade-slide">
      <div v-if="message" class="fixed top-6 right-6 px-8 py-4 bg-white border border-slate-100 shadow-2xl rounded-2xl text-[10px] font-bold tracking-widest text-slate-900 uppercase z-50">
        {{ message }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from 'nuxt/app'
import { useAuthApi } from '../../composables/useAuthApi'

const LOCALE_KEY = 'balance_app_locale'
const LOCALE_EVENT = 'app-locale-changed'
type Locale = 'en' | 'th'

const normalizeLocale = (value: string | null | undefined): Locale => {
  if (value === 'th' || value === 'TH') {
    return 'th'
  }

  return 'en'
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    fallbackRequestFailed: 'Request failed',
    brandTagline: 'Create Archive',
    registerTitle: 'Register',
    personalDetail: 'Personal Detail',
    genderLabel: 'Gender',
    selectGender: 'Select Gender',
    prefixLabel: 'Prefix',
    selectGenderFirst: 'Select Gender first',
    selectPrefix: 'Select Prefix',
    noPrefixAvailable: 'No prefix available',
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'Your first name',
    lastNameLabel: 'Last Name',
    lastNamePlaceholder: 'Your last name',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '081-XXX-XXXX',
    accountCredential: 'Account Credential',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Choose a username',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm Password',
    hidePassword: 'Hide password',
    showPassword: 'Show password',
    hideConfirmPassword: 'Hide confirm password',
    showConfirmPassword: 'Show confirm password',
    createAccountButton: 'Create Account',
    alreadyHaveArchive: 'Already have an archive?',
    loginLink: 'Login',
    encryptedConnection: 'Encrypted Connection',
    passwordMismatch: 'Passwords do not match',
    accountCreatedSuccess: 'Account Created Successfully',
    language: 'Language',
    orContinueWith: 'Or continue with',
    continueWithGoogle: 'Continue with Google',
    googleLoginUnavailable: 'Google login is not configured',
  },
  th: {
    fallbackRequestFailed: 'ไม่สามารถส่งคำขอได้',
    brandTagline: 'สร้างคลังข้อมูล',
    registerTitle: 'สมัครสมาชิก',
    personalDetail: 'ข้อมูลส่วนตัว',
    genderLabel: 'เพศ',
    selectGender: 'เลือกเพศ',
    prefixLabel: 'คำนำหน้า',
    selectGenderFirst: 'กรุณาเลือกเพศก่อน',
    selectPrefix: 'เลือกคำนำหน้า',
    noPrefixAvailable: 'ไม่มีคำนำหน้าที่ใช้งานได้',
    firstNameLabel: 'ชื่อ',
    firstNamePlaceholder: 'กรอกชื่อ',
    lastNameLabel: 'นามสกุล',
    lastNamePlaceholder: 'กรอกนามสกุล',
    phoneLabel: 'เบอร์โทรศัพท์',
    phonePlaceholder: '081-XXX-XXXX',
    accountCredential: 'ข้อมูลบัญชี',
    usernameLabel: 'ชื่อผู้ใช้งาน',
    usernamePlaceholder: 'ตั้งชื่อผู้ใช้งาน',
    passwordLabel: 'รหัสผ่าน',
    confirmPasswordLabel: 'ยืนยันรหัสผ่าน',
    hidePassword: 'ซ่อนรหัสผ่าน',
    showPassword: 'แสดงรหัสผ่าน',
    hideConfirmPassword: 'ซ่อนรหัสผ่านยืนยัน',
    showConfirmPassword: 'แสดงรหัสผ่านยืนยัน',
    createAccountButton: 'สร้างบัญชี',
    alreadyHaveArchive: 'มีบัญชีอยู่แล้ว?',
    loginLink: 'เข้าสู่ระบบ',
    encryptedConnection: 'การเชื่อมต่อเข้ารหัส',
    passwordMismatch: 'รหัสผ่านไม่ตรงกัน',
    accountCreatedSuccess: 'สร้างบัญชีสำเร็จ',
    language: 'ภาษา',
    orContinueWith: 'หรือเข้าสู่ระบบด้วย',
    continueWithGoogle: 'เข้าสู่ระบบด้วย Google',
    googleLoginUnavailable: 'ยังไม่ได้ตั้งค่าการเข้าสู่ระบบด้วย Google',
  },
}

const loading = ref(false)
const message = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const locale = ref<Locale>('en')
const config = useRuntimeConfig()
const router = useRouter()
const authApi = useAuthApi()

type GenderItem = {
  id: string
  name: string
  is_active: boolean
}

type PrefixItem = {
  id: string
  gender_id: string
  name: string
  is_active: boolean
}

const genders = ref<GenderItem[]>([])
const prefixes = ref<PrefixItem[]>([])
const t = computed(() => translations[locale.value])
const googleAuthUrl = computed(() => String(config.public.googleAuthUrl || '').trim())

const extractErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return t.value.fallbackRequestFailed
}

const filteredPrefixes = computed(() => {
  if (!form.gender_id) {
    return []
  }

  return prefixes.value.filter((prefix) => prefix.gender_id === form.gender_id)
})

const genderDropdownItems = computed(() =>
  genders.value.map((g) => ({ label: g.name, value: g.id }))
)

const prefixDropdownItems = computed(() =>
  filteredPrefixes.value.map((p) => ({ label: p.name, value: p.id }))
)

const form = reactive({
  prefix_id: '',
  gender_id: '',
  first_name: '',
  last_name: '',
  phone: '',
  username: '',
  password: '',
  confirm_password: ''
})

watch(
  () => form.gender_id,
  () => {
    form.prefix_id = ''
  }
)

onMounted(async () => {
  if (typeof window !== 'undefined') {
    locale.value = normalizeLocale(localStorage.getItem(LOCALE_KEY))

    document.documentElement.lang = locale.value

    window.addEventListener(LOCALE_EVENT, (event) => {
      locale.value = normalizeLocale((event as CustomEvent<string>).detail)
    })

    window.addEventListener('storage', (event) => {
      if (event.key !== LOCALE_KEY) {
        return
      }

      locale.value = normalizeLocale(event.newValue)
    })
  }

  try {
    const [genderRes, prefixRes] = await Promise.all([
      authApi.listGenders(),
      authApi.listPrefixes(),
    ])

    genders.value = genderRes.filter((item) => item.is_active)
    prefixes.value = prefixRes.filter((item) => item.is_active)
  } catch (error) {
    message.value = extractErrorMessage(error)
    setTimeout(() => {
      message.value = ''
    }, 3000)
  }
})

const handleGoogleLogin = () => {
  if (!googleAuthUrl.value) {
    message.value = t.value.googleLoginUnavailable
    setTimeout(() => {
      message.value = ''
    }, 3000)
    return
  }

  if (typeof window !== 'undefined') {
    window.location.assign(googleAuthUrl.value)
  }
}

const handleRegister = async () => {
  if (form.password !== form.confirm_password) {
    message.value = t.value.passwordMismatch
    setTimeout(() => message.value = '', 3000)
    return
  }

  loading.value = true
  try {
    await authApi.registerMember({
      gender_id: form.gender_id || null,
      prefix_id: form.prefix_id || null,
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      display_name: `${form.first_name} ${form.last_name}`.trim(),
      phone: form.phone.trim(),
      username: form.username.trim(),
      password: form.password,
    })

    message.value = t.value.accountCreatedSuccess
    setTimeout(() => {
      message.value = ''
    }, 3000)
    await router.push('/')
  } catch (error) {
    message.value = extractErrorMessage(error)
    setTimeout(() => {
      message.value = ''
    }, 3000)
  } finally {
    loading.value = false
  }
}

watch(locale, (nextLocale) => {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(LOCALE_KEY, nextLocale)
  document.documentElement.lang = nextLocale
})
</script>

<style scoped>
.mesh-gradient {
  background-color: #f8fafc;
  background-image: 
    radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.05) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.05) 0px, transparent 50%);
}

.custom-input {
  color: #0f172a;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #cbd5e1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-input::placeholder {
  color: #94a3b8;
}

.custom-input:focus {
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.14), 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  border-color: rgba(99, 102, 241, 0.55);
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}
</style>