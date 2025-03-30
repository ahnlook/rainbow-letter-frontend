import { ReactComponent as letterBox } from 'assets/nav-letterBox.svg';
import { ReactComponent as HomeIcon } from 'assets/nav-home.svg';
import writing from 'assets/nav-writingLetter.svg';
import { ReactComponent as petInfo } from 'assets/nav-pet.svg';
import { ReactComponent as myInfo } from 'assets/nav-my.svg';

import NavItem from 'components/NavBar/NavItem';
import FloatingNavItem from 'components/NavBar/FloatingNavItem';

function NavBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-center bg-white py-1.5">
      <div className="flex w-[390px] min-w-[22.5rem] justify-between gap-x-1.5 px-6 shadow-nav">
        <NavItem to="/" label="홈" Icon={HomeIcon} />
        <NavItem to="/letter-box" label="편지함" Icon={letterBox} />
        <FloatingNavItem to="/write-letter" label="편지쓰기" icon={writing} />
        <NavItem
          to="/letters/letter-showcase"
          label="컨텐츠"
          Icon={petInfo}
          useStroke={false}
        />
        <NavItem to="/my-page" label="My" Icon={myInfo} />
      </div>
    </nav>
  );
}

export default NavBar;
