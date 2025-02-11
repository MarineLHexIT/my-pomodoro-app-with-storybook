import { useEffect, useState } from 'react';
import VisualTimer from './visual-timer.tsx';

interface ClockProps {
    durationInMinutes: number;
}

export default function Clock({ durationInMinutes }: ClockProps) {

    const [currentTime, setCurrentTime] = useState<number>(durationInMinutes);

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCurrentTime((prev) => prev - 1);

            console.log(currentTime);

            if ( currentTime === 0 ) {
                clearInterval(intervalID);
            }

        }, 1000);
    }, [durationInMinutes]);

    return (
        <div>
            <VisualTimer initialTime={ durationInMinutes } isPaused={ false }/>
            <span>{ currentTime }</span>
        </div>
    );
}