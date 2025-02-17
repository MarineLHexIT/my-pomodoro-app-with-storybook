import { Button as HeadlessButton, ButtonProps as HeadlessButtonProps } from '@headlessui/react';
import { clsx } from 'clsx';

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export default function Button({ onClick, disabled = false, children, ...props }: ButtonProps & HeadlessButtonProps) {

    return <HeadlessButton
        className={ clsx('rounded bg-amber-600 py-2 px-4 text-sm text-white data-[hover]:bg-amber-500 data-[hover]:cursor-pointer data-[active]:bg-amber-700 data-[disabled]:bg-amber-800 data-[disabled]:text-slate-400 data-[disabled]:cursor-not-allowed') }
        onClick={ onClick }
        disabled={ disabled }
        { ...props }
    >
        { children }
    </HeadlessButton>;
}