import { useState } from "react";

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  //Metodo para abrir el modal
  const openModal = () => setIsOpen(true);

  //Metodo para cerrar el Modal
  const closeModal = () => setIsOpen(false);

  return[isOpen, openModal, closeModal];
};
