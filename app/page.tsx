import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start grid grid-row-2">
        <div className="text-base font-large sm:flex-row w-full grid justify-center mt-12">
          <h1>Landing page WIP</h1>
        </div>
        <div className="text-base font-medium sm:flex-row w-full grid grid-cols-3">
          <a
            className="flex h-12 w-full items-center bg-gray-800 justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] w-full col-start-2"
            href="/dashboard"
          >
            Go to dashboard
          </a>
        </div>
      </main>
    </div>
  );
}
