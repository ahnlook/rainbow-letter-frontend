import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18n';

import { RootState } from 'store';
import USA from '../../assets/ic_home_usa.svg';
import Korea from '../../assets/ic_home_korea.svg';
import Down from '../../assets/ic_home_down.svg';
import useDetectClose from 'hooks/useDetectClose';
import commonSlice from 'store/common/common-slice';

export default function LngSelectBox() {
  const dispatch = useDispatch();
  const { lng } = useSelector((state: RootState) => state.common);
  const dropdownRef = useRef<null | HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);
  const { isOpen, setIsOpen } = useDetectClose(dropdownRef, false);

  const onClickSelectBox = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickSelectItem = (lng: string) => {
    dispatch(commonSlice.actions.setLng(lng));
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownWidth(dropdownRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (dropdownRef.current) {
        setDropdownWidth(dropdownRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="px-4 py-2">
      <div
        ref={dropdownRef}
        onClick={onClickSelectBox}
        className="flex cursor-pointer items-center justify-between rounded-[60px] border border-[#DFDFDF] bg-[#F8F8F8] px-3 py-1"
      >
        <div className="flex items-center gap-3">
          <img src={lng === 'ko' ? Korea : USA} alt="usa" />
          <span className="text-[14px] leading-[14px]">
            {lng === 'ko' ? '한국어' : 'English'}
          </span>
        </div>
        <img
          src={Down}
          alt="drop"
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </div>
      {isOpen && (
        <div
          style={{ width: dropdownWidth ? `${dropdownWidth}px` : 'auto' }}
          className="absolute left-4 z-50 mt-2 w-full rounded-[20px] border border-[#DFDFDF] bg-white shadow-md"
        >
          <ul className="py-2">
            <li
              onClick={() => onClickSelectItem('en')}
              className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
            >
              <img src={USA} alt="usa" />
              <span className="text-[14px] leading-[14px]">English</span>
            </li>
            <li
              onClick={() => onClickSelectItem('ko')}
              className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
            >
              <img src={Korea} alt="korea" />
              <span className="text-[14px] leading-[14px]">한국어</span>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
