import DigitalTimer from '@/components/digital-timer/digital-timer.tsx';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Pomodoro/Components/DigitalTimer',
    component: DigitalTimer
} satisfies Meta<typeof DigitalTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DigitalTimerStory: Story = {
    name: 'Default',
    args: {
        currentTime: 25*60*1000,
    }
};
