import PropTypes from 'prop-types';
import React from 'react';
import ContentLoader from 'react-content-loader';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ apiRes, openModal, firstLoading }) {
  return (
    <>
      {apiRes &&
        apiRes.map(image => {
          return (
            <li key={image.id} className={s.galleryItem}>
              {!firstLoading ? (
                <img
                  id={image.id}
                  onClick={openModal}
                  src={image.previewURL}
                  alt={image.tags}
                />
              ) : (
                <ContentLoader
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
  apiRes: PropTypes.array,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
