import { useEffect, useState } from 'react';

type Phase = 'typing' | 'pausing' | 'deleting' | 'finished';

export const useTypewriterCycle = (
    words: string[],
    typingSpeed: number,
    deletingSpeed: number,
    pauseTime: number,
    resetKey?: string,
    ) => {
const [text, setText] = useState('');

useEffect(() => {
    if (words.length === 0) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let index = 0;
    let phase: Phase = 'typing';
    let current = '';

    const schedule = (delay: number) => {
    timeoutId = setTimeout(step, delay);
    };

    const step = () => {
    if (cancelled) return;
    const word = words[index];

    if (phase === 'typing') {
        current = word.slice(0, current.length + 1);
        setText(current);

        if (current === word) {
        if (index === words.length - 1) {
            phase = 'finished';
            return;
        }
        phase = 'pausing';
        schedule(pauseTime);
        } else {
        schedule(typingSpeed);
        }
    } else if (phase === 'pausing') {
        phase = 'deleting';
        schedule(deletingSpeed);
    } else if (phase === 'deleting') {
        current = current.slice(0, -1);
        setText(current);

        if (current === '') {
        index += 1;
        phase = 'typing';
        schedule(typingSpeed);
        } else {
        schedule(deletingSpeed);
        }
    }
    };

    schedule(typingSpeed);

    return () => {
    cancelled = true;
    clearTimeout(timeoutId);
    };
}, [words, typingSpeed, deletingSpeed, pauseTime, resetKey]);

return text;
};