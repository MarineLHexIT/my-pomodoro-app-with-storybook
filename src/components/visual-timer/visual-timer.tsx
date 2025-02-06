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
        const radius = canvas.width / 2 - 30;
        const strokeWidth = 5;

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
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
        ctx.arc(centerX, centerY, radius - strokeWidth, 0, 2 * Math.PI, true);
        ctx.fillStyle = colors.amber['600'];
        ctx.closePath();
        ctx.fill("evenodd");

        // add markers
        for ( let i = 0; i < 60; i += 1 ) {

            const iAngle = (i * 60 / MAX_TIMER) * (2 * Math.PI) + startAngle;
            const length = i % 5 === 0 ? 4 : 2;
            const width = i % 5 === 0 ? 4 : 2;


            ctx.beginPath();
            ctx.moveTo(centerX + Math.cos(iAngle) * (radius - strokeWidth - length), centerY + Math.sin(iAngle) * (radius - strokeWidth - length));
            ctx.lineTo(centerX + Math.cos(iAngle) * (radius + length), centerY + Math.sin(iAngle) * (radius + length));
            ctx.strokeStyle = 'black';
            ctx.lineWidth = width;
            ctx.stroke();
            ctx.closePath();

            if (i % 5 === 0) {

                const textRadius = radius + 15; // Position des chiffres un peu à l'extérieur du cercle
                const textX = centerX + Math.cos(iAngle) * textRadius;
                const textY = centerY + Math.sin(iAngle) * textRadius;

                ctx.font = "12px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(i.toString(), textX, textY);
            }
        }

    }, [currentTime]);

    return <canvas ref={ canvasRef } width={ 500 } height={ 500 }/>;
}