export default function ToolCard({ name, desc, tags = [], url, icon }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="card-pink block p-5 group relative overflow-hidden"
    >
      {/* 像素角装饰 */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-pink-400 opacity-50" />
      
      {/* 图标 + 名称 */}
      <div className="flex items-center gap-3 mb-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="font-bold text-gray-800 group-hover:text-pink-500 transition-colors">
          {name}
        </h3>
      </div>

      {/* 描述 */}
      <p className="text-sm text-gray-600 mb-4 font-elegant leading-relaxed">
        {desc}
      </p>

      {/* 标签 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 悬停箭头 */}
      <div className="mt-3 flex items-center text-pink-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        访问官网 →
      </div>
    </a>
  );
}
