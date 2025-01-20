import { create } from "zustand";

type Block = {
  id: string;
  type: "trigger" | "action";
  selectedId?: string;
  metadata?: string;
};

type ModalState = {
  isOpen: boolean;
  blockId?: string;
};

type WorkflowStore = {
  blocks: Block[];
  modalState: ModalState;
  addBlock: (type: "trigger" | "action") => void;
  removeBlock: (id: string) => void;
  updateBlock: (
    id: string,
    data: { selectedId: string; metadata: string }
  ) => void;
  openModal: (blockId?: string) => void;
  closeModal: () => void;
};

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  blocks: [],
  modalState: { isOpen: false },
  addBlock: (type) =>
    set((state) => ({
      blocks: [
        ...state.blocks,
        { id: Math.random().toString(36).slice(2, 9), type },
      ],
    })),
  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
    })),
  updateBlock: (id, data) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, ...data } : block
      ),
    })),
  openModal: (blockId) => set({ modalState: { isOpen: true, blockId } }),
  closeModal: () => set({ modalState: { isOpen: false, blockId: undefined } }),
}));
