import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PomodoroState = 'work' | 'break';

interface PomodoroStoreState {
    currentState: PomodoroState,
    isPaused: boolean,
    initialDurationInMs: number;
    remainingDurationInMs: number
}

const initialState: PomodoroStoreState = {
    currentState: 'work',
    isPaused: false,
    initialDurationInMs: 25 * 60 * 1000,
    remainingDurationInMs: 25 * 60 * 1000,
};

export const pomodoroSlice = createSlice({
    name: 'pomodoro',
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
        setRemainingDurationInMs: (state, action: PayloadAction<number>) => {
            state.remainingDurationInMs = action.payload;
        },
        setInitialDurationInMs: (state, action: PayloadAction<number>) => {
            state.initialDurationInMs = action.payload;
        }
    }
});

export const {
    setCurrentState,
    setIsPaused,
    togglePause,
    setInitialDurationInMs,
    setRemainingDurationInMs
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;