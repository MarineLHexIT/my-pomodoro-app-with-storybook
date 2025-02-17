import reducer, {
    setCurrentState,
    setIsPaused,
    togglePause,
    setRemainingDurationInMs
} from '@/stores/pomodoro-slice';
import { RootState } from '@/stores';
import { pomodoroFocusState, pomodoroShortBreakState } from '@/shared/types/pomodoro-types';

describe('Pomodoro Slice', () => {

    const initialDuration = 25*60;
    const initialState: RootState = {
        pomodoro: {
            currentState: pomodoroFocusState,
            isPaused: false,
            remainingDurationInMs: initialDuration,
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
});