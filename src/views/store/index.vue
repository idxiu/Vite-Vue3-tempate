<script lang="ts">
  import { defineComponent } from 'vue'
  import NavTip from '@/components/layout/Navbar/components/NavTip.vue'
  import { useUserStore } from '@/store/modules/user'
  export default defineComponent({
    components: {
      NavTip
    },

    setup() {
      // 用户信息
      const userStore = useUserStore()
      const { username } = userStore.userInfo
      const setUser = () => {
        let data = {
          username: 'admin'
        }
        userStore.setUserInfo(data)
      }
      return {
        userStore,
        username,
        setUser
      }
    }
  })
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <!-- 面包屑 -->
    <div class="text-sm breadcrumbs mt-4">
      <ul>
        <li><a>首页</a></li>
        <li class="text-blue-600 font-bold"><a>状态管理</a></li>
      </ul>
    </div>
    <div class="pb-2 my-4 border-b border-gray-50">
      <nav-tip class-name="">store</nav-tip>
    </div>
    <!-- 介绍 -->
    <div class="justify-between mb-4 sm:flex-row md:flex">
      原来姓名： {{ username }} 修改后的姓名： {{ userStore.userInfo.username }}
      <div class="flex justify-end">
        <el-button type="primary" @click="setUser">设置用户信息为admin</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
