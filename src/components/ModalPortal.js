import ReactDOM from "react-dom";
import "./Modal.css";

//Sin la prop children no se visualiza el contenido que le mandamos desde Modals
const ModalPortal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    //agregamos la clase is-open solo cuando isOpen sea true
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </article>,
    //el id de modal lo toma de un div que se encuentra en index.html
    document.getElementById("modal")
  );
};

export default ModalPortal;
