import { Show } from "@/types/type"
import { create } from "zustand"

interface ModalState {
  open: boolean
  setOpen: (open: boolean) => void
  show:Show|null
  setShow:(show: Show) => void
}

export const useModalStore = create<ModalState>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set(() => ({ open:open })),
  show: null,
  setShow:(show: Show) => set(() => ({ show:show }))
 
}))