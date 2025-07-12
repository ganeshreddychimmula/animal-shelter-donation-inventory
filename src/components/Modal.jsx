import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    // Effect to handle Escape key press for closing the modal.
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // If the modal is not open, return null to avoid rendering.
  if (!isOpen) return null;

  return (
    <div className="l-imposter" onClick={onClose}>
      <div className="l-box b-modal"  onClick={(e) => e.stopPropagation()}>
        <button className="b-modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;