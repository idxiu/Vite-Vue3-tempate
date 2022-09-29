<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const errorCode = ref<number>(404)
  const back = () => {
    router.push({ path: '/' })
  }
</script>

<template>
  <div class="flex flex-col items-center gap-20 bg-base-100 py-20">
    <div class="card w-96 bg-base-100">
      <div class="card-body">
        <h2 class="card-title"> 错误 {{ errorCode }}! </h2>
        <p>很抱歉，有些不对劲，找不到页面！</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary text-blue-500" @click="back"> 返回 ! </button>
        </div>
      </div>
    </div>
  </div>
</template>
