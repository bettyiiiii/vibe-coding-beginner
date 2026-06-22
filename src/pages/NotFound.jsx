import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50 px-4">
      {/* 像素装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 opacity-40 animate-pixel-float"
            style={{
              left: `${15 + i * 18}%`,
              top: `${10 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative">
        {/* 404 数字 */}
        <div className="font-pixel text-8xl md:text-9xl text-pink-200 mb-4 animate-bounce-soft">
          404
        </div>

        {/* 像素图标 */}
        <div className="text-6xl mb-6 animate-pixel-float">💖</div>

        {/* 标题 */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          页面走丢了！
        </h1>

        {/* 描述 */}
        <p className="text-gray-600 mb-8 font-elegant text-lg max-w-md mx-auto leading-relaxed">
          看起来你访问的页面不存在。
          <br />
          可能是链接错误，或者页面已被移除。
        </p>

        {/* 按钮组 */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="btn-pink text-base px-8 py-3 no-underline inline-block"
          >
            🏠 返回首页
          </Link>
          <Link
            to="/chapters"
            className="btn-pixel text-base px-8 py-3 no-underline inline-block"
          >
            📚 浏览章节
          </Link>
        </div>

        {/* 像素装饰 - 底部 */}
        <div className="mt-12 flex justify-center gap-3">
          {['💖', '✨', '🎮', '💖'].map((emoji, i) => (
            <span
              key={i}
              className="text-2xl animate-bounce-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
