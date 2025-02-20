import { PetResponse } from 'types/pets';
import CoverImage from 'components/Common/CoverImage';
import InfoBox from 'components/LetterBox/InfoBox';
import PetsToggle from 'components/LetterBox/PetsToggle';
import Divider from 'components/Home/Divider';
import { getImage } from 'api/images';

type Props = {
  onChange: (pet: PetResponse) => void;
  petsList: PetResponse[];
  selectedPet: null | PetResponse;
  setIsEditing: (bool: boolean) => void;
};

export default function PetInfoCard({
  onChange,
  petsList,
  selectedPet,
  setIsEditing,
}: Props) {
  return (
    <section>
      <PetsToggle
        selectedPet={selectedPet?.name}
        petsList={petsList}
        onChange={onChange}
        setIsEditing={setIsEditing}
      />
      <CoverImage image={getImage(selectedPet?.image)} />
      <InfoBox pet={selectedPet} />
      <Divider />
    </section>
  );
}
