import { DisplayTheme } from '@/shared/types/colors-types.ts';

export type PomodoroStateName = "focus" | "short break" | "long break" | "custom";

export type PomodoroState = {
    name: PomodoroStateName,
    durationInMinutes: number;
    theme: DisplayTheme
}

export const PomodoroFocusState: PomodoroState = {
    name: "focus",
    durationInMinutes: 25,
    theme: 'amber'
}

export const PomodoroShortBreakState: PomodoroState = {
    name: "short break",
    durationInMinutes: 5,
    theme: 'sky'
};

export const PomodoroLongBreakState: PomodoroState = {
    name: "long break",
    durationInMinutes: 15,
    theme: 'indigo'
}



