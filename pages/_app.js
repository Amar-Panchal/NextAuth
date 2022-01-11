import { Provider } from 'next-auth/client';
import '../styles/globals.css';
import '../styles/style.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}