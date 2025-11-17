import { NextRequest, NextResponse } from 'next/server'

// Mock prediction endpoint - Replace with real FastAPI backend
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // In a real app, send this to your FastAPI backend
    // const backendResponse = await fetch('http://your-backend/predict', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // })

    // Mock prediction response with SHAP values
    const prediction = {
      default_probability: 0.125,
      recommendation: 'APPROVE',
      approval_score: 8.2,
      feature_importance: [
        { feature: 'credit_score', importance: 0.35 },
        { feature: 'income', importance: 0.25 },
        { feature: 'debt_to_income_ratio', importance: 0.2 },
        { feature: 'loan_amount', importance: 0.12 },
        { feature: 'employment_type', importance: 0.08 }
      ]
    }

    return NextResponse.json(prediction)
  } catch (error) {
    return NextResponse.json(
      { message: 'Prediction failed' },
      { status: 500 }
    )
  }
}
