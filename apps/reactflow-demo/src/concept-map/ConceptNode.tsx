import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Button, Tag } from '@qijenchen/design-system'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import type { ConceptNodeType } from './types'
import { useConceptMap } from './ConceptMapContext'
import { NODE_WIDTH } from './layout'

// 自訂節點：殼用 DS design token（對齊本 repo card 慣例 rounded-lg / border-divider /
// bg-surface），內容用 DS primitive（Tag 分類標籤 / Button 動作）。連線點用 ReactFlow Handle。
// 互動元素加 `nodrag` 避免觸發節點拖曳；stopPropagation 避免冒泡觸發 onNodeClick 開面板。
export function ConceptNode({ id, data, selected }: NodeProps<ConceptNodeType>) {
  const { toggleCollapse, addChild } = useConceptMap()

  return (
    <div
      style={{ width: NODE_WIDTH }}
      className={[
        'rounded-lg border bg-surface px-3 py-2.5 shadow-sm transition-shadow',
        'hover:shadow-md',
        selected ? 'border-primary ring-2 ring-primary' : 'border-divider',
      ].join(' ')}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-2 !border-surface !bg-fg-muted"
      />

      <div className="flex items-start justify-between gap-2">
        <span className="text-body font-medium text-foreground leading-snug">{data.label}</span>
        <Tag color={data.color} size="sm">
          {data.category}
        </Tag>
      </div>

      {data.description && (
        <p className="mt-1 line-clamp-2 text-caption text-fg-secondary">{data.description}</p>
      )}

      <div className="mt-2 flex items-center justify-between">
        {data.hasChildren ? (
          <button
            type="button"
            className="nodrag inline-flex items-center gap-1 rounded px-1 py-0.5 text-caption text-fg-secondary hover:bg-neutral-hover"
            aria-label={data.collapsed ? 'Expand children' : 'Collapse children'}
            onClick={(e) => {
              e.stopPropagation()
              toggleCollapse(id)
            }}
          >
            {data.collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
            <span>{data.childCount}</span>
          </button>
        ) : (
          <span />
        )}

        <Button
          iconOnly
          startIcon={Plus}
          size="sm"
          variant="text"
          className="nodrag"
          aria-label="Add sub-concept"
          onClick={(e) => {
            e.stopPropagation()
            addChild(id)
          }}
        />
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-2 !border-surface !bg-fg-muted"
      />
    </div>
  )
}
