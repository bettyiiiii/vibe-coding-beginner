import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import {
  ArrowLeft, CheckCircle2,
  Edit3, Save, X, Eye, Copy, Check, Download, RotateCcw
} from 'lucide-react'
import { useProgress } from '../hooks/useProgress'

// 使用 import.meta.glob 静态声明所有 MDX 模块（构建时分析，运行时动态加载）
const mdxModules = import.meta.glob('../content/*.mdx')

const chapterMap = {
  'ch01-tool-overview': 'ch01-tool-overview.mdx',
  'ch02-basics': 'ch02-basics.mdx',
  'ch03-prompt-engineering': 'ch03-prompt-engineering.mdx',
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
  'ch03-prompt-engineering': { title: '提示词工程', num: '03' },
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

const allChapterIds = Object.keys(chapterTitles)

export default function ChapterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mdxModule, setMdxModule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { progress, markRead, isCompleted } = useProgress()

  // 编辑模式状态
  const [editing, setEditing] = useState(false)
  const [mdxSource, setMdxSource] = useState('')
  const [savedToast, setSavedToast] = useState(false)
  const [copiedToast, setCopiedToast] = useState(false)

  const mdxFile = chapterMap[id]
  const chapterInfo = chapterTitles[id]
  const completed = isCompleted(id)

  const currentIndex = allChapterIds.indexOf(id)
  const prevId = currentIndex > 0 ? allChapterIds[currentIndex - 1] : null
  const nextId = currentIndex < allChapterIds.length - 1 ? allChapterIds[currentIndex + 1] : null

  // 加载 MDX 内容
  useEffect(() => {
    if (!mdxFile) {
      setLoading(false)
      setError('章节不存在')
      return
    }

    setLoading(true)
    setError(null)

    const modulePath = `../content/${mdxFile}`
    if (mdxModules[modulePath]) {
      mdxModules[modulePath]().then(mod => {
        setMdxModule(() => mod.default || mod)
        setLoading(false)
      }).catch(err => {
        console.error('Failed to load MDX:', err)
        setError('加载章节内容失败')
        setLoading(false)
      })
    } else {
      setError(`模块未找到: ${modulePath}`)
      setLoading(false)
    }
  }, [id, mdxFile])

  // 加载原始 MDX 源码（用于编辑模式）
  const loadMdxSource = useCallback(async () => {
    try {
      // 动态导入原始文件内容
      const res = await fetch(`/src/content/${mdxFile}`)
      if (!res.ok) throw new Error('无法加载源文件')
      const text = await res.text()
      setMdxSource(text)
    } catch {
      // fallback: 从已知的章节内容中获取（生产环境可能无法直接fetch源文件）
      setMdxSource(`# ${chapterInfo?.title || id}\n\n> 正在编辑此章节内容...\n\n在此处修改 Markdown 内容。`)
    }
  }, [mdxFile, chapterInfo])

  // 切换编辑模式
  const toggleEdit = async () => {
    if (!editing) {
      await loadMdxSource()
      setEditing(true)
    } else {
      setEditing(false)
    }
  }

  // 保存到 localStorage（本地草稿）
  const handleSaveDraft = () => {
    const key = `mdx-draft-${id}`
    localStorage.setItem(key, mdxSource)
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2000)
  }

  // 复制到剪贴板
  const handleCopy = () => {
    navigator.clipboard.writeText(mdxSource).then(() => {
      setCopiedToast(true)
      setTimeout(() => setCopiedToast(false), 2000)
    })
  }

  // 下载编辑后的文件
  const handleDownload = () => {
    const blob = new Blob([mdxSource], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mdxFile
    a.click()
    URL.revokeObjectURL(url)
  }

  // 重置为原始内容
  const handleReset = async () => {
    await loadMdxSource()
  }

  if (!chapterInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">章节不存在</h1>
          <Link to="/chapters" className="btn btn-primary">
            返回章节列表
          </Link>
        </div>
      </div>
    )
  }

  const MdxContent = mdxModule

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== 顶部导航栏（响应式）===== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between py-2.5 min-h-[52px]">
          <Link
            to="/chapters"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 no-underline transition-colors shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline whitespace-nowrap">全部章节</span>
          </Link>

          <h2 className="text-sm font-semibold text-gray-800 truncate px-2 hidden sm:block max-w-[40%]">
            第{chapterInfo.num}章 · {chapterInfo.title}
          </h2>

          <div className="flex items-center gap-2 shrink-0">
            {/* 编辑按钮 */}
            <button
              onClick={toggleEdit}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                editing
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
              }`}
              title={editing ? '退出编辑' : '编辑内容'}
            >
              {editing ? <Eye size={14} /> : <Edit3 size={14} />}
              <span className="hidden sm:inline">{editing ? '预览' : '编辑'}</span>
            </button>

            {/* 完成标记按钮 */}
            <button
              onClick={() => markRead(id)}
              className={`btn text-xs py-1.5 px-2.5 ${completed ? 'btn-secondary' : 'btn-primary'}`}
            >
              {completed ? (
                <><CheckCircle2 size={13} /><span className="hidden sm:inline ml-1">已完成</span></>
              ) : (
                '标记完成'
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* ===== 编辑模式 ===== */}
        {editing && (
          <div className="editor-panel mb-6 animate-fade-in-up">
            {/* 编辑器工具栏 */}
            <div className="editor-toolbar">
              <div className="toolbar-left">
                <span className="toolbar-title">
                  <Edit3 size={14} />
                  编辑模式 — {mdxFile}
                </span>
                <span className="toolbar-hint">（修改后可下载或复制，手动同步到 GitHub）</span>
              </div>
              <div className="toolbar-actions">
                <button onClick={handleReset} className="toolbar-btn" title="重置为原始内容">
                  <RotateCcw size={14} /> 重置
                </button>
                <button onClick={handleCopy} className="toolbar-btn" title="复制到剪贴板">
                  {copiedToast ? <Check size={14} /> : <Copy size={14} />}
                  {copiedToast ? '已复制' : '复制'}
                </button>
                <button onClick={handleDownload} className="toolbar-btn toolbar-btn-primary" title="下载文件">
                  <Download size={14} /> 下载
                </button>
                <button onClick={handleSaveDraft} className="toolbar-btn toolbar-btn-save" title="保存草稿到本地">
                  {savedToast ? <Check size={14} /> : <Save size={14} />}
                  {savedToast ? '已保存!' : '存草稿'}
                </button>
              </div>
            </div>

            {/* 编辑区 */}
            <textarea
              className="editor-textarea"
              value={mdxSource}
              onChange={e => setMdxSource(e.target.value)}
              spellCheck={false}
              placeholder="在此编写 Markdown 内容..."
            />
          </div>
        )}

        {/* ===== 主内容区（响应式两栏）===== */}
        <div className="detail-layout">
          {/* 左侧：文章主体 */}
          <article className="detail-main">
            {/* 章节标题卡片 */}
            <div className="card p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
                  第 {chapterInfo.num} 章
                </span>
                {completed && (
                  <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-md">
                    <CheckCircle2 size={13} /> 已完成
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {chapterInfo.title}
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm">
                发布于 2026 年 6 月 · 预计阅读 15–30 分钟
              </p>
            </div>

            {/* MDX 渲染区 */}
            <div className="card p-4 sm:p-6 lg:p-8">
              {loading && (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin text-3xl mb-4">🌀</div>
                  <p className="text-gray-500 text-sm">正在加载章节内容...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-16 text-red-500">
                  <div className="text-3xl mb-4">😢</div>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {!loading && !error && MdxContent && (
                <div className="mdx-body prose-custom">
                  <MdxContent />
                </div>
              )}
            </div>

            {/* 上下章导航（移动端友好） */}
            <nav className="chapter-nav mt-6 sm:mt-8">
              {prevId ? (
                <Link to={`/chapter/${prevId}`} className="chapter-nav-link chapter-nav-prev">
                  <ArrowLeft size={16} />
                  <div className="nav-link-text">
                    <span className="nav-label">上一章</span>
                    <span className="nav-title">{chapterTitles[prevId]?.title}</span>
                  </div>
                </Link>
              ) : <div />}
              {nextId ? (
                <Link to={`/chapter/${nextId}`} className="chapter-nav-link chapter-nav-next">
                  <div className="nav-link-text">
                    <span className="nav-label">下一章</span>
                    <span className="nav-title">{chapterTitles[nextId]?.title}</span>
                  </div>
                  <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                </Link>
              ) : (
                <Link to="/chapters" className="chapter-nav-link chapter-nav-next">
                  <div className="nav-link-text">
                    <span className="nav-label">完成学习！</span>
                    <span className="nav-title">返回列表</span>
                  </div>
                  <ArrowLeft size={16} style={{ transform: 'rotate(-90deg)' }} />
                </Link>
              )}
            </nav>
          </article>
        </div>
      </div>
    </div>
  )
}
