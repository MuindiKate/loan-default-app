'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Search, Eye } from 'lucide-react'

interface Borrower {
  id: string
  name: string
  email: string
  phone: string
  loanAmount: number
  riskScore: number
  status: 'approved' | 'rejected' | 'pending'
}

const mockBorrowers: Borrower[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    loanAmount: 50000,
    riskScore: 78,
    status: 'approved'
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678',
    loanAmount: 75000,
    riskScore: 65,
    status: 'pending'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1 (555) 345-6789',
    loanAmount: 100000,
    riskScore: 42,
    status: 'rejected'
  },
]

export function BorrowerList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [borrowers] = useState(mockBorrowers)

  const filteredBorrowers = borrowers.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-700 dark:text-green-400'
      case 'rejected':
        return 'bg-red-500/10 text-red-700 dark:text-red-400'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Borrowers</h1>
          <p className="text-muted-foreground">Manage and view all borrower profiles</p>
        </div>
        <Link href="/dashboard/borrowers/new">
          <Button gap-2 className="gap-2">
            <Plus className="h-4 w-4" />
            Add Borrower
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search borrowers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 outline-none placeholder:text-muted-foreground"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBorrowers.map((borrower) => (
              <div key={borrower.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{borrower.name}</h3>
                  <p className="text-sm text-muted-foreground">{borrower.email}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span>${borrower.loanAmount.toLocaleString()}</span>
                    <span className="text-muted-foreground">{borrower.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusColor(borrower.status)}`}>
                      {borrower.status}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">Score: {borrower.riskScore}</div>
                  </div>
                  <Link href={`/dashboard/borrowers/${borrower.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
