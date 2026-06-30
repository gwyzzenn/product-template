// ReactFlow 概念分類樹 Demo — product story（stakeholder 可看的真實情境）
// 預設即渲染完整概念樹（seed taxonomy + fitView），符合 M15「flow 必須 visual-audit coverable」
// ——不需互動就能截到有意義的畫面。

import type { Meta, StoryObj } from '@storybook/react'
import App from './App'

const meta: Meta<typeof App> = {
  title: 'Apps/reactflow-demo/Concept Map',
  component: App,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '把「概念分類成樹狀結構」做成可拖拉編輯的 workflow 畫布（ReactFlow `@xyflow/react` v12）。\n\n' +
          '**互動**：拖節點、連線重組（連線 = 換 parent）、節點上 ＋ 新增子概念、chevron 展開/收合子樹、' +
          '點節點開右側面板編輯（label / 描述 / 分類 / 顏色）/ 刪除子樹。toolbar 提供 Add root / Auto layout / Fit view。\n\n' +
          '**DS 整合**：節點殼用 DS design token（surface / divider / primary），分類標籤用 `Tag`、' +
          '動作用 `Button`，外框走 `AppShell + Sidebar + ChromeHeader`，右側用 `AppShellAside`。\n\n' +
          'ReactFlow 當 npm 套件消費；SSOT 鐵律：只 import `@qijenchen/design-system` exports，禁修改 DS source。',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof App>

export const Default: Story = {
  name: '概念分類樹',
}
