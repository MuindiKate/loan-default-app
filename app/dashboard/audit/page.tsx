'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { AuditTrail } from '@/components/audit-trail'

export default function AuditPage() {
  return (
    <DashboardLayout>
      <AuditTrail />
    </DashboardLayout>
  )
}
