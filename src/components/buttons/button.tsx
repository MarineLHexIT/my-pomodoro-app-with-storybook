import { Button as HeadlessButton, ButtonProps as HeadlessButtonProps } from '@headlessui/react';
import { clsx } from 'clsx';
import { DisplayTheme } from '@/shared/types/colors-types.ts';

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    theme: DisplayTheme
}

export default function Button({ onClick, disabled = false, children, theme, ...props }: ButtonProps & HeadlessButtonProps) {

    return <HeadlessButton
        className={ clsx(
            `rounded py-2 px-4 text-sm text-white  data-[hover]:cursor-pointer  data-[disabled]:text-slate-400 data-[disabled]:cursor-not-allowed`,
            {
                ' bg-amber-600 data-[hover]:bg-amber-500 data-[active]:bg-amber-700 data-[disabled]:bg-amber-800': theme === "amber",
                ' bg-sky-600 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-sky-800': theme === "sky",
                ' bg-indigo-600 data-[hover]:bg-indigo-500 data-[active]:bg-indigo-700 data-[disabled]:bg-indigo-800': theme === "indigo",
            }
        ) }
        onClick={ onClick }
        disabled={ disabled }
        { ...props }
    >
        { children }
    </HeadlessButton>;
}