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
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
  SheetFooter,
  SheetClose,
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
  Plane,
  Wrench,
  Info,
} from 'lucide-react'

// ── Aircraft: A321-200 MSN-7834 ──
const AIRCRAFT_MSN = 'MSN-7834'
const AIRCRAFT_TYPE = 'A321-200'

const TOP_NAV = [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] as const

const COMPONENTS_NAV = [
  { id: 'fleet-registry', label: 'Fleet Registry', icon: Server },
  { id: 'assembly-viewer', label: 'Assembly Viewer', icon: List },
  { id: 'configurator', label: 'Configurator', icon: Settings },
  { id: 'substitutes', label: 'Substitutes', icon: Shuffle },
  { id: 'batch-entry', label: 'Batch Entry', icon: Layers },
] as const

const AIRCRAFT_OWNER_NAV = [
  { id: 'owner-config', label: 'B-18351 Fleet Config', icon: FileText },
] as const

const AIRCRAFT_SPEC_NAV = [
  { id: 'type-cert', label: 'A321-200 Type Certificate', icon: FileText },
  { id: 'engine-config', label: 'CFM56-5B Engine Config', icon: FileText },
] as const

// ATA chapter part codes for A321-200
const RUNNING_PARTS = [
  { code: '32-10-11-001', desc: 'MLG Assembly — LH', ata: 'ATA 32', rev: 'Rev.D', status: 'Active', msn: 'MSN-7834, MSN-7836', engineer: 'Jake Thompson', date: '2026-06-01' },
  { code: '32-10-12-001', desc: 'MLG Assembly — RH', ata: 'ATA 32', rev: 'Rev.D', status: 'Active', msn: 'MSN-7834, MSN-7836', engineer: 'Sarah Lin', date: '2026-06-01' },
  { code: '27-10-00-001', desc: 'Aileron Assembly — LH', ata: 'ATA 27', rev: 'Rev.B', status: 'Pending Review', msn: 'MSN-7834', engineer: 'Mike Chen', date: '2026-06-05' },
  { code: '27-10-00-002', desc: 'Aileron Assembly — RH', ata: 'ATA 27', rev: 'Rev.B', status: 'Pending Review', msn: 'MSN-7834', engineer: 'Mike Chen', date: '2026-06-05' },
  { code: '49-00-00-001', desc: 'APU APS3200 Assembly', ata: 'ATA 49', rev: 'Rev.A', status: 'Superseded', msn: 'MSN-7834', engineer: 'System', date: '2026-05-28' },
  { code: '21-20-00-001', desc: 'Air Cycle Machine Assembly', ata: 'ATA 21', rev: 'Rev.C', status: 'Active', msn: 'MSN-7834, MSN-7835', engineer: 'Jake Thompson', date: '2026-06-08' },
]

type PartRecord = { code: string; desc: string; ata: string; rev: string; status: string; msn: string; engineer: string; date: string }

