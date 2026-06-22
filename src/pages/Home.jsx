import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const chapters = [
  { id: 'ch01-tool-overview', num: '01', title: 'AI 工具全景', desc: '认识主流 AI 编程工具，选对武器才能事半功倍', icon: '🛠️' },
  { id: 'ch02-basics', num: '02', title: '编程基础', desc: '从零理解代码：变量、函数、条件、循环', icon: '📚' },
  { id: 'ch03-prompt-engineering', num: '03', title: '提示词工程', desc: '学会和 AI 说话，让它听懂你的想法', icon: '💬' },
  { id: 'ch04-read-code', num: '04', title: '读懂 AI 代码', desc: '三层阅读法 + 精准修改技巧', icon: '🔍' },
  { id: 'ch05-dom-api', num: '05', title: 'DOM + API', desc: '让页面活起来，连接外部数据', icon: '🌐' },
  { id: 'ch06-project', num: '06', title: '完整项目实战', desc: '从想法到上线，做出你的第一个作品', icon: '🚀' },
  { id: 'ch07-frontend-basics', num: '07', title: '前端开发基础', desc: 'HTML/CSS/JS + React/Vue 框架实战', icon: '🎨' },
  { id: 'ch08-backend-basics', num: '08', title: '后端开发入门', desc: 'Node.js/Python + 数据库设计 + API', icon: '⚙️' },
  { id: 'ch09-fullstack-project', num: '09', title: '全栈项目实战', desc: '前后端联调 + DevOps + CI/CD 部署', icon: '🚀' },
  { id: 'ch10-performance-optimization', num: '10', title: '前端性能优化', desc: '核心Web指标、代码分割、懒加载、缓存策略', icon: '⚡' },
  { id: 'ch11-engineering-practices', num: '11', title: '前端工程化实践', desc: '代码规范、Git工作流、CI/CD、自动化测试', icon: '🛠️' },
]

const features = [
  { icon: '🎨', title: '专业设计', desc: '参照 GitHub、Notion、Stripe 设计标准' },
  { icon: '📖', title: '由浅入深', desc: '从零基础到完整项目，循序渐进' },
  { icon: '✨', title: '动画交互', desc: '流畅的动画效果，提升学习体验' },
  { icon: '🎯', title: '实战导向', desc: '每个知识点都有可运行的项目' },
]

const modules = [
  { to: '/module/prompt-library', icon: '📋', title: '提示词模板库', desc: '分类整理的提示词模板，可直接复制使用' },
  { to: '/module/tool-comparison', icon: '🔍', title: 'AI 工具对比', desc: '多维度对比主流 AI 编程工具' },
  { to: '/module/project-ideas', icon: '💡', title: '项目创意库', desc: '20+ 个渐进式项目创意' },
  { to: '/module/troubleshooting', icon: '🔧', title: '常见错误排查', desc: '交互式故障排查指南' },
  { to: '/module/learning-path', icon: '🗺️', title: '学习路径规划', desc: '个性化学习路径生成器' },
]

export default function Home() {
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const els = document.querySelectorAll('.scroll-animate')
      els.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 50) {
          el.classList.add('visible')
        }
      })
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* ===== Hero 区域 ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20 md:py-28">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-animate">
            ✨ Vibe Coding
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed scroll-animate" style={{ animationDelay: '0.2s' }}>
            用 AI 写出你的第一个作品
            <br />
            <span className="text-primary-600 font-medium">零基础也能学会的编程入门指南</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 scroll-animate" style={{ animationDelay: '0.4s' }}>
            <Link to="/chapters" className="btn btn-primary">
              🚀 开始学习
            </Link>
            <Link to="/module/prompt-library" className="btn btn-secondary">
              📋 提示词库
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 特色区域 ===== */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12 scroll-animate">
          💎 为什么选择 Vibe Coding？
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card p-6 text-center scroll-animate"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 章节列表 ===== */}
      <section id="chapters" className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4 scroll-animate">
            📚 学习路线图
          </h2>
          <p className="text-center text-gray-600 mb-12">
            从零基础到完整项目，循序渐进掌握 AI 编程
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch, i) => (
              <Link
                key={ch.id}
                to={`/chapter/${ch.id}`}
                className="card p-6 block hover:shadow-md transition-shadow group scroll-animate"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white text-lg">
                    {ch.icon}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">第 {ch.num} 章</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {ch.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {ch.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 工具模块 ===== */}
      <section id="tools" className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4 scroll-animate">
          🛠️ 实用工具模块
        </h2>
        <p className="text-center text-gray-600 mb-12">
          丰富的学习工具，助你快速掌握 AI 编程
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <Link
              key={m.to}
              to={m.to}
              className="card p-5 block scroll-animate"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{m.icon}</span>
                <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {m.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA 区域 ===== */}
      <section className="bg-primary-600 py-16">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 scroll-animate">
            💎 准备好开始了吗？
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            加入成千上万的初学者，一起用 AI 学编程 ✨
          </p>
          <Link
            to="/chapters"
            className="btn bg-white text-primary-600 hover:bg-gray-100 font-bold"
          >
            🚀 立即开始学习
          </Link>
        </div>
      </section>
    </div>
  )
}
