import Button from './button';
import { clsx } from 'clsx';
import { PauseIcon } from '@heroicons/react/24/solid';

interface StartButtonProps {
    disabled?: boolean,
    onClick?: () => void
}

export default function StartButton({ onClick, disabled = false }: StartButtonProps) {

    return <Button onClick={ onClick } disabled={ disabled }>
        <PauseIcon className={ clsx('size-6') }/>
    </Button>;
}