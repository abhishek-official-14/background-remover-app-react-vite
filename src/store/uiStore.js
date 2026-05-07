import { create } from 'zustand'

const useUIStore = create((set) => ({
  sidebarOpen: false,
  modalOpen: false,
  modalContent: null,
  theme: 'light',
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  openModal: (content) => set({ modalOpen: true, modalContent: content }),
  
  closeModal: () => set({ modalOpen: false, modalContent: null }),
  
  setTheme: (theme) => set({ theme })
}))

export default useUIStore
Worker Files