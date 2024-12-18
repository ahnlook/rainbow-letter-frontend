import { useSelector } from 'react-redux';

import AdminLinks from 'components/MyPageTemplate/AdminLinks';
import MyPageTemplate from 'components/MyPageTemplate';
import { RootState } from 'store';

function MyPage() {
  const { lng } = useSelector((state: RootState) => state.common);

  return (
    <div className="overflow-hidden">
      {lng === 'ko' && <AdminLinks />}
      <MyPageTemplate />
    </div>
  );
}

export default MyPage;
