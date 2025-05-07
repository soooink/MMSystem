import * as React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { Reimbursement } from '../types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// 报销单据状态显示组件
const StatusBadge = ({ status }: { status: Reimbursement['status'] }) => {
  const variantMap = {
    draft: 'secondary',
    submitted: 'secondary',
    approved: 'default',
    rejected: 'destructive',
    paid: 'default',
  } as const

  const textMap = {
    draft: '草稿',
    submitted: '已提交',
    approved: '已批准',
    rejected: '已驳回',
    paid: '已支付',
  } as const

  return <Badge variant={variantMap[status]}>{textMap[status]}</Badge>
}

// 报销单据列表列定义
/**
 * 获取报销单据列表的列定义
 * @param onReview - 审核操作的回调函数
 * @returns ColumnDef<Reimbursement>[] 列定义数组
 */
export const getColumns = (
  onReview: (values: { id: string; action: 'approve' | 'reject' }) => void
): ColumnDef<Reimbursement>[] => [
  {
    accessorKey: 'title',
    header: '标题',
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          金额
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'status',
    header: '状态',
    cell: ({ row }) => {
      return <StatusBadge status={row.getValue('status')} />
    },
  },
  {
    accessorKey: 'createdAt',
    header: '创建时间',
    cell: ({ row }) => {
      return new Date(row.getValue('createdAt')).toLocaleString()
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const reimbursement = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(reimbursement.id)}
            >
              复制单据ID
            </DropdownMenuItem>
            {reimbursement.status === 'submitted' && (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    onReview({ id: reimbursement.id, action: 'approve' })
                  }
                >
                  批准
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    onReview({ id: reimbursement.id, action: 'reject' })
                  }
                >
                  驳回
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// 报销单据列表组件
interface ReimbursementListProps {
  data: Reimbursement[]
  /**
   * 审核操作的回调函数
   * @param values - 包含单据ID和操作类型 (approve/reject) 的对象
   */
  onReview: (values: { id: string; action: 'approve' | 'reject' }) => void
}

/**
 * 报销单据列表组件
 * @param data - 报销单据数据数组
 * @param onReview - 审核操作的回调函数
 */
export function ReimbursementList({ data, onReview }: ReimbursementListProps) {
  const tableColumns = getColumns(onReview)
  return <DataTable columns={tableColumns} data={data} />
}