// ReactFlow 概念分類樹 Demo — 把「概念分類成樹狀結構」做成可拖拉編輯的 workflow 畫布。
//
// 架構（對齊 DS canonical AppShell + Sidebar + ChromeHeader，參考 apps/bom-navigator）：
//   TooltipProvider → ConceptMapProvider（state）→ ReactFlowProvider（useReactFlow）→ AppShell
//   - 主內容 = ReactFlow 畫布（ConceptCanvas）：拖拉 / 連線重組 / 展開收合 / 新增刪除
//   - 右側 aside = NodeDetailAside（點節點開，編輯概念）
//
// SSOT 鐵律：只 import `@qijenchen/design-system` public exports；ReactFlow 當 npm 套件消費；
// 節點殼用 DS design token，不發明顏色。

import { useState, type ReactElement } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import {
  AppShell,
  AppShellAside,
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  ChromeHeader,
  TooltipProvider,
  Avatar,
  ItemAvatar,
  Button,
} from '@qijenchen/design-system'
import { Network, FolderTree, Settings, Plus } from 'lucide-react'
import {
  ConceptMapProvider,
  ConceptCanvas,
  NodeDetailAside,
  useConceptMap,
} from './concept-map'

const NAV = [
  { id: 'concept-map', label: 'Concept Map', icon: Network },
  { id: 'saved', label: 'Saved Maps', icon: FolderTree },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const

function AppSidebar({ activeId }: { activeId: string }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 min-w-0 group-data-[collapsible=icon]:justify-center">
          <Avatar alt="Concept Map" size={24} shape="square" color="blue" solid />
          <span className="text-body-lg font-medium truncate group-data-[collapsible=icon]:hidden">
            Concept Map
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map(({ id, label, icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton id={id} startIcon={icon} tooltip={label} isActive={activeId === id}>
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
              <div role="group" aria-label="當前使用者">
                <ItemAvatar alt="Current user" color="blue" />
                <span data-sidebar="menu-label" className="min-w-0 flex-1 truncate">當前使用者</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function PageHeader({ title, rightSlot }: { title: string; rightSlot?: ReactElement<any, any> }) {
  return (
    <ChromeHeader className="bg-surface">
      <SidebarTrigger />
      <h1 className="text-body-lg font-medium flex-1 truncate">{title}</h1>
      {rightSlot}
    </ChromeHeader>
  )
}

// AppShell + aside —— 必在 ConceptMapProvider 內，才能讀 context 控制 aside 開關與內容。
function ConceptMapShell() {
  const [activeId, setActiveId] = useState<string>('concept-map')
  const { asideOpen, setAsideOpen, selected, addRoot } = useConceptMap()

  return (
    <SidebarProvider activeId={activeId} onActiveChange={setActiveId}>
      <AppShell
        layout="primary-sidebar"
        sidebar={<AppSidebar activeId={activeId} />}
        header={
          <PageHeader
            title="Concept Map"
            rightSlot={
              <Button variant="primary" size="md" startIcon={Plus} onClick={addRoot}>
                New concept
              </Button>
            }
          />
        }
        aside={
          <AppShellAside title={selected ? selected.data.label : '概念詳情'} width={360}>
            <NodeDetailAside />
          </AppShellAside>
        }
        asideOpen={asideOpen}
        onAsideOpenChange={setAsideOpen}
      >
        <div className="h-full w-full">
          <ConceptCanvas />
        </div>
      </AppShell>
    </SidebarProvider>
  )
}

export default function App() {
  return (
    <TooltipProvider delayDuration={500} skipDelayDuration={300}>
      <ConceptMapProvider>
        <ReactFlowProvider>
          <ConceptMapShell />
        </ReactFlowProvider>
      </ConceptMapProvider>
    </TooltipProvider>
  )
}
