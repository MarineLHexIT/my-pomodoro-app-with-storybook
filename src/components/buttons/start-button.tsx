interface StartedButtonProps {
    onClick?: () => void;
}

export default function StartButton({ onClick }: StartedButtonProps) {
    return <div onClick={ onClick }>This is a button</div>;
}