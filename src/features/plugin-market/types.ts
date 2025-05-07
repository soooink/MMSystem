import { Plugin } from '@/lib/plugin-system'

// 插件市场中的插件信息
export interface MarketPlugin extends Plugin {
  description: string
  version: string
  author: string
  tags: string[]
  downloads: number
  rating: number
  lastUpdated: string
  repository?: string
  homepage?: string
  screenshots?: string[]
  isInstalled?: boolean
}

// 插件分类
export type PluginCategory = {
  id: string
  name: string
  description: string
  icon?: string
}

// 插件搜索和过滤选项
export interface PluginFilters {
  searchTerm: string
  category: string
  sortBy: 'downloads' | 'rating' | 'name' | 'lastUpdated'
  sortOrder: 'asc' | 'desc'
  tags?: string[]
  installed?: boolean
}

// 插件安装状态
export type InstallationStatus = 'not_installed' | 'installing' | 'installed' | 'error'

// 插件市场状态
export interface PluginMarketState {
  plugins: MarketPlugin[]
  categories: PluginCategory[]
  filters: PluginFilters
  installationStatus: Record<string, InstallationStatus>
  loading: boolean
  error: string | null
}