// ── AppSidebar ──
function AppSidebar({ activeId, onActiveChange }: { activeId: string; onActiveChange: (id: string) => void }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 min-w-0 group-data-[collapsible=icon]:justify-center">
          <Avatar alt="ACM" size={24} shape="square" color="blue" solid />
          <span className="text-body-lg font-semibold truncate group-data-[collapsible=icon]:hidden">
            Aircraft Master
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

        <SidebarSeparator className="mx-0" />

        <SidebarGroup collapsible defaultOpen>
          <SidebarGroupLabel>Aircraft Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {COMPONENTS_NAV.map(({ id, label, icon }) => (
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

        <SidebarSeparator className="mx-0" />

        <SidebarGroup collapsible>
          <SidebarGroupLabel>Aircraft Owner</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {AIRCRAFT_OWNER_NAV.map(({ id, label, icon }) => (
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

        <SidebarSeparator className="mx-0" />

        <SidebarGroup collapsible>
          <SidebarGroupLabel>Aircraft Spec</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {AIRCRAFT_SPEC_NAV.map(({ id, label, icon }) => (
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
  { icon: '⚠️', title: 'Missing part configuration', body: '5 parts in A321 MSN-7834 have missing configuration data.', time: '2h ago' },
  { icon: '📋', title: 'Submit reminder', body: '2 part entries for MSN-7834 are pending engineering approval.', time: '5h ago' },
  { icon: '✅', title: 'Parts analysis completed', body: 'PAJ-20260611-001: 12 rules extracted from 53-11-00-001.', time: 'Yesterday' },
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
            <div className="text-caption text-fg-secondary">jake@airline.com</div>
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
            defaultValue="A321-200"
            placeholder="Search part number, assembly, MSN..."
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

// ── Chip ──
function Chip({ label, color }: { label: string; color: 'green' | 'orange' | 'gray' }) {
  const cls = {
    green: 'bg-green-50 text-green-700 border-green-200',
    orange: 'bg-amber-50 text-amber-700 border-amber-200',
    gray: 'bg-surface-secondary text-fg-secondary border-divider',
  }[color]
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-caption font-medium border ${cls}`}>{label}</span>
}

// ── Simple table ──
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

// ── Edit Dialog (second-level modal) ──
function EditPartDialog({ part, children }: { part: PartRecord; children: ReactElement<any, any> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit — {part.code}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-caption text-fg-secondary font-medium">Part Number</label>
              <input defaultValue={part.code} className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-caption text-fg-secondary font-medium">Description</label>
              <input defaultValue={part.desc} className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-caption text-fg-secondary font-medium">ATA Chapter</label>
              <select defaultValue={part.ata} className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary">
                <option>ATA 21 — Air Conditioning</option>
                <option>ATA 27 — Flight Controls</option>
                <option>ATA 32 — Landing Gear</option>
                <option>ATA 49 — APU</option>
                <option>ATA 53 — Fuselage</option>
                <option>ATA 57 — Wings</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-caption text-fg-secondary font-medium">Status</label>
              <select defaultValue={part.status} className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary">
                <option>Active</option>
                <option>Pending Review</option>
                <option>Inactive</option>
                <option>Superseded</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-caption text-fg-secondary font-medium">Assigned Engineer</label>
              <select defaultValue={part.engineer} className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary">
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
            <Button variant="primary" onClick={() => toast({ title: `Changes saved for ${part.code}`, variant: 'success' })}>
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── Part Detail Panel (first-level Sheet) ──
function PartDetailPanel({ part, children }: { part: PartRecord; children: ReactElement<any, any> }) {
  const statusColor: 'green' | 'orange' | 'gray' =
    part.status === 'Active' ? 'green' : part.status === 'Pending Review' ? 'orange' : 'gray'
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="flex flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-mono">{part.code}</SheetTitle>
        </SheetHeader>
        <SheetBody className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Chip label={part.status} color={statusColor} />
            <span className="text-caption text-fg-tertiary">{part.rev}</span>
          </div>

          <div className="rounded-lg border border-divider divide-y divide-divider">
            {[
              { label: 'Description', value: part.desc },
              { label: 'ATA Chapter', value: part.ata },
              { label: 'Revision', value: part.rev },
              { label: 'Used in MSN', value: part.msn },
              { label: 'Assigned Engineer', value: part.engineer },
              { label: 'Last Modified', value: part.date },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start gap-3 px-4 py-3">
                <span className="text-caption text-fg-secondary w-36 shrink-0 pt-0.5">{label}</span>
                <span className="text-body text-fg-primary">{value}</span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-body font-medium mb-2">Related Work Orders</h3>
            <div className="rounded-lg border border-divider divide-y divide-divider">
              {['WO-2026-0611', 'WO-2026-0608'].map((wo) => (
                <div key={wo} className="flex items-center justify-between px-4 py-2.5">
                  <span className="font-mono text-caption">{wo}</span>
                  <Chip label="In Progress" color="orange" />
                </div>
              ))}
            </div>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Close</Button>
          </SheetClose>
          <EditPartDialog part={part}>
            <Button variant="primary" startIcon={Wrench}>Edit Part</Button>
          </EditPartDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

// ── List Item Row (click = Sheet panel) ──
function ListItemRow({ part }: { part: PartRecord }) {
  return (
    <PartDetailPanel part={part}>
      <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-divider bg-surface cursor-pointer hover:bg-surface-hover hover:shadow-sm transition-all">
        <Info size={14} className="text-fg-tertiary shrink-0" />
        <span className="text-body font-medium font-mono">{part.code}</span>
        <span className="text-fg-tertiary text-body">—</span>
        <span className="text-body text-fg-secondary flex-1 truncate">{part.desc}</span>
        <ChevronRight size={14} className="text-fg-tertiary shrink-0" />
      </div>
    </PartDetailPanel>
  )
}

// ── Stat Card with Dialog (second-level modal) ──
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

// ── Dashboard Tab ──
function DashboardTab() {
  const waitDialog: StatDialogContent = {
    title: 'Pending Approval — 2 Part Entries',
    body: (
      <SimpleTable
        heads={['Part Number', 'Description', 'Submitted', 'Action']}
        rows={[
          <tr key="w1" className="border-b border-divider last:border-0 hover:bg-surface-secondary">
            <td className="px-3 py-2 font-mono text-caption">53-11-00-001</td>
            <td className="px-3 py-2 text-fg-secondary">Fuselage Fwd Section Assy</td>
            <td className="px-3 py-2 text-fg-secondary">2026-06-10</td>
            <td className="px-3 py-2"><Button variant="primary" size="sm" onClick={() => toast({ title: 'Submitting 53-11-00-001...', variant: 'info' })}>Submit</Button></td>
          </tr>,
          <tr key="w2" className="hover:bg-surface-secondary">
            <td className="px-3 py-2 font-mono text-caption">57-10-00-001</td>
            <td className="px-3 py-2 text-fg-secondary">Wing Box Center Section</td>
            <td className="px-3 py-2 text-fg-secondary">2026-06-09</td>
            <td className="px-3 py-2"><Button variant="primary" size="sm" onClick={() => toast({ title: 'Submitting 57-10-00-001...', variant: 'info' })}>Submit</Button></td>
          </tr>,
        ]}
      />
    ),
  }

  const missingDialog: StatDialogContent = {
    title: 'Missing Configuration — 5 Part Numbers',
    body: (
      <SimpleTable
        heads={['Part Number', 'ATA Chapter', 'Missing Field', 'Action']}
        rows={[
          ['32-10-11-001', 'ATA 32', 'Overhaul Interval'],
          ['32-10-12-001', 'ATA 32', 'Overhaul Interval'],
          ['27-10-00-001', 'ATA 27', 'Supplier Code'],
          ['49-00-00-001', 'ATA 49', 'Life Limit (hrs)'],
          ['21-20-00-001', 'ATA 21', 'OEM Reference'],
        ].map(([pn, ata, field]) => (
          <tr key={pn} className="border-b border-divider last:border-0 hover:bg-surface-secondary">
            <td className="px-3 py-2 font-mono text-caption">{pn}</td>
            <td className="px-3 py-2 text-fg-secondary">{ata}</td>
            <td className="px-3 py-2 text-destructive">{field}</td>
            <td className="px-3 py-2"><Button variant="secondary" size="sm" onClick={() => toast({ title: `Editing ${pn}...`, variant: 'info' })}>Fix</Button></td>
          </tr>
        ))}
      />
    ),
  }

  const prodDialog: StatDialogContent = {
    title: 'In Service — 2 Aircraft',
    body: (
      <>
        <p className="text-body text-fg-secondary mb-4">Aircraft currently in active service. Configuration changes require an Engineering Order (EO) review.</p>
        <SimpleTable
          heads={['MSN', 'Reg.', 'Work Order', 'In Service Since', 'Status']}
          rows={[
            <tr key="p1" className="border-b border-divider hover:bg-surface-secondary">
              <td className="px-3 py-2 font-medium font-mono">MSN-7834</td>
              <td className="px-3 py-2">B-18351</td>
              <td className="px-3 py-2 font-mono text-caption">WO-2026-0611</td>
              <td className="px-3 py-2 text-fg-secondary">2026-06-11</td>
              <td className="px-3 py-2"><Chip label="EO Pending" color="orange" /></td>
            </tr>,
            <tr key="p2" className="hover:bg-surface-secondary">
              <td className="px-3 py-2 font-medium font-mono">MSN-7835</td>
              <td className="px-3 py-2">B-18352</td>
              <td className="px-3 py-2 font-mono text-caption">WO-2026-0608</td>
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
          <StatCard title="Pending approval" count={2} subtitle="need to submit" dialog={waitDialog} />
          <StatCard title="Missing configuration" count={5} subtitle="need to handle" dialog={missingDialog} />
          <StatCard
            title="In Service" count={2} subtitle="" dialog={prodDialog}
            badge={<span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-caption font-medium border border-amber-200">EO Pending</span>}
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-body-lg font-semibold">Primary Assemblies</h2>
          <Button variant="link" size="sm" onClick={() => toast({ title: 'Loading full assembly list...' })}>View more</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ListItemRow part={{ code: '53-11-00-001', desc: 'Fuselage Fwd Section Assy', ata: 'ATA 53', rev: 'Rev.C', status: 'Active', msn: 'MSN-7834, MSN-7835', engineer: 'Jake Thompson', date: '2026-06-10' }} />
          <ListItemRow part={{ code: '57-10-00-001', desc: 'Wing Box Center Section', ata: 'ATA 57', rev: 'Rev.B', status: 'Pending Review', msn: 'MSN-7834', engineer: 'Sarah Lin', date: '2026-06-09' }} />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-body-lg font-semibold">Active Part Numbers</h2>
          <Button variant="link" size="sm" onClick={() => toast({ title: 'Loading all active parts...' })}>View more</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {RUNNING_PARTS.map((r, i) => (
            <ListItemRow key={i} part={r} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ── Parts Analysis Tab ──
function PartsAnalysisTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-body-lg font-semibold">Parts Analysis</h2>
        <Button variant="primary" size="sm" onClick={() => toast({ title: `New analysis job started for ${AIRCRAFT_TYPE} ${AIRCRAFT_MSN}`, variant: 'success' })}>
          + New Analysis Job
        </Button>
      </div>
      <SimpleTable
        heads={['Job ID', 'Part Number', 'ATA', 'Started', 'Status', 'Result', 'Action']}
        rows={[
          { id: 'PAJ-20260611-001', pn: '53-11-00-001', ata: 'ATA 53', date: '2026-06-11 09:32', status: <Chip label="Completed" color="green" />, result: '12 rules applied' },
          { id: 'PAJ-20260610-003', pn: '57-10-00-001', ata: 'ATA 57', date: '2026-06-10 14:15', status: <Chip label="Warning" color="orange" />, result: '8 rules, 2 conflicts' },
          { id: 'PAJ-20260609-007', pn: '32-10-11-001', ata: 'ATA 32', date: '2026-06-09 16:48', status: <Chip label="Archived" color="gray" />, result: '10 rules applied' },
        ].map((row) => (
          <tr key={row.id} className="border-b border-divider last:border-0 hover:bg-surface-secondary">
            <td className="px-3 py-2 font-mono text-caption">{row.id}</td>
            <td className="px-3 py-2 font-mono text-caption">{row.pn}</td>
            <td className="px-3 py-2 text-fg-secondary">{row.ata}</td>
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
        <h2 className="text-body-lg font-semibold">Traceability — {AIRCRAFT_TYPE} {AIRCRAFT_MSN}</h2>
        <Button variant="secondary" size="sm" startIcon={Download} onClick={() => toast({ title: 'Exporting traceability report...' })}>
          Export
        </Button>
      </div>
      <SimpleTable
        heads={['Part Number', 'Description', 'ATA', 'Rev.', 'Used In MSN', 'Changed By', 'Date', 'Status']}
        rows={[
          { pn: '53-11-00-001', desc: 'Fuselage Fwd Section', ata: 'ATA 53', rev: 'Rev.C', msn: 'MSN-7834, MSN-7835', by: 'Jake T.', date: '2026-06-10', status: <Chip label="Active" color="green" /> },
          { pn: '57-10-00-001', desc: 'Wing Box Center', ata: 'ATA 57', rev: 'Rev.B', msn: 'MSN-7834', by: 'Sarah L.', date: '2026-06-08', status: <Chip label="Review" color="orange" /> },
          { pn: '32-10-11-001', desc: 'MLG Assy — LH', ata: 'ATA 32', rev: 'Rev.D', msn: 'MSN-7834, MSN-7836, MSN-7837', by: 'System', date: '2026-06-01', status: <Chip label="Active" color="green" /> },
          { pn: '49-00-00-001', desc: 'APU APS3200 Assy', ata: 'ATA 49', rev: 'Rev.A', msn: 'MSN-7834', by: 'Mike C.', date: '2026-05-28', status: <Chip label="Superseded" color="gray" /> },
        ].map((row) => (
          <tr key={row.pn} className="border-b border-divider last:border-0 hover:bg-surface-secondary">
            <td className="px-3 py-2 font-medium font-mono text-caption">{row.pn}</td>
            <td className="px-3 py-2 text-fg-secondary">{row.desc}</td>
            <td className="px-3 py-2 text-fg-secondary">{row.ata}</td>
            <td className="px-3 py-2 text-fg-secondary">{row.rev}</td>
            <td className="px-3 py-2 text-fg-secondary text-caption">{row.msn}</td>
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
  { label: 'Auto-assign on submission', desc: 'Automatically assign an engineer when a part entry is submitted for approval.', defaultOn: true },
  { label: 'Validate on configuration change', desc: 'Run airworthiness validation rules automatically when part configuration changes.', defaultOn: true },
  { label: 'Block release on missing config', desc: 'Prevent airworthiness release when required part fields are incomplete.', defaultOn: false },
  { label: 'Notify on analysis conflict', desc: 'Send notification when a parts analysis job detects rule conflicts.', defaultOn: true },
  { label: 'Enforce ATA chapter compliance', desc: 'Apply ATA chapter-specific compatibility rules across all active part evaluations.', defaultOn: true },
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
        <span className="hover:text-fg-primary cursor-pointer">Aircraft Master</span>
        <span className="mx-1">/</span>
        <span className="hover:text-fg-primary cursor-pointer">Configurator</span>
        <span className="mx-1">/</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Plane size={22} className="text-fg-secondary" />
          <div>
            <h1 className="text-h3 font-semibold">{AIRCRAFT_TYPE}</h1>
            <p className="text-caption text-fg-secondary">{AIRCRAFT_MSN} &middot; Reg. B-18351 &middot; CFM56-5B</p>
          </div>
        </div>
        <Button variant="secondary" size="md" startIcon={Layers}
          onClick={() => toast({ title: 'Batch part entry dialog opened' })}>
          Batch Entry
        </Button>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList size="lg">
          <TabsTrigger value="dashboard" badge={<Badge count={99} max={99} variant="high" />}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="parts-analysis">Parts Analysis</TabsTrigger>
          <TabsTrigger value="traceability">Traceability</TabsTrigger>
          <TabsTrigger value="rule-settings">Rule Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6"><DashboardTab /></TabsContent>
        <TabsContent value="parts-analysis" className="mt-6"><PartsAnalysisTab /></TabsContent>
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
