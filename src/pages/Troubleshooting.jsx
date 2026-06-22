import { useState } from 'react';

const issues = [
  {
    id: 1,
    title: 'AI 生成的代码报错',
    category: '代码问题',
    symptom: '把 AI 给的代码直接运行，浏览器控制台出现红色错误。',
    causes: ['AI 漏写了依赖', 'API 地址写错', '括号/引号不匹配', '使用了不存在的变量'],
    steps: [
      '复制完整错误信息（包含行号）',
      '粘贴到 AI 对话框，说：「这段代码报错：{错误信息}，请修复并解释原因」',
      '如果 AI 连续 2 次没修好，把你的代码从头描述一遍，让它重新生成',
    ],
    prevention: '每次让 AI 生成代码时，都要求它「写出完整可运行的代码，包括所有 import 语句」',
  },
  {
    id: 2,
    title: '页面空白，没有内容',
    category: '显示问题',
    symptom: '浏览器打开后是一片空白，或者只有背景色，没有内容。',
    causes: ['JS 执行失败', '组件没有正确导出', '路由配置错误', 'CSS 文件加载失败'],
    steps: [
      '按 F12 打开开发者工具，查看 Console（控制台）标签页',
      '如果有红色错误，复制错误信息并让 AI 修复',
      '检查 Network（网络）标签页，看 JS/CSS 文件是否成功加载（状态码 200）',
      '如果 JS 文件加载了但没执行，可能是 type="module" 的问题，改用传统 script 标签',
    ],
    prevention: '开发时始终打开开发者工具，第一时间发现错误',
  },
  {
    id: 3,
    title: 'API 调用失败（无法获取数据）',
    category: '数据问题',
    symptom: '页面能打开，但数据加载不出来，或者显示"加载中"一直转圈。',
    causes: ['API 地址错误', '网络请求被跨域（CORS）阻止', 'API 密钥没配置', 'API 返回的数据格式和预期不一样'],
    steps: [
      '按 F12 → Network 标签，找到对应的 API 请求',
      '查看状态码：40x = 请求错误，50x = 服务器错误',
      '查看 Response（响应）内容，看 API 返回了什么',
      '如果是 CORS 错误，告诉 AI："我的 API 请求被 CORS 阻止了，请帮我用代理或后端转发的方式解决"',
    ],
    prevention: '使用 AI 时，明确告诉它："我的项目运行在 localhost:3000，API 地址是 xxx，请注意 CORS 问题"',
  },
  {
    id: 4,
    title: '样式没有生效（页面很丑）',
    category: '样式问题',
    symptom: '页面内容能看到，但没有任何样式，或者样式和预期完全不一样。',
    causes: ['CSS 文件没有正确引入', '类名写错', 'CSS 选择器优先级问题', '样式被覆盖'],
    steps: [
      '按 F12 → Elements 标签，选中一个元素，看右侧 Styles 面板是否有你的 CSS 规则',
      '如果 Styles 面板是空的，说明 CSS 没加载，检查 index.html 中的 link 标签',
      '如果样式被删除线（line-through），说明被其他样式覆盖了，让 AI 帮你提高优先级',
    ],
    prevention: '使用 Tailwind CSS 等框架，减少样式冲突；每次修改样式后刷新页面检查',
  },
  {
    id: 5,
    title: '本地服务器无法启动',
    category: '环境问题',
    symptom: '运行 npm run dev 或类似命令时，报错或者一直卡住不动。',
    causes: ['端口被占用', 'node_modules 没安装完整', 'Node.js 版本不匹配', '配置文件有语法错误'],
    steps: [
      '如果是"端口被占用"，换个端口：npm run dev -- --port 3000',
      '删除 node_modules 文件夹，重新运行 npm install',
      '检查 package.json 中的 engines 字段，确认 Node.js 版本是否匹配',
      '如果是配置文件报错，把错误信息复制给 AI，让它修复',
    ],
    prevention: '定期更新依赖（npm update），使用 nvm 管理多个 Node.js 版本',
  },
];

const categories = ['全部', ...new Set(issues.map(i => i.category))];

export default function Troubleshooting() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = activeCategory === '全部' ? issues : issues.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* 页面标题 */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-pixel text-2xl md:text-3xl text-pink-500 mb-4 animate-fade-in-up">
            🔧 常见错误排查
          </h1>
          <p className="text-gray-600 font-elegant text-lg">
            交互式故障排查指南，点开查看解决方案 ✨
          </p>
        </div>
      </section>

      {/* 筛选器 */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === c
                  ? 'bg-pink-400 text-white shadow-lg shadow-pink-200'
                  : 'bg-white text-gray-600 hover:bg-pink-50 border border-pink-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* 问题列表 */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="space-y-4">
          {filtered.map((issue, i) => {
            const isExpanded = expandedId === issue.id;
            return (
              <div
                key={issue.id}
                className="card-pink p-0 overflow-hidden scroll-animate opacity-0"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* 问题标题（可点击展开） */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : issue.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-pink-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-sm">
                      {issue.id}
                    </span>
                    <span className="font-bold text-gray-800">{issue.title}</span>
                  </div>
                  <span className={`text-pink-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {/* 展开内容 */}
                {isExpanded && (
                  <div className="px-6 pb-6 animate-fade-in-up">
                    {/* 症状 */}
                    <div className="mb-4 p-4 bg-pink-50 rounded-xl">
                      <h4 className="font-bold text-pink-700 mb-1 text-sm">🚨 症状</h4>
                      <p className="text-sm text-gray-700 font-elegant">{issue.symptom}</p>
                    </div>

                    {/* 可能原因 */}
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-700 mb-2 text-sm">🔍 可能原因</h4>
                      <ul className="text-sm text-gray-600 space-y-1 font-elegant">
                        {issue.causes.map((c, ci) => (
                          <li key={ci} className="flex items-start gap-1">
                            <span className="text-pink-400 mt-0.5">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 解决步骤 */}
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-700 mb-2 text-sm">🛠️ 解决步骤</h4>
                      <ol className="text-sm text-gray-600 space-y-2 font-elegant">
                        {issue.steps.map((s, si) => (
                          <li key={si} className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-pink-400 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {si + 1}
                            </span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* 预防建议 */}
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <h4 className="font-bold text-green-700 mb-1 text-sm">✅ 预防建议</h4>
                      <p className="text-sm text-green-800 font-elegant">{issue.prevention}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 提示 */}
        <div className="mt-12 p-6 bg-pink-50 rounded-2xl border border-pink-200 scroll-animate opacity-0">
          <h4 className="font-bold text-pink-700 mb-2">💡 通用排查技巧</h4>
          <ul className="text-sm text-gray-700 space-y-1 font-elegant">
            <li>• <strong>先看错误信息</strong>：错误信息是最好的线索，不要忽略它</li>
            <li>• <strong>分段排查</strong>：把大问题拆成小问题，逐个验证</li>
            <li>• <strong>让 AI 解释错误</strong>：把错误信息发给 AI，让它用通俗语言解释</li>
            <li>• <strong>搜索错误信息</strong>：把错误信息复制到 Google，通常能找到解决方案</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
