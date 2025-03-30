type Props = {
  selectRadio: string;
  handleRadioButton: (type: string) => void;
};

export default function RadioSection({
  selectRadio,
  handleRadioButton,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">편지 유형</p>
      <div className="flex w-full">
        <div className="flex w-full items-center gap-6">
          <div
            onClick={() => handleRadioButton('0')}
            className="flex cursor-pointer items-center gap-2"
          >
            <div
              className={`${!Number(selectRadio) ? 'border-[#FFB74D]' : 'border-[#BDBDBD]'} flex size-[24px] items-center justify-center rounded-full border-[1.5px]`}
            >
              {!Number(selectRadio) && (
                <div className="size-[16px] rounded-full bg-[#FFB74D]" />
              )}
            </div>
            <span className="text-[14px] leading-[14px]">내가 보낸 편지</span>
          </div>
          <div
            onClick={() => handleRadioButton('1')}
            className="flex cursor-pointer items-center gap-2"
          >
            <div
              className={`${Number(selectRadio) ? 'border-[#FFB74D]' : 'border-[#BDBDBD]'} flex size-[24px] items-center justify-center rounded-full border-[1.5px]`}
            >
              {Number(selectRadio) ? (
                <div className="size-[16px] rounded-full bg-[#FFB74D]" />
              ) : null}
            </div>
            <span className="text-[14px] leading-[14px]">
              아이에게 받은 편지
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
