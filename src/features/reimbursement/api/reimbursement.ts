import { Reimbursement, CreateReimbursementRequest, ReviewReimbursementRequest } from '../types'
import { api } from '@/lib/api'

// 获取报销单据列表
export async function getReimbursements(): Promise<Reimbursement[]> {
  const response = await api.get('/reimbursements')
  return response.data
}

// 获取单个报销单据详情
export async function getReimbursement(id: string): Promise<Reimbursement> {
  const response = await api.get(`/reimbursements/${id}`)
  return response.data
}

// 创建报销单据
export async function createReimbursement(
  data: CreateReimbursementRequest
): Promise<Reimbursement> {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('amount', data.amount.toString())
  if (data.description) formData.append('description', data.description)
  data.attachments?.forEach((file) => formData.append('attachments', file))

  const response = await api.post('/reimbursements', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// 审核报销单据
/**
 * 审核报销单据
 * @param id 报销单据ID
 * @param data 审核请求数据
 * @returns 更新后的报销单据
 */
export async function reviewReimbursement(
  id: string,
  data: ReviewReimbursementRequest
): Promise<Reimbursement> {
  const response = await api.patch(`/reimbursements/${id}/review`, {
    action: data.action,
    rejectReason: data.rejectReason,
    comment: data.comment
  })
  return response.data
}

// 获取当前用户的报销单据
export async function getMyReimbursements(): Promise<Reimbursement[]> {
  const response = await api.get('/reimbursements/me')
  return response.data
}

// 获取待审核的报销单据
export async function getPendingReimbursements(): Promise<Reimbursement[]> {
  const response = await api.get('/reimbursements/pending')
  return response.data
}