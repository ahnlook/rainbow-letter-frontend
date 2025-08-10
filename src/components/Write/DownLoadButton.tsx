import saveImg from '../../assets/detailLetter_save.svg';

type Props = {
  onClick: () => void;
};

export default function DownLoadButton({ onClick }: Props) {
  return (
    <button onClick={onClick} id="save-button" className="not-save">
      <img src={saveImg} alt="저장" />
    </button>
  );
}
