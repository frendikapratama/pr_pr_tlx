// resources/js/components/Modal.jsx
import React from "react";

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "lg",
}) {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className={`modal-dialog modal-${size}`} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">{children}</div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" onClick={onClose}></div>
        </>
    );
}
