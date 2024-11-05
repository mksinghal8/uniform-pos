import { create } from 'zustand';

// Define the types for your state
interface StoreState {
  allSalesAssignments: any[];
  setAllSalesAssignments: (salesAssignments: any[]) => void;
  updateSalesAssignments: (updatedAssignments: Partial<any>[]) => void;
}

// Create the store
const useSaleAssignmentsStore = create<StoreState>((set) => ({
  allSalesAssignments: [],

  setAllSalesAssignments: (salesAssignments) =>
    set((state) => ({
      allSalesAssignments: [
        ...state.allSalesAssignments,
        salesAssignments
      ],
    })),


  // Update specific items within allSalesAssignments
  updateSalesAssignments: (updatedAssignments) =>
    set((state) => ({
      allSalesAssignments: state.allSalesAssignments.map((item) =>
        updatedAssignments.find(
          (update) => update.id === item.id // Assuming `id` is the unique identifier
        ) || item
      ),
    })),
}));

export default useSaleAssignmentsStore;
