'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { PredictionForm } from '@/components/prediction-form'

export default function PredictPage() {
  return (
    <DashboardLayout>
      <PredictionForm />
    </DashboardLayout>
  )
}
