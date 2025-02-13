import { Meta, StoryObj } from '@storybook/react';
import Clock from "./clock";
import { MockedStore } from '@/stores/mocked-store';

const meta = {
    title: 'Pomodoro/Pages/Clock',
    component: Clock,
    decorators: [
        (Story) => (
            <MockedStore
                initialState={ {
                    pomodoro: {
                        initialDuration: 25*60,
                        remainingDuration: 25 * 60,
                        isPaused: false,
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

export const BreakClock: Story = {
    args: {
        ...Default.args,
        durationInMinutes: 5
    }
}