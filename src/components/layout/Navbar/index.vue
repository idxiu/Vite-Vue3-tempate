<script setup lang="ts">
  const navigation = [
    { name: '首页', href: '/' },
    { name: '接口', href: '/api' },
    { name: '状态管理', href: '/store' }
  ]
</script>

<template>
  <header class="bg-theme-color">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div
        class="flex w-full items-center justify-center py-2 lg:border-none sm:flex-col sm:py-6 md:justify-between"
      >
        <div class="flex items-center">
          <a href="#" class="text-white font-bold"> vite模板 </a>
          <div class="ml-10 hidden space-x-8 lg:block">
            <router-link
              v-for="link in navigation"
              :key="link.name"
              :to="link.href"
              class="text-base font-medium text-white hover:text-indigo-50"
              >{{ link.name }}
            </router-link>
          </div>
        </div>
      </div>
      <!-- 手机侧 -->
      <div class="flex flex-wrap justify-center space-x-6 pb-2 lg:hidden">
        <a
          v-for="link in navigation"
          :key="link.name"
          :href="link.href"
          class="text-base font-medium text-white hover:text-indigo-50"
          >{{ link.name }}</a
        >
      </div>
    </nav>
  </header>
</template>
