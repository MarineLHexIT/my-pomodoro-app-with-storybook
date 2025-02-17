import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    pomodoroFocusState,
    pomodoroStates,
    PomodoroState,
    PomodoroStateName,
} from '@/shared/types/pomodoro-types';

interface PomodoroStoreState {
    currentState: PomodoroState,
    isPaused: boolean,
    remainingDurationInMs: number
}

const initialState: PomodoroStoreState = {
    currentState: pomodoroFocusState,
    isPaused: true,
    remainingDurationInMs: pomodoroFocusState.durationInMinutes * 60 * 1000,
};

export const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState: initialState satisfies PomodoroStoreState as PomodoroStoreState,
    reducers: {
        setCurrentState: (state, action: PayloadAction<PomodoroStateName>) => {
            state.currentState = pomodoroStates[action.payload];
            state.remainingDurationInMs = state.currentState.durationInMinutes * 60 * 1000;
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
    }
});

export const {
    setCurrentState,
    setIsPaused,
    togglePause,
    setRemainingDurationInMs
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;