import { Link } from 'react-router-dom';

const footerLinks = {
  学习资源: [
    { to: '/chapters', label: '全部章节' },
    { to: '/module/prompt-library', label: '提示词库' },
    { to: '/module/project-ideas', label: '项目创意' },
  ],
  工具模块: [
    { to: '/module/tool-comparison', label: 'AI工具对比' },
    { to: '/module/troubleshooting', label: '故障排查' },
    { to: '/module/learning-path', label: '学习路径' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-600" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 no-underline mb-4">
              <span className="text-xl">💎</span>
              <span className="font-semibold text-white">Vibe <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">Coding</span></span>
            </Link>
            <p className="text-sm mb-4 leading-relaxed">
              用 AI 写出你的第一个作品 ✨
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/bettyiiiii/vibe-coding-beginner"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all text-sm"
                title="GitHub"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-3">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors no-underline"
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
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            &copy; 2026 Vibe Coding &middot; 用 AI 让编程变得简单
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>让编程像玩游戏一样有趣</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
