import { useSelector } from 'react-redux';

import PetsSection from 'components/Home/PetsSection';
import LetterShowcase from 'components/LetterShowcase';
import OpenTalk from 'components/Home/OpenTalk';
import PhoneButton from 'components/Home/PhoneButton';
import Divider from 'components/Divider';
import HomeFooter from 'components/Home/HomeFooter';
import NavBar from 'components/NavBar';
import BottomSheet from 'components/Home/BottomSheet';
import { getToken } from 'utils/localStorage';
import LetterPostButton from 'components/LetterPostButton';
import HomeDivider from 'components/Home/Divider';
import PWAGuide from 'components/PWAGuide';
import MainBanners from 'components/MainBanner/MainBanners';
import { RootState } from 'store';
import NavBarForEn from 'components/NavBar/NavBarForEn';
import LngSelectBox from 'components/Home/LngSelectBox';

export default function LandingPage() {
  const { lng } = useSelector((state: RootState) => state.common);
  const token = getToken();

  const isKorean = lng === 'ko';

  return (
    <main className="relative">
      <LngSelectBox />
      {isKorean && <PWAGuide />}
      <MainBanners />
      <PetsSection isLoggedIn={!!token} />
      <HomeDivider />
      <LetterShowcase />
      {isKorean && (
        <div className="px-5">
          <LetterPostButton />
        </div>
      )}
      <HomeDivider />
      <OpenTalk />
      <PhoneButton />
      <Divider />
      <HomeFooter />
      {isKorean ? <NavBar /> : <NavBarForEn />}
      <BottomSheet />
    </main>
  );
}
