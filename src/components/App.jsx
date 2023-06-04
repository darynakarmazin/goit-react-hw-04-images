import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './App.styled';

import { Searchbar } from 'components/searchbar/Searchbar';
import { ImageGallery } from 'components/imageGallery/ImageGallery';
import { Modal } from 'components/modal/Modal';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const showModal = largeImageURL => {
    setIsShowModal(true);
    setModalImage(largeImageURL);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery showModal={showModal} searchQuery={searchQuery} />
      {isShowModal && <Modal closeModal={closeModal} modalImage={modalImage} />}
      <ToastContainer autoClose={3000} theme="colored" />
    </Wrapper>
  );
}
