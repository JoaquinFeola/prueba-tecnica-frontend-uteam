import { useState } from "react";

type Modals<T> = Record<keyof T, boolean>


export const useModal = <T>(modals: Modals<T>) => {
    const [modal, setModalOpen] = useState<Modals<T>>(modals);
    
    const handleOpenModal = (modalKey: keyof Modals<T>) => {
        setModalOpen(p => ({
            ...p, 
            [modalKey]: true
        }))
    };

    const handleCloseModal = (modalKey: keyof Modals<T>) => {
        setModalOpen(p => ({
            ...p, 
            [modalKey]: false
        }))
    };

    return {
        modal,
        handleCloseModal,
        handleOpenModal
    }
}
