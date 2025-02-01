import React from 'react';
import { RxCrossCircled } from "react-icons/rx";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-white/30 backdrop-blur-sm ">
            <div className="mt-30  rounded-lg shadow-lg w-1/3 bg-white ">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <RxCrossCircled size={'2em'} />
                    </button>
                </div>
                <div className=" p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;