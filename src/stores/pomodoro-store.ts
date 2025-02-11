import { create } from 'zustand';

type PomodoroState = 'work' | 'break';

type PomodoroStoreState = {
    currentState: PomodoroState,
    isPaused: boolean,
    elapsedTime: number
};

type PomodoroStoreAction = {
    setState: (state: PomodoroState) => void,
    togglePause: () => void,
    setElapsedTime: (time: number) => void,
}

const useStore = create<PomodoroStoreState & PomodoroStoreAction>((set) => ({
    currentState: 'work',
    isPaused: false,
    elapsedTime: 0,
    setState: (newState: PomodoroState) => set(() => ({ currentState: newState })),
    togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    setElapsedTime: (time: number) => set(() => ({ elapsedTime: time })),
}));


export default useStore;