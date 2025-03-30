import post from 'assets/post.svg';
import { SharedLetterItemType } from 'types/letters';

type Props = {
  letter: SharedLetterItemType;
  isMine?: boolean;
};

function SharedLetterItem({ letter, isMine }: Props) {
  const prefix = letter.recipientType === 'PET' ? 'TO' : 'FROM';
  const backgroundColor =
    letter.recipientType === 'PET' ? 'bg-gray-2' : 'bg-orange-50';

  return (
    <section className="relative flex justify-center">
      <div className="absolute -top-2.5 h-5 w-2.5">
        <img className="" src={post} alt="pin" width="100%" height="100%" />
      </div>
      <section
        className={`h-[10.562rem] w-[8.625rem] rounded-2xl p-3.5 pb-5 font-Gyobomungo2019 ${backgroundColor} ${isMine ? 'shadow-sharedLetter' : ''}`}
      >
        <p className="pb-2 text-center leading-[130%]">{`${prefix}. ${letter.pet.name}`}</p>
        <div
          className={`min-h-[104px] w-full whitespace-pre-wrap text-center leading-relaxed ${backgroundColor} bg-size-[100%_26px] bg-[repeating-linear-gradient(to_bottom,transparent_0%,transparent_25px,#BDBDBD_25px,#BDBDBD_26px)]`}
        >
          {letter.content}
        </div>
      </section>
    </section>
  );
}

export default SharedLetterItem;
