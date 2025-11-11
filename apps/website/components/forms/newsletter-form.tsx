"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe")
      }

      setSubmitStatus("success")
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      console.error("Newsletter subscription error:", error)
      setSubmitStatus("error")

      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          disabled={isSubmitting}
          className="flex-1"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>

      {errors.email && (
        <p className="text-xs text-danger-500">{errors.email.message}</p>
      )}

      {submitStatus === "success" && (
        <p className="text-xs text-success-500">
          Thanks for subscribing! Check your inbox to confirm.
        </p>
      )}

      {submitStatus === "error" && (
        <p className="text-xs text-danger-500">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  )
}
