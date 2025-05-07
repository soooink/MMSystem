import { MarketPlugin, PluginCategory } from '../types'
import { PluginPositions } from '@/config/plugin-config'

// 示例插件分类
export const pluginCategories: PluginCategory[] = [
  {
    id: 'ui-components',
    name: '界面组件',
    description: '增强用户界面的各类组件',
    icon: 'layout'
  },
  {
    id: 'integrations',
    name: '系统集成',
    description: '与第三方服务和系统的集成插件',
    icon: 'plug'
  },
  {
    id: 'themes',
    name: '主题外观',
    description: '自定义界面主题和样式',
    icon: 'palette'
  },
  {
    id: 'utilities',
    name: '实用工具',
    description: '提升工作效率的辅助工具',
    icon: 'tool'
  }
]

// 示例插件数据
export const marketPlugins: MarketPlugin[] = [
  {
    id: 'advanced-search',
    name: '高级搜索组件',
    description: '提供强大的搜索功能，支持多条件过滤和高亮显示',
    component: null,
    position: PluginPositions.HEADER,
    priority: 1,
    enabled: false,
    version: '1.2.0',
    author: 'SearchMaster',
    tags: ['搜索', 'UI组件', '过滤'],
    downloads: 1200,
    rating: 4.5,
    lastUpdated: '2024-01-15',
    repository: 'https://github.com/example/advanced-search',
    screenshots: ['/screenshots/advanced-search-1.svg']
  },
  {
    id: 'data-dashboard',
    name: '数据仪表盘',
    description: '可视化数据展示组件，支持多种图表类型',
    component: null,
    position: PluginPositions.MAIN,
    priority: 2,
    enabled: false,
    version: '2.0.1',
    author: 'DataViz',
    tags: ['数据可视化', '图表', '仪表盘'],
    downloads: 3500,
    rating: 4.8,
    lastUpdated: '2024-01-20',
    repository: 'https://github.com/example/data-dashboard',
    screenshots: ['/screenshots/dashboard-1.svg']
  },
  {
    id: 'theme-customizer',
    name: '主题定制器',
    description: '允许用户自定义界面主题和样式',
    component: null,
    position: PluginPositions.SIDEBAR,
    priority: 3,
    enabled: false,
    version: '1.5.0',
    author: 'ThemeWizard',
    tags: ['主题', '样式', '定制化'],
    downloads: 2800,
    rating: 4.6,
    lastUpdated: '2024-01-18',
    repository: 'https://github.com/example/theme-customizer',
    screenshots: ['/screenshots/theme-customizer-1.svg']
  }
]