'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { BorrowerDetail } from '@/components/borrower-detail'

export default function BorrowerDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <BorrowerDetail borrowerId={params.id} />
    </DashboardLayout>
  )
}
