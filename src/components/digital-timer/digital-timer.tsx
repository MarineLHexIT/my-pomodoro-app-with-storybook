import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import styled from 'styled-components';
import colors from 'tailwindcss/colors';
import { clsx } from 'clsx';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const DigitsContainer = styled.div`
    font-size: 60px;
    position: relative;
    width: 65px;
    text-align: right;
    
    &::after {
        font-size: 12px;
        position: absolute;
        right: 0;
        bottom: 0;
        color: ${colors.slate["500"]};
    }
    
    &.minutes::after {
        content: "minutes"
    }
    
    &.seconds::after {
        content: "seconds"
    }
`

interface DigitalTimerProps {
    currentTime: number; // in ms
}

export default function DigitalTimer({currentTime, ...props}: DigitalTimerProps & Partial<HTMLElement>): JSX.Element {


    return <div className={clsx("flex flex-row gap-4", props.className)} data-testid="digital-timer">
        <DigitsContainer className="minutes" data-testid="minutes">
            { dayjs.duration(currentTime, "milliseconds").format("mm") }
        </DigitsContainer>
        <DigitsContainer className="seconds" data-testid="seconds">
            { dayjs.duration(currentTime, "milliseconds").format("ss") }
        </DigitsContainer>
    </div>
}