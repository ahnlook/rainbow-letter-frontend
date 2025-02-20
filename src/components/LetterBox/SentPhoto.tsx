import { useTranslation } from 'react-i18next';

import CoverImage from 'components/Common/CoverImage';
import { LetterItemResponse } from 'types/letters';
import { getImage } from 'api/images';

type Props = {
  letterData: LetterItemResponse;
};

export default function SentPhoto({ letterData }: Props) {
  const { t } = useTranslation<'translation'>();

  return (
    <section className="not-img mt-16">
      <h3 className="text-solo-large">{t('inBox.sentPhoto')}</h3>
      <CoverImage
        image={getImage(letterData.letter.image)}
        className="relative mt-8"
      />
    </section>
  );
}
