import { useSelector } from 'react-redux';

import AdminLinks from 'components/MyPageTemplate/AdminLinks';
import MyPageTemplate from 'components/MyPageTemplate';
import { RootState } from 'store';

function MyPage() {
  const { lng } = useSelector((state: RootState) => state.common);

  return (
    <>
      {lng === 'ko' && <AdminLinks />}
      <MyPageTemplate />
    </>
  );
}

export default MyPage;
