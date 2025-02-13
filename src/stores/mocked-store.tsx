import React from 'react';
import { Provider } from 'react-redux';
import { RootState } from '@/stores/index.ts';
import { configureStore } from '@reduxjs/toolkit';
import pomodoroReducer from "@/stores/pomodoro-slice"


interface MockedStoreProps {
    initialState?: Partial<RootState>;
    children: React.ReactNode;
}

export function MockedStore({ initialState, children }: MockedStoreProps) {

    const store = configureStore({
        reducer: pomodoroReducer,
        preloadedState: (initialState as RootState).pomodoro
    });

    return (
        <Provider store={ store }>
            {children}
        </Provider>
    );
}