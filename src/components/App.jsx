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
    dataLargeImage: null,
    isLoading: false,
    isError: false,
    totalImages: 0,
    totalHits: 0,
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.searchData !== this.state.searchData) {
      return document.body.clientHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { page, text, isError } = this.state
    if (prevState.text !== text || prevState.page !== page) {
      this.getData();
    }

    if (prevState.searchData !== this.state.searchData && this.state.page > 1) {
      this.scrollPage(snapshot);
    }

    if (isError !== prevState.isError && isError) {
          toast.error('Sorry, there are no images matching your search query.', {
            autoClose: 5000,
          });
    }
  }

  onSubmitNewSearch = newText => {
    this.setState({
      text: newText,
      page: 1,
      searchData: [],
      totalImages: 0,
    });
  };

 getData = () => {
    const { text, page } = this.state;
    this.setState({ isLoading: true, isError: false });
    getArticles(text, page)
      .then(data =>
        this.setState(prev => ({
          searchData: [...prev.searchData, ...data.hits],
          totalHits: data.totalHits,
        }))
      )
      .catch(() => {
        this.setState({ isError: true });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

onLoadMore = () => {
  const { searchData, totalHits } = this.state;
  if (searchData.length < totalHits) {
    this.setState(prev => ({
      page: prev.page + 1,
    }), () => {
      this.getData();
    });
  }
};

  onHandleClickImage = (data = null) => {
    this.setState({ dataLargeImage: data });
  };


  scrollPage = snapshot => {
    window.scrollTo({
      top: snapshot - 250,
      behavior: 'smooth',
    });
  };

  render() {
    const { searchData, isLoading, dataLargeImage, totalHits } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmitNewSearch} />
        <ImageGallery
          searchData={searchData}
          onHandleClickImage={this.onHandleClickImage}
        />
        {searchData.length !== 0 && searchData.length < totalHits && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {isLoading && <Loader />}
        <ToastContainer autoClose={5000} />
        {dataLargeImage && (
          <Modal
            dataLargeImage={dataLargeImage}
            toogleModal={this.onHandleClickImage}
          />
        )}
      </div>
    );
  }
}

export default App;
