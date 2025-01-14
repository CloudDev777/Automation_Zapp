import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Workflow,
  Settings,
  LogOut,
  Zap,
} from "lucide-react"

export function DashboardNav() {
  return (
    <div className="w-64 border-r bg-muted/50 min-h-screen p-4">
      <div className="flex items-center space-x-2 mb-8">
        <Zap className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">WorkflowHub</span>
      </div>
      
      <nav className="space-y-2">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/create">
          <Button variant="ghost" className="w-full justify-start">
            <Workflow className="mr-2 h-4 w-4" />
            Workflows
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>

      <div className="absolute bottom-4 w-56">
        <Button variant="ghost" className="w-full justify-start text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}