'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { BarChart3, Home, Users, Zap, Upload, FileText, Settings, LogOut, Menu, X, Mail } from 'lucide-react'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Borrowers', href: '/dashboard/borrowers' },
    { icon: Zap, label: 'Predict', href: '/dashboard/predict' },
    { icon: Upload, label: 'Batch Upload', href: '/dashboard/batch' },
    { icon: FileText, label: 'Audit Trail', href: '/dashboard/audit' },
    { icon: Mail, label: 'Contact', href: '/dashboard/contact' }, // added Contact link
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 border-b border-border p-6">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Loan Evaluator</h1>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="border-t border-border p-4 space-y-2">
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <nav className="hidden lg:flex fixed top-0 left-64 right-0 z-30 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="flex items-center gap-1 px-6 py-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" size="sm" className="gap-2">
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main content with top padding to account for nav bar */}
      <main className="lg:ml-64 lg:pt-16">
        {children}
      </main>
    </div>
  )
}
