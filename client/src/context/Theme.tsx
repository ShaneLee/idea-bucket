import React from 'react';

import { ButtonVariant } from '@/components/buttons/Button'

export const ThemeContext = React.createContext({
  theme: 'dark',
  // eslint-disable-next-line
  setTheme: (_: string) => {},
});

// eslint-disable-next-line
export const ThemeProvider = (props: any) => {
  const [theme, setTheme] = React.useState<string>('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function toggleTheme(
  theme: string,
  setTheme: (_: string) => void
): void {
  theme === 'dark' ? setTheme('light') : setTheme('dark');
}

export const themeBg = (value: string): string =>
  value === 'dark' ? 'bg-dark' : 'bg-gray-50';
export const themeText = (value: string): string =>
  value === 'dark' ? 'text-white' : 'text-black';
export const themeTextColor = (value: string): string =>
  value === 'dark' ? 'text-gray-300' : 'text-gray-600';
export const themeButton = (value: string): keyof typeof ButtonVariant =>
  value === 'dark' ? 'light' : 'dark';
export const themeHover = (value: string): string =>
  value === 'dark' ? 'hover:blue-grey-50' : 'dark';

export default ThemeContext;
