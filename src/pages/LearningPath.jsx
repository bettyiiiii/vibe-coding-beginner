import { useState } from 'react';

const questions = [
  {
    q: '你的编程基础如何？',
    options: [
      { label: '零基础，完全不懂代码', value: 'zero' },
      { label: '懂一点点，看过但没写过', value: 'beginner' },
      { label: '会一点，能写简单程序', value: 'basic' },
    ],
  },
  {
    q: '你每天能投入多少时间学习？',
    options: [
      { label: '每天 30 分钟', value: 'light' },
      { label: '每天 1-2 小时', value: 'medium' },
      { label: '每天 3 小时以上', value: 'heavy' },
    ],
  },
  {
    q: '你最想用 AI 做出什么？',
    options: [
      { label: '网站 / 网页', value: 'web' },
      { label: '小程序 / App', value: 'app' },
      { label: '自动化工具 / 脚本', value: 'automation' },
      { label: '还没想好，先学着', value: 'explore' },
    ],
  },
];

const paths = {
  zero_web: {
    title: '🌱 零基础 → 网站开发者',
    weeks: 6,
    milestones: [
      '第 1-2 周：完成 Ch01-Ch02，理解编程基础',
      '第 3-4 周：完成 Ch03-Ch04，学会和 AI 协作',
      '第 5 周：完成 Ch05，学会 API 调用',
      '第 6 周：完成 Ch06，做出第一个网站作品',
    ],
    tip: '建议从「个人主页」项目开始，成就感更强！',
  },
  beginer_web: {
    title: '🚀 快速上手 → 实用网站',
    weeks: 4,
    milestones: [
      '第 1 周：完成 Ch01、Ch03，快速掌握 AI 提示词',
      '第 2-3 周：完成 Ch04-Ch05，学会读懂和修改代码',
      '第 4 周：完成 Ch06，做出实用网站',
    ],
    tip: '可以尝试「电商小程序」项目，功能完整！',
  },
  basic_web: {
    title: '⚡ 进阶提升 → 全栈开发者',
    weeks: 3,
    milestones: [
      '第 1 周：复习 Ch01-Ch03，掌握高级提示词技巧',
      '第 2 周：完成 Ch05-Ch06，掌握 API 和数据库',
      '第 3 周：做 2-3 个完整项目，建立作品集',
    ],
    tip: '建议学习 Next.js，全栈能力更强！',
  },
  default: {
    title: '🗺️ 个性化学习路径',
    weeks: 4,
    milestones: [
      '第 1-2 周：按自己的节奏完成 Ch01-Ch03',
      '第 3 周：完成 Ch04-Ch05，加强实战',
      '第 4 周：完成 Ch06，做出自己的作品',
    ],
    tip: '学习节奏比速度更重要，理解透彻再前进！',
  },
};

function getPath(answers) {
  const key = `${answers[0] || 'zero'}_${answers[2] || 'web'}`;
  return paths[key] || paths.default;
}

export default function LearningPath() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    if (step < questions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const finalAnswers = [...newAnswers];
      setAnswers(finalAnswers);
      setResult(getPath(finalAnswers));
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* 页面标题 */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl text-primary-600 mb-4 animate-fade-in-up">
            🗺️ 学习路径规划器
          </h1>
          <p className="text-gray-600 text-lg">
            回答 3 个问题，生成你的专属学习路径 ✨
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 pb-20">
        {!result ? (
          /* 问答区 */
          <div className="card p-8 md:p-12">
            {/* 进度指示器 */}
            <div className="flex items-center gap-2 mb-8">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    i < step ? 'bg-primary-600' : i === step ? 'bg-primary-300' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* 问题 */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
              {questions[step].q}
            </h2>

            {/* 选项 */}
            <div className="space-y-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 font-medium text-gray-700 hover:text-primary-600"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* 步骤指示 */}
            <div className="mt-8 text-center text-sm text-gray-400">
              问题 {step + 1} / {questions.length}
            </div>
          </div>
        ) : (
          /* 结果展示 */
          <div>
            <div className="card p-8 md:p-12 mb-6 hover:shadow-lg">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.title}</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-600 font-medium text-sm">
                  ⏱️ 预计学习时间：{result.weeks} 周
                </div>
              </div>

              {/* 里程碑 */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-700 mb-4">📅 学习里程碑</h3>
                <div className="space-y-3">
                  {result.milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-primary-50/50 rounded-xl">
                      <span className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-700">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 提示 */}
              <div className="p-4 bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl border border-primary-200">
                <div className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">💡</span>
                  <p className="text-sm text-gray-700">{result.tip}</p>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleReset}
                className="btn btn-primary text-base px-8 py-3"
              >
                🔄 重新测试
              </button>
              <a
                href="/chapters"
                className="btn btn-accent text-base px-8 py-3 no-underline inline-block"
              >
                📚 开始学习
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
