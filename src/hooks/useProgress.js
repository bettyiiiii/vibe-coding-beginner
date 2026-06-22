// 学习进度管理 hook
const STORAGE_KEY = 'vibe-coding-progress';

export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function markChapterRead(chapterId) {
  try {
    const current = getProgress();
    current[chapterId] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(getProgress());

  const markRead = (chapterId) => {
    markChapterRead(chapterId);
    setProgress(getProgress());
  };

  return { progress, markRead, getProgress, markChapterRead };
}

export default useProgress;
