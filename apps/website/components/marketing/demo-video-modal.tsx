"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DemoVideoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DemoVideoModal({ open, onOpenChange }: DemoVideoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>AGI Workforce Demo</DialogTitle>
          <DialogDescription>
            See how AGI Workforce can automate your workflows
          </DialogDescription>
        </DialogHeader>

        <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
          {/* Placeholder for video - replace with actual YouTube embed or video player */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Demo video will be embedded here</p>
            <p className="text-sm text-muted-foreground">
              Replace with YouTube iframe or video player component
            </p>
          </div>

          {/* Example YouTube embed (uncomment and add your video ID):
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="AGI Workforce Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
