type Props = {
  className?: string;
};

function Divider({ className }: Props) {
  return (
    <hr
      className={`mx-auto w-[22.125rem] border-t border-b-[#EEE] ${className}`}
    />
  );
}

export default Divider;
