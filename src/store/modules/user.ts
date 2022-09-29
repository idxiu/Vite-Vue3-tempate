import { defineStore } from 'pinia'
import { UserItem } from '@/api/model/loginModel'
import { USER_INFO_KEY } from '@/enums/cacheEnum'

export interface User {
  userInfo: UserItem
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): User => ({
    userInfo: { username: '测试张三' }
  }),
  getters: {
    getUserInfo(): UserItem {
      return this.userInfo
    }
  },
  actions: {
    setUserInfo(info: Partial<UserItem>) {
      this.userInfo = info
    },
    clearUserInfo() {
      this.userInfo = {}
    }
  },
  persist: {
    key: USER_INFO_KEY
  }
})
