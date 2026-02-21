import { useState, useEffect } from 'react';

const MAINTENANCE = {
  startTime: '2025-07-06 22:00',
  endTime: '2025-07-06 23:59',
};

const checkIsMaintenanceTime = (
  startTime: string,
  endTime: string
): boolean => {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  return now >= start && now <= end;
};

/** 점검 시간 여부를 10초마다 갱신해 반환 */
export function useMaintenance(
  options: { startTime: string; endTime: string } = MAINTENANCE,
  intervalMs = 10_000
): boolean {
  const [isMaintenanceTime, setIsMaintenanceTime] = useState(() =>
    checkIsMaintenanceTime(options.startTime, options.endTime)
  );

  useEffect(() => {
    const check = () =>
      setIsMaintenanceTime(
        checkIsMaintenanceTime(options.startTime, options.endTime)
      );
    check();
    const timer = setInterval(check, intervalMs);
    return () => clearInterval(timer);
  }, [options.startTime, options.endTime, intervalMs]);

  return isMaintenanceTime;
}
