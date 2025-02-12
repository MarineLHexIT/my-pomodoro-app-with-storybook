import { create } from 'zustand';

type PomodoroState = 'work' | 'break';

type PomodoroStoreState = {
    currentState: PomodoroState,
    isPaused: boolean,
    initialDuration: number;
    remainingDuration: number
};

const initialState: PomodoroStoreState = {
    currentState: 'work',
    isPaused: false,
    initialDuration: 25 * 60,
    remainingDuration: 25 * 60,
};

type PomodoroStoreAction = {
    setCurrentState: (state: PomodoroState) => void,
    togglePause: () => void,
    setInitialDuration: (initialDuration: number) => void,
    setRemainingDuration: (remainingDuration: number) => void,
}

const usePomodoroStore = create<PomodoroStoreState & PomodoroStoreAction>((set) => ({
    ...initialState,
    setCurrentState: (newState: PomodoroState) => set(() => ({ currentState: newState })),
    togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    setInitialDuration: (initialDuration: number) => set(() => ({ initialDuration })),
    setRemainingDuration: (remainingDuration: number) => set(() => ({ remainingDuration })),
}));


export default usePomodoroStore;