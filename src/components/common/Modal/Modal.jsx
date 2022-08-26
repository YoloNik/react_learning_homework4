import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({ isModalOpen, imageSrc, closeModal }) {
  return (
    <>
      {isModalOpen && (
        <div onClick={closeModal} className={s.overlay}>
          <div className={s.modal}>
            <img src={imageSrc.largeImageURL} alt={imageSrc.tags} />
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  imageSrc: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
