import { createFileRoute } from '@tanstack/react-router'
import PluginMarket from '@/features/plugin-market'

export const Route = createFileRoute('/_authenticated/plugin-market/')({ 
  component: PluginMarket,
})
