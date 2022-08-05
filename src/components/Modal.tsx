import './Modal.css';

interface PropTypes {
  onClose: () => void; show: boolean; children: React.ReactNode
}

const Modal = ({ onClose, show, children }: PropTypes) => {
  const showHideClassName = show ? "modal modal-display__block" : "modal modal-display__none";
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  }
  return (
    <div className={showHideClassName}
      onClick={onClose}
    >
      <section className="modal-main"
        onClick={stopPropagation}>
        {children}
      </section>
    </div>
  );
};

export default Modal