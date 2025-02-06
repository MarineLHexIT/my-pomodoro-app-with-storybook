import StartButton from "./start-button.tsx";
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StartButton> = {
    component: StartButton,
    title: 'Pomodoro/Buttons/StartButton',
}

export default meta;

type Story = StoryObj<typeof StartButton>;

export const Default: Story = {
    args: {}
}
