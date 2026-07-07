const ConfirmModal = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel
}) => {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="confirm-modal">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="modal-buttons">

                    <button
                        className="btn-cancelar"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-confirmar"
                        onClick={onConfirm}
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ConfirmModal;