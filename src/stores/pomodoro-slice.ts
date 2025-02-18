import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    pomodoroFocusState,
    pomodoroStates,
    PomodoroState,
    PomodoroStateName, pomodoroLongBreakState, pomodoroShortBreakState,
} from '@/shared/types/pomodoro-types';

interface PomodoroStoreState {
    currentState: PomodoroState,
    isPaused: boolean,
    remainingDurationInMs: number,
    history: PomodoroState[]
}

const initialState: PomodoroStoreState = {
    currentState: pomodoroFocusState,
    isPaused: true,
    remainingDurationInMs: pomodoroFocusState.durationInMinutes * 60 * 1000,
    history: []
};

const updateState = (state: PomodoroStoreState, newState: PomodoroState) => {
    state.history.push(state.currentState);
    state.currentState = newState;
    state.remainingDurationInMs = newState.durationInMinutes * 60 * 1000;
};

export const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState: initialState satisfies PomodoroStoreState as PomodoroStoreState,
    reducers: {
        setCurrentState: (state, action: PayloadAction<PomodoroStateName>) => {
            updateState(state, pomodoroStates[action.payload as string]);
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
        resetHistory: (state) => {
            state.history = [];
        },
        nextState: (state) => {

            let nextState: PomodoroState;

            if ( state.currentState.name !== pomodoroFocusState.name ) {
                nextState = pomodoroFocusState;
            } else {
                if (
                    state.history.filter((historyState: PomodoroState) => historyState.name === pomodoroFocusState.name).length % 4 === 3
                ) {
                    nextState = pomodoroLongBreakState;
                } else {
                    nextState = pomodoroShortBreakState;
                }
            }
            updateState(state, nextState);
        }
    }
});

export const {
    setCurrentState,
    setIsPaused,
    togglePause,
    setRemainingDurationInMs,
    resetHistory,
    nextState,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;