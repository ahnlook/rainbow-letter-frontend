import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { calculateDDay } from 'utils/date';
import { USER_ACTIONS, PREFIX } from '../constants';
import PetCardImage from './PetCardImage';
import LikeButton from './LikeButton';
import pen from '../../assets/pen.svg';
import { getImage } from 'api/images';

function PetCard({ pet }, ref) {
  const navigate = useNavigate();

  const deathAnniversaryDDay =
    pet.deathAnniversary && calculateDDay(pet.deathAnniversary);

  const handleEditPet = () => {
    navigate('edit', { state: pet.id });
  };

  const handleWriteLetter = () => {
    navigate('/letter-box', { state: pet.id });
  };

  return (
    <li className="relative mb-4 pt-[15.187rem]" ref={ref}>
      <PetCardImage
        name={pet.name}
        image={
          pet.image &&
          `https://dev.rainbowletter.co.kr/api/images/resources/${pet.image}`
        }
      />
      <article className="relative rounded-2xl bg-white p-4 shadow-default">
        <header className="mb-5 ml-3 mt-2.5 flex items-center justify-between">
          <div className="flex grow items-center gap-5">
            <span className="text-heading-2">{pet.name}</span>
            <span className="text-solo-small text-orange-400">
              {deathAnniversaryDDay}
            </span>
          </div>
          <button className="pr-2" type="button" onClick={handleEditPet}>
            <img src={pen} alt="edit" />
          </button>
        </header>
        <section className="mb-6 ml-3 flex flex-col gap-y-3 text-solo-medium">
          <ul className="flex gap-x-1.5">
            {pet?.personalities.map((personality) => (
              <li
                key={personality}
              >{`${PREFIX.PET_PERSONALITY}${personality}`}</li>
            ))}
          </ul>
          <div>{`${PREFIX.OWNER}${pet.owner}`}</div>
        </section>
        <footer className="flex h-[3.875rem] gap-x-3 text-body-large">
          <button
            className="w-full flex-1 rounded-2xl bg-orange-400 px-5 py-4 text-white"
            type="button"
            onClick={handleWriteLetter}
          >
            {USER_ACTIONS.GO_TO_LETTERS}
          </button>
          <LikeButton petId={pet.id} favoriteData={pet.favorite} />
        </footer>
      </article>
    </li>
  );
}

export default forwardRef(PetCard);
