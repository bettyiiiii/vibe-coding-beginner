import { useState } from 'react';

const promptCategories = [
  {
    category: '💖 代码生成',
    prompts: [
      {
        title: '从想法到代码',
        template: '我想做一个【网站类型】，主要功能有：\n1. 【功能1】\n2. 【功能2】\n3. 【功能3】\n\n请用 React + Tailwind CSS 实现，代码要简洁易懂，并附上中文注释。',
        tags: ['React', 'Tailwind', '初学者'],
      },
      {
        title: '添加新功能',
        template: '我有一个【项目类型】，现在想添加一个【功能描述】的功能。\n\n现有代码结构：\n【粘贴关键代码】\n\n请用简洁的方式实现这个功能，并解释每一步。',
        tags: ['功能开发', '代码修改'],
      },
    ],
  },
  {
    category: '🔍 代码解释',
    prompts: [
      {
        title: '逐行解释代码',
        template: '请逐行解释下面这段代码，用通俗易懂的语言：\n\n【粘贴你的代码】\n\n请说明：1) 每行代码的作用 2) 为什么这样写 3) 有哪些需要注意的地方',
        tags: ['代码阅读', '学习'],
      },
      {
        title: '调试错误',
        template: '我的代码出现了以下错误：\n【粘贴错误信息】\n\n相关代码：\n【粘贴代码】\n\n请帮我：1) 解释错误原因 2) 给出修复方案 3) 提供修复后的完整代码',
        tags: ['调试', '错误处理'],
      },
    ],
  },
  {
    category: '🎨 样式优化',
    prompts: [
      {
        title: '美化页面',
        template: '我有一个页面，现在的样子比较简陋：\n【粘贴当前代码或截图描述】\n\n请帮我用 Tailwind CSS 重新设计，要求：\n1. 现代化、简洁美观\n2. 响应式适配手机和电脑\n3. 添加适当的动画效果',
        tags: ['UI设计', 'Tailwind'],
      },
    ],
  },
];

export default function PromptLibrary() {
  const [copiedId, setCopiedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCopy = async (template, idx) => {
    try {
      await navigator.clipboard.writeText(template);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = template;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* 页面标题 */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl text-primary-600 mb-4 animate-fade-in-up">
            📋 提示词模板库
          </h1>
          <p className="text-gray-600 text-lg">
            分类整理的提示词模板，可直接复制使用 ✨
          </p>
        </div>
      </section>

      {/* 分类标签 */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {promptCategories.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === i
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </section>

      {/* 模板列表 */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="space-y-6">
          {promptCategories[activeCategory].prompts.map((p, i) => {
            const globalIdx = activeCategory * 10 + i;
            return (
              <div key={i} className="card p-6">
                {/* 标题 + 标签 */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-gray-800 text-lg">{p.title}</h3>
                  <div className="flex gap-1 flex-wrap">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 模板内容 */}
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm leading-relaxed overflow-x-auto mb-4 font-mono">
                  {p.template}
                </pre>

                {/* 复制按钮 */}
                <button
                  onClick={() => handleCopy(p.template, globalIdx)}
                  className="btn btn-primary text-sm"
                >
                  {copiedId === globalIdx ? '✅ 已复制' : '📋 复制模板'}
                </button>
              </div>
            );
          })}
        </div>

        {/* 提示 */}
        <div className="mt-12 p-6 bg-primary-50 rounded-2xl border border-primary-200">
          <h4 className="font-bold text-primary-700 mb-2">💡 使用提示</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 复制模板后，替换【】中的内容为你的实际需求</li>
            <li>• 可以组合多个模板来达到更好的效果</li>
            <li>• 如果 AI 输出不满意，可以在提示词中补充更多细节</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
