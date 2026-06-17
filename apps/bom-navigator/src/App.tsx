import { useState } from "react"
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Toaster,
  toast,
} from "@qijenchen/design-system"
import {
  LayoutDashboard,
  Settings,
  List,
  Layers,
  FileText,
  Search,
  Bell,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  User,
  LogOut,
  Eye,
} from "lucide-react"

// ─── Sidebar nav data ───────────────────────────────────────────────────────

const BOM_NAV = [
  { id: "bom-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "configurator", label: "Configurator", icon: Settings },
  { id: "parts-list", label: "Parts List", icon: List },
  { id: "rule-engine", label: "Rule Engine", icon: Layers },
] as const

const LOT_OWNER_NAV = [
  { id: "owner-a", label: "Owner A", icon: User },
  { id: "owner-b", label: "Owner B", icon: User },
] as const

const BASIC_INFO_NAV = [
  { id: "company-info", label: "Company Info", icon: FileText },
  { id: "contact-details", label: "Contact Details", icon: FileText },
] as const

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function AppSidebar({ activeId, onActiveChange }: { activeId: string; onActiveChange: (id: string) => void }) {
  const [bomOpen, setBomOpen] = useState(true)
  const [lotOpen, setLotOpen] = useState(false)
  const [basicOpen, setBasicOpen] = useState(false)

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
        <SidebarGroup collapsible open={bomOpen} onOpenChange={setBomOpen}>
          <SidebarGroupLabel>BOM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {BOM_NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    id={id}
                    startIcon={icon}
                    tooltip={label}
                    isActive={activeId === id}
                    onClick={() => onActiveChange(id)}
                  >
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup collapsible open={lotOpen} onOpenChange={setLotOpen}>
          <SidebarGroupLabel>Lot Owner</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {LOT_OWNER_NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    id={id}
                    startIcon={icon}
                    tooltip={label}
                    isActive={activeId === id}
                    onClick={() => onActiveChange(id)}
                  >
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup collapsible open={basicOpen} onOpenChange={setBasicOpen}>
          <SidebarGroupLabel>Basic Information</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {BASIC_INFO_NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    id={id}
                    startIcon={icon}
                    tooltip={label}
                    isActive={activeId === id}
                    onClick={() => onActiveChange(id)}
                  >
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

// ─── Chrome Header ────────────────────────────────────────────────────────────

function TopHeader() {
  return (
    <ChromeHeader className="bg-surface">
      <SidebarTrigger />
      <div className="flex-1 max-w-[480px] mx-4">
        <div className="flex items-center gap-2 rounded-md border border-divider bg-surface px-3 h-9">
          <Search size={16} className="text-fg-tertiary shrink-0" />
          <input
            className="flex-1 bg-transparent text-body outline-none placeholder:text-fg-tertiary"
            placeholder="Search parts, BOMs..."
          />
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        {/* Alerts bell with red dot */}
        <button className="relative p-2 rounded-md hover:bg-surface-hover text-fg-secondary">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* Notifications dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-md hover:bg-surface-hover text-fg-secondary">
              <Bell size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>BOM U337 updated by Sarah M.</DropdownMenuItem>
            <DropdownMenuItem>Rule ASGR200 approved</DropdownMenuItem>
            <DropdownMenuItem>No more new notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="p-2 rounded-md hover:bg-surface-hover text-fg-secondary">
          <HelpCircle size={18} />
        </button>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md hover:bg-surface-hover px-2 py-1">
              <Avatar alt="Jake Thompson" size={28} color="blue" />
              <span className="text-body font-medium">Jake Thompson</span>
              <ChevronDown size={14} className="text-fg-tertiary" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>My Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ChromeHeader>
  )
}

// ─── Stat card with dialog ────────────────────────────────────────────────────

type StatCardProps = {
  title: string
  count: number
  subtitle?: string
  badge?: React.ReactNode
  dialogTitle: string
  dialogContent: React.ReactNode
}

function StatCard({ title, count, subtitle, badge, dialogTitle, dialogContent }: StatCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex-1 min-w-0 rounded-lg border border-divider bg-surface p-5 cursor-pointer hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-body text-fg-secondary">{title}</span>
            {badge}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{count}</span>
              {subtitle && <span className="text-body text-fg-secondary">{subtitle}</span>}
            </div>
            <ChevronRight size={16} className="text-fg-tertiary" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>Review and take action on items below.</DialogDescription>
        </DialogHeader>
        <DialogBody>{dialogContent}</DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Edit dialog ──────────────────────────────────────────────────────────────

function EditDialog({ code }: { code: string }) {
  const [open, setOpen] = useState(false)
  const [partCode, setPartCode] = useState(code)
  const [description, setDescription] = useState("Assembly part for U337 configuration")
  const [status, setStatus] = useState("Active")

  function handleSave() {
    toast({ title: "Changes saved for " + partCode, variant: "success" })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit — {code}</DialogTitle>
          <DialogDescription>Update the part configuration details below.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium mb-1">Part Code</label>
              <input
                className="w-full rounded-md border border-divider px-3 py-2 text-body bg-surface outline-none focus:ring-2 focus:ring-primary"
                value={partCode}
                onChange={(e) => setPartCode(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium mb-1">Description</label>
              <input
                className="w-full rounded-md border border-divider px-3 py-2 text-body bg-surface outline-none focus:ring-2 focus:ring-primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium mb-1">Status</label>
              <select
                className="w-full rounded-md border border-divider px-3 py-2 text-body bg-surface outline-none focus:ring-2 focus:ring-primary"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Active</option>
                <option>Pending Review</option>
                <option>Inactive</option>
                <option>Deprecated</option>
              </select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Product / Rule list row ──────────────────────────────────────────────────

function ItemRow({ code }: { code: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-divider bg-surface">
      <span className="text-body font-medium">{code}</span>
      <EditDialog code={code} />
    </div>
  )
}

// ─── Dashboard tab content ────────────────────────────────────────────────────

const WAIT_SUBMIT_ITEMS = ["ASGR100", "ASGB100"]
const MISSING_CONFIG_ITEMS = ["ASGR100", "ASGB100", "ASGR200", "ASGB200", "ASGR300"]
const IN_PRODUCTION_ITEMS = [
  { lot: "LOT-2401", part: "ASGR100", stage: "Assembly" },
  { lot: "LOT-2402", part: "ASGB100", stage: "Testing" },
]

function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="flex gap-4">
        <StatCard
          title="Wait to submit"
          count={2}
          subtitle="need to handle"
          dialogTitle="Wait to Submit"
          dialogContent={
            <table className="w-full text-body">
              <thead>
                <tr className="border-b border-divider text-fg-secondary">
                  <th className="text-left py-2 font-medium">Part</th>
                  <th className="text-right py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {WAIT_SUBMIT_ITEMS.map((item) => (
                  <tr key={item} className="border-b border-divider">
                    <td className="py-2">{item}</td>
                    <td className="py-2 text-right">
                      <Button variant="primary" size="sm">Submit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        />

        <StatCard
          title="Missing configuration"
          count={5}
          subtitle="need to handle"
          dialogTitle="Missing Configuration"
          dialogContent={
            <table className="w-full text-body">
              <thead>
                <tr className="border-b border-divider text-fg-secondary">
                  <th className="text-left py-2 font-medium">Part</th>
                  <th className="text-right py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {MISSING_CONFIG_ITEMS.map((item) => (
                  <tr key={item} className="border-b border-divider">
                    <td className="py-2">{item}</td>
                    <td className="py-2 text-right">
                      <Button variant="secondary" size="sm">Fix</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        />

        <StatCard
          title="In Production"
          count={2}
          badge={<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">Pending</span>}
          dialogTitle="In Production"
          dialogContent={
            <table className="w-full text-body">
              <thead>
                <tr className="border-b border-divider text-fg-secondary">
                  <th className="text-left py-2 font-medium">Lot</th>
                  <th className="text-left py-2 font-medium">Part</th>
                  <th className="text-left py-2 font-medium">Stage</th>
                </tr>
              </thead>
              <tbody>
                {IN_PRODUCTION_ITEMS.map((row) => (
                  <tr key={row.lot} className="border-b border-divider">
                    <td className="py-2">{row.lot}</td>
                    <td className="py-2">{row.part}</td>
                    <td className="py-2">{row.stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        />
      </div>

      {/* Products */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-body-lg font-semibold">Products</h2>
          <Button variant="link" size="sm">View more</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ItemRow code="ASGR100" />
          <ItemRow code="ASGB100" />
        </div>
      </section>

      {/* Running Rules */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-body-lg font-semibold">Running Rules</h2>
          <Button variant="link" size="sm">View more</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["ASGR100", "ASGR100", "ASGR200", "ASGR200", "ASGB200", "ASGB200"].map((code, i) => (
            <ItemRow key={i} code={code} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ─── Recipe Parsing tab ───────────────────────────────────────────────────────

const RECIPE_ROWS = [
  { job: "JOB-001", part: "ASGR100", started: "2024-01-15", status: "Completed", result: "3 recipes found" },
  { job: "JOB-002", part: "ASGB100", started: "2024-01-16", status: "Processing", result: "In progress..." },
  { job: "JOB-003", part: "ASGR200", started: "2024-01-17", status: "Queued", result: "Pending" },
]

function statusChip(status: string) {
  if (status === "Completed") return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span>
  if (status === "Processing") return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Processing</span>
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Queued</span>
}

function RecipeParsingTab() {
  return (
    <div>
      <table className="w-full text-body border border-divider rounded-lg overflow-hidden">
        <thead className="bg-surface-secondary">
          <tr>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Job ID</th>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Part</th>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Started</th>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Status</th>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Result</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {RECIPE_ROWS.map((row) => (
            <tr key={row.job} className="border-t border-divider hover:bg-surface-hover">
              <td className="px-4 py-3 font-medium">{row.job}</td>
              <td className="px-4 py-3">{row.part}</td>
              <td className="px-4 py-3 text-fg-secondary">{row.started}</td>
              <td className="px-4 py-3">{statusChip(row.status)}</td>
              <td className="px-4 py-3 text-fg-secondary">{row.result}</td>
              <td className="px-4 py-3">
                <Button variant="tertiary" size="sm" startIcon={Eye}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Traceability tab ─────────────────────────────────────────────────────────

const TRACE_ROWS = [
  { component: "ASGR100", version: "v1.2", usedIn: "U337", changedBy: "Jake T.", date: "2024-01-10", status: "Active" },
  { component: "ASGB100", version: "v2.0", usedIn: "U338", changedBy: "Sarah M.", date: "2024-01-12", status: "Active" },
  { component: "ASGR200", version: "v1.5", usedIn: "U337", changedBy: "Mike R.", date: "2024-01-14", status: "Review" },
  { component: "ASGB200", version: "v3.1", usedIn: "U339", changedBy: "Lisa K.", date: "2024-01-16", status: "Archived" },
]

function traceStatusChip(status: string) {
  if (status === "Active") return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
  if (status === "Review") return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Review</span>
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Archived</span>
}

function TraceabilityTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-body-lg font-semibold">Component History</h2>
        <Button variant="secondary" size="sm">Export</Button>
      </div>
      <table className="w-full text-body border border-divider rounded-lg overflow-hidden">
        <thead className="bg-surface-secondary">
          <tr>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Component</th>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Version</th>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Used In</th>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Changed By</th>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Date</th>
            <th className="text-left px-4 py-3 font-medium text-fg-secondary">Status</th>
          </tr>
        </thead>
        <tbody>
          {TRACE_ROWS.map((row) => (
            <tr key={row.component + row.date} className="border-t border-divider hover:bg-surface-hover">
              <td className="px-4 py-3 font-medium">{row.component}</td>
              <td className="px-4 py-3">{row.version}</td>
              <td className="px-4 py-3">{row.usedIn}</td>
              <td className="px-4 py-3">{row.changedBy}</td>
              <td className="px-4 py-3 text-fg-secondary">{row.date}</td>
              <td className="px-4 py-3">{traceStatusChip(row.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Rule Settings tab ────────────────────────────────────────────────────────

const RULES = [
  { id: "auto-sync", label: "Auto-sync BOM", description: "Automatically synchronize bill of materials on save", defaultOn: true },
  { id: "validation", label: "Validation Rules", description: "Enable strict validation for part configurations", defaultOn: true },
  { id: "mass-edit", label: "Mass Edit Mode", description: "Allow bulk editing of multiple parts simultaneously", defaultOn: false },
  { id: "audit-trail", label: "Audit Trail", description: "Track all changes with timestamps and user info", defaultOn: true },
  { id: "auto-approve", label: "Auto-approve Simple Rules", description: "Automatically approve rules with low complexity score", defaultOn: false },
]

function RuleSettingsTab() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(RULES.map((r) => [r.id, r.defaultOn]))
  )

  function handleSave() {
    toast({ title: "Rule settings saved", variant: "success" })
  }

  return (
    <div className="space-y-4">
      {RULES.map((rule) => (
        <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border border-divider bg-surface">
          <div>
            <p className="text-body font-medium">{rule.label}</p>
            <p className="text-body-sm text-fg-secondary mt-0.5">{rule.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enabled[rule.id]}
              onChange={(e) => setEnabled((prev) => ({ ...prev, [rule.id]: e.target.checked }))}
            />
            <div className="w-10 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-blue-500 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
          </label>
        </div>
      ))}
      <div className="pt-2">
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}

// ─── Main Configurator page ───────────────────────────────────────────────────

function ConfiguratorDashboard() {
  return (
    <div className="px-6 py-5 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-body text-fg-secondary">
        <span className="hover:text-fg-primary cursor-pointer">Product Master</span>
        <span className="mx-1">/</span>
        <span className="hover:text-fg-primary cursor-pointer">Configurator</span>
        <span className="mx-1">/</span>
      </div>

      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">U337</h1>
        <Button variant="secondary" size="md" startIcon={Layers}>Mass Part Creation</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dashboard">
        <TabsList size="lg">
          <TabsTrigger value="dashboard" badge={<Badge count={99} max={99} variant="high" />}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="recipe-parsing">Recipe Parsing</TabsTrigger>
          <TabsTrigger value="traceability">Traceability</TabsTrigger>
          <TabsTrigger value="rule-settings">Rule Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <DashboardTab />
        </TabsContent>
        <TabsContent value="recipe-parsing" className="mt-6">
          <RecipeParsingTab />
        </TabsContent>
        <TabsContent value="traceability" className="mt-6">
          <TraceabilityTab />
        </TabsContent>
        <TabsContent value="rule-settings" className="mt-6">
          <RuleSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────

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
      <Toaster />
    </TooltipProvider>
  )
}
