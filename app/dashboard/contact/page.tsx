'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Support</h1>
        <p className="text-muted-foreground mt-2">Get in touch with our support team for assistance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information Cards */}
        <div className="space-y-4">
          <Card className="bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-base">Email Support</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">support@loaneval.com</p>
              <p className="text-xs text-muted-foreground mt-1">Response time: 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-base">Phone Support</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">+254 700 000 000</p>
              <p className="text-xs text-muted-foreground mt-1">Mon - Fri: 9:00 AM - 5:00 PM EAT</p>
            </CardContent>
          </Card>

          <Card className="bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-base">Office Address</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
              <p className="text-xs text-muted-foreground mt-1">Tech Hub, Innovation District</p>
            </CardContent>
          </Card>

          <Card className="bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-base">Live Chat</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Available on the platform</p>
              <p className="text-xs text-muted-foreground mt-1">Average wait: 2 minutes</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>We'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-background border-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-background border-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Subject</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="bg-background border-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your issue or question..."
                    required
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={5}
                  />
                </div>

                {submitted && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
                    Thank you! We've received your message and will respond shortly.
                  </div>
                )}

                <Button type="submit" className="w-full gap-2" disabled={submitted}>
                  <Send className="h-4 w-4" />
                  {submitted ? 'Sent!' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-1">What is the average loan processing time?</h3>
            <p className="text-sm text-muted-foreground">Loan evaluations typically take 24-48 hours from submission.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">Yes, we use industry-standard encryption and comply with data protection regulations.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Can I appeal a loan decision?</h3>
            <p className="text-sm text-muted-foreground">Yes, you can submit an appeal through your dashboard within 30 days of the decision.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">What file formats do you support for batch uploads?</h3>
            <p className="text-sm text-muted-foreground">We support CSV and Excel (.xlsx) files with a maximum size of 10MB.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
