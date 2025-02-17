import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    PomodoroFocusState,
    PomodoroShortBreakState,
    PomodoroLongBreakState,
    PomodoroState,
    PomodoroStateName
} from '@/shared/types/pomodoro-types.ts';

interface PomodoroStoreState {
    currentState: PomodoroState,
    isPaused: boolean,
    initialDurationInMs: number;
    remainingDurationInMs: number
}

const initialState: PomodoroStoreState = {
    currentState: PomodoroFocusState,
    isPaused: true,
    initialDurationInMs: 25 * 60 * 1000,
    remainingDurationInMs: 25 * 60 * 1000,
};

export const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState: initialState satisfies PomodoroStoreState as PomodoroStoreState,
    reducers: {
        setCurrentState: (state, action: PayloadAction<PomodoroStateName>) => {
            switch(action.payload) {
                case "focus":
                    state.currentState = PomodoroFocusState;
                    break;
                case "short break":
                    state.currentState = PomodoroShortBreakState;
                    break;
                case "long break":
                    state.currentState = PomodoroLongBreakState;
                    break;
                default:
                    throw new Error("Unknown action type");

            }
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