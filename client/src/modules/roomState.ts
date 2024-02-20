import { create } from 'zustand'

export const useRoom = create((set) => ({
    room: '',
    changeRoom: (room: string) => set(() => ({ room: room }))
}));
