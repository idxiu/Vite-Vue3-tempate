<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import NavTip from '@/components/layout/Navbar/components/NavTip.vue'
  import { getCompanyList } from '@/api/public'
  import { CompanyBean } from '@/api/model/publicModel'
  import { ResListBean } from '@/api/model/baseModel'
  export default defineComponent({
    components: {
      NavTip
    },
    setup() {
      const router = useRouter()
      const loading = ref(false)
      const currentPage = ref(1)
      const pageSize = ref(10)
      const total = ref(0)
      const searchKey = ref('')
      const companyList = ref<Array<CompanyBean>>([])

      const queryCompanyList = async () => {
        loading.value = true
        let param: any = {
          pageNo: currentPage.value,
          pageSize: pageSize.value,
          enterpriseName: searchKey.value ? '*' + searchKey.value + '*' : ''
        }
        const res: ResListBean = (await getCompanyList(param)) as ResListBean
        loading.value = false
        companyList.value = res.data?.records || []
        total.value = res.data?.total || 0
      }

      // 荣誉称号
      const honorArr = (tag: String | undefined = '') => {
        if (tag) {
          return tag.split(',')
        }
        return ['无']
      }
      // 查询列表
      queryCompanyList()

      // 分页 当前页数大小变化
      const handleSizeChange = (val: number) => {
        pageSize.value = val
        queryCompanyList()
      }
      // 分页 当前页数变化
      const handleCurrentChange = (val: number) => {
        currentPage.value = val
        queryCompanyList()
      }

      // 跳转详情页面
      const toDetail = (id: string | undefined = '') => {
        router.push({
          path: `/api/detail/${id}`
        })
      }

      return {
        loading,
        currentPage,
        pageSize,
        total,
        searchKey,
        companyList,
        toDetail,
        handleSizeChange,
        handleCurrentChange,
        queryCompanyList,
        honorArr
      }
    }
  })
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="flex mt-4 flex-col sm:flex-row sm:items-center sm:justify-between">
      <!-- 面包屑 -->
      <div class="text-sm breadcrumbs">
        <ul>
          <li><a>首页</a></li>
          <li class="text-blue-600 font-bold"><a>接口</a></li>
        </ul>
      </div>
      <!-- 搜索框 -->
      <div class="flex">
        <input
          id="text"
          v-model="searchKey"
          type="text"
          name="text"
          class="block w-full rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="请输入标题关键字"
        />
        <button
          type="button"
          class="btn-search space-x-2 rounded-r-md bg-blue-500 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none"
          @click="queryCompanyList"
        >
          检索
        </button>
      </div>
    </div>
    <div class="pb-2 my-4 border-b border-gray-50">
      <nav-tip class-name="">接口列表</nav-tip>
    </div>
    <!-- 企业列表 左右结构 左图 右介绍 -->
    <ul
      v-if="companyList && companyList.length > 0"
      v-loading="loading"
      role="list"
      class="relative z-0 divide-y divide-gray-200"
    >
      <li
        v-for="(item, index) in companyList"
        :key="index"
        class="bg-white"
        @click="toDetail(item.id)"
      >
        <div
          class="relative cursor-pointer items-center space-x-3 px-6 py-5 focus-within:ring-2 sm:flex flex-row focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50"
        >
          <div class="flex-shrink-0 mr-8">
            <img class="h-16 rounded-md sm:w-40" :src="item.img" alt="" />
          </div>
          <div class="min-w-0 flex-1 mt-2 sm:mt-0">
            <p class="text-sm font-medium text-gray-900">{{ item.enterpriseName }}</p>
            <p class="truncate text-sm text-gray-500">{{ item.industry }}</p>
            <div class="truncate text-sm text-gray-500 mt-4">
              <nav class="flex flex-wrap space-x-4" aria-label="Tabs">
                <a
                  v-for="txt in honorArr(item.tags)"
                  :key="txt"
                  :class="[
                    'mb-2  bg-sky-100 text-sky-500  ',
                    'px-2 py-1 font-medium text-sm rounded-md'
                  ]"
                  >{{ txt }}</a
                >
              </nav>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!-- 空数据 -->
    <div v-else v-loading="loading" class="text-center py-4 text-gray-500">暂无数据</div>

    <!-- 分页 -->
    <div class="py-8 justify-end hidden sm:flex">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 分页2 -->
    <div class="py-8 flex justify-end pageBox sm:hidden">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        background
        layout=" prev,pager, next,"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
  .btn-search {
    width: 100px;
  }
</style>
