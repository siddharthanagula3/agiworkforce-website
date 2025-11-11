import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
            <FileQuestion className="h-6 w-6 text-blue-500" />
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center">
            Error 404 - This might be a broken link or the page may have been removed.
          </p>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button asChild className="flex-1">
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href="/features">Explore Features</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
