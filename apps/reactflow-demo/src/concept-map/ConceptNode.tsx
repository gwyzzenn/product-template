import { Handle, Position, type NodeProps } from '@xyflow/react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tag,
} from '@qijenchen/design-system'
import {
  ArrowLeftRight,
  ChevronsDownUp,
  ChevronsUpDown,
  MoreHorizontal,
  Move,
  Plus,
  Trash2,
} from 'lucide-react'
import type { ConceptNodeType } from './types'
import { useConceptMap } from './ConceptMapContext'
import { NODE_WIDTH } from './layout'

// 屬性卡片版型：標頭（拖曳把手 · Label · ⇄ 替代料提示 · ••• 選單）+ 灰底 key–value 屬性面板。
// 殼 / 內容全走 DS token 與 primitive（Tag / Button / DropdownMenu）；連線點用 ReactFlow Handle。
// 互動元素加 `nodrag` + stopPropagation，避免觸發節點拖曳 / onNodeClick 開面板。
// 替代料（Alternative material）完整資訊在右側 information panel（NodeDetailAside），
// 卡片只用 ⇄ badge 提示「此物料有 N 個替代料」，點它開右側面板。
export function ConceptNode({ id, data, selected }: NodeProps<ConceptNodeType>) {
  const { toggleCollapse, addChild, deleteConcept, openDetail } = useConceptMap()
  const altCount = data.alternatives?.length ?? 0

  return (
    <div
      style={{ width: NODE_WIDTH }}
      className={[
        'rounded-xl border bg-surface px-3.5 py-3 shadow-sm transition-shadow',
        'hover:shadow-md',
        selected ? 'border-primary ring-2 ring-primary' : 'border-divider',
      ].join(' ')}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-2 !border-surface !bg-fg-muted"
      />

      {/* header：拖曳把手 · Label · ⇄ 替代料提示 · ••• 選單 */}
      <div className="flex items-center gap-1.5">
        <Move size={15} aria-hidden className="shrink-0 cursor-grab text-fg-muted" />
        <span className="min-w-0 flex-1 truncate text-body font-semibold text-foreground">
          {data.label}
        </span>

        {altCount > 0 && (
          <button
            type="button"
            className="nodrag inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-caption font-semibold text-fg-secondary hover:bg-neutral-hover"
            aria-label={`${altCount} 個替代料，檢視資訊`}
            title={`${altCount} 個替代料`}
            onClick={(e) => {
              e.stopPropagation()
              openDetail(id)
            }}
          >
            <ArrowLeftRight size={13} />
            <span>{altCount}</span>
          </button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              iconOnly
              startIcon={MoreHorizontal}
              size="sm"
              variant="text"
              className="nodrag shrink-0"
              aria-label="更多動作"
              onClick={(e) => e.stopPropagation()}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="nodrag">
            <DropdownMenuItem startIcon={Plus} onSelect={() => addChild(id)}>
              新增子概念
            </DropdownMenuItem>
            {data.hasChildren && (
              <DropdownMenuItem
                startIcon={data.collapsed ? ChevronsUpDown : ChevronsDownUp}
                onSelect={() => toggleCollapse(id)}
              >
                {data.collapsed ? '展開子概念' : '收合子概念'}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem startIcon={Trash2} className="text-error" onSelect={() => deleteConcept(id)}>
              刪除（含子樹）
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 灰底屬性面板 */}
      <dl className="mt-2.5 flex flex-col gap-1.5 rounded-lg bg-muted px-3 py-2.5">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="shrink-0 text-caption text-fg-muted">Description</dt>
          <dd className="min-w-0 truncate text-right text-caption text-fg-secondary">
            {data.description || '—'}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="shrink-0 text-caption text-fg-muted">Category</dt>
          <dd>
            <Tag color={data.color} size="sm">
              {data.category}
            </Tag>
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="shrink-0 text-caption text-fg-muted">Sub-concepts</dt>
          <dd className="text-caption font-medium text-foreground">{data.childCount}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="shrink-0 text-caption text-fg-muted">Code</dt>
          <dd className="truncate font-mono text-caption text-foreground">{id}</dd>
        </div>
      </dl>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-2 !border-surface !bg-fg-muted"
      />
    </div>
  )
}
