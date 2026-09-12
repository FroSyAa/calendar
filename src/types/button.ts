import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'submit'

export interface ButtonProps {
    variant?: ButtonVariant;
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type: 'button' | 'submit' | 'reset';
}