import { Meta, StoryObj } from '@storybook/react';
import Clock from "./clock";

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
    }
};

export const BreakClock: Story = {
    args: {
        ...Default.args,
        durationInMinutes: 5
    }
}
