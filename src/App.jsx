import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import './styles/index.css'

// 使用 React.lazy 进行代码分割，每个页面独立 chunk
const Home = lazy(() => import('./pages/Home.jsx'))
const ChapterList = lazy(() => import('./pages/ChapterList.jsx'))
const ChapterDetail = lazy(() => import('./pages/ChapterDetail.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const PromptLibrary = lazy(() => import('./pages/PromptLibrary.jsx'))
const ToolComparison = lazy(() => import('./pages/ToolComparison.jsx'))
const ProjectIdeas = lazy(() => import('./pages/ProjectIdeas.jsx'))
const Troubleshooting = lazy(() => import('./pages/Troubleshooting.jsx'))
const LearningPath = lazy(() => import('./pages/LearningPath.jsx'))

// 加载骨架屏
function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="mt-4 text-gray-500 text-sm">页面加载中...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chapters" element={<ChapterList />} />
              <Route path="/chapter/:id" element={<ChapterDetail />} />
              <Route path="/module/prompt-library" element={<PromptLibrary />} />
              <Route path="/module/tool-comparison" element={<ToolComparison />} />
              <Route path="/module/project-ideas" element={<ProjectIdeas />} />
              <Route path="/module/troubleshooting" element={<Troubleshooting />} />
              <Route path="/module/learning-path" element={<LearningPath />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
