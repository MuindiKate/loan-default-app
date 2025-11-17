'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { BatchUpload } from '@/components/batch-upload'

export default function BatchPage() {
  return (
    <DashboardLayout>
      <BatchUpload />
    </DashboardLayout>
  )
}
