import { ComponentType } from 'react'

// 插件类型定义
export interface Plugin {
  id: string
  name: string
  component: ComponentType<any> | null
  props?: Record<string, any>
  position?: string
  priority?: number
  enabled?: boolean
}

// 插件管理器类
class PluginManager {
  private static instance: PluginManager
  private plugins: Map<string, Plugin>

  private constructor() {
    this.plugins = new Map()
  }

  public static getInstance(): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager()
    }
    return PluginManager.instance
  }

  // 注册插件
  public registerPlugin(plugin: Plugin): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`Plugin with id ${plugin.id} already exists. Skipping registration.`)
      return
    }
    this.plugins.set(plugin.id, {
      ...plugin,
      enabled: plugin.enabled ?? true,
      priority: plugin.priority ?? 0
    })
  }

  // 获取指定位置的所有插件
  public getPluginsByPosition(position: string): Plugin[] {
    return Array.from(this.plugins.values())
      .filter(plugin => plugin.position === position && plugin.enabled)
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
  }

  // 启用/禁用插件
  public togglePlugin(id: string, enabled: boolean): void {
    const plugin = this.plugins.get(id)
    if (plugin) {
      this.plugins.set(id, { ...plugin, enabled })
    }
  }

  // 更新插件配置
  public updatePluginProps(id: string, props: Record<string, any>): void {
    const plugin = this.plugins.get(id)
    if (plugin) {
      this.plugins.set(id, { ...plugin, props: { ...plugin.props, ...props } })
    }
  }

  // 获取所有已注册的插件
  public getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
  }

  // 清除所有插件
  public clearPlugins(): void {
    this.plugins.clear()
  }

  // 卸载指定插件
  public unregisterPlugin(id: string): void {
    if (!this.plugins.has(id)) {
      console.warn(`Plugin with id ${id} does not exist. Skipping unregistration.`)
      return
    }
    this.plugins.delete(id)
  }
}

export const pluginManager = PluginManager.getInstance()