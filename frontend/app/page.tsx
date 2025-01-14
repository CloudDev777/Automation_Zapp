import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Workflow, Bot } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WorkflowHub</span>
          </div>
          <nav className="space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Automate Your Work, <span className="text-primary">Amplify Results</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your favorite apps and create powerful automated workflows in minutes. No coding required.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start For Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose WorkflowHub?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <Workflow className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Workflow Creation</h3>
                <p className="text-muted-foreground">Build powerful automation workflows with our intuitive drag-and-drop interface.</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <Bot className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Automation</h3>
                <p className="text-muted-foreground">Let our AI-powered system handle your repetitive tasks while you focus on what matters.</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant Integration</h3>
                <p className="text-muted-foreground">Connect with thousands of popular apps and services in just a few clicks.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-semibold">WorkflowHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 WorkflowHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}