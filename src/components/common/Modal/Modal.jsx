import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({ isModalOpen, imageSrc, closeModal, id }) {
  return (
    <>
      {isModalOpen && (
        <div onClick={closeModal} className={s.overlay}>
          <div className={s.modal}>
            <img id={id} src={imageSrc.largeImageURL} alt={imageSrc.tags} />
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  imageSrc: PropTypes.object,
};

export default Modal;
