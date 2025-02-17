import { Meta, StoryObj } from '@storybook/react';
import VisualTimer, { DisplayTheme } from './visual-timer.tsx';
import { MockedStore } from '@/stores/mocked-store';

import colors from 'tailwindcss/colors';

const colorOptions: DisplayTheme[] = Object
    .keys(colors)
    .filter((key): key is DisplayTheme => typeof colors[key as keyof typeof colors] === 'object');

const meta = {
    title: 'Pomodoro/Components/Canvas/VisualTimer',
    component: VisualTimer,
    argTypes: {
        initialTime: {
            type: 'number',
            description: 'Initial Time, in minutes, must be between 0 and 60 minutes',
        },
        displayTheme: {
            options: colorOptions
        }
    },
    decorators: [
        (Story) => (
            <div className="w-[500px] h-[500px]">
                <Story />
            </div>
        ),
        (Story) => (
            <MockedStore
                initialState={ {
                    pomodoro: {
                        initialDurationInMs: 25 * 60 * 1000,
                        remainingDurationInMs: 25 * 60 * 1000,
                        isPaused: false,
                        currentState: 'work' as const
                    },
                } }
            ><Story/></MockedStore>
        )
    ]
} satisfies Meta<typeof VisualTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Default',
    args: {
        initialTime: 25*60,
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

export const BlueClock: Story = {
    args: {
        ...Default.args,
        displayTheme: 'sky'
    }
};
