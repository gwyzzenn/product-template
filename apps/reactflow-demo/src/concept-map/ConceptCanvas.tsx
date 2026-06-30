import { useEffect } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import './concept-map.css'
import { Button } from '@qijenchen/design-system'
import { LayoutGrid, Maximize2, Plus } from 'lucide-react'
import { ConceptNode } from './ConceptNode'
import { useConceptMap } from './ConceptMapContext'

// nodeTypes 必為穩定引用（module-scope），否則 ReactFlow 每 render 視為新 type。
const nodeTypes = { concept: ConceptNode }

export function ConceptCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, openDetail, addRoot, relayout, asideOpen } =
    useConceptMap()
  const rf = useReactFlow()

  // aside 開/關會改變畫布可視寬度 → 重新 fit，讓整棵樹始終可見。
  useEffect(() => {
    const t = window.setTimeout(() => rf.fitView({ duration: 300, padding: 0.2 }), 80)
    return () => window.clearTimeout(t)
  }, [asideOpen, rf])

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => openDetail(node.id)}
        deleteKeyCode={null}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        minZoom={0.2}
        maxZoom={1.8}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        attributionPosition="bottom-left"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls position="bottom-right" showInteractive={false} />
        <MiniMap position="top-right" pannable zoomable />
        <Panel position="top-left">
          <div className="flex items-center gap-1 rounded-lg border border-divider bg-surface p-1.5 shadow-sm">
            <Button size="sm" variant="tertiary" startIcon={Plus} onClick={addRoot}>
              Add root
            </Button>
            <Button
              size="sm"
              variant="tertiary"
              startIcon={LayoutGrid}
              onClick={() => {
                relayout()
                window.setTimeout(() => rf.fitView({ duration: 300 }), 60)
              }}
            >
              Auto layout
            </Button>
            <Button
              size="sm"
              variant="text"
              iconOnly
              startIcon={Maximize2}
              aria-label="Fit view"
              onClick={() => rf.fitView({ duration: 300 })}
            />
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}
