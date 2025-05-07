import { Plugin } from '@/lib/plugin-system'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { NavUser } from '@/components/layout/nav-user'

// 定义插件位置常量
export const PluginPositions = {
  HEADER: 'header',
  SIDEBAR: 'sidebar',
  FOOTER: 'footer',
  NAV: 'nav'
} as const

// 默认插件配置
export const defaultPlugins: Plugin[] = [
  {
    id: 'profile-dropdown',
    name: '用户资料下拉菜单',
    component: ProfileDropdown,
    position: PluginPositions.HEADER,
    priority: 1,
    enabled: true
  },
  {
    id: 'nav-user',
    name: '导航栏用户信息',
    component: NavUser,
    position: PluginPositions.NAV,
    priority: 2,
    enabled: true,
    props: {
      user: {
        name: 'Default User',
        email: 'user@example.com',
        avatar: '/avatars/01.png'
      }
    }
  }
]

// 插件配置接口
export interface PluginConfig {
  enabledPlugins?: string[]
  pluginProps?: Record<string, Record<string, any>>
  positions?: typeof PluginPositions
}

// 默认配置
export const defaultConfig: PluginConfig = {
  enabledPlugins: defaultPlugins.map(plugin => plugin.id),
  positions: PluginPositions
}