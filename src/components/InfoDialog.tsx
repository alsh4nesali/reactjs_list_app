import React from 'react';
import { Dialog } from 'primereact/Dialog';
import { Button } from 'primereact/button';

interface DialogProps {
    title: string;
    message?: string;
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode; // For custom content
}

const infoDialog: React.FC<DialogProps> = ({ title, message, isVisible, onClose, children }) => {
    const footer = (
        <div>
            {onClose && <Button label="Close" onClick={onClose} autoFocus />}
        </div>
    );

    return (
        <Dialog header={title} visible={isVisible} style={{ width: '50vw' }} footer={footer} onHide={onClose}>
            {children ? children : <p>{message}</p>}
        </Dialog>
    );
};

export default infoDialog;
