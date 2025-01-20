import { create } from "zustand";

// Types for our Zap structure
type Action = {
  availableActionId: string;
  actionMetadata?: any; // You might want to type this more specifically
};

type ZapData = {
  zapName: string;
  availableTriggerId: string;
  actions: Action[];
};

// Store state interface
interface ZapCreationStore {
  // State
  zapData: ZapData;

  // Actions
  setZapName: (name: string) => void;
  setTriggerId: (id: string) => void;
  addAction: (actionId: string, metaData: any) => void;
  removeAction: (index: number) => void;
  updateActionMetadata: (index: number, metadata: any) => void;
  resetZap: () => void;
}

// Initial state
const initialState: ZapData = {
  zapName: "",
  availableTriggerId: "",
  actions: [],
};

// Create store
export const useZapCreationStore = create<ZapCreationStore>((set) => ({
  // Initial state
  zapData: initialState,

  // Actions
  setZapName: (name) =>
    set((state) => ({
      zapData: { ...state.zapData, zapName: name },
    })),

  setTriggerId: (id) =>
    set((state) => ({
      zapData: { ...state.zapData, availableTriggerId: id },
    })),

  addAction: (actionId, metaData) =>
    set((state) => ({
      zapData: {
        ...state.zapData,
        actions: [
          ...state.zapData.actions,
          { availableActionId: actionId, actionMetadata: metaData },
        ],
      },
    })),

  removeAction: (index) =>
    set((state) => ({
      zapData: {
        ...state.zapData,
        actions: state.zapData.actions.filter((_, i) => i !== index),
      },
    })),

  updateActionMetadata: (index, metadata) =>
    set((state) => ({
      zapData: {
        ...state.zapData,
        actions: state.zapData.actions.map((action, i) =>
          i === index ? { ...action, actionMetadata: metadata } : action
        ),
      },
    })),

  resetZap: () =>
    set({
      zapData: initialState,
    }),
}));

export default useZapCreationStore;

// Example selectors for common operations
export const selectZapName = (state: ZapCreationStore) => state.zapData.zapName;
export const selectTriggerId = (state: ZapCreationStore) =>
  state.zapData.availableTriggerId;
export const selectActions = (state: ZapCreationStore) => state.zapData.actions;
