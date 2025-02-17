import { clsx } from 'clsx';
import { PauseIcon } from '@heroicons/react/24/solid';
import Button from '@/components/buttons/button.tsx';
import { DisplayTheme } from '@/shared/types/colors-types.ts';

interface PauseButtonProps {
    disabled?: boolean,
    onClick?: () => void,
    theme?: DisplayTheme
}

export default function PauseButton({ onClick, theme = 'amber', disabled = false }: PauseButtonProps) {

    return <Button onClick={ onClick } disabled={ disabled } data-testId="pause-button" theme={ theme }>
        <PauseIcon className={ clsx('size-6') }/>
    </Button>;
}