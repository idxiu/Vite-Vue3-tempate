import { defineStore } from 'pinia'

export interface AppInjectProps {
  perfixCls: string
}

export const useStore = defineStore('app', {
  state: (): AppInjectProps => ({
    perfixCls: 'idxiu'
  })
})
