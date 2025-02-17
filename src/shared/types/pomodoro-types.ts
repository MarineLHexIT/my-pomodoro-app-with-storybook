import { DisplayTheme } from '@/shared/types/colors-types';

export type PomodoroStateName = "focus" | "short break" | "long break" | "custom";

export type PomodoroState = {
    name: PomodoroStateName,
    durationInMinutes: number;
    theme: DisplayTheme
}

export const pomodoroFocusState: PomodoroState = {
    name: "focus",
    durationInMinutes: 25,
    theme: 'amber'
}

export const pomodoroShortBreakState: PomodoroState = {
    name: "short break",
    durationInMinutes: 5,
    theme: 'sky'
};

export const pomodoroLongBreakState: PomodoroState = {
    name: "long break",
    durationInMinutes: 15,
    theme: 'indigo'
}

export const pomodoroStates: {[key: string]: PomodoroState} = [
    pomodoroFocusState,
    pomodoroShortBreakState,
    pomodoroLongBreakState,
].reduce((previousValue, currentValue) => {

    const stateName: string = currentValue.name;
    return {
        ...previousValue,
        [stateName]: currentValue
    };
}, {});

