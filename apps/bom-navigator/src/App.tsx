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
  X,
  ChevronLeft,
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

// ── Rule Settings Tab — split-pane table + inline edit panel ──
type RuleRecord = {
  id: string
  partNumber: string
  ataChapter: string
  level: string
  configBy: string
  configType: string
  specItem: string
  specValue: string
  lastModified: string
}

const RULE_RECORDS: RuleRecord[] = [
  { id: '1', partNumber: '53-11-00-001', ataChapter: 'ATA53', level: 'L1', configBy: 'JAKE-T', configType: 'LSI', specItem: 'FWD-SECT', specValue: 'REV.C-APPROVED, AMS4173, OEM-REF-A321-53-10', lastModified: '2026-06-10 at 09:32' },
  { id: '2', partNumber: '57-10-00-001', ataChapter: 'ATA57', level: 'L1', configBy: 'SARAH-L', configType: 'LSI', specItem: 'WB-CTR', specValue: 'REV.B-REVIEW, AMS4050, OEM-REF-A321-57-10', lastModified: '2026-06-08 at 14:15' },
  { id: '3', partNumber: '32-10-11-001', ataChapter: 'ATA32', level: 'L2', configBy: 'MIKE-C', configType: 'MLG', specItem: 'MLG-LH', specValue: 'REV.D-APPROVED, AMS6415, OEM-REF-A321-32-11', lastModified: '2026-06-01 at 16:48' },
  { id: '4', partNumber: '32-10-12-001', ataChapter: 'ATA32', level: 'L2', configBy: 'SARAH-L', configType: 'MLG', specItem: 'MLG-RH', specValue: 'REV.D-APPROVED, AMS6415, OEM-REF-A321-32-12', lastModified: '2026-06-01 at 16:48' },
  { id: '5', partNumber: '27-10-00-001', ataChapter: 'ATA27', level: 'L1', configBy: 'JAKE-T', configType: 'AIL', specItem: 'AIL-LH', specValue: 'REV.B-PENDING, AMS4143, OEM-REF-A321-27-10', lastModified: '2026-06-05 at 11:20' },
]

