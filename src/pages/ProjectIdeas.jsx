import { useState } from 'react';

const difficultyMap = {
  '⭐': { label: '入门', color: 'bg-green-100 text-green-700' },
  '⭐⭐': { label: '初级', color: 'bg-blue-100 text-blue-700' },
  '⭐⭐⭐': { label: '中级', color: 'bg-amber-100 text-amber-700' },
  '⭐⭐⭐⭐': { label: '高级', color: 'bg-red-100 text-red-700' },
};

const projects = [
  // 入门
  { title: '个人主页', difficulty: '⭐', tags: ['HTML', 'CSS', '简历'], desc: '用 AI 生成一个属于你的个人主页，展示你的技能和作品', prompt: '帮我做一个个人主页，包含：自我介绍、技能列表、作品展示、联系方式。用 HTML + CSS 实现，风格简洁现代。' },
  { title: '待办清单', difficulty: '⭐', tags: ['JavaScript', '交互'], desc: '实现一个可以添加、删除、标记完成的待办清单', prompt: '用 HTML + CSS + JavaScript 做一个待办清单应用，功能：添加任务、删除任务、标记完成、本地存储。' },
  { title: '天气小工具', difficulty: '⭐', tags: ['API', '异步'], desc: '调用天气 API，展示当前天气信息', prompt: '用 HTML + JS 做一个天气查询小工具，调用免费天气 API，输入城市名显示当前天气、温度、湿度。' },
  { title: '记账本', difficulty: '⭐⭐', tags: ['数据', '本地存储'], desc: '可以记录收入支出的简单记账工具', prompt: '用 HTML + CSS + JS 实现一个记账本，功能：添加收支记录、分类统计、本地存储、月度汇总。' },
  { title: '番茄钟', difficulty: '⭐⭐', tags: ['定时器', '效率'], desc: '专注工作 25 分钟，休息 5 分钟的番茄工作法工具', prompt: '用 HTML + CSS + JS 做一个番茄钟计时器，25分钟工作 + 5分钟休息，有进度环、提示音、统计面板。' },

  // 中级
  { title: '聊天室', difficulty: '⭐⭐⭐', tags: ['WebSocket', '实时'], desc: '基于 WebSocket 的简易聊天室', prompt: '用 React + Node.js + Socket.io 实现一个聊天室，支持：多用户、房间、消息历史。' },
  { title: '博客系统', difficulty: '⭐⭐⭐', tags: ['CRUD', '数据库'], desc: '支持 Markdown 的简易博客系统', prompt: '用 Next.js + Markdown 实现一个博客系统，支持：文章列表、详情页、Markdown 编辑、分类标签。' },
  { title: '电商小程序', difficulty: '⭐⭐⭐', tags: ['全栈', '支付'], desc: '商品展示、购物车、下单流程', prompt: '用 React + Node.js 实现一个简易电商前端，包含：商品列表、详情、购物车、下单页面（不需要真实支付）。' },

  // 高级
  { title: 'AI 绘画站', difficulty: '⭐⭐⭐⭐', tags: ['AI API', '全栈'], desc: '调用 AI 绘画 API 的创意平台', prompt: '用 Next.js + Stable Diffusion API 做一个 AI 绘画站，功能：文生图、图生图、历史记录、社区画廊。' },
];

const categories = ['全部', '⭐ 入门', '⭐⭐ 初级', '⭐⭐⭐ 中级', '⭐⭐⭐⭐ 高级'];

export default function ProjectIdeas() {
  const [filter, setFilter] = useState('全部');
  const [copiedIdx, setCopiedIdx] = useState(null);

  const filtered = filter === '全部'
    ? projects
    : projects.filter(p => p.difficulty.startsWith(filter.replace(/[^⭐]/g, '')));

  const handleCopy = async (prompt, idx) => {
    try { await navigator.clipboard.writeText(prompt); } catch {
      const ta = document.createElement('textarea'); ta.value = prompt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopiedIdx(idx); setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* 页面标题 */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl text-primary-600 mb-4 animate-fade-in-up">
            💡 项目创意库
          </h1>
          <p className="text-gray-600 text-lg">
            20+ 个渐进式项目创意，附提示词关键词 ✨
          </p>
        </div>
      </section>

      {/* 筛选器 */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === c
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* 项目网格 */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => {
            const diff = difficultyMap[p.difficulty] || difficultyMap['⭐'];
            return (
              <div key={p.title} className="card p-6 relative overflow-hidden group hover:shadow-lg">
                {/* 难度标签 */}
                <div className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full ${diff.color}`}>
                  {diff.label}
                </div>

                {/* 标题 */}
                <h3 className="font-bold text-gray-800 mb-2 pr-16">{p.title}</h3>

                {/* 描述 */}
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{p.desc}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">{t}</span>
                  ))}
                </div>

                {/* 提示词 */}
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs leading-relaxed mb-3 font-mono max-h-24 overflow-hidden group-hover:max-h-48 transition-all duration-500">
                  {p.prompt}
                </div>

                {/* 复制按钮 */}
                <button
                  onClick={() => handleCopy(p.prompt, i)}
                  className="btn btn-primary text-xs w-full"
                >
                  {copiedIdx === i ? '✅ 已复制' : '📋 复制提示词'}
                </button>
              </div>
            );
          })}
        </div>

        {/* 提示 */}
        <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-200">
          <h4 className="font-bold text-primary-700 mb-2">💡 使用提示</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 复制提示词后，替换【】中的内容为你的实际需求</li>
            <li>• 建议从 ⭐ 入门级项目开始，循序渐进</li>
            <li>• 每个项目完成后，尝试添加自己的创意功能</li>
            <li>• 把项目部署到网上，放进你的作品集！</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
