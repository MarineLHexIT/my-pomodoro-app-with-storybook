import { Meta, StoryObj } from '@storybook/react';
import VisualTimer from './visual-timer.tsx';

const meta = {
    title: 'Pomodoro/Canvas/VisualTimer',
    component: VisualTimer,
} satisfies Meta<typeof VisualTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Default',
    args: {

    }
};
