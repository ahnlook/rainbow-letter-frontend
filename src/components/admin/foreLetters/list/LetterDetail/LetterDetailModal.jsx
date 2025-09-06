import { createPortal } from 'react-dom';
import ForeLetterDetailForm from './LetterDetailForm';

const LetterDetailModal = ({ letterData, letterId, onLetterClick }) => {
  return createPortal(
    <div className="fixed left-0 top-0 z-10 size-full bg-white">
      <ForeLetterDetailForm
        letterData={letterData}
        letterId={letterId}
        isModal
        onLetterClick={onLetterClick}
      />
    </div>,
    document.body
  );
};

export default LetterDetailModal;
