import { useEffect, useRef } from 'react';
import colors from 'tailwindcss/colors';

interface VisualTimerProps {
    currentTime?: number;
}

const MAX_TIMER = 60 * 60; // 1h en secondes

export default function VisualTimer({ currentTime = 25*60 }: VisualTimerProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const canvas = canvasRef.current;

        if ( canvas === null ) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if ( ctx === null ) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const [centerX, centerY] = [canvas.width / 2, canvas.height / 2];
        const radius = canvas.width / 2 - 20;

        // Create angle
        const startAngle = - Math.PI / 2;
        const angle = (currentTime / MAX_TIMER) * (2 * Math.PI) // 360 degrés;


        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, angle + startAngle);
        ctx.closePath();
        ctx.fillStyle = colors.amber['500'];
        ctx.fill();


        // Create circle
        ctx.beginPath();
        ctx.moveTo(centerX + radius, centerY);
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
        ctx.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI, true);
        ctx.fillStyle = colors.amber['600'];
        ctx.closePath();
        ctx.fill("evenodd");

    }, [currentTime]);

    return <canvas ref={ canvasRef } width={ 500 } height={ 500 }/>;
}