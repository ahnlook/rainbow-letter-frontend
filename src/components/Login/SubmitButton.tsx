import { MouseEvent } from 'react';

type Props = {
  onclick: (e: MouseEvent<HTMLButtonElement>) => void;
  value: string;
  disabled: any;
  className: string;
};

export default function SubmitButton({
  onclick,
  value,
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      type="submit"
      onClick={(e) => onclick(e)}
    >
      {value}
    </button>
  );
}
