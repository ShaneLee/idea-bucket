import { AppProps } from 'next/app';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import '@/styles/overrides.css';

import Nav from '../components/Nav';
import { ThemeProvider } from '../context/Theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Nav appName='Idea Bucket' />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
