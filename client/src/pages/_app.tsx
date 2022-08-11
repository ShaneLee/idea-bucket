import { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/overrides.css';

import Nav from '../components/Nav';
import { AuthContextProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/Theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Nav appName='Idea Bucket' />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
