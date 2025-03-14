import { Link } from 'react-router-dom';

import { APP_BAR_BANNER_CONTENTS } from './constants';
import Banner from 'components/MainBanner';
import Carousel from 'components/Carousel';

const carouselItems = APP_BAR_BANNER_CONTENTS.map((item) => (
  <Banner key={item.id} link={item.link} image={item.image} />
));

export default function AppBar() {
  if (APP_BAR_BANNER_CONTENTS.length === 1) {
    return (
      <Link
        to={APP_BAR_BANNER_CONTENTS[0].link}
        target="_blank"
        className="flex justify-between bg-white"
      >
        <div className="flex items-center justify-center">
          <img
            className="object-fill"
            src={APP_BAR_BANNER_CONTENTS[0].image}
            alt="card"
          />
        </div>
      </Link>
    );
  }

  const settings = {
    dots: false,
    swipeToSlide: true,
    Infinity: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    dotsClass: 'slick-dots',
  };

  return <Carousel settings={settings} items={carouselItems} />;
}
