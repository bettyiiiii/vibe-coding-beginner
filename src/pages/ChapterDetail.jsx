import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'

// 使用 import.meta.glob 动态导入所有 MDX 文件
const mdxModules = import.meta.glob('../content/*.mdx', { eager: false })

const chapterMap = {
  'ch01-tool-overview': 'ch01-tool-overview.mdx',
  'ch02-basics': 'ch02-basics.mdx',
  'ch03-promptengineering': 'ch03-promptengineering.mdx',
  'ch04-read-code': 'ch04-read-code.mdx',
  'ch05-dom-api': 'ch05-dom-api.mdx',
  'ch06-project': 'ch06-project.mdx',
  'ch07-frontend-basics': 'ch07-frontend-basics.mdx',
  'ch08-backend-basics': 'ch08-backend-basics.mdx',
  'ch09-fullstack-project': 'ch09-fullstack-project.mdx',
  'ch10-performance-optimization': 'ch10-performance-optimization.mdx',
  'ch11-engineering-practices': 'ch11-engineering-practices.mdx',
  'ch12-vue-practical': 'ch12-vue-practical.mdx',
  'ch13-state-management': 'ch13-state-management.mdx',
  'ch14-database-optimization': 'ch14-database-optimization.mdx',
  'ch15-user-auth': 'ch15-user-auth.mdx',
  'ch16-microservices': 'ch16-microservices.mdx',
  'ch17-security': 'ch17-security.mdx',
  'ch18-websocket': 'ch18-websocket.mdx',
  'ch19-graphql': 'ch19-graphql.mdx',
  'ch20-serverless': 'ch20-serverless.mdx',
  'ch21-monitoring': 'ch21-monitoring.mdx',
  'ch22-ecommerce-project': 'ch22-ecommerce-project.mdx',
  'ch23-social-project': 'ch23-social-project.mdx',
  'ch24-dataviz': 'ch24-dataviz.mdx',
}

const chapterTitles = {
  'ch01-tool-overview': { title: 'AI 工具全景', num: '01' },
  'ch02-basics': { title: '编程基础', num: '02' },
  'ch03-promptengineering': { title: '提示词工程', num: '03' },
  'ch04-read-code': { title: '读懂 AI 代码', num: '04' },
  'ch05-dom-api': { title: 'DOM + API', num: '05' },
  'ch06-project': { title: '完整项目实战', num: '06' },
  'ch07-frontend-basics': { title: '前端开发基础', num: '07' },
  'ch08-backend-basics': { title: '后端开发入门', num: '08' },
  'ch09-fullstack-project': { title: '全栈项目实战', num: '09' },
  'ch10-performance-optimization': { title: '前端性能优化', num: '10' },
  'ch11-engineering-practices': { title: '前端工程化实践', num: '11' },
  'ch12-vue-practical': { title: 'Vue 框架实战', num: '12' },
  'ch13-state-management': { title: '状态管理进阶', num: '13' },
  'ch14-database-optimization': { title: '数据库优化', num: '14' },
  'ch15-user-auth': { title: '用户认证与授权', num: '15' },
  'ch16-microservices': { title: '微服务架构', num: '16' },
  'ch17-security': { title: '安全防护实战', num: '17' },
  'ch18-websocket': { title: 'WebSocket 实时通信', num: '18' },
  'ch19-graphql': { title: 'GraphQL API 开发', num: '19' },
  'ch20-serverless': { title: 'Serverless 无服务器架构', num: '20' },
  'ch21-monitoring': { title: '监控与日志', num: '21' },
  'ch22-ecommerce-project': { title: '项目实战：电商网站', num: '22' },
  'ch23-social-project': { title: '项目实战：社交平台', num: '23' },
  'ch24-dataviz': { title: '项目实战：数据可视化', num: '24' },
}

export default function ChapterDetail() {
  const { id } = useParams()
  const [mdxContent, setMdxContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { progress, markComplete } = useProgress()

  const mdxFile = chapterMap[id]
  const chapterInfo = chapterTitles[id]

  useEffect(() => {
    if (!mdxFile) {
      setLoading(false)
      setError('章节不存在')
      return
    }

    // 使用 import.meta.glob 动态导入
    const loadMdx = async () => {
      try {
        const modulePath = `../content/${mdxFile}`
        
        if (mdxModules[modulePath]) {
          const module = await mdxModules[modulePath]()
          setMdxContent(() => module.default || module)
          setLoading(false)
        } else {
          setError(`模块未找到: ${modulePath}`)
          setLoading(false)
        }
      } catch (err) {
        console.error('Failed to load MDX:', err)
        setError('加载章节内容失败')
        setLoading(false)
      }
    }

    loadMdx()
  }, [mdxFile])

  if (!chapterInfo) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">章节不存在</h1>
        <Link to="/chapters" className="btn btn-primary">
          返回章节列表
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-12 max-w-4xl">
        {/* 返回链接 */}
        <Link
          to="/chapters"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 mb-8 no-underline"
        >
          <ArrowLeft size={16} /> 返回章节列表
        </Link>

        {/* 章节标题区 */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium text-gray-400">第 {chapterInfo.num} 章</span>
            {progress[id] && (
              <span className="inline-flex items-center gap-1 text-xs text-success-500">
                <CheckCircle2 size={14} /> 已完成
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {chapterInfo.title}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => markComplete(id)}
              className={`btn text-sm ${
                progress[id] ? 'btn-secondary' : 'btn-primary'
              }`}
            >
              {progress[id] ? '✓ 已完成' : '标记为已完成'}
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="prose max-w-none">
          {loading && (
            <div className="text-center py-20 text-gray-500">
              正在加载章节内容...
            </div>
          )}
          {error && (
            <div className="text-center py-20 text-danger-500">
              {error}
            </div>
          )}
          {!loading && !error && mdxContent && (
            <div className="mdx-content">
              {typeof mdxContent === 'function' ? mdxContent() : mdxContent}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
