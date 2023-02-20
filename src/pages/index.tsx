import { type NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const Home: NextPage = () => {
  const { data: session } = useSession();

  function handleSignin() {
    signIn("discord").catch((error) => {
      console.error(error);
    });
  }

  function handleSignout() {
    signOut().catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Head>
        <title>Map it!</title>
        <meta name="description" content="Map it website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex items-center justify-end gap-5 p-5">
        {session ? (
          <button
            onClick={handleSignout}
            className="font-normal text-purple-200"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleSignin}
            className="font-normal text-purple-200"
          >
            Login
          </button>
        )}
        {session && session.user.image && (
          <div className="h-10 w-10">
            <Image
              className="overflow-hidden rounded-full"
              src={session.user.image}
              alt="User profile"
              width={50}
              height={50}
            />
          </div>
        )}
      </nav>
      <main className="my-auto flex flex-1 flex-col items-center justify-center gap-10">
        <h1 className="text-9xl font-bold italic text-white">Map It!</h1>
        {session && (
          <button className="rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 px-20 py-3 text-lg text-white">
            <Link href="/map">Get Started</Link>
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;
