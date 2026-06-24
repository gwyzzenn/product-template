import { useState, type ReactElement } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import {
  AppShell,
  AppShellAside,
  SidebarProvider,
  Sidebar,
  SidebarContent,
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
  Separator,
  DropdownMenuLabel,
  DataTable,
  Input,
  Select,
  Checkbox,
  Field,
  FieldLabel,
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
  Building2,
  ChevronDown,
  Globe,
  Sun,
  Check,
} from 'lucide-react'

// ── Aircraft: A321-200 MSN-7834 ──
const AIRCRAFT_MSN = 'MSN-7834'
const AIRCRAFT_TYPE = 'A321-200'

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
function AppSidebar({ activeId, onActiveChange, viewportInsetTop }: { activeId: string; onActiveChange: (id: string) => void; viewportInsetTop?: string }) {
  return (
    <Sidebar collapsible="icon" viewportInsetTop={viewportInsetTop}>
      <SidebarContent>
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
              <span className="text-body">{n.icon}</span>
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


// ── Global Header (全寬，橫跨 viewport) ──
function GlobalHeader() {
  return (
    <ChromeHeader
      className="bg-surface"
      leadingRail={<SidebarTrigger />}
    >
      <div className="flex items-center gap-2 pl-0.5">
        <div className="w-[26px] h-[26px] rounded-md bg-primary flex items-center justify-center shrink-0">
          <span className="text-[11px] font-bold text-white tracking-wide">A</span>
        </div>
        <span className="text-body-lg font-bold text-foreground tracking-wide">Aircraft Master</span>
      </div>
      <div className="flex-1 max-w-[480px] mx-4">
        <Input
          startIcon={Search}
          defaultValue="A321-200"
          placeholder="Search part number, assembly, MSN..."
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center gap-1.5 h-8 px-2 rounded-md bg-transparent text-fg-secondary hover:bg-surface-hover text-body font-medium">
            <Building2 size={16} />
            <span>HQ</span>
            <ChevronDown size={14} className="text-fg-tertiary" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>HQ</DropdownMenuItem>
          <DropdownMenuItem>MRO-1</DropdownMenuItem>
          <DropdownMenuItem>MRO-2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
        <AvatarMenu />
      </div>
    </ChromeHeader>
  )
}

// ── Avatar Menu (replaces ProfileMenu in TopHeader) ──
function AvatarMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-0.5 h-8 px-1.5 rounded-md hover:bg-surface-hover">
          <Avatar alt="Jake Thompson" size={24} color="blue" />
          <ChevronDown size={14} className="text-fg-tertiary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2.5 flex items-center gap-2.5">
          <Avatar alt="Jake Thompson" size={36} color="blue" />
          <div>
            <div className="text-body font-medium">Jake Thompson</div>
            <div className="text-caption text-fg-secondary">jake@airline.com</div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem startIcon={Check}>Select Item 1</DropdownMenuItem>
        <DropdownMenuItem startIcon={Check}>Select Item 2</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>個人設定</DropdownMenuLabel>
        <DropdownMenuItem startIcon={Globe}>Language</DropdownMenuItem>
        <DropdownMenuItem startIcon={Building2}>Site</DropdownMenuItem>
        <DropdownMenuItem startIcon={Sun}>Color Theme</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem startIcon={LogOut} className="text-destructive">Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ── Top Chrome Header ──
// ── Chip ──
function Chip({ label, color }: { label: string; color: 'green' | 'orange' | 'gray' }) {
  const cls = {
    green: 'bg-green-50 text-green-700 border-green-200',
    orange: 'bg-amber-50 text-amber-700 border-amber-200',
    gray: 'bg-surface-secondary text-fg-secondary border-divider',
  }[color]
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-caption font-medium border ${cls}`}>{label}</span>
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
            <Field>
              <FieldLabel>Part Number</FieldLabel>
              <Input defaultValue={part.code} />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input defaultValue={part.desc} />
            </Field>
            <Field>
              <FieldLabel>ATA Chapter</FieldLabel>
              <Select
                defaultValue={part.ata}
                options={[
                  { value: 'ATA 21 — Air Conditioning', label: 'ATA 21 — Air Conditioning' },
                  { value: 'ATA 27 — Flight Controls', label: 'ATA 27 — Flight Controls' },
                  { value: 'ATA 32 — Landing Gear', label: 'ATA 32 — Landing Gear' },
                  { value: 'ATA 49 — APU', label: 'ATA 49 — APU' },
                  { value: 'ATA 53 — Fuselage', label: 'ATA 53 — Fuselage' },
                  { value: 'ATA 57 — Wings', label: 'ATA 57 — Wings' },
                ]}
              />
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select
                defaultValue={part.status}
                options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Pending Review', label: 'Pending Review' },
                  { value: 'Inactive', label: 'Inactive' },
                  { value: 'Superseded', label: 'Superseded' },
                ]}
              />
            </Field>
            <Field>
              <FieldLabel>Assigned Engineer</FieldLabel>
              <Select
                defaultValue={part.engineer}
                options={[
                  { value: 'Jake Thompson', label: 'Jake Thompson' },
                  { value: 'Sarah Lin', label: 'Sarah Lin' },
                  { value: 'Mike Chen', label: 'Mike Chen' },
                  { value: '— Unassigned —', label: '— Unassigned —' },
                ]}
              />
            </Field>
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

// ── Part Detail Aside ──
function PartDetailAside({ part, onClose }: { part: PartRecord; onClose: () => void }) {
  const statusColor: 'green' | 'orange' | 'gray' =
    part.status === 'Active' ? 'green' : part.status === 'Pending Review' ? 'orange' : 'gray'
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-5">
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
                <span className="text-caption">{wo}</span>
                <Chip label="In Progress" color="orange" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-divider flex items-center justify-end gap-2 px-4 py-3">
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <EditPartDialog part={part}>
          <Button variant="primary" startIcon={Wrench}>Edit Part</Button>
        </EditPartDialog>
      </div>
    </div>
  )
}

// ── List Item Row ──
function ListItemRow({ part, onSelect }: { part: PartRecord; onSelect: (r: PartRecord) => void }) {
  return (
    <div
      onClick={() => onSelect(part)}
      className="flex items-center gap-2 px-4 py-3 rounded-lg border border-divider bg-surface cursor-pointer hover:bg-surface-hover hover:shadow-sm transition-all"
    >
      <Info size={14} className="text-fg-tertiary shrink-0" />
      <span className="text-body font-medium">{part.code}</span>
      <span className="text-fg-tertiary text-body">—</span>
      <span className="text-body text-fg-secondary flex-1 truncate">{part.desc}</span>
      <ChevronRight size={14} className="text-fg-tertiary shrink-0" />
    </div>
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
type WaitRow = { pn: string; desc: string; submitted: string }
type MissingRow = { pn: string; ata: string; field: string }
type ProdRow = { msn: string; reg: string; wo: string; since: string; status: string; statusColor: 'green' | 'orange' | 'gray' }

function DashboardTab({ onSelect }: { onSelect: (r: PartRecord | null) => void }) {
  const waitData: WaitRow[] = [
    { pn: '53-11-00-001', desc: 'Fuselage Fwd Section Assy', submitted: '2026-06-10' },
    { pn: '57-10-00-001', desc: 'Wing Box Center Section', submitted: '2026-06-09' },
  ]
  const waitColumns: ColumnDef<WaitRow, any>[] = [
    { accessorKey: 'pn', header: 'Part Number' },
    { accessorKey: 'desc', header: 'Description' },
    { accessorKey: 'submitted', header: 'Submitted' },
    {
      id: 'action', header: 'Action',
      cell: (info) => (
        <Button variant="primary" size="sm" onClick={() => toast({ title: `Submitting ${info.row.original.pn}...`, variant: 'info' })}>Submit</Button>
      ),
    },
  ]
  const waitDialog: StatDialogContent = {
    title: 'Pending Approval — 2 Part Entries',
    body: <DataTable columns={waitColumns} data={waitData} height="auto" getRowId={(r) => r.pn} />,
  }

  const missingData: MissingRow[] = [
    { pn: '32-10-11-001', ata: 'ATA 32', field: 'Overhaul Interval' },
    { pn: '32-10-12-001', ata: 'ATA 32', field: 'Overhaul Interval' },
    { pn: '27-10-00-001', ata: 'ATA 27', field: 'Supplier Code' },
    { pn: '49-00-00-001', ata: 'ATA 49', field: 'Life Limit (hrs)' },
    { pn: '21-20-00-001', ata: 'ATA 21', field: 'OEM Reference' },
  ]
  const missingColumns: ColumnDef<MissingRow, any>[] = [
    { accessorKey: 'pn', header: 'Part Number' },
    { accessorKey: 'ata', header: 'ATA Chapter' },
    { accessorKey: 'field', header: 'Missing Field', cell: (info) => <span className="text-destructive">{info.getValue() as string}</span> },
    {
      id: 'action', header: 'Action',
      cell: (info) => (
        <Button variant="secondary" size="sm" onClick={() => toast({ title: `Editing ${info.row.original.pn}...`, variant: 'info' })}>Fix</Button>
      ),
    },
  ]
  const missingDialog: StatDialogContent = {
    title: 'Missing Configuration — 5 Part Numbers',
    body: <DataTable columns={missingColumns} data={missingData} height="auto" getRowId={(r) => r.pn} />,
  }

  const prodData: ProdRow[] = [
    { msn: 'MSN-7834', reg: 'B-18351', wo: 'WO-2026-0611', since: '2026-06-11', status: 'EO Pending', statusColor: 'orange' },
    { msn: 'MSN-7835', reg: 'B-18352', wo: 'WO-2026-0608', since: '2026-06-08', status: 'On Track', statusColor: 'green' },
  ]
  const prodColumns: ColumnDef<ProdRow, any>[] = [
    { accessorKey: 'msn', header: 'MSN', cell: (info) => <span className="font-medium">{info.getValue() as string}</span> },
    { accessorKey: 'reg', header: 'Reg.' },
    { accessorKey: 'wo', header: 'Work Order' },
    { accessorKey: 'since', header: 'In Service Since' },
    { accessorKey: 'status', header: 'Status', cell: (info) => <Chip label={info.getValue() as string} color={info.row.original.statusColor} /> },
  ]
  const prodDialog: StatDialogContent = {
    title: 'In Service — 2 Aircraft',
    body: (
      <>
        <p className="text-body text-fg-secondary mb-4">Aircraft currently in active service. Configuration changes require an Engineering Order (EO) review.</p>
        <DataTable columns={prodColumns} data={prodData} height="auto" getRowId={(r) => r.msn} />
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
          <ListItemRow part={{ code: '53-11-00-001', desc: 'Fuselage Fwd Section Assy', ata: 'ATA 53', rev: 'Rev.C', status: 'Active', msn: 'MSN-7834, MSN-7835', engineer: 'Jake Thompson', date: '2026-06-10' }} onSelect={onSelect} />
          <ListItemRow part={{ code: '57-10-00-001', desc: 'Wing Box Center Section', ata: 'ATA 57', rev: 'Rev.B', status: 'Pending Review', msn: 'MSN-7834', engineer: 'Sarah Lin', date: '2026-06-09' }} onSelect={onSelect} />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-body-lg font-semibold">Active Part Numbers</h2>
          <Button variant="link" size="sm" onClick={() => toast({ title: 'Loading all active parts...' })}>View more</Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {RUNNING_PARTS.map((r, i) => (
            <ListItemRow key={i} part={r} onSelect={onSelect} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ── Parts Analysis Tab ──
type AnalysisRow = { id: string; pn: string; ata: string; date: string; status: string; statusColor: 'green' | 'orange' | 'gray'; result: string }

function PartsAnalysisTab({ onSelect }: { onSelect: (r: AnalysisRow | null) => void }) {
  const data: AnalysisRow[] = [
    { id: 'PAJ-20260611-001', pn: '53-11-00-001', ata: 'ATA 53', date: '2026-06-11 09:32', status: 'Completed', statusColor: 'green', result: '12 rules applied' },
    { id: 'PAJ-20260610-003', pn: '57-10-00-001', ata: 'ATA 57', date: '2026-06-10 14:15', status: 'Warning', statusColor: 'orange', result: '8 rules, 2 conflicts' },
    { id: 'PAJ-20260609-007', pn: '32-10-11-001', ata: 'ATA 32', date: '2026-06-09 16:48', status: 'Archived', statusColor: 'gray', result: '10 rules applied' },
  ]
  const columns: ColumnDef<AnalysisRow, any>[] = [
    { accessorKey: 'id', header: 'Job ID' },
    { accessorKey: 'pn', header: 'Part Number' },
    { accessorKey: 'ata', header: 'ATA' },
    { accessorKey: 'date', header: 'Started' },
    { accessorKey: 'status', header: 'Status', cell: (info) => <Chip label={info.getValue() as string} color={info.row.original.statusColor} /> },
    { accessorKey: 'result', header: 'Result' },
    {
      id: 'action', header: 'Action',
      cell: (info) => <Button variant="secondary" size="sm" onClick={() => onSelect(info.row.original)}>View</Button>,
    },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-body-lg font-semibold">Parts Analysis</h2>
        <Button variant="primary" size="sm" onClick={() => toast({ title: `New analysis job started for ${AIRCRAFT_TYPE} ${AIRCRAFT_MSN}`, variant: 'success' })}>
          + New Analysis Job
        </Button>
      </div>
      <DataTable columns={columns} data={data} height="auto" getRowId={(r) => r.id} />
    </div>
  )
}

// ── Traceability Tab ──
type TraceRow = { pn: string; desc: string; ata: string; rev: string; msn: string; by: string; date: string; status: string; statusColor: 'green' | 'orange' | 'gray' }

function TraceabilityTab({ onSelect }: { onSelect: (r: TraceRow | null) => void }) {
  const data: TraceRow[] = [
    { pn: '53-11-00-001', desc: 'Fuselage Fwd Section', ata: 'ATA 53', rev: 'Rev.C', msn: 'MSN-7834, MSN-7835', by: 'Jake T.', date: '2026-06-10', status: 'Active', statusColor: 'green' },
    { pn: '57-10-00-001', desc: 'Wing Box Center', ata: 'ATA 57', rev: 'Rev.B', msn: 'MSN-7834', by: 'Sarah L.', date: '2026-06-08', status: 'Review', statusColor: 'orange' },
    { pn: '32-10-11-001', desc: 'MLG Assy — LH', ata: 'ATA 32', rev: 'Rev.D', msn: 'MSN-7834, MSN-7836, MSN-7837', by: 'System', date: '2026-06-01', status: 'Active', statusColor: 'green' },
    { pn: '49-00-00-001', desc: 'APU APS3200 Assy', ata: 'ATA 49', rev: 'Rev.A', msn: 'MSN-7834', by: 'Mike C.', date: '2026-05-28', status: 'Superseded', statusColor: 'gray' },
  ]
  const columns: ColumnDef<TraceRow, any>[] = [
    { accessorKey: 'pn', header: 'Part Number', cell: (info) => <span className="font-medium">{info.getValue() as string}</span> },
    { accessorKey: 'desc', header: 'Description' },
    { accessorKey: 'ata', header: 'ATA' },
    { accessorKey: 'rev', header: 'Rev.' },
    { accessorKey: 'msn', header: 'Used In MSN' },
    { accessorKey: 'by', header: 'Changed By' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status', cell: (info) => <Chip label={info.getValue() as string} color={info.row.original.statusColor} /> },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-body-lg font-semibold">Traceability — {AIRCRAFT_TYPE} {AIRCRAFT_MSN}</h2>
        <Button variant="secondary" size="sm" startIcon={Download} onClick={() => toast({ title: 'Exporting traceability report...' })}>
          Export
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        height="auto"
        getRowId={(r) => r.pn}
        rowActions={(row) => (
          <Button iconOnly startIcon={Info} size="sm" variant="text" aria-label="View details" onClick={() => onSelect(row)} />
        )}
      />
    </div>
  )
}

// ── Analysis Detail Aside ──
function AnalysisDetailAside({ record, onClose }: { record: AnalysisRow; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="rounded-lg border border-divider divide-y divide-divider mx-4 mt-4">
          {[
            { label: 'Part Number', value: record.pn },
            { label: 'ATA Chapter', value: record.ata },
            { label: 'Started', value: record.date },
            { label: 'Result', value: record.result },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start gap-3 px-4 py-3">
              <span className="text-caption text-fg-secondary w-36 shrink-0 pt-0.5">{label}</span>
              <span className="text-body text-fg-primary">{value}</span>
            </div>
          ))}
          <div className="flex items-start gap-3 px-4 py-3">
            <span className="text-caption text-fg-secondary w-36 shrink-0 pt-0.5">Status</span>
            <Chip label={record.status} color={record.statusColor} />
          </div>
        </div>
      </div>
      <div className="border-t border-divider flex items-center justify-end gap-2 px-4 py-3">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}

// ── Trace Detail Aside ──
function TraceDetailAside({ record, onClose }: { record: TraceRow; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="rounded-lg border border-divider divide-y divide-divider mx-4 mt-4">
          {[
            { label: 'Description', value: record.desc },
            { label: 'ATA Chapter', value: record.ata },
            { label: 'Revision', value: record.rev },
            { label: 'Used in MSN', value: record.msn },
            { label: 'Changed By', value: record.by },
            { label: 'Date', value: record.date },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start gap-3 px-4 py-3">
              <span className="text-caption text-fg-secondary w-36 shrink-0 pt-0.5">{label}</span>
              <span className="text-body text-fg-primary">{value}</span>
            </div>
          ))}
          <div className="flex items-start gap-3 px-4 py-3">
            <span className="text-caption text-fg-secondary w-36 shrink-0 pt-0.5">Status</span>
            <Chip label={record.status} color={record.statusColor} />
          </div>
        </div>
      </div>
      <div className="border-t border-divider flex items-center justify-end gap-2 px-4 py-3">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
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

function buildFormFields(r: RuleRecord): { label: string; type: 'select' | 'input'; options?: string[]; value: string }[] {
  return [
    { label: '*ATA Chapter', type: 'select', options: ['ATA21 — Air Conditioning', 'ATA27 — Flight Controls', 'ATA32 — Landing Gear', 'ATA49 — APU', 'ATA53 — Fuselage', 'ATA57 — Wings'], value: r.ataChapter },
    { label: '*Level', type: 'select', options: ['L1', 'L2', 'L3'], value: r.level },
    { label: '*Config By', type: 'select', options: ['JAKE-T', 'SARAH-L', 'MIKE-C', 'SYSTEM'], value: r.configBy },
    { label: '*Config Type', type: 'select', options: ['LSI', 'MLG', 'AIL', 'APU', 'ACM'], value: r.configType },
    { label: '*Spec Item', type: 'select', options: ['FWD-SECT', 'WB-CTR', 'MLG-LH', 'MLG-RH', 'AIL-LH', 'AIL-RH'], value: r.specItem },
    { label: '*Spec Value', type: 'input', value: r.specValue.split(',')[0] },
  ]
}

function RuleDetailPanel({ selected, onClose }: { selected: RuleRecord; onClose: () => void }) {
  const FORM_FIELDS = buildFormFields(selected)
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {FORM_FIELDS.map(({ label, type, options, value }, idx) => (
          <div key={label}>
            <div className="px-4 py-3">
              <Field>
                <FieldLabel>{label}</FieldLabel>
                {type === 'select' ? (
                  <Select
                    defaultValue={value}
                    options={(options ?? []).map((o) => ({ value: o, label: o }))}
                  />
                ) : (
                  <Input defaultValue={value} />
                )}
              </Field>
            </div>
            {idx < FORM_FIELDS.length - 1 && <div className="border-t border-divider" />}
          </div>
        ))}
        <div className="px-4 py-4">
          <button
            onClick={() => toast({ title: `Rule record ${selected.partNumber} deleted`, variant: 'error' })}
            className="text-destructive text-body font-medium hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="border-t border-divider flex items-center justify-end gap-2 px-4 py-3">
        <Button variant="secondary" onClick={onClose}>Discard</Button>
        <Button variant="primary" onClick={() => toast({ title: `Rule config for ${selected.partNumber} submitted`, variant: 'success' })}>
          Submit Change
        </Button>
      </div>
    </div>
  )
}

function RuleSettingsTab({ onSelect }: { onSelect: (r: RuleRecord | null) => void }) {
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [ataFilter, setAtaFilter] = useState('')
  const [pnFilter, setPnFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const filtered = RULE_RECORDS.filter((r) =>
    (!ataFilter || r.ataChapter.toLowerCase().includes(ataFilter.toLowerCase())) &&
    (!pnFilter || r.partNumber.includes(pnFilter)) &&
    (!typeFilter || r.configType.toLowerCase().includes(typeFilter.toLowerCase()))
  )

  const columns: ColumnDef<RuleRecord, any>[] = [
    { accessorKey: 'partNumber', header: 'Part Number', cell: (info) => <span className="font-semibold">{info.getValue() as string}</span>, meta: { width: 130 } },
    { accessorKey: 'ataChapter', header: 'ATA', cell: (info) => <span className="text-fg-secondary">{info.getValue() as string}</span> },
    { accessorKey: 'level', header: 'Level', cell: (info) => <span className="text-fg-secondary">{info.getValue() as string}</span> },
    { accessorKey: 'configBy', header: 'Config By', cell: (info) => <span className="text-fg-secondary">{info.getValue() as string}</span> },
    { accessorKey: 'configType', header: 'Type', cell: (info) => <span className="text-fg-secondary">{info.getValue() as string}</span> },
    { accessorKey: 'specItem', header: 'Spec Item' },
    { accessorKey: 'specValue', header: 'Spec Value', cell: (info) => <span className="text-fg-secondary">{info.getValue() as string}</span>, meta: { width: 200 } },
    { accessorKey: 'lastModified', header: 'Last Modified', cell: (info) => <span className="text-fg-secondary">{info.getValue() as string}</span> },
  ]

  return (
    <div className="space-y-4">
      {/* ── Filter bar ── */}
      <div className="flex items-end gap-3 p-4 rounded-lg border border-divider bg-surface">
        {[
          { label: 'ATA Chapter', value: ataFilter, onChange: setAtaFilter, placeholder: 'e.g. ATA32' },
          { label: 'Part Number', value: pnFilter, onChange: setPnFilter, placeholder: 'e.g. 32-10-11' },
          { label: 'Config Type', value: typeFilter, onChange: setTypeFilter, placeholder: 'e.g. LSI' },
        ].map(({ label, value, onChange, placeholder }) => (
          <Field key={label} className="flex-1">
            <FieldLabel>{label}</FieldLabel>
            <Input
              size="sm"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
            />
          </Field>
        ))}
        <div className="shrink-0">
          <Button
            iconOnly
            startIcon={Search}
            size="sm"
            aria-label="Clear filters"
            onClick={() => { setAtaFilter(''); setPnFilter(''); setTypeFilter('') }}
          />
        </div>
      </div>

      {/* ── Main split: table left + right edit panel ── */}
      <div className="flex gap-0 rounded-lg border border-divider overflow-hidden">

        {/* ── Table column ── */}
        <div className="flex-1 min-w-0">
          <DataTable
            columns={columns}
            data={filtered}
            height="auto"
            getRowId={(r) => r.id}
            selectable
            selection={checkedIds}
            onSelectionChange={setCheckedIds}
            rowActions={(row) => (
              <Button
                iconOnly
                startIcon={Info}
                size="sm"
                variant="text"
                aria-label="View / edit"
                onClick={() => onSelect(row)}
              />
            )}
            emptyState={<div className="px-4 py-16 text-center text-fg-tertiary text-body">No rule records match the current filter.</div>}
          />

          {/* ── Pagination ── */}
          <div className="border-t border-divider bg-surface flex items-center px-4 py-2 gap-4">
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
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-hover text-fg-secondary">
                <ChevronLeft size={14} />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-hover text-fg-secondary">
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-fg-secondary">Items per Page</span>
              <Select
                size="sm"
                defaultValue="20"
                options={[
                  { value: '20', label: '20' },
                  { value: '50', label: '50' },
                  { value: '100', label: '100' },
                ]}
              />
            </div>
          </div>
        </div>

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

// ── Batch Detail Aside ──
function BatchDetailAside({ record, onClose }: { record: BatchPart; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="rounded-lg border border-divider divide-y divide-divider mx-4 mt-4">
          {[
            { label: 'MSN', value: record.msn },
            { label: 'Manufacturer', value: record.manufacturer },
            { label: 'Component', value: record.component },
            { label: 'ATA Part No.', value: record.ataPart },
            { label: 'ATA Chapter', value: record.ataChapter },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start gap-3 px-4 py-3">
              <span className="text-caption text-fg-secondary w-36 shrink-0 pt-0.5">{label}</span>
              <span className="text-body text-fg-primary">{value}</span>
            </div>
          ))}
          <div className="flex items-start gap-3 px-4 py-3">
            <span className="text-caption text-fg-secondary w-36 shrink-0 pt-0.5">Airworthiness</span>
            <Chip
              label={record.airworthiness}
              color={record.airworthiness === 'Active' ? 'green' : 'gray'}
            />
          </div>
        </div>
      </div>
      <div className="border-t border-divider flex items-center justify-end gap-2 px-4 py-3">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}

// ── AsideContent discriminated union ──
type AsideContent =
  | { type: 'rule'; record: RuleRecord }
  | { type: 'part'; record: PartRecord }
  | { type: 'analysis'; record: AnalysisRow }
  | { type: 'trace'; record: TraceRow }
  | { type: 'batch'; record: BatchPart }

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

function BatchEntryPage({ onBack, onSelect }: { onBack: () => void; onSelect: (r: BatchPart | null) => void }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
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

  const toggleStatusChip = (s: string) => setStatusFilter((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  const toggleFilterAta = (ata: string) => setFilterAta((prev) => { const s = new Set(prev); s.has(ata) ? s.delete(ata) : s.add(ata); return s })

  const columns: ColumnDef<BatchPart, any>[] = [
    {
      accessorKey: 'serial', header: 'Basic Information', meta: { width: 260 },
      cell: (info) => <span className="block truncate" title={info.getValue() as string}>{info.getValue() as string}</span>,
    },
    { accessorKey: 'msn', header: 'MSN' },
    { accessorKey: 'manufacturer', header: 'Manufacturer', cell: (info) => <span className="text-fg-secondary">{info.getValue() as string}</span> },
    { accessorKey: 'component', header: 'Component', cell: (info) => <span className="text-fg-secondary">{info.getValue() as string}</span> },
    {
      accessorKey: 'airworthiness', header: 'Airworthiness',
      cell: (info) => (
        <span className={"inline-flex px-2 py-0.5 rounded-full text-caption font-medium border " + (info.getValue() === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-surface-secondary text-fg-secondary border-divider')}>
          {info.getValue() as string}
        </span>
      ),
    },
    { accessorKey: 'ataPart', header: 'ATA Part No.' },
  ]

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
        <Field>
          <FieldLabel>Task Type</FieldLabel>
          <Select
            size="sm"
            defaultValue="general-add"
            options={[
              { value: 'general-add', label: 'General - Add' },
              { value: 'general-remove', label: 'General - Remove' },
              { value: 'engineering-order', label: 'Engineering Order' },
            ]}
          />
        </Field>
        <Field className="w-28">
          <FieldLabel>ATA Chapter</FieldLabel>
          <Input size="sm" value={ataFilter} onChange={(e) => setAtaFilter(e.target.value)} placeholder="e.g. ATA53" />
        </Field>
        <Field className="w-28">
          <FieldLabel>MSN</FieldLabel>
          <Input size="sm" value={msnFilter} onChange={(e) => setMsnFilter(e.target.value)} placeholder="e.g. MSN-7834" />
        </Field>
        <Field className="w-28">
          <FieldLabel>Manufacturer</FieldLabel>
          <Input size="sm" value={mfrFilter} onChange={(e) => setMfrFilter(e.target.value)} placeholder="e.g. CFM" />
        </Field>
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
            <span className="text-fg-secondary">{filtered.length} records</span>
          </div>

          <div className="flex-1 min-h-0">
            <DataTable
              columns={columns}
              data={filtered}
              height="100%"
              getRowId={(r) => r.id}
              selectable
              selection={selectedIds}
              onSelectionChange={setSelectedIds}
              rowActions={(row) => (
                <Button iconOnly startIcon={Info} size="sm" variant="text" aria-label="View details" onClick={() => onSelect(row)} />
              )}
              emptyState={<div className="px-4 py-16 text-center text-fg-tertiary text-body">No parts match the current filter criteria.</div>}
            />
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
              <Input
                size="sm"
                startIcon={Search}
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
                placeholder="Keyword search..."
              />
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
                    <Checkbox
                      key={ata}
                      checked={filterAta.has(ata)}
                      onCheckedChange={() => toggleFilterAta(ata)}
                      label={<span className="">{ata}</span>}
                    />
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
                    <Checkbox
                      key={s}
                      checked={filterStatus.has(s)}
                      onCheckedChange={() => setFilterStatus((prev) => { const ns = new Set(prev); ns.has(s) ? ns.delete(s) : ns.add(s); return ns })}
                      label={s}
                    />
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
                    <Checkbox key={m} defaultChecked label={m} />
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
          Select <span className="font-semibold text-fg-primary">{selectedIds.length}</span> item{selectedIds.length !== 1 ? 's' : ''}
        </span>
        <Button
          variant="primary"
          disabled={selectedIds.length === 0}
          onClick={() => toast({ title: selectedIds.length + ' part(s) added to creation list', variant: 'success' })}
        >
          Add to list
        </Button>
      </div>
    </div>
  )
}

// ── Configurator Page ──
function ConfiguratorPage({
  onBatchEntry,
  onSelectRule,
  onSelectPart,
  onSelectAnalysis,
  onSelectTrace,
}: {
  onBatchEntry: () => void
  onSelectRule: (r: RuleRecord | null) => void
  onSelectPart: (r: PartRecord | null) => void
  onSelectAnalysis: (r: AnalysisRow | null) => void
  onSelectTrace: (r: TraceRow | null) => void
}) {
  return (
    <div className="px-6 pb-5 space-y-5">
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
        <TabsContent value="dashboard" className="mt-6"><DashboardTab onSelect={onSelectPart} /></TabsContent>
        <TabsContent value="parts-analysis" className="mt-6"><PartsAnalysisTab onSelect={onSelectAnalysis} /></TabsContent>
        <TabsContent value="traceability" className="mt-6"><TraceabilityTab onSelect={onSelectTrace} /></TabsContent>
        <TabsContent value="rule-settings" className="mt-6"><RuleSettingsTab onSelect={onSelectRule} /></TabsContent>
      </Tabs>
    </div>
  )
}

// ── Root ──
function getAsideTitle(c: AsideContent | null): string {
  if (!c) return '詳情'
  if (c.type === 'rule') return c.record.partNumber
  if (c.type === 'part') return c.record.code
  if (c.type === 'analysis') return c.record.id
  if (c.type === 'trace') return c.record.pn
  if (c.type === 'batch') return c.record.serial
  return '詳情'
}

export default function App() {
  const [activeId, setActiveId] = useState<string>('configurator')
  const [showBatchEntry, setShowBatchEntry] = useState(false)
  const [asideOpen, setAsideOpen] = useState(false)
  const [asideContent, setAsideContent] = useState<AsideContent | null>(null)

  const closeAside = () => { setAsideContent(null); setAsideOpen(false) }
  const openAside = (c: AsideContent) => { setAsideContent(c); setAsideOpen(true) }

  return (
    <TooltipProvider delayDuration={500} skipDelayDuration={300}>
      <SidebarProvider activeId={activeId} onActiveChange={setActiveId}>
        <AppShell
          layout="primary-header"
          globalHeader={<GlobalHeader />}
          sidebar={<AppSidebar activeId={activeId} onActiveChange={setActiveId} viewportInsetTop="var(--chrome-header-height)" />}
          aside={
            <AppShellAside title={getAsideTitle(asideContent)} width={380}>
              {asideContent?.type === 'rule'     && <RuleDetailPanel     selected={asideContent.record} onClose={closeAside} />}
              {asideContent?.type === 'part'     && <PartDetailAside     part={asideContent.record}     onClose={closeAside} />}
              {asideContent?.type === 'analysis' && <AnalysisDetailAside record={asideContent.record}   onClose={closeAside} />}
              {asideContent?.type === 'trace'    && <TraceDetailAside    record={asideContent.record}   onClose={closeAside} />}
              {asideContent?.type === 'batch'    && <BatchDetailAside    record={asideContent.record}   onClose={closeAside} />}
            </AppShellAside>
          }
          asideOpen={asideOpen}
          onAsideOpenChange={(open) => { setAsideOpen(open); if (!open) setAsideContent(null) }}
        >
          {showBatchEntry
            ? <BatchEntryPage
                onBack={() => setShowBatchEntry(false)}
                onSelect={(r) => r ? openAside({ type: 'batch', record: r }) : closeAside()}
              />
            : <ConfiguratorPage
                onBatchEntry={() => setShowBatchEntry(true)}
                onSelectRule={(r) => r ? openAside({ type: 'rule', record: r }) : closeAside()}
                onSelectPart={(r) => r ? openAside({ type: 'part', record: r }) : closeAside()}
                onSelectAnalysis={(r) => r ? openAside({ type: 'analysis', record: r }) : closeAside()}
                onSelectTrace={(r) => r ? openAside({ type: 'trace', record: r }) : closeAside()}
              />}
        </AppShell>
      </SidebarProvider>
      <Toaster />
    </TooltipProvider>
  )
}
