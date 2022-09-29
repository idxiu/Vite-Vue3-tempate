// 对象响应
export interface ResultBean {
  success?: boolean
  code?: number
  records?: Array<any>
  data?: any
  total?: number
}
// list 响应
export interface ResListBean {
  code?: number
  success?: boolean
  data?: ResultBean
  title?: string
}
