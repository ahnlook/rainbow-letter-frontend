import { Link } from 'react-router-dom';

import Woman from 'assets/ic_donate_woman.png';
import Arrow from 'assets/ic_donate_arrow.svg';

export default function AppBar() {
  return (
    <Link
      onClick={() => {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ url: 'https://rainbowletter.co.kr/donate' })
          );
        } else {
          console.warn('ReactNativeWebView is not available.');
        }
      }}
      to="/donate"
      target="_blank"
      className="bg-[#F3F3F3]"
    >
      <div className="flex items-center justify-between rounded-[15px] px-5">
        <section className="py-4 text-gray-1">
          <p className="font-bold">무지개마을을 지켜주세요!</p>
          <div className="flex flex-row items-center gap-1">
            <p className="text-caption-pc">지금 후원하러 가기</p>
            <img src={Arrow} alt="화살표 아이콘" />
          </div>
        </section>
        <img src={Woman} alt="슬픈 여자 이미지" />
      </div>
    </Link>
  );
}
