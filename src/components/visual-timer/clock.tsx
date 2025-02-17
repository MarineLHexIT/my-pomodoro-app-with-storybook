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
    togglePause
} from '@/stores/pomodoro-slice';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function Clock() {

    const dispatch = useDispatch();
    const { currentState, isPaused, remainingDurationInMs } = useSelector(
        (state: RootState) => state.pomodoro
    );

    const dispatchTogglePause = () => {
        dispatch(togglePause());
    };

    return (
        <div className="flex flex-col gap-2 items-center size-[500px]">
            <div className="grid place-items-center">
                <div className="col-start-1 row-start-1 w-full h-full">
                    <VisualTimer
                        initialTime={ currentState.durationInMinutes * 60 }
                        remainingDuration={ remainingDurationInMs / 1000 }
                        displayTheme={ currentState.theme }
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
            <DigitalTimer currentTime={ remainingDurationInMs } className="text-amber-600"/>
        </div>
    );
}