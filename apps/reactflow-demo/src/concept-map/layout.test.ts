import { describe, it, expect } from 'vitest'
import type { Edge } from '@xyflow/react'
import {
  buildMaps,
  descendantsOf,
  isHiddenByCollapse,
  layoutTree,
  seedToGraph,
  X_GAP,
  Y_GAP,
} from './layout'
import { SEED_CONCEPTS } from './data'
import type { ConceptNodeType } from './types'

const node = (id: string): ConceptNodeType => ({
  id,
  type: 'concept',
  position: { x: 0, y: 0 },
  data: {
    label: id,
    description: '',
    category: '',
    color: 'neutral',
    hasChildren: false,
    collapsed: false,
    childCount: 0,
  },
})
const edge = (s: string, t: string): Edge => ({ id: `e-${s}-${t}`, source: s, target: t })

describe('buildMaps', () => {
  it('builds children (insertion order) + parent maps', () => {
    const { children, parent } = buildMaps([edge('a', 'b'), edge('a', 'c'), edge('b', 'd')])
    expect(children.a).toEqual(['b', 'c'])
    expect(children.b).toEqual(['d'])
    expect(parent.b).toBe('a')
    expect(parent.d).toBe('b')
    expect(parent.a).toBeUndefined()
  })
})

describe('descendantsOf', () => {
  const { children } = buildMaps([edge('a', 'b'), edge('a', 'c'), edge('b', 'd'), edge('d', 'e')])
  it('returns all deep descendants, excluding self', () => {
    expect(descendantsOf('a', children).sort()).toEqual(['b', 'c', 'd', 'e'])
    expect(descendantsOf('b', children).sort()).toEqual(['d', 'e'])
  })
  it('returns empty for a leaf', () => {
    expect(descendantsOf('e', children)).toEqual([])
  })
})

describe('isHiddenByCollapse', () => {
  const { parent } = buildMaps([edge('a', 'b'), edge('b', 'c')])
  it('a node is not hidden by its own collapse (only ancestors count)', () => {
    expect(isHiddenByCollapse('a', parent, new Set(['a']))).toBe(false)
  })
  it('hides direct + deep descendants of a collapsed ancestor', () => {
    const collapsed = new Set(['a'])
    expect(isHiddenByCollapse('b', parent, collapsed)).toBe(true)
    expect(isHiddenByCollapse('c', parent, collapsed)).toBe(true)
  })
  it('is not hidden when no ancestor is collapsed', () => {
    expect(isHiddenByCollapse('c', parent, new Set())).toBe(false)
  })
})

describe('layoutTree', () => {
  it('places leaves left-to-right, centers parents, and maps depth to y', () => {
    // a -> b, c ; b -> d
    const nodes = ['a', 'b', 'c', 'd'].map(node)
    const edges = [edge('a', 'b'), edge('a', 'c'), edge('b', 'd')]
    const pos = layoutTree(nodes, edges)

    // depth → y
    expect(pos.a.y).toBe(0)
    expect(pos.b.y).toBe(Y_GAP)
    expect(pos.c.y).toBe(Y_GAP)
    expect(pos.d.y).toBe(2 * Y_GAP)

    // leaves in placement order (post-order): d first (under b), then c
    expect(pos.d.x).toBe(0)
    expect(pos.c.x).toBe(X_GAP)

    // b centered over its single child d; a centered between b and c
    expect(pos.b.x).toBe(pos.d.x)
    expect(pos.a.x).toBe((pos.b.x + pos.c.x) / 2)
  })
})

describe('seedToGraph(SEED_CONCEPTS)', () => {
  const { nodes, edges } = seedToGraph(SEED_CONCEPTS)

  it('produces 18 nodes and 17 edges (tree: edges = nodes − roots)', () => {
    expect(nodes).toHaveLength(18)
    expect(edges).toHaveLength(17)
  })
  it('has exactly one root (id "kb")', () => {
    const { parent } = buildMaps(edges)
    expect(nodes.filter((n) => !parent[n.id]).map((n) => n.id)).toEqual(['kb'])
  })
  it('gives every node at most one parent (valid tree)', () => {
    const seen = new Map<string, number>()
    for (const e of edges) seen.set(e.target, (seen.get(e.target) ?? 0) + 1)
    expect([...seen.values()].every((c) => c === 1)).toBe(true)
  })
  it('has unique edge ids', () => {
    const ids = edges.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('assigns non-trivial positions (layout applied, not all at origin)', () => {
    expect(nodes.some((n) => n.position.x !== 0 || n.position.y !== 0)).toBe(true)
  })
})
