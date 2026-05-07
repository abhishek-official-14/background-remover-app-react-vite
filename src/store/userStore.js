import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      credits: 0,
      isAuthenticated: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setCredits: (credits) => set({ credits }),
      
      useCredits: (amount) => {
        const { credits } = get()
        if (credits >= amount) {
          set({ credits: credits - amount })
          return true
        }
        return false
      },
      
      addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),
      
      logout: () => set({ user: null, credits: 0, isAuthenticated: false })
    }),
    {
      name: 'user-storage'
    }
  )
)

export default useUserStore