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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Toaster,
  toast,
} from '@qijenchen/design-system'
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
  Download,
  User,
  LogOut,
} from 'lucide-react'

// ── Nav data ──
const TOP_NAV = [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] as const
const BOM_NAV = [
  { id: 'site-master', label: 'Site Master', icon: Server },
  { id: 'bom-viewer', label: 'BOM Viewer', icon: List },
  { id: 'configurator', label: 'Configurator', icon: Settings },
  { id: 'alternative', label: 'Alternative', icon: Shuffle },
  { id: 'mass-part-creation', label: 'Mass Part Creation', icon: Layers },
] as const
const LOT_OWNER_NAV = [
  { id: 'tm6-lot', label: 'Interposer TM6 Config', icon: FileText },
] as const
const BASIC_INFO_NAV = [
  { id: 'tm6-1', label: 'Interposer TM6 Configurations', icon: FileText },
  { id: 'tm6-2', label: 'Interposer TM6 Configurations', icon: FileText },
] as const

// ── Running Rule data ──
const RUNNING_RULES = [
  { code: 'ASGR100', desc: 'Assembly Run 100' },
  { code: 'ASGR100', desc: 'Assembly Run 100' },
  { code: 'ASGR200', desc: 'Assembly Run 200' },
  { code: 'ASGR200', desc: 'Assembly Run 200' },
  { code: 'ASGB200', desc: 'Assembly Block 200' },
  { code: 'ASGB200', desc: 'Assembly Block 200' },
] as const

// ── AppSidebar ──
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
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label}
                    isActive={activeId === id} onClick={() => onActiveChange(id)}>
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup collapsible defaultOpen>
          <SidebarGroupLabel>BOM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {BOM_NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label}
                    isActive={activeId === id} onClick={() => onActiveChange(id)}>
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup collapsible>
          <SidebarGroupLabel>Lot Owner</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {LOT_OWNER_NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label}
                    isActive={activeId === id} onClick={() => onActiveChange(id)}>
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup collapsible>
          <SidebarGroupLabel>Basic Information</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {BASIC_INFO_NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label}
                    isActive={activeId === id} onClick={() => onActiveChange(id)}>
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

// ── Notification Dropdown ──
const NOTIFICATIONS = [
  { icon: '⚠️', title: 'Missing configuration detected', body: '5 parts in U337 have missing BOM configuration.', time: '2h ago' },
  { icon: '📋', title: 'Submit reminder', body: '2 items in U337 are pending submission.', time: '5h ago' },
  { icon: '✅', title: 'Recipe parse completed', body: 'RPJ-20260611-001: 12 rules extracted from ASGR100.', time: 'Yesterday' },
] as const

function NotificationMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-md hover:bg-surface-hover text-fg-secondary">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-notification border-2 border-surface" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NOTIFICATIONS.map((n, i) => (
          <DropdownMenuItem key={i} className="flex flex-col items-start gap-0.5 py-2.5">
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm">{n.icon}</span>
              <span className="text-body font-medium flex-1">{n.title}</span>
              <span className="text-caption text-fg-tertiary">{n.time}</span>
            </div>
            <p className="text-caption text-fg-secondary pl-6">{n.body}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ── Profile Dropdown ──
function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-md hover:bg-surface-hover px-2 py-1">
          <Avatar alt="Jake Thompson" size={28} color="blue" />
          <span className="text-body font-medium">Jake Thompson</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-fg-tertiary">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <div className="px-3 py-2.5 flex items-center gap-2.5">
          <Avatar alt="Jake Thompson" size={36} color="blue" />
          <div>
            <div className="text-body font-medium">Jake Thompson</div>
            <div className="text-caption text-fg-secondary">jake@tsmc.com</div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem startIcon={User}>My Profile</DropdownMenuItem>
        <DropdownMenuItem startIcon={Settings}>Preferences</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem startIcon={LogOut} className="text-destructive">Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ── Top Chrome Header ──
function TopHeader(_: { rightSlot?: ReactElement<any, any> }) {
  return (
    <ChromeHeader className="bg-surface">
      <SidebarTrigger />
      <div className="flex-1 max-w-[480px] mx-4">
        <div className="flex items-center gap-2 rounded-md border border-divider bg-surface px-3 h-9">
          <Search size={16} className="text-fg-tertiary shrink-0" />
          <input
            defaultValue="TM5678"
            placeholder="Search part, BOM, product..."
            className="flex-1 bg-transparent text-body text-fg-primary outline-none placeholder:text-fg-tertiary"
          />
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        <button className="relative p-2 rounded-md hover:bg-surface-hover text-fg-secondary">
          <Settings size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-notification border-2 border-surface" />
        </button>
        <NotificationMenu />
        <button className="p-2 rounded-md hover:bg-surface-hover text-fg-secondary">
          <HelpCircle size={18} />
        </button>
        <ProfileMenu />
      </div>
    </ChromeHeader>
  )
}

// ── Stat Card with Dialog ──
type StatDialogContent = { title: string; body: ReactElement<any, any> }

function StatCard({ title, count, subtitle, badge, dialog }: {
  title: string; count: number; subtitle: string
  badge?: ReactElement<any, any>; dialog: StatDialogContent
}) {
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
              <span className="text-h3 font-semibold">{count}</span>
              {subtitle && <span className="text-body text-fg-secondary">{subtitle}</span>}
            </div>
            <ChevronRight size={16} className="text-fg-tertiary" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{dialog.title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{dialog.body}</DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── Simple table components ──
function SimpleTable({ heads, rows }: { heads: string[]; rows: ReactElement<any, any>[] }) {
  return (
    <div className="rounded-lg border border-divider overflow-hidden">
      <table className="w-full text-body border-collapse">
        <thead>
          <tr className="bg-surface-secondary border-b border-divider">
            {heads.map((h) => (
              <th key={h} className="text-left px-3 py-2 text-caption text-fg-secondary font-medium whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function Chip({ label, color }: { label: string; color: 'green' | 'orange' | 'gray' }) {
  const cls = {
    green: 'bg-green-50 text-green-700 border-green-200',
    orange: 'bg-amber-50 text-amber-700 border-amber-200',
    gray: 'bg-surface-secondary text-fg-secondary border-divider',
  }[color]
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-caption font-medium border ${cls}`}>{label}</span>
}

// ── Edit Dialog ──
function EditDialog({ code, desc, children }: { code: string; desc: string; children: ReactElement<any, any> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit — {code}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-caption text-fg-secondary font-medium">Part Code</label>
              <input defaultValue={code} className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-caption text-fg-secondary font-medium">Description</label>
              <input defaultValue={desc} className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-caption text-fg-secondary font-medium">Status</label>
              <select className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary">
                <option>Active</option>
                <option>Pending Review</option>
                <option>Inactive</option>
                <option>Deprecated</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-caption text-fg-secondary font-medium">Assigned Reviewer</label>
              <select className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary">
                <option>Jake Thompson</option>
                <option>Sarah Lin</option>
                <option>Mike Chen</option>
                <option>— Unassigned —</option>
              </select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary" onClick={() => toast({ title: `Changes saved for ${code}`, variant: 'success' })}>
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── List Item Row ──
function ListItemRow({ code, desc }: { code: string; desc: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-divider bg-surface">
      <span className="text-body font-medium">{code}</span>
      <span className="text-fg-tertiary text-body">—</span>
      <span className="text-body text-fg-secondary flex-1 truncate">{desc}</span>
      <EditDialog code={code} desc={desc}>
        <Button variant="secondary" size="sm">Edit</Button>
      </EditDialog>
    </div>
  )
}

// ── Dashboard Tab Content ──
function DashboardTab() {
  const waitDialog: StatDialogContent = {
    title: 'Wait to Submit — 2 items',
    body: (
      <SimpleTable
        heads={['Part', 'Pending Since', 'Action']}
        rows={[
          <tr key="r1" className="border-b border-divider last:border-0 hover:bg-surface-secondary">
            <td className="px-3 py-2">ASGR100</td>
            <td className="px-3 py-2 text-fg-secondary">2026-06-10</td>
            <td className="px-3 py-2"><Button variant="primary" size="sm" onClick={() => toast({ title: 'Submitting ASGR100...', variant: 'info' })}>Submit</Button></td>
          </tr>,
          <tr key="r2" className="hover:bg-surface-secondary">
            <td className="px-3 py-2">ASGB100</td>
            <td className="px-3 py-2 text-fg-secondary">2026-06-09</td>
            <td className="px-3 py-2"><Button variant="primary" size="sm" onClick={() => toast({ title: 'Submitting ASGB100...', variant: 'info' })}>Submit</Button></td>
          </tr>,
        ]}
      />
    ),
  }
  const missingDialog: StatDialogContent = {
    title: 'Missing Configuration — 5 items',
    body: (
      <SimpleTable
        heads={['Part', 'Missing Field', 'Action']}
        rows={[
          ['ASGR100', 'TM6 Mapping'],
          ['ASGB100', 'Recipe Ref'],
          ['ASGR200', 'TM6 Mapping'],
          ['TM6-SUB', 'Site Assignment'],
          ['INTERP-V2', 'Version Lock'],
        ].map(([part, field]) => (
          <tr key={part} className="border-b border-divider last:border-0 hover:bg-surface-secondary">
            <td className="px-3 py-2">{part}</td>
            <td className="px-3 py-2 text-destructive">{field}</td>
            <td className="px-3 py-2"><Button variant="secondary" size="sm" onClick={() => toast({ title: `Editing ${part}...`, variant: 'info' })}>Fix</Button></td>
          </tr>
        ))}
      />
    ),
  }
  const prodDialog: StatDialogContent = {
    title: 'In Production — 2 items',
    body: (
      <>
        <p className="text-body text-fg-secondary mb-4">Items in active production. Changes require a CCB review.</p>
        <SimpleTable
          heads={['Part', 'Lot', 'Started', 'Status']}
          rows={[
            <tr key="p1" className="border-b border-divider hover:bg-surface-secondary">
              <td className="px-3 py-2 font-medium">ASGR100</td>
              <td className="px-3 py-2 font-mono text-caption">LOT-2026-0611</td>
              <td className="px-3 py-2 text-fg-secondary">2026-06-11</td>
              <td className="px-3 py-2"><Chip label="Warning" color="orange" /></td>
            </tr>,
            <tr key="p2" className="hover:bg-surface-secondary">
              <td className="px-3 py-2 font-medium">ASGB100</td>
              <td className="px-3 py-2 font-mono text-caption">LOT-2026-0608</td>
              <td className="px-3 py-2 text-fg-secondary">2026-06-08</td>
              <td className="px-3 py-2"><Chip label="On Track" color="green" /></td>
            </tr>,
          ]}
        />
      </>
    ),
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-body-lg font-semibold mb-3">Summary</h2>
        <div className="flex gap-4">
          <StatCard title="Wait to submit" count={2} subtitle="need to handle" dialog={waitDialog} />
          <StatCard title="Missing configuration" count={5} subtitle="need to handle" dialog={missingDialog} />
          <StatCard
            title="In Production" count={2} subtitle="" dialog={prodDialog}
            badge={<span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-caption font-medium border border-amber-200">Pending</span>}
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-body-lg font-semibold">Product list</h2>
          <Button variant="link" size="sm" onClick={() => toast({ title: 'Loading full product list...' })}>View more</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ListItemRow code="ASGR100" desc="Assembly Run 100" />
          <ListItemRow code="ASGB100" desc="Assembly Block 100" />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-body-lg font-semibold">Running Rule</h2>
          <Button variant="link" size="sm" onClick={() => toast({ title: 'Loading all running rules...' })}>View more</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {RUNNING_RULES.map((r, i) => (
            <ListItemRow key={i} code={r.code} desc={r.desc} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ── Recipe Parsing Tab ──
function RecipeTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-body-lg font-semibold">Recipe Parsing</h2>
        <Button variant="primary" size="sm" onClick={() => toast({ title: 'New recipe parse job started for U337', variant: 'success' })}>
          + New Parse Job
        </Button>
      </div>
      <SimpleTable
        heads={['Job ID', 'Part', 'Started', 'Status', 'Result', 'Action']}
        rows={[
          { id: 'RPJ-20260611-001', part: 'ASGR100', date: '2026-06-11 09:32', status: <Chip label="Completed" color="green" />, result: '12 rules extracted' },
          { id: 'RPJ-20260610-003', part: 'ASGB100', date: '2026-06-10 14:15', status: <Chip label="Warning" color="orange" />, result: '8 rules, 2 conflicts' },
          { id: 'RPJ-20260609-007', part: 'ASGR100', date: '2026-06-09 16:48', status: <Chip label="Archived" color="gray" />, result: '10 rules extracted' },
        ].map((row) => (
          <tr key={row.id} className="border-b border-divider last:border-0 hover:bg-surface-secondary">
            <td className="px-3 py-2 font-mono text-caption">{row.id}</td>
            <td className="px-3 py-2">{row.part}</td>
            <td className="px-3 py-2 text-fg-secondary text-caption">{row.date}</td>
            <td className="px-3 py-2">{row.status}</td>
            <td className="px-3 py-2 text-fg-secondary">{row.result}</td>
            <td className="px-3 py-2">
              <Button variant="secondary" size="sm" onClick={() => toast({ title: `Viewing ${row.id}` })}>View</Button>
            </td>
          </tr>
        ))}
      />
    </div>
  )
}

// ── Traceability Tab ──
function TraceabilityTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-body-lg font-semibold">Traceability — U337</h2>
        <Button variant="secondary" size="sm" startIcon={Download} onClick={() => toast({ title: 'Exporting traceability report...' })}>
          Export
        </Button>
      </div>
      <SimpleTable
        heads={['Component', 'Version', 'Used In', 'Changed By', 'Date', 'Status']}
        rows={[
          { comp: 'ASGR100', ver: 'v2.3.1', usedIn: 'U337, U338', by: 'Jake T.', date: '2026-06-10', status: <Chip label="Active" color="green" /> },
          { comp: 'ASGB100', ver: 'v1.8.0', usedIn: 'U337', by: 'Sarah L.', date: '2026-06-08', status: <Chip label="Review" color="orange" /> },
          { comp: 'TM6-CORE', ver: 'v4.0.2', usedIn: 'U337, U340, U341', by: 'System', date: '2026-06-01', status: <Chip label="Active" color="green" /> },
          { comp: 'INTERP-V3', ver: 'v3.1.0', usedIn: 'U337', by: 'Mike C.', date: '2026-05-28', status: <Chip label="Deprecated" color="gray" /> },
        ].map((row) => (
          <tr key={row.comp} className="border-b border-divider last:border-0 hover:bg-surface-secondary">
            <td className="px-3 py-2 font-medium">{row.comp}</td>
            <td className="px-3 py-2 text-fg-secondary">{row.ver}</td>
            <td className="px-3 py-2 text-fg-secondary">{row.usedIn}</td>
            <td className="px-3 py-2 text-fg-secondary">{row.by}</td>
            <td className="px-3 py-2 text-fg-secondary">{row.date}</td>
            <td className="px-3 py-2">{row.status}</td>
          </tr>
        ))}
      />
    </div>
  )
}

// ── Rule Settings Tab ──
const RULES = [
  { label: 'Auto-assign on submit', desc: 'Automatically assign reviewer when part is submitted for approval.', defaultOn: true },
  { label: 'Validate on configuration change', desc: 'Run validation rules automatically when BOM configuration changes.', defaultOn: true },
  { label: 'Block production on missing config', desc: 'Prevent production release when required BOM fields are incomplete.', defaultOn: false },
  { label: 'Notify on recipe conflict', desc: 'Send notification when a recipe parsing job detects rule conflicts.', defaultOn: true },
  { label: 'Enforce TM6 interposer constraints', desc: 'Apply Interposer TM6 compatibility rules across all running rule evaluations.', defaultOn: true },
] as const

function RuleSettingsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-body-lg font-semibold">Rule Settings</h2>
        <Button variant="primary" size="sm" onClick={() => toast({ title: 'Rule settings saved', variant: 'success' })}>
          Save Changes
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {RULES.map((rule) => (
          <div key={rule.label} className="flex items-center gap-4 px-4 py-3 rounded-lg border border-divider bg-surface">
            <div className="flex-1">
              <div className="text-body font-medium">{rule.label}</div>
              <div className="text-caption text-fg-secondary mt-0.5">{rule.desc}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input type="checkbox" defaultChecked={rule.defaultOn} className="sr-only peer" />
              <div className="w-9 h-5 bg-surface-secondary rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-surface after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 after:shadow-sm" />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Configurator Page ──
function ConfiguratorPage() {
  return (
    <div className="px-6 py-5 space-y-5">
      <div className="flex items-center gap-1 text-body text-fg-secondary">
        <span className="hover:text-fg-primary cursor-pointer">Product Master</span>
        <span className="mx-1">/</span>
        <span className="hover:text-fg-primary cursor-pointer">Configurator</span>
        <span className="mx-1">/</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-h3 font-semibold">U337</h1>
        <Button variant="secondary" size="md" startIcon={Layers}
          onClick={() => toast({ title: 'Mass Part Creation dialog opened' })}>
          Mass Part Creation
        </Button>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList size="lg">
          <TabsTrigger value="dashboard" badge={<Badge count={99} max={99} variant="high" />}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="recipe-parsing">Recipe Parsing</TabsTrigger>
          <TabsTrigger value="traceability">Traceability</TabsTrigger>
          <TabsTrigger value="rule-settings">Rule Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6"><DashboardTab /></TabsContent>
        <TabsContent value="recipe-parsing" className="mt-6"><RecipeTab /></TabsContent>
        <TabsContent value="traceability" className="mt-6"><TraceabilityTab /></TabsContent>
        <TabsContent value="rule-settings" className="mt-6"><RuleSettingsTab /></TabsContent>
      </Tabs>
    </div>
  )
}

// ── Root ──
export default function App() {
  const [activeId, setActiveId] = useState<string>('configurator')
  return (
    <TooltipProvider delayDuration={500} skipDelayDuration={300}>
      <SidebarProvider activeId={activeId} onActiveChange={setActiveId}>
        <AppShell
          layout="primary-sidebar"
          sidebar={<AppSidebar activeId={activeId} onActiveChange={setActiveId} />}
          header={<TopHeader />}
        >
          <ConfiguratorPage />
        </AppShell>
      </SidebarProvider>
      <Toaster />
    </TooltipProvider>
  )
}
