import PropTypes from 'prop-types';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { nanoid } from 'nanoid';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ images, openModal, firstLoading }) {
  //console.log(images);
  //console.log(images);
  //useEffect(() => {
  //  console.log('images');
  //}, [images]);
  //useEffect(() => {
  //  console.log('openModal');
  //}, [openModal]);
  //useEffect(() => {
  //  console.log('firstLoading');
  //}, [firstLoading]);

  return (
    <>
      {images &&
        images.map(image => {
          return (
            <li key={nanoid()} className={s.galleryItem}>
              {!firstLoading ? (
                <img
                  key={image.id}
                  id={image.id}
                  onClick={openModal}
                  src={image.previewURL}
                  alt={image.tags}
                />
              ) : (
                <ContentLoader
                  key={image.id}
                  speed={2}
                  width={400}
                  height={160}
                  viewBox="0 0 400 160"
                  backgroundColor="#ccc"
                  foregroundColor="#eee"
                >
                  <rect x="0" y="0" rx="3" ry="3" width="150" height="84" />
                </ContentLoader>
              )}
            </li>
          );
        })}
    </>
  );
}
ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
