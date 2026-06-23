import { Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { CheckCircle2 } from 'lucide-react'
import useProgress from '../hooks/useProgress'

/* ===== 全部 24 章（与 ChapterList.jsx 同步）===== */
const allChapters = [
  // 入门基础
  { id: 'ch01-tool-overview',        num: '01', title: 'AI 工具全景',           category: '入门基础', icon: '🛠️' },
  { id: 'ch02-basics',              num: '02', title: '编程基础',               category: '入门基础', icon: '📚' },
  { id: 'ch03-prompt-engineering',  num: '03', title: '提示词工程',           category: '入门基础', icon: '💬' },
  { id: 'ch04-read-code',           num: '04', title: '读懂 AI 代码',          category: '入门基础', icon: '🔍' },
  { id: 'ch05-dom-api',             num: '05', title: 'DOM + API',            category: '入门基础', icon: '🌐' },
  { id: 'ch06-project',             num: '06', title: '完整项目实战',           category: '入门基础', icon: '🚀' },
  // 前端开发
  { id: 'ch07-frontend-basics',    num: '07', title: '前端开发基础',           category: '前端开发', icon: '🎨' },
  { id: 'ch12-vue-practical',      num: '12', title: 'Vue 框架实战',          category: '前端开发', icon: '📘' },
  { id: 'ch13-state-management',    num: '13', title: '状态管理进阶',           category: '前端开发', icon: '📊' },
  { id: 'ch10-performance-optimization', num:'10', title: '前端性能优化',       category: '前端开发', icon: '⚡' },
  { id: 'ch11-engineering-practices',  num:'11', title: '前端工程化实践',     category: '前端开发', icon: '🛠️' },
  // 后端全栈
  { id: 'ch08-backend-basics',     num: '08', title: '后端开发入门',           category: '后端全栈', icon: '⚙️' },
  { id: 'ch09-fullstack-project',   num: '09', title: '全栈项目实战',           category: '后端全栈', icon: '🚀' },
  { id: 'ch14-database-optimization', num:'14', title: '数据库优化',             category: '后端全栈', icon: '🗄️' },
  { id: 'ch15-user-auth',           num: '15', title: '用户认证与授权',         category: '后端全栈', icon: '🔐' },
  // 架构安全
  { id: 'ch16-microservices',       num: '16', title: '微服务架构',             category: '架构安全', icon: '🖥️' },
  { id: 'ch17-security',            num: '17', title: '安全防护实战',           category: '架构安全', icon: '🛡️' },
  { id: 'ch18-websocket',           num: '18', title: 'WebSocket 实时通信',    category: '架构安全', icon: '📡' },
  { id: 'ch19-graphql',            num: '19', title: 'GraphQL API 开发',     category: '架构安全', icon: '📝' },
  { id: 'ch20-serverless',         num: '20', title: 'Serverless 无服务器',   category: '架构安全', icon: '☁️' },
  { id: 'ch21-monitoring',          num: '21', title: '监控与日志',             category: '架构安全', icon: '📈' },
  // 项目实战
  { id: 'ch22-ecommerce-project',   num: '22', title: '电商网站项目',           category: '项目实战', icon: '🛒' },
  { id: 'ch23-social-project',      num: '23', title: '社交平台项目',           category: '项目实战', icon: '🌐' },
  { id: 'ch24-dataviz',            num: '24', title: '数据可视化项目',         category: '项目实战', icon: '📊' },
]

/* ===== 学习阶段定义 ===== */
const stages = [
  {
    id: 'basics',
    name: '入门基础',
    desc: 'AI 工具认知 → 编程基础 → 第一个项目',
    color: '#6366F1',
    bgLight: '#EEF2FF',
    ring: '#C7D2FE',
    chapters: allChapters.filter(c => c.category === '入门基础'),
  },
  {
    id: 'frontend',
    name: '前端开发',
    desc: 'HTML/CSS/JS → React/Vue → 性能优化',
    color: '#059669',
    bgLight: '#ECFDF5',
    ring: '#A7F3D',
    chapters: allChapters.filter(c => c.category === '前端开发'),
  },
  {
    id: 'backend',
    name: '后端全栈',
    desc: 'Node.js/Python → 数据库 → 全栈部署',
    color: '#D97706',
    bgLight: '#FFFBEB',
    ring: '#FCD34D',
    chapters: allChapters.filter(c => c.category === '后端全栈'),
  },
  {
    id: 'architecture',
    name: '架构安全',
    desc: '微服务 → 安全防护 → 监控运维',
    color: '#DC2626',
    bgLight: '#FEF2F2',
    ring: '#FCA5A5',
    chapters: allChapters.filter(c => c.category === '架构安全'),
  },
  {
    id: 'projects',
    name: '项目实战',
    desc: '电商 → 社交 → 数据可视化',
    color: '#7C3AED',
    bgLight: '#F5F3FF',
    ring: '#C4B5FD',
    chapters: allChapters.filter(c => c.category === '项目实战'),
  },
]

export default function Home() {
  const { progress, markRead } = useProgress()
  const [expandedStage, setExpandedStage] = useState(null)

  /* 各阶段进度 */
  const stageProgress = useMemo(() => {
    return stages.map(s => {
      const done = s.chapters.filter(c => progress[c.id]).length
      return { ...s, done, total: s.chapters.length,
        pct: s.chapters.length ? Math.round(done / s.chapters.length * 100) : 0,
      }
    })
  }, [progress])

  const totalDone = allChapters.filter(c => progress[c.id]).length
  const totalPct = Math.round(totalDone / allChapters.length * 100)

  /* 滚动进入动画 */
  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60) {
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

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${'#EEF2FF'} 0%, #FFFFFF 50%, #F5F3FF 100%)` }}>
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
          <div className="text-center" style={{ maxWidth: 640, margin: '0 auto' }}>
            {/* 进度徽章 */}
            <div className="scroll-animate" style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'white', border: '1px solid #E5E7EB', borderRadius: '9999px', padding: '0.375rem 1rem', fontSize: '0.8125rem', color: '#4B5563', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: totalDone > 0 ? '#22C55E' : '#D1D5DB' }} />
              {totalDone > 0 ? `已学 ${totalDone}/${allChapters.length} 章 · ${totalPct}%` : '开始你的学习之旅'}
            </div>

            <h1 className="scroll-animate" style={{ fontSize: '2.25rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem' }}>
              用 AI 写出你的<br />第一个作品
            </h1>
            <p className="scroll-animate" style={{ fontSize: '1.05rem', color: '#6B7280', lineHeight: 1.65, marginBottom: '2rem' }}>
              零基础也能学会的编程入门指南<br />
              <span style={{ color: '#6366F1', fontWeight: 500 }}>24 章 · 5 个阶段 · 循序渐进</span>
            </p>

            <div className="scroll-animate" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/chapters" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 600 }}>
                🚀 开始学习
              </Link>
              {totalDone > 0 && (
                <Link to="/chapters" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '10px' }}>
                  继续学习 →
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* 底部装饰线 */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #E5E7EB, transparent)' }} />
      </section>

      {/* ===== 学习路线图（阶段式）===== */}
      <section id="chapters" style={{ padding: '4rem 0', background: '#F9FAFB' }}>
        <div className="container">

          {/* 区域标题 */}
          <div className="scroll-animate" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
              学习路线图
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#6B7280' }}>
              5 个阶段，24 章，从零到完整项目
            </p>
          </div>

          {/* 阶段列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 800, margin: '0 auto' }}>
            {stageProgress.map((s, i) => {
              const isOpen = expandedStage === s.id
              return (
                <div
                  key={s.id}
                  className="scroll-animate"
                  style={{
                    background: 'white', border: `1.5px solid ${isOpen ? s.color : '#E5E7EB'}`,
                    borderRadius: '14px', overflow: 'hidden',
                    transition: 'all 0.25s ease', cursor: 'pointer',
                    boxShadow: isOpen ? `0 4px 16px ${s.color}18` : '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  onClick={() => setExpandedStage(isOpen ? null : s.id)}
                >
                  {/* 阶段头部 */}
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {/* 色标圆点 */}
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '12px',
                      background: s.bgLight, border: `2px solid ${s.ring}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.25rem', flexShrink: 0,
                    }}>
                      {s.done === s.total ? '✅' : s.done > 0 ? '🔵' : ['🟦','🟢','🟡','🔴','🟣'][i]}
                    </div>

                    {/* 文字信息 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>{s.name}</h3>
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 500 }}>
                          {s.chapters.map(c => c.num).join(' · ')}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: '0.15rem' }}>{s.desc}</p>
                    </div>

                    {/* 进度 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: s.done > 0 ? s.color : '#9CA3AF' }}>
                          {s.done}/{s.total}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: '#9CA3AF' }}>{s.pct}%</div>
                      </div>
                      {/* 小进度环 */}
                      <svg width="36" height="36" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#F3F4F6" strokeWidth="3.5" />
                        {s.pct > 0 && (
                          <circle cx="18" cy="18" r="14" fill="none"
                            stroke={s.color} strokeWidth="3.5"
                            strokeDasharray={`${2 * Math.PI * 14}`}
                            strokeDashoffset={`${2 * Math.PI * 14 * (1 - s.pct / 100)}`}
                            transform="rotate(-90 18 18)"
                            strokeLinecap="round"
                          />
                        )}
                        {s.done === s.total && (
                          <text x="18" y="22" textAnchor="middle" fontSize="12">✓</text>
                        )}
                      </svg>

                      {/* 展开箭头 */}
                      <svg width="16" height="16" viewBox="0 0 16 16" style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s ease', color: '#9CA3AF',
                      }}>
                        <path d="M4 6L8 10L12 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* 展开：章节小卡片 */}
                  {isOpen && (
                    <div style={{
                      padding: '0 1.5rem 1.25rem',
                      borderTop: `1px solid ${s.bgLight}`,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                      gap: '0.5rem',
                      animation: 'fadeInUp 0.2s ease forwards',
                    }}>
                      {s.chapters.map(c => {
                        const done = !!progress[c.id]
                        return (
                          <Link
                            key={c.id}
                            to={`/chapter/${c.id}`}
                            onClick={e => { e.stopPropagation(); markRead(c.id) }}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.4rem',
                              padding: '0.5rem 0.65rem', borderRadius: '8px',
                              background: done ? `${s.color}08` : '#F9FAFB',
                              border: `1px solid ${done ? s.color + '30' : '#F3F4F6'}`,
                              textDecoration: 'none', fontSize: '0.8125rem',
                              color: done ? s.color : '#374151',
                              fontWeight: done ? 600 : 400,
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = `${s.color}12`
                              e.currentTarget.style.borderColor = s.color + '50'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = done ? `${s.color}08` : '#F9FAFB'
                              e.currentTarget.style.borderColor = done ? s.color + '30' : '#F3F4F6'
                            }}
                          >
                            {done && <CheckCircle2 size={13} style={{ color: '#22C55E', flexShrink: 0 }} />}
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {c.num} {c.title}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* 底部：查看全部 */}
          <div className="scroll-animate" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/chapters" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.875rem', fontWeight: 500, color: '#6366F1',
              textDecoration: 'none', padding: '0.5rem 1rem',
              borderRadius: '8px', border: '1px solid #E5E7EB',
              transition: 'all 0.15s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#EEF2FF'; e.currentTarget.style.borderColor = '#C7D2FE' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#E5E7EB' }}
            >
              查看全部章节 →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)', padding: '4rem 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
            准备好开始了吗？
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
            加入成千上万的初学者，一起用 AI 学编程 ✨
          </p>
          <Link to="/chapters" style={{
            display: 'inline-block', background: 'white', color: '#4F46E5',
            padding: '0.75rem 1.75rem', borderRadius: '10px',
            fontWeight: 600, textDecoration: 'none', fontSize: '0.9375rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.15s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            🚀 立即开始学习
          </Link>
        </div>
      </section>
    </div>
  )
}
