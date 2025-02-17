import { clsx } from 'clsx';
import { PauseIcon } from '@heroicons/react/24/solid';
import Button from '@/components/buttons/button.tsx';

interface PauseButtonProps {
    disabled?: boolean,
    onClick?: () => void
}

export default function PauseButton({ onClick, disabled = false }: PauseButtonProps) {

    return <Button onClick={ onClick } disabled={ disabled } data-testId="pause-button">
        <PauseIcon className={ clsx('size-6') }/>
    </Button>;
}