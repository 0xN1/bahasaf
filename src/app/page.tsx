import ConvertText from "@/components/convert";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-orange-500 p-10 font-gsans sm:p-24">
      <header></header>
      <div>
        <ConvertText />
      </div>
      <footer className="text-xs">
        <Link
          href="https://github.com/0xN1/bahasaf"
          target="blank"
          rel="noopener noreferrer"
          className="font-semibold transition-all duration-200 hover:text-orange-700 hover:underline"
        >
          bahasaf
        </Link>{" "}
        by{" "}
        <Link
          href="https://x.com/0xneroone"
          target="blank"
          rel="noopener noreferrer"
          className="font-semibold transition-all duration-200 hover:text-orange-700 hover:underline"
        >
          0xN1
        </Link>
      </footer>
    </main>
  );
}
