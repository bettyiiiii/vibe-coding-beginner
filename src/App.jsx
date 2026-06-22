import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ChapterList from './pages/ChapterList.jsx'
import ChapterDetail from './pages/ChapterDetail.jsx'
import NotFound from './pages/NotFound.jsx'
import PromptLibrary from './pages/PromptLibrary.jsx'
import ToolComparison from './pages/ToolComparison.jsx'
import ProjectIdeas from './pages/ProjectIdeas.jsx'
import Troubleshooting from './pages/Troubleshooting.jsx'
import LearningPath from './pages/LearningPath.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import './styles/index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
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
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
