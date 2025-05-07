import React from 'react'
import { pluginManager } from '@/lib/plugin-system'

interface PluginRendererProps {
  position: string
  fallback?: React.ReactNode
}

/**
 * PluginRenderer组件
 * 用于在指定位置渲染已注册的插件
 * @param position - 插件渲染位置
 * @param fallback - 当没有插件时显示的备用内容
 */
export function PluginRenderer({ position, fallback }: PluginRendererProps) {
  // 获取指定位置的所有已启用的插件
  const plugins = pluginManager.getPluginsByPosition(position)

  if (plugins.length === 0) {
    return fallback ? <>{fallback}</> : null
  }

  return (
    <>
      {plugins.map(plugin => {
        const Component = plugin.component
        if (!Component) return null
        return (
          <React.Fragment key={plugin.id}>
            <Component {...plugin.props} />
          </React.Fragment>
        )
      })}
    </>
  )
}