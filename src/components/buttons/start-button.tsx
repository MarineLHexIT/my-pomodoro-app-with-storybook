import { clsx } from 'clsx';
import { PlayIcon } from '@heroicons/react/24/solid';
import Button from '@/components/buttons/button.tsx';
import { DisplayTheme } from '@/shared/types/colors-types.ts';

interface StartButtonProps {
    disabled?: boolean,
    onClick?: () => void,
    theme?: DisplayTheme
}

export default function StartButton({ onClick, disabled = false, theme = 'amber' }: StartButtonProps) {

    return <Button onClick={ onClick } disabled={ disabled } data-testId="start-button" theme={ theme }>
        <PlayIcon className={ clsx('size-6') }/>
    </Button>;
}