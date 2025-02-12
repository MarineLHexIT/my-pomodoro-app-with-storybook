import { act } from 'react';
import '@testing-library/jest-dom';

import usePomodoroStore from '@/stores/pomodoro-store';

afterEach(() => {
    usePomodoroStore.setState({
        initialDuration: 25*60,
        remainingDuration: 25*60,
        isPaused: false,
        currentState: 'work'
    });
});

describe('Pomodoro Store', () => {
    it('Initial state should be { currentState: work, isPaused: false, elapsedTime: 0}', async () => {
        const state = usePomodoroStore.getState();
        expect(state.currentState).toBe('work');
        expect(state.isPaused).toBe(false);
        expect(state.remainingDuration).toBe(25*60);
        expect(state.initialDuration).toBe(25*60);
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

        expect(usePomodoroStore.getState().remainingDuration).toBeCloseTo(25*60);
        act(() => {
            usePomodoroStore.getState().setRemainingDuration(20*60);
        })
        expect(usePomodoroStore.getState().remainingDuration).toBeCloseTo(20*60)

    });
});

