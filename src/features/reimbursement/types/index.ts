// 报销单据状态类型
export type ReimbursementStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'paid'

// 状态流转动作类型
export type ReimbursementAction = 'submit' | 'approve' | 'reject' | 'pay' | 'return'

// 状态流转规则
interface StatusTransition {
  from: ReimbursementStatus
  to: ReimbursementStatus
  action: ReimbursementAction
}

// 报销单据基础类型
interface BaseReimbursement {
  id: string
  title: string
  amount: number
  status: ReimbursementStatus
  createdAt: string
  updatedAt: string
}

// 报销单据详情类型
export interface Reimbursement extends BaseReimbursement {
  description?: string
  attachments?: string[]
  submitterId: string
  approverId?: string
  rejectReason?: string
}

// 创建报销单据请求类型
export interface CreateReimbursementRequest {
  title: string
  amount: number
  description?: string
  attachments?: File[]
}

// 审核报销单据请求类型
export interface ReviewReimbursementRequest {
  action: ReimbursementAction
  rejectReason?: string
  comment?: string
}