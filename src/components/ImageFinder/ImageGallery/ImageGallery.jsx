import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    hits: [],
    alt: '',
  };

  render() {
    const { colectionForRender, openModal } = this.props;

    return (
      <ul className={s.gallery}>
        <ImageGalleryItem images={colectionForRender} openModal={openModal} />
      </ul>
    );
  }
}

export default ImageGallery;
