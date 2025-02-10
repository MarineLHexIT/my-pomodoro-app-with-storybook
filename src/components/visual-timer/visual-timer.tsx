import { useEffect, useRef, useState } from 'react';
import colors from 'tailwindcss/colors';

interface VisualTimerProps {
    initialTime: number; // Initial Time in MINUTES
    isPaused?: boolean;
}

const MAX_TIMER = 60 * 60 * 1000; // 1h en millisecondes

export default function VisualTimer({ initialTime = 25, isPaused = false }: VisualTimerProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const previousTimerRef = useRef<number>();
    const theme = colors.amber;

    const [currentTimer, setCurrentTimer] = useState<number>(initialTime * 60 * 1000);

    const drawTimer = (
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        time: number
    ) => {
        ctx.font = '18px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const timeInSeconds = time / 1000; // time in seconds
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');

        ctx.fillText(`${ minutes } : ${ seconds }`, centerX, centerY);
    };


    /**
     * Draw the clock, should be done once at first render
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} centerX
     * @param {number} centerY
     * @param {number} radius
     */
    const drawClock = (
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        radius: number
    ) => {

        const strokeWidth = 5;
        const startAngle = -Math.PI / 2;

        // Create circle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
        ctx.arc(centerX, centerY, radius - strokeWidth, 0, 2 * Math.PI, true);
        ctx.fillStyle = theme['600'];
        ctx.closePath();
        ctx.fill('evenodd');

        // add markers
        for ( let i = 0; i < 60; i += 1 ) {

            const iAngle = (i * 60 * 1000 / MAX_TIMER) * (2 * Math.PI) + startAngle;
            const length = i % 5 === 0 ? 4 : 2;
            const width = i % 5 === 0 ? 4 : 2;


            ctx.beginPath();
            ctx.moveTo(centerX + Math.cos(iAngle) * (radius - strokeWidth - length), centerY + Math.sin(iAngle) * (radius - strokeWidth - length));
            ctx.lineTo(centerX + Math.cos(iAngle) * (radius + length), centerY + Math.sin(iAngle) * (radius + length));
            ctx.strokeStyle = 'black';
            ctx.lineWidth = width;
            ctx.stroke();
            ctx.closePath();

            if ( i % 5 === 0 ) {

                const textRadius = radius + 15; // Position des chiffres un peu à l'extérieur du cercle
                const textX = centerX + Math.cos(iAngle) * textRadius;
                const textY = centerY + Math.sin(iAngle) * textRadius;

                ctx.font = '12px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(i.toString(), textX, textY);
            }
        }
    };

    /**
     * Draw the angle
     * @param ctx
     * @param centerX
     * @param centerY
     * @param radius
     * @param angle
     */
    const drawAngle = (
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        radius: number,
        angle: number
    ) => {

        // Create angle
        const startAngle = -Math.PI / 2;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, angle + startAngle);
        ctx.closePath();
        ctx.fillStyle = theme['500'];
        ctx.fill();
    };


    const drawCanvas = (time: number) => {

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
        const angle = (time / MAX_TIMER) * (2 * Math.PI); // 360 degrés;

        drawAngle(ctx, centerX, centerY, radius, angle);
        drawClock(ctx, centerX, centerY, radius);
        drawTimer(ctx, centerX, centerY, time);
    };

    const animate = (nowTime: number) => {

        if ( previousTimerRef.current === undefined ) {
            previousTimerRef.current = performance.now();
        }
        const deltaTime = nowTime - previousTimerRef.current; // Delta Time in MS

        previousTimerRef.current = performance.now();

        setCurrentTimer((prev) => prev - deltaTime);
        drawCanvas(currentTimer);

        requestRef.current = requestAnimationFrame(animate);
    };


    useEffect(() => {

        previousTimerRef.current = performance.now();
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            // destroy
            if ( requestRef.current ) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [initialTime]);

    useEffect(() => {
        console.log('currentTimer', currentTimer);
    }, [currentTimer]);

    return <canvas ref={ canvasRef } width={ 500 } height={ 500 }/>;
}