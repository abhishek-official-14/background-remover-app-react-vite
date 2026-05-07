import { create } from 'zustand'

const useProcessingStore = create((set, get) => ({
  isProcessing: false,
  progress: 0,
  currentTask: null,
  queue: [],
  
  startProcessing: (taskId, totalItems) => set({
    isProcessing: true,
    progress: 0,
    currentTask: { id: taskId, total: totalItems, completed: 0 }
  }),
  
  updateProgress: (completed, total) => set({
    progress: (completed / total) * 100,
    currentTask: { ...get().currentTask, completed }
  }),
  
  finishProcessing: () => set({
    isProcessing: false,
    progress: 0,
    currentTask: null
  }),
  
  addToQueue: (item) => set((state) => ({ queue: [...state.queue, item] })),
  
  removeFromQueue: (itemId) => set((state) => ({
    queue: state.queue.filter(item => item.id !== itemId)
  })),
  
  clearQueue: () => set({ queue: [] })
}))

export default useProcessingStore