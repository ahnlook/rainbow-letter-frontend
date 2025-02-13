import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RootState } from 'store';
import Button from 'components/Button';

export default function SavedImage() {
  const { t } = useTranslation<'translation'>();
  const savedImageUrl = useSelector(
    (state: RootState) => state.letter.saveImageUrl
  );
  const natigate = useNavigate();

  const onClickGoToHome = useCallback(() => {
    natigate('/');
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="mt-4 text-nowrap text-heading-3">
        {t('savedImage.pressUpLine')}
      </p>
      <p className="mb-8 text-nowrap text-heading-3">
        {t('savedImage.pressDownLine')}
      </p>
      <div className="rounded-xl border-2 border-orange-400 p-1">
        <img src={savedImageUrl} alt="image" style={{ maxWidth: '100%' }} />
      </div>
      <Button onClick={onClickGoToHome} className="mt-12">
        {t('savedImage.home')}
      </Button>
    </div>
  );
}
