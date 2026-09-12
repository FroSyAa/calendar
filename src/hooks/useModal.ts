import { useContext } from 'react';
import { ModalContext } from '../providers/ModalProvider';
import type { ModalContextType } from '../types/modal';

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    
    return context;
};