import InfoImage from '../../assets/gg_info.svg';

export default function Disclaimer() {
  return (
    <section className="text-[12px] text-[#BDBDBD]">
      <div className="flex items-center gap-1">
        <img src={InfoImage} alt="info" loading="lazy" className="size-4" />
        <p className="leading-[12px] underline">꼭 읽어주세요!</p>
      </div>
      <ul className="ml-2 mt-1">
        <li className="relative pl-1">
          <span className="absolute left-0 top-1.5 size-1 rounded-full bg-[#BDBDBD]" />
          <p className="ml-2">
            무지개에 걸린 편지는 매일 오전 10시 업데이트 돼요
          </p>
        </li>
        <li className="relative pl-1">
          <span className="absolute left-0 top-1.5 size-1 rounded-full bg-[#BDBDBD]" />
          <p className="ml-2">
            아이 하나 당 하루에 한 번만 편지를 걸 수 있어요
          </p>
        </li>
        <li className="relative pl-1">
          <span className="absolute left-0 top-1.5 size-1 rounded-full bg-[#BDBDBD]" />
          <p className="ml-2">제출한 뒤엔 내용을 수정하거나 삭제할 수 없어요</p>
        </li>
      </ul>
    </section>
  );
}
