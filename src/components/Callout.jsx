export default function Callout({ type = 'info', title, children }) {
  const config = {
    info: {
      bg: 'bg-pink-50',
      border: 'border-pink-400',
      icon: '💡',
      titleColor: 'text-pink-700',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-400',
      icon: '⚠️',
      titleColor: 'text-amber-700',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      icon: '✅',
      titleColor: 'text-green-700',
    },
    tip: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-400',
      icon: '💎',
      titleColor: 'text-indigo-700',
    },
  };

  const c = config[type] || config.info;

  return (
    <div className={`${c.bg} ${c.border} border-l-4 rounded-r-lg p-4 my-4 animate-fade-in-up`}>
      {(title || c.icon) && (
        <div className={`flex items-center gap-2 mb-2 ${c.titleColor} font-bold text-sm`}>
          <span className="text-base">{c.icon}</span>
          {title && <span>{title}</span>}
        </div>
      )}
      <div className="text-sm text-gray-700 font-elegant leading-relaxed">
        {children}
      </div>
    </div>
  );
}
