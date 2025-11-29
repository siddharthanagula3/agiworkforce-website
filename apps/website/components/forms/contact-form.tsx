"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { BotDetectionTracker } from "@/lib/bot-detection"

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacy: z.boolean().refine((val) => val === true, "You must accept the privacy policy"),
  // Honeypot field - should remain empty
  website: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle")

  // Bot detection tracker
  const botTrackerRef = React.useRef<BotDetectionTracker | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  // Initialize bot detection tracker
  React.useEffect(() => {
    botTrackerRef.current = new BotDetectionTracker()

    // Track mouse movements
    const handleMouseMove = (e: MouseEvent) => {
      botTrackerRef.current?.trackMouseMove(e)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Track field focus
  const handleFieldFocus = () => {
    botTrackerRef.current?.trackFieldFocus()
  }

  // Track keypresses
  const handleKeypress = () => {
    botTrackerRef.current?.trackKeypress()
  }

  // Track paste events
  const handlePaste = () => {
    botTrackerRef.current?.trackPaste()
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Get bot detection data
      const botData = botTrackerRef.current?.getDetectionData()

      // Set honeypot value
      if (botTrackerRef.current) {
        botTrackerRef.current.setHoneypotValue(data.website || '')
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          botDetection: botData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))

        // Check if blocked for bot-like behavior
        if (response.status === 400 && errorData.error?.includes('bot')) {
          setSubmitStatus("error")
          return
        }

        throw new Error("Failed to submit form")
      }

      setSubmitStatus("success")
      reset()
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register("firstName")}
            disabled={isSubmitting}
            onFocus={handleFieldFocus}
            onKeyDown={handleKeypress}
            onPaste={handlePaste}
          />
          {errors.firstName && (
            <p className="text-sm text-danger-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register("lastName")}
            disabled={isSubmitting}
            onFocus={handleFieldFocus}
            onKeyDown={handleKeypress}
            onPaste={handlePaste}
          />
          {errors.lastName && (
            <p className="text-sm text-danger-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          disabled={isSubmitting}
          onFocus={handleFieldFocus}
          onKeyDown={handleKeypress}
          onPaste={handlePaste}
        />
        {errors.email && (
          <p className="text-sm text-danger-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          placeholder="Acme Inc."
          {...register("company")}
          disabled={isSubmitting}
          onFocus={handleFieldFocus}
          onKeyDown={handleKeypress}
          onPaste={handlePaste}
        />
      </div>

      {/* Honeypot field - hidden from users, bots will fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          {...register("website")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us how we can help..."
          rows={5}
          {...register("message")}
          disabled={isSubmitting}
          onFocus={handleFieldFocus}
          onKeyDown={handleKeypress}
          onPaste={handlePaste}
        />
        {errors.message && (
          <p className="text-sm text-danger-500">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="privacy"
          className="mt-1"
          {...register("privacy")}
          disabled={isSubmitting}
        />
        <Label htmlFor="privacy" className="text-sm">
          I agree to the{" "}
          <a href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Privacy Policy
          </a>{" "}
          *
        </Label>
      </div>
      {errors.privacy && (
        <p className="text-sm text-danger-500">{errors.privacy.message}</p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {submitStatus === "success" && (
        <div className="p-4 bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-200 rounded-md">
          Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-danger-100 dark:bg-danger-900/20 text-danger-800 dark:text-danger-200 rounded-md">
          Something went wrong. Please try again or contact us at support@agiworkforce.com
        </div>
      )}
    </form>
  )
}
