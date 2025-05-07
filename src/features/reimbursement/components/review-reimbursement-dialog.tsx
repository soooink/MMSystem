import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { Reimbursement } from '../types'

// 表单验证规则
const formSchema = z.object({
  action: z.enum(['approve', 'reject']),
  rejectReason: z.string().optional(),
})

// 报销单据审核对话框组件
interface ReviewReimbursementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reimbursement: Reimbursement
  onReview: (values: z.infer<typeof formSchema>) => Promise<void>
}

export function ReviewReimbursementDialog({
  open,
  onOpenChange,
  reimbursement,
  onReview,
}: ReviewReimbursementDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      action: 'approve',
      rejectReason: '',
    },
  })

  React.useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open, form])

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      await onReview(values)
      toast({
        title: '操作成功',
        description: values.action === 'approve' ? '报销单据已批准' : '报销单据已驳回',
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: '操作失败',
        description: '操作失败，请重试',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>审核报销单据</DialogTitle>
          <DialogDescription>
            单据标题: {reimbursement.title} | 金额: {reimbursement.amount}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-4">
                    <FormLabel>操作:</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant={field.value === 'approve' ? 'default' : 'outline'}
                        onClick={() => field.onChange('approve')}
                      >
                        批准
                      </Button>
                      <Button
                        type="button"
                        variant={field.value === 'reject' ? 'destructive' : 'outline'}
                        onClick={() => field.onChange('reject')}
                      >
                        驳回
                      </Button>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {form.watch('action') === 'reject' && (
              <FormField
                control={form.control}
                name="rejectReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>驳回原因</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="请输入驳回原因"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="submit">
                {form.watch('action') === 'approve' ? '确认批准' : '确认驳回'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}