import { Button, Field, FieldLabel, Input, Select, Separator, Tag, Textarea } from '@qijenchen/design-system'
import { ArrowLeftRight, Trash2 } from 'lucide-react'
import { useConceptMap } from './ConceptMapContext'
import type { TagColor } from './types'

const COLOR_OPTIONS: { value: TagColor; label: string }[] = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'turquoise', label: 'Turquoise' },
  { value: 'orange', label: 'Orange' },
  { value: 'amber', label: 'Amber' },
  { value: 'purple', label: 'Purple' },
  { value: 'magenta', label: 'Magenta' },
  { value: 'red', label: 'Red' },
]

export function NodeDetailAside() {
  const { selected, updateConcept, deleteConcept } = useConceptMap()

  if (!selected) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center text-body text-fg-muted">
        點選任一節點以檢視 / 編輯其概念內容。
      </div>
    )
  }

  const { id, data } = selected

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <Tag color={data.color} size="sm">
            {data.category}
          </Tag>
          <span className="text-caption text-fg-muted">
            {data.childCount > 0 ? `${data.childCount} 個子概念` : '葉節點'}
          </span>
        </div>

        <Field>
          <FieldLabel>Label</FieldLabel>
          <Input
            value={data.label}
            onChange={(e) => updateConcept(id, { label: e.target.value })}
            placeholder="概念名稱"
          />
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea
            value={data.description}
            rows={3}
            onChange={(e) => updateConcept(id, { description: e.target.value })}
            placeholder="這個概念的說明"
          />
        </Field>

        <Field>
          <FieldLabel>Category</FieldLabel>
          <Input
            value={data.category}
            onChange={(e) => updateConcept(id, { category: e.target.value })}
            placeholder="分類層級（如 Domain / Topic）"
          />
        </Field>

        <Field>
          <FieldLabel>Color</FieldLabel>
          <Select
            value={data.color}
            options={COLOR_OPTIONS}
            onChange={(value) => updateConcept(id, { color: value as TagColor })}
          />
        </Field>

        <Separator />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ArrowLeftRight size={15} className="text-fg-muted" />
            <span className="text-body font-medium text-foreground">Alternative material</span>
            <span className="text-caption text-fg-muted">
              {data.alternatives?.length ?? 0}
            </span>
          </div>

          {data.alternatives && data.alternatives.length > 0 ? (
            <ul className="flex flex-col gap-1.5">
              {data.alternatives.map((alt) => (
                <li
                  key={alt.code}
                  className="flex items-baseline gap-2 rounded-lg bg-muted px-3 py-2"
                >
                  <span className="shrink-0 font-mono text-caption font-semibold text-foreground">
                    {alt.code}
                  </span>
                  <span className="min-w-0 text-caption text-fg-secondary">{alt.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-caption text-fg-muted">此物料無替代料。</p>
          )}
        </div>

        <Separator />

        <div className="text-caption text-fg-muted">節點 ID：{id}</div>
      </div>

      <div className="flex items-center justify-end border-t border-divider px-4 py-3">
        <Button variant="secondary" danger startIcon={Trash2} onClick={() => deleteConcept(id)}>
          刪除（含子樹）
        </Button>
      </div>
    </div>
  )
}
