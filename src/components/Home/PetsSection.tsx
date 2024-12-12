import LoginBox from 'components/Home/LoginBox';
import PetsBox from 'components/Home/PetsBox';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {
  isLoggedIn: boolean;
};

export default function PetsSection({ isLoggedIn }: Props) {
  const { lng } = useSelector((state: RootState) => state.common);

  return (
    <section
      className={`${lng === 'ko' ? 'rounded-t-2xl pt-9' : 'pt-6'} relative z-20 mt-[11.5rem] bg-white px-5 pb-[1.875rem]`}
    >
      {!isLoggedIn ? <LoginBox /> : <PetsBox />}
    </section>
  );
}
