import { clsx } from 'clsx';
import { PlayIcon } from '@heroicons/react/24/solid';
import Button from '@/components/buttons/button.tsx';

interface StartButtonProps {
    disabled?: boolean,
    onClick?: () => void
}

export default function StartButton({ onClick, disabled = false }: StartButtonProps) {

    return <Button onClick={ onClick } disabled={ disabled }>
        <PlayIcon className={ clsx('size-6') }/>
    </Button>;
}