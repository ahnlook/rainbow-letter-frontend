import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { INFO_MESSAGES } from 'components/Write/constants';
import { modalActions } from 'store/modal/modal-slice';
import InfoImage from '../../assets/gg_info.svg';
import { T } from 'types/translate';

export default function TopicSuggestion() {
  const dispatch = useDispatch();
  const { t }: T = useTranslation();

  return (
    <article className="mt-2.5">
      <button
        type="button"
        onClick={() => dispatch(modalActions.openModal('TOPIC'))}
        className="flex items-center gap-1"
      >
        <img src={InfoImage} alt="information" />
        <p className="text-caption text-gray-2 underline">
          {t(INFO_MESSAGES.SUGGEST_TOPIC)}
        </p>
      </button>
    </article>
  );
}
