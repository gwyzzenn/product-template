import { useState, type ReactElement } from 'react'
import {
  AppShell,
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
  ChromeHeader,
  TooltipProvider,
  Avatar,
  ItemAvatar,
  Button,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@qijenchen/design-system"
import {
  LayoutDashboard,
  Server,
  List,
  Settings,
  Shuffle,
  Layers,
  Search,
  Bell,
  HelpCircle,
  ChevronRight,
  FileText,
} from "lucide-react"

const TOP_NAV = [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }] as const

const BOM_NAV = [
  { id: "site-master", label: "Site Master", icon: Server },
  { id: "bom-viewer", label: "BOM Viewer", icon: List },
  { id: "configurator", label: "Configurator", icon: Settings },
  { id: "alternative", label: "Alternative", icon: Shuffle },
  { id: "mass-part-creation", label: "Mass Part Creation", icon: Layers },
] as const

const BASIC_INFO_NAV = [
  { id: "tm6-1", label: "Interposer TM6 Configurations", icon: FileText },
  { id: "tm6-2", label: "Interposer TM6 Configurations", icon: FileText },
  { id: "tm6-3", label: "Interposer TM6 Configurations", icon: FileText },
] as const

function AppSidebar({ activeId, onActiveChange }: { activeId: string; onActiveChange: (id: string) => void }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 min-w-0 group-data-[collapsible=icon]:justify-center">
          <Avatar alt="PDM" size={24} shape="square" color="blue" solid />
          <span className="text-body-lg font-semibold truncate group-data-[collapsible=icon]:hidden">
            Product Master
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOP_NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label} isActive={activeId === id} onClick={() => onActiveChange(id)}>
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>BOM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {BOM_NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label} isActive={activeId === id} onClick={() => onActiveChange(id)}>
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Lot Owner</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu /></SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Basic Information</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {BASIC_INFO_NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label} isActive={activeId === id} onClick={() => onActiveChange(id)}>
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div role="group" aria-label="Jake Thompson">
                <ItemAvatar alt="Jake Thompson" color="blue" />
                <span data-sidebar="menu-label" className="min-w-0 flex-1 truncate">Jake Thompson</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function TopHeader(_: { rightSlot?: ReactElement<any, any> }) {
  return (
    <ChromeHeader className="bg-surface">
      <SidebarTrigger />
      <div className="flex-1 max-w-[480px] mx-4">
        <div className="flex items-center gap-2 rounded-md border border-divider bg-surface px-3 h-9">
          <Search size={16} className="text-fg-tertiary shrink-0" />
          <span className="flex-1 truncate text-fg-tertiary text-body">TM5678</span>
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-md hover:bg-surface-hover text-fg-secondary">
          <Settings size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-notification" />
        </button>
        <button className="p-2 rounded-md hover:bg-surface-hover text-fg-secondary"><Bell size={18} /></button>
        <button className="p-2 rounded-md hover:bg-surface-hover text-fg-secondary"><HelpCircle size={18} /></button>
        <button className="flex items-center gap-2 rounded-md hover:bg-surface-hover px-2 py-1">
          <Avatar alt="Jake Thompson" size={28} color="blue" />
          <span className="text-body font-medium">Jake Thompson</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-fg-tertiary">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </ChromeHeader>
  )
}

function SummaryCard({ title, count, subtitle, badge }: { title: string; count: number; subtitle: string; badge?: ReactElement<any, any> }) {
  return (
    <div className="flex-1 min-w-0 rounded-lg border border-divider bg-surface p-5 cursor-pointer hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-body text-fg-secondary">{title}</span>
        {badge}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-h3 font-semibold">{count}</span>
          {subtitle && <span className="text-body text-fg-secondary">{subtitle}</span>}
        </div>
        <ChevronRight size={16} className="text-fg-tertiary" />
      </div>
    </div>
  )
}

function ListItemRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-divider bg-surface">
      <div className="flex items-center gap-2">
        <span className="text-body font-medium">{label}</span>
        <span className="text-fg-tertiary text-body">—</span>
      </div>
      <Button variant="secondary" size="sm">Edit</Button>
    </div>
  )
}

function ConfiguratorDashboard() {
  return (
    <div className="px-6 py-5 space-y-6">
      <div className="flex items-center gap-1 text-body text-fg-secondary">
        <span className="hover:text-fg-primary cursor-pointer">Product Master</span>
        <span className="mx-1">/</span>
        <span className="hover:text-fg-primary cursor-pointer">Configurator</span>
        <span className="mx-1">/</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-h3 font-semibold">U337</h1>
        <Button variant="secondary" size="md" startIcon={Layers}>Mass Part Creation</Button>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList size="lg">
          <TabsTrigger value="dashboard" badge={<Badge count={99} max={99} variant="high" />}>Dashboard</TabsTrigger>
          <TabsTrigger value="recipe-parsing">Recipe Parsing</TabsTrigger>
          <TabsTrigger value="traceability">Traceability</TabsTrigger>
          <TabsTrigger value="rule-settings">Rule Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6 space-y-6">
          <section>
            <h2 className="text-body-lg font-semibold mb-3">Summary</h2>
            <div className="flex gap-4">
              <SummaryCard title="Wait to submit" count={2} subtitle="need to handle" />
              <SummaryCard title="Missing configuration" count={5} subtitle="need to handle" />
              <SummaryCard
                title="In Production"
                count={2}
                subtitle=""
                badge={<span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-caption font-medium border border-amber-200">Pending</span>}
              />
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-body-lg font-semibold">Product list</h2>
              <button className="text-body text-info hover:underline">View more</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <ListItemRow label="ASGB100" />
              <ListItemRow label="ASGR100" />
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-body-lg font-semibold">Running Rule</h2>
              <button className="text-body text-info hover:underline">View more</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 8 }, (_, i) => <ListItemRow key={i} label="ASGR100" />)}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="recipe-parsing" className="mt-6"><p className="text-body text-fg-secondary">Recipe Parsing content</p></TabsContent>
        <TabsContent value="traceability" className="mt-6"><p className="text-body text-fg-secondary">Traceability content</p></TabsContent>
        <TabsContent value="rule-settings" className="mt-6"><p className="text-body text-fg-secondary">Rule Settings content</p></TabsContent>
      </Tabs>
    </div>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState<string>("configurator")
  return (
    <TooltipProvider delayDuration={500} skipDelayDuration={300}>
      <SidebarProvider activeId={activeId} onActiveChange={setActiveId}>
        <AppShell
          layout="primary-sidebar"
          sidebar={<AppSidebar activeId={activeId} onActiveChange={setActiveId} />}
          header={<TopHeader />}
        >
          <ConfiguratorDashboard />
        </AppShell>
      </SidebarProvider>
    </TooltipProvider>
  )
}
