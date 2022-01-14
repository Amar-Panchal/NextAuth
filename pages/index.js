import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';


export default function Home() {
  return (
    <>
      <Head>
        <title>Next Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <LoginForm />
      </main>
      

    </>
  );
}