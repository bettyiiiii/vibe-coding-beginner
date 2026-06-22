import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BookOpen, Code2, MessageSquare, Eye, Globe, Rocket, CheckCircle2, ArrowLeft, Database, Shield, Wifi, Server, BarChart } from 'lucide-react'

const chapters = [
  {
    id: 'ch01-tool-overview',
    num: '01',
    title: 'AI 工具全景',
    desc: '认识主流 AI 编程工具，选对武器才能事半功倍',
    icon: <BookOpen size={20} />,
    color: 'bg-pink-600',
    topics: ['ChatGPT', 'Claude', 'Cursor', 'Copilot', 'Replit'],
  },
  {
    id: 'ch02-basics',
    num: '02',
    title: '编程基础',
    desc: '从零理解代码：变量、函数、条件、循环',
    icon: <Code2 size={20} />,
    color: 'bg-green-500',
    topics: ['变量', '函数', '条件', '循环', '数组', '对象'],
  },
  {
    id: 'ch03-promptengineering',
    num: '03',
    title: '提示词工程',
    desc: '学会和 AI 说话，让它听懂你的想法',
    icon: <MessageSquare size={20} />,
    color: 'bg-pink-500',
    topics: ['四要素', '三层拆解', '提示词模版', '调试技巧'],
  },
  {
    id: 'ch04-read-code',
    num: '04',
    title: '读懂 AI 代码',
    desc: '三层阅读法 + 精准修改技巧',
    icon: <Eye size={20} />,
    color: 'bg-emerald-500',
    topics: ['三层阅读法', '逐行解释', '精准修改', '调试技巧'],
  },
  {
    id: 'ch05-dom-api',
    num: '05',
    title: 'DOM + API',
    desc: '让页面活起来，连接外部数据',
    icon: <Globe size={20} />,
    color: 'bg-amber-500',
    topics: ['DOM操作', '事件处理', 'Fetch API', '实战项目'],
  },
  {
    id: 'ch06-project',
    num: '06',
    title: '完整项目实战',
    desc: '从想法到上线，做出你的第一个作品',
    icon: <Rocket size={20} />,
    color: 'bg-pink-700',
    topics: ['项目规划', '提示词设计', '代码审查', '部署上线'],
  },
  // 技术干货 - 前端
  {
    id: 'ch07-frontend-basics',
    num: '07',
    title: '前端开发基础',
    desc: 'HTML/CSS/JS 基础 + React/Vue 框架实战',
    icon: <BookOpen size={20} />,
    color: 'bg-blue-500',
    topics: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue'],
  },
  {
    id: 'ch12-vue-practical',
    num: '12',
    title: 'Vue 框架实战',
    desc: '深入学习 Vue 3 组合式 API、组件开发、路由管理',
    icon: <Code2 size={20} />,
    color: 'bg-green-600',
    topics: ['Vue 3', '组合式 API', '组件通信', 'Vue Router', 'Pinia'],
  },
  {
    id: 'ch13-state-management',
    num: '13',
    title: '状态管理进阶',
    desc: '掌握 Pinia 状态管理，实现全局状态共享',
    icon: <BarChart size={20} />,
    color: 'bg-purple-500',
    topics: ['Pinia', 'Store', '状态持久化', '组合式 Store'],
  },
  // 技术干货 - 后端
  {
    id: 'ch08-backend-basics',
    num: '08',
    title: '后端开发入门',
    desc: 'Node.js/Python + 数据库设计 + API 开发',
    icon: <Code2 size={20} />,
    color: 'bg-pink-600',
    topics: ['Node.js', 'Python', '数据库', 'API设计', '认证'],
  },
  {
    id: 'ch14-database-optimization',
    num: '14',
    title: '数据库优化',
    desc: 'SQL 查询优化、索引设计、NoSQL 选择',
    icon: <Database size={20} />,
    color: 'bg-indigo-500',
    topics: ['索引优化', '查询优化', '数据库范式', 'Redis', 'MongoDB'],
  },
  {
    id: 'ch15-user-auth',
    num: '15',
    title: '用户认证与授权',
    desc: 'JWT、OAuth 2.0、Session、RBAC 权限控制',
    icon: <Shield size={20} />,
    color: 'bg-red-500',
    topics: ['JWT', 'OAuth', 'Session', 'RBAC', '安全'],
  },
  {
    id: 'ch16-microservices',
    num: '16',
    title: '微服务架构',
    desc: '服务拆分、API 网关、服务发现、配置管理',
    icon: <Server size={20} />,
    color: 'bg-orange-500',
    topics: ['微服务设计', 'API 网关', '服务发现', '配置管理', '分布式追踪'],
  },
  {
    id: 'ch17-security',
    num: '17',
    title: '安全防护实战',
    desc: 'XSS、CSRF、SQL 注入防护，HTTPS 配置',
    icon: <Shield size={20} />,
    color: 'bg-rose-500',
    topics: ['XSS', 'CSRF', 'SQL注入', 'HTTPS', '安全 Headers'],
  },
  // 技术干货 - 全栈
  {
    id: 'ch09-fullstack-project',
    num: '09',
    title: '全栈项目实战',
    desc: '前后端联调 + DevOps + CI/CD 部署',
    icon: <Rocket size={20} />,
    color: 'bg-emerald-500',
    topics: ['全栈架构', 'DevOps', 'CI/CD', 'Docker', '部署'],
  },
  {
    id: 'ch18-websocket',
    num: '18',
    title: 'WebSocket 实时通信',
    desc: 'Socket.io 实战、实时聊天室、协同编辑',
    icon: <Wifi size={20} />,
    color: 'bg-cyan-500',
    topics: ['WebSocket', 'Socket.io', '实时聊天', '房间', '命名空间'],
  },
  {
    id: 'ch19-graphql',
    num: '19',
    title: 'GraphQL API 开发',
    desc: 'GraphQL Schema 设计、Apollo Server/Client、性能优化',
    icon: <Code2 size={20} />,
    color: 'bg-pink-500',
    topics: ['GraphQL', 'Apollo', 'Schema', 'Resolver', '性能优化'],
  },
  {
    id: 'ch20-serverless',
    num: '20',
    title: 'Serverless 无服务器架构',
    desc: 'AWS Lambda、Vercel Functions、BFF 层设计',
    icon: <Server size={20} />,
    color: 'bg-violet-500',
    topics: ['Serverless', 'Lambda', 'Vercel Functions', 'BFF', '定时任务'],
  },
  {
    id: 'ch21-monitoring',
    num: '21',
    title: '监控与日志',
    desc: '应用监控、日志管理、错误追踪、性能分析',
    icon: <BarChart size={20} />,
    color: 'bg-amber-600',
    topics: ['日志', '错误追踪', 'APM', '指标监控', '告警'],
  },
  // 项目实战
  {
    id: 'ch22-ecommerce-project',
    num: '22',
    title: '项目实战：电商网站',
    desc: '从零到一构建电商网站，涵盖核心功能',
    icon: <Rocket size={20} />,
    color: 'bg-blue-600',
    topics: ['商品展示', '购物车', '订单', '支付', '用户中心'],
  },
  {
    id: 'ch23-social-project',
    num: '23',
    title: '项目实战：社交平台',
    desc: '构建社交平台，实现动态流、实时通知',
    icon: <Globe size={20} />,
    color: 'bg-indigo-600',
    topics: ['用户关系', '动态流', '评论点赞', '实时通知', '私信'],
  },
  {
    id: 'ch24-dataviz',
    num: '24',
    title: '项目实战：数据可视化',
    desc: 'D3.js、ECharts、Chart.js 数据图表开发',
    icon: <BarChart size={20} />,
    color: 'bg-teal-500',
    topics: ['D3.js', 'ECharts', 'Chart.js', 'React 集成', '仪表盘'],
  },
  // 工程化
  {
    id: 'ch10-performance-optimization',
    num: '10',
    title: '前端性能优化',
    desc: '核心 Web 指标、代码分割、懒加载、缓存策略',
    icon: <Zap size={20} />,
    color: 'bg-amber-500',
    topics: ['LCP', 'INP', 'CLS', '代码分割', '懒加载', '缓存'],
  },
  {
    id: 'ch11-engineering-practices',
    num: '11',
    title: '前端工程化实践',
    desc: '代码规范、Git 工作流、CI/CD、自动化测试',
    icon: <ShieldCheck size={20} />,
    color: 'bg-pink-500',
    topics: ['ESLint', 'Prettier', 'Husky', 'GitHub Actions', '测试'],
  },
]

