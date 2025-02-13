import { useTranslation } from 'react-i18next';

type Props = {
  value: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
};

function Chip({ className, isSelected, value, onClick }: Props) {
  const styles = className || '';
  const { t } = useTranslation<'translation'>();

  return (
    <button
      className={`${styles} flex items-center justify-center rounded-full border px-4 py-3 ${isSelected ? 'border-orange-400 bg-orange-50' : 'border-gray-1'}`}
      type="button"
      onClick={onClick}
    >
      <span
        className={`text-sm leading-[0.875rem] ${
          isSelected ? 'font-bold text-orange-400' : 'text-gray-1'
        }`}
      >
        {t(value)}
      </span>
    </button>
  );
}

export default Chip;
