import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ colectionForRender, openModal, firstLoading }) => {
  return (
    <ul className={s.gallery}>
      <ImageGalleryItem
        images={colectionForRender}
        openModal={openModal}
        firstLoading={firstLoading}
      />
    </ul>
  );
};

export default ImageGallery;
