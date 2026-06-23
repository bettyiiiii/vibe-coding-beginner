import { useState } from 'react';

const tools = [
  {
    name: 'ChatGPT',
    icon: '🤖',
    type: '通用 AI',
    free: '有限免费',
    paid: '$20/月 (Plus)',
    highlights: ['生态成熟', '插件丰富', '多模态支持'],
    bestFor: '入门首选，通用场景',
    rating: 4.5,
  },
  {
    name: 'Claude',
    icon: '🧠',
    type: '通用 AI',
    free: '有限免费',
    paid: '$20/月 (Pro)',
    highlights: ['代码能力强', '长文本理解', '安全性高'],
    bestFor: '代码生成、长文档分析',
    rating: 4.7,
  },
  {
    name: 'Cursor',
    icon: '💖',
    type: 'AI IDE',
    free: '2周试用',
    paid: '$20/月 (Pro)',
    highlights: ['深度集成 IDE', '代码补全强', '支持多模型'],
    bestFor: '专业开发者，日常编码',
    rating: 4.8,
  },
  {
    name: 'Windsurf',
    icon: '🌊',
    type: 'AI IDE',
    free: '有限免费',
    paid: '$15/月',
    highlights: ['轻量快速', 'Cascade 引擎', '价格友好'],
    bestFor: '预算有限，追求性价比',
    rating: 4.3,
  },
  {
    name: 'GitHub Copilot',
    icon: '🐙',
    type: 'AI 编程助手',
    free: '学生/开源维护者免费',
    paid: '$10/月',
    highlights: ['GitHub 原生', '多 IDE 支持', '企业级安全'],
    bestFor: '已使用 GitHub 的团队',
    rating: 4.2,
  },
  {
    name: 'Replit',
    icon: '🌀',
    type: '在线 IDE',
    free: '基础免费',
    paid: '$20/月 (Core)',
    highlights: ['在线开发', '一键部署', '协作友好'],
    bestFor: '快速原型、在线演示',
    rating: 4.4,
  },
];

const filters = ['全部', '通用 AI', 'AI IDE', 'AI 编程助手', '在线 IDE'];

export default function ToolComparison() {
  const [filter, setFilter] = useState('全部');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = tools
    .filter(t => filter === '全部' || t.type === filter)
    .sort((a, b) => (sortBy === 'rating' ? b.rating - a.rating : 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* 页面标题 */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl text-primary-600 mb-4 animate-fade-in-up">
            🔍 AI 工具对比
          </h1>
          <p className="text-gray-600 text-lg">
            多维度对比主流 AI 编程工具，帮你选对武器 ✨
          </p>
        </div>
      </section>

      {/* 筛选器 */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setSortBy('rating')}
            className={`text-sm px-3 py-1 rounded ${
              sortBy === 'rating' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:text-primary-600'
            }`}
          >
            ⭐ 按评分排序
          </button>
        </div>
      </section>

      {/* 工具卡片网格 */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div key={t.name} className="card p-6 hover:shadow-lg">
              {/* 头部：图标 + 名称 + 评分 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{t.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{t.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">
                      {t.type}
                    </span>
                  </div>
                </div>
                <span className="text-amber-500 font-bold">{t.rating}⭐</span>
              </div>

              {/* 价格 */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div className="bg-primary-50 p-2 rounded-lg">
                  <div className="text-xs text-gray-500">免费方案</div>
                  <div className="font-medium text-primary-600">{t.free}</div>
                </div>
                <div className="bg-primary-50 p-2 rounded-lg">
                  <div className="text-xs text-gray-500">付费方案</div>
                  <div className="font-medium text-primary-600">{t.paid}</div>
                </div>
              </div>

              {/* 亮点 */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">✨ 亮点</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  {t.highlights.map(h => (
                    <li key={h} className="flex items-start gap-1">
                      <span className="text-primary-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 适合场景 */}
              <div className="pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-400">🎯 最适合</div>
                <div className="text-sm text-primary-600 font-medium">{t.bestFor}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 提示 */}
        <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-200">
          <h4 className="font-bold text-primary-700 mb-2">💡 选择建议</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>零基础入门</strong>：先用 ChatGPT 熟悉 AI 对话模式</li>
            <li>• <strong>认真学习编程</strong>：推荐 Cursor 或 Windsurf，集成度更高</li>
            <li>• <strong>预算有限</strong>：Windsurf 性价比最高，免费版也够用</li>
            <li>• <strong>团队协作</strong>：GitHub Copilot 企业支持最好</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
