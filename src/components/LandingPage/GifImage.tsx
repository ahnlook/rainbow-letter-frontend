type Props = {
  src: string | undefined;
};

export default function GifImage({ src }: Props) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-x-0 bottom-12 left-1/2 w-full -translate-x-1/2 px-10"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
