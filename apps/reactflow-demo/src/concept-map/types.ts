import type { Node } from '@xyflow/react'

// DS Tag categorical color union（對齊 @qijenchen/design-system Tag `color` prop SSOT）
export type TagColor =
  | 'blue' | 'green' | 'indigo' | 'lime' | 'magenta' | 'orange'
  | 'purple' | 'red' | 'turquoise' | 'yellow' | 'neutral' | 'deep-orange' | 'amber'

// 單一概念節點的資料。hasChildren / collapsed / childCount 由 ConceptMapContext
// 在 render 時依 graph 結構 derive 注入（不是 persisted state）。
export interface ConceptData extends Record<string, unknown> {
  label: string
  description: string
  category: string
  color: TagColor
  hasChildren: boolean
  collapsed: boolean
  childCount: number
}

export type ConceptNodeType = Node<ConceptData, 'concept'>

// seed taxonomy 的巢狀宣告（data.ts 用），由 layout.seedToGraph 攤平成 nodes + edges。
export interface ConceptSeed {
  id: string
  label: string
  description: string
  category: string
  color: TagColor
  children?: ConceptSeed[]
}
