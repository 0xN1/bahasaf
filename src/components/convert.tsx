"use client";

import { encodeText } from "@/utils/convert";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

type Props = {};

const ConvertText = (props: Props) => {
  const searchParams = useSearchParams();
  const bahasa = searchParams.get("bahasa") || "f";

  const [text, setText] = useState("tulis sini");
  const [encoded, setEncoded] = useState("");

  const encode = (text: string) => {
    const res = encodeText(text, bahasa);
    setEncoded(res);
  };

  const saveToClipboard = () => {
    navigator.clipboard.writeText(encoded);
  };

  useEffect(() => {
    if (!text) return;
    if (text.length > 100) return;
    if (text.length < 1) return;
    encode(text);
  }, [text]);

  return (
    <div className="w-full max-w-prose items-center justify-center p-2 sm:p-8">
      {/* <h1 className="mb-16 w-full text-center font-gmono text-8xl font-semibold">
        {bahasa}
      </h1> */}
      <div className="w-full items-center justify-center text-center">
        <input
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="duration-250 focus:ring-none pointer-events-auto h-full w-full bg-transparent text-center font-gmono text-3xl text-orange-100 transition-all ease-linear selection:bg-zinc-800 placeholder:text-orange-200 focus:outline-none sm:text-3xl md:text-4xl"
          placeholder="tulis sini"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <div
          className="peer mt-8 w-full max-w-prose text-center text-4xl lowercase transition-all duration-150 ease-in active:text-orange-400 sm:text-5xl "
          onClick={(e) => saveToClipboard()}
        >
          {encoded}
        </div>
        <button
          onClick={(e) => saveToClipboard()}
          className="visible mt-8 w-32 rounded-lg p-2 text-center ring-1 ring-orange-200 hover:bg-orange-300 active:bg-orange-400 peer-empty:invisible"
        >
          copy text
        </button>
      </div>
    </div>
  );
};

export default ConvertText;
