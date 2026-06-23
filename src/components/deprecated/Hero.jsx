export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-50 py-20 md:py-28">
      {/* 像素装饰 - 背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-3 h-3 bg-pink-300 opacity-40 animate-pixel-float" />
        <div className="absolute top-20 right-20 w-2 h-2 bg-peach-400 opacity-40 animate-pixel-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-pink-400 opacity-30 animate-pixel-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-mint-400 opacity-40 animate-pixel-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-10 right-10 w-3 h-3 bg-lavender-400 opacity-40 animate-pixel-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* 主标题 */}
        <h1 className="font-pixel text-3xl md:text-5xl text-pink-500 mb-6 animate-fade-in-up">
          ✨ Vibe Coding
        </h1>
        
        {/* 副标题 */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-elegant leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          用 AI 写出你的第一个作品
          <br />
          <span className="text-pink-500 font-medium">零基础也能学会的编程入门指南</span>
        </p>

        {/* 按钮组 */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="#chapters"
            className="btn-pink text-base px-8 py-3 no-underline inline-block"
          >
            🚀 开始学习
          </a>
          <a
            href="#tools"
            className="btn-pixel text-base px-8 py-3 no-underline inline-block"
          >
            🛠️ 查看工具
          </a>
        </div>

        {/* 像素装饰 - 底部 */}
        <div className="mt-16 flex justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {['💖', '✨', '🎮', '🚀', '💖'].map((emoji, i) => (
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
    </section>
  );
}
