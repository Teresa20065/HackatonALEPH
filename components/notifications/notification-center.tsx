"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, CheckCircle, Target, TrendingUp, Leaf, X } from "lucide-react"
import { format } from "date-fns"

interface Notification {
  id: string
  type: "goal_reached" | "interest_generated" | "new_opportunity" | "milestone"
  title: string
  message: string
  timestamp: Date
  read: boolean
  organizationName?: string
  amount?: number
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "goal_reached",
    title: "Funding Goal Reached!",
    message: "Amazon Rainforest Foundation has reached their $500K funding goal thanks to your contribution!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    organizationName: "Amazon Rainforest Foundation",
    amount: 500000,
  },
  {
    id: "2",
    type: "interest_generated",
    title: "Interest Generated",
    message: "Your donations have generated $45 in interest this month across all organizations.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: false,
    amount: 45,
  },
  {
    id: "3",
    type: "new_opportunity",
    title: "New Organization Available",
    message: "Ocean Cleanup Project is now accepting sustainable donations with 7.5% APY.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    organizationName: "Ocean Cleanup Project",
  },
  {
    id: "4",
    type: "milestone",
    title: "Impact Milestone",
    message: "Your donations have helped plant over 1,000 trees this quarter!",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    read: true,
    amount: 1000,
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "goal_reached":
        return <Target className="h-4 w-4 text-green-600" />
      case "interest_generated":
        return <TrendingUp className="h-4 w-4 text-primary" />
      case "new_opportunity":
        return <Leaf className="h-4 w-4 text-secondary" />
      case "milestone":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-1 text-xs">
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start space-x-3 p-3 cursor-pointer"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p
                      className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {notification.title}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeNotification(notification.id)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(notification.timestamp, "MMM dd, HH:mm")}
                  </p>
                  {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
