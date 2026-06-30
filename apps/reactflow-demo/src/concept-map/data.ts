import type { ConceptSeed } from './types'

// 中性的「知識庫概念分類樹」seed —— 根 → 領域 → 主題 → 子概念。
// 可辨識的真實業務場景（軟體工程知識庫），非 Option A/B/C 抽象佔位。
// Fork user 替換為自家的分類體系即可。
export const SEED_CONCEPTS: ConceptSeed[] = [
  {
    id: 'kb',
    label: 'Engineering Knowledge Base',
    description: '團隊技術知識的根節點，往下依領域分類。',
    category: 'Root',
    color: 'neutral',
    children: [
      {
        id: 'frontend',
        label: 'Frontend',
        description: '使用者介面與互動層的所有主題。',
        category: 'Domain',
        color: 'blue',
        children: [
          {
            id: 'fe-frameworks',
            label: 'Frameworks',
            description: 'UI 框架與 rendering 模型。',
            category: 'Topic',
            color: 'blue',
            children: [
              { id: 'react', label: 'React', description: 'Component model、hooks、RSC。', category: 'Concept', color: 'blue' },
              { id: 'vue', label: 'Vue', description: 'Reactivity system、SFC。', category: 'Concept', color: 'blue' },
            ],
          },
          {
            id: 'fe-styling',
            label: 'Styling',
            description: '樣式策略與設計系統。',
            category: 'Topic',
            color: 'indigo',
            children: [
              { id: 'tailwind', label: 'Tailwind CSS', description: 'Utility-first、design token。', category: 'Concept', color: 'indigo' },
              { id: 'design-system', label: 'Design System', description: 'Primitive、token、composition。', category: 'Concept', color: 'indigo' },
            ],
          },
        ],
      },
      {
        id: 'backend',
        label: 'Backend',
        description: '伺服器端邏輯、API 與儲存。',
        category: 'Domain',
        color: 'green',
        children: [
          {
            id: 'be-api',
            label: 'API Design',
            description: '對外介面的設計風格。',
            category: 'Topic',
            color: 'green',
            children: [
              { id: 'rest', label: 'REST', description: '資源導向、HTTP 動詞。', category: 'Concept', color: 'green' },
              { id: 'graphql', label: 'GraphQL', description: 'Schema、resolver、單一 endpoint。', category: 'Concept', color: 'green' },
            ],
          },
          {
            id: 'be-data',
            label: 'Data Stores',
            description: '持久化資料的選型。',
            category: 'Topic',
            color: 'turquoise',
            children: [
              { id: 'postgres', label: 'PostgreSQL', description: '關聯式、ACID、SQL。', category: 'Concept', color: 'turquoise' },
              { id: 'redis', label: 'Redis', description: '記憶體快取、key-value。', category: 'Concept', color: 'turquoise' },
            ],
          },
        ],
      },
      {
        id: 'infra',
        label: 'Infrastructure',
        description: '部署、可觀測性與可靠度。',
        category: 'Domain',
        color: 'orange',
        children: [
          { id: 'ci-cd', label: 'CI / CD', description: '自動建置、測試、發佈流程。', category: 'Topic', color: 'orange' },
          { id: 'observability', label: 'Observability', description: 'Logs、metrics、traces。', category: 'Topic', color: 'amber' },
        ],
      },
    ],
  },
]