function RuleSettingsTab() {
  const [selected, setSelected] = useState<RuleRecord | null>(null)
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())
  const [ataFilter, setAtaFilter] = useState('')
  const [pnFilter, setPnFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const filtered = RULE_RECORDS.filter((r) =>
    (!ataFilter || r.ataChapter.toLowerCase().includes(ataFilter.toLowerCase())) &&
    (!pnFilter || r.partNumber.includes(pnFilter)) &&
    (!typeFilter || r.configType.toLowerCase().includes(typeFilter.toLowerCase()))
  )

  const allChecked = filtered.length > 0 && filtered.every((r) => checkedIds.has(r.id))
  const toggleAll = () =>
    setCheckedIds(allChecked ? new Set() : new Set(filtered.map((r) => r.id)))
  const toggleCheck = (id: string) =>
    setCheckedIds((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const FORM_FIELDS: { label: string; type: 'select' | 'input'; options?: string[]; value: string }[] = selected ? [
    { label: '*ATA Chapter', type: 'select', options: ['ATA21 — Air Conditioning', 'ATA27 — Flight Controls', 'ATA32 — Landing Gear', 'ATA49 — APU', 'ATA53 — Fuselage', 'ATA57 — Wings'], value: selected.ataChapter },
    { label: '*Level', type: 'select', options: ['L1', 'L2', 'L3'], value: selected.level },
    { label: '*Config By', type: 'select', options: ['JAKE-T', 'SARAH-L', 'MIKE-C', 'SYSTEM'], value: selected.configBy },
    { label: '*Config Type', type: 'select', options: ['LSI', 'MLG', 'AIL', 'APU', 'ACM'], value: selected.configType },
    { label: '*Spec Item', type: 'select', options: ['FWD-SECT', 'WB-CTR', 'MLG-LH', 'MLG-RH', 'AIL-LH', 'AIL-RH'], value: selected.specItem },
    { label: '*Spec Value', type: 'input', value: selected.specValue.split(',')[0] },
  ] : []

  return (
    <div className="flex flex-col border border-divider" style={{ height: 'calc(100vh - 256px)', minHeight: '500px' }}>

      {/* ── Filter bar: white bg matching table, label-above pattern, icon-only search ── */}
      <div className="flex items-end gap-3 px-4 pt-3 pb-0 bg-surface border-b border-divider shrink-0">
        {[
          { label: 'ATA Chapter', value: ataFilter, onChange: setAtaFilter, placeholder: 'e.g. ATA32' },
          { label: 'Part Number', value: pnFilter, onChange: setPnFilter, placeholder: 'e.g. 32-10-11' },
          { label: 'Config Type', value: typeFilter, onChange: setTypeFilter, placeholder: 'e.g. LSI' },
        ].map(({ label, value, onChange, placeholder }) => (
          <div key={label} className="flex flex-col gap-1 flex-1 pb-3">
            <label className="text-caption text-fg-secondary font-medium">{label}</label>
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="h-8 px-2.5 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary text-sm"
            />
          </div>
        ))}
        {/* icon-only search button (lucide Search icon) */}
        <div className="pb-3 shrink-0">
          <button
            onClick={() => { setAtaFilter(''); setPnFilter(''); setTypeFilter('') }}
            className="h-8 w-8 flex items-center justify-center rounded-md bg-primary text-surface hover:bg-primary/90 transition-colors"
            title="Search"
          >
            <Search size={14} />
          </button>
        </div>
      </div>

      {/* ── Main split: table left + right panel — flex-1 fills remaining height ── */}
      <div className="flex flex-1 min-h-0">

        {/* ── Table column ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Scrollable table body */}
          <div className="flex-1 overflow-y-auto overflow-x-auto">
            <table className="w-full text-body border-collapse">
              <thead>
                <tr className="bg-surface-secondary border-b border-divider sticky top-0 z-10">
                  <th className="w-10 px-3 py-3">
                    <input type="checkbox" checked={allChecked} onChange={toggleAll}
                      className="w-4 h-4 rounded border-divider accent-primary cursor-pointer" />
                  </th>
                  {['Part Number', 'ATA', 'Level', 'Config By', 'Type', 'Spec Item', 'Spec Value', 'Last Modified', ''].map((h) => (
                    <th key={h} className="px-3 py-3 text-left text-caption text-fg-secondary font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-divider hover:bg-surface-hover ${selected?.id === row.id ? 'bg-primary/5' : ''}`}
                  >
                    <td className="w-10 px-3 py-3">
                      <input type="checkbox" checked={checkedIds.has(row.id)} onChange={() => toggleCheck(row.id)}
                        className="w-4 h-4 rounded border-divider accent-primary cursor-pointer" />
                    </td>
                    <td className="px-3 py-3 font-mono text-caption font-semibold whitespace-nowrap">{row.partNumber}</td>
                    <td className="px-3 py-3 text-fg-secondary whitespace-nowrap">{row.ataChapter}</td>
                    <td className="px-3 py-3 text-fg-secondary">{row.level}</td>
                    <td className="px-3 py-3 font-mono text-caption text-fg-secondary">{row.configBy}</td>
                    <td className="px-3 py-3 text-fg-secondary">{row.configType}</td>
                    <td className="px-3 py-3 font-mono text-caption">{row.specItem}</td>
                    <td className="px-3 py-3 text-fg-secondary text-caption max-w-[200px] truncate">{row.specValue}</td>
                    <td className="px-3 py-3 text-fg-secondary text-caption whitespace-nowrap">{row.lastModified}</td>
                    <td className="px-3 py-2 text-center">
                      {/* lucide Info icon (from gwyzzenn/lucide source) */}
                      <button
                        onClick={() => setSelected(selected?.id === row.id ? null : row)}
                        className={`p-1.5 rounded-md hover:bg-surface-hover transition-colors ${selected?.id === row.id ? 'text-primary' : 'text-fg-tertiary hover:text-fg-secondary'}`}
                        title="View / edit"
                      >
                        <Info size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-16 text-center text-fg-tertiary text-body">
                      No rule records match the current filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination pinned at bottom — border-t is naturally full-width (no px on container) ── */}
          <div className="shrink-0 border-t border-divider bg-surface flex items-center px-4 py-2 gap-4">
            <span className="text-caption text-fg-secondary flex-1">1 – {filtered.length} of {RULE_RECORDS.length}</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-7 h-7 rounded text-caption font-medium transition-colors ${p === 1 ? 'bg-primary text-surface' : 'hover:bg-surface-hover text-fg-secondary'}`}
                >
                  {p}
                </button>
              ))}
              {/* lucide ChevronLeft / ChevronRight for pagination arrows */}
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-hover text-fg-secondary">
                <ChevronLeft size={14} />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-hover text-fg-secondary">
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-caption text-fg-secondary">Items per Page</span>
              <select className="h-7 px-2 rounded-md border border-divider bg-surface text-caption outline-none">
                <option>20</option><option>50</option><option>100</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Right edit panel ── */}
        {selected && (
          <div className="w-[320px] shrink-0 border-l border-divider flex flex-col bg-surface">

            {/* Panel header — border-b spans full panel width (no px on the border element itself) */}
            <div className="shrink-0 border-b border-divider flex items-start justify-between px-4 py-4">
              <div>
                <div className="text-caption text-fg-secondary">Part Number</div>
                <div className="text-body-lg font-semibold font-mono mt-0.5">{selected.partNumber}</div>
              </div>
              {/* lucide X icon for close */}
              <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-surface-hover text-fg-tertiary mt-0.5">
                <X size={16} />
              </button>
            </div>

            {/* Form body — NO horizontal padding on this container so dividers are naturally full-width */}
            <div className="flex-1 overflow-y-auto flex flex-col">
              {FORM_FIELDS.map(({ label, type, options, value }, idx) => (
                <div key={label}>
                  {/* Field content: px-4 only inside the field block, NOT on the container */}
                  <div className="px-4 py-3 flex flex-col gap-1.5">
                    <label className="text-caption text-fg-secondary font-medium">{label}</label>
                    {type === 'select' ? (
                      <select
                        defaultValue={value}
                        className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary"
                      >
                        {(options ?? []).map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        defaultValue={value}
                        className="h-9 px-3 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary"
                      />
                    )}
                  </div>
                  {/* Divider between fields: no mx — naturally fills 100% of parent width */}
                  {idx < FORM_FIELDS.length - 1 && (
                    <div className="border-t border-divider" />
                  )}
                </div>
              ))}

              {/* Delete link */}
              <div className="px-4 py-4">
                <button
                  onClick={() => toast({ title: `Rule record ${selected.partNumber} deleted`, variant: 'error' })}
                  className="text-destructive text-body font-medium hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Footer — border-t spans full panel width */}
            <div className="shrink-0 border-t border-divider flex items-center justify-end gap-2 px-4 py-3">
              <Button variant="secondary" onClick={() => setSelected(null)}>Discard</Button>
              <Button variant="primary" onClick={() => toast({ title: `Rule config for ${selected.partNumber} submitted`, variant: 'success' })}>
                Submit Change
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


// ── A321(neo) Batch Entry / Mass Part Creation ──
type BatchPart = {
  id: string
  serial: string
  msn: string
  manufacturer: string
  component: string
  airworthiness: string
  ataPart: string
  ataChapter: string
  expandable?: boolean
}

const BATCH_PARTS: BatchPart[] = [
  { id: '1', serial: 'A321NEO-53-FWD-SN001-ATA53-REV.C-CFM-LEAP1A', msn: 'MSN-7834', manufacturer: 'AIRBUS', component: 'Fuselage Fwd Section', airworthiness: 'Active', ataPart: '53-11-00-001', ataChapter: 'ATA53', expandable: true },
  { id: '2', serial: 'A321NEO-57-WB-SN002-ATA57-REV.B-AIRBUS-CTR', msn: 'MSN-7834', manufacturer: 'AIRBUS', component: 'Wing Box Center Section', airworthiness: 'Active', ataPart: '57-10-00-001', ataChapter: 'ATA57', expandable: true },
  { id: '3', serial: 'A321NEO-32-MLG-SN003-ATA32-REV.D-SAFRAN-LH', msn: 'MSN-7835', manufacturer: 'SAFRAN', component: 'MLG Assembly — LH', airworthiness: 'Active', ataPart: '32-10-11-001', ataChapter: 'ATA32' },
  { id: '4', serial: 'A321NEO-32-MLG-SN004-ATA32-REV.D-SAFRAN-RH', msn: 'MSN-7835', manufacturer: 'SAFRAN', component: 'MLG Assembly — RH', airworthiness: 'Active', ataPart: '32-10-12-001', ataChapter: 'ATA32' },
  { id: '5', serial: 'A321NEO-27-AIL-SN005-ATA27-REV.B-AIRBUS-LH', msn: 'MSN-7836', manufacturer: 'AIRBUS', component: 'Aileron Assembly — LH', airworthiness: 'Active', ataPart: '27-10-00-001', ataChapter: 'ATA27', expandable: true },
  { id: '6', serial: 'A321NEO-27-AIL-SN006-ATA27-REV.B-AIRBUS-RH', msn: 'MSN-7836', manufacturer: 'AIRBUS', component: 'Aileron Assembly — RH', airworthiness: 'Active', ataPart: '27-10-00-002', ataChapter: 'ATA27' },
  { id: '7', serial: 'A321NEO-49-APU-SN007-ATA49-REV.A-HONEYWELL-131', msn: 'MSN-7837', manufacturer: 'HONEYWELL', component: 'APU APS3200 Assembly', airworthiness: 'Superseded', ataPart: '49-00-00-001', ataChapter: 'ATA49' },
  { id: '8', serial: 'A321NEO-21-ACM-SN008-ATA21-REV.C-HONEYWELL-TU', msn: 'MSN-7837', manufacturer: 'HONEYWELL', component: 'Air Cycle Machine Assembly', airworthiness: 'Active', ataPart: '21-20-00-001', ataChapter: 'ATA21' },
  { id: '9', serial: 'A321NEO-28-FUEL-SN009-ATA28-REV.A-AIRBUS-CTR', msn: 'MSN-7834', manufacturer: 'AIRBUS', component: 'Fuel Tank Center Section', airworthiness: 'Active', ataPart: '28-20-00-001', ataChapter: 'ATA28' },
  { id: '10', serial: 'A321NEO-36-BLEED-SN010-ATA36-REV.B-CFM-HP', msn: 'MSN-7835', manufacturer: 'CFM', component: 'Bleed Air High-Pressure Valve', airworthiness: 'Active', ataPart: '36-11-00-001', ataChapter: 'ATA36', expandable: true },
]

function BatchEntryPage({ onBack }: { onBack: () => void }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [ataFilter, setAtaFilter] = useState('')
  const [msnFilter, setMsnFilter] = useState('')
  const [mfrFilter, setMfrFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>(['Active'])
  const [filterTab, setFilterTab] = useState<'WF' | 'BP' | 'AS'>('BP')
  const [filterKeyword, setFilterKeyword] = useState('')
  const [showFilter, setShowFilter] = useState(true)
  const [filterAta, setFilterAta] = useState<Set<string>>(new Set(['ATA53', 'ATA57', 'ATA32']))
  const [filterStatus, setFilterStatus] = useState<Set<string>>(new Set(['Active']))

  const filtered = BATCH_PARTS.filter((p) => {
    if (ataFilter && !p.ataChapter.toLowerCase().includes(ataFilter.toLowerCase())) return false
    if (msnFilter && !p.msn.toLowerCase().includes(msnFilter.toLowerCase())) return false
    if (mfrFilter && !p.manufacturer.toLowerCase().includes(mfrFilter.toLowerCase())) return false
    if (statusFilter.length > 0 && !statusFilter.includes(p.airworthiness)) return false
    if (filterKeyword && !p.serial.toLowerCase().includes(filterKeyword.toLowerCase()) && !p.component.toLowerCase().includes(filterKeyword.toLowerCase())) return false
    if (filterAta.size > 0 && !filterAta.has(p.ataChapter)) return false
    return true
  })

  const allChecked = filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id))
  const toggleAll = () => setSelectedIds(allChecked ? new Set() : new Set(filtered.map((p) => p.id)))
  const toggleId = (id: string) => setSelectedIds((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  const toggleExpand = (id: string) => setExpandedIds((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  const toggleStatusChip = (s: string) => setStatusFilter((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  const toggleFilterAta = (ata: string) => setFilterAta((prev) => { const s = new Set(prev); s.has(ata) ? s.delete(ata) : s.add(ata); return s })

  return (
    <div className="flex flex-col" style={{ height: '100%' }}>
      {/* ── Page header ── */}
      <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-divider bg-surface">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-md hover:bg-surface-hover text-fg-secondary">
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 className="text-h3 font-semibold">BOM Navigator | Mass Part Creation</h1>
            <p className="text-caption text-fg-secondary">{AIRCRAFT_TYPE} &middot; {AIRCRAFT_MSN} &middot; Airbus A321(neo) Parts</p>
          </div>
        </div>
        <Button variant="secondary" size="md" onClick={() => toast({ title: 'Opening creation list...' })}>
          Creation list
        </Button>
      </div>

      {/* ── Filter bar ── */}
      <div className="shrink-0 px-6 py-3 border-b border-divider bg-surface-secondary flex items-end gap-3 flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-caption text-fg-secondary font-medium">Task Type</label>
          <select
            className="h-8 px-2.5 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary text-sm"
            defaultValue="general-add"
          >
            <option value="general-add">General - Add</option>
            <option value="general-remove">General - Remove</option>
            <option value="engineering-order">Engineering Order</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-caption text-fg-secondary font-medium">ATA Chapter</label>
          <input
            value={ataFilter}
            onChange={(e) => setAtaFilter(e.target.value)}
            placeholder="e.g. ATA53"
            className="h-8 px-2.5 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary text-sm w-28"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-caption text-fg-secondary font-medium">MSN</label>
          <input
            value={msnFilter}
            onChange={(e) => setMsnFilter(e.target.value)}
            placeholder="e.g. MSN-7834"
            className="h-8 px-2.5 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary text-sm w-28"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-caption text-fg-secondary font-medium">Manufacturer</label>
          <input
            value={mfrFilter}
            onChange={(e) => setMfrFilter(e.target.value)}
            placeholder="e.g. CFM"
            className="h-8 px-2.5 rounded-md border border-divider bg-surface text-body outline-none focus:border-primary text-sm w-28"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-caption text-fg-secondary font-medium">Airworthiness Status</label>
          <div className="flex gap-1.5">
            {['Active', 'Superseded', 'Inactive'].map((s) => (
              <button
                key={s}
                onClick={() => toggleStatusChip(s)}
                className={"h-8 px-3 rounded-full text-caption font-medium border transition-colors " + (statusFilter.includes(s) ? 'bg-primary text-surface border-primary' : 'bg-surface text-fg-secondary border-divider hover:bg-surface-hover')}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 ml-auto">
          <label className="text-caption text-fg-secondary font-medium invisible">Query</label>
          <Button variant="primary" size="sm" onClick={() => toast({ title: 'Query executed — ' + filtered.length + ' results', variant: 'success' })}>
            Query
          </Button>
        </div>
      </div>

      {/* ── Main content: table + filter panel ── */}
      <div className="flex flex-1 min-h-0">

        {/* ── Matching result table ── */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-divider bg-surface">
            <span className="text-body font-medium">Matching Result</span>
            <span className="text-caption text-fg-secondary">{filtered.length} records</span>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-body border-collapse">
              <thead>
                <tr className="bg-surface-secondary border-b border-divider sticky top-0 z-10">
                  <th className="w-8 px-3 py-3"></th>
                  <th className="w-10 px-3 py-3">
                    <input type="checkbox" checked={allChecked} onChange={toggleAll}
                      className="w-4 h-4 rounded border-divider accent-primary cursor-pointer" />
                  </th>
                  <th className="px-3 py-3 text-left text-caption text-fg-secondary font-medium">Basic Information</th>
                  <th className="px-3 py-3 text-left text-caption text-fg-secondary font-medium whitespace-nowrap">MSN</th>
                  <th className="px-3 py-3 text-left text-caption text-fg-secondary font-medium">Manufacturer</th>
                  <th className="px-3 py-3 text-left text-caption text-fg-secondary font-medium">Component</th>
                  <th className="px-3 py-3 text-left text-caption text-fg-secondary font-medium whitespace-nowrap">Airworthiness</th>
                  <th className="px-3 py-3 text-left text-caption text-fg-secondary font-medium whitespace-nowrap">ATA Part No.</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((part) => (
                  <>
                    <tr
                      key={part.id}
                      className={"border-b border-divider hover:bg-surface-hover " + (selectedIds.has(part.id) ? 'bg-primary/5' : '')}
                    >
                      <td className="w-8 px-2 py-3 text-center">
                        {part.expandable && (
                          <button
                            onClick={() => toggleExpand(part.id)}
                            className="p-0.5 rounded hover:bg-surface-hover text-fg-tertiary"
                          >
                            <ChevronRight size={14} className={"transition-transform " + (expandedIds.has(part.id) ? 'rotate-90' : '')} />
                          </button>
                        )}
                      </td>
                      <td className="w-10 px-3 py-3">
                        <input type="checkbox" checked={selectedIds.has(part.id)} onChange={() => toggleId(part.id)}
                          className="w-4 h-4 rounded border-divider accent-primary cursor-pointer" />
                      </td>
                      <td className="px-3 py-3 font-mono text-caption max-w-[260px]">
                        <span className="block truncate" title={part.serial}>{part.serial}</span>
                      </td>
                      <td className="px-3 py-3 font-mono text-caption whitespace-nowrap">{part.msn}</td>
                      <td className="px-3 py-3 text-fg-secondary whitespace-nowrap">{part.manufacturer}</td>
                      <td className="px-3 py-3 text-fg-secondary">{part.component}</td>
                      <td className="px-3 py-3">
                        <span className={"inline-flex px-2 py-0.5 rounded-full text-caption font-medium border " + (part.airworthiness === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-surface-secondary text-fg-secondary border-divider')}>
                          {part.airworthiness}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-mono text-caption whitespace-nowrap">{part.ataPart}</td>
                    </tr>
                    {expandedIds.has(part.id) && (
                      <tr key={part.id + '-expanded'} className="border-b border-divider bg-surface-secondary/50">
                        <td colSpan={8} className="px-10 py-3">
                          <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-caption">
                            <div><span className="text-fg-tertiary">ATA Chapter: </span><span className="font-mono font-medium">{part.ataChapter}</span></div>
                            <div><span className="text-fg-tertiary">Manufacturer: </span><span>{part.manufacturer}</span></div>
                            <div><span className="text-fg-tertiary">Part Number: </span><span className="font-mono">{part.ataPart}</span></div>
                            <div><span className="text-fg-tertiary">Serial: </span><span className="font-mono">{part.serial.split('-').slice(0, 4).join('-')}</span></div>
                            <div><span className="text-fg-tertiary">Applied MSN: </span><span className="font-mono">{part.msn}</span></div>
                            <div><span className="text-fg-tertiary">Status: </span><span>{part.airworthiness}</span></div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-16 text-center text-fg-tertiary text-body">
                      No parts match the current filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Advanced Filter panel ── */}
        {showFilter && (
          <div className="w-[300px] shrink-0 border-l border-divider flex flex-col bg-surface">
            <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-divider">
              <span className="text-body font-medium">Advanced Filter</span>
              <button onClick={() => setShowFilter(false)} className="p-1 rounded hover:bg-surface-hover text-fg-tertiary">
                <X size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div className="shrink-0 flex border-b border-divider">
              {(['WF', 'BP', 'AS'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={"flex-1 py-2 text-caption font-medium border-b-2 transition-colors " + (filterTab === tab ? 'border-primary text-primary' : 'border-transparent text-fg-secondary hover:text-fg-primary')}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Keyword search */}
            <div className="shrink-0 px-3 py-2.5 border-b border-divider">
              <div className="flex items-center gap-2 rounded-md border border-divider bg-surface px-2.5 h-8">
                <Search size={14} className="text-fg-tertiary shrink-0" />
                <input
                  value={filterKeyword}
                  onChange={(e) => setFilterKeyword(e.target.value)}
                  placeholder="Keyword search..."
                  className="flex-1 bg-transparent text-caption text-fg-primary outline-none placeholder:text-fg-tertiary"
                />
              </div>
            </div>

            {/* Filter groups */}
            <div className="flex-1 overflow-y-auto">
              {/* ATA Chapter group */}
              <div className="border-b border-divider">
                <div className="px-4 py-2.5 flex items-center justify-between">
                  <span className="text-caption font-medium text-fg-primary">ATA Chapter</span>
                  <ChevronRight size={14} className="text-fg-tertiary" />
                </div>
                <div className="px-4 pb-3 flex flex-col gap-2">
                  {['ATA21', 'ATA27', 'ATA28', 'ATA32', 'ATA36', 'ATA49', 'ATA53', 'ATA57'].map((ata) => (
                    <label key={ata} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filterAta.has(ata)} onChange={() => toggleFilterAta(ata)}
                        className="w-4 h-4 rounded border-divider accent-primary" />
                      <span className="text-caption text-fg-secondary font-mono">{ata}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Airworthiness group */}
              <div className="border-b border-divider">
                <div className="px-4 py-2.5 flex items-center justify-between">
                  <span className="text-caption font-medium text-fg-primary">Airworthiness Status</span>
                  <ChevronRight size={14} className="text-fg-tertiary" />
                </div>
                <div className="px-4 pb-3 flex flex-col gap-2">
                  {['Active', 'Superseded', 'Inactive'].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filterStatus.has(s)} onChange={() => setFilterStatus((prev) => { const ns = new Set(prev); ns.has(s) ? ns.delete(s) : ns.add(s); return ns })}
                        className="w-4 h-4 rounded border-divider accent-primary" />
                      <span className="text-caption text-fg-secondary">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Manufacturer group */}
              <div>
                <div className="px-4 py-2.5 flex items-center justify-between">
                  <span className="text-caption font-medium text-fg-primary">Manufacturer</span>
                  <ChevronRight size={14} className="text-fg-tertiary" />
                </div>
                <div className="px-4 pb-3 flex flex-col gap-2">
                  {['AIRBUS', 'CFM', 'HONEYWELL', 'SAFRAN'].map((m) => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked
                        className="w-4 h-4 rounded border-divider accent-primary" />
                      <span className="text-caption text-fg-secondary">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter footer */}
            <div className="shrink-0 border-t border-divider flex items-center gap-2 px-4 py-3">
              <Button variant="secondary" className="flex-1" onClick={() => { setFilterAta(new Set()); setFilterStatus(new Set()); setFilterKeyword('') }}>
                Reset
              </Button>
              <Button variant="primary" className="flex-1" onClick={() => toast({ title: 'Filter applied — ' + filtered.length + ' results', variant: 'success' })}>
                Apply Filter
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom action bar ── */}
      <div className="shrink-0 border-t border-divider bg-surface flex items-center justify-between px-6 py-3">
        <span className="text-body text-fg-secondary">
          Select <span className="font-semibold text-fg-primary">{selectedIds.size}</span> item{selectedIds.size !== 1 ? 's' : ''}
        </span>
        <Button
          variant="primary"
          disabled={selectedIds.size === 0}
          onClick={() => toast({ title: selectedIds.size + ' part(s) added to creation list', variant: 'success' })}
        >
          Add to list
        </Button>
      </div>
    </div>
  )
}

// ── Configurator Page ──
function ConfiguratorPage({ onBatchEntry }: { onBatchEntry: () => void }) {
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
          onClick={onBatchEntry}>
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
  const [showBatchEntry, setShowBatchEntry] = useState(false)
  return (
    <TooltipProvider delayDuration={500} skipDelayDuration={300}>
      <SidebarProvider activeId={activeId} onActiveChange={setActiveId}>
        <AppShell
          layout="primary-sidebar"
          sidebar={<AppSidebar activeId={activeId} onActiveChange={setActiveId} />}
          header={<TopHeader />}
        >
          {showBatchEntry
            ? <BatchEntryPage onBack={() => setShowBatchEntry(false)} />
            : <ConfiguratorPage onBatchEntry={() => setShowBatchEntry(true)} />}
        </AppShell>
      </SidebarProvider>
      <Toaster />
    </TooltipProvider>
  )
}
