import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/ImageSlider.css';
import logo1 from '../assets/Image1.jpeg'
import logo2 from '../assets/Image3.jpeg'
import logo3 from '../assets/Image4.jpeg'
import logo4 from '../assets/Image5.jpeg'
import logo5 from '../assets/Image6.jpeg'



const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings}>
      <div>
        <img src={logo1} alt="Resort 1" />
      </div>
      <div>
        <img src={logo2} alt="Resort 2" />
      </div>
      <div>
        <img src={logo3} alt="Resort 3" />
      </div>
      <div>
        <img src={logo4} alt="Resort 4" />
      </div>
      <div>
        <img src={logo5} alt="Resort 5" />
      </div>
    </Slider>
  );
};

export default ImageSlider;
