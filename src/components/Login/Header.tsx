import { useTranslation } from 'react-i18next';

import { Message, SNS_LOGIN } from 'components/Login/constants';
import { T } from 'types/translate';

type Props = { message: Message };

export default function Header({ message: { title, sns } }: Props) {
  const { t }: T = useTranslation();
  return (
    <section>
      <h2 className="text-heading-2">{t(title)}</h2>
      <h3 className="mt-[2.188rem]">{t(sns)}</h3>
      <div className="mt-3.5 flex justify-center gap-5">
        {SNS_LOGIN.map(({ icon, name, url }) => (
          <a href={url} type="button">
            <img src={icon} width={55} height={55} alt={name} />
          </a>
        ))}
      </div>
    </section>
  );
}
