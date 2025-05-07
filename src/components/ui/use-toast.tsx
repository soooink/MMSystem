import * as React from 'react'
import { toast as sonnerToast, Toaster } from 'sonner'

// 通知类型定义
type ToastProps = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

// 导出 Toaster 组件供全局使用
export function ToastProvider() {
  return <Toaster />
}

// 导出 toast 函数供组件调用
export function toast({ title, description, variant = 'default' }: ToastProps) {
  sonnerToast(description, {
    style: {
      background: variant === 'destructive' ? 'rgb(239, 68, 68)' : 'white',
      color: variant === 'destructive' ? 'white' : 'black',
    },
  })
}