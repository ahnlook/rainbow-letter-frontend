import { Link } from 'react-router-dom';

type BannerProps = {
  link: string;
  image: string;
  bgColor?: string;
};

export default function Banner({ link, image, bgColor }: BannerProps) {
  return (
    <Link
      to={link}
      target="_blank"
      className={`${bgColor} static flex size-full justify-between bg-white`}
    >
      <div className="flex items-center justify-center">
        <img className="object-fill" src={image} alt="card" />
      </div>
    </Link>
  );
}
