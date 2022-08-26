import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from 'components/common/Modal/Modal';
import RegBtn from 'components/common/RegBtn/RegBtn';
import { ThreeDots } from 'react-loader-spinner';
import * as api from '../../service/apiService';

export class ImageFinder extends Component {
  state = {
    query: '',
    apiRes: [],
    numOfPages: 1,
    loader: false,
    isModalOpen: false,
    srcForModal: {},
    id: null,
  };

  async componentDidMount() {
    const apiRes = await api.getData(this.state.query).then(data => data.hits);
    this.setState({ apiRes });
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, numOfPages } = this.state;

    if (numOfPages !== prevState.numOfPages) {
      api.getData(query, numOfPages).then(data => {
        this.setState({
          apiRes: [...prevState.apiRes, ...data.hits],
          numOfPages: numOfPages,
          loader: false,
        });
      });
    }
  }

  getInputValue = newQuery => {
    this.setState({ query: newQuery });
  };

  getApiColection = () => {
    const { query } = this.state;
    api.getData(query).then(data => {
      this.setState({ apiRes: data.hits });
    });
  };

  loadMoreImage = e => {
    const loadMoreBtn = document.querySelector('.loadMoreBtn');

    this.setState(prevState => {
      return {
        numOfPages: prevState.numOfPages + 1,
        loader: true,
      };
    });

    if (this.componentDidUpdate) {
      setTimeout(() => {
        return loadMoreBtn.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
      }, 350);
    }
  };

  openModal = e => {
    this.state.apiRes.filter(el => {
      if (el.id === +e.target.id) {
        return this.setState({
          id: e.target.id,
          srcForModal: el,
          isModalOpen: true,
        });
      }
      return el;
    });
  };

  closeModal = e => {
    this.setState({ isModalOpen: false, srcForModal: {} });
  };

  render() {
    const { apiRes, isModalOpen, srcForModal, loader } = this.state;

    return (
      <>
        <Searchbar
          handlChangeInput={this.getInputValue}
          getApiColection={this.getApiColection}
        />
        <ImageGallery colectionForRender={apiRes} openModal={this.openModal} />

        <Modal
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
          imageSrc={srcForModal}
        ></Modal>
        <RegBtn
          type="button"
          handleClick={this.loadMoreImage}
          className="loadMoreBtn"
        >
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
  }
}

export default ImageFinder;
