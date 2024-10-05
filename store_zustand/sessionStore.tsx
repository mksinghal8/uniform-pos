import { create } from 'zustand';

// Define a specific type for your session
interface Session {
  userId: string;
  token: string;
  // Add other properties as needed
}

interface SessionStoreState {
  session: Session | null; // Allow null for initial state
  setSession: (session: Session | null) => void; // Allow setting to null
}

// Create the store
const useSessionStore = create<SessionStoreState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));

export default useSessionStore;
