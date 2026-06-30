import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
} from '@xyflow/react'
import { SEED_CONCEPTS } from './data'
import {
  buildMaps,
  descendantsOf,
  EDGE_TYPE,
  isHiddenByCollapse,
  layoutTree,
  seedToGraph,
  Y_GAP,
} from './layout'
import type { ConceptData, ConceptNodeType } from './types'

interface ConceptMapValue {
  // derived view passed straight to <ReactFlow>
  nodes: ConceptNodeType[]
  edges: Edge[]
  onNodesChange: (changes: NodeChange<ConceptNodeType>[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void
  // detail aside
  selected: ConceptNodeType | null
  asideOpen: boolean
  setAsideOpen: (open: boolean) => void
  openDetail: (id: string) => void
  // structural edits
  toggleCollapse: (id: string) => void
  addChild: (parentId: string) => void
  addRoot: () => void
  deleteConcept: (id: string) => void
  updateConcept: (id: string, patch: Partial<ConceptData>) => void
  relayout: () => void
}

const ConceptMapContext = createContext<ConceptMapValue | null>(null)

export function useConceptMap(): ConceptMapValue {
  const ctx = useContext(ConceptMapContext)
  if (!ctx) throw new Error('useConceptMap must be used within <ConceptMapProvider>')
  return ctx
}

let idCounter = 1
const nextId = () => `concept-${idCounter++}`

export function ConceptMapProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => seedToGraph(SEED_CONCEPTS), [])
  const [baseNodes, setBaseNodes] = useState<ConceptNodeType[]>(initial.nodes)
  const [baseEdges, setBaseEdges] = useState<Edge[]>(initial.edges)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [asideOpen, setAsideOpen] = useState(false)

  // refs：handler 需要讀「最新」結構又不想把 setState 互相巢狀。
  const nodesRef = useRef(baseNodes)
  nodesRef.current = baseNodes
  const edgesRef = useRef(baseEdges)
  edgesRef.current = baseEdges

  // 依 collapse 結構 derive：隱藏、注入 hasChildren / childCount / collapsed 旗標。
  const { nodes, edges } = useMemo(() => {
    const { children, parent } = buildMaps(baseEdges)
    const derivedNodes: ConceptNodeType[] = baseNodes.map((n) => ({
      ...n,
      hidden: isHiddenByCollapse(n.id, parent, collapsed),
      data: {
        ...n.data,
        hasChildren: (children[n.id]?.length ?? 0) > 0,
        childCount: children[n.id]?.length ?? 0,
        collapsed: collapsed.has(n.id),
      },
    }))
    const derivedEdges: Edge[] = baseEdges.map((e) => ({
      ...e,
      hidden:
        isHiddenByCollapse(e.target, parent, collapsed) ||
        isHiddenByCollapse(e.source, parent, collapsed),
    }))
    return { nodes: derivedNodes, edges: derivedEdges }
  }, [baseNodes, baseEdges, collapsed])

  const onNodesChange = useCallback(
    (changes: NodeChange<ConceptNodeType>[]) => setBaseNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setBaseEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  )

  // 連線 = re-parent：丟掉 target 既有的 parent edge，並擋掉會造成環的連線
  // （新 parent 不可是該節點的子孫；也不可連自己）。
  const onConnect = useCallback((connection: Connection) => {
    const { source, target } = connection
    if (!source || !target || source === target) return
    const { children } = buildMaps(edgesRef.current)
    if (descendantsOf(target, children).includes(source)) return
    setBaseEdges((eds) => {
      const withoutOldParent = eds.filter((e) => e.target !== target)
      const edge: Edge = { ...connection, id: `e-${source}-${target}`, type: EDGE_TYPE }
      return addEdge(edge, withoutOldParent)
    })
  }, [])

  const openDetail = useCallback((id: string) => {
    setSelectedId(id)
    setAsideOpen(true)
  }, [])

  const toggleCollapse = useCallback((id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const addChild = useCallback((parentId: string) => {
    const id = nextId()
    const parent = nodesRef.current.find((n) => n.id === parentId)
    const position = parent
      ? { x: parent.position.x + 48, y: parent.position.y + Y_GAP }
      : { x: 0, y: 0 }
    const newNode: ConceptNodeType = {
      id,
      type: 'concept',
      position,
      data: {
        label: 'New concept',
        description: '',
        category: parent?.data.category === 'Root' ? 'Domain' : 'Concept',
        color: parent?.data.color ?? 'neutral',
        hasChildren: false,
        collapsed: false,
        childCount: 0,
      },
    }
    setBaseNodes((nds) => [...nds, newNode])
    setBaseEdges((eds) =>
      addEdge({ id: `e-${parentId}-${id}`, source: parentId, target: id, type: EDGE_TYPE }, eds),
    )
    // 確保新增的子節點可見（若 parent 原本收合）。
    setCollapsed((prev) => {
      if (!prev.has(parentId)) return prev
      const next = new Set(prev)
      next.delete(parentId)
      return next
    })
    setSelectedId(id)
    setAsideOpen(true)
  }, [])

  const addRoot = useCallback(() => {
    const id = nextId()
    const maxX = nodesRef.current.reduce((m, n) => Math.max(m, n.position.x), 0)
    const newNode: ConceptNodeType = {
      id,
      type: 'concept',
      position: { x: maxX + 280, y: 0 },
      data: {
        label: 'New root',
        description: '',
        category: 'Root',
        color: 'neutral',
        hasChildren: false,
        collapsed: false,
        childCount: 0,
      },
    }
    setBaseNodes((nds) => [...nds, newNode])
    setSelectedId(id)
    setAsideOpen(true)
  }, [])

  const deleteConcept = useCallback((id: string) => {
    const { children } = buildMaps(edgesRef.current)
    const toRemove = new Set<string>([id, ...descendantsOf(id, children)])
    setBaseNodes((nds) => nds.filter((n) => !toRemove.has(n.id)))
    setBaseEdges((eds) => eds.filter((e) => !toRemove.has(e.source) && !toRemove.has(e.target)))
    setCollapsed((prev) => {
      const next = new Set(prev)
      for (const r of toRemove) next.delete(r)
      return next
    })
    setSelectedId((cur) => (cur && toRemove.has(cur) ? null : cur))
    setAsideOpen(false)
  }, [])

  const updateConcept = useCallback((id: string, patch: Partial<ConceptData>) => {
    setBaseNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n)),
    )
  }, [])

  const relayout = useCallback(() => {
    const pos = layoutTree(nodesRef.current, edgesRef.current)
    setBaseNodes((nds) => nds.map((n) => (pos[n.id] ? { ...n, position: pos[n.id] } : n)))
  }, [])

  const selected = useMemo(
    () => baseNodes.find((n) => n.id === selectedId) ?? null,
    [baseNodes, selectedId],
  )

  const value: ConceptMapValue = {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selected,
    asideOpen,
    setAsideOpen,
    openDetail,
    toggleCollapse,
    addChild,
    addRoot,
    deleteConcept,
    updateConcept,
    relayout,
  }

  return <ConceptMapContext.Provider value={value}>{children}</ConceptMapContext.Provider>
}
