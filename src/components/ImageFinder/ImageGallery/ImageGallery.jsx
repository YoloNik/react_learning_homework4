import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ apiRes, openModal, firstLoading }) => {
  return (
    <ul className={s.gallery}>
      <ImageGalleryItem
        apiRes={apiRes}
        openModal={openModal}
        firstLoading={firstLoading}
      />
    </ul>
  );
};

export default ImageGallery;
