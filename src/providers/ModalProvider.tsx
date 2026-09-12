import { createContext, useState, useCallback, type ReactNode } from "react";
import type { ModalType, ModalData, ModalContextType } from '../types/modal';


export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
    const [modalData, setModalData] = useState<ModalData | null>(null);

    const openModal = useCallback((type: ModalType, data?: ModalData) => {
        setCurrentModal(type);
        setModalData(data || null);
    }, []);

    const closeModal = useCallback(() => {
        setCurrentModal(null);
        setModalData(null);
    }, []);

    return (
        <ModalContext.Provider value={{ openModal, closeModal, currentModal, modalData }}>
            {children}
        </ModalContext.Provider>
    );
};