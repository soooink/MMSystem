import { useState, useMemo } from 'react'
import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitch } from '@/components/language-switch'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { marketPlugins, pluginCategories } from './data/plugins'
import { PluginCard } from './components/plugin-card'
import { PluginFilters } from './types'

export default function PluginMarket() {
  // 过滤和排序状态
  const [filters, setFilters] = useState<PluginFilters>({
    searchTerm: '',
    sortBy: 'downloads',
    sortOrder: 'desc',
    category: '',
    installed: undefined
  })

  // 根据过滤条件筛选插件
  const filteredPlugins = useMemo(() => {
    return marketPlugins
      .filter(plugin => {
        const matchesSearch = plugin.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          plugin.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
        const matchesCategory = !filters.category.length || plugin.tags.includes(filters.category)
        const matchesInstalled = filters.installed === undefined || plugin.isInstalled === filters.installed
        return matchesSearch && matchesCategory && matchesInstalled
      })
      .sort((a, b) => {
        const order = filters.sortOrder === 'asc' ? 1 : -1
        switch (filters.sortBy) {
          case 'downloads':
            return (a.downloads - b.downloads) * order
          case 'rating':
            return (a.rating - b.rating) * order
          case 'name':
            return a.name.localeCompare(b.name) * order
          case 'lastUpdated':
            return (new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()) * order
          default:
            return 0
        }
      })
  }, [filters])

  return (
    <>
      <Header>
        <Search />
        <div className='ml-auto flex items-center gap-4'>
          <ThemeSwitch />
          <LanguageSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>插件市场</h1>
          <p className='text-muted-foreground'>发现和安装强大的插件来扩展你的应用功能</p>
        </div>

        {/* 过滤器区域 */}
        <div className='my-6 flex flex-wrap items-center gap-4'>
          <Input
            placeholder='搜索插件...'
            className='h-9 w-64'
            value={filters.searchTerm}
            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            leftIcon={<IconSearch size={18} />}
          />

          <Select
            value={filters.category}
            onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='所有分类' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有分类</SelectItem>
              {pluginCategories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.sortBy}
            onValueChange={(value: any) => setFilters(prev => ({ ...prev, sortBy: value }))}
          >
            <SelectTrigger className='w-32'>
              <SelectValue placeholder='排序方式' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='downloads'>下载量</SelectItem>
              <SelectItem value='rating'>评分</SelectItem>
              <SelectItem value='name'>名称</SelectItem>
              <SelectItem value='lastUpdated'>更新时间</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant='outline'
            size='sm'
            onClick={() => setFilters(prev => ({
              ...prev,
              sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
            }))}
          >
            <IconAdjustmentsHorizontal size={18} />
            {filters.sortOrder === 'asc' ? '升序' : '降序'}
          </Button>
        </div>

        {/* 插件列表 */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredPlugins.map(plugin => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
        </div>
      </Main>
    </>
  )
}