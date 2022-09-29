import { Random } from 'mockjs'

import { resultSuccess, resultPageSuccess, baseUrl } from '../_util'

const Api = {
  // 园区企业列表
  companyList: `${baseUrl}/register/jbEnterpriseRegister/list`,
  // 园区企业详情
  companyDetail: `${baseUrl}/register/jbEnterpriseRegister/queryById`
}

export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    timeout: 2000,
    response: () => {
      return {
        code: 200,
        message: '',
        data: {
          'id|10000-11000': 0,
          username: '@cname',
          email: '@email',
          phone: /^1[385][1-9]\d{8}/
        }
      }
    }
  },
  {
    url: Api.companyList,
    method: 'get',
    timeout: 1500,
    response: () => {
      const mockData = [] as any[]
      for (let i = 0; i < 20; i++) {
        mockData.push({
          id: Random.integer(1, 100),
          img:
            'https://toimc-online.obs.cn-east-3.myhuaweicloud.com/vue-toimc-admin/shotcuts/pic' +
            Random.integer(1, 100) +
            '.jpg',
          enterpriseName: Random.csentence(5, 10),
          industry: Random.csentence(10, 30),
          tags: 'SDFSDFS,SDFDSF,SDFDSF,SDFSDF',
          createTime: Random.date('yyyy-MM-dd HH:mm:ss')
        })
      }

      return resultPageSuccess(1, 10, mockData)
    }
  },
  {
    url: Api.companyDetail,
    method: 'get',
    timeout: 1500,
    response: () => {
      const mockData = {
        id: Random.integer(1, 100),
        img:
          'https://toimc-online.obs.cn-east-3.myhuaweicloud.com/vue-toimc-admin/shotcuts/pic' +
          Random.integer(1, 100) +
          '.jpg',
        enterpriseName: Random.csentence(5, 10),
        industry: Random.csentence(10, 30),
        tags: 'SDFSDFS,SDFDSF,SDFDSF,SDFSDF',
        createTime: Random.date('yyyy-MM-dd HH:mm:ss')
      }

      return resultSuccess(mockData)
    }
  }
]
