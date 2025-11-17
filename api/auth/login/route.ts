import { NextRequest, NextResponse } from 'next/server'

// Mock authentication - Replace with real backend integration
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // In a real app, verify credentials against your backend
    // For now, we'll simulate successful login
    const response = NextResponse.json(
      { message: 'Login successful', user: { email } },
      { status: 200 }
    )

    // Set a session cookie (mock)
    response.cookies.set('session', `session-${email}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
