import { useEffect } from 'react';
import VisualTimer from '@/components/visual-timer/visual-timer.tsx';
import StartButton from '@/components/buttons/start-button.tsx';
import PauseButton from '@/components/buttons/pause-button.tsx';
import usePomodoroStore from '@/stores/pomodoro-store.ts';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import DigitalTimer from '@/components/digital-timer/digital-timer.tsx';

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ClockProps {
    durationInMinutes: number;
}

export default function Clock({ durationInMinutes }: ClockProps) {

    const { isPaused, togglePause, setRemainingDuration, remainingDuration } = usePomodoroStore();

    useEffect(() => {
        setRemainingDuration(durationInMinutes * 60);
    }, [durationInMinutes]);

    return (
        <div className="flex flex-col gap-2">
        <div className="grid w-[500px] h-[500px] place-items-center">
            <div className="col-start-1 row-start-1 w-full h-full">
                <VisualTimer
                    initialTime={ durationInMinutes * 60 }
                    remainingDuration={ remainingDuration }
                    isPaused={ isPaused }
                />
            </div>
            <div className="col-start-1 row-start-1">
                {
                    isPaused && <StartButton onClick={ togglePause }/>
                }
                {
                    !isPaused && <PauseButton onClick={ togglePause }/>
                }
            </div>
        </div>
            <DigitalTimer currentTime={ remainingDuration }/>
        </div>
    );
}