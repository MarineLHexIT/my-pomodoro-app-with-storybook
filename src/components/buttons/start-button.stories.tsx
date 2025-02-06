import StartButton from "./start-button.tsx";
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StartButton> = {
    component: StartButton,
    title: 'Pomodoro/Components/Buttons/StartButton',
}

export default meta;

type Story = StoryObj<typeof StartButton>;

export const Default: Story = {
    args: {
    }
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
}