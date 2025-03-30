import React from 'react';

type Props = {
  children?: React.ReactNode;
  isShow: boolean | undefined;
};

export default function Container({ children, isShow }: Props) {
  return (
    <section
      className={`${
        isShow ? 'block' : 'hidden'
      } fixed inset-y-0 z-50 w-[390px] bg-[#000000]/50`}
    >
      {children}
    </section>
  );
}
