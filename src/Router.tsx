import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import { State } from 'types/store';
import Login from 'view/account/Login';
import Join from 'view/account/Join';
import Email from 'view/account/Email';
import Password from 'view/account/Password';
import LandingPage from 'view/home/LandingPage';
import PWALanding from 'view/home/PWALanding';
import Home from 'view/home/Home';
import Donate from 'view/home/Donate';
import Auth from 'view/account/Auth';
import LetterBoxRenew from 'view/letter/LetterBoxRenew';
import DetailLetter from 'view/letter/DetailLetter';
import ShareLetter from 'view/letter/ShareLetter';
import WriteLetter from 'view/letter/WriteLetter';
import MyPage from 'view/account/MyPage';
import SavedImage from 'view/letter/SavedImage';
import Layout from 'components/Layout';
import ProtectedLayout from 'components/Layout/ProtectedLayout';
import AdminLayout from 'components/Layout/AdminLayout';
import Modal from 'components/Modal';
import AccountDeletion from 'components/AccountDeletion';
import FAQs from 'components/FAQs';
import PasswordReset from 'components/PasswordReset';
import ScrollToTop from 'hooks/useScrollTop';
import LetterDetail from 'components/admin/Letters/LetterDetail';
import PetRegistration from './components/MyPetsTemplate/PetRegistration';
import PetEdit from './components/MyPetsTemplate/PetEdit';
import Letters from './components/admin/Letters';
import Contents from 'view/contents/Contents';
import ToolTip from 'components/ToolTip';
import LetterShowcase from 'components/LetterShowcase';
import AdModal from 'components/WebView/AdModal';
import Prompt from 'components/admin/setting/Prompt';
import PinnedLetterForm from 'view/letter/PinnedLetterForm';
import LetterShowCase from 'view/letterShowCase/LetterShowCase';
import { ToastContainer } from 'react-toastify';

function Router() {
  const { isOpen } = useSelector((state: State) => state.modal);
  const { isOpen: toolTipOpen } = useSelector(
    (state: RootState) => state.toolTip
  );

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/pwa_landing" element={<PWALanding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Join />} />
            <Route path="/auth/email" element={<Email />} />
            <Route path="/users/password/reset" element={<Password />} />
            <Route path="/oauth/success" element={<Auth />} />
            <Route path="/share/:shareLink" element={<ShareLetter />} />
            <Route path="/contents" element={<Contents />} />
            <Route
              path="/letters/letter-showcase"
              element={<LetterShowCase />}
            />
            <Route
              path="/web-view/letter-showcase"
              element={<LetterShowcase />}
            />
            <Route path="/web-view/ad-modal" element={<AdModal />} />
            <Route element={<ProtectedLayout />}>
              {/* NOTE: 사용자 권한(로그인)이 필요한 페이지 */}
              <Route path="/my-page" element={<MyPage />} />
              <Route path="/my-page/faqs" element={<FAQs />} />
              <Route path="/my-page/password" element={<PasswordReset />} />
              <Route path="/my-page/leave" element={<AccountDeletion />} />
              <Route path="/my-pets/register" element={<PetRegistration />} />
              <Route path="/my-pets/edit" element={<PetEdit />} />
              <Route path="/write-letter" element={<WriteLetter />} />
              <Route path="/letter-box" element={<LetterBoxRenew />} />
              <Route path="/letter-box/:letterId" element={<DetailLetter />} />
              <Route path="/saved-image" element={<SavedImage />} />
              <Route path="/letters/pin" element={<PinnedLetterForm />} />
            </Route>
          </Route>
          {/* NOTE: 관리자 권한이 필요한 페이지 */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/setting-prompt" element={<Prompt />} />
            <Route path="/admin/letters" element={<Letters />} />
            <Route path="/admin/letters/:letterId" element={<LetterDetail />} />
          </Route>
        </Routes>
        {isOpen && <Modal />}
        {toolTipOpen && <ToolTip />}
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          rtl={false}
          closeButton={false}
          toastClassName={() =>
            'bg-white text-gray-1 border border-orange-400 rounded-[8px] flex items-center justify-center py-[14px] mb-16'
          }
          bodyClassName={() => 'flex font-normal'}
          limit={1}
        />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default Router;
