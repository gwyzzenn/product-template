import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ConceptMapProvider, useConceptMap } from './ConceptMapContext'

const wrapper = ({ children }: { children: ReactNode }) => (
  <ConceptMapProvider>{children}</ConceptMapProvider>
)
const setup = () => renderHook(() => useConceptMap(), { wrapper })

// frontend 子樹（供 collapse / delete 斷言）
const FRONTEND_SUBTREE = [
  'design-system',
  'fe-frameworks',
  'fe-styling',
  'react',
  'tailwind',
  'vue',
]

describe('ConceptMapProvider — initial state', () => {
  it('seeds 18 nodes / 17 edges, nothing hidden, no selection', () => {
    const { result } = setup()
    expect(result.current.nodes).toHaveLength(18)
    expect(result.current.edges).toHaveLength(17)
    expect(result.current.nodes.every((n) => !n.hidden)).toBe(true)
    expect(result.current.selected).toBeNull()
    expect(result.current.asideOpen).toBe(false)
  })

  it('derives hasChildren / childCount / collapsed onto node data', () => {
    const { result } = setup()
    const root = result.current.nodes.find((n) => n.id === 'kb')!
    expect(root.data.hasChildren).toBe(true)
    expect(root.data.childCount).toBe(3) // frontend, backend, infra
    const leaf = result.current.nodes.find((n) => n.id === 'react')!
    expect(leaf.data.hasChildren).toBe(false)
    expect(leaf.data.childCount).toBe(0)
  })
})

describe('toggleCollapse', () => {
  it('hides the whole subtree (but not the node itself), and restores on expand', () => {
    const { result } = setup()

    act(() => result.current.toggleCollapse('frontend'))
    const hidden = result.current.nodes.filter((n) => n.hidden).map((n) => n.id)
    expect(hidden.sort()).toEqual(FRONTEND_SUBTREE)

    const frontend = result.current.nodes.find((n) => n.id === 'frontend')!
    expect(frontend.hidden).toBe(false)
    expect(frontend.data.collapsed).toBe(true)

    act(() => result.current.toggleCollapse('frontend'))
    expect(result.current.nodes.every((n) => !n.hidden)).toBe(true)
  })
})

describe('addChild', () => {
  it('adds a node + edge, marks parent as having children, selects it and opens the aside', () => {
    const { result } = setup()

    act(() => result.current.addChild('react'))
    expect(result.current.nodes).toHaveLength(19)
    expect(result.current.edges).toHaveLength(18)
    expect(result.current.asideOpen).toBe(true)

    const newId = result.current.selected!.id
    expect(result.current.edges.some((e) => e.source === 'react' && e.target === newId)).toBe(true)
    expect(result.current.nodes.find((n) => n.id === 'react')!.data.hasChildren).toBe(true)
  })

  it('expands a collapsed parent so the new child is visible', () => {
    const { result } = setup()
    act(() => result.current.toggleCollapse('frontend'))
    act(() => result.current.addChild('frontend'))

    const newId = result.current.selected!.id
    expect(result.current.nodes.find((n) => n.id === newId)!.hidden).toBe(false)
    expect(result.current.nodes.find((n) => n.id === 'frontend')!.data.collapsed).toBe(false)
  })
})

describe('deleteConcept', () => {
  it('removes the node, its whole subtree, and every connected edge', () => {
    const { result } = setup()
    act(() => result.current.deleteConcept('frontend'))

    const ids = result.current.nodes.map((n) => n.id)
    for (const gone of ['frontend', ...FRONTEND_SUBTREE]) {
      expect(ids).not.toContain(gone)
    }
    expect(result.current.nodes).toHaveLength(11) // 18 − (frontend + 6 descendants)
    expect(
      result.current.edges.every((e) => ids.includes(e.source) && ids.includes(e.target)),
    ).toBe(true)
  })
})

describe('onConnect (connect = re-parent)', () => {
  it('moves a node under a new parent, dropping its previous parent edge', () => {
    const { result } = setup()
    // react starts under fe-frameworks → re-parent under backend
    act(() =>
      result.current.onConnect({
        source: 'backend',
        target: 'react',
        sourceHandle: null,
        targetHandle: null,
      }),
    )
    const parents = result.current.edges.filter((e) => e.target === 'react').map((e) => e.source)
    expect(parents).toEqual(['backend'])
  })

  it('rejects a connection that would create a cycle (new parent is a descendant)', () => {
    const { result } = setup()
    const before = result.current.edges.length
    // frontend under react — but react is inside frontend's subtree → must be rejected
    act(() =>
      result.current.onConnect({
        source: 'react',
        target: 'frontend',
        sourceHandle: null,
        targetHandle: null,
      }),
    )
    expect(result.current.edges).toHaveLength(before)
    expect(result.current.edges.filter((e) => e.target === 'frontend').map((e) => e.source)).toEqual([
      'kb',
    ])
  })
})

describe('openDetail', () => {
  it('selects a node and opens the aside', () => {
    const { result } = setup()
    act(() => result.current.openDetail('backend'))
    expect(result.current.selected?.id).toBe('backend')
    expect(result.current.asideOpen).toBe(true)
  })
})
