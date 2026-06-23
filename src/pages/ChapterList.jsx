import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  ArrowLeft, BookOpen, Code2, MessageSquare, Eye, Globe,
  Rocket, Database, ShieldCheck, Wifi, Server, BarChart, Zap,
  CheckCircle2
} from 'lucide-react'

const chapters = [
  // ===== 入门基础 =====
  {
    id: 'ch01-tool-overview', num: '01', title: 'AI 工具全景',
    desc: '认识主流 AI 编程工具，选对武器才能事半功倍',
    icon: <BookOpen size={20} />, color: '#6366F1', bgGradient: 'from-indigo-500 to-purple-600',
    topics: ['ChatGPT', 'Claude', 'Cursor', 'Copilot'], category: '入门基础',
  },
  {
    id: 'ch02-basics', num: '02', title: '编程基础',
    desc: '从零理解代码：变量、函数、条件、循环',
    icon: <Code2 size={20} />, color: '#22C55E', bgGradient: 'from-green-500 to-emerald-600',
    topics: ['变量', '函数', '条件', '循环'], category: '入门基础',
  },
  {
    id: 'ch03-prompt-engineering', num: '03', title: '提示词工程',
    desc: '学会和 AI 说话，让它听懂你的想法',
    icon: <MessageSquare size={20} />, color: '#EC4899', bgGradient: 'from-pink-500 to-rose-600',
    topics: ['四要素', '三层拆解', '提示词模版'], category: '入门基础',
  },
  {
    id: 'ch04-read-code', num: '04', title: '读懂 AI 代码',
    desc: '三层阅读法 + 精准修改技巧',
    icon: <Eye size={20} />, color: '#14B8A6', bgGradient: 'from-teal-500 to-cyan-600',
    topics: ['逐行解释', '精准修改', '调试技巧'], category: '入门基础',
  },
  {
    id: 'ch05-dom-api', num: '05', title: 'DOM + API',
    desc: '让页面活起来，连接外部数据',
    icon: <Globe size={20} />, color: '#F59E0B', bgGradient: 'from-amber-500 to-orange-600',
    topics: ['DOM操作', 'Fetch API', '事件处理'], category: '入门基础',
  },
  {
    id: 'ch06-project', num: '06', title: '完整项目实战',
    desc: '从想法到上线，做出你的第一个作品',
    icon: <Rocket size={20} />, color: '#8B5CF6', bgGradient: 'from-violet-500 to-purple-600',
    topics: ['项目规划', '代码审查', '部署上线'], category: '入门基础',
  },

  // ===== 前端进阶 =====
  {
    id: 'ch07-frontend-basics', num: '07', title: '前端开发基础',
    desc: 'HTML/CSS/JS + React/Vue 框架实战',
    icon: <BookOpen size={20} />, color: '#3B82F6', bgGradient: 'from-blue-500 to-indigo-600',
    topics: ['HTML/CSS', 'JavaScript', 'React', 'Vue'], category: '前端开发',
  },
  {
    id: 'ch12-vue-practical', num: '12', title: 'Vue 框架实战',
    desc: 'Vue 3 组合式 API、组件开发与路由管理',
    icon: <Code2 size={20} />, color: '#10B981', bgGradient: 'from-emerald-500 to-green-600',
    topics: ['组合式API', '组件通信', 'Pinia'], category: '前端开发',
  },
  {
    id: 'ch13-state-management', num: '13', title: '状态管理进阶',
    desc: '掌握 Pinia 状态管理，全局状态共享',
    icon: <BarChart size={20} />, color: '#A855F7', bgGradient: 'from-purple-500 to-violet-600',
    topics: ['Pinia Store', '状态持久化'], category: '前端开发',
  },
  {
    id: 'ch10-performance-optimization', num: '10', title: '前端性能优化',
    desc: '核心 Web 指标、代码分割、懒加载策略',
    icon: <Zap size={20} />, color: '#F97316', bgGradient: 'from-orange-500 to-red-500',
    topics: ['LCP/INP/CLS', '代码分割', '缓存策略'], category: '前端开发',
  },
  {
    id: 'ch11-engineering-practices', num: '11', title: '前端工程化实践',
    desc: '代码规范、Git 工作流、CI/CD 自动化',
    icon: <ShieldCheck size={20} />, color: '#EC4899', bgGradient: 'from-pink-500 to-rose-500',
    topics: ['ESLint', 'Husky', 'GitHub Actions'], category: '前端开发',
  },

  // ===== 后端 & 全栈 =====
  {
    id: 'ch08-backend-basics', num: '08', title: '后端开发入门',
    desc: 'Node.js/Python + 数据库设计 + API 开发',
    icon: <Code2 size={20} />, color: '#6366F1', bgGradient: 'from-indigo-500 to-blue-600',
    topics: ['Node.js', '数据库', 'REST API'], category: '后端全栈',
  },
  {
    id: 'ch09-fullstack-project', num: '09', title: '全栈项目实战',
    desc: '前后端联调 + DevOps + CI/CD 部署',
    icon: <Rocket size={20} />, color: '#059669', bgGradient: 'from-green-600 to-emerald-700',
    topics: ['DevOps', 'CI/CD', 'Docker 部署'], category: '后端全栈',
  },
  {
    id: 'ch14-database-optimization', num: '14', title: '数据库优化',
    desc: 'SQL 查询优化、索引设计、NoSQL 选型',
    icon: <Database size={20} />, color: '#6366F1', bgGradient: 'from-indigo-500 to-violet-600',
    topics: ['索引优化', '查询优化', 'Redis'], category: '后端全栈',
  },
  {
    id: 'ch15-user-auth', num: '15', title: '用户认证与授权',
    desc: 'JWT、OAuth 2.0、Session、RBAC 权限控制',
    icon: <ShieldCheck size={20} />, color: '#EF4444', bgGradient: 'from-red-500 to-rose-600',
    topics: ['JWT', 'OAuth', 'RBAC 权限'], category: '后端全栈',
  },

  // ===== 架构 & 安全 =====
  {
    id: 'ch16-microservices', num: '16', title: '微服务架构',
    desc: '服务拆分、API 网关、服务发现与配置管理',
    icon: <Server size={20} />, color: '#F97316', bgGradient: 'from-orange-500 to-amber-600',
    topics: ['微服务设计', 'API 网关', '服务发现'], category: '架构安全',
  },
  {
    id: 'ch17-security', num: '17', title: '安全防护实战',
    desc: 'XSS、CSRF、SQL 注入防护，HTTPS 配置',
    icon: <ShieldCheck size={20} />, color: '#F43F5E', bgGradient: 'from-rose-500 to-pink-600',
    topics: ['XSS/CSRF', 'SQL注入', 'HTTPS'], category: '架构安全',
  },
  {
    id: 'ch18-websocket', num: '18', title: 'WebSocket 实时通信',
    desc: 'Socket.io 实战、实时聊天室、协同编辑',
    icon: <Wifi size={20} />, color: '#06B6D4', bgGradient: 'from-cyan-500 to-teal-600',
    topics: ['WebSocket', 'Socket.io', '实时聊天'], category: '架构安全',
  },
  {
    id: 'ch19-graphql', num: '19', title: 'GraphQL API 开发',
    desc: 'Schema 设计、Apollo Server/Client 性能优化',
    icon: <Code2 size={20} />, color: '#EC4899', bgGradient: 'from-pink-500 to-fuchsia-600',
    topics: ['GraphQL', 'Apollo', 'Resolver'], category: '架构安全',
  },
  {
    id: 'ch20-serverless', num: '20', title: 'Serverless 无服务器架构',
    desc: 'AWS Lambda、Vercel Functions、BFF 层设计',
    icon: <Server size={20} />, color: '#8B5CF6', bgGradient: 'from-violet-500 to-purple-600',
    topics: ['Lambda', 'Vercel Functions', 'BFF'], category: '架构安全',
  },
  {
    id: 'ch21-monitoring', num: '21', title: '监控与日志',
    desc: '应用监控、日志管理、错误追踪与性能分析',
    icon: <BarChart size={20} />, color: '#D97706', bgGradient: 'from-amber-600 to-orange-700',
    topics: ['APM', '错误追踪', '告警系统'], category: '架构安全',
  },

  // ===== 项目实战 =====
  {
    id: 'ch22-ecommerce-project', num: '22', title: '电商网站项目',
    desc: '从零到一构建电商网站，涵盖核心功能模块',
    icon: <Rocket size={20} />, color: '#2563EB', bgGradient: 'from-blue-600 to-indigo-700',
    topics: ['商品展示', '购物车', '支付流程'], category: '项目实战',
  },
  {
    id: 'ch23-social-project', num: '23', title: '社交平台项目',
    desc: '构建社交平台，实现动态流与实时通知系统',
    icon: <Globe size={20} />, color: '#4F46E5', bgGradient: 'from-indigo-600 to-violet-700',
    topics: ['动态流', '评论点赞', '实时通知'], category: '项目实战',
  },
  {
    id: 'ch24-dataviz', num: '24', title: '数据可视化项目',
    desc: 'D3.js、ECharts、Chart.js 图表开发实战',
    icon: <BarChart size={20} />, color: '#0D9488', bgGradient: 'from-teal-600 to-cyan-700',
    topics: ['D3.js', 'ECharts', '仪表盘'], category: '项目实战',
  },
]

