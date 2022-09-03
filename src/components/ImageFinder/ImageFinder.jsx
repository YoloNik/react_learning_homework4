import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from 'components/common/Modal/Modal';
import RegBtn from 'components/common/RegBtn/RegBtn';
import { ThreeDots } from 'react-loader-spinner';
import * as api from '../../service/apiService';

const ImageFinder = () => {
  const [query, setQuery] = useState('');
  const [apiRes, setApiRes] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [loader, setLoader] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [srcForModal, setSrcForModal] = useState({});
  const [id, setId] = useState(null);

  const fetchImg = useCallback(async () => {
    setFirstLoading(true);
    setLoader(true);
    try {
      if (numOfPages === 1) {
        const imageArr = await api
          .getData(query, numOfPages)
          .then(img => img.hits);
        setApiRes(imageArr);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setFirstLoading(false);
    }
  }, [numOfPages, query]);

  useEffect(() => {
    fetchImg();
  }, []);

  useEffect(() => {
    if (numOfPages === 1) return;

    const addNewImages = async () => {
      const imageArr = await api
        .getData(query, numOfPages)
        .then(img => img.hits);
      setApiRes(prevImages => [...prevImages, ...imageArr]);
    };
    addNewImages();

    //if (loader) {
    //  const loadMoreBtn = document.querySelector('.loadMoreBtn');

    //  loadMoreBtn.scrollIntoView({
    //    block: 'center',
    //    behavior: 'smooth',
    //  });
    //}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfPages]);

  const loadMoreImage = e => {
    setNumOfPages(prevPage => {
      return prevPage + 1;
    });
  };

  const openModal = useCallback(
    e => {
      apiRes.filter(el => {
        if (el.id === +e.target.id) {
          setId(e.target.id);
          setSrcForModal(el);
          setIsModalOpen(true);
        }
        return el;
      });
    },
    [apiRes],
  );

  const closeModal = e => {
    setIsModalOpen(false);
    setSrcForModal({});
    setId(null);
  };

  return (
    <>
      <Searchbar handlChangeInput={setQuery} getApiColection={fetchImg} />

      <ImageGallery
        colectionForRender={apiRes}
        openModal={openModal}
        firstLoading={firstLoading}
      />

      <Modal
        id={id}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        imageSrc={srcForModal}
      ></Modal>
      <RegBtn type="button" handleClick={loadMoreImage} className="loadMoreBtn">
        {loader ? (
          <ThreeDots
            height="50"
            width="50%"
            radius="10"
            color="#012E4A"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ justifyContent: 'center' }}
            visible={loader}
          />
        ) : (
          'Load More'
        )}
      </RegBtn>
    </>
  );
};

export default ImageFinder;
