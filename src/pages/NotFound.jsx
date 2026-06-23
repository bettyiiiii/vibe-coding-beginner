import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50 px-4">
      <div className="text-center">
        {/* 404 数字 */}
        <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-purple-300 mb-4 select-none">
          404
        </div>

        {/* 图标 */}
        <div className="text-5xl mb-6">🔍</div>

        {/* 标题 */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          页面走丢了！
        </h1>

        {/* 描述 */}
        <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto leading-relaxed">
          看起来你访问的页面不存在。
          <br />
          可能是链接错误，或者页面已被移除。
        </p>

        {/* 按钮组 */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="btn btn-primary text-base px-8 py-3 no-underline inline-flex items-center gap-2"
          >
            🏠 返回首页
          </Link>
          <Link
            to="/chapters"
            className="btn btn-secondary text-base px-8 py-3 no-underline inline-flex items-center gap-2"
          >
            📚 浏览章节
          </Link>
        </div>

        {/* 底部装饰 */}
        <div className="mt-12 flex justify-center gap-3 text-gray-300">
          {['💡', '✨', '🚀', '💎'].map((emoji, i) => (
            <span key={i} className="text-2xl opacity-60" style={{ animationDelay: `${i * 0.15}s` }}>
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
