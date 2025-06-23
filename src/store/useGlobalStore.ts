import { create } from 'zustand';

interface CalendarEvent {
  title: string;
  date: string;
}

type GlobalStore = {
  username: string;
  setUsername: (name: string) => void;
  events: CalendarEvent[];
  addEvent: (e: CalendarEvent) => void;
};

export const useGlobalStore = create<GlobalStore>(set => ({
  username: '',
  setUsername: name => set({ username: name }),
  events: [],
  addEvent: event => set(state => ({ events: [...state.events, event] })),
}));
