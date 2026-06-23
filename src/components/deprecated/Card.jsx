export default function Card({ title, desc, icon, to, delay = 0, className = '' }) {
  return (
    <a
      href={to}
      className={`card-pink block p-6 relative overflow-hidden group ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* 像素角装饰 */}
      <div className="absolute top-0 left-0 w-3 h-3 bg-pink-400 opacity-60" />
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-pink-400 opacity-60" />
      
      {/* 图标 */}
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      
      {/* 标题 */}
      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink-500 transition-colors">
        {title}
      </h3>
      
      {/* 描述 */}
      {desc && (
        <p className="text-sm text-gray-600 font-elegant leading-relaxed">
          {desc}
        </p>
      )}
      
      {/* 悬停箭头 */}
      <div className="mt-4 flex items-center text-pink-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        开始学习 →
      </div>
    </a>
  );
}
