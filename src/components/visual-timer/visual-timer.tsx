import { useEffect, useRef } from 'react';
import colors from 'tailwindcss/colors';

import { useDispatch } from 'react-redux';
import {
    setRemainingDurationInMs
} from '@/stores/pomodoro-slice'

type ExtractColorNames<T> = {
    [K in keyof T]: T[K] extends Record<string, string> ? K : never;
}[keyof T];

export type DisplayTheme = ExtractColorNames<typeof colors>;

interface VisualTimerProps {
    initialTime: number; // Initial Time in SECONDS
    remainingDuration?: number; // remaining time, in SECONDS, by default, same as initialDuration
    displayTheme?: DisplayTheme;
    isPaused?: boolean;
}

const MAX_TIMER = 60 * 60 * 1000; // 1h en millisecondes

export default function VisualTimer(
    {
        initialTime = 25 * 60,
        remainingDuration,
        displayTheme = 'amber',
        isPaused = false,
    }: VisualTimerProps
) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();
    const remainingTimeRef = useRef<number>(remainingDuration! || initialTime);
    const width = useRef<number>(500);

    const dispatch = useDispatch();
    const dispatchSetReminingDuration = (remainingDuration: number) => {
        dispatch(setRemainingDurationInMs(remainingDuration));
    }

    const theme = colors[displayTheme];

    const initialTimeInMs = initialTime * 1000;
    if ( canvasRef.current ) {
        const rect = canvasRef.current.parentElement?.getBoundingClientRect();
        width.current = Math.min(rect!.width, rect!.height);
    }

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

    const animate = () => {

        const now = performance.now();

        if ( previousTimeRef.current === undefined ) {
            previousTimeRef.current = now;
        }

        const deltaTime = now - previousTimeRef.current; // Delta Time in MS
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current! - deltaTime);
        previousTimeRef.current = now;

        dispatchSetReminingDuration(remainingTimeRef.current!);
        drawCanvas(remainingTimeRef.current);

        if ( !isPaused && remainingTimeRef.current! > 0 ) {
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {

        // init refs
        previousTimeRef.current = performance.now();
        remainingTimeRef.current = remainingDuration! * 1000 || initialTimeInMs;

        // Initial Drawing
        drawCanvas(initialTimeInMs);

        if ( !isPaused ) {
            requestRef.current = requestAnimationFrame(animate);
        }

        return () => {
            // destroy
            if ( requestRef.current ) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [initialTime]);

    useEffect(() => {

        if ( isPaused ) {
            if ( requestRef.current ) {
                cancelAnimationFrame(requestRef.current);
            }
        } else {
            previousTimeRef.current = performance.now();
            requestRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        }
    }, [isPaused])

    return <canvas ref={ canvasRef } width={ width.current } height={ width.current } className="w-full h-full"/>;
}