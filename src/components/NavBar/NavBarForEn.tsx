import { ReactComponent as letterBox } from 'assets/ic_nav_enLetter.svg';
import { ReactComponent as HomeIcon } from 'assets/ic_nav_enHome.svg';
import { ReactComponent as pepar } from 'assets/ic_nav_enPaper.svg';
import { ReactComponent as myInfo } from 'assets/ic_nav_enProfile.svg';

import NavItem from 'components/NavBar/NavItem';

function NavBarForEn() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-center bg-white py-1.5">
      <div className="flex w-[390px] min-w-[22.5rem] justify-between gap-x-1.5 px-6 py-2.5 shadow-nav">
        <NavItem
          to="/"
          label="HOME"
          Icon={HomeIcon}
          useStroke={false}
          className="ml-[2px]"
        />
        <NavItem
          to="/letter-box"
          label="MAILBOX"
          Icon={letterBox}
          useStroke={false}
        />
        <NavItem
          to="/write-letter"
          label="WRITE"
          Icon={pepar}
          useStroke={false}
          className="ml-2"
        />
        <NavItem
          to="/my-page"
          label="PROFILE"
          Icon={myInfo}
          useStroke={false}
        />
      </div>
    </nav>
  );
}

export default NavBarForEn;
