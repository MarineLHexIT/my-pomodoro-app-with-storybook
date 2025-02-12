import { act } from 'react';
import '@testing-library/jest-dom';

import usePomodoroStore from '@/stores/pomodoro-store';

afterEach(() => {
    usePomodoroStore.setState({
        initialDuration: 25,
        elapsedTime: 0,
        isPaused: false,
        currentState: 'work'
    });
});

describe('Pomodoro Store', () => {
    it('Initial state should be { currentState: work, isPaused: false, elapsedTime: 0}', async () => {
        const state = usePomodoroStore.getState();
        expect(state.currentState).toBe('work');
        expect(state.isPaused).toBe(false);
        expect(state.elapsedTime).toBe(0);
        expect(state.initialDuration).toBe(25);
    });

    it('should change the current state', () => {
        act(() => {
            usePomodoroStore.getState().setCurrentState('break');
        });
        expect(usePomodoroStore.getState().currentState).toBe('break');
    });

    it('should toggle the paused state', () => {
        expect(usePomodoroStore.getState().isPaused).toBe(false);
        act(() => {
            usePomodoroStore.getState().togglePause();
        });
        expect(usePomodoroStore.getState().isPaused).toBe(true);
    });

    it('should update the elapsed time', () => {

        expect(usePomodoroStore.getState().elapsedTime).toBeCloseTo(0);
        act(() => {
            usePomodoroStore.getState().setElapsedTime(30);
        })
        expect(usePomodoroStore.getState().elapsedTime).toBeCloseTo(30)

    });
});

