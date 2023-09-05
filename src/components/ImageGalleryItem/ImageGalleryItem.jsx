import { Component } from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, largeImageURL } = this.props.dataEl;
    const { onHandleClickImage } = this.props;
    return (
      <li
        className={s.ImageGalleryItem}
        onClick={() => onHandleClickImage({ tags, largeImageURL })}
      >
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  onHandleClickImage: PropTypes.func.isRequired,
  dataEl: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;