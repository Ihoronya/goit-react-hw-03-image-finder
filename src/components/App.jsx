import { Component } from 'react';
import { getArticles } from 'Services/apiService';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import s from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    text: '',
    page: 1,
    searchData: [],
    dataLargeImage: {},
    isLoading: false,
    isModalOpen: false,
    isError: false,
    errorToastShown: false,
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.searchData !== this.state.searchData) {
      return document.body.clientHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.text !== this.state.text) {
      this.getData();
    }

    if (prevState.searchData !== this.state.searchData && this.state.page > 1) {
      this.scrollPage(snapshot);
    }
  }

  onSubmitNewSearch = newText => {
    this.setState({
      text: newText,
      page: 1,
      searchData: [],
      isError: false,
    });
  };

  getData = () => {
    const { text, page } = this.state;
    this.setState({ isLoading: true });
    getArticles(text, page)
      .then(data =>
        this.setState(prev => ({
          searchData: [...prev.searchData, ...data.hits],
          page: prev.page + 1,
        }))
      )
      .catch(() => {
        this.setState({ isError: true });

        if (!this.state.errorToastShown) {
          toast.error('Sorry, there are no images matching your search query.', {
            autoClose: 5000,
          });

          this.setState({ errorToastShown: true });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    this.getData();
  };

  onHandleClickImage = data => {
    this.setState({ dataLargeImage: data });
    this.toogleModal();
  };

  toogleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  scrollPage = snapshot => {
    window.scrollTo({
      top: snapshot - 250,
      behavior: 'smooth',
    });
  };

  render() {
    const { searchData, isLoading, isModalOpen, dataLargeImage } =
      this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmitNewSearch} />
        <ImageGallery
          searchData={searchData}
          onHandleClickImage={this.onHandleClickImage}
        />
        {searchData.length !== 0 && <Button onLoadMore={this.onLoadMore} />}
        {isLoading && <Loader />}
        <ToastContainer autoClose={5000} />
        {isModalOpen && (
          <Modal
            dataLargeImage={dataLargeImage}
            toogleModal={this.toogleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
