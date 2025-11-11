"use client"

import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left">Menu</DialogTitle>
        </DialogHeader>
        <nav className="flex flex-col space-y-3 mt-4">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60 px-2 py-2 hover:bg-accent rounded-md"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col space-y-2 pt-4 border-t">
          <Button variant="outline" asChild className="w-full">
            <Link href="/signin" onClick={() => onOpenChange(false)}>
              Sign In
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/download" onClick={() => onOpenChange(false)}>
              Download for Windows
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
