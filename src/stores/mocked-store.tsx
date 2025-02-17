import React from 'react';
import { Provider } from 'react-redux';
import { RootState } from '@/stores/index.ts';
import { configureStore } from '@reduxjs/toolkit';
import pomodoroReducer from "@/stores/pomodoro-slice"


type DeepPartial<T> = T extends object ?
    { [P in keyof T]?: DeepPartial<T[P]> } :
    T;

interface MockedStoreProps {
    initialState?: DeepPartial<RootState>;
    children: React.ReactNode;
}

export function MockedStore({ initialState, children }: MockedStoreProps) {

    const store = configureStore({
        reducer: {
            pomodoro: pomodoroReducer
        },
        preloadedState: initialState as RootState,
    });

    return (
        <Provider store={ store }>
            {children}
        </Provider>
    );
}