import React from 'react';
import { Dialog } from 'primereact/Dialog';
import { Button } from 'primereact/button';

interface DialogProps {
    title: string;
    message?: string;
    isVisible: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    children?: React.ReactNode; // For custom content
}

const TaskDialog: React.FC<DialogProps> = ({ title, message, isVisible, onClose, onConfirm, children }) => {
    const footer = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={onClose} className="p-button-text" />
            {onConfirm && <Button label="Confirm" icon="pi pi-check" onClick={onConfirm} autoFocus />}
        </div>
    );

    return (
        <Dialog header={title} visible={isVisible} style={{ width: '30vw' }} footer={footer} onHide={onClose}>
            {children ? children : <p>{message}</p>}
        </Dialog>
    );
};

export default TaskDialog;