export default function ChapterList() {
  const location = useLocation()
  const [progress, setProgress] = useState({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vibe-coding-progress')
      if (saved) setProgress(JSON.parse(saved))
    } catch (e) { /* ignore */ }
  }, [])

  const completedCount = Object.values(progress).filter(Boolean).length
  const totalChapters = chapters.length
  const progressPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0

  return (
    <div className="chapter-list-page">
      {/* 页头 */}
      <header className="chapter-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} />
            <span>返回首页</span>
          </Link>

          <div className="header-content">
            <h1 className="header-title">
              <span className="title-icon">📚</span>
              全部章节
            </h1>
            <p className="header-desc">
              从零基础到完整项目，循序渐进掌握 AI 编程。共 {totalChapters} 章，建议按顺序学习。
            </p>
          </div>

          {/* 总进度条 */}
          <div className="progress-card">
            <div className="progress-info">
              <span className="progress-label">整体学习进度</span>
              <span className="progress-value">
                <strong>{completedCount}</strong>/{totalChapters} 章
                <span className="progress-percent">{progressPercent}%</span>
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </header>

      {/* 分类标签栏（可选快速跳转） */}
      <div className="category-bar">
        <div className="container">
          <div className="category-pills">
            <span className="category-pill active">全部 ({totalChapters})</span>
            <span className="category-pill">入门基础</span>
            <span className="category-pill">前端开发</span>
            <span className="category-pill">后端全栈</span>
            <span className="category-pill">架构安全</span>
            <span className="category-pill">项目实战</span>
          </div>
        </div>
      </div>

      {/* 章节卡片网格 */}
      <main className="chapter-grid-section">
        <div className="container">
          <div className="chapter-grid">
            {chapters.map((ch, i) => {
              const isCompleted = progress[ch.id]
              return (
                <Link
                  key={ch.id}
                  to={`/chapter/${ch.id}`}
                  className={`chapter-card ${isCompleted ? 'completed' : ''}`}
                  style={{ animationDelay: `${(i % 6) * 60}ms` }}
                >
                  {/* 卡片顶部色条 */}
                  <div className={`card-color-bar bg-gradient-to-r ${ch.bgGradient}`} />

                  <div className="card-body">
                    {/* 头部：序号 + 图标 + 完成标记 */}
                    <div className="card-top">
                      <div className={`card-icon-wrapper`} style={{ backgroundColor: ch.color + '15', color: ch.color }}>
                        {ch.icon}
                      </div>
                      <div className="card-meta">
                        <span className="card-num">第 {ch.num} 章</span>
                        <span className="card-category">{ch.category}</span>
                      </div>
                      {isCompleted && (
                        <span className="completed-badge">
                          <CheckCircle2 size={14} />
                          已完成
                        </span>
                      )}
                    </div>

                    {/* 标题 */}
                    <h3 className="card-title">{ch.title}</h3>

                    {/* 简介 */}
                    <p className="card-desc">{ch.desc}</p>

                    {/* 知识点标签 */}
                    <div className="card-tags">
                      {ch.topics.map(t => (
                        <span key={t} className="card-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* 悬停指示器 */}
                  <div className="card-hover-hint">
                    <span>开始学习</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
