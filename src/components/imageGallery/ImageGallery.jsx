import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/loader/Loader';
import { Button } from 'components/button/Button';
import { ImageGalleryUl, Container } from './ImageGallery.styled';
import { fetchGalleryImg } from '../../Api/fetchGalleryImg';

export function ImageGallery({ showModal, searchQuery }) {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hiddenBnt, setHiddenBnt] = useState(true);

  const showErrorMsg = () => {
    toast.error('Sorry, there are no more images matching your search query.');
  };

  const onFindMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setImages([]);
      setPage(1);
      setHiddenBnt(true);
    }

    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = (searchQuery, page) => {
    setLoading(true);
    fetchGalleryImg(searchQuery, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          showErrorMsg();
          setHiddenBnt(true);
          return;
        } else {
          setImages(prevImages => [...prevImages, ...hits]);
          setHiddenBnt(false);
          if (12 * page > totalHits) {
            showErrorMsg();
            setHiddenBnt(true);
          }
        }
      })
      .catch(error => error)
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      {loading && <Loader />}

      {images && (
        <ImageGalleryUl>
          {images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                smallImg={image.webformatURL}
                alt={image.tags}
                showModal={() => showModal(image.largeImageURL)}
              />
            );
          })}
        </ImageGalleryUl>
      )}
      {!hiddenBnt && <Button onFindMore={() => onFindMore()} />}
    </Container>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
