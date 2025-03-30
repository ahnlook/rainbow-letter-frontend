type Props = {
  content: string;
  handleLetterContent: (content: string) => void;
};
export default function LetterContentsSection({
  content,
  handleLetterContent,
}: Props) {
  const isExceeded = content.length > 38;

  return (
    <section className="relative mt-[34px] flex flex-col gap-4">
      <p className="font-bold">편지 내용</p>
      <textarea
        maxLength={38}
        onChange={(e) => handleLetterContent(e.target.value)}
        placeholder="무지개 가족들과 나누고 싶은 편지 내용을 입력해주세요."
        className="min-h-[140px] w-full resize-none rounded-[15px] bg-[#F8F8F8] p-[18px] font-Gyobomungo2019 text-xl leading-[36px] tracking-[-0.4px] outline-none placeholder:font-sans placeholder:text-sm"
      />
      <article className="text-right text-caption">
        <p
          className={`${isExceeded ? 'text-alarm-red' : 'text-[#616161]'} absolute bottom-7 right-6 font-sans`}
        >
          {`${content?.length} / 38`}
        </p>
      </article>
    </section>
  );
}
