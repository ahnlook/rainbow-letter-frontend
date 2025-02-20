import { createPortal } from 'react-dom';
import LetterDetailForm from './LetterDetailForm';

const LetterDetailModal = ({ letterData, letterId, onLetterClick }) => {
  return createPortal(
    <div className="fixed left-0 top-0 z-10 w-full bg-white">
      <LetterDetailForm
        letterData={letterData}
        letterId={letterId}
        isModal
        onLetterClick={onLetterClick}
      />
      {/* <LetterDetailForm
        letterData={location.state}
        letterId={letter.id}
        onLetterClick={handleUserLetterClick}
        userId={user.id}
        petId={pet.id}
      /> */}
    </div>,
    document.body
  );
};

export default LetterDetailModal;
