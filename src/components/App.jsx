import React, { useState, useEffect } from 'react';
import { getImagesApi } from '../api/getimg';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const LIMIT = 12;

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) {
        return;
      }
      try {
        setIsLoading(true);
        const data = await getImagesApi(query, page, LIMIT);
        const { hits: newImages } = data;
        if (data.hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        setImages(prevImages => [...prevImages, ...newImages]);
        setLoadMore(page < Math.ceil(data.totalHits / LIMIT));
      } catch (err) {
        alert('Oops, something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const handelSubmit = queryValue => {
    if (queryValue === query) {
      alert('Enter a new value to search for');
      return;
    }
    setQuery(queryValue);
    setImages([]);
    setPage(1);
    setLargeImageURL('');
    setIsLoading(false);
    setShowModal(false);
    setLoadMore(false);
  };

  const handelImageClick = url => {
    setLargeImageURL(url);
    setShowModal(true);
  };

  const closeModalImage = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="main-container">
      <Searchbar submit={handelSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} handelImageClick={handelImageClick} />
      )}
      {loadMore && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {showModal && largeImageURL && (
        <Modal largeImageURL={largeImageURL} onClose={closeModalImage} />
      )}
    </div>
  );
};

export default App;
