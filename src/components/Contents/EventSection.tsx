import { Link } from 'react-router-dom';

import NewYear from '../../assets/im_contents_newYear.webp';

export default function EventSection() {
  return (
    <section className="px-[18px] py-[30px]">
      <h2 className="text-[18px] font-bold leading-[18px]">
        무지개가족 이벤트
      </h2>
      <p className="mt-3 text-[14px] font-[400] leading-[21px] text-gray-1">
        무지개편지가 준비한 이벤트에 참여해보세요!
      </p>
      <Link to="http://pf.kakao.com/_MNevG/107641271" target="_blank">
        <img
          src={NewYear}
          alt="event-image"
          className="mt-3 h-[265px] w-[354px] rounded-[16px]"
        />
      </Link>
    </section>
  );
}
