import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function ModalContainer({ children }: Props) {
  return (
    <article className="relative top-1/2 flex -translate-y-1/2 justify-center rounded-2xl bg-white px-[1.063rem]">
      {children}
    </article>
  );
}