export default function ChapterList() {
  const location = useLocation()
  const [progress, setProgress] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem('vibe-coding-progress')
    if (saved) {
      setProgress(JSON.parse(saved))
    }
  }, [])

  const completedCount = Object.values(progress).filter(Boolean).length
  const totalChapters = chapters.length
  const progressPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12">
        {/* 返回首页 */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-pink-600 mb-8 no-underline"
        >
          <ArrowLeft size={16} /> 返回首页
        </Link>

        {/* 页面标题 */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📚 全部章节
          </h1>
          <p className="text-gray-600 max-w-2xl">
            从零基础到完整项目，循序渐进掌握 AI 编程。每章约 15-30 分钟，建议按顺序学习。
          </p>
        </div>

        {/* 进度条 */}
        <div className="bg-white rounded-xl p-6 mb-10 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">学习进度</span>
            <span className="text-sm text-gray-500">{completedCount}/{totalChapters} 章已完成 ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-pink-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 章节卡片 */}
        <div className="grid gap-6">
          {chapters.map((ch, i) => {
            const isCompleted = progress[ch.id]
            return (
              <Link
                key={ch.id}
                to={`/chapter/${ch.id}`}
                className="card p-6 block group"
              >
                <div className="flex items-start gap-5">
                  {/* 序号 + 图标 */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl ${ch.color} flex items-center justify-center text-white group-hover:scale-105 transition-transform`}>
                      {ch.icon}
                    </div>
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-gray-400">第 {ch.num} 章</span>
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-500">
                          <CheckCircle2 size={14} /> 已完成
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors mb-2">
                      {ch.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {ch.desc}
                    </p>
                    {/* 知识点标签 */}
                    <div className="flex flex-wrap gap-2">
                      {ch.topics.map(t => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 箭头 */}
                  <div className="flex-shrink-0 self-center">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
