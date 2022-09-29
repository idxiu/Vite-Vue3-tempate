import http from '@/utils/request'
// import axios from 'axios'
enum Api {
  // 园区企业列表
  companyList = '/register/jbEnterpriseRegister/list',
  // 园区企业详情
  companyDetail = '/register/jbEnterpriseRegister/queryById'
}

/**
 *  获取企业列表
 */
export const getCompanyList = (params: any) => {
  return new Promise((resolve, reject) => {
    http
      .get({ url: Api.companyList, params })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * 获取企业详情
 */
export const getCompanyDetail = (params: any) => {
  return new Promise((resolve, reject) => {
    http
      .get({ url: Api.companyDetail, params })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
