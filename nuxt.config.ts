export default defineNuxtConfig({
  compatibilityDate: "2026-04-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8080/api/v1",
    },
  },
})
