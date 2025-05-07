import { pluginManager } from './plugin-system'
import { defaultPlugins, defaultConfig, PluginConfig } from '@/config/plugin-config'

/**
 * 初始化插件系统
 * @param config - 自定义插件配置
 */
export function initializePlugins(config?: Partial<PluginConfig>) {
  // 合并默认配置和自定义配置
  const finalConfig = {
    ...defaultConfig,
    ...config,
    pluginProps: {
      ...defaultConfig.pluginProps,
      ...config?.pluginProps
    }
  }

  // 注册默认插件
  defaultPlugins.forEach(plugin => {
    // 检查插件是否启用
    const isEnabled = finalConfig.enabledPlugins?.includes(plugin.id) ?? true
    // 获取自定义属性
    const customProps = finalConfig.pluginProps?.[plugin.id]

    // 注册插件，合并默认属性和自定义属性
    pluginManager.registerPlugin({
      ...plugin,
      enabled: isEnabled,
      props: {
        ...plugin.props,
        ...customProps
      }
    })
  })

  return pluginManager
}

/**
 * 使用示例：
 * 
 * // 在应用入口处初始化插件系统
 * const customConfig = {
 *   enabledPlugins: ['profile-dropdown'],
 *   pluginProps: {
 *     'nav-user': {
 *       user: {
 *         name: 'Custom User',
 *         email: 'custom@example.com',
 *         avatar: '/custom-avatar.png'
 *       }
 *     }
 *   }
 * }
 * 
 * initializePlugins(customConfig)
 */