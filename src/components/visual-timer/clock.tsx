import { useEffect } from 'react';
import VisualTimer from '@/components/visual-timer/visual-timer.tsx';
import StartButton from '@/components/buttons/start-button.tsx';
import PauseButton from '@/components/buttons/pause-button.tsx';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import DigitalTimer from '@/components/digital-timer/digital-timer.tsx';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import {
    togglePause, setRemainingDurationInMs
} from '@/stores/pomodoro-slice';

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ClockProps {
    durationInMinutes: number;
}

export default function Clock({ durationInMinutes }: ClockProps) {

    const dispatch = useDispatch();
    const { isPaused, remainingDurationInMs } = useSelector(
        (state: RootState) => state.pomodoro
    );

    const dispatchRemainingDuration = (durationInMinutes: number) => {
        dispatch(setRemainingDurationInMs(durationInMinutes * 60 * 1000));
    };

    const dispatchTogglePause = () => {
        dispatch(togglePause());
    };


    useEffect(() => {
        dispatchRemainingDuration(durationInMinutes);
    }, [durationInMinutes]);

    return (
        <div className="flex flex-col gap-2">
        <div className="grid w-[500px] h-[500px] place-items-center">
            <div className="col-start-1 row-start-1 w-full h-full">
                <VisualTimer
                    initialTime={ durationInMinutes * 60 }
                    remainingDuration={ remainingDurationInMs / 1000 }
                    isPaused={ isPaused }
                />
            </div>
            <div className="col-start-1 row-start-1">
                {
                    isPaused && <StartButton onClick={ dispatchTogglePause }/>
                }
                {
                    !isPaused && <PauseButton onClick={ dispatchTogglePause }/>
                }
            </div>
        </div>
            <DigitalTimer currentTime={ remainingDurationInMs }/>
        </div>
    );
}