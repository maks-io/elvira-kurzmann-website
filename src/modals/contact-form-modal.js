import React from "react";
import ContactForm from "../components/contact-form";
import Modal from "react-modal";

const ContactFormModal = ({ isOpen, handleClose }) => (
  <Modal isOpen={isOpen} onRequestClose={handleClose}>
    <ContactForm handleClose={handleClose} />
  </Modal>
);

export default ContactFormModal;
