import { Meta, StoryObj } from '@storybook/react';
import Clock from "./clock";
import usePomodoroStore from '@/stores/pomodoro-store.ts';

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
        (Story) => {

            usePomodoroStore.setState({ isPaused: false });
            return <Story/>;
        }
    ]
};

export const BreakClock: Story = {
    args: {
        ...Default.args,
        durationInMinutes: 5
    },
    decorators: [
        (Story) => {

            usePomodoroStore.setState({ isPaused: false });
            return <Story/>;
        }
    ]
}

export const PausedClock: Story = {
    args: {
        ...Default.args
    },
    decorators: [
        (Story) => {

            usePomodoroStore.setState({ isPaused: true });
            return <Story/>;
        }
    ]
};
