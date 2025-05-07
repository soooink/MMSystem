import { useState } from 'react'
import { IconDownload, IconStar, IconCalendar, IconBrandGithub } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { pluginManager } from '@/lib/plugin-system'
import { MarketPlugin, InstallationStatus } from '../types'

interface PluginCardProps {
  plugin: MarketPlugin
}

export function PluginCard({ plugin }: PluginCardProps) {
  const [status, setStatus] = useState<InstallationStatus>(
    plugin.isInstalled ? 'installed' : 'not_installed'
  )

  const handleInstall = async () => {
    try {
      setStatus('installing')
      // 注册插件到插件系统
      await pluginManager.registerPlugin({
        ...plugin,
        enabled: true
      })
      setStatus('installed')
    } catch (error) {
      console.error('Failed to install plugin:', error)
      setStatus('error')
    }
  }

  const handleUninstall = async () => {
    try {
      // 从插件系统中移除插件
      await pluginManager.unregisterPlugin(plugin.id)
      setStatus('not_installed')
    } catch (error) {
      console.error('Failed to uninstall plugin:', error)
      setStatus('error')
    }
  }

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='space-y-1'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-xl'>{plugin.name}</CardTitle>
          <Badge variant={status === 'installed' ? 'default' : 'outline'}>
            {status === 'installed' ? '已安装' : '未安装'}
          </Badge>
        </div>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <span className='flex items-center gap-1'>
            <IconDownload size={16} />
            {plugin.downloads}
          </span>
          <span className='flex items-center gap-1'>
            <IconStar size={16} />
            {plugin.rating}
          </span>
          <span className='flex items-center gap-1'>
            <IconCalendar size={16} />
            {new Date(plugin.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground'>{plugin.description}</p>
        <div className='flex flex-wrap gap-2'>
          {plugin.tags.map(tag => (
            <Badge key={tag} variant='secondary'>{tag}</Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>作者: {plugin.author}</span>
          {plugin.repository && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={plugin.repository}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-foreground'
                >
                  <IconBrandGithub size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent>查看源代码</TooltipContent>
            </Tooltip>
          )}
        </div>

        <Button
          variant={status === 'installed' ? 'destructive' : 'default'}
          onClick={status === 'installed' ? handleUninstall : handleInstall}
          disabled={status === 'installing'}
        >
          {status === 'installed' ? '卸载' :
            status === 'installing' ? '安装中...' : '安装'}
        </Button>
      </CardFooter>
    </Card>
  )
}