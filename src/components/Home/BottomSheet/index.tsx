import { useEffect, useRef } from 'react';

import BottomHeader from 'components/Home/BottomSheet/BottomHeader';
import BottomContent from 'components/Home/BottomSheet/BottomContent';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function BottomSheet() {
  const BottonSheetRef = useRef<HTMLDivElement>(null);
  const { lng } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    const showBottomSheet = () => {
      BottonSheetRef.current?.style.setProperty(
        'transform',
        `translateY(-${300}px)`
      );
    };
    if (lng === 'ko') {
      window.addEventListener('beforeinstallprompt', showBottomSheet);
    }

    return () =>
      window.removeEventListener('beforeinstallprompt', showBottomSheet);
  }, [lng]);

  const onBottomSheetCancelClick = () => {
    if (BottonSheetRef.current) {
      BottonSheetRef.current?.style.setProperty(
        'transform',
        'translateY(0rem)'
      );
    }
  };

  return (
    <div
      ref={BottonSheetRef}
      className="delay-30 fixed inset-x-0 -bottom-[18.75rem] z-50 flex h-[18.75rem] justify-center rounded-2xl bg-white shadow-home duration-700 ease-in-out"
    >
      <div className="w-full max-w-[22.875rem] px-4">
        <BottomHeader onClick={onBottomSheetCancelClick} />
        <BottomContent />
      </div>
    </div>
  );
}
