import { useState, useRef, useEffect } from 'react';

export default function CodeBlock({ children, className = '' }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  const handleCopy = async () => {
    try {
      const code = codeRef.current?.innerText || '';
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = codeRef.current?.innerText || '';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // extract language from className (e.g. "language-js")
  const lang = className.replace(/language-/, '') || 'code';

  return (
    <div className="relative group my-4 code-block-pink">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 text-xs font-mono border-b border-gray-700">
        <span className="text-pink-400 font-medium">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors px-2 py-1 rounded"
        >
          {copied ? (
            <>
              <span>✅</span> 已复制
            </>
          ) : (
            <>
              <span>📋</span> 复制
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code ref={codeRef} className={`${className} font-mono`}>
          {children}
        </code>
      </pre>
    </div>
  );
}
