import PauseButton from "./pause-button.tsx";
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PauseButton> = {
    component: PauseButton,
    title: 'Pomodoro/Buttons/PauseButton',
}

export default meta;

type Story = StoryObj<typeof PauseButton>;

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