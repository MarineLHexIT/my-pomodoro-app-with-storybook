import { create } from 'zustand';

type PomodoroState = 'work' | 'break';

type PomodoroStoreState = {
    currentState: PomodoroState,
    isPaused: boolean,
    initialDuration: number;
    elapsedTime: number
};

type PomodoroStoreAction = {
    setCurrentState: (state: PomodoroState) => void,
    togglePause: () => void,
    setInitialDuration: (duration: number) => void,
    setElapsedTime: (time: number) => void,
}

const usePomodoroStore = create<PomodoroStoreState & PomodoroStoreAction>((set) => ({
    currentState: 'work',
    isPaused: false,
    initialDuration: 25,
    elapsedTime: 0,
    setCurrentState: (newState: PomodoroState) => set(() => ({ currentState: newState })),
    togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    setInitialDuration: (duration: number) => set(() => ({ initialDuration: duration })),
    setElapsedTime: (time: number) => set(() => ({ elapsedTime: time })),
}));


export default usePomodoroStore;