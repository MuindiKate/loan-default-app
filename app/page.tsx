'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, PieChart, Upload, Users, Lock, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Loan Evaluator</h1>
            </div>
            <div className="flex gap-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            AI-Powered Loan Evaluation
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Leverage machine learning and explainable AI to make smarter lending decisions. 
            Evaluate borrowers with transparency and confidence.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h3 className="text-center text-3xl font-bold text-foreground">Key Features</h3>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: PieChart,
                title: 'ML Predictions',
                description: 'Real-time loan default predictions powered by advanced machine learning models'
              },
              {
                icon: Lock,
                title: 'SHAP Explainability',
                description: 'Understand exactly why predictions are made with transparent feature importance'
              },
              {
                icon: Users,
                title: 'Borrower Management',
                description: 'Comprehensive borrower profiles with complete financial history'
              },
              {
                icon: Upload,
                title: 'Batch Processing',
                description: 'Upload and evaluate multiple loan applications efficiently'
              },
              {
                icon: Zap,
                title: 'Real-Time Analytics',
                description: 'Instant dashboards with key metrics and performance indicators'
              },
              {
                icon: Lock,
                title: 'Audit Trails',
                description: 'Complete consent logging and compliance documentation'
              }
            ].map((feature, i) => (
              <Card key={i} className="border border-border">
                <CardHeader>
                  <feature.icon className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold text-primary-foreground">Ready to transform your lending?</h3>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Join leading financial institutions using AI to make better lending decisions
          </p>
          <Link href="/auth/signup" className="mt-8 inline-block">
            <Button size="lg" variant="secondary">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
