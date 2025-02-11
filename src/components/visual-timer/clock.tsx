import { useState } from 'react';
import VisualTimer from '@/components/visual-timer/visual-timer.tsx';
import StartButton from '@/components/buttons/start-button.tsx';
import PauseButton from '@/components/buttons/pause-button.tsx';

interface ClockProps {
    durationInMinutes: number;
}

export default function Clock({ durationInMinutes }: ClockProps) {

    const [isPaused, setIsPaused] = useState<boolean>(false);

    return (
        <div className="grid w-[500px] h-[500px] place-items-center">
            <div className="col-start-1 row-start-1 w-full h-full">
                <VisualTimer
                    initialTime={ durationInMinutes }
                    isPaused={ isPaused }
                />
            </div>
            <div className="col-start-1 row-start-1">
                {
                    isPaused && <StartButton onClick={ () => setIsPaused(false) }/>
                }
                {
                    !isPaused && <PauseButton onClick={ () => setIsPaused(true) }/>
                }
            </div>
        </div>
    );
}