import Logo from '../assets/Logo_256px.png';

function MaintenancePage() {
  return (
    <div className="flex w-full justify-center pt-[120px]">
      <div className="flex w-[390px] flex-col items-center gap-2">
        <img src={Logo} alt="logo" className="mb-[12px] size-[60px]" />
        <h1 className="text-[20px] font-bold">무지개편지가 점검 중이에요</h1>
        <p>잠시만 기다려 주세요!</p>
      </div>
    </div>
  );
}

export default MaintenancePage;
