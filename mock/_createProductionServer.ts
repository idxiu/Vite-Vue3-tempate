import { MockMethod } from 'vite-plugin-mock'
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.glob(['./**/*.ts', '!**/_*.ts'], { eager: true, import: 'default' })

const mockModules: MockMethod[] = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  mockModules.push(...(modules[key] as MockMethod[]))
})

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
