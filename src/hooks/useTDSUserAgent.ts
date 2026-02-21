import { useEffect, useState } from 'react';
import { isAndroid, isiOS } from 'utils/device';

export interface TDSUserAgentSnapshot {
  fontA11y: undefined;
  fontScale: undefined;
  isAndroid: boolean;
  isIOS: boolean;
  colorPreference: 'light' | 'dark' | undefined;
  safeAreaBottomTransparency: undefined;
}

function getColorPreference(): 'light' | 'dark' | undefined {
  if (typeof window === 'undefined' || !window.matchMedia) return undefined;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function useTDSUserAgent(): TDSUserAgentSnapshot {
  const [colorPreference, setColorPreference] = useState<
    'light' | 'dark' | undefined
  >(getColorPreference);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setColorPreference(getColorPreference());
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  return {
    fontA11y: undefined,
    fontScale: undefined,
    isAndroid: isAndroid(),
    isIOS: isiOS(),
    colorPreference,
    safeAreaBottomTransparency: undefined,
  };
}
