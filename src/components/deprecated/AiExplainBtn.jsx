import { useState } from 'react';

const MOCK_RESPONSES = {
  default: '💡 这段代码的核心思路是：\n\n1. 使用 useState 来管理组件内的状态\n2. 通过 setXxx 函数来更新状态\n3. React 会自动重新渲染 UI\n\n✨ 提示：状态更新可能是异步的，不要在调用 setXxx 后立即读取该状态值。',
  '代码解释': '💡 代码解释：\n\n这个函数的作用是把用户输入转换成 AI 能理解的格式。\n\n主要步骤：\n1. 读取表单数据\n2. 组装成结构化提示词\n3. 调用 AI 接口\n4. 把返回结果展示在页面上',
};

export default function AiExplainBtn({ promptKey = 'default', className = '' }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const handleClick = async () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    setLoading(true);
    // 模拟 AI 响应
    setTimeout(() => {
      setText(MOCK_RESPONSES[promptKey] || MOCK_RESPONSES.default);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={className}>
      <button
        onClick={handleClick}
        className="btn-pink text-sm px-4 py-2 flex items-center gap-1.5"
      >
        ✨ AI 解释
      </button>

      {open && (
        <div className="mt-3 p-4 bg-pink-50 border border-pink-200 rounded-xl animate-fade-in-up text-sm text-gray-700 leading-relaxed">
          {loading ? (
            <span className="flex items-center gap-2 text-pink-400">
              <span className="animate-spin-slow">🌀</span> AI 思考中...
            </span>
          ) : (
            <pre className="whitespace-pre-wrap font-sans">{text}</pre>
          )}
        </div>
      )}
    </div>
  );
}
