import { Meta, StoryObj } from '@storybook/react';
import Clock from "./clock";
import { MockedStore } from '@/stores/mocked-store';
import { userEvent, within } from '@storybook/test';

const meta = {
    title: 'Pomodoro/Pages/Clock',
    component: Clock,
    decorators: [
        (Story) => (
            <MockedStore
                initialState={ {
                    pomodoro: {
                        initialDurationInMs: 25 * 60 * 1000,
                        remainingDurationInMs: 25 * 60 * 1000,
                        isPaused: true,
                        currentState: 'work' as const
                    },
                } }
            ><Story/></MockedStore>
        )
    ]
} satisfies Meta<typeof Clock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Work Clock',
    args: {
        durationInMinutes: 25
    }
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const StartedClock: Story = {
    name: 'Started Clock',
    args: {
        durationInMinutes: 25,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const startButton = canvas.getByTestId("start-button");
        await userEvent.click(startButton);

        await sleep(15*1000); // attendre 15 secondes

        const pauseButton = canvas.getByTestId("pause-button");
        await userEvent.click(pauseButton);

    }
};

export const BreakClock: Story = {
    args: {
        ...Default.args,
        durationInMinutes: 5
    }
}