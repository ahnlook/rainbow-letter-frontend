// eslint-disabled
import TimeNumberItem from './TimeNumberItem';
import { getTimeUntilKST10AM } from 'utils/date';
import Divide from '../../assets/ic_letterBox_timeDivide.svg';

export default function UntilTimeBox() {
  const { hours, minutes } = getTimeUntilKST10AM();

  return (
    <div className="flex h-[80px] items-center gap-4 bg-letterTimeBg bg-no-repeat px-4 py-3 text-[#424242]">
      <p className="text-[12px] font-bold leading-[14px]">
        Until the Next
        <br />
        Letter Arrives:
      </p>
      <div className="flex">
        <div>
          <div className="flex gap-1">
            <TimeNumberItem value={hours.length === 2 ? hours[0] : '0'} />
            <TimeNumberItem value={hours.length === 2 ? hours[1] : hours[0]} />
          </div>
          <p className="mt-1 text-center text-[10px] leading-[10px] text-white">
            Hours
          </p>
        </div>
        <img src={Divide} alt="시간" className="mx-1 mb-3" />
        <div>
          <div className="flex gap-1">
            <TimeNumberItem value={minutes.length === 2 ? minutes[0] : '0'} />
            <TimeNumberItem
              value={minutes.length === 2 ? minutes[1] : minutes[0]}
            />
          </div>
          <p className="mt-1 text-center text-[10px] leading-[10px] text-white">
            Minutes
          </p>
        </div>
      </div>
    </div>
  );
}
