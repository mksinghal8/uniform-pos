import {create} from 'zustand';

// Define the types for your state
interface StoreState {
  allProducts: any[];
  allCategories: any[];
  searchString: string;
  searchResultProducts: any[];
  searchResultCategories: any[];
  setAllProducts: (products: any[]) => void;
  setAllCategories: (categories: any[]) => void;
  setSearchString: (search: string) => void;
  setSearchResultProducts: (results: any[]) => void;
  setSearchResultCategories: (results: any[]) => void;
}

// Create the store
const useProductStore = create<StoreState>((set) => ({
  allProducts: [],
  allCategories: [],
  searchString: '',
  searchResultProducts: [],
  searchResultCategories: [],
  
  setAllProducts: (products) => set({ allProducts: products }),
  setAllCategories: (categories) => set({ allCategories: categories }),
  setSearchString: (search) => set({ searchString: search }),
  setSearchResultProducts: (results) => set({ searchResultProducts: results }),
  setSearchResultCategories: (results) => set({ searchResultCategories: results }),
}));

export default useProductStore;
