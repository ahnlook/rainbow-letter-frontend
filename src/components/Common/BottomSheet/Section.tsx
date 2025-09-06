import React, { useState, useEffect, useRef } from 'react';

import CancelImage from '../../../assets/ph_x-bold.svg';

type Props = {
  children: React.ReactNode;
  isShow: boolean | undefined;
  handlePetsListShow?: (state: boolean) => void;
};

export default function Section({
  children,
  isShow,
  handlePetsListShow,
}: Props) {
  const BottonSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShow) {
      BottonSheetRef.current?.style.setProperty(
        'transform',
        `translateY(-${280}px)`
      );
    } else {
      BottonSheetRef.current?.style.setProperty(
        'transform',
        'translateY(0rem)'
      );
    }
  }, [isShow]);

  const onBottomSheetCancelClick = () => {
    if (BottonSheetRef.current) {
      BottonSheetRef.current?.style.setProperty(
        'transform',
        'translateY(0rem)'
      );
    }
    if (handlePetsListShow) {
      handlePetsListShow(false);
    }
  };

  return (
    <div
      ref={BottonSheetRef}
      className="delay-30 fixed -bottom-[18.625rem] z-50 flex h-[18.625rem] w-full max-w-[390px] justify-center rounded-t-2xl bg-white shadow-home duration-700 ease-in-out"
    >
      {children}
      <button
        type="button"
        onClick={onBottomSheetCancelClick}
        className="absolute right-4 top-4"
      >
        <img src={CancelImage} alt="cancel" />
      </button>
    </div>
  );
}
