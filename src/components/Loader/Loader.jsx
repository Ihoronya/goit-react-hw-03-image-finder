import { ThreeDots } from  'react-loader-spinner'

const Loader = () => {
  return (
    <ThreeDots         
    height={80} 
    width={80}
    color="#0caff5"
    wrapperStyle={{}}
    wrapperClass="loader"
    visible={true}
    ariaLabel="oval-loading"
    secondaryColor="#0b0bd1"
    strokeWidth={2}
    strokeWidthSecondary={2}
  />
  );
};

export default Loader;