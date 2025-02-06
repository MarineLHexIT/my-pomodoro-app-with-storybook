import Button from "./button.tsx";
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Pomodoro/Components/Buttons/Button',
}

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "This is a button"
    }
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        children: "This is a disabled button",
        disabled: true
    }
}