import { ReactNode } from 'react';

type Props = {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  // AccountDeletionConfirmationModal 컴포넌트에 쓰이는 버튼에 따라 onClick 선택/필수 바꾸기
  onClick?: () => void;
  id?: any;
};

function Button({ className, disabled, children, onClick, id }: Props) {
  const styles = className || '';
  const disabledStyles = disabled
    ? 'bg-orange-400/30 text-white'
    : 'bg-orange-400 text-white';

  return (
    <button
      id={id}
      className={`${styles} ${disabledStyles} w-full rounded-2xl px-5 py-4 text-base font-semibold`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
