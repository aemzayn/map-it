import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Map it!</title>
        <meta name="description" content="Map it website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex flex-col gap-14 text-white">
          <h1 className="text-9xl font-bold italic">Map It!</h1>
          <button className="rounded-xl bg-purple-200 p-4 font-bold text-purple-800">
            Get started
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
