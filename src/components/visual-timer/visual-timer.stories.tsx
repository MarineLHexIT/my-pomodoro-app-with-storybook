import { Meta, StoryObj } from '@storybook/react';
import VisualTimer from './visual-timer.tsx';

const meta = {
    title: 'Pomodoro/Components/Canvas/VisualTimer',
    component: VisualTimer,
    argTypes: {
        initialTime: {
            type: 'number',
            description: 'Initial Time, in minutes, must be between 0 and 60 minutes',
        },
    }
} satisfies Meta<typeof VisualTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Default',
    args: {
        initialTime: 25,
        isPaused: false
    }
};

export const Paused: Story = {
    name: 'Paused',
    args: {
        ...Default.args,
        isPaused: true
    }
};
