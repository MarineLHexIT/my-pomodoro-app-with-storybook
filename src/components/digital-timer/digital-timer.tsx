import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface DigitalTimerProps {
    currentTime: number; // in ms
}

export default function DigitalTimer({currentTime}: DigitalTimerProps): JSX.Element {

    return <div className="flex flex-row gap-2" data-testid="digital-timer">
        <div className="minutes">
            { dayjs.duration(currentTime, "milliseconds").format("mm") }
        </div>
        <div className="seconds">
            { dayjs.duration(currentTime, "milliseconds").format("ss") }
        </div>
    </div>
}