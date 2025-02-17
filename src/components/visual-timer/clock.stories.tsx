import { Meta, StoryObj } from '@storybook/react';
import Clock from "./clock";
import { MockedStore } from '@/stores/mocked-store';
import { userEvent, within } from '@storybook/test';
import { pomodoroFocusState, pomodoroShortBreakState } from '@/shared/types/pomodoro-types.ts';

const meta = {
    title: 'Pomodoro/Pages/Clock',
    component: Clock
} satisfies Meta<typeof Clock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Work Clock',
    args: {
        durationInMinutes: 25
    },
    decorators: [
        (Story) => (
            <MockedStore
                initialState={ {
                    pomodoro: {
                        remainingDurationInMs: pomodoroFocusState.durationInMinutes * 60 * 1000,
                        isPaused: true,
                        currentState: pomodoroFocusState
                    },
                } }
            ><Story/></MockedStore>
        )
    ]
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const StartedClock: Story = {
    name: 'Started Clock',
    args: {
        durationInMinutes: 25,
    },
    decorators: [
        (Story) => (
            <MockedStore
                initialState={ {
                    pomodoro: {
                        remainingDurationInMs: pomodoroFocusState.durationInMinutes * 60 * 1000,
                        isPaused: true,
                        currentState: pomodoroFocusState
                    },
                } }
            ><Story/></MockedStore>
        )
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const startButton = canvas.getByTestId("start-button");
        await userEvent.click(startButton);

        await sleep(5*1000); // attendre 15 secondes

        const pauseButton = canvas.getByTestId("pause-button");
        await userEvent.click(pauseButton);

    }
};

export const BreakClock: Story = {
    args: {
        ...Default.args,
        durationInMinutes: 5
    },
    decorators: [
        (Story) => (
            <MockedStore
                initialState={ {
                    pomodoro: {
                        remainingDurationInMs: pomodoroShortBreakState.durationInMinutes * 60 * 1000,
                        isPaused: true,
                        currentState: pomodoroShortBreakState
                    },
                } }
            ><Story/></MockedStore>
        )
    ]
}