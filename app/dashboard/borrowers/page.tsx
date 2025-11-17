'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { BorrowerList } from '@/components/borrower-list'

export default function BorrowersPage() {
  return (
    <DashboardLayout>
      <BorrowerList />
    </DashboardLayout>
  )
}
