<template>
  <div class="min-h-screen flex items-center justify-center p-6 relative overflow-hidden text-slate-900 font-sans bg-slate-50">
    <!-- Mesh Background -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="mesh-gradient absolute top-0 left-0 w-full h-full"></div>
    </div>

    <div class="w-full max-w-2xl relative z-10 my-12">
      <!-- Main Card -->
      <div class="premium-card rounded-[2.5rem] p-10 md:p-14 border border-white/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.03)] bg-white/70 backdrop-blur-2xl">
        
        <!-- Header -->
        <div class="mb-12 text-center">
          <h1 class="text-[10px] font-bold tracking-[0.5em] text-slate-400 uppercase mb-3 whitespace-nowrap">Create Archive</h1>
          <h2 class="text-4xl font-light tracking-tighter text-slate-900 uppercase">Register</h2>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="space-y-8">
          
          <!-- Personal Information Section -->
          <div class="space-y-6">
            <h3 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-2">Personal Detail</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Gender -->
              <div class="space-y-2">
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Gender</label>
                <AppDropdown
                  v-model="form.gender_id"
                  label="Select Gender"
                  :items="genderDropdownItems"
                  unstyled
                  trigger-class="w-full rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 flex items-center justify-between"
                  menu-class="w-full"
                />
              </div>

              <!-- Prefix -->
              <div class="space-y-2">
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Prefix</label>
                <AppDropdown
                  v-model="form.prefix_id"
                  :label="!form.gender_id ? 'Select Gender first' : (filteredPrefixes.length ? 'Select Prefix' : 'No prefix available')"
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
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">First Name</label>
                <input 
                  v-model="form.first_name"
                  type="text" 
                  class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm"
                  placeholder="Your first name"
                  required
                >
              </div>

              <!-- Last Name -->
              <div class="space-y-2">
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Last Name</label>
                <input 
                  v-model="form.last_name"
                  type="text" 
                  class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm"
                  placeholder="Your last name"
                  required
                >
              </div>
            </div>

            <!-- Phone Number -->
            <div class="space-y-2">
              <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Phone Number</label>
              <input 
                v-model="form.phone"
                type="tel" 
                class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm"
                placeholder="081-XXX-XXXX"
                required
              >
            </div>
          </div>

          <!-- Account Information Section -->
          <div class="space-y-6 pt-4">
            <h3 class="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-2">Account Credential</h3>
            
            <div class="space-y-6">
              <!-- Username -->
              <div class="space-y-2">
                <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Username</label>
                <input 
                  v-model="form.username"
                  type="text" 
                  class="custom-input w-full px-6 py-4 rounded-2xl outline-none text-sm"
                  placeholder="Choose a username"
                  required
                >
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Password -->
                <div class="space-y-2">
                  <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Password</label>
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
                      :aria-label="showPassword ? 'Hide password' : 'Show password'"
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
                  <label class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Confirm Password</label>
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
                      :aria-label="showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'"
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
                Create Account
              </span>
              <div class="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 transition-all group-hover:w-full"></div>
            </button>
          </div>
        </form>

        <!-- Back to Login -->
        <div class="mt-12 text-center pt-8 border-t border-slate-50">
          <p class="text-xs text-slate-400 font-light">
            Already have an archive? 
            <NuxtLink to="/" class="text-slate-900 font-semibold border-b border-slate-900/10 hover:border-slate-900 transition-all ml-1 pb-0.5">
              Login
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Status -->
      <div class="mt-10 text-center flex items-center justify-center space-x-3">
        <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        <p class="text-[9px] text-slate-400 uppercase tracking-[0.3em]">Encrypted Connection</p>
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
import { useAuthApi } from '../../composables/useAuthApi'

const loading = ref(false)
const message = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
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

const extractErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Request failed'
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

const handleRegister = async () => {
  if (form.password !== form.confirm_password) {
    message.value = 'Passwords do not match'
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

    message.value = 'Account Created Successfully'
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