import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';


export default function Home() {
  return (
    <>
      <Head>
        <title>Next Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginForm />
      </main>
      

    </>
  );
}