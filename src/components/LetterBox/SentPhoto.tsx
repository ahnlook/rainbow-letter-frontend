import { useTranslation } from 'react-i18next';

import CoverImage from 'components/Common/CoverImage';
import { LetterItemResponse } from 'types/letters';

import { formatImageType } from 'utils/image';

type Props = {
  letterData: LetterItemResponse;
};

export default function SentPhoto({ letterData }: Props) {
  const { t } = useTranslation<'translation'>();

  return (
    <section className="not-img mt-16">
      <h3 className="text-solo-large">{t('inBox.sentPhoto')}</h3>
      <CoverImage
        image={formatImageType(letterData.letter.image)}
        className="relative mt-8"
      />
    </section>
  );
}
