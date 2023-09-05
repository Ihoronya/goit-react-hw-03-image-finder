import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ searchData, onHandleClickImage }) => {
  return (
    <ul className={s.ImageGallery}>
      {searchData.map(dataEl => (
        <ImageGalleryItem
          key={dataEl.id}
          dataEl={dataEl}
          onHandleClickImage={onHandleClickImage}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  searchData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onHandleClickImage: PropTypes.func.isRequired,
};

export default ImageGallery;