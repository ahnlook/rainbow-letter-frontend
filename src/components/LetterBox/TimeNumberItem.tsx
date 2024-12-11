type Props = {
  value: string;
};

export default function TimeNumberItem({ value }: Props) {
  return (
    <div className="flex h-[40px] w-[32px] items-center justify-center rounded-[6px] bg-white px-2 py-1">
      <span className="text-[24px] font-bold leading-[28px]">{value}</span>
    </div>
  );
}
