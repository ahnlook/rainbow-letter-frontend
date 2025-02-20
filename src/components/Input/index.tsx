import { ChangeEvent } from 'react';

type Props = {
  className: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

function Input({ className, ...props }: Props) {
  const styles = className || '';

  return (
    <input
      className={`${styles} text-solo-caption rounded-2xl bg-gray-2 py-6`}
      {...props}
    />
  );
}

export default Input;
