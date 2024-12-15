import { ForwardedRef, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import { T } from 'types/translate';

type Props = {
  isInvalid: boolean;
  value: string;
  onChange: () => void;
};

const MiscInput = forwardRef(
  (
    { isInvalid, value, onChange, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement> | undefined
  ) => {
    const { t }: T = useTranslation();
    const { lng } = useSelector((state: RootState) => state.common);
    const borderStyle = isInvalid ? 'border-alarm-red' : 'border-orange-400';

    return (
      <div
        className={`flex h-10 w-60 items-center border bg-orange-50 px-4 ${borderStyle} rounded-full`}
      >
        <div className="shrink-0 bg-transparent">
          <span className="bg-transparent text-solo-small font-bold text-orange-400">
            {t('register.etc')}:{' '}
          </span>
        </div>
        <input
          ref={ref}
          className="grow bg-transparent pl-2 text-caption text-gray-1"
          maxLength={lng === 'ko' ? 10 : 20}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }
);

export default MiscInput;
