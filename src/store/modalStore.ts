import { create } from "zustand"

interface ModalState {
  open: boolean
  setOpen: (open: boolean) => void
  
}

export const useModalStore = create<ModalState>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set(() => ({ open:open })),
 
}))