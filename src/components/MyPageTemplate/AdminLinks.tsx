import Divider from 'components/Divider';
import MenuItemLink from 'components/MyPageTemplate/MenuItemLink';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

function AdminLinks() {
  const { role } = useSelector((state: RootState) => state.user.user);

  if (role !== 'ROLE_ADMIN') return null;
  return (
    <>
      <h2 className="p-2.5 text-heading-3">관리자 페이지</h2>
      <div className="flex flex-col gap-y-2">
        <MenuItemLink to="/admin/letters" label="편지 리스트" />
        <MenuItemLink to="/admin/setting-prompt" label="프롬프트 관리" />
      </div>
      <div className="pb-5 pt-2.5">
        <Divider />
      </div>
    </>
  );
}

export default AdminLinks;
