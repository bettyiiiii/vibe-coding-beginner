import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

console.log('[main.jsx] 开始执行')

const el = document.getElementById('root')
console.log('[main.jsx] root 元素:', el)

if (!el) {
  document.body.innerHTML = '<h1 style="color:red;padding:40px;">找不到 #root 元素！</h1>'
} else {
  const root = createRoot(el)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  console.log('[main.jsx] React 已挂载')
}
