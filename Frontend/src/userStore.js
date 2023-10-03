import create from 'zustand';

const useUserStore = create((set) => ({
    users: [], // initial state

    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    removeUser: (userId) => set((state) => ({ users: state.users.filter((user) => user.id !== userId) })),
}));

export default useUserStore;