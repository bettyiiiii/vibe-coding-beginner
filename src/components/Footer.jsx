import { Link } from 'react-router-dom';

const footerLinks = {
  学习资源: [
    { to: '/chapters', label: '全部章节' },
    { to: '/prompt-library', label: '提示词库' },
    { to: '/project-ideas', label: '项目创意' },
  ],
  工具模块: [
    { to: '/tool-comparison', label: 'AI工具对比' },
    { to: '/troubleshooting', label: '故障排查' },
    { to: '/learning-path', label: '学习路径' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-pink-50 to-white border-t-2 border-pink-100">
      {/* 像素装饰 */}
      <div className="h-1 bg-gradient-to-r from-pink-400 via-peach-400 to-pink-500" />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 no-underline mb-4">
              <span className="text-2xl animate-bounce-soft">💖</span>
              <span className="font-pixel text-sm text-pink-500">Vibe Coding</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4 font-elegant">
              用 AI 写出你的第一个作品 ✨
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 hover:bg-pink-200 transition-colors text-sm"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm text-gray-800 mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-600 hover:text-pink-500 transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-pink-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © 2026 Vibe Coding · 用 AI 让编程变得简单 💖
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="animate-pixel-float">🎮</span>
            <span>让编程像玩游戏一样有趣</span>
            <span className="animate-pixel-float" style={{ animationDelay: '1s' }}>✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
