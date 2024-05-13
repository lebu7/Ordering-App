import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import StockItem from "../stock/StockItem";


const BestSellersSlider = ({ bestSellers }) => {
    const settings = {
    spaceBetween: 20, // Set space between items (in pixels)
    dots: true, // Enable navigation dots
    infinite: true, // Disable continuous looping (optional)
    autoplay: true, // Enable autoplay (optional)
    autoplaySpeed: 3000, // Set autoplay speed (in milliseconds)
    responsive: [
      {
        breakpoint: 1536, // xl (Extra-large screens)
        settings: {
          slidesToShow: 6, // Show 4 items on extra-large screens
          slidesToScroll: 6, // Scroll by 4 items on extra-large screens
        },
      },
      {
        breakpoint: 1280, // 2xl (Extra-extra-large screens)
        settings: {
          slidesToShow: 5, // Show 5 items on extra-extra-large screens
          slidesToScroll: 5, // Scroll by 5 items on extra-extra-large screens
        },
      },
      {
        breakpoint: 1024, // lg (Large screens)
        settings: {
          slidesToShow: 4, // Show 3 items on large screens
          slidesToScroll: 4, // Scroll by 3 items on large screens
        },
      },
      {
        breakpoint: 768, // md (Medium screens)
        settings: {
          slidesToShow: 3, // Show 2 items on medium screens
          slidesToScroll: 3, // Scroll by 2 items on medium screens
        },
      },
      {
        breakpoint: 500, // sm (Small screens)
        settings: {
          slidesToShow: 2, // Show 1 item on small screens
          slidesToScroll: 2, // Scroll by 1 item on small screens
        },
      },
      {
        breakpoint: 240, // sm (Small screens)
        settings: {
          slidesToShow: 1, // Show 1 item on small screens
          slidesToScroll: 1, // Scroll by 1 item on small screens
        },
      },
    ],
  };
  
    return (
      <div className="overflow-hidden gap-4">
        <Slider {...settings}>
            {bestSellers?.map((item) => (
                <div key={item._id} className=""> {/* Wrap each item */}
                    <StockItem {...item} />
                </div>
            ))}
        </Slider>
      </div>
    );
  };

  export default BestSellersSlider;

  