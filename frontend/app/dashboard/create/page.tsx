"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Bell, 
  Mail, 
  Calendar, 
  FileText, 
  MessageSquare,
  Send,
  ArrowLeft,
  ChevronRight,
  Settings2
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface TriggerAction {
  icon: any
  name: string
  description: string
  configFields?: {
    name: string
    type: string
    label: string
    placeholder?: string
  }[]
}

const triggers: TriggerAction[] = [
  { 
    icon: Bell, 
    name: "New Notification", 
    description: "Trigger when a new notification is received",
    configFields: [
      {
        name: "channel",
        type: "text",
        label: "Notification Channel",
        placeholder: "Enter channel name"
      }
    ]
  },
  { 
    icon: Mail, 
    name: "New Email", 
    description: "Trigger when a new email arrives",
    configFields: [
      {
        name: "folder",
        type: "text",
        label: "Email Folder",
        placeholder: "inbox"
      },
      {
        name: "subject_contains",
        type: "text",
        label: "Subject Contains",
        placeholder: "Optional subject filter"
      }
    ]
  },
  { 
    icon: Calendar, 
    name: "Calendar Event", 
    description: "Trigger on calendar events",
    configFields: [
      {
        name: "calendar_id",
        type: "text",
        label: "Calendar ID",
        placeholder: "Enter calendar ID"
      },
      {
        name: "event_type",
        type: "text",
        label: "Event Type",
        placeholder: "meeting, reminder, etc."
      }
    ]
  },
]

const actions: TriggerAction[] = [
  { 
    icon: FileText, 
    name: "Create Document", 
    description: "Create a new document",
    configFields: [
      {
        name: "template",
        type: "text",
        label: "Document Template",
        placeholder: "Select template"
      },
      {
        name: "folder",
        type: "text",
        label: "Destination Folder",
        placeholder: "Enter folder path"
      }
    ]
  },
  { 
    icon: MessageSquare, 
    name: "Send Message", 
    description: "Send a message or notification",
    configFields: [
      {
        name: "channel",
        type: "text",
        label: "Message Channel",
        placeholder: "Enter channel"
      },
      {
        name: "message_template",
        type: "text",
        label: "Message Template",
        placeholder: "Enter message template"
      }
    ]
  },
  { 
    icon: Mail, 
    name: "Send Email", 
    description: "Send an email",
    configFields: [
      {
        name: "to",
        type: "email",
        label: "Recipient Email",
        placeholder: "recipient@example.com"
      },
      {
        name: "subject_template",
        type: "text",
        label: "Subject Template",
        placeholder: "Enter subject template"
      }
    ]
  },
]

export default function CreateWorkflowPage() {
  const [step, setStep] = useState("trigger")
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerAction | null>(null)
  const [selectedAction, setSelectedAction] = useState<TriggerAction | null>(null)
  const [workflowName, setWorkflowName] = useState("")
  const [workflowDescription, setWorkflowDescription] = useState("")
  const { toast } = useToast()

  const handleSave = () => {
    if (!workflowName) {
      toast({
        title: "Error",
        description: "Please enter a workflow name",
        variant: "destructive"
      })
      return
    }
    if (!selectedTrigger || !selectedAction) {
      toast({
        title: "Error",
        description: "Please select both a trigger and an action",
        variant: "destructive"
      })
      return
    }
    
    toast({
      title: "Success",
      description: "Workflow created successfully!",
    })
  }

  const renderConfigFields = (item: TriggerAction | null) => {
    if (!item?.configFields) return null
    
    return (
      <div className="space-y-4 mt-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Settings2 className="h-4 w-4" />
          Configuration
        </h3>
        {item.configFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create Workflow</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Workflow Name</Label>
            <Input 
              id="name" 
              placeholder="Enter workflow name" 
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              placeholder="Enter workflow description" 
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={step} onValueChange={setStep}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trigger">1. Choose Trigger</TabsTrigger>
          <TabsTrigger value="action" disabled={!selectedTrigger}>2. Choose Action</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trigger" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {triggers.map((trigger) => (
              <Card 
                key={trigger.name} 
                className={`cursor-pointer transition-colors ${
                  selectedTrigger?.name === trigger.name 
                    ? 'border-primary' 
                    : 'hover:border-primary'
                }`}
                onClick={() => setSelectedTrigger(trigger)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <trigger.icon className="h-5 w-5" />
                    <CardTitle className="text-lg">{trigger.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{trigger.description}</p>
                  {selectedTrigger?.name === trigger.name && renderConfigFields(trigger)}
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedTrigger && (
            <div className="flex justify-end">
              <Button onClick={() => setStep("action")}>
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="action" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {actions.map((action) => (
              <Card 
                key={action.name} 
                className={`cursor-pointer transition-colors ${
                  selectedAction?.name === action.name 
                    ? 'border-primary' 
                    : 'hover:border-primary'
                }`}
                onClick={() => setSelectedAction(action)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <action.icon className="h-5 w-5" />
                    <CardTitle className="text-lg">{action.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                  {selectedAction?.name === action.name && renderConfigFields(action)}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={!selectedTrigger || !selectedAction || !workflowName}
        >
          <Send className="mr-2 h-4 w-4" /> Create Workflow
        </Button>
      </div>
    </div>
  )
}