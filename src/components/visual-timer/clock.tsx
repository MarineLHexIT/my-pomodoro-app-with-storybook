import { useEffect, useState } from 'react';
import VisualTimer from './visual-timer.tsx';

interface ClockProps {
    duration: number;
}

export default function Clock({ duration }: ClockProps) {

    const [currentTime, setCurrentTime] = useState<number>(duration);

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCurrentTime((prev) => prev - 1);

            console.log(currentTime);

            if ( currentTime === 0 ) {
                clearInterval(intervalID);
            }

        }, 1000);
    }, [duration]);

    return (
        <div>
            <VisualTimer currentTime={ currentTime }/>
            <span>{ currentTime }</span>
        </div>
    );
}