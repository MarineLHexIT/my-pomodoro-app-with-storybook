import reducer, {
    setCurrentState,
    setIsPaused,
    togglePause,
    setRemainingDurationInMs, nextState, resetHistory
} from '@/stores/pomodoro-slice';
import { RootState } from '@/stores';
import { pomodoroFocusState, pomodoroLongBreakState, pomodoroShortBreakState } from '@/shared/types/pomodoro-types';

describe('Pomodoro Slice', () => {

    const initialDuration = 25*60;
    const initialState: RootState = {
        pomodoro: {
            currentState: pomodoroFocusState,
            isPaused: false,
            remainingDurationInMs: initialDuration,
            history: []
        }
    };

    it('should set the current state', () => {
        const newState = reducer(initialState.pomodoro, setCurrentState('short break'));
        expect(newState.currentState).toEqual(pomodoroShortBreakState);
    });

    it("should set isPaused", () => {
        const newState = reducer(initialState.pomodoro, setIsPaused(true));
        expect(newState.isPaused).toBe(true);
    });

    it("should toggle pause", () => {
        const newState = reducer(initialState.pomodoro, togglePause());
        expect(newState.isPaused).toBe(true);
    });

    it("should set remaining duration", () => {
        const newState = reducer(initialState.pomodoro, setRemainingDurationInMs(900));
        expect(newState.remainingDurationInMs).toBe(900);
    });

    it('should build history', () => {
        let newState = reducer(initialState.pomodoro, setCurrentState('short break'));
        newState = reducer(newState, setCurrentState('focus'));
        newState = reducer(newState, setCurrentState('short break'));
        newState = reducer(newState, setCurrentState('focus'));
        newState = reducer(newState, setCurrentState('long break'));

        expect(newState.history.length).toBe(5);
        expect(newState.history.at(-1)).toBe(pomodoroFocusState);
        expect(newState.currentState).toBe(pomodoroLongBreakState);
    });

    it('should create new state according to logic', () => {

        let newState = reducer(initialState.pomodoro, resetHistory()); // focus

        newState = reducer(newState, nextState()); // short break
        expect(newState.history.at(-1)).toBe(pomodoroFocusState);
        expect(newState.currentState).toBe(pomodoroShortBreakState);

        newState = reducer(newState, nextState()); // focus
        expect(newState.history.at(-1)).toBe(pomodoroShortBreakState);
        expect(newState.currentState).toBe(pomodoroFocusState);

        newState = reducer(newState, nextState()); // short break
        expect(newState.history.at(-1)).toBe(pomodoroFocusState);
        expect(newState.currentState).toBe(pomodoroShortBreakState);

        newState = reducer(newState, nextState()); // focus
        expect(newState.history.at(-1)).toBe(pomodoroShortBreakState);
        expect(newState.currentState).toBe(pomodoroFocusState);

        newState = reducer(newState, nextState()); // short break
        expect(newState.history.at(-1)).toBe(pomodoroFocusState);
        expect(newState.currentState).toBe(pomodoroShortBreakState);

        newState = reducer(newState, nextState()); // focus
        expect(newState.history.at(-1)).toBe(pomodoroShortBreakState);
        expect(newState.currentState).toBe(pomodoroFocusState);

        newState = reducer(newState, nextState()); // long break
        expect(newState.history.at(-1)).toBe(pomodoroFocusState);
        expect(newState.currentState).toBe(pomodoroLongBreakState);
    });
});