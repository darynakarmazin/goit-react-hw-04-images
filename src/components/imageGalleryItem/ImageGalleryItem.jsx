import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemLi } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ showModal, smallImg, alt }) {
  return (
    <ImageGalleryItemLi onClick={showModal}>
      <img src={smallImg} alt={alt} />
    </ImageGalleryItemLi>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
