"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, Globe } from "lucide-react"
import type { NotificationSettingsType } from "@/lib/types"

const defaultSettings: NotificationSettingsType = {
  goalReached: true,
  monthlyReport: true,
  newOpportunities: false,
}

export function NotificationSettingsComponent() {
  const [settings, setSettings] = useState<NotificationSettingsType>(defaultSettings)
  const [emailFrequency, setEmailFrequency] = useState("weekly")
  const [pushEnabled, setPushEnabled] = useState(true)

  const handleSettingChange = (key: keyof NotificationSettingsType, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // TODO: Save settings to backend
    console.log("Saving notification settings:", { settings, emailFrequency, pushEnabled })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat mb-2">Notification Settings</h2>
        <p className="text-muted-foreground">Customize how and when you receive updates about your impact</p>
      </div>

      <div className="grid gap-6">
        {/* Notification Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Types</span>
            </CardTitle>
            <CardDescription>Choose which events you want to be notified about</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="goal-reached">Funding Goals Reached</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when organizations you support reach their funding goals
                </p>
              </div>
              <Switch
                id="goal-reached"
                checked={settings.goalReached}
                onCheckedChange={(checked) => handleSettingChange("goalReached", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="monthly-report">Monthly Impact Reports</Label>
                <p className="text-sm text-muted-foreground">Receive monthly summaries of your environmental impact</p>
              </div>
              <Switch
                id="monthly-report"
                checked={settings.monthlyReport}
                onCheckedChange={(checked) => handleSettingChange("monthlyReport", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-opportunities">New Opportunities</Label>
                <p className="text-sm text-muted-foreground">
                  Be the first to know about new organizations and donation opportunities
                </p>
              </div>
              <Switch
                id="new-opportunities"
                checked={settings.newOpportunities}
                onCheckedChange={(checked) => handleSettingChange("newOpportunities", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Delivery Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Delivery Methods</span>
            </CardTitle>
            <CardDescription>Choose how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive instant notifications in your browser</p>
              </div>
              <Switch id="push-notifications" checked={pushEnabled} onCheckedChange={setPushEnabled} />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email-frequency">Email Frequency</Label>
              <Select value={emailFrequency} onValueChange={setEmailFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Only</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Privacy & Data</span>
            </CardTitle>
            <CardDescription>Control how your data is used for notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Personalized Recommendations</Label>
                <p className="text-sm text-muted-foreground">
                  Use your donation history to suggest relevant organizations
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Impact Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Allow anonymous data collection to improve impact tracking
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="bg-transparent">
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </div>
  )
}
