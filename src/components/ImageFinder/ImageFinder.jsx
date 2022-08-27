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
  const [firstLoading, setFirstLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [srcForModal, setSrcForModal] = useState({});
  const [id, setId] = useState(null);

  const fetchData = useCallback(async () => {
    return await api.getData(query, numOfPages).then(data => {
      return setApiRes(prevData => {
        return [...prevData, ...data.hits];
      });
    });
  }, [numOfPages, query]);

  useEffect(() => {
    if (firstLoading)
      api.getData(query, numOfPages).then(data => setApiRes(data.hits));
    setFirstLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loader) fetchData();

    const loadMoreBtn = document.querySelector('.loadMoreBtn');

    if (firstLoading && loader) {
      return loadMoreBtn.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
    setLoader(false);
  }, [fetchData, firstLoading, loader]);

  const getInputValue = newQuery => {
    setQuery(newQuery);
  };

  const getApiColection = async () => {
    await api.getData(query).then(data => {
      setApiRes(data.hits);
    });
  };

  const loadMoreImage = e => {
    setNumOfPages(prevPage => {
      return prevPage + 1;
    });
    setLoader(true);
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
      <Searchbar
        handlChangeInput={getInputValue}
        getApiColection={getApiColection}
      />

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
