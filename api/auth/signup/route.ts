import { NextRequest, NextResponse } from 'next/server'

// Mock signup - Replace with real backend integration
export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name } = await request.json()

    // Validate input
    if (!email || !password || !full_name) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // In a real app, create user in your database
    // For now, we'll simulate successful signup
    const response = NextResponse.json(
      { message: 'Signup successful', user: { email, full_name } },
      { status: 201 }
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
      { message: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
