import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/loader/Loader';
import { Button } from 'components/button/Button';
import { ImageGalleryUl, Container } from './ImageGallery.styled';
import { fetchGalleryImg } from '../../Api/fetchGalleryImg';

export function ImageGallery({ showModal, searchQuery }) {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hiddenBnt, setHiddenBnt] = useState(false);

  const showErrorMsg = () => {
    toast.error('Sorry, there are no more images matching your search query.');
  };

  const onFindMore = () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
    setHiddenBnt(false);

    setTimeout(() => {
      fetchGalleryImg(searchQuery, page)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            showErrorMsg();
            setHiddenBnt(true);
          } else setImages(prevImages => [...prevImages, ...hits]);
          if (12 * page > totalHits) {
            setHiddenBnt(true);
            showErrorMsg();
          }
        })
        .catch(error => error)
        .finally(() => setLoading(false));
    });
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setLoading(true);
    setImages(null);
    setPage(1);
    setHiddenBnt(false);

    fetchGalleryImg(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          showErrorMsg();
        } else setImages(hits);
      })
      .catch(error => error)
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <Container>
      {loading && <Loader />}

      {images && (
        <ImageGalleryUl>
          {images.map(image => {
            return (
              <ImageGalleryItem
                showModal={() => showModal(image.largeImageURL)}
                key={image.id}
                smallImg={image.webformatURL}
                alt={image.tags}
              />
            );
          })}
        </ImageGalleryUl>
      )}
      {images && !hiddenBnt && <Button onFindMore={() => onFindMore()} />}
    </Container>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
