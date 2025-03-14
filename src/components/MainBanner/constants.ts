import Donate from 'assets/banner_support.webp';
import Banner from 'assets/im_home_banner.webp';
import Forest from 'assets/im_banner_forest.webp';
import Tumblbug from 'assets/im_banner_tumblbug.webp';

export const BANNER_ITEMS = [
  {
    id: 1,
    category: 'EVENT',
    link: '/donate',
    image: Donate,
  },
  {
    id: 2,
    category: 'EVENT',
    link: 'https://tumblbug.com/rainbowletter/story?utm_source=tumblbug&utm_medium=system_email&utm_campaign=alarm_start_project',
    image: Tumblbug,
  },
  // {
  //   id: 3,
  //   category: 'EVENT',
  //   link: '/donate',
  //   image: Forest,
  // },
];

export const EN_BANNER_ITEMS = [
  {
    id: 1,
    category: 'EVENT',
    link: '/letter-box',
    image: Banner,
  },
];
