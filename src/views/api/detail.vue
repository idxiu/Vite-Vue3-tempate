<script lang="ts">
  import { defineComponent, ref } from 'vue'

  // import xss from 'xss'
  import NavTip from '@/components/layout/Navbar/components/NavTip.vue'
  import { getCompanyDetail } from '@/api/public'

  import { useRoute } from 'vue-router'
  import { CompanyBean } from '@/api/model/publicModel'
  import { ResultBean } from '@/api/model/baseModel'
  export default defineComponent({
    components: {
      NavTip
    },
    setup() {
      const baseURL = import.meta.env.VITE_GLOB_RES_URL
      const route = useRoute()
      const newsDetail = ref<CompanyBean>({})

      // 获取房屋租赁详情
      const getDetail = async () => {
        const res: ResultBean = (await getCompanyDetail({
          id: String(route.params.id || '')
        })) as ResultBean
        if (res.code == 0) {
          newsDetail.value = res.data
        }
      }

      getDetail()

      return {
        baseURL,
        newsDetail
      }
    }
  })
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <!-- 二级导航 -->
    <div class="text-sm breadcrumbs mt-4">
      <ul>
        <li><a>首页</a></li>
        <li><a>接口</a></li>
        <li class="text-blue-600 font-bold"><a>详情</a></li>
      </ul>
    </div>
    <div class="pb-2 my-4 border-b border-gray-50">
      <nav-tip class-name="">详情</nav-tip>
    </div>
    <!-- 数据详情 -->
    <div class="detailBox">
      <div v-loading="newsDetail.enterpriseName ? false : true" class="newsBox my-8">
        <!-- 简介 -->
        <div class="flex flex-col justify-center items-center leading-6">
          <!-- 标题 -->
          <h3 class="font-bold text-xl">{{ newsDetail.enterpriseName }} </h3>
          <!-- 创建时间 -->
          <p class="text-gray-600 text-sm my-4">{{ newsDetail.createTime }}</p>
        </div>
        <div class="mt-4 contentBox font-medium leading-8">
          <img :src="newsDetail.img" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
