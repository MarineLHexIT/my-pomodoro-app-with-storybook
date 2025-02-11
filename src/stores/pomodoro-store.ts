import { create } from 'zustand';

type PomodoroState = 'work' | 'break';

type PomodoroStoreState = {
    currentState: PomodoroState,
    isPaused: boolean,
    elapsedTime: number
};

type PomodoroStoreAction = {
    setCurrentState: (state: PomodoroState) => void,
    togglePause: () => void,
    setElapsedTime: (time: number) => void,
}

const usePomodoroStore = create<PomodoroStoreState & PomodoroStoreAction>((set) => ({
    currentState: 'work',
    isPaused: false,
    elapsedTime: 0,
    setCurrentState: (newState: PomodoroState) => set(() => ({ currentState: newState })),
    togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    setElapsedTime: (time: number) => set(() => ({ elapsedTime: time })),
}));


export default usePomodoroStore;