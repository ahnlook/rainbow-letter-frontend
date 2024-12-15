import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

type Props = {
  value: string;
  bgColor: string;
};

export default function TagItem({ value, bgColor }: Props) {
  const { lng } = useSelector((state: RootState) => state.common);
  const tag = useMemo(() => {
    if (lng === 'ko') {
      return `#${value}`;
    }
    switch (value) {
      case '애교많은':
        return '#Affectionate';
      case '사교적인':
        return '#Social';
      case '활동적인':
        return '#Active';
      case '사고뭉치':
        return '#Mischievous';
      case '똑똑한':
        return '#Smart';
      case '낯가리는':
        return '#Shy';
      case '장난치는':
        return '#Playful';
      case '얌전한':
        return '#Well-behaved';
      case '예민한':
        return '#Sensitive';
      case '순한':
        return '#Gentle';
      case '시크한':
        return '#Chic';
      case '먹보':
        return '#Food-loving';
    }
  }, [lng, value]);

  return (
    <li
      className={`${bgColor} rounded-[8px] p-2 text-caption leading-[14px] text-orange-400`}
    >
      {tag}
    </li>
  );
}
