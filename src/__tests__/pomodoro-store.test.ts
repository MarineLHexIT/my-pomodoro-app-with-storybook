import reducer, {
    setCurrentState,
    setIsPaused,
    togglePause,
    setInitialDuration,
    setRemainingDuration
} from '@/stores/pomodoro-slice';

describe('Pomodoro Slice', () => {

    const initialDuration = 25*60;
    const initialState = {
        currentState: "work" as const,
        isPaused: false,
        initialDuration,
        remainingDuration: initialDuration,
    };

    it('should set the current state', () => {

        const newState = reducer(initialState, setCurrentState("break"));
        expect(newState.currentState).toBe("break");
    });

    it("should set isPaused", () => {
        const newState = reducer(initialState, setIsPaused(true));
        expect(newState.isPaused).toBe(true);
    });

    it("should toggle pause", () => {
        const newState = reducer(initialState, togglePause());
        expect(newState.isPaused).toBe(true);
    });

    it("should set initial duration", () => {

        const newState = reducer(initialState, setInitialDuration(1800));
        expect(newState.initialDuration).toBe(1800);
    });

    it("should set remaining duration", () => {
        const newState = reducer(initialState, setRemainingDuration(900));
        expect(newState.remainingDuration).toBe(900);
    });
});