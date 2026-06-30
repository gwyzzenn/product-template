import type { Edge } from '@xyflow/react'
import type { ConceptNodeType, ConceptSeed } from './types'

// 節點視覺寬度 + tidy-tree 間距常數（ReactFlow 不自帶 auto-layout，故自算）。
export const NODE_WIDTH = 220
export const X_GAP = 264
export const Y_GAP = 156

export const EDGE_TYPE = 'smoothstep' as const

interface Maps {
  children: Record<string, string[]>
  parent: Record<string, string>
}

// 由 edges 建 children / parent 對照（tree：每個 target 至多一個 parent）。
export function buildMaps(edges: Edge[]): Maps {
  const children: Record<string, string[]> = {}
  const parent: Record<string, string> = {}
  for (const e of edges) {
    ;(children[e.source] ??= []).push(e.target)
    parent[e.target] = e.source
  }
  return { children, parent }
}

// 某 node 是否因祖先被收合而隱藏。
export function isHiddenByCollapse(id: string, parent: Record<string, string>, collapsed: Set<string>): boolean {
  let p: string | undefined = parent[id]
  while (p) {
    if (collapsed.has(p)) return true
    p = parent[p]
  }
  return false
}

// 某 node 的所有子孫 id（含深層，不含自己）。
export function descendantsOf(id: string, children: Record<string, string[]>): string[] {
  const out: string[] = []
  const stack = [...(children[id] ?? [])]
  while (stack.length) {
    const x = stack.pop() as string
    out.push(x)
    for (const c of children[x] ?? []) stack.push(c)
  }
  return out
}

// Tidy top-down tree layout：leaf 由左至右依序佔 X 槽，內部節點 X = 子節點 X 的中點，
// Y = depth × Y_GAP。回傳 id → position 對照。
export function layoutTree(nodes: ConceptNodeType[], edges: Edge[]): Record<string, { x: number; y: number }> {
  const { children, parent } = buildMaps(edges)
  const pos: Record<string, { x: number; y: number }> = {}
  let nextSlot = 0

  const place = (id: string, depth: number): void => {
    const kids = children[id] ?? []
    if (kids.length === 0) {
      pos[id] = { x: nextSlot * X_GAP, y: depth * Y_GAP }
      nextSlot += 1
      return
    }
    for (const k of kids) place(k, depth + 1)
    const xs = kids.map((k) => pos[k].x)
    pos[id] = { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: depth * Y_GAP }
  }

  for (const n of nodes) {
    if (!parent[n.id]) place(n.id, 0) // roots（無 parent）
  }
  // 安全網：任何未被 root 走訪到的孤立節點，補一個位置避免疊在 (0,0)。
  for (const n of nodes) {
    if (!pos[n.id]) {
      pos[n.id] = { x: nextSlot * X_GAP, y: 0 }
      nextSlot += 1
    }
  }
  return pos
}

// seed 巢狀樹 → ReactFlow nodes + edges（位置由 layoutTree 算）。
export function seedToGraph(roots: ConceptSeed[]): { nodes: ConceptNodeType[]; edges: Edge[] } {
  const nodes: ConceptNodeType[] = []
  const edges: Edge[] = []

  const walk = (seed: ConceptSeed, parentId?: string): void => {
    nodes.push({
      id: seed.id,
      type: 'concept',
      position: { x: 0, y: 0 },
      data: {
        label: seed.label,
        description: seed.description,
        category: seed.category,
        color: seed.color,
        hasChildren: false,
        collapsed: false,
        childCount: 0,
      },
    })
    if (parentId) {
      edges.push({ id: `e-${parentId}-${seed.id}`, source: parentId, target: seed.id, type: EDGE_TYPE })
    }
    for (const child of seed.children ?? []) walk(child, seed.id)
  }

  for (const r of roots) walk(r)

  const pos = layoutTree(nodes, edges)
  for (const n of nodes) n.position = pos[n.id] ?? n.position
  return { nodes, edges }
}
