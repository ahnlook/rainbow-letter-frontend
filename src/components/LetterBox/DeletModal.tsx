import { useTranslation } from 'react-i18next';

import { T } from 'types/translate';
import ErrorIcon from '../../assets/Error_icon.svg';

type Props = {
  setIsModalOpen: (isModalOpen: boolean) => void;
  onClickDeleteButton: () => void;
};

export default function DeleteModal({
  setIsModalOpen,
  onClickDeleteButton,
}: Props) {
  const { t }: T = useTranslation();

  return (
    <div className="w-full px-[1.562rem] py-10">
      <header className="flex flex-col items-center justify-center text-center">
        <img src={ErrorIcon} alt="편지지" />
        <h3 className="mt-5 whitespace-pre-wrap text-heading-3 font-bold">
          {t('modal.delete.titleUpLine')}
          {t('modal.delete.titleDownLine')}
        </h3>
        <span className="mt-3 text-[#FF0000]">{t('modal.delete.alert')}</span>
      </header>
      <div className="mt-[30px] flex gap-3">
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(false);
          }}
          className="w-1/2 rounded-[8px] border-none bg-gray-4 py-2.5 text-[16px] text-gray-5"
        >
          {t('modal.delete.cancel')}
        </button>
        <button
          type="button"
          onClick={onClickDeleteButton}
          className="w-1/2 rounded-[8px] border-none bg-orange-400 py-2.5 text-[16px] text-white"
        >
          {t('modal.delete.delete')}
        </button>
      </div>
    </div>
  );
}
