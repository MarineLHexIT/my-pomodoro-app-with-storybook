import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PomodoroState = 'work' | 'break';

interface PomodoroStoreState {
    currentState: PomodoroState,
    isPaused: boolean,
    initialDuration: number;
    remainingDuration: number
}

const initialState: PomodoroStoreState = {
    currentState: 'work',
    isPaused: false,
    initialDuration: 25 * 60,
    remainingDuration: 25 * 60,
};

export const pomodoroSlice = createSlice({
    name: 'pomodoroState',
    initialState: initialState satisfies PomodoroStoreState as PomodoroStoreState,
    reducers: {
        setCurrentState: (state, action: PayloadAction<PomodoroState>) => {
            state.currentState = action.payload;
        },
        setIsPaused: (state, action: PayloadAction<boolean>) => {
            state.isPaused = action.payload;
        },
        togglePause: (state) => {
            state.isPaused = !state.isPaused;
        },
        setRemainingDuration: (state, action: PayloadAction<number>) => {
            state.remainingDuration = action.payload;
        },
        setInitialDuration: (state, action: PayloadAction<number>) => {
            state.initialDuration = action.payload;
        }
    }
});

export const {
    setCurrentState,
    setIsPaused,
    togglePause,
    setInitialDuration,
    setRemainingDuration
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;