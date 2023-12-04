"use client";

import { encodeText } from "@/utils/convert";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import getTTS from "@/action/get-tts";

type Props = {};

const ConvertText = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bahasa = searchParams.get("bahasa") || "";

  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [change, setChange] = useState(false);

  const encode = (text: string) => {
    const res = encodeText(text, bahasa);
    setEncoded(res);
  };

  const changeBahasa = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === "string") {
      setChange(true);
      router.push(`/?bahasa=${e}`);
      return;
    }
    const bahasa = e.target.value;
    setChange(true);
    router.push(`/?bahasa=${bahasa}`);
  };

  const saveToClipboard = () => {
    navigator.clipboard.writeText(encoded);
    toast.custom((t) => (
      <div
        className={`rounded-lg bg-transparent px-6 py-3 text-orange-100 ring-1 ring-orange-200 ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        📋 copied to clipboard!
      </div>
    ));
  };

  // const speech = new SpeechSynthesisUtterance();
  // speech.lang = "ms-MY";
  // speech.voice = speechSynthesis.getVoices()[6];
  // speech.text = encoded;
  // window.speechSynthesis.speak(speech);

  const talk = async () => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    if (!origin) return;
    const data = await getTTS(encoded, origin);

    if (!data.body) return null;
    const { audioContent } = data.body;

    const audio = new Audio();
    audio.src = "data:audio/mpeg;base64," + audioContent;
    audio.play();
  };

  useEffect(() => {
    if (!text) return;
    if (text.length > 100) return;
    if (text.length < 1) return;
    encode(text);
  }, [text]);

  useEffect(() => {
    if (change) {
      encode(text);
      setChange(false);
    }
  }, [bahasa]);

  useEffect(() => {
    changeBahasa("f");
  }, []);

  return (
    <div className="w-full max-w-prose items-center justify-center p-2 sm:p-8">
      <input
        max={3}
        min={1}
        value={bahasa}
        placeholder="f"
        onChange={(e) => {
          setChange(true);
          changeBahasa(e);
        }}
        className="duration-250 focus:ring-none pointer-events-auto h-full w-full bg-transparent text-center font-gmono text-8xl text-orange-100 transition-all ease-linear selection:bg-zinc-800 placeholder:text-orange-300 focus:outline-none"
      ></input>
      <div className="w-full items-center justify-center text-center">
        <input
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="duration-250 focus:ring-none pointer-events-auto h-full w-full bg-transparent text-center font-gmono text-3xl text-orange-100 transition-all ease-linear selection:bg-zinc-800 placeholder:text-orange-300 focus:outline-none sm:text-3xl md:text-4xl"
          placeholder="tulis sini"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        ></input>

        {text && text.length > 0 && (
          <div>
            <div
              className="peer mt-8 w-full max-w-prose text-center text-4xl lowercase transition-all duration-150 ease-in active:text-orange-400 sm:text-5xl "
              onClick={(e) => saveToClipboard()}
            >
              {encoded}
            </div>
            <div className="flex w-full flex-col items-center justify-center sm:flex-row sm:gap-4">
              <button
                onClick={(e) => saveToClipboard()}
                className="visible mt-8 w-32 rounded-lg p-2 text-center ring-1 ring-orange-200 hover:bg-orange-400 active:bg-orange-400 peer-empty:invisible"
              >
                copy text
              </button>
              <button
                onClick={talk}
                className="visible mt-8 w-32 rounded-lg p-2 text-center ring-1 ring-orange-200 hover:bg-orange-400 active:bg-orange-400 peer-empty:invisible"
              >
                talk
              </button>
            </div>
          </div>
        )}

        <Toaster />
      </div>
    </div>
  );
};

export default ConvertText;
