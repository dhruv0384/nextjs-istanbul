import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { toggleTheme } from "@/utils/theme"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Search, SunMoon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import data from "./data.json"
import { useState, useMemo } from "react"
import CalendarModal from "@/modules/calendar/components/CalendarModal"
import React from "react"

export default function Page() {
  const [theme, setTheme] = useState<"light"|"dark">("light");
  const [showStats, setShowStats] = useState(false);

  const handleToggle = () => {
    const nextTheme = toggleTheme(theme);
    setTheme(nextTheme);
    alert(`Theme toggled to: ${nextTheme}`); 
  };


  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <div className="flex min-h-screen w-full">
        <AppSidebar variant="inset" collapsible="icon" />

        <SidebarInset>

          <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4">

            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dashboard..."
                className="w-[250px] md:w-[400px]"
                data-testid="search-input"
              />
            </div>


            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleToggle} data-testid="toggle-theme">
                <SunMoon className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Bell className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>No New Notification</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback>DA</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 flex-col p-6">
            <div className="@container/main flex flex-1 flex-col gap-4">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <Button onClick={() => setShowStats(!showStats)} id="toggle-stats">
                    {showStats ? "Hide Stats" : "Show Stats"}
                    </Button>

                    {showStats ? (
                    <ChartAreaInteractive />
                    ) : (
                    <p data-testid="no-stats">Stats are hidden</p>
                    )}
              </div>
            </div>
              <DataTable data={data} />
              <CalendarModal />
            
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
